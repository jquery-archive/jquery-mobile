/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
	module('jquery.ui.fixedToolbar.js');
	
	var defaultMeta = $( "meta[name=viewport]" ).attr("content");
	
	
	test( "User zooming is enabled by default", function(){
		ok( $.ui.zoom.enabled === true, "property is true" );		
	});
	
	test( "The zoom lock is disabled by default", function(){
		ok( $.ui.zoom.locked === false, "property is false" );		
	});
	
	
	test( "Meta viewport content is manipulated with maximum-scale", function(){
		$.ui.zoom.disable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after enable is called" );
		
		$.ui.zoom.enable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=10, user-scalable=yes/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes0, user-scalable=no after enable is called" );
		
	});
	
	test( "Meta viewport content restore method restores it back to original value", function(){
		$.ui.zoom.disable();
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after enable is called" );
		
		$.ui.zoom.restore();
		ok( $( "meta[name=viewport]" ).attr( "content" ) === defaultMeta, "The meta viewport tag's content matches its default state" );
		
	});
	
	
	
	test( "When locked, the enable method does nothing", function(){
		//enabled it first
		$.ui.zoom.locked = false;
		$.ui.zoom.disable();
		$.ui.zoom.locked = true;
		$.ui.zoom.enable();
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after enable is called" );
		$.ui.zoom.locked = false;
		$.ui.zoom.enable();
		
	});
	
	test( "When locked, the disable method does nothing", function(){
		//enabled it first
		$.ui.zoom.locked = false;
		$.ui.zoom.enable();
		$.ui.zoom.locked = true;
		$.ui.zoom.disable();
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=10, user-scalable=yes/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes0, user-scalable=no after disable is called" );
		
		$.ui.zoom.locked = false;
		$.ui.zoom.enable();
		
	});
	
	test( "When locked, the enable method with a true 'unlock' argument works", function(){
		//enabled it first
		$.ui.zoom.locked = false;
		$.ui.zoom.disable();
		$.ui.zoom.locked = true;
		$.ui.zoom.enable( true );
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=10, user-scalable=yes/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes0, user-scalable=no after enable is called" );
		ok( $.ui.zoom.locked === false, "The locked property is false again" );
		
		$.ui.zoom.locked = false;
		$.ui.zoom.enable();
		
	});
	
	
	test( "When locked, the disable method with a true 'lock' argument works", function(){
		//enabled it first
		$.ui.zoom.locked = false;
		$.ui.zoom.enable();

		$.ui.zoom.disable( true );
		
		ok( $( "meta[name=viewport]" ).attr( "content" ).match( /,maximum-scale=1, user-scalable=no/ ), "The meta viewport tag's content contains maximum-scale=1, user-scalable=yes after disable is called" );
		ok( $.ui.zoom.locked === true, "The locked property is true" );
		
		$.ui.zoom.locked = false;
		$.ui.zoom.enable();
		
	});
	
	
	
})(jQuery);
