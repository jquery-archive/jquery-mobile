//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native select menus. Tapping opens a native select menu.
//>>label: Flip Switch
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.flipswitch.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../core",
	"../../widget",
	"../../zoom",
	"./reset" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.flipswitch", $.extend({

	options: {
		onText: "On",
		offText: "Off",
		theme: null,
		enhanced: false,

		// Deprecated in 1.5
		wrapperClass: null,

		// Deprecated in 1.5
		corners: true,

		// Deprecated in 1.5
		mini: false,
		classes: {
			"ui-flipswitch": "ui-corner-all ui-shadow-inset ",
			"ui-flipswitch-on": "ui-shadow",
			"ui-flipswitch-off": "",
			"ui-flipswitch-active": "",
			"ui-flipswitch-input": ""
		}
	},

	_create: function() {
			if ( !this.options.enhanced ) {
				this._enhance();
			} else {
				$.extend( this, {
					flipswitch: this.element.parent(),
					on: this.element.find( ".ui-flipswitch-on" ).eq( 0 ),
					off: this.element.find( ".ui-flipswitch-off" ).eq(0),
					type: this.element.get( 0 ).tagName
				});
			}

			this._handleFormReset();

			// Transfer tabindex to "on" element and make input unfocusable
			this._originalTabIndex = this.element.attr( "tabindex" );
			if ( this._originalTabIndex != null ) {
				this.on.attr( "tabindex", this._originalTabIndex );
			}
			this.element.attr( "tabindex", "-1" );
			this._on({
				"focus" : "_handleInputFocus"
			});

			if ( this.element.is( ":disabled" ) ) {
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

			this._on( {
				"change": "refresh"
			});
	},

	_handleInputFocus: function() {
		this.on.focus();
	},

	widget: function() {
		return this.flipswitch;
	},

	_left: function() {
		this.flipswitch.removeClass( this._classes( "ui-flipswitch-active" ) );
		if ( this.type === "SELECT" ) {
			this.element.get( 0 ).selectedIndex = 0;
		} else {
			this.element.prop( "checked", false );
		}
		this.element.trigger( "change" );
	},

	_right: function() {
		this.flipswitch.addClass( this._classes( "ui-flipswitch-active" ) );
		if ( this.type === "SELECT" ) {
			this.element.get( 0 ).selectedIndex = 1;
		} else {
			this.element.prop( "checked", true );
		}
		this.element.trigger( "change" );
	},

	_enhance: function() {
		var flipswitch = $( "<div>" ),
			options = this.options,
			element = this.element,
			theme = options.theme ? options.theme : "inherit",

			// The "on" button is an anchor so it's focusable
			on = $( "<a></a>", {
				"href": "#"
			}),
			off = $( "<span></span>" ),
			type = element.get( 0 ).tagName,
			onText = ( type === "INPUT" ) ?
				options.onText : element.find( "option" ).eq( 1 ).text(),
			offText = ( type === "INPUT" ) ?
				options.offText : element.find( "option" ).eq( 0 ).text();

			on
				.addClass( this._classes( "ui-flipswitch-on" ) + " ui-btn ui-btn-inherit" )
				.text( onText );
			off
				.addClass( this._classes( "ui-flipswitch-off" ) )
				.text( offText );

			// Proxy options deprecated in 1.5 to classes option
			if ( options.wrapperClass ) {
				options.classes[ "ui-flipswitch" ] += " " + options.wrapperClass + " ";
			}

			if ( options.mini ) {
				options.classes[ "ui-flipswitch" ] += " ui-mini ";
			}

			if ( !options.corners ) {
				options.classes[ "ui-flipswitch" ] =
					options.classes[ "ui-flipswitch" ].replace( /ui-corner-all/, "" );
			}

			flipswitch
				.addClass( this._classes( "ui-flipswitch" ) +
					"ui-bar-" + theme + " " +
					( ( element.is( ":checked" ) ||
						element
							.find( "option" )
							.eq( 1 )
							.is( ":selected" ) ) ? this._classes( "ui-flipswitch-active" ) : "" ) +
					( element.is(":disabled") ? " ui-state-disabled": "") )
				.append( on, off );

			element
				.addClass( this._classes( "ui-flipswitch-input" ) )
				.after( flipswitch )
				.appendTo( flipswitch );

		$.extend( this, {
			flipswitch: flipswitch,
			on: on,
			off: off,
			type: type
		});
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		var direction,
			existingDirection = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_right" : "_left";

		if ( this.type === "SELECT" ) {
			direction = ( this.element.get( 0 ).selectedIndex > 0 ) ? "_right": "_left";
		} else {
			direction = this.element.prop( "checked" ) ? "_right": "_left";
		}

		if ( direction !== existingDirection ) {
			this[ direction ]();
		}
	},

	_toggle: function() {
		var direction = this.flipswitch.hasClass( "ui-flipswitch-active" ) ? "_left" : "_right";

		this[ direction ]();
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
		if ( options.mini !== undefined ) {
			this.widget().toggleClass( "ui-mini", options.mini );
		}
		if ( options.corners !== undefined ) {
			this.widget().toggleClass( "ui-corner-all", options.corners );
		}

		this._super( options );
	},

	_destroy: function() {
		if ( this.options.enhanced ) {
			return;
		}
		if ( this._originalTabIndex != null ) {
			this.element.attr( "tabindex", this._originalTabIndex );
		} else {
			this.element.removeAttr( "tabindex" );
		}
		this.on.remove();
		this.off.remove();
		this.element.unwrap();
		this.flipswitch.remove();
		this.removeClass( this._classes( "ui-flipswitch-input" ) );
	}

}, $.mobile.behaviors.formReset ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
