/*
* fallback transition for slide in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animation styles and fallback transitions definition for non-3D supporting browsers
//>>label: Slide Transition
//>>group: Transitions
//>>css.structure: ../css/structure/jquery.mobile.transition.slide.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../handlers" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

// Use the simultaneous transitions handler for slide transitions
$.mobile.transitionHandlers.slide = $.mobile.transitionHandlers.simultaneous;

// Set the slide transitions's fallback to "fade"
$.mobile.transitionFallbacks.slide = "fade";

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
