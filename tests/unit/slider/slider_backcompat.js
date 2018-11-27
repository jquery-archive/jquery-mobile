/*
 * Mobile slider unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.module( "jquery.mobile.slider.js backcompat" );

$.mobile.keepNative = "input.should-be-native";

QUnit.test( "data-highlight works properly", function( assert ) {
	var $highlighted = $( "#background-slider" ),
		$unhighlighted = $( "#no-background-slider" );

	assert.deepEqual( $highlighted.siblings( ".ui-slider-track" ).find( ".ui-slider-bg" ).length, 1,
		"highlighted slider should have a div for the track bg" );
	assert.deepEqual( $unhighlighted.siblings( ".ui-slider-track" ).find( ".ui-slider-bg" ).length,
		0, "unhighlighted slider _not_ should have a div for the track bg" );
} );

QUnit.test( "backcompat tests", function( assert ) {

	assert.hasClasses( $( "#mini-option-test" ).siblings( ".ui-slider-track" ), "ui-mini" );
	assert.lacksClasses( $( "#corners-option-test" ).siblings( ".ui-slider-track" ),
		"ui-corner-all" );
} );

// Not testing the positive case here since's it's obviously tested elsewhere
QUnit.test( "slider elements in the keepNative set shouldn't be enhanced", function( assert ) {
	assert.deepEqual( $( "input.should-be-native" ).siblings( ".ui-slider-track" ).length, 0 );
} );

} );
