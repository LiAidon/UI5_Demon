var oUser;
sap.ui.define(
	["sap/ui/core/mvc/Controller",
	 "sap/m/MessageToast",
	 "sap/ui/model/json/JSONModel",
	 "sap/ui/model/Filter",
	 "sap/ui/model/Sorter",
	 "sap/ui/model/FilterOperator",
	 "sap/ui/model/resource/ResourceModel",
	 "sap/ui/core/routing/History"
	],
//	ADTracker 6: adding MessageToast as the parameter to use in the extention
	function (Controller,MessageToast,JSONModel,Filter,Sorter,FilterOperator,ResourceModel,History){
	"use strict";
	jQuery.sap.require("ADTracker.util.Public");
	
	return Controller.extend("ADTracker.controller.UserList",{
		onInit : function(){
			oUser=this;
			var oViewModel = new JSONModel({
				mode: "None",
				actionVisible: true
			});

			this.getView().setModel(oViewModel, "userlistview");
			
			var visible = ADTracker.util.Public.setGloableActionVisible(this);
			
			this.getView().getModel("userlistview").setProperty("/actionVisible", visible);
		},
		
		_onObjectMatched: function (oEvent) {
//			var sUrl = "/proxy/http/services.odata.org/V2/Northwind/Northwind.svc/";
//			var oModel = new sap.ui.model.odata.ODataModel(sUrl, {json: true,loadMetadataAsync: true});
//			this.getView().setModel(oModel);
/*			var sPath="/" + "userRolesSet";
			
			this.getView().bindElement({
				path: sPath,
				model: "usermodel"
			});*/
		},
		
		onOpenDialog : function () {

		},
		
		onGroupChange : function(oEvent){
			var aSorter = [];
			var mParams = oEvent.getParameters();
			var sPath = oEvent.getParameters().selectedItem.getProperty("key");

			if (sPath === "None"){
				aSorter.push(new Sorter("role",false,false));
			}else{
				aSorter.push(new Sorter(sPath,false,true));
			}

			var oDevList = this.getView().byId("userList");
			var oBinding = oDevList.getBinding("items");
			oBinding.sort(aSorter);
		},
		
		onSearchUserList : function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("userID", FilterOperator.Contains, sQuery));
				aFilter.push(new Filter("firstName", FilterOperator.Contains, sQuery));
				aFilter.push(new Filter("lastName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oDevList = this.getView().byId("userList");
			var oBinding = oDevList.getBinding("items");
			oBinding.filter(new sap.ui.model.Filter(aFilter));
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
		
		onUserSelected: function(evt){
			var sPath = evt.getParameter("listItem").getBindingContext("devmodel").getPath();
			this._oChangeUserDialog=null;
			if (!this._oChangeUserDialog) {
	            this._oChangeUserDialog = sap.ui.xmlfragment("ADTracker.view.ChangeUserDialog",this);
				
	            this.getView().addDependent(this._oChangeUserDialog);
	            sap.ui.getCore().byId("smartForm").bindElement({
					path: sPath,
					model: "devmodel"
				});
	         }
			this._oChangeUserDialog.open()
			
		},
		
		onChangeUser: function(){
			var oViewModel = this.getView().getModel("userlistview");
			var sMode = oViewModel.getProperty("/mode");
			if (sMode === "None"){
				oViewModel.setProperty("/mode", "SingleSelect");
			}else{
				oViewModel.setProperty("/mode", "None");
			};
			
		},
		
		onNewUser:function(){
			this._oNewUserDialog=null;
			if (!this._oNewUserDialog) {
	            this._oNewUserDialog = sap.ui.xmlfragment("ADTracker.view.NewUserDialog",this);
	            this.getView().addDependent(this._oNewUserDialog);
	         }
			this._oNewUserDialog.open()
		},
		
		onSaveUserDialog:function(){
			var newItem=this.getView().getModel("devmodel");
			var oEntry = {};

			oEntry.userID = sap.ui.getCore().byId("APEXID1").getValue();
			oEntry.firstName = sap.ui.getCore().byId("Firstname1").getValue();
			oEntry.role = sap.ui.getCore().byId("Role1").getValue();
			oEntry.lastName = sap.ui.getCore().byId("Lastname1").getValue();
			oEntry.telephone = sap.ui.getCore().byId("TelNo1").getValue();
			oEntry.mobilephone = sap.ui.getCore().byId("Mobile1").getValue();
			var sPath = "/userRolesSet(userID='" + oEntry.userID + "',role='" + oEntry.role + "')";
			newItem.update(sPath, oEntry,{
				success: jQuery.proxy(function(data, response){
					console.log("user updated")
				},this),
				error : jQuery.proxy(function(err){
					console.log("user not exist");
				},this),
			});
			newItem.refresh(true);
			var oViewModel = this.getView().getModel("userlistview");
			var sMode = oViewModel.getProperty("/mode");
			oViewModel.setProperty("/mode", "None");
			
			if (this._oChangeUserDialog){
				this._oChangeUserDialog.destroy(true);
			}
			
		},
		
		onDeleteUserDialog: function(e){
			var deleteItem = this.getView().getModel("devmodel");
			var oEntry = {};

			oEntry.userID = sap.ui.getCore().byId("APEXID1").getValue();
			oEntry.role = sap.ui.getCore().byId("Role1").getValue();
			var sPath = "/userRolesSet(userID='" + oEntry.userID + "',role='" + oEntry.role + "')";
			deleteItem.remove(sPath, {
    			success: jQuery.proxy(function(data, response){
    				MessageToast.show("User deleted");
    				deleteItem.refresh();
    			},this),
    			error : jQuery.proxy(function(err){
    				MessageToast.show("deleted failed");
    			},this),
    		});
			
			var oViewModel = this.getView().getModel("userlistview");
			var sMode = oViewModel.getProperty("/mode");
			oViewModel.setProperty("/mode", "None");
			
			if (this._oChangeUserDialog){
				this._oChangeUserDialog.destroy(true);
			}
		},
		
		onCancelUserDialog:function(){
			if (this._oChangeUserDialog){
				this._oChangeUserDialog.destroy(true);
			}
		},
		
		onNewSaveUserDialog:function(){
			var newItem=this.getView().getModel("devmodel");
			var oEntry = {};

			oEntry.userID = sap.ui.getCore().byId("APEXID").getValue();
			oEntry.firstName = sap.ui.getCore().byId("Firstname").getValue();
			oEntry.role = sap.ui.getCore().byId("Role").getSelectedKey();
			oEntry.lastName = sap.ui.getCore().byId("Lastname").getValue();
			oEntry.telephone = sap.ui.getCore().byId("TelNo").getValue();
			oEntry.mobilephone = sap.ui.getCore().byId("Mobile").getValue();
			var sPath = "/userRolesSet";
			newItem.create(sPath, oEntry,{
				success: jQuery.proxy(function(data, response){
					MessageToast.show("user created");
					newItem.refresh();
				},this),
				error : jQuery.proxy(function(err){
					MessageToast.show("failed");
				},this),
			});
			if (this._oNewUserDialog){
				this._oNewUserDialog.destroy(true);
			}
		},
		
		onNewCancelUserDialog:function(){
			if (this._oNewUserDialog){
				this._oNewUserDialog.destroy(true);
			}
		}
	});
});
