/*
 * mobile support unit tests
 */
(function( $ ) {
	var reloadLib = function(){
		$("script[src$=support.js]").appendTo("body");
	};

	module("mobile.support", {
		teardown: function(){
			$("body script[src$=support.js]").remove();
		}
	});

	// NOTE test has debatable value, only prevents property name changes
	// and improper sources for attribute checks
	test( "detects functionality from basic properties and attributes", function(){
		// TODO expose properties for less brittle tests
		$.extend(window, {
			orientation: true,
			WebKitTransitionEvent: true
		});

		document["ontouchend"] = true;
		history.pushState = function(){};
		$.mobile.media = function(){ return true; };

		reloadLib();

		ok($.support.orientation);
		ok($.support.cssTransitions);
		ok($.support.touch);
		ok($.support.pushState);
		ok($.support.mediaquery);
	});
})(jQuery);