//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds class to make elements hidden to A grade browsers
//>>label: “nojs” Classes
//>>group: Utilities

define( [ "jquery" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ) {
	$( ":jqmData(role='nojs')", e.target ).addClass( "ui-nojs" );
	
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
