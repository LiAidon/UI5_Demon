sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/Device"
], function(UIComponent, JSONModel, ResourceModel, ODataModel, Device) {
	"use strict";
	return UIComponent.extend("ADTracker.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			var oConfig = this.getMetadata().getConfig();
			
			UIComponent.prototype.init.apply(this, arguments);

			this._gloableAction = {
				Manage: true,
				Display: false
			};

			// set i18n model
			var i18nModel = new ResourceModel({
				bundleName: "ADTracker.i18n.i18n"
			});
			this.setModel(i18nModel, "i18n");
			
			var oDevModel = new ODataModel(oConfig.devRemote, {
				json: true,
				loadMetadataAsync: true,
				defaultCountMode: "None"
			});
			oDevModel.setUseBatch(false);
			this.setModel(oDevModel, "devmodel");
			this._createMetadataPromise(oDevModel);

			// set the count mode for default
			//this.getModel().setDefaultCountMode(sap.ui.model.odata.CountMode.None);

			this._getGloablSemanticObject();
			// create the views based on the url/hash
			this.getRouter().initialize();

			// set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
		},

		_getGloablSemanticObject: function() {
			var sNewHash = hasher.getHash();
			if (sNewHash === "" || sNewHash === undefined) {
				return;
			}

			var oShellHash = sap.ushell.Container.getService("URLParsing").parseShellHash(sNewHash);

			if (oShellHash) {

				if (oShellHash.semanticObject === "ZADSAP" && oShellHash.action === "myTracker") {
					this._gloableAction.Manage = true;
					this._gloableAction.Display = false;

				} else if (oShellHash.semanticObject === "ZADSAP" && oShellHash.action === "devTrackerDisplay") {
					this._gloableAction.Manage = false;
					this._gloableAction.Display = true;
				}

			}
		},

		getContentDensityClass: function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		/**
		 * Creates a promise which is resolved when the metadata is loaded.
		 * @param {sap.ui.core.Model} oModel the app model
		 * @private
		 */
		_createMetadataPromise: function(oModel) {
			this.oWhenMetadataIsLoaded = new Promise(function(fnResolve, fnReject) {
				oModel.attachEventOnce("metadataLoaded", fnResolve);
				oModel.attachEventOnce("metadataFailed", fnReject);
			});
		}

	});
});