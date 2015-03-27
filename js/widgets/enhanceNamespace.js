//>>description: Auto enhancement for widgets
//>>label: Enhancer Namespace
//>>group: Widgets
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery", "jquery-ui/widget", "enhancer" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
	$.fn.enhancer.ns = $.mobile.ns;
}));