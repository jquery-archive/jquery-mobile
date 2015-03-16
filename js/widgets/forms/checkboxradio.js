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
			"jquery-ui/checkboxradio",
			"../widget.theme" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "ui.checkboxradio", $.ui.checkboxradio, {
	initSelector: "input[type='radio'],input[type='checkbox']:not(:jqmData(role='flipswitch'))",

	options: {
		enhanced: false,
		theme: "inherit"
	},

	_enhance: function() {
		if ( !this.options.enhanced ) {
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
