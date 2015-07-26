/*
 * mobile dialog unit tests
 */
define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.test( "When the page loads, any dialogs in the page should be initialized",
	function( assert ) {
		assert.expect( 1 );

		assert.hasClasses( $( "#foo-dialog" ), "ui-page-dialog",
			"When a dialog is the first element in a page, it is created as a dialog widget." );
	} );
} );
