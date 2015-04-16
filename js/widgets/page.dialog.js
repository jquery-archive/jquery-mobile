/*!
 * jQuery Mobile Page Styled As Dialog @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Dialog styling
//>>group: Widgets
//>>description: Styles a page as a modal dialog with inset appearance and overlay background
//>>docs: http://api.jquerymobile.com/page/
//>>demos: http://demos.jquerymobile.com/@VERSION/pages-dialog/
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

return $.widget( "mobile.page", $.mobile.page, {
	options: {

		// Accepts left, right and none
		closeBtn: "left",
		closeBtnText: "Close",
		overlayTheme: "a",
		corners: true,
		dialog: false
	},

	_create: function() {
		this._super();
		if ( this.options.dialog ) {

			$.extend( this, {
				_inner: this.element.children(),
				_headerCloseButton: null
			} );

			if ( !this.options.enhanced ) {
				this._setCloseBtn( this.options.closeBtn );
			}
		}
	},

	_enhance: function() {
		this._super();

		// Class the markup for dialog styling and wrap interior
		if ( this.options.dialog ) {
			this.element.addClass( "ui-dialog" )
				.wrapInner( $( "<div/>", {

					// ARIA role
					"role": "dialog",
					"class": "ui-dialog-contain ui-overlay-shadow" +
						( this.options.corners ? " ui-corner-all" : "" )
				} ) );
		}
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

	_handlePageBeforeShow: function() {
		if ( this.options.overlayTheme && this.options.dialog ) {
			this.removeContainerBackground();
			this.setContainerBackground( this.options.overlayTheme );
		} else {
			this._super();
		}
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
				"href": "#",
				"class": "ui-button ui-corner-all ui-icon-delete ui-button-icon-only ui-button-" + location
			} )
				.attr( "data-" + $.mobile.ns + "rel", "back" )
				.text( text || this.options.closeBtnText || "" )
				.prependTo( dst );
		}

		this._headerCloseButton = button;
	}
} );

} );
