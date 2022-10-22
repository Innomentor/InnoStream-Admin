sap.ui.define([], function () {
	"use strict";

	return {

		checkStatus: function (sValue) {

		},

		/**
		 * Returns Date 
		 * @public
		 * @param {string} sValue the number string to be date formatted
		 * @returns {string} sValue in DD-MM-YYYY
		 */
			dateUnit: function (sValue) {
			if (!sValue) {
				return "";
			}
			var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
			var timestamp = sValue.seconds * 1000;
			var todate = new Date(timestamp).getDate();
			var tomonth = new Date(timestamp).getMonth();
			var monthText = months[tomonth];
			var toyear = new Date(timestamp).getFullYear();
			var original_date = todate + ' ' + monthText + ' ' + toyear;
			return original_date;
		},

		/**
		 * Returns Timestamp 
		 * @public
		 * @param {string} sValue the number string to be timestamp formatted
		 * @returns {string} sValue in DD-MM-YYYY: HH:MM:SS
		 */
		timestampUnit: function (sValue) {
			if (!sValue) {
				return "";
			}
			var timestamp = new Date(sValue.seconds * 1000);
			return timestamp;
		},

		/**
		 * Returns Location Link 
		 * @public
		 * @param {object} sValue the location object
		 * @returns {link address} sValue for href
		 */
		getLocation: function (sValue) {
			if (!sValue) {
				return "";
			}
			var href = "https://www.google.com/maps/search/?api=1&query=" + sValue.lat + "," + sValue.long;
			return href;
		},

		/**
		 * Returns Formatted Text 
		 * @public
		 * @param {object} sValue the input Text
		 * @returns {link address} sValue in different colour
		 */
		readType: function (sValue, nStatus) {

			if (!sValue) {
				return "";
			}
			if (nStatus === 0) {
				var formattedText = "<strong>" + sValue + '</strong>';
				return formattedText;
			} else {
				return sValue;
			}
		},

		/**
		 * Returns Calculated Duration
		 * @public
		 * @param {object} sValue the input Text
		 * @returns {link address} sValue in different colour
		 */
		calculateDuration: function (startTime, EndTime) {

			if (!startTime || !EndTime) {
				return "";
			}
			if (startTime && EndTime) {
				var duration = parseInt(EndTime, 0) - parseInt(startTime, 0);
				return duration;
			} else {
				return "";
			}
		},

		/**
		 * Returns Role 
		 * @public
		 * @param {object} sValue the input Text
		 * @returns {link address} sValue as Controller or Driver
		 */
		getRole: function (sValue) {

			if (!sValue) {
				return "";
			}
			if (sValue === "auth_dr") {
				return "Driver";
			} else if (sValue === "auth_cont") {
				return "Controller";
			} else {
				return sValue;
			}
		},

		/**
		 * Returns NA 
		 * @public
		 * @param {object} sValue the input Text
		 * @returns {link address} sValue or NA
		 */
		getNA: function (sValue) {

			if (!sValue) {
				return "NA";
			} else {
				return sValue;
			}
		},

		/**
		 * Returns Status of Promotion
		 * @public
		 * @param {object} sValue the Timestamp
		 * @returns {link address} Active or Inactive
		 */
		promoStatus: function (sValue) {
			if (!sValue) {
				return "";
			}
			var date = new Date(sValue.seconds * 1000);
			var currentDate = new Date();
			if (currentDate > date) {
				return "Inactive";
			} else {
				return "Active";
			}
		},

		getServStatus: function (sValue) {
			if (!sValue) {
				return "Initiated";
			}
			if (sValue === 0) {
				return "Initiated";
			} else if (sValue === 1) {
				return "Driver Assigned";
			} else if (sValue === 2) {
				return "Driver Cancelled";
			} else if (sValue === 3) {
				return "Driver Accepted";
			} else if (sValue === 4) {
				return "Driver Arrived";
			} else if (sValue === 5) {
				return "Completed";
			} else {
				return sValue;
			}
		},

		getServState: function (sValue) {
			if (!sValue) {
				return "None";
			}
			if (sValue === 0) {
				return "None";
			} else if (sValue === 1) {
				return "Warning";
			} else if (sValue === 2) {
				return "Error";
			} else if (sValue === 3) {
				return "Warning";
			} else if (sValue === 4) {
				return "Information";
			} else if (sValue === 5) {
				return "Success";
			} else {
				return "None";
			}
		},

		getInsState: function (sValue) {
			if (!sValue) {
				return "Information";
			}
			if (sValue == 0) {
				return "Information";
			} else if (sValue == 1) {
				return "Information";
			} else if (sValue == 4) {
				return "Success";
			} else if (sValue == 2) {
				return "Error";
			} else if (sValue == true) {
				return "Success";
			} else if (sValue == false) {
				return "Error";
			} else {
				return "None";
			}
		},

		getPatientStatus: function (sValue) {
			if (!sValue) {
				return "Incomplete";
			}
			if (sValue == 0) {
				return "Incomplete";
			} else if (sValue == 2) {
				return "Waiting Verification";
			} else if (sValue == 1) {
				return "Verified";
			} else {
				return sValue;
			}
		},

		getPatientState: function (sValue) {
			if (!sValue) {
				return "Information";
			}
			if (sValue == 0) {
				return "Error";
			} else if (sValue == 1) {
				return "Success";
			} else if (sValue == 2) {
				return "Error";
			} else {
				return "None";
			}
		},

		getInsStatus: function (sValue) {
			if (!sValue) {
				return "Upcoming";
			}
			if (sValue == 0) {
				return "Upcoming";
			} else if (sValue == 2) {
				return "Doctor Declined";
			} else if (sValue == 3) {
				return "Doctor Joined";
			} else if (sValue == 1) {
				return "Doctor Accepted";
			} else if (sValue == 4) {
				return "Doctor Completed";
			} else if (sValue == true) {
				return "Active";
			} else if (sValue == false) {
				return "Inactive";
			} else {
				return sValue;
			}
		},

		getMonthName: function (sValue) {
			if (!sValue) {
				return "NA";
			}
			if (sValue == 1) {
				return "January";
			} else if (sValue == 2) {
				return "February";
			} else if (sValue == 3) {
				return "March";
			} else if (sValue == 4) {
				return "April";
			} else if (sValue == 5) {
				return "May";
			} else if (sValue == 6) {
				return "June";
			} else if (sValue == 7) {
				return "July";
			} else if (sValue == 8) {
				return "August";
			} else if (sValue == 9) {
				return "September";
			} else if (sValue == 10) {
				return "October";
			} else if (sValue == 11) {
				return "November";
			} else if (sValue == 12) {
				return "December";
			} else {
				return sValue;
			}
		},

		getDocState: function (sValue) {
			if (sValue == true) {
				return "Success";
			} else if (sValue == false) {
				return "Error";
			} else {
				return "None";
			}
		},

		getDocStatus: function (sValue) {
			if (sValue == true) {
				return "Active";
			} else if (sValue == false) {
				return "Inactive";
			} else {
				return sValue;
			}
		},
		
		getDocStatusB: function (sValue) {
			if (sValue == true) {
				return "true";
			} else if (sValue == false) {
				return "false";
			} else {
				return sValue;
			}
		},

	};

});