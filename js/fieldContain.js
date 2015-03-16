//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Styling to responsively position forms and labels based on screen width and add visual separation
//>>label: Fieldcontainers
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.fieldcontain.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// Deprecated in 1.4
$.fn.fieldcontain = function(/* options */) {
	return this.addClass( "ui-field-contain" );
};

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
