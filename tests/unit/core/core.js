/*
 * Mobile core unit tests
 */

define( [ "jquery", "qunit" ], function( $, QUnit ) {

var libName = "core",
	setGradeA = function( value, version ) {
		$.support.mediaquery = value;
		$.mobile.browser.ie = version;
	},
	extendFn = $.extend,
	ns = $.mobile.ns;

QUnit.module( libName, {
	setup: function() {
		$.mobile.ns = ns;

		// NOTE reset for gradeA tests
		$( "html" ).removeClass( "ui-mobile" );

		// NOTE reset for pageLoading tests
		$( ".ui-loader" ).remove();
	},
	teardown: function() {
		$.extend = extendFn;
	}
} );

$.testHelper.excludeFileProtocol( function() {
	QUnit.asyncTest( "grade A browser either supports media queries or is IE 7+", function( assert ) {
		setGradeA( false, 6 );
		$.testHelper.deferredSequence( [
			function() {
				return $.testHelper.reloadModule( libName );
			},

			function() {
				assert.ok( !$.mobile.gradeA() );
			},

			function() {
				setGradeA( true, 8 );
				return $.testHelper.reloadModule( libName );
			},

			function() {
				assert.ok( $.mobile.gradeA() );
				QUnit.start();
			}
		] );
	} );
} );

function clearNSNormalizeDictionary() {
	var dict = $.mobile.nsNormalizeDict;
	for ( var prop in dict ) {
		delete dict[ prop ];
	}
}

QUnit.test( "$.mobile.nsNormalize works properly with namespace defined (test default)", function( assert ) {

	// Start with a fresh namespace property cache, just in case
	// the previous test mucked with namespaces.
	clearNSNormalizeDictionary();

	assert.equal( $.mobile.nsNormalize( "foo" ), "nstestFoo", "appends ns and initcaps" );
	assert.equal( $.mobile.nsNormalize( "fooBar" ), "nstestFooBar", "leaves capped strings intact" );
	assert.equal( $.mobile.nsNormalize( "foo-bar" ), "nstestFooBar", "changes dashed strings" );
	assert.equal( $.mobile.nsNormalize( "foo-bar-bak" ), "nstestFooBarBak", "changes multiple dashed strings" );

	// Reset the namespace property cache for the next test.
	clearNSNormalizeDictionary();
} );

QUnit.test( "$.mobile.nsNormalize works properly with an empty namespace", function( assert ) {
	var realNs = $.mobile.ns;

	$.mobile.ns = "";

	// Start with a fresh namespace property cache, just in case
	// the previous test mucked with namespaces.
	clearNSNormalizeDictionary();

	assert.equal( $.mobile.nsNormalize( "foo" ), "foo", "leaves uncapped and undashed" );
	assert.equal( $.mobile.nsNormalize( "fooBar" ), "fooBar", "leaves capped strings intact" );
	assert.equal( $.mobile.nsNormalize( "foo-bar" ), "fooBar", "changes dashed strings" );
	assert.equal( $.mobile.nsNormalize( "foo-bar-bak" ), "fooBarBak", "changes multiple dashed strings" );

	$.mobile.ns = realNs;

	// Reset the namespace property cache for the next test.
	clearNSNormalizeDictionary();
} );

// Data tests
QUnit.test( "$.fn.jqmData and $.fn.jqmRemoveData methods are working properly", function( assert ) {
	var data;

	assert.deepEqual( $( "body" ).jqmData( "foo", true ), $( "body" ), "setting data returns the element" );

	assert.deepEqual( $( "body" ).jqmData( "foo" ), true, "getting data returns the right value" );

	assert.deepEqual( $( "body" ).data( $.mobile.nsNormalize( "foo" ) ), true, "data was set using namespace" );

	assert.deepEqual( $( "body" ).jqmData( "foo", undefined ), true, "getting data still returns the value if there's an undefined second arg" );

	data = $.extend( {}, $( "body" ).data() );
	delete data[ $.expando ]; // Discard the expando for that test
	assert.deepEqual( data.nstestFoo, true, "passing .data() no arguments returns a hash with all set properties" );

	assert.deepEqual( $( "body" ).jqmData(), undefined, "passing no arguments returns undefined" );

	assert.deepEqual( $( "body" ).jqmData( undefined ), undefined, "passing a single undefined argument returns undefined" );

	assert.deepEqual( $( "body" ).jqmData( undefined, undefined ), undefined, "passing 2 undefined arguments returns undefined" );

	assert.deepEqual( $( "body" ).jqmRemoveData( "foo" ), $( "body" ), "jqmRemoveData returns the element" );

	assert.deepEqual( $( "body" ).jqmData( "foo" ), undefined, "jqmRemoveData properly removes namespaced data" );

} );

QUnit.test( "$.jqmData and $.jqmRemoveData methods are working properly", function( assert ) {
	assert.deepEqual( $.jqmData( document.body, "foo", true ), true, "setting data returns the value" );

	assert.deepEqual( $.jqmData( document.body, "foo" ), true, "getting data returns the right value" );

	assert.deepEqual( $.data( document.body, $.mobile.nsNormalize( "foo" ) ), true, "data was set using namespace" );

	assert.deepEqual( $.jqmData( document.body, "foo", undefined ), true, "getting data still returns the value if there's an undefined second arg" );

	assert.deepEqual( $.jqmData( document.body ), undefined, "passing no arguments returns undefined" );

	assert.deepEqual( $.jqmData( document.body, undefined ), undefined, "passing a single undefined argument returns undefined" );

	assert.deepEqual( $.jqmData( document.body, undefined, undefined ), undefined, "passing 2 undefined arguments returns undefined" );

	assert.deepEqual( $.jqmRemoveData( document.body, "foo" ), undefined, "jqmRemoveData returns the undefined value" );

	assert.deepEqual( $( "body" ).jqmData( "foo" ), undefined, "jqmRemoveData properly removes namespaced data" );

} );

QUnit.test( "addDependents works properly", function( assert ) {
	assert.deepEqual( $( "#parent" ).jqmData( "dependents" ), undefined );
	$( "#parent" ).addDependents( $( "#dependent" ) );
	assert.deepEqual( $( "#parent" ).jqmData( "dependents" ).length, 1 );
} );

QUnit.test( "removeWithDependents removes the parent element and ", function( assert ) {
	$( "#parent" ).addDependents( $( "#dependent" ) );
	assert.deepEqual( $( "#parent, #dependent" ).length, 2 );
	$( "#parent" ).removeWithDependents();
	assert.deepEqual( $( "#parent, #dependent" ).length, 0 );
} );

QUnit.test( "$.fn.getEncodedText should return the encoded value where $.fn.text doesn't", function( assert ) {
	assert.deepEqual( $( "#encoded" ).text(), "foo>" );
	assert.deepEqual( $( "#encoded" ).getEncodedText(), "foo&gt;" );
	assert.deepEqual( $( "#unencoded" ).getEncodedText(), "var foo;" );
} );

QUnit.test( "closestPageData returns the parent's page data", function( assert ) {
	var pageChild = $( "#page-child" );

	$( "#parent-page" ).data( "mobile-page", { foo: "bar" } );
	assert.deepEqual( $.mobile.closestPageData( pageChild ).foo, "bar" );
} );

QUnit.test( "closestPageData returns the parent dialog's page data", function( assert ) {
	var dialogChild = $( "#dialog-child" );

	$( "#parent-dialog" ).data( "mobile-page", { foo: "bar" } );
	assert.deepEqual( $.mobile.closestPageData( dialogChild ).foo, "bar" );
} );

QUnit.test( "test that $.fn.jqmHijackable works", function( assert ) {
	$.mobile.ignoreContentEnabled = true;

	assert.deepEqual( $( "#hijacked-link" ).jqmHijackable().length, 1,
		"a link without any association to data-ajax=false should be included" );

	assert.deepEqual( $( "#unhijacked-link-by-parent" ).jqmHijackable().length, 0,
		"a link with a data-ajax=false parent should be excluded" );

	assert.deepEqual( $( "#unhijacked-link-by-attr" ).jqmHijackable().length, 0,
		"a link with data-ajax=false should be excluded" );

	$.mobile.ignoreContentEnabled = false;
} );

} );

