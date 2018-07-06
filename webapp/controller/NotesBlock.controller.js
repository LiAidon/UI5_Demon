var noteController;
sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/m/Dialog',
		'sap/m/Button',
		'sap/m/Text',
		'sap/m/TextArea',
		"ADTracker/model/formatter",
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller,Dialog,Button,Text,TextArea,formatter, JSONModel) {
	"use strict";

	return Controller.extend("ADTracker.controller.NotesBlock", {
		formatter : formatter,
		onInit: function () {
			noteController = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			
		},
		
		onNewNote:function(){
			var dialog = new Dialog({
				title: 'Add New Note',
				type: 'Message',
				content: [
					new TextArea('newNoteArea', {
						width: '100%',
						placeholder: 'Input new notes here'
					})
				],
				beginButton: new Button({
					text: 'Submit',
					press: function () {
						noteController._updateNote();
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		
		_updateNote:function(){
			var inputText = sap.ui.getCore().byId("newNoteArea").getValue();
			var newItem=noteController.getView().getModel('devmodel');
			var oEntry = {};
			oEntry.Devnum = noteController._itemSel;
			oEntry.Note = inputText;
			var sPath = "/feedsSet";
			newItem.create(sPath, oEntry,{
				success: jQuery.proxy(function(data, response){
					console.log("feed created")
				},this),
				error : jQuery.proxy(function(err){
					console.log("feed already exist");
				},this),
			});
//			newItem.refresh();
		},
		
		_onObjectMatched: function (oEvent) {
			var sPath="devmodel>/" + oEvent.getParameter("arguments").itemPath;
			var splitRes = oEvent.getParameter("arguments").itemPath.split("'");
			this._itemSel = splitRes[1];
			var oView = this.getView();
			var oNote = oView.byId("idNotes");
			var notePath = sPath + '/feedsSet';
			var noteItem = oView.byId("idNotesItem");
			oNote.bindAggregation("content", {
			  	path: notePath,
			  	template: noteItem
			});
//			oObj.bindItems(objPath,objItem);
		}
	});
});