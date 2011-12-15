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

	test( "empty string value results defaults to slider min value", function() {
		var slider = $( "#empty-string-val-slider" );
		same( slider.attr('min'), "10", "slider min is greater than 0" );
		same( slider.val( '' ).slider( 'refresh' ).val(), slider.attr('min'), "val is equal to min attr");
	});

	test( "flip toggle switch title should be current selected value attr", function() {
		var slider = $( "#slider-switch" );

		same(slider.siblings(".ui-slider").find("a").attr('title'),
				 $(slider.find("option")[slider[0].selectedIndex]).text(),
				 "verify that the link title is set to the selected option text");
	});
})( jQuery );