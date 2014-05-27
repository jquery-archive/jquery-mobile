//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Global initialization of the library.
//>>label: Polymer Pointer Events
//>>group: Events

define([
	"jquery",
	"pointerevents-polyfill/capture"
], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {
	$(function() {
		if( $( document.documentElement ).attr( "touch-action" ) !== undefined ){
			$( document.documentElement ).attr( "touch-action", "auto" );
		}
	});
}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
