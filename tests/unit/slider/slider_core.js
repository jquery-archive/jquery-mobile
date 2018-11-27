/*
 * Mobile slider unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.module( "jquery.mobile.slider.js core" );

QUnit.test( "refresh should force val to nearest step", function( assert ) {
	var slider = $( "#step-slider" ),
		step = parseInt( slider.attr( "step" ), 10 );

	slider.val( step + 1 );

	slider.slider( "refresh" );

	assert.ok( step > 1, "the step is greater than one" );
	assert.ok( slider.val() > 0, "the value has been altered" );
	assert.deepEqual( slider.val() % step, 0, "value has 'snapped' to a step" );
} );

QUnit.test( "empty string value results defaults to slider min value", function( assert ) {
	var slider = $( "#empty-string-val-slider" );

	assert.deepEqual( slider.attr( "min" ), "10", "slider min is greater than 0" );
	assert.deepEqual( slider.val( "" ).slider( "refresh" ).val(), slider.attr( "min" ),
		"val is equal to min attr" );
} );

QUnit.test( "labels that have id keep that id", function( assert ) {
	var label = $( "[for=label-id-slider]" );
	assert.equal( label.attr( "id" ), "label-id", "label id was not changed" );
} );

QUnit.test( "labels without an id get an id", function( assert ) {
	var slider = $( "#empty-string-val-slider" ),
		label = $( "[for=empty-string-val-slider]" );

	assert.equal( label.attr( "id" ), slider.attr( "id" ) + "-label",
		"the label id is based off the slider id" );
} );

// NOTE init binding to alter the setting is in settings.js
QUnit.test( "slider input does not get clear button", function( assert ) {
	assert.deepEqual( $( ".textinput-test" ).find( ".ui-textinput-clear-button" ).length, 0,
		"slider input does not get clear button" );
} );

QUnit.test( "slider input is not wrapped in .ui-textinput-text", function( assert ) {
	assert.lacksClasses( $( ".textinput-test" ).parent()[ 0 ], "ui-textinput-text",
		"slider input is not wrapped in .ui-textinput-text" );
} );

QUnit.test( "slider tooltip", function( assert ) {
	var tooltip = $( "#tooltip-test" ).siblings( "div.ui-slider-popup" );

	assert.deepEqual( tooltip.length, 1, "is present" );
	assert.deepEqual( tooltip.is( ":visible" ), false, "is initially hidden" );
} );

QUnit.test( "slider is enabled/disabled correctly", function( assert ) {
	var slider = $( "#disable-test" ),
		track = slider.siblings( "div" ),

	testDisabled = function( prefix, expectedDisabled ) {
		assert.deepEqual( !!track.attr( "aria-disabled" ), expectedDisabled,
			prefix + "'aria-disabled' is " + expectedDisabled );
		assert.deepEqual( !!slider.attr( "disabled" ), expectedDisabled,
			prefix + "'disabled' property is " + expectedDisabled );
		if ( expectedDisabled ) {
			assert.hasClasses( track, "ui-state-disabled" );
		} else {
			assert.lacksClasses( track, "ui-state-disabled" );
		}
	};

	testDisabled( "Initially: ", false );
	slider.slider( "option", "disabled", true );
	testDisabled( "After setting option 'disabled' to true: ", true );
	slider.slider( "option", "disabled", true );
	testDisabled( "After setting option 'disabled' to true a second time: ", true );
} );

QUnit.test( "slider tooltip & button values should match after input value changes",
	function( assert ) {
		var slider = $( "#tooltip-test-both" );
		var sliderHandle = slider.siblings( ".ui-slider-track" ).children( ".ui-slider-handle" );

		slider.val( "9" ).blur();

		assert.ok( slider.val() === sliderHandle.text(), "slider text should match handle text" );
} );

QUnit.test( "slider input is disabled correctly", function( assert ) {
	var slider = $( "#disable-input-test" );

	slider.slider( "disable" );

	assert.hasClasses( slider, "ui-state-disabled" );
} );

} );
