var TOT;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"ADTracker/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel,formatter,Filter,FilterOperator) {
	"use strict";

	return Controller.extend("ADTracker.controller.DevHeader", {
		onInit: function() {
			var oViewModel = new JSONModel({
				title: ""
			});
			
			this.getView().setModel(oViewModel, "devHeaderView");
			
			this.setCounts();
			
			// var sUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			// var oModel = new sap.ui.model.odata.ODataModel(sUrl, {json: true,loadMetadataAsync: true,defaultCountMode: "None"});
			// this.getView().setModel(oModel,"chartmodel");
			// var chartComp = this.getView().byId("001");
			// chartComp.bindElement({
			// 	path: "/headerAnalysisSet('001')",
			// 	model: "chartmodel"
			// });
			
			// var sUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			// var oModel = new sap.ui.model.odata.ODataModel(sUrl, {json: true,loadMetadataAsync: true,defaultCountMode: "None"});
			// this.getView().setModel(oModel,"chartmodel2");
			// var chartComp2 = this.getView().byId("002");
			// chartComp2.bindElement({
			// 	path: "/headerAnalysisSet('002')",
			// 	model: "chartmodel2"
			// });
			
			// var sUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			// var oModel = new sap.ui.model.odata.ODataModel(sUrl, {json: true,loadMetadataAsync: true,defaultCountMode: "None"});
			// this.getView().setModel(oModel,"chartmodel3");
			// var chartComp3 = this.getView().byId("003");
			// chartComp3.bindElement({
			// 	path: "/headerAnalysisSet('003')",
			// 	model: "chartmodel3"
			// });
			
			// var sUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			// var oModel = new sap.ui.model.odata.ODataModel(sUrl, {json: true,loadMetadataAsync: true,defaultCountMode: "None"});
			// this.getView().setModel(oModel,"chartmodel4");
			// var chartComp4 = this.getView().byId("004");
			// chartComp4.bindElement({
			// 	path: "/headerAnalysisSet('004')",
			// 	model: "chartmodel4"
			// });
			
			// var sUrl = "/sap/opu/odata/sap/ZADSAP_SRV/";
			// var oModel = new sap.ui.model.odata.ODataModel(sUrl, {json: true,loadMetadataAsync: true,defaultCountMode: "None"});
			// this.getView().setModel(oModel,"chartmodel5");
			// var chartComp5 = this.getView().byId("005");
			// chartComp4.bindElement({
			// 	path: "/headerAnalysisSet('005')",
			// 	model: "chartmodel5"
			// });
		  },

		setCounts:function(){
			var sServiceUrl = "/sap/opu/odata/sap/ZADSAP_SRV/"
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, {json: true,loadMetadataAsync: true,defaultCountMode: "None"});
			oModel.read('/devItemsSet/$count',null, null, false, 
					function(oData,oResponse) {						
					TOT = oResponse.body;
				},
				function(oData,oResponse) {
					console.log("Error handling");
				}			
			);
			
			var sTitle;
			// only update the counter if the length is final
			sTitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("headerCount", [TOT]);;
//			sTitle = this.getResourceBundle().getText("devHeaderView", [TOT]);
			this.getView().getModel("devHeaderView").setProperty("/title", sTitle);
		},
		onNew: function (evt) {
		    jQuery.sap.require("sap.m.MessageBox");
		    sap.m.MessageBox.alert("filter by status!");
		  },
		onTech: function (evt) {
			jQuery.sap.require("sap.m.MessageBox");
		    sap.m.MessageBox.alert("Link was clicked!");
		},
		onDev: function (evt) {
			jQuery.sap.require("sap.m.MessageBox");
		    sap.m.MessageBox.alert("Link was clicked!");
		},
		onRev: function (evt) {
			jQuery.sap.require("sap.m.MessageBox");
		    sap.m.MessageBox.alert("Link was clicked!");
		},
	});
});