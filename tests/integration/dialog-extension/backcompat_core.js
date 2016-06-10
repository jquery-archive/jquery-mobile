define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.test( "dialog hash is added when the dialog is opened and removed when closed",
	function( assert ) {
	assert.expect( 2 );
	var ready = assert.async();

	$.testHelper.pageSequence( [
		function() {

			// Bring up the dialog
			$( "#open-hash-test" ).click();
		},

		function() {
			// Make sure the dialog came up
			assert.ok( /&ui-state=dialog/.test( location.hash ),
				"ui-state=dialog =~ location.hash", "dialog open" );

			// Close the dialog
			$.mobile.back();
		},

		function() {
			assert.ok( !( /&ui-state=dialog/.test( location.hash ) ),
				"ui-state=dialog !~ location.hash" );
			ready();
		}
	] );
} );

function testClassPresence( assert, dialog, prefix, optionName, newOptionValue, expectedResult ) {
	var assertion = expectedResult ? "hasClasses" : "lacksClasses";

	if ( newOptionValue !== undefined ) {
		dialog.page( "option", optionName, newOptionValue );
	}
	assert[ assertion ](
		dialog.children( ".ui-page-dialog-contain" ), "ui-corner-all",
			prefix + ": class ui-corner-all " + ( expectedResult ? "present" : "absent" ) +
				" on wrapper" );
	assert.strictEqual(
		!!dialog.page( "option", "classes.ui-page-dialog-contain" ).match( /\bui-corner-all\b/ ),
		expectedResult,
		prefix + ": class ui-corner-all " + ( expectedResult ? "present" : "absent" ) +
			" in class key" );
	assert.strictEqual(
		dialog.page( "option", "corners" ), expectedResult,
			prefix + ": option corners is " + expectedResult );
}

function genOptionSyncTests( prerenderedIdPrefix, messagePrefix ) {
	QUnit.test( "Option corners is synchronized to the class ui-corner-all", function( assert ) {
		var option = "corners",
			dialogOn = $( "#" + prerenderedIdPrefix + "corners-option-test" ),
			dialogOff = $( "#" + prerenderedIdPrefix + "corners-option-test-false" ),
			ready = assert.async();

		$.testHelper.pageSequence( [
			function() {
				$( "body" ).pagecontainer( "change", dialogOn );
			},
			function() {
				testClassPresence( assert, dialogOn, messagePrefix + ": Initially",
					option, undefined, true );
				testClassPresence( assert, dialogOn, messagePrefix + ": Turn off option",
					option, false, false );
				testClassPresence( assert, dialogOn, messagePrefix + ": Turn option back on",
					option, true, true );
				$.mobile.back();
			},
			function() {
				$( "body" ).pagecontainer( "change", dialogOff );
			},
			function() {
				testClassPresence( assert, dialogOff, messagePrefix + ": Initially",
					option, undefined, false );
				testClassPresence( assert, dialogOff, messagePrefix + ": Turn on option",
					option, true, true );
				testClassPresence( assert, dialogOff, messagePrefix + ": Turn option back off",
					option, false, false );
				$.mobile.back();
			},
			ready
		] );
	} );

	QUnit.test( "Class ui-corner-all is synchronized to option corners", function( assert ) {
		var option = "classes.ui-page-dialog-contain",
			dialogOn = $( "#" + prerenderedIdPrefix + "corners-via-class-test" ),
			dialogOff = $( "#" + prerenderedIdPrefix + "corners-via-class-test-false" ),
			ready = assert.async();

		$.testHelper.pageSequence( [
			function() {
				$( "body" ).pagecontainer( "change", dialogOn );
			},
			function() {
				testClassPresence( assert, dialogOn, messagePrefix + ": Initially", option,
					undefined, true );
				testClassPresence( assert, dialogOn, messagePrefix + ": Turn off option", option,
					"ui-overlay-shadow", false );
				testClassPresence( assert, dialogOn, messagePrefix + ": Turn option back on",
					option, "ui-overlay-shadow ui-corner-all", true );
				$.mobile.back();
			},
			function() {
				$( "body" ).pagecontainer( "change", dialogOff );
			},
			function() {
				testClassPresence( assert, dialogOff, messagePrefix + ": Initially", option,
					undefined, false );
				testClassPresence( assert, dialogOff, messagePrefix + ": Turn on option", option,
					"ui-overlay-shadow ui-corner-all", true );
				testClassPresence( assert, dialogOff, messagePrefix + ": Turn option back off",
					option, "ui-overlay-shadow", false );
				$.mobile.back();
			},
			ready
		] );
	} );
}

genOptionSyncTests( "", "Normal" );
genOptionSyncTests( "enhanced-", "Pre-rendered" );

} );
