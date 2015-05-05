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
		this._ui = {};
		this._super();
		if ( this.options.dialog ) {
			if ( this.options.enhanced ) {
				this._ui.wrapper = this.element.children();
				if ( this.options.closeBtn !== "none" ) {
					this._ui.button = this._ui.wrapper
						.children( ".ui-header" )
							.children( "a.ui-page-dialog-close-button" );
					this._ui.icon = this._ui.button
						.children( ".ui-page-dialog-close-button-icon" );
					this._toggleButtonClasses( true, this.options.closeBtn );
				}
				this._toggleOuterClasses( true );
			}
		}
	},

	_toggleOuterClasses: function( add ) {
		this._toggleClass( "ui-page-dialog", null, add );
		this._toggleClass( this._ui.wrapper, "ui-page-dialog-contain", null, add );
	},

	_toggleButtonClasses: function( add, location ) {
		this._toggleClass( this._ui.button, "ui-page-dialog-close-button",
			"ui-button-" + location, add );
		this._toggleClass( this._ui.icon, "ui-page-dialog-close-button-icon", null, add );
	},

	_enhance: function() {
		this._super();

		if ( this.options.dialog ) {
			this._ui.wrapper = $( "<div>", {

				// ARIA role
				"role": "dialog"
			} );

			this._ui.wrapper.append( this.element.contents() );
			this._setCloseButton( this.options.closeBtn, this.options.closeBtnText );
			this._toggleOuterClasses( true );
			this.element.append( this._ui.wrapper );
		}
	},

	_setOptions: function( options ) {
		var closeButtonLocation, closeButtonText;

		this._super( options );

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
		}

		if ( closeButtonLocation ) {
			this._setCloseButton( closeButtonLocation, closeButtonText );
		}
	},

	_handlePageBeforeShow: function() {

		// Make sure the close button is clickable
		if ( this._ui.button ) {
			this._ui.button
				.css( "pointer-events", "" )
				.removeAttr( "tabindex" );
		}
		if ( this.options.overlayTheme && this.options.dialog ) {
			this.removeContainerBackground();
			this.setContainerBackground( this.options.overlayTheme );
		} else {
			this._super();
		}
	},

	_handleButtonClick: function() {

		// Render the close button unclickable after one click
		if ( this._ui.button ) {
			this._ui.button
				.css( "pointer-events", "none" )
				.attr( "tabindex", -1 );
		}
	},

	_setCloseButton: function( location, text ) {
		var destination;

		// Sanitize value
		location = "left" === location ? "left" : "right" === location ? "right" : "none";

		if ( this._ui.button ) {

			if ( "none" === location ) {

				// Remove existing button
				this._toggleButtonClasses( false, location );
				this._off( this._ui.button, "click" );
				this._ui.button.remove();
				this._ui.button = null;
				this._ui.icon = null;
			} else {

				// Update existing button
				this._removeClass( this._ui.button, null, "ui-button-left ui-button-right" )
					._addClass( this._ui.button, null, "ui-button-" + location );
				if ( text ) {
					this._ui.button.text( text );
				}
			}
		} else if ( "none" !== location ) {

			// Create new button
			destination = this._ui.wrapper
				.children( ".ui-header,:jqmData(role='header')" )
					.first();
			if ( destination.length > 0 ) {
				this._ui.button = $( "<a href='#' data-" + $.mobile.ns + "rel='back'></a>" )
					.text( text || this.options.closeBtnText || "" );
				this._ui.icon = $( "<span>" ).appendTo( this._ui.button );

				this._toggleButtonClasses( true, location );

				this._ui.button.prependTo( destination );
				this._on( this._ui.button, { "click": "_handleButtonClick" } );
			}
		}
	}
} );

} );
