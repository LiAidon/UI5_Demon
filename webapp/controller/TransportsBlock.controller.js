sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		"ADTracker/model/formatter",
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller,formatter, JSONModel) {
	"use strict";

	return Controller.extend("ADTracker.controller.TransportsBlock", {
		formatter : formatter,
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			
		},
		
		_onObjectMatched: function (oEvent) {
			var sPath="devmodel>/" + oEvent.getParameter("arguments").itemPath;
			var oView = this.getView();
			var oTR = oView.byId("idTransports");
			var trPath = sPath + '/transportsSet';
			var trItem = oView.byId("idTransportsItem");
			oTR.bindItems(trPath,trItem);
		}
	});
});