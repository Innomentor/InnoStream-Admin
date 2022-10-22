sap.ui.define([
	"sap/ui/model/json/JSONModel",
], function (JSONModel) {
	"use strict";
	return {
		// Firebase-config retrieved from the Firebase-console
		initializeFirebase: function () {
			const firebaseConfig = {
				apiKey: "AIzaSyANwSf_-dYKt7kIM_6cqh6Jm32el_aowFg",
				authDomain: "innostream-e2177.firebaseapp.com",
				projectId: "innostream-e2177",
				storageBucket: "innostream-e2177.appspot.com",
				messagingSenderId: "263559128613",
				appId: "1:263559128613:web:5e945c6cbf93a3153881cc",
				measurementId: "G-M5JN977CL6"
			};
			// Initialize Firebase with the Firebase-config
			firebase.initializeApp(firebaseConfig);

			// Create a Firestore reference
			const firestore = firebase.firestore();

			// Create a Authentication reference
			const fireAuth = firebase.auth();

			// Get Firebase Instance
			const oFirestore = firebase.firestore;

			// Create a Fire Storage reference
			const fireStorage = firebase.storage();

			// Create a Fire Functions reference
			const fireFunctions = firebase.app().functions('asia-south1');

			// Firebase services object
			const oFirebase = {
				firestore: firestore,
				fireAuth: fireAuth,
				oFirestore: oFirestore,
				fireStorage: fireStorage,
				fireFunctions: fireFunctions
			};

			// Create a Firebase model out of the oFirebase service object which contains all required Firebase services
			var fbModel = new JSONModel(oFirebase);

			// Return the Firebase Model
			return fbModel;
		}
	};
});