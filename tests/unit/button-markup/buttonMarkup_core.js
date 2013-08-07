/*
 * mobile buttonMarkup tests
 */
(function($){
	module("jquery.mobile.buttonMarkup.js");

	test( "control group buttons should respect theme-related data attributes", function(){
		var group = $("#control-group-content");

		ok(!group.find('[data-shadow=false]').hasClass("ui-shadow"),
			 "buttons with data-shadow=false should not have the ui-shadow class");
		ok(!group.find('[data-corners=false]').hasClass("ui-btn-corner-all"),
			 "buttons with data-corners=false should not have the ui-btn-corner-all class");
		ok(!group.find('[data-iconshadow=false] .ui-icon').hasClass("ui-icon-shadow"),
			 "buttons with data-iconshadow=false should not have the ui-icon-shadow class on their icons");
	});

	// Test for issue #3046 and #3054:
	test( "mousedown on SVG elements should not throw an exception", function(){
		var svg = $("#embedded-svg"),
			success = true,
			rect;
		ok(svg.length > 0, "found embedded svg document" );
		if ( svg.length > 0 ) {
			rect = $( "rect", svg );
			ok(rect.length > 0, "found rect" );
			try {
				rect.trigger("mousedown");
			} catch ( ex ) {
				success = false;
			}
			ok( success, "mousedown executed without exception");
		}
	});

	test( "Elements with “data-mini='true'” should have “ui-mini” class attached to enhanced element.", function(){
		var $mini = $("#mini"),
			$full = $("#full"),
			$minicontrol = $('#mini-control');

		ok( $full.not('.ui-mini'), "Original element does not have data attribute, enhanced version does not recieve .ui-mini.");
		ok( $mini.is('.ui-mini'), "Original element has data attribute, enhanced version recieves .ui-mini." );
		ok( $minicontrol.is('.ui-mini'), "Controlgroup has data attribute and recieves .ui-mini.");
	});

	test( "Ensure icon positioning defaults to left, and can be overridden with “data-iconpos”", function() {
		var posdefault = $("#iconpos1"),
			posleft = $("#iconpos2"),
			posright = $("#iconpos3");

		ok( posdefault.hasClass("ui-btn-icon-left"), "Button with unspecified icon position gets .ui-btn-icon-left" );
		ok( posleft.hasClass("ui-btn-icon-left"), "Button with left icon positioning specified .ui-btn-icon-left" );
		ok( posright.hasClass("ui-btn-icon-right"), "Button with right icon positioning specified .ui-btn-icon-right" );

	});

	test( "Attribute " + '"' + "role='button'" + '"', function() {
		deepEqual( $( "#role-test" ).attr( "role" ), "button", "Marked-up button has " + '"' + "role='button'" + '"' + "set" );
		deepEqual( $( "#role-test-unenhanced" ).buttonMarkup().attr( "role" ), "button", "Button marked-up at runtime has " + '"' + "role='button'" + '"' + "set" );
	});

})(jQuery);
