sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("InnoStreamAdmin.InnoStreamAdmin.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Healthbridge-admin.Healthbridge-admin.view.Master
		 */
		onInit: function () {
			// Get Router Info
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		/**
		 * onListItemPress is invoked on click from UI. 
		 * Input: Key Maintained in Master View
		 * Output: Navigation to the Master Page
		 */
		onListItemPress: function (oEvent) {
			var that = this;
			sap.ui.core.BusyIndicator.show();
			// var sTimeOutErrorMsg = this.oBundle.getText("TimeOutError");
			var sError;
			var sToPageId = oEvent.getParameter("item").getKey();
			if (sToPageId) {
				try {
					that.oRouter.navTo(sToPageId);
				} catch (err) {
					if (err.statusCode === 401) {
						// sError = sTimeOutErrorMsg;
						window.location.reload(true);
						sap.ui.core.BusyIndicator.hide();
					} else {
						sError = err.error;
						sap.m.MessageBox.error(sError);
						window.location.reload(true);
						sap.ui.core.BusyIndicator.hide();
					}
					// window.location.href = '../logout';
				}
			} else {
				window.location.reload(true);
				sap.ui.core.BusyIndicator.hide();
			}
		}

	});

});