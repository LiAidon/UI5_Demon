var uFAID, gPath;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"ADTracker/model/formatter",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(Controller, History, formatter, MessageToast, JSONModel) {
	"use strict";
	jQuery.sap.require("ADTracker.util.Public");

	return Controller.extend("ADTracker.controller.DevDetail", {
		formatter: formatter,
		onInit: function() {
			var oViewModel = new JSONModel({
				currency: "EUR",
				actionVisible: true,
				RPCLink: "",
				shareSendMailAddress: "",
				shareSendEmailSubject: "",
				shareSendEmailMessage: ""
			});
			this.getView().setModel(oViewModel, "view");

			var visible = ADTracker.util.Public.setGloableActionVisible(this);
			this.getView().getModel("view").setProperty("/actionVisible", visible);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);

			var oDataProcessFlowNodes = {
				lanes: [{
						id: 0,
						icon: "sap-icon://begin",
						label: "Not Started",
						position: 0
					}, {
						id: "1",
						icon: "sap-icon://documents",
						label: "FS Preparation",
						position: 1
					}, {
						id: "2",
						icon: "sap-icon://money-bills",
						label: "Ready For Design",
						position: 2
					}, {
						id: "3",
						icon: "sap-icon://money-bills",
						label: "Ready for Coding",
						position: 3
					},
					//{id: "4", icon: "sap-icon://payment-approval", label: "Ready for Code Review", position: 4},
					{
						id: "5",
						icon: "sap-icon://nurse",
						label: "Closed",
						position: 4
					}
				]
			};

			var oSModel = new sap.ui.model.json.JSONModel();
			oSModel.setData(oDataProcessFlowNodes);
			this.getView().setModel(oSModel, "pf2");

			var oProcessFlowItems = {};
			oProcessFlowItems = {
				node: [{
					nodeVisible: true,
					percentage: 0,
					valueColor: "Error",
					text: "Not Started",
					arrowVisible: true
				}, {
					nodeVisible: true,
					percentage: 0,
					valueColor: "transparent",
					text: "FS",
					arrowVisible: true
				}, {
					nodeVisible: true,
					percentage: 0,
					valueColor: "transparent",
					text: "TAD",
					arrowVisible: true
				}, {
					nodeVisible: true,
					percentage: 0,
					valueColor: "transparent",
					text: "Coding",
					arrowVisible: true
				}, {
					nodeVisible: true,
					percentage: 0,
					valueColor: "transparent",
					text: "Review",
					arrowVisible: true
				}, {
					nodeVisible: true,
					percentage: 0,
					valueColor: "transparent",
					text: "Completed",
					arrowVisible: false
				}]
			};

			var oNModel = new sap.ui.model.json.JSONModel();
			oNModel.setData(oProcessFlowItems);
			this.getView().setModel(oNModel, "process");

		},

		setModelContent: function(status) {
			if (status === undefined) {
				//var status = this.getView().byId("overallStatusID").getText();
			}

			var oProcessFlowItems = {};

			//var status = this.getView().byId("overallStatusID").getText();
			switch (status) {
				case "00":
					oProcessFlowItems = {
						// Not Started
						node: [{
							nodeVisible: true,
							percentage: 0,
							valueColor: "Error",
							text: "Not Started",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;
				case "08":
					oProcessFlowItems = {
						// Ready for Close
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 99,
							valueColor: "Critical",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "09":
					oProcessFlowItems = {
						// Closed
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;
				case "10": // FS Preparation
					oProcessFlowItems = {
						// FS Preparation
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "Error",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "11": // FS Rejected
					oProcessFlowItems = {
						// FS Rejected
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 50,
							valueColor: "Error",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "20": // Ready For Design
					oProcessFlowItems = {
						// Ready For Design
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "Error",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "30": // Ready for Coding
					oProcessFlowItems = {
						// Ready for Coding
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "Error",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "31": // Coding In Progress
					oProcessFlowItems = {
						// Coding In Progress
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 50,
							valueColor: "Critical",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "32": // Coding Completed
					oProcessFlowItems = {
						// Coding Completed
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "Error",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "33": // Code Review Rejected
					oProcessFlowItems = {
						// Code Review Rejected
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 80,
							valueColor: "Error",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 50,
							valueColor: "Critical",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "34": // Code Review Approved
					oProcessFlowItems = {
						// Code Review Approved
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "35": // Ready for Testing
					oProcessFlowItems = {
						// Ready for Testing
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "36": // QC Code Review Rejected
					oProcessFlowItems = {
						// QC Code Review Rejected
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 90,
							valueColor: "Error",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 50,
							valueColor: "Critical",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "37": // QC Code Review Approved
					oProcessFlowItems = {
						// QC Code Review Approved
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "40": // Ready for Code Review
					oProcessFlowItems = {
						// Ready for Code Review
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "Error",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				case "41": // Ready for QC Code Review
					oProcessFlowItems = {
						// Ready for QC Code Review	
						node: [{
							nodeVisible: false,
							percentage: 100,
							valueColor: "Good",
							text: "Not Started",
							arrowVisible: false
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 100,
							valueColor: "Good",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 50,
							valueColor: "Critical",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;

				default:
					oProcessFlowItems = {
						// 	
						node: [{
							nodeVisible: true,
							percentage: 0,
							valueColor: "Error",
							text: "Not Started",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "FS",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "TAD",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Coding",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Review",
							arrowVisible: true
						}, {
							nodeVisible: true,
							percentage: 0,
							valueColor: "transparent",
							text: "Completed",
							arrowVisible: false
						}]
					};
					break;
			}

			var oNModel = this.getView().getModel("process");
			oNModel.setData(oProcessFlowItems);
		},

		_onBindingChange: function(oEvent) {
			var oElementBinding = this.getView().getElementBinding("devmodel");
			var status = oElementBinding.getBoundContext().getObject().overallStatus;

			this.setModelContent(status);
		},

		_onObjectMatched: function(oEvent) {
			this._selPath = "/" + oEvent.getParameter("arguments").itemPath;
			gPath = "/" + oEvent.getParameter("arguments").itemPath;
			var that = this;
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").itemPath,
				parameters: {
					expand: 'linkListSet'
				},
				model: "devmodel",
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {},
					dataReceived: function() {
						var oElementBinding = that.getView().getElementBinding("devmodel");
						var status = oElementBinding.getBoundContext().getObject().overallStatus;
						that.setModelContent(status);
					}
				}
			});

			var sUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, {
				json: true,
				loadMetadataAsync: true,
				defaultCountMode: "None"
			});
			this.getView().setModel(oModel, "famodel");
			var sPath = "/" + oEvent.getParameter("arguments").itemPath;
			//var oModel = this.getView().getModel("devmodel");
			oModel.read(sPath, null, null, false,
				function(oData, oResponse) {
					uFAID = oData.functionalAnalyst;
					console.log("Read model with customer search failed");
				},
				function(oData, oResponse) {
					console.log("Read model with customer search failed");
				}
			);

			this.getView().bindElement({
				path: "/userRolesSet(userID='" + uFAID + "',role='Functional Analyst')",
				model: "famodel"
			});
		},
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home", true);
			}
		},

		_getVal: function(evt) {
			return sap.ui.getCore().byId(evt.getParameter('id')).getText();
		},
		onPhonePress: function(evt) {
			sap.m.URLHelper.triggerTel(this._getVal(evt));
		},
		onMailPress: function(evt) {
			sap.m.URLHelper.triggerEmail(this._getVal(evt), "Info Request");
		},

		onRatingChange: function(oEvent) {
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		},

		_onNavigationLink: function(oEvent) {
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("ADTracker.view.LinkQickView", this);
				this.getView().addDependent(this._oPopover);
			}

			if (this._oPopover) {
				var linkList = sap.ui.getCore().byId("linkQickViewList");
				var linkListItem = sap.ui.getCore().byId("linkQickViewListItem");
				var linkListPath = "devmodel>" + this.getView().getElementBinding("devmodel").getPath() + "/linkListSet";

				linkList.bindItems(linkListPath, linkListItem);
				
				var aFilters = [];
				
				switch (oEvent.getSource().getText()) {
					case "Open FS Link":
						var oFilter = new sap.ui.model.Filter("Type", "EQ", "FS");
						aFilters.push(oFilter);
						break;
					case "Open TAD Link":
						var oFilter = new sap.ui.model.Filter("Type", "EQ", "TAD");
						aFilters.push(oFilter);
						break;
					case "Open TS Link":
						var oFilter = new sap.ui.model.Filter("Type", "EQ", "TS");
						aFilters.push(oFilter);
						break;
					default:
						break;
				}

				//var itmNum = this.getView().getElementBinding("devmodel").getBoundContext().getObject().itmNum;
				//aFilters.push(new sap.ui.model.Filter("Devnum", "EQ", itmNum));

				linkList.getBinding("items").filter(aFilters, "Application");
			}

			// delay because addDependent will do a async rerendering and the popover will immediately close without it
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._oPopover.openBy(oButton);
			});

		},

		onEmail: function(oEvent) {
			var oButton = oEvent.getSource();

			// create action sheet only once
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment("ADTracker.view.MailDialog", this);
				this.getView().addDependent(this._actionSheet);

				this._actionSheet.setPlacement(sap.m.PlacementType.Bottom);
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
			sLink = "https://dev-apps.airproducts.com/sap/fiori#ZADSAP-myTracker&/detail/devItemsSet('" + sItmNum + "')";

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

		onChangeDevItem: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("updated", {
				updateitem: gPath.substr(1)
			});
		},
	});
});