/*
 * DegradeInputs unit tests
 */

define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.module( "jquery.mobile.degradeInputs.js" );

QUnit.test( "degradeInputs works on page init", function( assert ) {
	assert.expect( 3 );

	assert.strictEqual( $( "#degrade-range" ).attr( "type" ), "number",
		"Range inputs are degrade to type number" );
	assert.strictEqual( $( "#degrade-search" ).attr( "type" ), "text",
		"Search inputs degrade to type text" );
	assert.strictEqual( $( "#degrade-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );
} );

QUnit.test( "degradeInputs works on page enhance", function( assert ) {
	assert.expect( 6 );

	assert.strictEqual( $( "#enhance-degrade-range" ).attr( "type" ), "range",
		"Range inputs not in a page are ignored on inital page load" );
	assert.strictEqual( $( "#enhance-degrade-search" ).attr( "type" ), "search",
		"Search inputs not in a page are ignored on inital page load" );
	assert.strictEqual( $( "#enhance-degrade-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );

	$( "#enhance-container" ).enhance();
	assert.strictEqual( $( "#enhance-degrade-range" ).attr( "type" ), "number",
		"Range inputs are degrade to type number" );
	assert.strictEqual( $( "#enhance-degrade-search" ).attr( "type" ), "text",
		"Search inputs degrade to type text" );
	assert.strictEqual( $( "#enhance-degrade-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );
} );

QUnit.test( "degradeInputsWithin", function( assert ) {
	assert.expect( 6 );

	assert.strictEqual( $( "#degrade-within-range" ).attr( "type" ), "range",
		"Range inputs not in a page are ignored on inital page load" );
	assert.strictEqual( $( "#degrade-within-search" ).attr( "type" ), "search",
		"Search inputs not in a page are ignored on inital page load" );
	assert.strictEqual( $( "#degrade-within-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );

	$.mobile.degradeInputsWithin( $( "#degrade-within-container" ) );
	assert.strictEqual( $( "#degrade-within-range" ).attr( "type" ), "number",
		"Range inputs are degrade to type number" );
	assert.strictEqual( $( "#degrade-within-search" ).attr( "type" ), "text",
		"Search inputs degrade to type text" );
	assert.strictEqual( $( "#degrade-within-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );
} );

QUnit.test( "keepNative elements should not be degraded", function( assert ) {
	assert.expect( 1 );

	assert.strictEqual( $( "input#not-to-be-degraded" ).attr( "type" ), "range" );
} );

QUnit.module( "degradeInputs - custom value", {
	setup: function() {
		$.mobile.degradeInputs.range = "custom";
	},
	teardown: function() {
		$.mobile.degradeInputs.range = "number";
	}
} );

QUnit.test( "degradeInputs - custom values", function( assert ) {
	assert.expect( 1 );

	$.mobile.degradeInputs.range = "custom";
	$.mobile.degradeInputsWithin( $( "#custom-degrade" ) );
	assert.strictEqual( $( "#custom-range-type" ).attr( "type" ), "custom",
		"degradeInputs with custom types works" );
} );

} );
