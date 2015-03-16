//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for checkboxes/radio buttons.
//>>label: Checkboxes & Radio Buttons
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.checkboxradio.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../widget",
			"../widget.theme",
			"../widget.backcompat",
			"./checkboxradio" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "ui.checkboxradio", $.ui.checkboxradio, {
		options: {

			// Unimplemented until its decided if this will move to ui widget
			iconpos: "left",
			mini: false,
			wrapperClass: null
		},

		classProp: "ui-checkboxradio-label"
	});
	$.widget( "ui.checkboxradio", $.ui.checkboxradio, $.mobile.widget.backcompat );
}

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
