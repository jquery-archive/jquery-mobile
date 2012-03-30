/*
* fallback transition for slidefade in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Handler and fallback transition for slide in non-3D supporting browsers
//>>label: Slide handler and fallback transition
//>>group: Transitions
//>>css: ../css/structure/jquery.mobile.transition.slidefade.css

define( [ "jquery", "./jquery.mobile.transition" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

// Set the slide transition's fallback to "fade"
$.mobile.transitionFallbacks.slidefade = "fade";

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");