//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native butttons.
//>>label: Mobile Button
//>>group: Forms
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../core",
	"../../widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.ui.button.initSelector = "input[type=button], input[type=submit], input[type=reset], button";
	$.ui.button.prototype.options.classes =  {
		"ui-button": "ui-btn ui-shadow ui-corner-all",
		"ui-button-icon-only": "ui-button-icon-only",
		"ui-button-icon": null
	};
	return $.ui.button;

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
