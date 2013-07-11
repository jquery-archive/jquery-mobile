/*
 * mobile zoom
 */
(function($){
	test( "User zooming will not enable when calling enable() method if zooming was disabled in page source", function(){
		$.ui.zoom.enable();
		ok( !$.ui.zoom.enabled );		
	});
})(jQuery);