asyncTest( "dialog hash is added when the dialog is opened and removed when closed", function() {
	expect( 2 );

	$.testHelper.pageSequence( [
		function() {

			// Bring up the dialog
			$( "#open-hash-test" ).click();
		},

		function() {
			// Make sure the dialog came up
			ok( /&ui-state=dialog/.test( location.hash ),
				"ui-state=dialog =~ location.hash", "dialog open" );

			// Close the dialog
			$.mobile.back();
		},

		function() {
			ok( !( /&ui-state=dialog/.test( location.hash ) ),
				"ui-state=dialog !~ location.hash" );
			start();
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
		prefix + ": class ui-corner-all " + ( expectedResult ? "present": "absent" ) +
			" in class key" );
	assert.strictEqual(
		dialog.page( "option", "corners" ), expectedResult,
			prefix + ": option corners is " + expectedResult );
}

asyncTest( "Option corners is synchronized to the class ui-corner-all", function( assert ) {
	var option = "corners",
		dialogOn = $( "#corners-option-test" ),
		dialogOff = $( "#corners-option-test-false" );

	$.testHelper.pageSequence( [
		function() {
			$( "body" ).pagecontainer( "change", dialogOn );
		},
		function() {
			testClassPresence( assert, dialogOn, "Initially", option, undefined, true );
			testClassPresence( assert, dialogOn, "Turn off option", option, false, false );
			testClassPresence( assert, dialogOn, "Turn option back on", option, true, true );
			$.mobile.back();
		},
		function() {
			$( "body" ).pagecontainer( "change", dialogOff );
		},
		function() {
			testClassPresence( assert, dialogOff, "Initially", option, undefined, false );
			testClassPresence( assert, dialogOff, "Turn on option", option, true, true );
			testClassPresence( assert, dialogOff, "Turn option back off", option, false, false );
			$.mobile.back();
		},
		start
	] );
} );

asyncTest( "Class ui-corner-all is synchronized to option corners", function( assert ) {
	var option = "classes.ui-page-dialog-contain",
		dialogOn = $( "#corners-via-class-test" ),
		dialogOff = $( "#corners-via-class-test-false" );

	$.testHelper.pageSequence( [
		function() {
			$( "body" ).pagecontainer( "change", dialogOn );
		},
		function() {
			testClassPresence( assert, dialogOn, "Initially", option, undefined, true );
			testClassPresence( assert, dialogOn, "Turn off option", option,
				"ui-overlay-shadow", false );
			testClassPresence( assert, dialogOn, "Turn option back on", option,
				"ui-overlay-shadow ui-corner-all", true );
			$.mobile.back();
		},
		function() {
			$( "body" ).pagecontainer( "change", dialogOff );
		},
		function() {
			testClassPresence( assert, dialogOff, "Initially", option, undefined, false );
			testClassPresence( assert, dialogOff, "Turn on option", option,
				"ui-overlay-shadow ui-corner-all", true );
			testClassPresence( assert, dialogOff, "Turn option back off", option,
				"ui-overlay-shadow", false );
			$.mobile.back();
		},
		start
	] );
} );
