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
	"jquery-ui/checkboxradio",
	"../widget.theme"
	], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "ui.checkboxradio", $.ui.checkboxradio, {
	initSelector: "input[type='checkbox']:not(:jqmData(role='flipswitch')), " +
		"input[type='radio'], :jqmData(role='checkboxradio')",

	options: {
		enhanced: false,
		theme: "inherit"
	},

	_enhanced: function() {
		if ( !this.options.enahnced ) {
			this._super();
		} else if ( this.options.icon ) {
			this.icon = this.element.find( "ui-button-icon" );
		}
	}
});

$.widget( "ui.checkboxradio", $.ui.checkboxradio, $.mobile.widget.theme );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
