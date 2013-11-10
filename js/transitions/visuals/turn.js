/*
* fallback transition for turn in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animation styles and fallback transitions definition for non-3D supporting browsers
//>>label: Turn Transition
//>>group: Transitions
//>>css.structure: ../css/structure/jquery.mobile.transition.turn.css

define( [ "jquery", "../handlers" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.mobile.transitionFallbacks.turn = "fade";

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
