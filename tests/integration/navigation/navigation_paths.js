/*
 * Mobile navigation path unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
var url = $.mobile.path.parseUrl( location.href );

var testPageLoad = function( assert, testPageAnchorSelector, expectedTextValue ) {
	assert.expect( 2 );
	var ready = assert.async();

	$.testHelper.pageSequence( [

		// Open our test page
		function() {
			$.testHelper.openPage( "#pathing-tests" );
		},

		// Navigate to the linked page
		function() {
			var page = $.mobile.activePage;

			// Check that the reset page isn't still open
			assert.equal( "", page.find( ".reset-value" ).text() );

			//Click he test page link to execute the path
			page.find( "a" + testPageAnchorSelector ).click();
		},

		// Verify that the page has changed and the expected text value is present
		function() {
			assert.deepEqual( $.mobile.activePage.find( ".test-value" ).text(), expectedTextValue );
			ready();
		}
	] );
};

// All of these alterations assume location.pathname will be a directory
// this is required to prevent the tests breaking in a subdirectory
// TODO could potentially be fragile since the tests could be running while
//	  the urls are being updated
$( function() {
	$( "a.site-rel" ).each( function( i, elem ) {
		var $elem = $( elem );
		$elem.attr( "href", location.pathname + $( elem ).attr( "href" ) );
	} );

	$( "a.protocol-rel" ).each( function( i, elem ) {
		var $elem = $( elem );
		$elem.attr( "href", "//" + location.host + location.pathname + $( elem ).attr( "href" ) );
	} );

	$( "a.absolute" ).each( function( i, elem ) {
		var $elem = $( elem );
		$elem.attr( "href",
			location.protocol + "//" + location.host +
			location.pathname + $( elem ).attr( "href" ) );
	} );
} );

//Doc relative tests
QUnit.module( "document relative paths", {
	afterEach: function() {
		$.testHelper.navReset( url.pathname + url.search );
	}
} );

QUnit.test( "file reference no nesting", function( assert ) {
	testPageLoad( assert, "#doc-rel-test-one", "doc rel test one" );
} );

QUnit.test( "file reference with nesting", function( assert ) {
	testPageLoad( assert, "#doc-rel-test-two", "doc rel test two" );
} );

QUnit.test( "file reference with double nesting", function( assert ) {
	testPageLoad( assert, "#doc-rel-test-three", "doc rel test three" );
} );

QUnit.test( "dir reference with nesting", function( assert ) {
	testPageLoad( assert, "#doc-rel-test-four", "doc rel test four" );
} );

QUnit.test( "file reference with parent dir", function( assert ) {
	testPageLoad( assert, "#doc-rel-test-five", "doc rel test five" );
} );

QUnit.test( "dir reference with parent dir", function( assert ) {
	testPageLoad( assert, "#doc-rel-test-six", "doc rel test six" );
} );

// Site relative tests
// NOTE does not test root path or non nested references
QUnit.module( "site relative paths" );

QUnit.test( "file reference no nesting", function( assert ) {
	testPageLoad( assert, "#site-rel-test-one", "doc rel test one" );
} );

QUnit.test( "file reference with nesting", function( assert ) {
	testPageLoad( assert, "#site-rel-test-two", "doc rel test two" );
} );

QUnit.test( "file reference with double nesting", function( assert ) {
	testPageLoad( assert, "#site-rel-test-three", "doc rel test three" );
} );

QUnit.test( "dir reference with nesting", function( assert ) {
	testPageLoad( assert, "#site-rel-test-four", "doc rel test four" );
} );

QUnit.test( "file reference with parent dir", function( assert ) {
	testPageLoad( assert, "#site-rel-test-five", "doc rel test five" );
} );

QUnit.test( "dir reference with parent dir", function( assert ) {
	testPageLoad( assert, "#site-rel-test-six", "doc rel test six" );
} );

// Protocol relative tests
// NOTE does not test root path or non nested references
QUnit.module( "protocol relative paths" );

QUnit.test( "file reference no nesting", function( assert ) {
	testPageLoad( assert, "#protocol-rel-test-one", "doc rel test one" );
} );

QUnit.test( "file reference with nesting", function( assert ) {
	testPageLoad( assert, "#protocol-rel-test-two", "doc rel test two" );
} );

QUnit.test( "file reference with double nesting", function( assert ) {
	testPageLoad( assert, "#protocol-rel-test-three", "doc rel test three" );
} );

QUnit.test( "dir reference with nesting", function( assert ) {
	testPageLoad( assert, "#protocol-rel-test-four", "doc rel test four" );
} );

QUnit.test( "file reference with parent dir", function( assert ) {
	testPageLoad( assert, "#protocol-rel-test-five", "doc rel test five" );
} );

QUnit.test( "dir reference with parent dir", function( assert ) {
	testPageLoad( assert, "#protocol-rel-test-six", "doc rel test six" );
} );

// Absolute tests
// NOTE does not test root path or non nested references
QUnit.module( "absolute paths" );

QUnit.test( "file reference no nesting", function( assert ) {
	testPageLoad( assert, "#absolute-test-one", "doc rel test one" );
} );

QUnit.test( "file reference with nesting", function( assert ) {
	testPageLoad( assert, "#absolute-test-two", "doc rel test two" );
} );

QUnit.test( "file reference with double nesting", function( assert ) {
	testPageLoad( assert, "#absolute-test-three", "doc rel test three" );
} );

QUnit.test( "dir reference with nesting", function( assert ) {
	testPageLoad( assert, "#absolute-test-four", "doc rel test four" );
} );

QUnit.test( "file reference with parent dir", function( assert ) {
	testPageLoad( assert, "#absolute-test-five", "doc rel test five" );
} );

QUnit.test( "dir reference with parent dir", function( assert ) {
	testPageLoad( assert, "#absolute-test-six", "doc rel test six" );
} );
} );
