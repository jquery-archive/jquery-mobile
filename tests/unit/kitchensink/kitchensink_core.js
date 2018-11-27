/*
 * Kitchen Sink Tests
 */
define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.module( "Kitchen Sink" );

QUnit.test( "Nothing on the page has a class that contains `undefined`.", function( assert ) {
	var undefClass = $( ".ui-page" ).find( "[class*='undefined']" );

	assert.ok( undefClass.length === 0 );
} );

QUnit.module( "Widget Create" );

// Required as part of the deprecation of init for #3602
QUnit.test( "all widget create events fire before page create", function( assert ) {
	var done = assert.async();

	// See preinit.js
	window.createTests.then( function( createTests ) {
		assert.ok( createTests.pageCreateTimed );
		done();
	} );
} );

} );
