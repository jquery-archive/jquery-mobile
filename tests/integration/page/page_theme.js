define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.test( "Page theme", function( assert ) {
	var testDone = assert.async(),
		page = $( "#theme-test" );

	assert.expect( 6 );
	$.testHelper.pageSequence( [
		function() {
			$( "body" ).pagecontainer( "change", page );
		},
		function() {
			assert.hasClasses( page, "ui-page-active ui-page-theme-a",
				"Page is active and initial swatch is correct: a" );

			page.page( "option", "theme", "b" );
			assert.hasClasses( page, "ui-page-theme-b",
				"Correctly set swatch to b" );
			assert.lacksClasses( page, "ui-page-theme-a",
				"Initial swatch (a) is now absent" );

			page.page( "option", "theme", "c" );
			assert.hasClasses( page, "ui-page-theme-c",
				"Second option change: correctly set swatch to c" );
			assert.lacksClasses( page, "ui-page-theme-a",
				"Second option change: initial swatch (a) is absent" );
			assert.lacksClasses( page, "ui-page-theme-b",
				"Second option change: first set swatch (b) is absent" );

			$.mobile.back();
		},
		testDone
	] );
} );

} );
