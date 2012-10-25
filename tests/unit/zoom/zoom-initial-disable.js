/*
 * mobile zoom
 */
(function($){
	test( "User zooming will not enable when calling enable() method if zooming was disabled in page source", function(){
		$.mobile.zoom.enable();
		ok( !$.mobile.zoom.enabled );		
	});
})(jQuery);