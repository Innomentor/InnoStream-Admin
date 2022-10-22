sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessagePopover",
	"sap/m/MessagePopoverItem",
	"sap/m/Button",
	"sap/m/Token",
	"InnoStreamAdmin/InnoStreamAdmin/model/formatter"
], function (Controller, UIComponent, Fragment, MessageBox, BusyIndicator, MessagePopover, MessagePopoverItem, Button, Token, formatter) {
	"use strict";
	var oMessageTemplate;
	var oMessagePopover;
	return Controller.extend("InnoStreamAdmin.InnoStreamAdmin.js.BaseController", {
		// some basic functionalities
		formatter: formatter,
		setInit: function () {
			try {
				var that = this;
				//Session Login Check
				var fireAuth = this.getView().getModel("fbModel").getData().fireAuth;
				fireAuth.onAuthStateChanged(function (user) {
					if (!user) {
						that.oRouter.navTo("Login", true);
					} else {
						that.adminID = that.getOwnerComponent().getModel("AppConfig").setProperty("/adminID", user.uid);
					}
				});
				// Message Popover
				var headerButton = new sap.m.Button({
					text: "Clear",
					type: sap.m.ButtonType.Reject,
					press: function () {
						that.onClearNotification();
					}
				});
				oMessageTemplate = new MessagePopoverItem({
					type: '{T}',
					title: '{S}'
				});
				oMessagePopover = new MessagePopover({
					items: {
						path: '/',
						template: oMessageTemplate
					},
					headerButton: headerButton
				});
				var pop_msgModel = new sap.ui.model.json.JSONModel({
					"messagesLength": "",
					"type": "Default"
				});
				this.getView().setModel(pop_msgModel, "popoverModel");
				var popModel = new sap.ui.model.json.JSONModel({});
				oMessagePopover.setModel(popModel);
			} catch (e) {
				console.log("The errror", e);
			}
		},

		// just this.getRouter() ...
		getRouter: function () {

			// ... instead of
			return UIComponent.getRouterFor(this);

		},

		// just this.getModel() ...
		getModel: function (sName) {

			// ... instead of
			return this.getView().getModel(sName);

		},

		// just this.setModel() ...
		setModel: function (oModel, sName) {

			// ... instead of
			return this.getView().setModel(oModel, sName);

		},

		// just this.getResoureBundle() ... 
		getResourceBundle: function () {

			// ... instead of
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();

		},

		// calculate something
		randomCalculations: function (fValue1, fValue2) {

			// do some calculations

		},

		/**
		 * onUserSettingsPress is invoked from UI Button cLick for Standalone Apps. 
		 * Input: oEvent
		 * Output: A responsive popover with User Info, About and Logout option
		 */

		onUserSettingsPress: function (oEvent) {
			var oButton = oEvent.getSource();
			var that = this;
			if (!this._oPopover) {
				Fragment.load({
					name: "Healthbridge-admin.Healthbridge-admin.fragment.userSettings",
					controller: that
				}).then(function (oPopover) {
					that._oPopover = oPopover;
					that.getView().addDependent(that._oPopover);
					that._oPopover.openBy(oButton);
				}.bind(that));
			} else {
				that._oPopover.openBy(oButton);
			}
		},

		/**
		 * onUserAboutPress is invoked from UI Button cLick for Standalone Apps. 
		 * Input: oEvent
		 * Output: Message Box with current Version Info
		 */

		onUserAboutPress: function (oEvent) {
			// Bundle for i18n 
			var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			MessageBox.information(oBundle.getText("appInfo"));
		},

		/**
		 * onSignOutPress is invoked from UI Button cLick for Standalone Apps. 
		 * Input: oEvent
		 * Output: User is Signed off
		 */

		onSignOutPress: function (oEvent) {
			var that = this;
			var errorMessage = "";
			this.fireAuth = this.getView().getModel("fbModel").getData().fireAuth;
			this.oRouter = this.getOwnerComponent().getRouter();
			this.fireAuth.signOut().then(function (success) {
				that.oRouter.navTo("Login", true);
				// jQuery.sap.storage.put(that.userID, null);
			}).catch(function (error) {
				// Handle Errors here.
				that.oRouter.navTo("Login", true);
				errorMessage = error.message;
				sap.m.MessageBox.error(errorMessage);
			});
		},

		/**
		 * onExpandPress is invoked from UI on press of button Expand. 
		 * Input: current mode -- Full Screen or Pane Screen
		 * Output: opposite mode -- Pane Screen or Full Screen
		 */

		onExpandPress: function (oEvent) {
			var navVisible = this.getView().getParent().getParent().getMode();
			if (navVisible === "ShowHideMode") {
				this.getView().getParent().getParent().setMode("HideMode");
				oEvent.getSource().setIcon("sap-icon://exit-full-screen");
			} else {
				this.getView().getParent().getParent().setMode("ShowHideMode");
				oEvent.getSource().setIcon("sap-icon://full-screen");
			}
			this.getView().getParent().getParent()._oShowMasterBtn.setVisible(false);
		},

		/**
		 * handleMessagePopoverPress is invoked on click from UI. 
		 * Input: oEvent
		 * Output: Message Popover opens up or closes
		 */

		handleMessagePopoverPress: function (oEvent) {
			oMessagePopover.toggle(oEvent.getSource());
		},

		/**
		 * onUserPPPress is invoked on click from UI. 
		 * Input: oEvent
		 * Output: Link in new page
		 */

		onUserPPPress: function (oEvent) {
			var https = "https://";
			var url = https + "healthbridge-intl.com/privacy-policy/";
			window.open(url, '_blank');
		},

		/**
		 * onClearNotification is invoked on click of Clear from UI. 
		 * Input: Message Model
		 * Output: Empty Message Model
		 */

		onClearNotification: function (oEvent) {
			// Clear Popover Messages
			this.getView().getModel("popoverModel").setData({
				"messagesLength": "",
				"type": "Default"
			});
			this.getView().getModel("popoverModel").refresh(true);
			oMessagePopover.getModel().setData("");
			oMessagePopover.getModel().refresh(true);
		},

		onUploadImage: function (oEvent, iCollectionName, iFile) {
			var collectionName = iCollectionName;
			// Get File
			var file = iFile;
			// Create a Store Ref
			var Firestore = this.getView().getModel("fbModel").getData().fireStorage;
			var storageRef = Firestore.ref(collectionName + '/' + file.name);
			// Upload files
			var task = storageRef.put(file);
			// Get Links
			task.on('state_changed',
				function progress(snapshot) {},
				function error(err) {
					MessageBox.error("File Upload failed for: " + file.name + ". Please uplaod this file again!");
				},
				function complete(data) {

				});
			this.ImageUrl = 'https://' + 'firebasestorage.googleapis.com/v0/b/healthbridgeprod.appspot.com/o/' + collectionName + '%2F' +
				file.name +
				'?alt=media';
		},

		onFileSizeExceed: function (oEvent) {
			MessageBox.error("File is too big. Please uplaod file with size less than 1MB again!");
		},

		onTypeMissmatchc: function () {
			MessageBox.error("Only png, jpg and jpeg images allowed. Please uplaod the right file again!");
		},

		onUploadSpecific: function (oEvent, dialogName) {
			this.byId(dialogName).removeAllItems();
		},

		onFilenameLengthExceed: function (oEvent) {
			MessageBox.error("File Name is too lenghty. Please uplaod file with name less than 30 characters again!");
		},

		/* Token Functionality*/
		onPressEnter: function (oEvent, ocompCode) {
			if (ocompCode) {
				ocompCode.addValidator(function (args) {
					var text = args.text;
					return new Token({
						key: text,
						text: "\"" + text + "\""
					});
				});
			}
		}
	});

});