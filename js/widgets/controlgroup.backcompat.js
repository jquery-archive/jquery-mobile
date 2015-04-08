/*!
 * jQuery Mobile Controlgroup Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Controlgroups
//>>group: Forms
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>docs: http://api.jquerymobile.com/controlgroup/
//>>demos: http://demos.jquerymobile.com/@VERSION/controlgroup/
//>>css.structure: ../css/structure/jquery.mobile.controlgroup.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"widget.theme",
			"jquery-ui/controlgroup",
			"controlgroup",
			"widget.backcompat" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "ui.controlgroup", $.ui.controlgroup, {
	options: {
		shadow: false,

		//corners: true,
		type: "vertical",
		mini: false
	},

	_create: function() {
		if ( this.options.direction !== $.ui.controlgroup.prototype.options.direction ) {
			this.options.type = this.options.type;
		} else if ( this.options.type !== $.ui.controlgroup.prototype.options.type ) {
			this._setOption( "direction", this.options.type );
		}
		this._super();
	},

	_setOption: function( key, value ) {
		if ( key === "direction" ) {
			this.options.type = value;
		}
		if ( key === "type" ) {
			this._setOption( "direction", value );
		}
		this._superApply( arguments );
	}
} );

$.widget( "ui.controlgroup", $.ui.controlgroup, $.mobile.widget.backcompat );

return $.ui.controlgroup;

} );
