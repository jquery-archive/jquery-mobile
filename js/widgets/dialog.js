//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Displays a page as a modal dialog with inset appearance and overlay background
//>>label: Dialogs
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.dialog.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "../jquery.mobile.navigation", "./optionDemultiplexer" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.widget( "mobile.dialog", $.extend( {
	options: {
		closeBtn: "left", /* Accepts left, right and none */
		closeBtnText: "Close",
		overlayTheme: "a",
		corners: true
	},

	// Override the theme set by the page plugin on pageshow
	_handlePageBeforeShow: function() {
		this._isCloseable = true;
		if ( this.options.overlayTheme ) {
			this.element
				.page( "removeContainerBackground" )
				.page( "setContainerBackground", this.options.overlayTheme );
		}
	},

	_handlePageBeforeHide: function() {
		this._isCloseable = false;
	},

	_create: function() {
		var $el = this.element,
			cornerClass = !!this.options.corners ? " ui-corner-all" : "",
			dialogWrap = $( "<div/>", {
					"role" : "dialog",
					"class" : "ui-dialog-contain ui-overlay-shadow" + cornerClass
				});

		$el.addClass( "ui-dialog" );

		// Class the markup for dialog styling
		// Set aria role
		$el.wrapInner( dialogWrap );

		/* bind events
			- clicks and submits should use the closing transition that the dialog opened with
				unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		$el.bind( "vclick submit", function( event ) {
			var $target = $( event.target ).closest( event.type === "vclick" ? "a" : "form" ),
				active;

			if ( $target.length && !$target.jqmData( "transition" ) ) {

				active = $.mobile.urlHistory.getActive() || {};

				$target.attr( "data-" + $.mobile.ns + "transition", ( active.transition || $.mobile.defaultDialogTransition ) )
					.attr( "data-" + $.mobile.ns + "direction", "reverse" );
			}
		});

		this._on( $el, {
			pagebeforeshow: "_handlePageBeforeShow",
			pagebeforehide: "_handlePageBeforeHide"
		});

		this._setCloseBtn( this.options.closeBtn );
	},

	_setCorners: function( value ) {
		this.element.children().toggleClass( "ui-corner-all", value );
	},

	_setOverlayTheme: function( value ) {
		if ( $.mobile.activePage[ 0 ] === this.element[ 0 ] ) {
			this.options.overlayTheme = value;
			this._handlePageBeforeShow();
		}
	},

	_setCloseBtnText: function( value ) {
		this.options.closeBtnText = value;
		this._setCloseBtn( this.options.closeBtn );
	},

	_setCloseBtn: function( value ) {
		var self = this, btn, location, dst;

		if ( this._headerCloseButton ) {
			this._headerCloseButton.remove();
			this._headerCloseButton = null;
		}
		if ( value !== "none" ) {
			// Sanitize value
			location = ( value === "left" ? "left" : "right" );
			dst = this.element.children().find( ":jqmData(role='header')" ).first();
			btn = $( "<a></a>", {
				"href": "#",
				"class": "ui-btn ui-btn-" + location +
					" ui-corner-all ui-icon-delete ui-btn-icon-notext"
				})
				.text( this.options.closeBtnText )
				.prependTo( dst )
				// this must be an anonymous function so that select menu dialogs can replace
				// the close method. This is a change from previously just defining data-rel=back
				// on the button and letting nav handle it
				//
				// Use click rather than vclick in order to prevent the possibility of unintentionally
				// reopening the dialog if the dialog opening item was directly under the close button.
				.bind( "click", function() {
					self.close();
				});

			this._headerCloseButton = btn;
		}
	},

	// Close method goes back in history
	close: function() {
		var idx, dst, hist = $.mobile.navigate.history;

		if ( this._isCloseable ) {
			this._isCloseable = false;
			// If the hash listening is enabled and there is at least one preceding history
			// entry it's ok to go back. Initial pages with the dialog hash state are an example
			// where the stack check is necessary
			if ( $.mobile.hashListeningEnabled && hist.activeIndex > 0 ) {
				$.mobile.back();
			} else {
				idx = Math.max( 0, hist.activeIndex - 1 );
				dst = hist.stack[ idx ].pageUrl || hist.stack[ idx ].url;
				hist.previousIndex = hist.activeIndex;
				hist.activeIndex = idx;
				if ( !$.mobile.path.isPath( dst ) ) {
					dst = $.mobile.path.makeUrlAbsolute( "#" + dst );
				}

				$.mobile.changePage( dst, { direction: "back", changeHash: false, fromHashChange: true } );
			}
		}
	}
}, $.mobile.behaviors.optionDemultiplexer ) );

$.mobile.dialog.initSelector = ":jqmData(role='dialog')";
//auto self-init widgets
$.mobile.document.delegate( $.mobile.dialog.initSelector, "pagecreate", function() {
	$.mobile.dialog.prototype.enhance( this );
});

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
