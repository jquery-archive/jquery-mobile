/*
* fallback transition for flow in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Animation styles and fallback transitions definition for non-3D supporting browsers
//>>label: Flow Transition
//>>group: Transitions
//>>css.structure: ../css/structure/jquery.mobile.transition.flow.css

define( [ "jquery", "../jquery.mobile.transition" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.mobile.transitionFallbacks.flow = "fade";

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");