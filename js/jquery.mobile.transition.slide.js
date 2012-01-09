/*
* fallback transition for slide in non-3D supporting browsers (which tend to handle complex transitions poorly in general
*/

(function( $, window, undefined ) {

$.mobile.transitionFallbacks.slide = "fade";

})( jQuery, this );
