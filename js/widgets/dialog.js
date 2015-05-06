/*!
 * jQuery Mobile Dialog @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Dialogs (deprecated)
//>>group: Widgets
//>>description: Displays a page as a modal dialog with inset appearance and overlay background
//>>docs: http://api.jquerymobile.com/dialog/
//>>css.structure: ../css/structure/jquery.mobile.dialog.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"./page",
			"../navigation" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.dialog", {
	version: "@VERSION",

	options: {

		// Accepts left, right and none
		closeBtn: "left",
		closeBtnText: "Close",
		overlayTheme: "a",
		corners: true
	},

	// Override the theme set by the page plugin on pageshow
	_handlePageBeforeShow: function() {
		this._isCloseable = true;
		if ( this.options.overlayTheme ) {
			this.element.parent().pagecontainer( "option", "theme", this.options.overlayTheme );
		}
	},

	_handlePageBeforeHide: function() {
		this._isCloseable = false;
	},

	// click and submit events:
	// - clicks and submits should use the closing transition that the dialog
	//   opened with unless a data-transition is specified on the link/form
	// - if the click was on the close button, or the link has a data-rel="back"
	//   it'll go back in history naturally
	_handleVClickSubmit: function( event ) {
		var attrs,
			$target = $( event.target ).closest( event.type === "vclick" ? "a" : "form" );

		if ( $target.length && !$target.jqmData( "transition" ) ) {
			attrs = {};
			attrs[ "data-" + $.mobile.ns + "transition" ] =
				( $.mobile.navigate.history.getActive() || {} )[ "transition" ] ||
				$.mobile.defaultDialogTransition;
			attrs[ "data-" + $.mobile.ns + "direction" ] = "reverse";
			$target.attr( attrs );
		}
	},

	_create: function() {
		var elem = this.element,
			opts = this.options;

		// Class the markup for dialog styling and wrap interior
		elem.addClass( "ui-dialog" )
			.wrapInner( $( "<div/>", {

				// ARIA role
				"role": "dialog",
				"class": "ui-dialog-contain ui-overlay-shadow" +
					( !!opts.corners ? " ui-corner-all" : "" )
			} ) );

		$.extend( this, {
			_isCloseable: false,
			_inner: elem.children(),
			_headerCloseButton: null
		} );

		this._on( elem, {
			vclick: "_handleVClickSubmit",
			submit: "_handleVClickSubmit",
			pagebeforeshow: "_handlePageBeforeShow",
			pagebeforehide: "_handlePageBeforeHide"
		} );

		this._setCloseBtn( opts.closeBtn );
	},

	_setOptions: function( options ) {
		var closeButtonLocation, closeButtonText,
			currentOpts = this.options;

		if ( options.corners !== undefined ) {
			this._inner.toggleClass( "ui-corner-all", !!options.corners );
		}

		if ( options.overlayTheme !== undefined ) {
			if ( $.mobile.activePage[ 0 ] === this.element[ 0 ] ) {
				currentOpts.overlayTheme = options.overlayTheme;
				this._handlePageBeforeShow();
			}
		}

		if ( options.closeBtnText !== undefined ) {
			closeButtonLocation = currentOpts.closeBtn;
			closeButtonText = options.closeBtnText;
		}

		if ( options.closeBtn !== undefined ) {
			closeButtonLocation = options.closeBtn;
		}

		if ( closeButtonLocation ) {
			this._setCloseBtn( closeButtonLocation, closeButtonText );
		}

		this._super( options );
	},

	_setCloseBtn: function( location, text ) {
		var dst,
			button = this._headerCloseButton;

		// Sanitize value
		location = "left" === location ? "left" : "right" === location ? "right" : "none";

		if ( "none" === location ) {
			if ( button ) {
				button.remove();
				button = null;
			}
		} else if ( button ) {
			button.removeClass( "ui-button-left ui-button-right" ).addClass( "ui-button-" + location );
			if ( text ) {
				button.text( text );
			}
		} else {
			dst = this._inner.find( ":jqmData(role='header')" ).first();
			button = $( "<a></a>", {
				"role": "button",
				"href": "#",
				"class": "ui-button ui-corner-all ui-icon-delete ui-button-icon-only ui-button-" + location
			} )
				.text( text || this.options.closeBtnText || "" )
				.prependTo( dst );
			this._on( button, { click: "close" } );
		}

		this._headerCloseButton = button;
	},

	// Close method goes back in history
	close: function() {
		var hist = $.mobile.navigate.history;

		if ( this._isCloseable ) {
			this._isCloseable = false;
			// If the hash listening is enabled and there is at least one preceding history
			// entry it's ok to go back. Initial pages with the dialog hash state are an example
			// where the stack check is necessary
			if ( $.mobile.hashListeningEnabled && hist.activeIndex > 0 ) {
				$.mobile.back();
			} else {
				$.mobile.pageContainer.pagecontainer( "back" );
			}
		}
	}
} );

} );
