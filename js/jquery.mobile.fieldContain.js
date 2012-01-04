/*
* "fieldcontain" plugin - simple class additions to make form row separators
*/

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
define(function() {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.fn.fieldcontain = function( options ) {
	return this.addClass( "ui-field-contain ui-body ui-br" );
};

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( ":jqmData(role='fieldcontain')", e.target ).fieldcontain();
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
