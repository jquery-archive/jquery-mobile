//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds class to make elements hidden to A grade browsers
//>>label: “nojs” Classes
//>>group: Utilities

define( [ "jquery", "jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile._enhancer.add( "mobile.nojs", undefined, function( target ) {
	$( ":jqmData(role='nojs')", target ).addClass( "ui-nojs" );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
