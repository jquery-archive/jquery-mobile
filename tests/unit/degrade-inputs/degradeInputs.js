/*
 * degradeInputs unit tests
 */

( function( $ ) {
module( "jquery.mobile.degradeInputs.js" );

test( "degradeInputs works on page init", function() {
	expect( 3 );

	strictEqual( $( "#degrade-range" ).attr( "type" ), "number",
		"Range inputs are degrade to type number" );
	strictEqual( $( "#degrade-search" ).attr( "type" ), "text",
		"Search inputs degrade to type text" );
	strictEqual( $( "#degrade-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );
} );

test( "degradeInputs works on page enhance", function() {
	expect( 6 );

	strictEqual( $( "#enhance-degrade-range" ).attr( "type" ), "range",
		"Range inputs not in a page are ignored on inital page load" );
	strictEqual( $( "#enhance-degrade-search" ).attr( "type" ), "search",
		"Search inputs not in a page are ignored on inital page load" );
	strictEqual( $( "#enhance-degrade-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );

	$( "#enhance-container" ).enhance();
	strictEqual( $( "#enhance-degrade-range" ).attr( "type" ), "number",
		"Range inputs are degrade to type number" );
	strictEqual( $( "#enhance-degrade-search" ).attr( "type" ), "text",
		"Search inputs degrade to type text" );
	strictEqual( $( "#enhance-degrade-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );
} );

test( "degradeInputsWithin", function() {
	expect( 6 );

	strictEqual( $( "#degrade-within-range" ).attr( "type" ), "range",
		"Range inputs not in a page are ignored on inital page load" );
	strictEqual( $( "#degrade-within-search" ).attr( "type" ), "search",
		"Search inputs not in a page are ignored on inital page load" );
	strictEqual( $( "#degrade-within-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );

	$.mobile.degradeInputsWithin( $( "#degrade-within-container" ) );
	strictEqual( $( "#degrade-within-range" ).attr( "type" ), "number",
		"Range inputs are degrade to type number" );
	strictEqual( $( "#degrade-within-search" ).attr( "type" ), "text",
		"Search inputs degrade to type text" );
	strictEqual( $( "#degrade-within-color" ).attr( "type" ), "color",
		"setting an input type to false cause no degradation of that type" );
} );

test( "keepNative elements should not be degraded", function() {
	expect( 1 );

	strictEqual( $( "input#not-to-be-degraded" ).attr( "type" ), "range" );
} );

module( "degradeInputs - custom value", {
	setup: function() {
		$.mobile.degradeInputs.range = "custom";
	},
	teardown: function() {
		$.mobile.degradeInputs.range = "number";
	}
} );

test( "degradeInputs - custom values", function() {
	expect( 1 );

	$.mobile.degradeInputs.range = "custom";
	$.mobile.degradeInputsWithin( $( "#custom-degrade" ) );
	strictEqual( $( "#custom-range-type" ).attr( "type" ), "custom",
		"degradeInputs with custom types works" );
} );

} )( jQuery );
