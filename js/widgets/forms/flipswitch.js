//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native select menus. Tapping opens a native select menu.
//>>label: Flip Switch
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.flipswitch.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../../jquery.mobile.core", "../../jquery.mobile.widget", "../../jquery.mobile.zoom", "./reset" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.flipswitch", $.extend({

	options: {
		onText: "On",
		offText: "Off",
		theme: null,
		enhanced: false,
		wrapperClass: null,
		mini: false
	},

	_create: function() {
			if ( !this.options.enhanced ) {
				this._enhance();
			} else {
				this.flipswitch = this.element.parent();
				this.on = this.element.find( ".ui-flipswitch-on" ).eq( 0 );
				this.off = this.element.find( ".ui-flipswitch-off" ).eq(0);
				this.type = this.element.get( 0 ).tagName;
			}

			if( this.element.is( ":disabled" ) ){
				this._setOptions({
					"disabled": true
				});
			}

			this._on( this.flipswitch, {
				"click": "_toggle",
				"swipeleft": "_left",
				"swiperight": "_right"
			});

			this._on( this.on, {
				"keydown": "_keydown"
			});
	},

	widget: function() {
		return this.flipswitch;
	},

	_left: function() {
		this.flipswitch.removeClass( "ui-flipswitch-active" );
		if ( this.type === "SELECT" ) {
			this.element.get( 0 ).selectedIndex = 0;
		} else {
			this.element.prop( "checked", true );
		}
		this._trigger( "change" );
	},

	_right: function() {
		this.flipswitch.addClass( "ui-flipswitch-active" );
		if ( this.type === "SELECT" ) {
			this.element.get( 0 ).selectedIndex = 1;
		} else {
			this.element.prop( "checked", false );
		}
		this._trigger( "change" );
	},

	_enhance: function() {
		var flipswitch = $( "<div>" ),
			theme = this.options.theme ? this.options.theme : "inherit",
			on = $( "<span tabindex='1'></span>" ),
			off = $( "<span></span>" ),
			type = this.element.get( 0 ).tagName,
			onText = ( type === "INPUT" ) ? this.options.onText : this.element.find( "option" ).eq( 1 ).text(),
			offText = ( type === "INPUT" ) ? this.options.offText : this.element.find( "option" ).eq( 0 ).text();

			on.addClass( "ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit" ).text( onText );
			off.addClass( "ui-flipswitch-off" ).text( offText );
			
			flipswitch.addClass( "ui-flipswitch ui-shadow-inset ui-corner-all ui-bar-" + theme + " " + ( this.options.wrapperClass ? this.options.wrapperClass : "" ) + " " + ( ( this.element.is( ":checked" ) || this.element.find("option").eq(1).is(":selected") ) ? "ui-flipswitch-active" : "" ) + ( this.element.is(":disabled") ? " ui-state-disabled": "") + ( this.options.mini ? " ui-mini": "" ) ).append( on, off );
			
			this.element.addClass( "ui-flipswitch-input" );
			this.element.after( flipswitch ).appendTo( flipswitch );

		this.flipswitch = flipswitch;
		this.on = on;
		this.off = off;
		this.type = type;
	},

	_change: function() {
		var direction;
		
		if ( this.type === "SELECT" ) {
			direction = ( this.element.get( 0 ).selectedIndex > 0 )? "_right": "_left";
		} else {
			direction = this.element.is( ":checked" )? "_right": "_left";
		}
		this[ direction ]();
	},

	_toggle: function() {
		var direction = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_left" : "_right";
		
		this[direction]();
	},

	_keydown: function( e ) {
		if ( e.which === $.mobile.keyCode.LEFT ) {
			this._left();
		} else if ( e.which === $.mobile.keyCode.RIGHT ) {
			this._right();
		} else if ( e.which === $.mobile.keyCode.SPACE ) {
			this._toggle();
			e.preventDefault();
		}
	},

	_setOptions: function( options ) {
		if ( options.theme !== undefined ) {
			var currentTheme = options.theme ? options.theme : "inherit",
				newTheme = options.theme ? options.theme : "inherit";

			this.widget()
				.removeClass( "ui-bar-" + currentTheme )
				.addClass( "ui-bar-" + newTheme );
		}
		if ( options.onText !== undefined ) {
			this.on.text( options.onText );
		}
		if ( options.offText !== undefined ) {
			this.off.text( options.offText );
		}
		if ( options.disabled !== undefined ) {
			this.widget().toggleClass( "ui-state-disabled", options.disabled );
		}
		if( options.mini !== undefined ) {
			this.widget().toggleClass( "ui-mini", options.mini );
		}
		
		this._super( options );
	},

	_destroy: function() {
		if ( this.options.enhanced ) {
			return;
		}
		this.on.remove();
		this.off.remove();
		this.element.unwrap();
		this.flipswitch.remove();
		this.removeClass( "ui-flipswitch-input" );
	}

}, $.mobile.behaviors.formReset ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
