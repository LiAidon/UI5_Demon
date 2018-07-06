sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		"ADTracker/model/formatter",
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller,formatter, JSONModel) {
	"use strict";

	return Controller.extend("ADTracker.controller.IterationsBlock", {
		formatter : formatter,
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			
		},
		
		_onObjectMatched: function (oEvent) {
//			var sPath="itr>/" + oEvent.getParameter("arguments").itemPath;
			var sPath="devmodel>/" + oEvent.getParameter("arguments").itemPath;
//			this.getView().bindElement({
//				path: sPath,
//				model: "devmodel"
//			});
			var oView = this.getView();
//			var oModel = this.getView().getModel("devmodel");
//			oView.setModel(oModel,'itr')
			var oItr = oView.byId("idIterations");
			var itrPath = sPath + '/iterationsSet';
			var itrItem = oView.byId("idIterationsItem");
//			oItr.setModel(oModel,'itr');
			oItr.bindItems(itrPath,itrItem);
		}
	});
});