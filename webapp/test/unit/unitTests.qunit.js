/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"InnoStreamAdmin/InnoStreamAdmin/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});