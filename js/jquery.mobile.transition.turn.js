/*
* fallback transition for turn in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animation styles and fallback transition definition for non-3D supporting browsers
//>>label: Turn Transition
//>>group: Transitions
//>>css: ../css/structure/jquery.mobile.transition.turn.css

define( [ "jquery", "./jquery.mobile.transition" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.mobile.transitionFallbacks.turn = "fade";

})( jQuery, window );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");