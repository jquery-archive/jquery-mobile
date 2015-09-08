/*
 * Mobile select unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {
var resetHash;

resetHash = function() {
	$.testHelper.openPage( location.hash.indexOf( "#default" ) >= 0 ? "#" : "#default" );
};

// https://github.com/jquery/jquery-mobile/issues/2181
QUnit.test( "dialog sized select should alter the value of its parent select",
	function( assert ) {
		var ready = assert.async();
		var selectButton, value;

		$.testHelper.pageSequence( [
			resetHash,

			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change", "cached.html" );
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
				ready();
			}
		] );
	} );

// https://github.com/jquery/jquery-mobile/issues/2181
QUnit.test( "dialog sized select should prevent the removal of its parent page",
	function( assert ) {
		var ready = assert.async();
		var selectButton, parentPageId;

		assert.expect( 2 );

		$.testHelper.pageSequence( [
			resetHash,

			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change", "cached.html" );
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

			ready
		] );
	} );

QUnit.test( "dialog sized select shouldn't rebind its parent page remove handler when " +
	"closing, if the parent page domCache option is true", function( assert ) {
	var ready = assert.async();
	assert.expect( 3 );

	$.testHelper.pageSequence( [
		resetHash,

		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "cached-dom-cache-true.html" );
		},

		function() {
			$.mobile.activePage.find( "#domcache-page-select" ).siblings( "a" ).click();
		},

		function() {
			assert.hasClasses( $.mobile.activePage, "ui-page-dialog", "the dialog came up" );
			$.mobile.activePage.find( "li a" ).last().click();
		},

		function() {
			assert.ok( $.mobile.activePage.is( "#dialog-select-parent-domcache-test" ),
				"the dialog closed" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", $( "#default" ) );
		},

		function() {
			assert.strictEqual( $( "#dialog-select-parent-domcache-test" ).length, 1,
				"select parent page is still cached in the dom after changing page" );
			ready();
		}
	] );
} );

QUnit.test( "menupage is removed when the parent page is removed", function( assert ) {
	var ready = assert.async();
	var dialogSelector = "[data-" + $.mobile.ns + "role='page']" +
		"[data-" + $.mobile.ns + "dialog='true']";
	var dialogCount = $( dialogSelector ).length;
	$.testHelper.pageSequence( [
		resetHash,

		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "uncached-dom-cached-false.html" );
		},

		function() {

			// For performance reasons we don't initially create the menu dialog now
			assert.strictEqual( $( dialogSelector ).length, dialogCount );

			// Manually trigger dialog opening
			$( "#domcache-uncached-page-select" ).data( "mobile-selectmenu" ).open();
		},

		function() {

			// Check if dialog was successfully  created
			assert.strictEqual( $( dialogSelector ).length, dialogCount + 1 );
			$( "#domcache-uncached-page-select" ).data( "mobile-selectmenu" ).close();
		},

		function() {

			// Navigate to parent(initial) page
			window.history.back();
		},

		function() {
			assert.strictEqual( $( dialogSelector ).length, dialogCount );
			ready();
		}
	] );
} );
} );
