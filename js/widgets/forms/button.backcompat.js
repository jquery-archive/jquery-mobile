//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for checkboxes/radio buttons.
//>>label: Checkboxes & Radio Buttons
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.checkboxradio.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../core",
	"../../widget",
	"../widget.theme",
	"checkboxradio",
	"checkboxradio.backcompat"
	], function( jQuery ) {

//>>excludeEnd("jqmBuildExclude");
( function( $, undefined ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "ui.button", $.ui.button, {
		options: {
			iconpos: "left",
			mini: false,
			wrapperClass: null,
			inline: null,
			shadow: true,
			corners: true
		},

		classProp: "ui-button",

		_create: function() {
			if ( this.options.iconPosition !== $.ui.button.prototype.options.iconPosition ) {
				this._seticonpos( this.options.iconPosition );
			} else if ( this.options.iconpos !== $.ui.button.prototype.options.iconpos ) {
				this._seticonPosition( this.options.iconpos );
			}
			this._super();
		},

		_seticonPosition: function( value ) {
			if ( value === "end" ) {
				this.options.iconpos = "right";
			} else if ( value !== "left" ) {
				this.options.iconpos = value;
			}
		},

		_seticonpos: function( value ) {
			if ( value === "right" ) {
				this._setOption( "iconPosition", "end" );
			} else if ( value !== "left" ) {
				this._setOption( "iconPosition", value );
			}
		},

		_setOption: function( key, value ) {
			if ( key === "iconPosition" || key === "iconpos" ) {
				this[ "_set" +  key ]( value );
			}
			this._superApply( arguments );
		}
	} );
	$.widget( "ui.button", $.ui.button, $.mobile.widget.backcompat );
}

} )( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
} );

//>>excludeEnd("jqmBuildExclude");
