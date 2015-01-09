//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native butttons.
//>>label: Mobile Button
//>>group: Forms
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../core",
	"../../widget",
	"../widget.theme",
	"jquery-ui/button"
], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
	$.widget( "ui.button", $.ui.button, {
		initSelector: "input[type='button'], input[type='submit'], input[type='reset'], button," +
		" [data-role='button']",

		options: {
			enhanced: false,
			theme: null
		},

		_enhanced: function() {
			if ( !this.options.enahnced ) {
				this._super();
			} else if ( this.options.icon ) {
				this.icon = this.element.find( "ui-button-icon" );
			}
		}
	});

	$.widget( "ui.button", $.ui.button, $.mobile.widget.theme );

	$.ui.button.prototype.options.classes = {
		"ui-button": "ui-shadow ui-corner-all",
		"ui-button-icon-only": "",
		"ui-button-icon": ""
	};
	return $.ui.button;

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
