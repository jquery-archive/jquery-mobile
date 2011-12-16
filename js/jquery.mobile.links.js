/*
* "links" plugin - simple class additions for links
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
define( function() {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ){
	
	//links within content areas
	$( e.target )
		.find( "a" )
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
