sap.ui.define([], function() {
	"use strict";
	return {
		overallStatusText: function(sStatus) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
					var textName = "overallStatus" + sStatus;
					return resourceBundle.getText(textName);
		},
		
		overallEditable :  function(sStatus) {
			switch (sStatus) {
				case "09":
					return false;
				default:
					return true;
			}
		},

		CheckReleaseDateVisible: function(releaseKey) {
			switch (releaseKey) {
				case "TUE":
					return true;
				case "THU":
					return true;
				default:
					return false;
			}
		},

		CheckIsTRTransported: function(IsTRTransported) {
			switch (IsTRTransported) {
				case "X":
					return false;
				default:
					return true;
			}
		},
		
		getNodePath :  function(sStatus) {
			var path = "{process>/node}";
			
			if (sStatus) {
				path = "{process>/node" + sStatus + "}";
			} 
			
			return path;
		},
		
		decodeURL: function(Link) {
			if (Link) {
				return decodeURIComponent(Link);
			}
		},

		decodeName: function(Link) {
			if (Link) {
				var linkNew = decodeURI(Link);
				linkNew = linkNew.split('/').pop().split('?')[0];
				
				var extentionNew = linkNew.split('.').pop();
				 if (extentionNew === 'do') {
				 	return "Open Link to check detail";
				 }
				return decodeURI(linkNew);
			}
		},
		
		setProcess00Visible :  function(sStatus) {
			switch (sStatus) {
				case "00":
					return true;
				default:
					return false;
			}
		},
		
		setProcess10Percentage :  function(sStatus) {
			switch (sStatus) {
				case "":
					return 0;
					
				case "00":
					return 0;
					
				case "10":
					return 0;
					
				case "11":
					return 50;
					
				default:
					return 100;
			}
		},
		
		setProcess10Color :  function(sStatus) {
			switch (sStatus) {
				case "00":
					return "Good";
					
				case "10":
					return "Good";
					
				case "11":
					return "Error";
					
				default:
					return "Good";
			}
		},
		
		setProcess20Percentage :  function(sStatus) {
			
			var status = parseInt(sStatus);
			
			
			switch (sStatus) {
				case "":
					return 0;
					
				case "00":
					return 0;
					
				case "10":
					return 0;
					
				case "11":
					return 0;

				case "20":
					return 0;
					
				default:
					return 100;
			}
		},
		
		setProcess20Color :  function(sStatus) {
			
			switch (sStatus) {
				case "":
					return "Good";
					
				case "00":
					return "Good";
					
				case "10":
					return "Good";
					
				case "11":
					return "Good";

				case "20":
					return "Good";
					
				default:
					return "Good";
			}
		},
		
		getImageURI :  function(sID) {
			var imagePath;
			
			if (sID) {
				imagePath = "/images/imageID_" + sID + ".png";
				
				//imagePath = "https://" + "outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=" + sID + "@airproducts.com&size=HR240x240";

			} else {
				imagePath = "/images/nopic.png";
				return jQuery.sap.getModulePath("ADTracker", imagePath);
			}
			
			if (imagePath) {
				return  imagePath;
			}
		},
		
		overallItemEditable :  function(sStatus, bVisible) {
			if (!bVisible) {
				return bVisible;
			}
			
			switch (sStatus) {
				case "09":
					return false;
				default:
					return true;
			}
		},
		
		setGloableActionVisible :  function() {
			var component = this.getOwnerComponent();
			
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
			
		},
		
		overallStatusState :  function(sStatus) {
			switch (sStatus) {
				case "":
					return "Error";
				case "00":
					return "Warning";
				case "01":
					return "Warning";
				case "09":
					return "None";
				case "08":
					return "Warning";
				case "11":
					return "Error";
				default:
					return "Success";
			}
		},
		
		emailButtonVisible :  function(sStatus) {
			switch (sStatus) {
			case "10":
				return true;
			case "11":
				return true;
			case "20":
				return true;
			default:
				return false;
			}
		},
		
		FSStatusIcon : function(devApproach, FSMileStoneDate, FSPromiseDate, FSReceiveDate, FSLink) {
			if (devApproach==="AGILE") {
				return "sap-icon://alert";
			}
			var oCurrentDate = new Date();
			var sCurrentDate = oCurrentDate.toISOString().slice(0,10);
			
			var sDate1;
			var sDate2;
			
			if(FSPromiseDate==="") {
				sDate1 = FSMileStoneDate;
			} else {
				sDate1 = FSPromiseDate;
			}
			
			if(FSReceiveDate===""){
				sDate2 = sCurrentDate;
			} else {
				sDate2 = FSReceiveDate;
			}
			
			sDate2=sDate2.split("/").join("");
			sDate2=sDate2.split("-").join("");
			sDate1=sDate1.split("/").join("");
			sDate1=sDate1.split("-").join("");
			
			if (FSLink!=="") {
				return "sap-icon://status-positive";
			}
			
			if(sDate2>=sDate1){
				//red
				return "sap-icon://status-negative";
			} else {
				return "sap-icon://status-positive";
			}
			
		},
		
		FSStatusText : function(devApproach, FSMileStoneDate, FSPromiseDate, FSReceiveDate, FSLink) {
			
		},
		
		FSStatusTooltip : function(devApproach, FSMileStoneDate, FSPromiseDate, FSReceiveDate, FSLink) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			if (devApproach==="AGILE") {
				return resourceBundle.getText("StatusTooltip01");
			}
			var oCurrentDate = new Date();
			var sCurrentDate = oCurrentDate.toISOString().slice(0,10);
			
			var sDate1;
			var sDate2;
			
			if(FSPromiseDate==="") {
				sDate1 = FSMileStoneDate;
			} else {
				sDate1 = FSPromiseDate;
			}
			
			if(FSReceiveDate===""){
				sDate2 = sCurrentDate;
			} else {
				sDate2 = FSReceiveDate;
			}
			
			sDate2=sDate2.split("/").join("");
			sDate2=sDate2.split("-").join("");
			sDate1=sDate1.split("/").join("");
			sDate1=sDate1.split("-").join("");
			
			if (FSLink!=="") {
				return resourceBundle.getText("StatusTooltip03");
			}
			
			if(sDate2>=sDate1){
				//red
				return resourceBundle.getText("StatusTooltip02");
			} else {
				return resourceBundle.getText("StatusTooltip03");
			}	
		},
		
		FSStatusState : function(devApproach, FSMileStoneDate, FSPromiseDate, FSReceiveDate, FSLink) {
			if (devApproach==="AGILE") {
				return "Success";
			}
			var oCurrentDate = new Date();
			var sCurrentDate = oCurrentDate.toISOString().slice(0,10);
			
			var sDate1;
			var sDate2;
			
			if(FSPromiseDate==="") {
				sDate1 = FSMileStoneDate;
			} else {
				sDate1 = FSPromiseDate;
			}
			
			if(FSReceiveDate===""){
				sDate2 = sCurrentDate;
			} else {
				sDate2 = FSReceiveDate;
			}
			
			sDate2=sDate2.split("/").join("");
			sDate2=sDate2.split("-").join("");
			sDate1=sDate1.split("/").join("");
			sDate1=sDate1.split("-").join("");
			
			if (FSLink!=="") {
				return "Success";
			}
			
			if(sDate2>=sDate1){
				//red
				return "Error";
			} else {
				return "Success";
			}
		},
				  
		ReasonIcon : function(ReasonCode){
			switch (ReasonCode) {
			case "FS":
				return "sap-icon://activity-items";
			case "FS00":
				return "sap-icon://employee-approvals";
			case "CR":
				return "sap-icon://activity-items";
			case "CR00":
				return "sap-icon://employee-approvals";
			case "QC":
				return "sap-icon://activity-items";
			case "QC00":
				return "sap-icon://employee-approvals";
			default:
				return "sap-icon://employee-rejections";
			}
		},
		ReasonText : function(ReasonCode){
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var textName = "ReasonCode" + ReasonCode;
			
			switch (ReasonCode) {
			case "FS":
				return resourceBundle.getText(textName);
			case "FS00":
				return resourceBundle.getText(textName);
			case "CR":
				return resourceBundle.getText(textName);
			case "CR00":
				return resourceBundle.getText(textName);
			case "QC":
				return resourceBundle.getText(textName);
			case "QC00":
				return resourceBundle.getText(textName);
			default:
				return resourceBundle.getText("ReasonCodeReject");
			}
			
		},
		ReasonState : function(ReasonCode){
			switch (ReasonCode) {
			case "FS":
				return "None";
			case "FS00":
				return "Success";
			case "CR":
				return "None";
			case "CR00":
				return "Success";
			case "QC":
				return "None";
			case "QC00":
				return "Success";
			default:
				return "Error";
			}
		},
		
		itrTypeText:  function(sItrType) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch (sItrType) {
				case "FS":
					return resourceBundle.getText("itrTextFS");
				case "CR":
					return resourceBundle.getText("itrTextCR");
				case "TR":
					return resourceBundle.getText("itrTextTR");
				default:
					return sItrType;
			}
		}
	};
});