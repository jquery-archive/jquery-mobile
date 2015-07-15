/*!
 * jQuery Mobile Flipswitch @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Flip Switch
//>>group: Forms
//>>description: Consistent styling for native select menus. Tapping opens a native select menu.
//>>docs: http://api.jquerymobile.com/flipswitch/
//>>demos: http://demos.jquerymobile.com/@VERSION/flipswitch/
//>>css.structure: ../css/structure/jquery.mobile.forms.flipswitch.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../widget",
			"../../zoom",
			"./reset" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var selectorEscapeRegex = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;

return $.widget( "mobile.flipswitch", $.extend( {
	version: "@VERSION",

	options: {
		onText: "On",
		offText: "Off",
		theme: null,
		enhanced: false,
		classes: {
			"ui-flipswitch": "ui-shadow-inset ui-corner-all",
			"ui-flipswitch-on": "ui-shadow"
		}
	},

	_create: function() {
		var labels;

		this._originalTabIndex = this.element.attr( "tabindex" );
		this.type = this.element[ 0 ].nodeName.toLowerCase();

		if ( !this.options.enhanced ) {
			this._enhance();
		} else {
			$.extend( this, {
				flipswitch: this.element.parent(),
				on: this.element.find( ".ui-flipswitch-on" ).eq( 0 ),
				off: this.element.find( ".ui-flipswitch-off" ).eq( 0 )
			} );
		}

		this._handleFormReset();

		this.element.attr( "tabindex", "-1" );
		this._on( {
			"focus": "_handleInputFocus"
		} );

		if ( this.element.is( ":disabled" ) ) {
			this._setOptions( {
				"disabled": true
			} );
		}

		this._on( this.flipswitch, {
			"click": "_toggle",
			"swipeleft": "_left",
			"swiperight": "_right"
		} );

		this._on( this.on, {
			"keydown": "_keydown"
		} );

		this._on( {
			"change": "refresh"
		} );

		// On iOS we need to prevent default when the label is clicked, otherwise it drops down
		// the native select menu. We nevertheless pass the click onto the element like the
		// native code would.
		if ( this.element[ 0 ].nodeName.toLowerCase() === "select" ) {
			labels = this._findLabels();
			if ( labels.length ) {
				this._on( labels, {
					"click": function( event ) {
						this.element.click();
						event.preventDefault();
					}
				} );
			}
		}
	},

	_handleInputFocus: function() {
		this.on.focus();
	},

	widget: function() {
		return this.flipswitch;
	},

	_left: function() {
		this.flipswitch.removeClass( "ui-flipswitch-active" );
		if ( this.type === "select" ) {
			this.element.get( 0 ).selectedIndex = 0;
		} else {
			this.element.prop( "checked", false );
		}
		this.element.trigger( "change" );
	},

	_right: function() {
		this._addClass( this.flipswitch, "ui-flipswitch-active" );
		if ( this.type === "select" ) {
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
			tabindex = this._originalTabIndex || 0,
			theme = options.theme ? options.theme : "inherit",

			// The "on" button is an anchor so it's focusable
			on = $( "<span tabindex='" + tabindex + "'></span>" ),
			off = $( "<span></span>" ),
			onText = ( this.type === "input" ) ?
				options.onText : element.find( "option" ).eq( 1 ).text(),
			offText = ( this.type === "input" ) ?
				options.offText : element.find( "option" ).eq( 0 ).text();

		this._addClass( on, "ui-flipswitch-on", "ui-button ui-button-inherit" );
		on.text( onText );
		this._addClass( off, "ui-flipswitch-off" );
		off.text( offText );

		this._addClass( flipswitch, "ui-flipswitch", "ui-bar-" + theme + " " +
				( ( element.is( ":checked" ) ||
				element
					.find( "option" )
						.eq( 1 )
						.is( ":selected" ) ) ? "ui-flipswitch-active" : "" ) +
				( element.is( ":disabled" ) ? " ui-state-disabled" : "" ) );

		flipswitch.append( on, off );

		this._addClass( "ui-flipswitch-input" );
		element.after( flipswitch ).appendTo( flipswitch );

		$.extend( this, {
			flipswitch: flipswitch,
			on: on,
			off: off
		} );
	},

	_reset: function() {
		this.refresh();
	},

	refresh: function() {
		var direction,
			existingDirection = this.flipswitch
				.hasClass( "ui-flipswitch-active" ) ? "_right" : "_left";

		if ( this.type === "select" ) {
			direction = ( this.element.get( 0 ).selectedIndex > 0 ) ? "_right" : "_left";
		} else {
			direction = this.element.prop( "checked" ) ? "_right" : "_left";
		}

		if ( direction !== existingDirection ) {
			this[ direction ]();
		}
	},

	// Copied with modifications from checkboxradio
	_findLabels: function() {
		var input = this.element[ 0 ],
			labelsList = input.labels;

		if ( labelsList && labelsList.length ) {
			labelsList = $( labelsList );
		} else {
			labelsList = this.element.closest( "label" );
			if ( labelsList.length === 0 ) {

				// NOTE: Windows Phone could not find the label through a selector
				// filter works though.
				labelsList = $( this.document[ 0 ].getElementsByTagName( "label" ) )
					.filter( "[for='" +
						input.getAttribute( "id" ).replace( selectorEscapeRegex, "\\$1" ) +
						"']" );
			}
		}

		return labelsList;
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
			var currentTheme = this.options.theme ? this.options.theme : "inherit",
				newTheme = options.theme ? options.theme : "inherit";

			this._removeClass( this.flipswitch, null,  "ui-bar-" + currentTheme );
			this._addClass( this.flipswitch, null,  "ui-bar-" + newTheme );
		}
		if ( options.onText !== undefined ) {
			this.on.text( options.onText );
		}
		if ( options.offText !== undefined ) {
			this.off.text( options.offText );
		}
		if ( options.disabled !== undefined ) {
			this._toggleClass( this.flipswitch, null, "ui-state-disabled", options.disabled );
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
		this.element.removeClass( "ui-flipswitch-input" );
		this.flipswitch.remove();
	}

}, $.mobile.behaviors.formReset ) );

} );
