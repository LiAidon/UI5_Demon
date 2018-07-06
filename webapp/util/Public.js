/*global ADTracker */
(function() {
	'use strict';
	jQuery.sap.declare("ADTracker.util.Public");
	jQuery.sap.require("jquery.sap.global");
	jQuery.sap.require("jquery.sap.script");

	ADTracker.util.Public = {};

	/**
	 * set Global visible
	 * @param {object} oController  controller which used to call the function
	 */
	ADTracker.util.Public.setGloableActionVisible = function(oController) {
		var component = oController.getOwnerComponent();
		
		if (component !== undefined && component !== null && component !== "") {
			var gloableAction = component._gloableAction;
			if (gloableAction !== undefined && gloableAction !== null && gloableAction !== "") {
				var displayOnly = gloableAction.Display;
				if (displayOnly !== undefined && displayOnly !== null && displayOnly !== "") {
					return !displayOnly;
				}
			}
		}
		
		return true;
	};

}());