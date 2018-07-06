sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, History, MessageToast, JSONModel, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("ADTracker.controller.DevItemCreate", {
		onInit: function() {
			var view = this.getView();
			var sServiceUrl = "/sap/opu/odata/sap/ZADSAP_SRV/"
			var oModelUser = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
				json: true,
				loadMetadataAsync: true,
				defaultCountMode: "None"
			});
			view.setModel(oModelUser);

			var oViewModel = new JSONModel({
				releaseDateVisible: false,
				RPCLink: ""
			});
			this.getView().setModel(oViewModel, "view");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("new").attachPatternMatched(this._onObjectMatched, this);

			var oFilter = [new sap.ui.model.Filter('Type', 'EQ', 'LINK'),
				new sap.ui.model.Filter('Code', 'EQ', 'RPC')
			];

			var that = this;
			this.getView().getModel().read("/appConfigurationSet", {
				filters: oFilter,
				success: jQuery.proxy(function(data, response) {
					if (data.results && data.results.length > 0) {
						that.getView().getModel("view").setProperty("/RPCLink", data.results[0].Value);
						var link = that.getView().getModel("view").getProperty("/RPCLink");
					}
					console.log("success");
				}, this),
				error: jQuery.proxy(function(err) {
					console.log("error");
				}, this)
			});

			// attach handlers for validation errors
			sap.ui.getCore().attachValidationError(function(evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});

			sap.ui.getCore().attachValidationSuccess(function(evt) {
				var control = evt.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});
		},

		onBeforeRendering: function() {
			this.getView().getModel("view").refresh();
		},

		onNavBack: function() {
			this.clearAllInput();
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home", true);
			}
		},

		_onReleaseChange: function(oEvent) {
			var sItem = oEvent.getParameters().selectedItem;
			var sKey = sItem.getKey();
			if (sKey) {
				this.getView().byId("dummyReleaseMilestoneDate").setSelectedKey(sKey);
				var sText = this.getView().byId("dummyReleaseMilestoneDate").getSelectedItem().getText();
				this.getView().byId("FSReleaseMilestoneDate").setValue(sText);
			} else {
				this.getView().byId("FSReleaseMilestoneDate").setValue("");
			}

			this.handleReleaseChange(oEvent);
		},

		handleReleaseChange: function(oEvent) {
			var oSelect = oEvent.getSource();

			if (oSelect) {
				var key = oSelect.getSelectedKey();
				this.getView().byId("releaseDate").setValue("");
				switch (key) {
					case "THU":
						this.getView().getModel("view").setProperty("/releaseDateVisible", true);
						break;
					case "TUE":
						this.getView().getModel("view").setProperty("/releaseDateVisible", true);
						break;
					default:
						this.getView().getModel("view").setProperty("/releaseDateVisible", false);
						break;
				}
			}
		},

		_onNetworkValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._networkValueHelpDialog) {
				this._networkValueHelpDialog = sap.ui.xmlfragment("ADTracker.view.NetworkSearchHelpDialog", this);
				this.getView().addDependent(this._networkValueHelpDialog);
			}

			// create a filter for the binding
			this._networkValueHelpDialog.getBinding("items").filter([new Filter("NetworkNumber", sap.ui.model.FilterOperator.Contains, sInputValue)]);

			// open value help dialog filtered by the input value
			this._networkValueHelpDialog.open(sInputValue);
		},

		_handleNetworkHelpSearch:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber").getValue();
			
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("NetworkNumber", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
			
		},
		
		_handleNetworkHelpConfirm:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber").getValue();
			
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var networkInput = this.getView().byId("NetworkNumber");
				var activityInput = this.getView().byId("Activity");
				networkInput.setValue(oSelectedItem.getCells()[0].getTitle());
				activityInput.setValue(oSelectedItem.getCells()[1].getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
			
		},
		
		_handleNetworkHelpClose:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber").getValue();
			
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var networkInput = this.getView().byId("NetworkNumber");
				var activityInput = this.getView().byId("Activity");
				networkInput.setValue(oSelectedItem.getCells()[0].getTitle());
				activityInput.setValue(oSelectedItem.getCells()[1].getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},

		_onActivityValueHelp:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber").getValue();
			
			var sInputValue = oEvent.getSource().getValue();
			 
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._activityValueHelpDialog) {
				this._activityValueHelpDialog = sap.ui.xmlfragment("ADTracker.view.ActivitySearchHelpDialog", this);
				this.getView().addDependent(this._activityValueHelpDialog);
			}
 
			var aFilters = [];
			if (sNetWorkNumber) {
				aFilters.push(new Filter("NetworkNumber", sap.ui.model.FilterOperator.Contains, sNetWorkNumber));
			}
			
			if (sInputValue) {
				aFilters.push(new Filter("ActivityNumber", sap.ui.model.FilterOperator.Contains, sInputValue));
			}
			
			// filter for the binding
			this._activityValueHelpDialog.getBinding("items").filter(aFilters);
 
			// open value help dialog filtered by the input value
			this._activityValueHelpDialog.open(sInputValue);		
			
		},
		
		_handleActivityHelpSearch:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber").getValue();
			
			var sValue = oEvent.getParameter("value");
			var aFilters = [];
			if (sNetWorkNumber) {
				aFilters.push(new Filter("NetworkNumber", sap.ui.model.FilterOperator.Contains, sNetWorkNumber));
			}
			
			if (sValue) {
				aFilters.push(new Filter("ActivityNumber", sap.ui.model.FilterOperator.Contains, sValue));
			}
			
			oEvent.getSource().getBinding("items").filter(aFilters);
		},
		
		_handleActivityHelpConfirm:function(oEvent){
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var activityInput = this.getView().byId("Activity");
				activityInput.setValue(oSelectedItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		
		_handleActivityHelpClose:function(oEvent){
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var activityInput = this.getView().byId("Activity");
				activityInput.setValue(oSelectedItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		
		_onObjectMatched: function(oEvent) {
			this.getView().getModel().refresh(true);
		},

		clearAllInput: function() {
			this.getView().byId("WRWKNum").setValue("");
			this.getView().byId("title").setValue("");
			this.getView().byId("devApproach").setSelectedKey("");
			//			this.getView().byId("RICEF").setSelectedKey("");
			this.getView().byId("release").setSelectedKey("");
			this.getView().byId("releaseDate").setValue("");
			//			this.getView().byId("SAPSystem").setSelectedKey("");
			//			this.getView().byId("estimateABAPDays").setValue("");
			this.getView().byId("priority").setSelectedKey("");
			this.getView().byId("dummyReleaseMilestoneDate").setSelectedKey("");
			this.getView().byId("FSReleaseMilestoneDate").setValue("");
			this.getView().byId("FSPromiseDate").setValue("");
			this.getView().byId("FSActualReceiveDate").setValue("");
			this.getView().byId("FSLink").setValue("");
			//			this.getView().byId("FSStatus").setSelectedKey("");
			//			this.getView().byId("targetDevCompleteDate").setValue("");
			this.getView().byId("functionalAnalyst").setSelectedKey("");
			this.getView().byId("teamLead").setSelectedKey("");
			this.getView().byId("techLead").setSelectedKey("");
			this.getView().byId("Developer").setSelectedKey("");
			this.getView().byId("codeReviewer").setSelectedKey("");
			this.getView().byId("CurrentStatus").setSelectedKey("");

			this.getView().byId("NetworkNumber").setValue("");
			this.getView().byId("Activity").setValue("");
			
			this.getView().getModel("view").setProperty("/releaseDateVisible", false);
		},

		_onNumberLiveChange: function(oEvent) {
			var oInput = oEvent.getSource();
			oInput.setValueState("None");
			oInput.setValueStateText("");
		},

		_checkInputField: function(oInput) {
			const regexFull = /^(WREQ|PRJ)\d{7}$/i;
			//			const regexBegin = /^(WREQ|PRJ)/i;
			//			const regexEnd = /\d{7}$/i;

			const regexBegin = /^([a-z]+)/i;
			const regexEnd = /\d{7}$/i;
			const regexPrecheck = /^([a-z]+)\d{7}$/i;
			const regex = /^([a-z]+)\.*(?!0000000)[0-9]{7}$/i;

			var sValue = oInput.getValue();

			if (!sValue) {
				oInput.setValueState("Error");
				oInput.setValueStateText("Cannot be empty, input a valid number");
				oInput.focus();
				return true;
			} else {
				if (!(regex.test(sValue))) {
					oInput.setValueState("Error");
					oInput.setValueStateText("Not Valid input: should have prefix('WREQ', 'PRJ', etc) and end with 7 digits");

					if (!(regexEnd.test(sValue))) {
						oInput.setValueStateText("Not Valid input, should end with 7 digits");
					} else {
						//oInput.setValueStateText("Not Valid input, should have valid prefix like 'WREQ', 'PRJ', etc");
					}

					if (!(regexEnd.exec("WREQ") === null)) {
						var sDigit = regexEnd.exec("WREQ")[0];
					}

					if (regexPrecheck.test(sValue)) {
						oInput.setValueStateText("Not Valid input, should end with 7 digits, cannot be '0000000'");
					}

					//					if (!(regexBegin.test(sValue))) {
					//						oInput.setValueStateText("Not Valid input, should start with 'WREQ' or 'PRJ'");
					//					} else {
					//						oInput.setValueStateText("Not Valid input, should end with 7 digits");
					//					}

					oInput.focus();
					return true;
				}

				if (!(regexEnd.exec("WREQ") === null)) {

				}

				if (!(regexEnd.test(sValue))) {

				}
			}

			return false;

		},

		onNewItem: function() {
			var isError;
			// collect input controls
			var inputs = [];
			inputs.push(this.getView().byId("WRWKNum"));
			inputs.push(this.getView().byId("title"));

			if (this.getView().getModel("view").getProperty("/releaseDateVisible")) {
				inputs.push(this.getView().byId("releaseDate"));
			}

			// check that inputs are not empty
			// this does not happen during data binding as this is only triggered by changes
			jQuery.each(inputs, function(i, input) {
				input.setValueState("None");
				input.setValueStateText("");
				if (!input.getValue()) {
					input.setValueState("Error");
					input.setValueStateText("Cannot be empty");
					isError = true;
				}
			});

			if (isError) {
				return;
			}

			var newItem = this.getView().getModel("devmodel");
			var oEntry = {};
			var str = this.getView().byId("WRWKNum").getValue().replace(/\s/g, '');
			this.getView().byId("WRWKNum").setValue(str);
			var bErrorInput = this._checkInputField(this.getView().byId("WRWKNum"));
			if (bErrorInput) {
				return;
			}

			oEntry.WRWKNum = this.getView().byId("WRWKNum").getValue().toUpperCase();
			oEntry.description = this.getView().byId("title").getValue();
			oEntry.releaseDate = this.getView().byId("releaseDate").getValue();
			oEntry.devApproach = this.getView().byId("devApproach").getSelectedKey();
			//			oEntry.RICEF = this.getView().byId("RICEF").getSelectedKey();
			oEntry.release = this.getView().byId("release").getSelectedKey();
			oEntry.priority = this.getView().byId("priority").getSelectedKey();
			//			oEntry.system = this.getView().byId("SAPSystem").getSelectedKey();
			//			oEntry.estimateABAPDays = this.getView().byId("estimateABAPDays").getValue();
			oEntry.FSMileStoneDate = this.getView().byId("FSReleaseMilestoneDate").getValue();
			oEntry.FSPromiseDate = this.getView().byId("FSPromiseDate").getValue();
			oEntry.FSReceiveDate = this.getView().byId("FSActualReceiveDate").getValue();
			oEntry.FSLink = this.getView().byId("FSLink").getValue();
			
			oEntry.chargeCode = this.getView().byId("NetworkNumber").getValue();
			oEntry.activity = this.getView().byId("Activity").getValue();
			
			//			oEntry.FSStatus = this.getView().byId("FSStatus").getSelectedKey();
			//			oEntry.planCompleteDate = this.getView().byId("targetDevCompleteDate").getValue();
			oEntry.functionalAnalyst = this.getView().byId("functionalAnalyst").getSelectedKey();
			oEntry.teamLead = this.getView().byId("teamLead").getSelectedKey();
			oEntry.techLead = this.getView().byId("techLead").getSelectedKey();
			oEntry.developer = this.getView().byId("Developer").getSelectedKey();
			oEntry.codeReviewer = this.getView().byId("codeReviewer").getSelectedKey();
			oEntry.overallStatus = this.getView().byId("CurrentStatus").getSelectedKey();

			newItem.create("/devItemsSet", oEntry, {
				success: jQuery.proxy(function(data, response) {
					console.log("item create success");
				}, this),
				error: jQuery.proxy(function(err) {
					console.log("item create error");
				}, this),
			});

			this.onNavBack();
		}
	});
});