/*!
 * jQuery Mobile Button @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Mobile Button
//>>group: Forms
//>>description: Consistent styling for native butttons.
//>>docs: http://api.jquerymobile.com/button/
//>>demos: http://demos.jquerymobile.com/@VERSION/button/
//>>css.structure: ../css/structure/jquery.mobile.forms.slider.tooltip.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../widget",
			"../widget.theme",
			"jquery-ui/widgets/button" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "ui.button", $.ui.button, {
	options: {
		enhanced: false,
		theme: null
	},

	_enhance: function() {
		if ( !this.options.enhanced ) {
			this._super();
		} else if ( this.options.icon ) {
			this.icon = this.element.find( "ui-button-icon" );
		}
	},

	_themeElements: function() {
		this.options.theme = this.options.theme ? this.options.theme : "inherit";

		return [
			{
				element: this.widget(),
				prefix: "ui-button-"
			}
		];
	}
} );

$.widget( "ui.button", $.ui.button, $.mobile.widget.theme );

$.ui.button.prototype.options.classes = {
	"ui-button": "ui-shadow ui-corner-all"
};

return $.ui.button;

} );
