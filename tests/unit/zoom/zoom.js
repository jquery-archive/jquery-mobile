/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
	module('jquery.mobile.fixedToolbar.js');
	
	var defaultMeta = $( "meta[name=viewport]" ).attr("content");
	
	
	
	function injectMeta( content ){
		$( "meta[name=viewport]" ).attr("content", content || defaultMeta );
	}
	

	
	
	test( "User zooming is enabled by default", function(){
		ok( $.mobile.zoom.enabled === true, "property is true" );		
	});
	
	test( "Meta viewport content is manipulated with maximum-scale", function(){
		$.mobile.zoom.disable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum\-scale=1$/ ), "The meta viewport tag's content contains maximum-scale=1 after enable is called" );
		
		$.mobile.zoom.enable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).indexOf( ",maximum-scale=10" ) > 0, "The meta viewport tag's content contains maximum-scale=10 after enable is called" );
		
	});
	

	
	
})(jQuery);
