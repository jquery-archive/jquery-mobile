/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
	module('jquery.mobile.fixedToolbar.js');
	
	var defaultMeta = $( "meta[name=viewport]" ).attr("content");
	
	
	test( "User zooming is enabled by default", function(){
		ok( $.mobile.zoom.enabled === true, "property is true" );		
	});
	
	test( "The zoom lock is disabled by default", function(){
		ok( $.mobile.zoom.locked === false, "property is false" );		
	});
	
	
	test( "Meta viewport content is manipulated with maximum-scale", function(){
		$.mobile.zoom.disable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after enable is called" );
		
		$.mobile.zoom.enable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=10, user-scalable=yes/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes0, user-scalable=no after enable is called" );
		
	});
	
	test( "Meta viewport content restore method restores it back to original value", function(){
		$.mobile.zoom.disable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after enable is called" );
		
		$.mobile.zoom.restore();
		ok( $( "meta[name=viewport]" ).attr( "content" ) === defaultMeta, "The meta viewport tag's content matches its default state" );
		
	});
	
	
	
	test( "When locked, the enable method does nothing", function(){
		//enabled it first
		$.mobile.zoom.locked = false;
		$.mobile.zoom.disable();
		$.mobile.zoom.locked = true;
		$.mobile.zoom.enable();
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after enable is called" );
		$.mobile.zoom.locked = false;
		$.mobile.zoom.enable();
		
	});
	
	test( "When locked, the disable method does nothing", function(){
		//enabled it first
		$.mobile.zoom.locked = false;
		$.mobile.zoom.enable();
		$.mobile.zoom.locked = true;
		$.mobile.zoom.disable();
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=10, user-scalable=yes/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes0, user-scalable=no after disable is called" );
		
		$.mobile.zoom.locked = false;
		$.mobile.zoom.enable();
		
	});
	
	test( "When locked, the enable method with a true 'unlock' argument works", function(){
		//enabled it first
		$.mobile.zoom.locked = false;
		$.mobile.zoom.disable();
		$.mobile.zoom.locked = true;
		$.mobile.zoom.enable( true );
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=10, user-scalable=yes/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes0, user-scalable=no after enable is called" );
		ok( $.mobile.zoom.locked === false, "The locked property is false again" );
		
		$.mobile.zoom.locked = false;
		$.mobile.zoom.enable();
		
	});
	
	
	test( "When locked, the disable method with a true 'lock' argument works", function(){
		//enabled it first
		$.mobile.zoom.locked = false;
		$.mobile.zoom.enable();

		$.mobile.zoom.disable( true );
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after disable is called" );
		ok( $.mobile.zoom.locked === true, "The locked property is true" );
		
		$.mobile.zoom.locked = false;
		$.mobile.zoom.enable();
		
	});
	
	
	
})(jQuery);
