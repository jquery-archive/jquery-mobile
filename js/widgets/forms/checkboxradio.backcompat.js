//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for checkboxes/radio buttons.
//>>label: Checkboxes & Radio Buttons
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.checkboxradio.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define([
	"jquery",
	"../../core",
	"../../widget",
	"../widget.theme",
	"./checkboxradio"
	], function( jQuery ) {
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
