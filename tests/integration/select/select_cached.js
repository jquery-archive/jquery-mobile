/*
 * Mobile select unit tests
 */

( function( QUnit, $ ) {
var resetHash;

function jqmDataSelector( expression ) {
	return "[data-" + $.mobile.ns + expression + "]";
}

resetHash = function( timeout ) {
	$.testHelper.openPage( location.hash.indexOf( "#default" ) >= 0 ? "#" : "#default" );
};

// https://github.com/jquery/jquery-mobile/issues/2181
QUnit.asyncTest( "dialog sized select should alter the value of its parent select",
	function( assert ) {
		var selectButton, value;

		$.testHelper.pageSequence( [
			resetHash,

			function() {
				$.mobile.pageContainer.pagecontainer( "change", "cached.html" );
			},

			function() {
				assert.ok( $.mobile.activePage.is( "#dialog-select-parent-cache-test" ),
					"cached page appears" );
				selectButton = $( "#cached-page-select" ).siblings( "a" );
				selectButton.click();
			},

			function() {
				assert.hasClasses( $.mobile.activePage, "ui-page-dialog", "the dialog came up" );
				var option = $.mobile.activePage.find( "li a" )
					.not( ":contains('" + selectButton.text() + "')" ).last();
				value = $.trim( option.text() );
				option.click();
			},

			function() {
				assert.strictEqual( value, $.trim( selectButton.text() ),
					"the selected value is propogated back to the button text" );
				QUnit.start();
			}
		] );
	} );

// https://github.com/jquery/jquery-mobile/issues/2181
QUnit.asyncTest( "dialog sized select should prevent the removal of its parent page",
	function( assert ) {
		var selectButton, parentPageId;

		assert.expect( 2 );

		$.testHelper.pageSequence( [
			resetHash,

			function() {
				$.mobile.pageContainer.pagecontainer( "change", "cached.html" );
			},

			function() {
				selectButton = $.mobile.activePage.find( "#cached-page-select" ).siblings( "a" );
				parentPageId = $.mobile.activePage.attr( "id" );
				assert.strictEqual( $( "#" + parentPageId ).length, 1,
					"establish the parent page exists" );
				selectButton.click();
			},

			function() {
				assert.strictEqual( $( "#" + parentPageId ).length, 1,
					"make sure parent page is still there after opening the dialog" );
				$.mobile.activePage.find( "li a" ).last().click();
			},

			QUnit.start
		] );
	} );

QUnit.asyncTest( "dialog sized select shouldn't rebind its parent page remove handler when " +
	"closing, if the parent page domCache option is true", function( assert ) {
		expect( 3 );

		$.testHelper.pageSequence( [
			resetHash,

			function() {
				$.mobile.pageContainer.pagecontainer( "change", "cached-dom-cache-true.html" );
			},

			function() {
				$.mobile.activePage.find( "#domcache-page-select" ).siblings( "a" ).click();
			},

			function() {
				assert.hasClasses( $.mobile.activePage, "ui-page-dialog", "the dialog came up" );
				$.mobile.activePage.find( "li a" ).last().click();
			},

			function() {
				ok( $.mobile.activePage.is( "#dialog-select-parent-domcache-test" ),
					"the dialog closed" );
				$.mobile.pageContainer.pagecontainer( "change", $( "#default" ) );
			},

			function() {
				assert.strictEqual( $( "#dialog-select-parent-domcache-test" ).length, 1,
					"select parent page is still cached in the dom after changing page" );
				QUnit.start();
			}
		] );
	} );

QUnit.asyncTest( "menupage is removed when the parent page is removed", function( assert ) {
	var dialogCount = $( jqmDataSelector( "role='dialog'" ) ).length;
	$.testHelper.pageSequence( [
		resetHash,

		function() {
			$.mobile.pageContainer.pagecontainer( "change", "uncached-dom-cached-false.html" );
		},

		function() {

			// For performance reasons we don't initially create the menu dialog now
			assert.strictEqual( $( jqmDataSelector( "role='dialog'" ) ).length, dialogCount );

			// Manually trigger dialog opening
			$( "#domcache-uncached-page-select" ).data( "mobile-selectmenu" ).open();
		},

		function() {

			// Check if dialog was successfully  created
			assert.strictEqual( $( jqmDataSelector( "role='dialog'" ) ).length, dialogCount + 1 );
			$( "#domcache-uncached-page-select" ).data( "mobile-selectmenu" ).close();
		},

		function() {

			// Navigate to parent(initial) page
			window.history.back();
		},

		function() {
			assert.strictEqual( $( jqmDataSelector( "role='dialog'" ) ).length, dialogCount );
			QUnit.start();
		}
	] );
} );
} )( QUnit, jQuery );
