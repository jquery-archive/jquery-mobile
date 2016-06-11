/*
 * Mobile navigation base tag unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
var baseDir = $.mobile.path.parseUrl( $( "base" ).attr( "href" ) ).directory,
	contentDir = $.mobile.path.makePathAbsolute( "../content/", baseDir ),
	home = location.pathname + location.search;

QUnit.module( "jquery.mobile.navigation.js - base tag", {
	beforeEach: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
		$.testHelper.navReset( home );
	}
} );

QUnit.test( "can navigate between internal and external pages", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {

			// Navigate from default internal page to another internal page.
			$.testHelper.openPage( "#internal-page-2" );
		},

		function() {

			// Verify that we are on the 2nd internal page.
			$.testHelper.assertUrlLocation( assert, {
				push: home + "#internal-page-2",
				hash: "internal-page-2",
				report: "navigate to internal page"
			} );

			// Navigate to a page that is in the base directory. Note that the application
			// document and this new page are *NOT* in the same directory.
			$( "#internal-page-2 .bp1" ).click();
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: baseDir + "base-page-1.html",
				report: "navigate from internal page to page in base directory"
			} );

			// Navigate to another page in the same directory as the current page.
			$( "#base-page-1 .bp2" ).click();
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: baseDir + "base-page-2.html",
				report: "navigate from base directory page to another base directory page"
			} );

			// Navigate to another page in a directory that is the sibling of the base.
			$( "#base-page-2 .cp1" ).click();
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: contentDir + "content-page-1.html",
				report: "navigate from base directory page to a page in a different directory " +
					"hierarchy"
			} );

			// Navigate to another page in a directory that is the sibling of the base.
			$( "#content-page-1 .cp2" ).click();
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: contentDir + "content-page-2.html",
				report: "navigate to another page within the same non-base directory hierarchy"
			} );

			// Navigate to an internal page.
			$( "#content-page-2 .ip1" ).click();
		},

		function() {

			// Verify that we are on the expected page.
			// the hash based nav result (hash:) is dictate by the fact that #internal-page-1
			// is the original root page element
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: home,
				report: "navigate from a page in a non-base directory to an internal page"
			} );

			// Try calling change() directly with a relative path.
			$( ".ui-pagecontainer" ).pagecontainer( "change", "base-page-1.html" );
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: baseDir + "base-page-1.html",
				report: "call changePage() with a filename (no path)"
			} );

			// Try calling changePage() directly with a relative path.
			$( ".ui-pagecontainer" ).pagecontainer( "change", "../content/content-page-1.html" );
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: contentDir + "content-page-1.html",
				report: "call changePage() with a relative path containing up-level references"
			} );

			// Try calling changePage() with an id
			$( ".ui-pagecontainer" ).pagecontainer( "change", "content-page-2.html" );
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: contentDir + "content-page-2.html",
				report: "call changePage() with a relative path should resolve relative to " +
					"current page"
			} );

			// Test that an internal page works
			$( "a.ip2" ).click();
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hash: "internal-page-2",
				push: home + "#internal-page-2",
				report: "call changePage() with a page id"
			} );

			// Try calling change() with an id
			$( ".ui-pagecontainer" ).pagecontainer( "change", "internal-page-1" );
		},

		function() {

			// Verify that we are on the expected page.
			$.testHelper.assertUrlLocation( assert, {
				hash: "internal-page-2",
				push: home + "#internal-page-2",
				report: "calling change() with a page id that is not prefixed with '#' " +
					"should not change page"
			} );

			ready();
		}
	] );
} );

QUnit.test( "internal form with no action submits to document URL", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [

		// Open our test page
		function() {
			$.testHelper.openPage( "#internal-no-action-form-page" );
		},

		function() {
			$( "#internal-no-action-form-page form" ).eq( 0 ).submit();
		},

		function() {
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: location.pathname + "?foo=1&bar=2",
				report: "hash should match document url and not base url"
			} );

			ready();
		}
	] );
} );

QUnit.test( "external page form with no action submits to external page URL", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {

			// Go to an external page that has a form.
			$( "#internal-page-1 .cp1" ).click();
		},

		function() {

			// Make sure we actually navigated to the external page.
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: contentDir + "content-page-1.html",
				report: "should be on content-page-1.html"
			} );

			// Now submit the form in the external page.
			$( "#content-page-1 form" ).eq( 0 ).submit();
		},

		function() {
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: contentDir + "content-page-1.html?foo=1&bar=2",
				report: "hash should match page url and not document url"
			} );

			ready();
		}
	] );
} );

var testBaseTagAlteration = function( assert, assertions ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "../../base-change.html" );
		},

		function() {
			assertions();
			window.history.back();
		},

		function() {
			ready();
		}
	] );

};

QUnit.test( "disabling base tag changes should prevent base href value changes", function( assert ) {
	var baseHref = $( "base" ).attr( "href" );
	$.mobile.dynamicBaseEnabled = false;

	testBaseTagAlteration( assert, function() {
		if ( $.support.dynamicBaseTag ) {
			assert.equal( baseHref, $( "base" ).attr( "href" ), "the base href value should be unchanged" );
		} else {
			assert.equal( $.mobile.activePage.find( "#base-change-link" ).attr( "href" ), "foo", "the link href's remain unchanged" );
		}
	} );
} );

QUnit.test( "enabling base tag changes should enable base href value changes", function( assert ) {
	var baseHref = $( "base" ).attr( "href" );
	$.mobile.dynamicBaseEnabled = true;
	$.support.dynamicBaseTag = true;

	testBaseTagAlteration( assert, function() {
		assert.ok( baseHref !== $( "base" ).attr( "href" ), "the base href value should be changed" );
	} );
} );
} );
