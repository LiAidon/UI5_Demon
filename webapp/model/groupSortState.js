sap.ui.define([		"sap/ui/base/Object",
            		"sap/ui/model/Sorter"
               ], function(BaseObject, Sorter) {
	"use strict";
	return BaseObject.extend("ADTracker.model.groupSortState",{
		/**
		 * Creates sorters and groupers for the dev list.
		 * Since grouping also means sorting, this class modifies the viewmodel.
		 * If a user groups by a field, and there is a corresponding sort option, the option will be chosen.
		 * If a user ungroups, the sorting will be reset to the default sorting.
		 * @class
		 * @public
		 * @param {sap.ui.model.json.JSONModel} oViewModel the model of the current view
		 * @param {function} fnGroupFunction the grouping function to be applied
		 * @alias sap.ui.demo.masterdetail.model.GroupSortState
		 */
		constructor: function (oViewModel, fnGroupFunction) {
			this._oViewModel = oViewModel;
			this._fnGroupFunction = fnGroupFunction;
		},
		
		/**
		 * Sorts by key field
		 *
		 * @param {string} sKey - the key of the field used for grouping
		 * @returns {sap.ui.model.Sorter[]} an array of sorters
		 */
		sort: function (sKey,bDescending,bGroup) {
			var sGroupedBy = this._oViewModel.getProperty("/groupBy");

			if (sGroupedBy !== "None") {
				// If the list is grouped, remove the grouping since the user wants to sort by something different
				// Grouping only works if the list is primary sorted by the grouping - the first sorten contains a grouper function
				this._oViewModel.setProperty("/groupBy", "None");
			}

			return [new Sorter(sKey, bDescending ,bGroup)];
		},

		/**
		 * Groups by key field, or resets the grouping for the key "None"
		 *
		 * @param {string} sKey - the key of the field used for grouping
		 * @returns {sap.ui.model.Sorter[]} an array of sorters
		 */
		group: function (sKey,bDescending,bGroup) {
			var aSorters = [];
			var vGroup;
			if (bGroup===""||bGroup===undefined) {
				if(this._fnGroupFunction[sKey]) {
					vGroup = this._fnGroupFunction[sKey].bind(this);
				} else {
					vGroup = true;
				}
				
			} else {
				vGroup = bGroup;
			}
			
			if (sKey === "None") {
				// select the default sorting again
				this._oViewModel.setProperty("/sortBy", "release");
				
			} else {
				// Grouping means sorting so we set the select to the same Entity used for grouping
				this._oViewModel.setProperty("/sortBy", sKey);

				aSorters.push(
					new Sorter(sKey, bDescending, vGroup)
				);
			}

			return aSorters;
		}
		
	});
});