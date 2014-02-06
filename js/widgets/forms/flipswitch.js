//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Consistent styling for native select menus. Tapping opens a native select menu.
//>>label: Flip Switch
//>>group: Forms
//>>css.structure: ../css/structure/jquery.mobile.forms.flipswitch.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [
	"jquery",
	"../../jquery.mobile.core",
	"../../jquery.mobile.widget",
	"../../jquery.mobile.zoom",
	"./reset" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.flipswitch", $.extend({

	options: {
		onText: "On",
		offText: "Off",
		theme: null,
		enhanced: false,
		wrapperClass: null,
		corners: true,
		mini: false
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
		this.flipswitch.removeClass( "ui-flipswitch-active" );
		if ( this.type === "SELECT" ) {
			this.element.get( 0 ).selectedIndex = 0;
		} else {
			this.element.prop( "checked", false );
		}
		this.element.trigger( "change" );
	},

	_right: function() {
		this.flipswitch.addClass( "ui-flipswitch-active" );
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
				.addClass( "ui-flipswitch-on ui-btn ui-shadow ui-btn-inherit" )
				.text( onText );
			off
				.addClass( "ui-flipswitch-off" )
				.text( offText );

			flipswitch
				.addClass( "ui-flipswitch ui-shadow-inset " +
					"ui-bar-" + theme + " " +
					( options.wrapperClass ? options.wrapperClass : "" ) + " " +
					( ( element.is( ":checked" ) ||
						element
							.find( "option" )
							.eq( 1 )
							.is( ":selected" ) ) ? "ui-flipswitch-active" : "" ) +
					( element.is(":disabled") ? " ui-state-disabled": "") +
					( options.corners ? " ui-corner-all": "" ) +
					( options.mini ? " ui-mini": "" ) )
				.append( on, off );

			element
				.addClass( "ui-flipswitch-input" )
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
		this.removeClass( "ui-flipswitch-input" );
	}

}, $.mobile.behaviors.formReset ) );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
