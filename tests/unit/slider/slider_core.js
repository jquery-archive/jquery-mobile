/*
 * mobile slider unit tests
 */
(function($){
	$.mobile.page.prototype.options.keepNative = "input.should-be-native";

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "slider elements in the keepNative set shouldn't be enhanced", function() {
		same( $("input.should-be-native").siblings("div.ui-slider").length, 0 );
	});

	test( "refresh should force val to nearest step", function() {
		var slider = $( "#step-slider" ),
			step = parseInt(slider.attr( "step" ), 10);

		slider.val( step + 1 );

		slider.slider( 'refresh' );

		ok( step > 1, "the step is greater than one" );
		ok( slider.val() > 0, "the value has been altered" );
		same( slider.val() % step, 0, "value has 'snapped' to a step" );
	});
})( jQuery );