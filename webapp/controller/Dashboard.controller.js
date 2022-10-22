sap.ui.define([
	"InnoStreamAdmin/InnoStreamAdmin/js/BaseController",
	"sap/m/MessageBox",
], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("InnoStreamAdmin.InnoStreamAdmin.controller.Dashboard", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Healthbridge-admin.Healthbridge-admin.view.Dashboard
		 */
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Dashboard").attachPatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function (evt) {
			this.setInit();
			this.getView().getParent().getParent().setMode("ShowHideMode");
			this.getView().getParent().getParent()._oShowMasterBtn.setVisible(false);
			sap.ui.core.BusyIndicator.hide();
		},

		onAfterRendering: function () {
			this.setInit();
			this.onGetGlobalFields();
		},

		onEdit: function (oEvent) {
			this.getOwnerComponent().getModel("AppConfig").setProperty("/settingEdit", true);
		},

		onCancel: function (oEvent) {
			this.getOwnerComponent().getModel("AppConfig").setProperty("/settingEdit", false);
		},

		onGetGlobalFields: function (oEvent) {
			var that = this;
			debugger;
			try {
				this.firestoreData = this.getView().getModel("fbModel").getData().firestore;
				var docID = this.getOwnerComponent().getModel("AppConfig").getProperty("/docId");
				var oReports = {};
				if (this.getView().getModel("fbModel")) {
					var oModel = this.getView().getModel("fbModel").getData();
					var fireAuth = oModel.fireAuth;
					var firestoreData = oModel.firestore;
					if (!docID) {
						// check user Auth
						fireAuth.onAuthStateChanged(function (user) {
							if (!user) {
								that.oRouter.navTo("");
							} else {
								docID = user.uid;
								var collRefUsers = that.firestoreData.collection("AdminConfig").doc("5DypPDeWeBNY6iGjZgGH");
								collRefUsers.onSnapshot(collection => {
									var docData = collection.data();
									if (docData.rate) {
										that.byId("id15minCharge").setValue(docData.rate["15Mins"]);
										that.byId("id30minCharge").setValue(docData.rate["30Mins"]);
										that.byId("idhourCharge").setValue(docData.rate["hour"]);
									}
								}, error => {
									if (error) {
										MessageBox.error(error.message);
									} else {
										//MessageBox.error("Missing or insufficient permissions!");
									}
								});
							}

						});
					} else {
						var collRefUsers = that.firestoreData.collection("AdminConfig").doc("5DypPDeWeBNY6iGjZgGH");
						collRefUsers.onSnapshot(collection => {
							var docData = collection.data();
							if (docData.rate) {
								that.byId("id15minCharge").setValue(docData.rate["15Mins"]);
								that.byId("id30minCharge").setValue(docData.rate["30Mins"]);
								that.byId("idhourCharge").setValue(docData.rate["hour"]);
							}
						}, error => {
							if (error) {
								MessageBox.error(error.message);
							} else {
							//	MessageBox.error("Missing or insufficient permissions!");
							}
						});
					}
				}
			} catch (e) {
				console.log("The errror", e);
				if (e) {
					MessageBox.error(e);
				} else {
				//	MessageBox.error("Missing or insufficient permissions!");
				}
			}
		},

		onSaveGlobalFields: function (oEvent) {
			var that = this;
			var s15mincharges = this.byId("id15minCharge").getValue();
			var s30mincharges = this.byId("id30minCharge").getValue();
			var shourcharges = this.byId("idhourCharge").getValue();
			var rate = {
				"15Mins": s15mincharges,
				"30Mins": s30mincharges,
				"hour": shourcharges
			};
			var docID = this.getOwnerComponent().getModel("AppConfig").getProperty("/docId");
			var oModel = that.getView().getModel("fbModel").getData();
			var firestoreData = oModel.firestore;
			// Firebase Operation
			firestoreData.collection("AdminConfig").doc("5DypPDeWeBNY6iGjZgGH").update({
				rate: rate
			}).then(function (success) {
				that.getOwnerComponent().getModel("AppConfig").setProperty("/settingEdit", false);
				MessageBox.success("Configuration Updated Successfully");
			}).catch(function (error) {
				// Handle Errors here.
				var errorMessage = error.message;
				MessageBox.error(errorMessage);
			});

		},

		onResetGlobalFields: function (oEvent) {
			this.onGetGlobalFields();
			this.getOwnerComponent().getModel("AppConfig").setProperty("/settingEdit", false);
		},

	});

});