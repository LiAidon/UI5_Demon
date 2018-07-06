var uTEID,uTLID,uDEID,uCRID;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"ADTracker/model/formatter",
	"sap/ui/model/json/JSONModel"
], function (Controller,History,MessageToast,formatter,JSONModel) {
	"use strict";
	return Controller.extend("ADTracker.controller.PeopleBlock", {
		formatter : formatter,
		
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var sUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, {json: true,loadMetadataAsync: true,defaultCountMode: "None"});
			var sPath="/" + oEvent.getParameter("arguments").itemPath;

			oModel.read(sPath, null, null, false, 
				function(oData,oResponse) {
					uTEID = oData.teamLead;
					uTLID = oData.techLead;
					uDEID = oData.developer;
					uCRID = oData.codeReviewer;
					console.log("Read model with customer search success");
				},
				function(oData,oResponse) {
					console.log("Read model with customer search failed");
				}			
			);
			
			this.getView().setModel(oModel,"temodel");
			this.getView().bindElement({
				path: "/userRolesSet(userID='" + uTEID + "',role='Team Lead')",
				model: "temodel"
			});
			
			this.getView().setModel(oModel,"tlmodel");
			this.getView().bindElement({
				path: "/userRolesSet(userID='" + uTLID + "',role='Tech Lead')",
				model: "tlmodel"
			});
			
			this.getView().setModel(oModel,"demodel");
			this.getView().bindElement({
				path: "/userRolesSet(userID='" + uDEID + "',role='Developer')",
				model: "demodel"
			});
			
			this.getView().setModel(oModel,"crmodel");
			this.getView().bindElement({
				path: "/userRolesSet(userID='" + uCRID + "',role='Code Reviewer')",
				model: "crmodel"
			});
//			gPath="/" + oEvent.getParameter("arguments").itemPath;
//			this.getView().bindElement({
//				path: "/" + oEvent.getParameter("arguments").itemPath,
//				model: "devmodel"
//			});
			
			
//			this.getView().bindElement({
//				path: "/" + oEvent.getParameter("arguments").itemPath,
//				model: "devmodel"
//			});
			
			
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("home", true);
			}
		},
		
		_getVal:function(evt){
			return sap.ui.getCore().byId(evt.getParameter('id')).getText();
		},
		onPhonePress:function(evt){
			sap.m.URLHelper.triggerTel(this._getVal(evt));
		},
		onMailPress:function(evt){
			sap.m.URLHelper.triggerEmail(this._getVal(evt),"Info Request");
		},
		
		onRatingChange : function (oEvent) {
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		},
		
		onChangeDevItem: function (){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("updated", {
				updateitem: gPath.substr(1)
			});
		},
	});
});