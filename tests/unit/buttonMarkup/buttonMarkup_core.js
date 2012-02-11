/*
 * mobile buttonMarkup tests
 */
(function($){
	module("jquery.mobile.buttonMarkup.js");

	test( "control group buttons should be enhanced inside a footer", function(){
		var group, linkCount;

		group = $("#control-group-footer");
		linkCount = group.find( "a" ).length;

		same( group.find("a.ui-btn").length, linkCount, "all 4 links should be buttons");
		same( group.find("a > span.ui-corner-left").length, 1, "only 1 left cornered button");
		same( group.find("a > span.ui-corner-right").length, 1, "only 1 right cornered button");
		same( group.find("a > span:not(.ui-corner-left):not(.ui-corner-right)").length, linkCount - 2, "only 2 buttons are cornered");
	});

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
	
	// Test for issue #3141:
	test( "Elements with “data-mini='true'” should have “ui-mini” class attached to enhanced element.", function(){
		var $mini = $("#mini"),
			$full = $("full"),
			$minicontrol = $('#mini-control');

		ok( $full.not('ui-mini'), "Original element does not have data attribute, enhanced version does not recieve .ui-mini.");
		ok( $mini.is('.ui-mini'), "Original element has data attribute, enhanced version recieves .ui-mini." );
		ok( $minicontrol.is('.ui-mini'), "Controlgroup has data attribute and recieves .ui-mini.");
		
	});

	test( "buttonMarkup should discard elements in ignored containers", function() {
		var $enhanced = $("#enhanced-button"), $ignored = $("#ignored");

		$.mobile.ignoreContentEnabled = true;

		$enhanced.buttonMarkup();
		ok( $enhanced.is( ".ui-btn" ), "normal link is enhanced" );

		$ignored.buttonMarkup();
		ok( !$ignored.is( ".ui-btn" ), "ignored is left" );

		$.mobile.ignoreContentEnabled = false;
	});
})(jQuery);
