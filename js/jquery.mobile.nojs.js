/*
* "nojs" plugin - class to make elements hidden to A grade browsers
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
define(function() {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ){
	$( ":jqmData(role='nojs')", e.target ).addClass( "ui-nojs" );
	
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
