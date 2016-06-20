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
		classes: {
			"ui-page-dialog-close-button":
				"ui-button ui-corner-all ui-button-icon-only",
			"ui-page-dialog-close-button-icon": "ui-icon-delete ui-icon",
			"ui-page-dialog-contain": "ui-overlay-shadow ui-corner-all"
		},

		// Accepts left, right and none
		closeBtn: "left",
		closeBtnText: "Close",
		overlayTheme: "a",
		dialog: false
	},

	_create: function() {
		this.dialog = {};

		return this._superApply( arguments );
	},

	_establishStructure: function() {
		var returnValue = this._superApply( arguments );

		if ( this.options.dialog ) {
			if ( this.options.enhanced ) {
				this.dialog.wrapper = this.element.children( ".ui-page-dialog-contain" ).eq( 0 );
				if ( this.options.closeBtn !== "none" ) {
					this.dialog.button = this.dialog.wrapper
						.children( ".ui-toolbar-header" )
							.children( "a.ui-page-dialog-close-button" );
					this.dialog.icon = this.dialog.button
						.children( ".ui-page-dialog-close-button-icon" );
				}
			} else {
				this.dialog.wrapper = $( "<div>" );

				// Gut the page
				this.dialog.wrapper.append( this.element.contents() );

				// Establish the button
				this._setCloseButton( this.options.closeBtn, this.options.closeBtnText );
			}
		}

		return returnValue;
	},

	_themeElements: function() {
		var elements = this._super();
		if ( this.options.dialog ) {
			elements.push(
				{
					element: this.dialog.wrapper,
					prefix: "ui-body-"
				}
			);
		}

		return elements;
	},

	_setAttributes: function() {
		var returnValue = this._superApply( arguments );

		if ( this.options.dialog ) {
			this._addClass( "ui-page-dialog", null );
			this._addClass( this.dialog.wrapper, "ui-page-dialog-contain", null );

			// Aria role
			this.dialog.wrapper.attr( "role", "dialog" );
		}

		if ( this.dialog.button && this.options.enhanced ) {
			this._toggleButtonClasses( true, this.options.closeBtn );
		}

		return returnValue;
	},

	_attachToDOM: function() {
		var returnValue = this._superApply( arguments );

		if ( this.options.dialog && !this.options.enhanced ) {
			this.element.append( this.dialog.wrapper );
		}

		return returnValue;
	},

	_toggleButtonClasses: function( add, location ) {
		this._toggleClass( this.dialog.button, "ui-page-dialog-close-button",
			"ui-toolbar-header-button-" + location, add );
		this._toggleClass( this.dialog.icon, "ui-page-dialog-close-button-icon", null, add );
	},

	_setOptions: function( options ) {
		var closeButtonLocation, closeButtonText;

		this._super( options );

		if ( !this.options.dialog ) {
			return;
		}

		if ( options.overlayTheme !== undefined ) {
			if ( $.mobile.activePage[ 0 ] === this.element[ 0 ] ) {

				// Needs the option value to already be set on this.options. This is accomplished
				// by chaining up above, before handling the overlayTheme change.
				this._handlePageBeforeShow();
			}
		}

		if ( options.closeBtnText !== undefined ) {
			closeButtonLocation = this.options.closeBtn;
			closeButtonText = options.closeBtnText;
		}

		if ( options.closeBtn !== undefined ) {
			closeButtonLocation = options.closeBtn;
			closeButtonText = closeButtonText || this.options.closeBtnText;
		}

		if ( closeButtonLocation ) {
			this._setCloseButton( closeButtonLocation, closeButtonText );
		}
	},

	_toggleCloseButtonClickability: function( isClickable ) {
		if ( this.dialog.button ) {
			if ( isClickable ) {
				this.dialog.button.css( "pointer-events", "" );
				this.dialog.button.removeAttr( "tabindex" );
			} else {
				this.dialog.button.css( "pointer-events", "none" );
				this.dialog.button.attr( "tabindex", -1 );
			}
		}
	},

	_handlePageBeforeShow: function() {

		// Make sure the close button is clickable
		this._toggleCloseButtonClickability( true );
		if ( this.options.overlayTheme && this.options.dialog ) {
			this._setContainerSwatch( this.options.overlayTheme );
		} else {
			this._super();
		}
	},

	_handleButtonClick: function() {

		// Render the close button unclickable after one click
		this._toggleCloseButtonClickability( false );
	},

	_setCloseButton: function( location, text ) {
		var destination;

		// Sanitize value
		location = "left" === location ? "left" : "right" === location ? "right" : "none";

		if ( this.dialog.button ) {

			if ( "none" === location ) {

				// Remove existing button
				this._toggleButtonClasses( false, location );
				this._off( this.dialog.button, "click" );
				this.dialog.button.remove();
				this.dialog.button = null;
				this.dialog.icon = null;
			} else {

				// Update existing button
				this._removeClass( this.dialog.button, null,
						"ui-toolbar-header-button-left ui-toolbar-header-button-right" )
					._addClass( this.dialog.button, null, "ui-toolbar-header-button-" + location );
				if ( text ) {

					// Get rid of all text nodes without touching other node types before updating
					// the button's text.
					this.dialog.button.contents()
						.filter( function() {
							return ( this.nodeType === 3 );
						} )
						.remove();
					this.dialog.button.prepend( text );
				}
			}
		} else if ( location !== "none" ) {

			// Create new button
			destination = this.dialog.wrapper
				.children( ".ui-toolbar-header,[data-" + $.mobile.ns + "type='header']" )
					.first();
			if ( destination.length ) {
				this.dialog.button = $( "<a href='#' data-" + $.mobile.ns + "rel='back'></a>" )
					.text( text || this.options.closeBtnText || "" );
				this.dialog.icon = $( "<span>" ).appendTo( this.dialog.button );

				this._toggleButtonClasses( true, location );

				this.dialog.button.prependTo( destination );
				this._on( this.dialog.button, { "click": "_handleButtonClick" } );
			}
		}
	}
} );

} );
