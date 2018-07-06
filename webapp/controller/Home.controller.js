sap.ui.define(
	["jquery.sap.global",
	 "sap/ui/core/mvc/Controller",
	 "sap/ui/model/json/JSONModel",
	 'sap/m/MessagePopover',
	 'sap/m/MessagePopoverItem',
	 "ADTracker/model/formatter"
	],
	function (jQuery,Controller,JSONModel,MessagePopover,MessagePopoverItem, formatter){
	"use strict";
	jQuery.sap.require("ADTracker.util.Public");
	
	var oMessageTemplate = new MessagePopoverItem({
		type: '{type}',
		title: '{title}',
		description: '{description}'
		});
	
	var oMessagePopover = new MessagePopover({
		items:{
			path: '/',
			template: oMessageTemplate
		}
	});
	return Controller.extend("ADTracker.controller.Home",{
		formatter: formatter,
		
		onInit : function(){
			//this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			var oViewModel = new JSONModel({
				actionVisible: true,
			});
			
			this.getView().setModel(oViewModel, "homeView");
			
			var visible = ADTracker.util.Public.setGloableActionVisible(this);
			
			this.getView().getModel("homeView").setProperty("/actionVisible", visible);
			
			var aMockMsg=[{
				type:'Error',
				title: 'Error message',
				description: "this is a long text for description for the detail informaiton of the error"
			},{
				type:'Warning',
				title: 'Warning message',
				description: "this is a long text for description for the detail informaiton of the error"
			},{
				type:'Success',
				title: 'Success message',
				description: "this is a long text for description for the detail informaiton of the error"
			},{
				type:'Information',
				title: 'information message',
				description: "this is a long text for description for the detail informaiton of the error"
			},{
				type:'Error',
				title: 'Error message',
				description: "this is a long text for description for the detail informaiton of the error"
			}
			]
			
			var oMsgModel = new JSONModel();
			oMsgModel.setData(aMockMsg);
			oMessagePopover.setModel(oMsgModel);
			
		},
		
		onMessagesButtonPress: function(oEvent) {
			oMessagePopover.openBy(oEvent.getSource());
		},
		
		onUserListPress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("user");
		},
		
		onNewItemPress:function(evt){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("new");
		}
		
	});
});