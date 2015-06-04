/*
 * mobile slider unit tests
 */
( function( $ ) {

module( "jquery.mobile.slider.js backcompat" );

test( "data-highlight works properly", function() {
	var $highlighted = $( "#background-slider" ),
		$unhighlighted = $( "#no-background-slider" );

	deepEqual( $highlighted.siblings( ".ui-slider-track" ).find( ".ui-slider-bg" ).length, 1,
		"highlighted slider should have a div for the track bg" );
	deepEqual( $unhighlighted.siblings( ".ui-slider-track" ).find( ".ui-slider-bg" ).length, 0,
		"unhighlighted slider _not_ should have a div for the track bg" );
} );

test( "backcompat tests", function(assert) {
	assert.hasClasses( $( "#mini-option-test" ).siblings( ".ui-slider-track" ), "ui-mini" );
	assert.lacksClasses( $( "#corners-option-test" ).siblings( ".ui-slider-track" ), 
		"ui-corner-all" );
} );

} )( jQuery );
