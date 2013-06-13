//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Styling to responsively position forms and labels based on screen width and add visual separation
//>>label: Fieldcontainers
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.fieldcontain.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// Deprecated in 1.4
$.fn.fieldcontain = function(/* options */) {
	return this.addClass( "ui-field-contain" );
};

//auto self-init widgets
$.mobile._enhancer.add( "mobile.fieldcontain", undefined, function( target ) {
	$( ":jqmData(role='fieldcontain')", target ).jqmEnhanceable().fieldcontain();
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
