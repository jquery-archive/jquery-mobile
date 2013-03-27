/*
 * mobile buttonMarkup tests
 */
(function($){
	module("jquery.mobile.buttonMarkup.js");

	asyncTest( "ui-btn-* should be applied based on a setting", function() {
		// force touch support so the timeout is set
		$.Event.prototype.originalEvent = {
			type: "touch"
		};

		var $btn = $( "#hover-delay" );


		$btn.trigger( "vmousedown" );

		setTimeout(function() {
				ok( $btn.attr("class").indexOf( "ui-btn-down" ) == -1, "button doesn't have the down class yet" );
		}, $.mobile.buttonMarkup.hoverDelay / 2);

		setTimeout(function() {
				ok( $btn.attr("class").indexOf( "ui-btn-down" ) >= 0, "button has the down class yet" );
				start();
		}, $.mobile.buttonMarkup.hoverDelay + 100 );
	});
})(jQuery);
