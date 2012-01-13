/*
* fallback transition for flow in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
define( [ "jquery", "jquery.mobile.transition" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.mobile.transitionFallbacks.flow = "fade";

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");