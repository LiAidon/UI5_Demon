sap.ui.define([
    "jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"ADTracker/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/Sorter",
	"sap/ui/model/FilterOperator",
	"ADTracker/model/grouper",
	"ADTracker/model/groupers",
	"ADTracker/model/groupSortState"
], function (jQuery,Controller, JSONModel,formatter,Filter,Sorter,FilterOperator,grouper, groupers,groupSortState) {
	"use strict";

	return Controller.extend("ADTracker.controller.DevList", {
		formatter : formatter,
		onInit : function () {
			var oList = this.byId("devList");
			var oViewModel = new JSONModel({
				currency: "EUR",
				userID:"",
				isFilterBarVisible: false,
				filterBarLabel: "",
				delay: 0,
				sortBy: "release",
				groupBy: "release"
			});
			this._oList = oList;
			
			this._oGroupSortState = new groupSortState(oViewModel, grouper.groupFunction(this.getOwnerComponent().getModel("i18n").getResourceBundle()));
			// keeps the filter and search state
			this._oListFilterState = {
				aFilter: [],
				aSegFilter: [],
				aRelFilter: [],
				aSearch: []
			};
			this.getView().setModel(oViewModel, "view");
			
/*			var userID = sap.ushell.Container.getUser().getId();
			if (userID) {
				this.getView().getModel("view").setProperty("/userID", userID);
			}*/
			
			this.mGroupFunctions = {overallStatus: groupers.overallStatus(this.getOwnerComponent().getModel("i18n").getResourceBundle())};
			
			var oList = this.byId("devList");
			var that = this;
			oList.attachEventOnce("updateFinished", function() {
				that._handleSegFilter("upcoming");
			});
		},

		onSearchDevList : function (oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
				return;
			}

			var sQuery = oEvent.getParameter("query");

			if (sQuery) {
				var oFilter1 = new Filter("WRWKNum", FilterOperator.Contains, sQuery);
				var oFilter2 = new Filter("description", FilterOperator.Contains, sQuery);
				this._oListFilterState.aSearch = new Filter([oFilter1,oFilter2]);
			} else {
				this._oListFilterState.aSearch = [];
			}
			this._applyFilterSearch();
			
		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @private
		 */
		_applyFilterSearch: function() {
			var aFilters = this._oListFilterState.aSearch,
				oViewModel = this.getView().getModel("view");
			this.getView().byId("devList").getBinding("items").filter(aFilters, "Application");
		},

		/**
		 * Internal helper method that sets the filter bar visibility property and the label's caption to be shown
		 * @param {string} sFilterBarText the selected filter value
		 * @private
		 */
//		_updateFilterBar: function(sFilterBarText) {
//			var oViewModel = this.getModel("masterView");
//			oViewModel.setProperty("/isFilterBarVisible", (this._oListFilterState.aFilter.length > 0));
//			oViewModel.setProperty("/filterBarLabel", this.getResourceBundle().getText("masterFilterBarText", [sFilterBarText]));
//		},
		
		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh : function () {
			this.getView().byId("devList").getBinding("items").refresh();
		},
		
		onSegSelect:function(evt){
			var key = evt.getParameters().key;
			
			this._handleSegFilter(key);
		},
		
		_handleSegFilter : function(key) {
			var aAllFilter = [];
			//var aFilters = [];
			var aFilter = [];
			var bFilter = [];
			
			switch (key) {
			case "incident":
				//aFilter.push(new Filter("teamLead", FilterOperator.EQ, '#2'));
				aFilter.push(new sap.ui.model.Filter('specialFilter', FilterOperator.EQ, '$4'));
				break;
				
			case "mine":
				//aFilter.push(new Filter("teamLead", FilterOperator.EQ, '#2'));
				aFilter.push(new sap.ui.model.Filter('specialFilter', FilterOperator.EQ, '$1'));
				break;
				
			case "upcoming":
				// var oCurrentDate = new Date();
				// var yMonth = oCurrentDate.toISOString().slice(0,7).replace(/-/g,"");
				// bFilter.push(new sap.ui.model.Filter('Ymonth', FilterOperator.GE, yMonth));
				// bFilter.push(new sap.ui.model.Filter('releaseKey', FilterOperator.EQ, "UN"));
				// if (bFilter.length > 0) {
				// 	var cFilter = new sap.ui.model.Filter(bFilter, false);
				// 	aFilter.push(cFilter);
				// }
				// aFilter.push(new sap.ui.model.Filter('overallStatus', FilterOperator.NE, '09'));
				
				aFilter.push(new sap.ui.model.Filter('specialFilter', FilterOperator.EQ, '$2'));
				break;
				
			case "fslate":
				// aFilter.push(new sap.ui.model.Filter('FSStatus', FilterOperator.EQ, '##'));
				// aFilter.push(new sap.ui.model.Filter('releaseKey', FilterOperator.NE, 'UN'));
				// aFilter.push(new sap.ui.model.Filter('overallStatus', FilterOperator.EQ, '00'));
				// aFilter.push(new sap.ui.model.Filter('overallStatus', FilterOperator.EQ, '10'));
				// aFilter.push(new sap.ui.model.Filter('overallStatus', FilterOperator.EQ, '11'));
				// aFilter.push(new sap.ui.model.Filter('overallStatus', FilterOperator.EQ, '20'));
				
				aFilter.push(new sap.ui.model.Filter('specialFilter', FilterOperator.EQ, '$3'));
				break;

			case "All":
				break;
				
			default:
				break;
			}
			
			// if (aFilter.length > 0) {
			// 	aFilters = aFilter;
			// }

			this._oListFilterState.aSegFilter = aFilter;

			jQuery.each(this._oListFilterState.aSegFilter, function (i, eFilter) {
				aAllFilter.push(eFilter);
			});
			
			jQuery.each(this._oListFilterState.aRelFilter, function (i, eFilter) {
				aAllFilter.push(eFilter);
			});
			
			// filter binding
			var oDevList = this.getView().byId("devList");
			var oBinding = oDevList.getBinding("items");
			oBinding.filter(aAllFilter);
		},
		
		onSort: function () {
			if (!this._oSortDialog){
				this._oSortDialog = sap.ui.xmlfragment("ADTracker.view.DevSorter", this);
			}
			jQuery.sap.syncStyleClass("sapUiSizeCompact",this.getView(),this._oSortDialog);
			this._oSortDialog.open();
		},
		
		onSortConfirm : function(oEvent) {
			var aSorter = [];
			var mParams = oEvent.getParameters();
			var sPath = mParams.sortItem.getKey();
			var bDesc = mParams.sortDescending;
			aSorter.push(new Sorter(sPath,bDesc));

			this._applyGroupSort(aSorter);
		},
		
		onViewSetting : function(oEvent) {
			if (! this._oViewSettingDialog) {
				this._oViewSettingDialog = sap.ui.xmlfragment("ADTracker.view.DevViewSetting", this);
				this.getView().addDependent(this._oViewSettingDialog);
			}
			
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oViewSettingDialog);
			this._oViewSettingDialog.open();
		},
		
		onViewSettingConfirm : function(oEvent) {
			var mParams = oEvent.getParameters();
			
			// apply filters to binding
			var aFilters = [];
			jQuery.each(mParams.filterItems, function (i, oItem) {
				var sPath = oItem.getParent().getKey();
				var sOperator = "EQ";
				var sValue1 = oItem.getKey();
				
				var oFilter = new Filter(sPath, sOperator, sValue1);
				aFilters.push(oFilter);
			});

			this._applyFilter(aFilters);
		},
		
		handleListClose: function(oEvent) {
			// Get the Facet Filter lists and construct a (nested) filter for the binding
			var oFacetFilter = oEvent.getSource().getParent();
			var mFacetFilterLists = oFacetFilter.getLists().filter(function(oList) {
					return oList.getActive() && oList.getSelectedItems().length;
				});
 
 
			// Build the nested filter with ORs between the values of each group and
			// ANDs between each group
/*			var oFilter = new Filter(mFacetFilterLists.map(function(oList) {
				return new Filter(oList.getSelectedItems().map(function(oItem) {
					return new Filter(oList.getKey(), "EQ", oItem.getKey());
				}), false);
			}), true);*/

			var oFilter = [];
			jQuery.each(mFacetFilterLists, function (i, oList) {
				jQuery.each(oList.getSelectedItems(), function (i, oItem) {
					oFilter.push(new Filter(oList.getKey(), "EQ", oItem.getKey()));
				});
	
			});
			
			this._oListFilterState.aRelFilter = oFilter;
			
			var aAllFilters = [];
			var bAllFilters = [];
			
			jQuery.each(this._oListFilterState.aSegFilter, function (i, eFilter) {
				aAllFilters.push(eFilter);
			});
			
			jQuery.each(this._oListFilterState.aRelFilter, function (i, eFilter) {
				bAllFilters.push(eFilter);
			});

			if (aAllFilters.length) {
				var cFilter = new Filter(aAllFilters , true);
				bAllFilters.push(cFilter);
			}
			
			this._applyFilter(bAllFilters);
		},
		
		/**
		 * Used to create GroupHeaders with non-capitalized caption.
		 * These headers are inserted into the list to
		 * group the list's items.
		 * @param {Object} oGroup group whose text is to be displayed
		 * @public
		 * @returns {sap.m.GroupHeaderListItem} group header with non-capitalized caption.
		 */
		createGroupHeader: function(oGroup) {
			var grp = new sap.m.GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			});

			return grp;
		},
		
		onGroupChange : function(oEvent){
			var aSorter = [];
			var mParams = oEvent.getParameters();
			var sPath = oEvent.getParameters().selectedItem.getProperty("key");
			var bDescending = true;
			var bGroup = true;
			aSorter = this._oGroupSortState.group(sPath,bDescending);
			
			if (sPath === "None"){
				bGroup = false;
				aSorter.push(new Sorter("releaseKey",true));
			}
			
			if (sPath !== "None" && sPath !== "releaseKey" && sPath !== "release"){
				aSorter.push(new Sorter("releaseKey",true));
			}
			
			this._applyGroupSort(aSorter);
		},
		
		/**
		 * Internal helper method to apply both group and sort state together on the list binding
		 * @param {sap.ui.model.Sorter[]} aSorters an array of sorters
		 * @private
		 */
		_applyGroupSort : function (aSorters) {
			this._oList.getBinding("items").sort(aSorters);
		},
		
		/**
		 * Internal helper method to apply filter on the list binding
		 * @param {sap.ui.model.Filter[]} aFilters an array of filters
		 * @private
		 */
		_applyFilter : function (aFilters) {
			this._oList.getBinding("items").filter(aFilters);
		},
		
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				itemPath: oItem.getBindingContext("devmodel").getPath().substr(1)
			});
		}
	});
});