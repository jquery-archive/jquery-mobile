/*
 * Mobile init dialog tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "jquery.mobile.init dialog load tests" );

// Issue #3275
QUnit.test(
	"A document containing no pages and a dialog role div will enhance the div as a dialog",
	function( assert ) {

		// NOTE this will fail when/if we decide to render it as a dialog
		assert.hasClasses( $( "#foo" ), "ui-page-dialog",
			"the div does NOT have the dialog page class" );
	} );

// NOTE the opposite case is tested everyewhere else in the suite :D
} );
