/*!
 * jQuery Mobile Select Menu @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Selects
//>>group: Forms
//>>description: Consistent styling for native select menus. Tapping opens a native select menu.
//>>docs: http://api.jquerymobile.com/selectmenu/
//>>demos: http://demos.jquerymobile.com/@VERSION/selectmenu/
//>>css.structure: ../css/structure/jquery.mobile.forms.select.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui/labels",
			"../../core",
			"../../widget",
			"../../zoom",
			"../../navigation/path",
			"../widget.theme",
			"jquery-ui/form-reset-mixin" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var selectmenu = $.widget( "mobile.selectmenu", [ {
	version: "@VERSION",

	options: {
		classes: {
			"ui-selectmenu-button": "ui-corner-all ui-shadow"
		},
		theme: "inherit",
		icon: "caret-d",
		iconpos: "right",
		nativeMenu: true,

		// This option defaults to true on iOS devices.
		preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) &&
			navigator.userAgent.indexOf( "AppleWebKit" ) > -1
	},

	_button: function() {
		return $( "<div/>" );
	},

	_themeElements: function() {
		return [
			{
				element: this.button,
				prefix: "ui-button-"
			}
		];
	},

	_setDisabled: function( value ) {
		this.element.prop( "disabled", value );
		this.button.attr( "aria-disabled", value );
		return this._setOption( "disabled", value );
	},

	_focusButton: function() {
		var that = this;

		setTimeout( function() {
			that.button.focus();
		}, 40 );
	},

	_selectOptions: function() {
		return this.element.find( "option" );
	},

	// Setup items that are generally necessary for select menu extension
	_preExtension: function() {
		var classes = "";

		this.element = this.element;
		this.selectWrapper = $( "<div>" );
		this._addClass( this.selectWrapper, "ui-selectmenu", classes );
		this.selectWrapper.insertBefore( this.element );
		this.element.detach();

		this.selectId = this.element.attr( "id" ) || ( "select-" + this.uuid );
		this.buttonId = this.selectId + "-button";
		this.isMultiple = this.element[ 0 ].multiple;

		this.element.appendTo( this.selectWrapper );
		this.label = this.element.labels().first();
	},

	_destroy: function() {
		if ( this.selectWrapper.length > 0 ) {
			this.element.insertAfter( this.selectWrapper );
			this.selectWrapper.remove();
		}
		this._unbindFormResetHandler();
	},

	_create: function() {
		var options = this.options,
			iconpos = options.icon ?
				( options.iconpos || this.element.attr( "data-" + this._ns() + "iconpos" ) ) :
					false;

		this._preExtension();

		this.button = this._button();

		this.button.attr( "id", this.buttonId );
		this._addClass( this.button, "ui-selectmenu-button", "ui-button" );
		this.button.insertBefore( this.element );

		if ( this.options.icon ) {
			this.icon = $( "<span>" );
			this._addClass( this.icon, "ui-selectmenu-button-icon",
				"ui-icon-" + options.icon + " ui-icon ui-widget-icon-float" +
					( iconpos === "right" ? "end" : "beginning" ) );
			this.button.prepend( this.icon );
		}

		this.setButtonText();

		// Opera does not properly support opacity on select elements
		// In Mini, it hides the element, but not its text
		// On the desktop,it seems to do the opposite
		// for these reasons, using the nativeMenu option results in a full native select in Opera
		if ( options.nativeMenu && window.opera && window.opera.version ) {
			this._addClass( this.button, "ui-selectmenu-nativeonly" );
		}

		// Add counter for multi selects
		if ( this.isMultiple ) {
			this.buttonCount = $( "<span>" ).hide();
			this._addClass( this.buttonCount, "ui-selectmenu-count-bubble",
				"ui-listview-item-count-bubble ui-body-inherit" );
			this._addClass( this.button, null, "ui-listview-item-has-count" );
			this.buttonCount.appendTo( this.button );
		}

		// Disable if specified
		if ( options.disabled || this.element.prop( "disabled" ) ) {
			this.disable();
		}

		// Events on native select
		this._on( this.element, {
			change: "refresh"
		} );

		this._bindFormResetHandler();

		this._on( this.button, {
			keydown: "_handleKeydown"
		} );

		this.build();
	},

	build: function() {
		var that = this;

		this.element
			.appendTo( that.button )
			.bind( "vmousedown", function() {

				// Add active class to button
				that.button.addClass( "ui-button-active" );
			} )
			.bind( "focus", function() {
				that.button.addClass( "ui-focus" );
			} )
			.bind( "blur", function() {
				that.button.removeClass( "ui-focus" );
			} )
			.bind( "focus vmouseover", function() {
				that.button.trigger( "vmouseover" );
			} )
			.bind( "vmousemove", function() {

				// Remove active class on scroll/touchmove
				that.button.removeClass( "ui-button-active" );
			} )
			.bind( "change blur vmouseout", function() {
				that.button.trigger( "vmouseout" )
					.removeClass( "ui-button-active" );
			} );

		// In many situations, iOS will zoom into the select upon tap, this prevents that from
		// happening
		that.button.bind( "vmousedown", function() {
			if ( that.options.preventFocusZoom ) {
				$.mobile.zoom.disable( true );
			}
		} );
		that.label.bind( "click focus", function() {
			if ( that.options.preventFocusZoom ) {
				$.mobile.zoom.disable( true );
			}
		} );
		that.element.bind( "focus", function() {
			if ( that.options.preventFocusZoom ) {
				$.mobile.zoom.disable( true );
			}
		} );
		that.button.bind( "mouseup", function() {
			if ( that.options.preventFocusZoom ) {
				setTimeout( function() {
					$.mobile.zoom.enable( true );
				}, 0 );
			}
		} );
		that.element.bind( "blur", function() {
			if ( that.options.preventFocusZoom ) {
				$.mobile.zoom.enable( true );
			}
		} );
	},

	selected: function() {
		return this._selectOptions().filter( ":selected" );
	},

	selectedIndices: function() {
		var that = this;

		return this.selected().map( function() {
			return that._selectOptions().index( this );
		} ).get();
	},

	setButtonText: function() {
		var that = this,
			selected = this.selected(),
			text = this.placeholder,
			span = $( "<span>" );

		this.button.children( "span" )
			.not( ".ui-selectmenu-count-bubble,.ui-selectmenu-button-icon" )
			.remove().end().end()
			.append( ( function() {
				if ( selected.length ) {
					text = selected.map( function() {
						return $( this ).text();
					} ).get().join( ", " );
				}

				if ( text ) {
					span.text( text );
				} else {

					// Set the contents to &nbsp; which we write as &#160; to be XHTML compliant.
					// See gh-6699
					span.html( "&#160;" );
				}

				// Hide from assistive technologies, as otherwise this will create redundant text
				// announcement - see gh-8256
				span.attr( "aria-hidden", "true" );

				// TODO possibly aggregate multiple select option classes
				that._addClass( span, "ui-selectmenu-button-text",
					[ that.element.attr( "class" ), selected.attr( "class" ) ].join( " " ) );
				that._removeClass( span, null, "ui-screen-hidden" );
				return span;
			} )() );
	},

	setButtonCount: function() {
		var selected = this.selected();

		// Multiple count inside button
		if ( this.isMultiple ) {
			this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
		}
	},

	_handleKeydown: function( /* event */ ) {
		this._delay( "_refreshButton" );
	},

	_refreshButton: function() {
		this.setButtonText();
		this.setButtonCount();
	},

	refresh: function() {
		this._refreshButton();
	},

	// Functions open and close preserved in native selects to simplify users code when looping
	// over selects
	open: $.noop,
	close: $.noop,

	disable: function() {
		this._setDisabled( true );
		this.button.addClass( "ui-state-disabled" );
	},

	enable: function() {
		this._setDisabled( false );
		this.button.removeClass( "ui-state-disabled" );
	}
}, $.ui.formResetMixin ] );

return $.widget( "mobile.selectmenu", selectmenu, $.mobile.widget.theme );

} );
