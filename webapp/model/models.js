sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		//app Congiguration model
		createAppConfigModel: function () {
			var appData = {
				"settingEdit": false,
				"adminID": "",
				"NavigationEnabled": false,
				"InsStatus": 0,
				"InsData": {},
				"Image": 0,
				"DoctorsCount": 0,
				"PvtDoctorsCount": 0,
				"PatientCount": 0,
				"SpecialityCount": 0,
				"AppointmentCount": 0,
				"SymptomsCount": 0,
				"TestCount": 0,
				"TestEditMode": false,
				"SpecialityEditMode": false,
				"SymptomsEditMode": false,
				"SubscriptionEditMode": false,
				"DoctorsEditMode": false,
				"http": "https://",
				"uri": "asia-east2-yellow-road-rangers.cloudfunctions.net/sendPushNotification?",
				"uriReset": "asia-east2-yellow-road-rangers.cloudfunctions.net/changeUserPwd?"
			};
			var oModel = new JSONModel(appData);
			return oModel;
		}

	};
});