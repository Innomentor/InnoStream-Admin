sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"InnoStreamAdmin/InnoStreamAdmin/js/Firebase",
	"sap/m/MessageBox",
	"sap/ui/core/BusyIndicator"
], function (Controller, Firebase, MessageBox, BusyIndicator) {
	"use strict";

	return Controller.extend("InnoStreamAdmin.InnoStreamAdmin.controller.Login", {
		onInit: function () {
			sap.ui.core.BusyIndicator.show();
			this.admin = false;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("Login").attachPatternMatched(this._handleRouteMatched, this);
			sap.ui.core.BusyIndicator.hide();
		},

		_handleRouteMatched: function (evt) {
			sap.ui.core.BusyIndicator.show();
			this.getView().getParent().getParent().setMode("HideMode");
			this.getView().getParent().getParent()._oShowMasterBtn.setVisible(false);
			//Session Login Check
			var fireAuth = this.getView().getModel("fbModel").getData().fireAuth;
			fireAuth.onAuthStateChanged(function (user) {
				if (user && this.admin === true) {
					//that.oRouter.navTo("Admin");
					sap.ui.core.BusyIndicator.hide();
				} else {
					//that.oRouter.navTo("");
					sap.ui.core.BusyIndicator.hide();
				}
			});
		},

		onASignin: function (oEvent) {
			var that = this;
			var oGlobalBusyDialog = new sap.m.BusyDialog();
			oGlobalBusyDialog.open();
			// sap.ui.core.BusyIndicator.show();
			var email = this.byId("idu_admin").getValue();
			var password = this.byId("idp_admin").getValue();
			var errorMessage = "";
			// Create a Fireauth Auth reference
			var oModel = this.getView().getModel("fbModel").getData();
			localStorage.setItem("oModelFireAuth", JSON.stringify(oModel.fireAuth));
			var fireAuth = oModel.fireAuth;
			var firestoreData = oModel.firestore;
			fireAuth.signInWithEmailAndPassword(email, password).then(function (usersigned) {
				var docData = firestoreData.collection("DoctorPrivate").doc(usersigned.user.uid);
				docData.get().then(function (success) {
					that.oRouter.navTo("Dashboard", true);
					that.admin = true;
					oGlobalBusyDialog.close();
					// sap.ui.core.BusyIndicator.hide();
					that.onReset();
				}).catch(function (error) {
					sap.ui.core.BusyIndicator.hide();
					// Handle Errors here.
					that.admin = false;
					errorMessage = error.message;
					MessageBox.error(errorMessage);
				});
			}).catch(function (error) {
				sap.ui.core.BusyIndicator.hide();
				// Handle Errors here.
				errorMessage = error.message;
				MessageBox.error(errorMessage);
			});
		},

		onReset: function (oEvent) {
			var that = this;
			that.byId("idu_admin").setValue("");
			that.byId("idp_admin").setValue("");
		}
	});
});