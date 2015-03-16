//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>label: Controlgroups
//>>group: Forms
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
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

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
});

$.widget( "ui.controlgroup", $.ui.controlgroup, $.mobile.widget.backcompat );

})(jQuery);
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
