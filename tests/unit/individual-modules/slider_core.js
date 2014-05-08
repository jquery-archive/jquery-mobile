test( "Slider widget works correctly", function() {
	var slider = $( "#the-slider" ).slider().textinput();

	deepEqual( !!$.vmouse, true, "vmouse is loaded" );

	deepEqual( slider.parent().hasClass( "ui-slider" ), true,
		"Slider's wrapper has class ui-slider" );
	deepEqual( slider.hasClass( "ui-slider-input" ), true,
		"Slider has class ui-slider-input" );
	deepEqual( slider.parent().children( ".ui-slider-track" ).length, 1,
		"Slider wrapper contains a slider track" );
});
