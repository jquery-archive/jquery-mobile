define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Back button added to external toolbar", function( assert ) {
	var ready = assert.async();
	$( "#header" ).toolbar();
	$.testHelper.pageSequence( [
		function() {
			$( "#go-to-page-2" ).click();
		},
		function() {
			assert.deepEqual( $( "#header" ).find( ".ui-toolbar-back-button" ).length, 1,
				"After navigating to page 2 exactly one back button " +
				"appears on the external toolbar" );
			$.mobile.back();
		},
		function() {
			assert.deepEqual( $( "#header" ).find( ".ui-toolbar-back-button" ).length, 0,
				"After going back from page 2 no back button appears on the external toolbar" );
			$( "#go-to-page-2" ).click();
		},
		function() {
			assert.deepEqual( $( "#header" ).find( ".ui-toolbar-back-button" ).length, 1,
				"After navigating to page 2 again exactly one back button " +
				"appears on the external toolbar" );
			$( "#go-to-page-3" ).click();
		},
		function() {
			assert.deepEqual( $( "#header" ).find( ".ui-toolbar-back-button" ).length, 1,
				"After navigating to page 3 exactly one back button " +
				"appears on the external toolbar" );
			$.mobile.back();
		},
		function() {
			assert.deepEqual( $( "#header" ).find( ".ui-toolbar-back-button" ).length, 1,
				"After navigating back to page 2 exactly one back button " +
				"appears on the external toolbar" );
			$.mobile.back();
		},
		function() {
			assert.deepEqual( $( "#header" ).find( ".ui-toolbar-back-button" ).length, 0,
				"After navigating back from page 2 no back button " +
				"appears on the external toolbar" );
			ready();
		}
	] );
} );
} );
