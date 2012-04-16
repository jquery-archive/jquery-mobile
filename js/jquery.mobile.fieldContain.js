//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Styling to responsively position forms and labels based on screen width and add visual separation
//>>label: Fieldcontainers
//>>group: Forms
//>>css: ../css/themes/default/jquery.mobile.theme.css,../css/structure/jquery.mobile.forms.fieldcontain.css

define( [ "jquery" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.fn.fieldcontain = function( options ) {
	return this.addClass( "ui-field-contain ui-body ui-br" );
};

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( ":jqmData(role='fieldcontain')", e.target ).jqmEnhanceable().fieldcontain();
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
