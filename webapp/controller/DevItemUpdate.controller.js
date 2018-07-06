var oDIU;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"ADTracker/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, History, MessageBox, MessageToast, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("ADTracker.controller.DevItemUpdate", {
		formatter: formatter,

		onInit: function() {
			oDIU = this;
			var oViewModel = new JSONModel({
				currency: "EUR",
				RPCLink: "",
				busy: false,
				releaseDateVisible: false,
				shareSendMailAddress: "",
				shareSendEmailSubject: "",
				shareSendEmailMessage: ""
			});
			this.getView().setModel(oViewModel, "view");

			var view = this.getView();
			var sServiceUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			var oModelUser = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
				json: true,
				loadMetadataAsync: true,
				defaultCountMode: "None"
			});
			view.setModel(oModelUser);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("updated").attachPatternMatched(this._onObjectMatched, this);
			this.getOwnerComponent().oWhenMetadataIsLoaded.then(this._onMetadataLoaded.bind(this));

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
					//console.log("success");
				}, this),
				error: jQuery.proxy(function(err) {
					//console.log("error");
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

		_onObjectMatched: function(oEvent) {
			this._navBack = oEvent.getParameter("arguments").updateitem;
			var oViewModel = this.getView().getModel("view");
			//var oDataModel = this.getView().getModel("devmodel");
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").updateitem,
				model: "devmodel",
				events: {
					change: function() {
						//oDataModel.refresh(true);
					},
					dataRequested: function() {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});

			var status = this.getView().byId("CurrentStatus1").getSelectedKey();
			var aFilters = [];
			switch (status) {
				case "08":
					var oFilter = [new sap.ui.model.Filter('Type', 'EQ', 'STATUS'),
						new sap.ui.model.Filter('Code', 'EQ', status),
						new sap.ui.model.Filter('Code', 'EQ', '08'),
						new sap.ui.model.Filter('Code', 'EQ', '09')
					];

					aFilters = oFilter;
					break;
				case "00":
					//var aFilters = [];

					var oFilter = [new sap.ui.model.Filter('Type', 'EQ', 'STATUS'),
						new sap.ui.model.Filter('Code', 'EQ', status),
						new sap.ui.model.Filter('Code', 'EQ', '10'),
						new sap.ui.model.Filter('Code', 'EQ', '11'),
						new sap.ui.model.Filter('Code', 'EQ', '20'),
						new sap.ui.model.Filter('Code', 'EQ', '30'),
						new sap.ui.model.Filter('Code', 'EQ', '35'),
						new sap.ui.model.Filter('Code', 'EQ', '40'),
						new sap.ui.model.Filter('Code', 'EQ', '41'),
						new sap.ui.model.Filter('Code', 'EQ', '08'),
						new sap.ui.model.Filter('Code', 'EQ', '09')
					];

					aFilters = oFilter;
					break;
					
				case "01":
					//var aFilters = [];

					var oFilter = [new sap.ui.model.Filter('Type', 'EQ', 'STATUS'),
						new sap.ui.model.Filter('Code', 'EQ', status),
						new sap.ui.model.Filter('Code', 'EQ', '00'),
						new sap.ui.model.Filter('Code', 'EQ', '10'),
						new sap.ui.model.Filter('Code', 'EQ', '11'),
						new sap.ui.model.Filter('Code', 'EQ', '20'),
						new sap.ui.model.Filter('Code', 'EQ', '30'),
						new sap.ui.model.Filter('Code', 'EQ', '35'),
						new sap.ui.model.Filter('Code', 'EQ', '40'),
						new sap.ui.model.Filter('Code', 'EQ', '41'),
						new sap.ui.model.Filter('Code', 'EQ', '08'),
						new sap.ui.model.Filter('Code', 'EQ', '09')
					];

					aFilters = oFilter;
					break;
					
				case "10":
					//var aFilters = [];

					var oFilter = [new sap.ui.model.Filter('Type', 'EQ', 'STATUS'),
						new sap.ui.model.Filter('Code', 'EQ', status),
						new sap.ui.model.Filter('Code', 'EQ', '10'),
						new sap.ui.model.Filter('Code', 'EQ', '11'),
						new sap.ui.model.Filter('Code', 'EQ', '20'),
						new sap.ui.model.Filter('Code', 'EQ', '30'),
						new sap.ui.model.Filter('Code', 'EQ', '35'),
						new sap.ui.model.Filter('Code', 'EQ', '40'),
						new sap.ui.model.Filter('Code', 'EQ', '41'),
						new sap.ui.model.Filter('Code', 'EQ', '08'),
						new sap.ui.model.Filter('Code', 'EQ', '09')
					];

					aFilters = oFilter;
					break;
				case "11":
					//var aFilters = [];

					var oFilter = [new sap.ui.model.Filter('Type', 'EQ', 'STATUS'),
						new sap.ui.model.Filter('Code', 'EQ', status),
						new sap.ui.model.Filter('Code', 'EQ', '10'),
						new sap.ui.model.Filter('Code', 'EQ', '11'),
						new sap.ui.model.Filter('Code', 'EQ', '20'),
						new sap.ui.model.Filter('Code', 'EQ', '30'),
						new sap.ui.model.Filter('Code', 'EQ', '35'),
						new sap.ui.model.Filter('Code', 'EQ', '40'),
						new sap.ui.model.Filter('Code', 'EQ', '41'),
						new sap.ui.model.Filter('Code', 'EQ', '08'),
						new sap.ui.model.Filter('Code', 'EQ', '09')
					];

					aFilters = oFilter;
					break;
				default:
				//	var aFilters = [];

					var oFilter = [new sap.ui.model.Filter('Type', 'EQ', 'STATUS'),
						new sap.ui.model.Filter('Code', 'EQ', status),
						new sap.ui.model.Filter('Code', 'EQ', '10'),
						new sap.ui.model.Filter('Code', 'EQ', '11'),
						new sap.ui.model.Filter('Code', 'EQ', '20'),
						new sap.ui.model.Filter('Code', 'EQ', '30'),
						new sap.ui.model.Filter('Code', 'EQ', '33'),
						new sap.ui.model.Filter('Code', 'EQ', '34'),
						new sap.ui.model.Filter('Code', 'EQ', '35'),
						new sap.ui.model.Filter('Code', 'EQ', '36'),
						new sap.ui.model.Filter('Code', 'EQ', '37'),
						new sap.ui.model.Filter('Code', 'EQ', '40'),
						new sap.ui.model.Filter('Code', 'EQ', '41'),
						new sap.ui.model.Filter('Code', 'EQ', '08'),
						new sap.ui.model.Filter('Code', 'EQ', '09')
					];

					aFilters = oFilter;
					break;
			}

			this.getView().byId("CurrentStatus1").getBinding("items").filter(aFilters, "Application");

			this.getView().getModel("devmodel").refresh(true);
			this.getView().getModel().refresh(true);
		},
		
		onSendEmailPress: function(oEvent) {
			var oButton = oEvent.getSource();
 
			// create action sheet only once
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment("ADTracker.view.MailDialog",this);
				this.getView().addDependent(this._actionSheet);
				
				this._actionSheet.setPlacement(sap.m.PlacementType.Top);
			}
 
			this._actionSheet.openBy(oButton);
		},
		
		onSendToTeamLeader: function(oEvent) {
			// Email info
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
				oViewModel = this.getView().getModel("view");

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding("devmodel");

			if (oElementBinding.getBoundContext()) {
				var sPath = oElementBinding.getPath(),
					oObject = oView.getModel("devmodel").getObject(sPath);
			}

			if (oObject) {
				var sItmNum = oObject.itmNum;
				var sWRWKNUM = oObject.WRWKNum;
				var sStatus = oObject.overallStatus;
				var sStatusTXT = oResourceBundle.getText("overallStatus" + oObject.overallStatus);
				var sWRWKDES = oObject.description;
				var sFA = oObject.functionalAnalyst;
				var sFAFNAME = oObject.faFName;
				var sTECHLEAD = oObject.techLead;
				var sTECHLEADFNAME = oObject.techLeadFName;
				var sTeamLead = oObject.teamLead;
				var sTeamLeadFName = oObject.teamLeadFName;
				var sDeveloper = oObject.developer;
				var sDeveloperFName = oObject.developerFName;
				var sCodeReviewer = oObject.codeReviewer;
				var sCodeReviewerFName = oObject.codeReviewerFName;
			}

			var sReciever;
			var sRecieverID;
			var sLink;
			
			sRecieverID = sTeamLead;
			sReciever = sTeamLeadFName;
			sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myTracker&/detail/devItemsSet('" + sItmNum + "')&/";
	
			if (sReciever && sLink) {
				oViewModel.setProperty("/shareSendMailAddress", oResourceBundle.getText("shareSendMailAddress", [sRecieverID]));
				oViewModel.setProperty("/shareSendEmailSubject", oResourceBundle.getText("shareSendEmailObjectSubject", [sWRWKNUM, sStatusTXT]));
				oViewModel.setProperty("/shareSendEmailMessage", oResourceBundle.getText("shareSendEmailObjectMessage", [sReciever, sWRWKNUM,
					sWRWKDES, sLink
				]));
			}

			sap.m.URLHelper.triggerEmail(
				oViewModel.getProperty("/shareSendMailAddress"),
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},
		
		onSendToTechLeader: function(oEvent) {
			// Email info
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
				oViewModel = this.getView().getModel("view");

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding("devmodel");

			if (oElementBinding.getBoundContext()) {
				var sPath = oElementBinding.getPath(),
					oObject = oView.getModel("devmodel").getObject(sPath);
			}

			if (oObject) {
				var sItmNum = oObject.itmNum;
				var sWRWKNUM = oObject.WRWKNum;
				var sStatus = oObject.overallStatus;
				var sStatusTXT = oResourceBundle.getText("overallStatus" + oObject.overallStatus);
				var sWRWKDES = oObject.description;
				var sFA = oObject.functionalAnalyst;
				var sFAFNAME = oObject.faFName;
				var sTECHLEAD = oObject.techLead;
				var sTECHLEADFNAME = oObject.techLeadFName;
				var sTeamLead = oObject.teamLead;
				var sTeamLeadFName = oObject.teamLeadFName;
				var sDeveloper = oObject.developer;
				var sDeveloperFName = oObject.developerFName;
				var sCodeReviewer = oObject.codeReviewer;
				var sCodeReviewerFName = oObject.codeReviewerFName;
			}

			var sReciever;
			var sRecieverID;
			var sLink;

			sRecieverID = sTECHLEAD;
			sReciever = sTECHLEADFNAME;
			sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myDesign&/designItem/" + sItmNum + "/item?tab=info";
	

			if (sReciever && sLink) {
				oViewModel.setProperty("/shareSendMailAddress", oResourceBundle.getText("shareSendMailAddress", [sRecieverID]));
				oViewModel.setProperty("/shareSendEmailSubject", oResourceBundle.getText("shareSendEmailObjectSubject", [sWRWKNUM, sStatusTXT]));
				oViewModel.setProperty("/shareSendEmailMessage", oResourceBundle.getText("shareSendEmailObjectMessage", [sReciever, sWRWKNUM,
					sWRWKDES, sLink
				]));
			}

			sap.m.URLHelper.triggerEmail(
				oViewModel.getProperty("/shareSendMailAddress"),
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},
		
		onSendToFA: function(oEvent) {
			// Email info
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
				oViewModel = this.getView().getModel("view");

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding("devmodel");

			if (oElementBinding.getBoundContext()) {
				var sPath = oElementBinding.getPath(),
					oObject = oView.getModel("devmodel").getObject(sPath);
			}

			if (oObject) {
				var sItmNum = oObject.itmNum;
				var sWRWKNUM = oObject.WRWKNum;
				var sStatus = oObject.overallStatus;
				var sStatusTXT = oResourceBundle.getText("overallStatus" + oObject.overallStatus);
				var sWRWKDES = oObject.description;
				var sFA = oObject.functionalAnalyst;
				var sFAFNAME = oObject.faFName;
				var sTECHLEAD = oObject.techLead;
				var sTECHLEADFNAME = oObject.techLeadFName;
				var sTeamLead = oObject.teamLead;
				var sTeamLeadFName = oObject.teamLeadFName;
				var sDeveloper = oObject.developer;
				var sDeveloperFName = oObject.developerFName;
				var sCodeReviewer = oObject.codeReviewer;
				var sCodeReviewerFName = oObject.codeReviewerFName;
			}

			var sReciever;
			var sRecieverID;
			var sLink;

			sRecieverID = sFA;
			sReciever = sFAFNAME;
			sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myDevRequests&/requestItem/" + sItmNum + "/item?tab=info";
	

			if (sReciever && sLink) {
				oViewModel.setProperty("/shareSendMailAddress", oResourceBundle.getText("shareSendMailAddress", [sRecieverID]));
				oViewModel.setProperty("/shareSendEmailSubject", oResourceBundle.getText("shareSendEmailObjectSubject", [sWRWKNUM, sStatusTXT]));
				oViewModel.setProperty("/shareSendEmailMessage", oResourceBundle.getText("shareSendEmailObjectMessage", [sReciever, sWRWKNUM,
					sWRWKDES, sLink
				]));
			}

			sap.m.URLHelper.triggerEmail(
				oViewModel.getProperty("/shareSendMailAddress"),
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},
		
		onSendToDeveloper: function(oEvent) {
			// Email info
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
				oViewModel = this.getView().getModel("view");

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding("devmodel");

			if (oElementBinding.getBoundContext()) {
				var sPath = oElementBinding.getPath(),
					oObject = oView.getModel("devmodel").getObject(sPath);
			}

			if (oObject) {
				var sItmNum = oObject.itmNum;
				var sWRWKNUM = oObject.WRWKNum;
				var sStatus = oObject.overallStatus;
				var sStatusTXT = oResourceBundle.getText("overallStatus" + oObject.overallStatus);
				var sWRWKDES = oObject.description;
				var sFA = oObject.functionalAnalyst;
				var sFAFNAME = oObject.faFName;
				var sTECHLEAD = oObject.techLead;
				var sTECHLEADFNAME = oObject.techLeadFName;
				var sTeamLead = oObject.teamLead;
				var sTeamLeadFName = oObject.teamLeadFName;
				var sDeveloper = oObject.developer;
				var sDeveloperFName = oObject.developerFName;
				var sCodeReviewer = oObject.codeReviewer;
				var sCodeReviewerFName = oObject.codeReviewerFName;
			}

			var sReciever;
			var sRecieverID;
			var sLink;

			sRecieverID = sDeveloper;
			sReciever = sDeveloperFName;
			sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myCode&/codingItem/" + sItmNum + "/item?tab=function";

			if (sReciever && sLink) {
				oViewModel.setProperty("/shareSendMailAddress", oResourceBundle.getText("shareSendMailAddress", [sRecieverID]));
				oViewModel.setProperty("/shareSendEmailSubject", oResourceBundle.getText("shareSendEmailObjectSubject", [sWRWKNUM, sStatusTXT]));
				oViewModel.setProperty("/shareSendEmailMessage", oResourceBundle.getText("shareSendEmailObjectMessage", [sReciever, sWRWKNUM,
					sWRWKDES, sLink
				]));
			}

			sap.m.URLHelper.triggerEmail(
				oViewModel.getProperty("/shareSendMailAddress"),
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},
		
		onSendToReviewer: function(oEvent) {
			// Email info
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
				oViewModel = this.getView().getModel("view");

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding("devmodel");

			if (oElementBinding.getBoundContext()) {
				var sPath = oElementBinding.getPath(),
					oObject = oView.getModel("devmodel").getObject(sPath);
			}

			if (oObject) {
				var sItmNum = oObject.itmNum;
				var sWRWKNUM = oObject.WRWKNum;
				var sStatus = oObject.overallStatus;
				var sStatusTXT = oResourceBundle.getText("overallStatus" + oObject.overallStatus);
				var sWRWKDES = oObject.description;
				var sFA = oObject.functionalAnalyst;
				var sFAFNAME = oObject.faFName;
				var sTECHLEAD = oObject.techLead;
				var sTECHLEADFNAME = oObject.techLeadFName;
				var sTeamLead = oObject.teamLead;
				var sTeamLeadFName = oObject.teamLeadFName;
				var sDeveloper = oObject.developer;
				var sDeveloperFName = oObject.developerFName;
				var sCodeReviewer = oObject.codeReviewer;
				var sCodeReviewerFName = oObject.codeReviewerFName;
			}

			var sReciever;
			var sRecieverID;
			var sLink;

			sRecieverID = sCodeReviewer;
			sReciever = sCodeReviewerFName;
			sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myReview&/reviewItem/" + sItmNum + "/item?tab=codeReview";
	
			if (sReciever && sLink) {
				oViewModel.setProperty("/shareSendMailAddress", oResourceBundle.getText("shareSendMailAddress", [sRecieverID]));
				oViewModel.setProperty("/shareSendEmailSubject", oResourceBundle.getText("shareSendEmailObjectSubject", [sWRWKNUM, sStatusTXT]));
				oViewModel.setProperty("/shareSendEmailMessage", oResourceBundle.getText("shareSendEmailObjectMessage", [sReciever, sWRWKNUM,
					sWRWKDES, sLink
				]));
			}

			sap.m.URLHelper.triggerEmail(
				oViewModel.getProperty("/shareSendMailAddress"),
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},
			
		onShareEmailPress: function(oEvent) {
			// Email info
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
				oViewModel = this.getView().getModel("view");

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding("devmodel");

			if (oElementBinding.getBoundContext()) {
				var sPath = oElementBinding.getPath(),
					oObject = oView.getModel("devmodel").getObject(sPath);
			}

			if (oObject) {
				var sItmNum = oObject.itmNum;
				var sWRWKNUM = oObject.WRWKNum;
				var sStatus = oObject.overallStatus;
				var sStatusTXT = oResourceBundle.getText("overallStatus" + oObject.overallStatus);
				var sWRWKDES = oObject.description;
				var sFA = oObject.functionalAnalyst;
				var sFAFNAME = oObject.faFName;
				var sTECHLEAD = oObject.techLead;
				var sTECHLEADFNAME = oObject.techLeadFName;
			}

			var sReciever;
			var sRecieverID;
			var sLink;
			switch (sStatus) {
				case "00": //Not Started
				case "10": //FS Preparation
					sRecieverID = sFA;
					sReciever = sFAFNAME;
					sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myDevRequests&/requestItem/" + sItmNum + "/item?tab=info";
				case "11": //FS Rejected
					sRecieverID = sFA;
					sReciever = sFAFNAME;
					sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myDevRequests&/requestItem/" + sItmNum + "/item?tab=info";
				case "20": //Ready For Design
					sRecieverID = sTECHLEAD;
					sReciever = sTECHLEADFNAME;
					sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myDevRequests&/designItem/" + sItmNum + "/item?tab=info";
				default:
			}

			if (sReciever && sLink) {
				oViewModel.setProperty("/shareSendMailAddress", oResourceBundle.getText("shareSendMailAddress", [sRecieverID]));
				oViewModel.setProperty("/shareSendEmailSubject", oResourceBundle.getText("shareSendEmailObjectSubject", [sWRWKNUM, sStatusTXT]));
				oViewModel.setProperty("/shareSendEmailMessage", oResourceBundle.getText("shareSendEmailObjectMessage", [sReciever, sWRWKNUM,
					sWRWKDES, sLink
				]));
			}

			sap.m.URLHelper.triggerEmail(
				oViewModel.getProperty("/shareSendMailAddress"),
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);

		},

		onNavBack: function() {
			//this.getView().getModel("devmodel").refresh(true);

			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(oDIU);
				oRouter.navTo("detail", {
					itemPath: oDIU._navBack
				});
			}
		},

		onNavBackHome: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home", true);
		},

		_onNumberLiveChange: function (oEvent) {
			var oInput = oEvent.getSource();
			oInput.setValueState("None");
			oInput.setValueStateText("");
		},
		
		_onReleaseChange: function(oEvent) {
			var sItem = oEvent.getParameters().selectedItem;
			var sKey = sItem.getKey();
			if (sKey) {
				this.getView().byId("dummyReleaseMilestoneDate1").setSelectedKey(sKey);
				var sText = this.getView().byId("dummyReleaseMilestoneDate1").getSelectedItem().getText();
				this.getView().byId("FSReleaseMilestoneDate1").setValue(sText);
			} else {
				this.getView().byId("FSReleaseMilestoneDate1").setValue("");
			}
			
			this.handleReleaseChange(oEvent);
		},

		handleReleaseChange: function(oEvent) {
			var oSelect = oEvent.getSource();

			if (oSelect) {
				var key = oSelect.getSelectedKey();
				this.getView().byId("releaseDate1").setValue("");
				switch (key) {
					case "THU":
						this.getView().getModel("view").setProperty("/releaseDateVisible", true);
						this.getView().byId("releaseDateLabel1").setVisible(true);
						this.getView().byId("releaseDate1").setVisible(true);
						break;
					case "TUE":
						this.getView().getModel("view").setProperty("/releaseDateVisible", true);
						this.getView().byId("releaseDateLabel1").setVisible(true);
						this.getView().byId("releaseDate1").setVisible(true);
						break;
					default:
						this.getView().getModel("view").setProperty("/releaseDateVisible", false);
						this.getView().byId("releaseDateLabel1").setVisible(false);
						this.getView().byId("releaseDate1").setVisible(false);
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
			var sNetWorkNumber = this.getView().byId("NetworkNumber1").getValue();
			
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("NetworkNumber", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
			
		},
		
		_handleNetworkHelpConfirm:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber1").getValue();
			
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var networkInput = this.getView().byId("NetworkNumber1");
				var activityInput = this.getView().byId("Activity1");
				networkInput.setValue(oSelectedItem.getCells()[0].getTitle());
				activityInput.setValue(oSelectedItem.getCells()[1].getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
			
		},
		
		_handleNetworkHelpClose:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber1").getValue();
			
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var networkInput = this.getView().byId("NetworkNumber1");
				var activityInput = this.getView().byId("Activity1");
				networkInput.setValue(oSelectedItem.getCells()[0].getTitle());
				activityInput.setValue(oSelectedItem.getCells()[1].getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},

		_onActivityValueHelp:function(oEvent){
			var sNetWorkNumber = this.getView().byId("NetworkNumber1").getValue();
			
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
			var sNetWorkNumber = this.getView().byId("NetworkNumber1").getValue();
			
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
				var activityInput = this.getView().byId("Activity1");
				activityInput.setValue(oSelectedItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		
		_handleActivityHelpClose:function(oEvent){
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var activityInput = this.getView().byId("Activity1");
				activityInput.setValue(oSelectedItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		
		onSaveItemChange: function() {
			var isError;
			var newItem = this.getView().getModel("devmodel");
			var oEntry = {};
			
			// collect input controls
			var inputs = [];
			inputs.push(this.getView().byId("WRWKNum1"));
			inputs.push(this.getView().byId("title1"));

			if (this.getView().getModel("view").getProperty("/releaseDateVisible")) {
				inputs.push(this.getView().byId("releaseDate1"));
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
			
			oEntry.itmNum = this.getView().byId("itemNumber").getValue();
			oEntry.WRWKNum = this.getView().byId("WRWKNum1").getValue();
			oEntry.description = this.getView().byId("title1").getValue();
			oEntry.releaseDate = this.getView().byId("releaseDate1").getValue();
			oEntry.devApproach = this.getView().byId("devApproach1").getSelectedKey();
			oEntry.priority = this.getView().byId("priority1").getSelectedKey();
			//			oEntry.RICEF = this.getView().byId("RICEF1").getSelectedKey();
			oEntry.releaseKey = this.getView().byId("release1").getSelectedKey();
			//			oEntry.system = this.getView().byId("SAPSystem1").getSelectedKey();
			//			oEntry.estimateABAPDays = this.getView().byId("estimateABAPDays1").getValue();
			oEntry.FSLink = this.getView().byId("FSLink1").getValue();
			oEntry.FSMileStoneDate = this.getView().byId("FSReleaseMilestoneDate1").getValue();
			oEntry.FSPromiseDate = this.getView().byId("FSPromiseDate1").getValue();
			oEntry.FSReceiveDate = this.getView().byId("FSActualReceiveDate1").getValue();
			
			oEntry.chargeCode = this.getView().byId("NetworkNumber1").getValue();
			oEntry.activity = this.getView().byId("Activity1").getValue();
			
			//			oEntry.FSStatus = this.getView().byId("FSStatus1").getSelectedKey();
			//			oEntry.planCompleteDate = this.getView().byId("targetDevCompleteDate1").getValue();
			oEntry.functionalAnalyst = this.getView().byId("functionalAnalyst1").getSelectedKey();
			oEntry.teamLead = this.getView().byId("teamLead1").getSelectedKey();
			oEntry.techLead = this.getView().byId("techLead1").getSelectedKey();
			oEntry.developer = this.getView().byId("Developer1").getSelectedKey();
			oEntry.codeReviewer = this.getView().byId("codeReviewer1").getSelectedKey();
			oEntry.overallStatus = this.getView().byId("CurrentStatus1").getSelectedKey();
			var sPath = "/devItemsSet('" + oEntry.itmNum + "')";
			newItem.update(sPath, oEntry, {
				success: jQuery.proxy(function(data, response) {
					MessageToast.show("Item update success");
					newItem.refresh();
					oDIU.onNavBack();
				}, this),
				error: jQuery.proxy(function(err) {
					MessageToast.show("item update error");
				}, this)
			});
		},

		onDeleteDevItem: function(evt) {
			var sQuestion = "The item will be deleted"; //this.getResourceBundle().getText("deleteText"),

			var _deleteItem = function() {
				var item = this.getView().byId("itemNumber").getValue();
				//var status = this.getView().byId("CurrentStatus1").getSelectedKey();
				if (item === "") {
					return;
				}
				// if (status !== "00" && status !== "01") {
				// 	MessageToast.show("Cannot be deleted");
				// 	return;
				// }
				
				var oModel = this.getView().getModel("devmodel");

				var sPath = "/devItemsSet('" + item + "')";
				oModel.remove(sPath, {
					success: jQuery.proxy(function(data, response) {
						MessageToast.show("Delete success");
						oDIU.onNavBackHome();
						oModel.refresh();
					}, this),
					error: jQuery.proxy(function(err) {
						MessageToast.show("Delete failed");
					}, this)
				});
			}.bind(this);

			// Opens the confirmation dialog
			MessageBox.show(sQuestion, {
				icon: MessageBox.Icon.WARNING,
				title: "Delete",
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				onClose: function(oAction) {
					if (oAction === MessageBox.Action.OK) {
						_deleteItem();
					} else {
						return;
					}
				}
			});

		},

		/**
		 * Event handler for metadata loaded event
		 * @function
		 * @private
		 */
		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getView().getModel("view");

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},
	});
});