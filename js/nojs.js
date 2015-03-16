//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds class to make elements hidden to A grade browsers
//>>label: “nojs” Classes
//>>group: Utilities

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./ns" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.nojs = function( target ) {
	$( ":jqmData(role='nojs')", target ).addClass( "ui-nojs" );
};

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
