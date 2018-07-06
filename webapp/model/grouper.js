sap.ui.define([], function() {
	"use strict";
	
	/*
	 * Use this file to implement the custom grouping functions
	 * The predefined functions are to be called with .bind() and handed over to a sap.ui.model.Sorter
	 * return value for all your functions is an object with  key-text pairs
	 * the oContext parameter is not under your control!
	 */
	return {
		groupFunction : function (oResourceBundle) {
			var overallStatus = this.overallStatus(oResourceBundle);
			var teamLead = this.teamLead(oResourceBundle);
			var techLead = this.techLead(oResourceBundle);
			var functionalAnalyst  = this.functionalAnalyst(oResourceBundle);
			var developer  = this.developer(oResourceBundle);
			var codeReviewer  = this.codeReviewer(oResourceBundle);
			var releaseKey  = this.releaseKey(oResourceBundle);
			return {overallStatus: overallStatus, 
					teamLead: teamLead, 
					techLead: techLead, 
					functionalAnalyst: functionalAnalyst,
					developer: developer,
					codeReviewer: codeReviewer};
		},
		
		/**
		 * Groups the items by status
		 * This grouping function needs the resource bundle so we pass it as a dependency
		 * @param {sap.ui.model.resource.ResourceModel} oResourceBundle the resource bundle of your i18n model
		 * @returns {Function} the grouper function you can pass to your sorter
		 */
		overallStatus : function (oResourceBundle) {
			return function (oContext) {
				var sStatus = oContext.getProperty("overallStatus"),
					sKey,
					sText;

					sKey = sStatus;
					if(oResourceBundle) {
						sKey = oResourceBundle.getText("overallStatus"+sStatus);
						sText = sKey ;
					} else {
						sText = sKey;
					}
					

				return {
					key: sKey,
					text: sText
				};
			};
		},
	
		releaseKey : function (oResourceBundle) {
			return function (oContext) {
				var sReleaseKey = oContext.getProperty("releaseKey"),
					sRelease = oContext.getProperty("release"),
					sKey,
					sText;
	
					sKey = sReleaseKey;
					if(sRelease) {
						sKey = sRelease;
					} 
					sText = sKey;
	
				return {
					key: sKey,
					text: sText
				};
			};
		},
		
		teamLead : function (oResourceBundle) {
			return function (oContext) {
				var sTeamLead = oContext.getProperty("teamLead"),
					sTeamLeadFName = oContext.getProperty("teamLeadFName"),
					sKey,
					sText;
	
					sKey = sTeamLead;
					if(sTeamLeadFName) {
						sKey = sTeamLeadFName;
					} 
					sText = sKey;
	
				return {
					key: sKey,
					text: sText
				};
			};
		},

		techLead : function (oResourceBundle) {
			return function (oContext) {
				var sTechLead = oContext.getProperty("techLead"),
					sTechLeadFName = oContext.getProperty("techLeadFName"),
					sKey,
					sText;
	
					sKey = sTechLead;
					if(sTechLeadFName) {
						sKey = sTechLeadFName;
					} 
					sText = sKey;
	
				return {
					key: sKey,
					text: sText
				};
			};
		},
		
		functionalAnalyst : function (oResourceBundle) {
			return function (oContext) {
				var sFunctionalAnalyst = oContext.getProperty("functionalAnalyst"),
					sFAFName = oContext.getProperty("faFName"),
					sKey,
					sText;
	
					sKey = sFunctionalAnalyst;
					if(sFAFName) {
						sKey = sFAFName;
					} 
					sText = sKey;
	
				return {
					key: sKey,
					text: sText
				};
			};
		},
		
		developer : function (oResourceBundle) {
			return function (oContext) {
				var sDeveloper = oContext.getProperty("developer"),
					sDeveloperFName = oContext.getProperty("developerFName"),
					sKey,
					sText;
	
					sKey = sDeveloper;
					if(sDeveloperFName) {
						sKey = sDeveloperFName;
					} 
					sText = sKey;
	
				return {
					key: sKey,
					text: sText
				};
			};
		},
		codeReviewer : function (oResourceBundle) {
			return function (oContext) {
				var sCodeReviewer = oContext.getProperty("codeReviewer"),
					sCodeReviewerFName = oContext.getProperty("codeReviewerFName"),
					sKey,
					sText;
	
					sKey = sCodeReviewer;
					if(sCodeReviewerFName) {
						sKey = sCodeReviewerFName;
					} 
					sText = sKey;
	
				return {
					key: sKey,
					text: sText
				};
			};
		}
		
	};
});