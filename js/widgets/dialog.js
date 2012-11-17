//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Displays a page as a modal dialog with inset appearance and overlay background
//>>label: Dialogs
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.dialog.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText: "Close",
        closeBtnIcon: "delete",
        closeBtnIconpos: "notext",
		overlayTheme: "a",
		corners: true,
		initSelector: ":jqmData(role='dialog')"
	},
	_create: function() {
		var self = this,
			$el = this.element,
			headerCloseButton = $( "<a href='#' data-" + $.mobile.ns + "icon='" + this.options.closeBtnIcon + "' data-" + $.mobile.ns + "iconpos='" + this.options.closeBtnIconpos + "'>"+ this.options.closeBtnText + "</a>" ),
			cornerClass = !!this.options.corners ? " ui-corner-all" : "",
			dialogWrap = $( "<div/>", {
					"role" : "dialog",
					"class" : "ui-dialog-contain ui-overlay-shadow" + cornerClass
				});

		$el.addClass( "ui-dialog ui-overlay-" + this.options.overlayTheme );

		// Class the markup for dialog styling
		// Set aria role
		$el
			.wrapInner( dialogWrap )
			.children()
				.find( ":jqmData(role='header')" )
					.prepend( headerCloseButton );

		// this must be an anonymous function so that select menu dialogs can replace
		// the close method. This is a change from previously just defining data-rel=back
		// on the button and letting nav handle it
		//
		// Use click rather than vclick in order to prevent the possibility of unintentionally
		// reopening the dialog if the dialog opening item was directly under the close button.
		headerCloseButton.bind( "click", function() {
			self.close();
		});

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
		})
		.bind( "pagehide", function( e, ui ) {
			$( this ).find( "." + $.mobile.activeBtnClass ).not( ".ui-slider-bg" ).removeClass( $.mobile.activeBtnClass );
		})
		// Override the theme set by the page plugin on pageshow
		.bind( "pagebeforeshow", function() {
			self._isCloseable = true;
			if ( self.options.overlayTheme ) {
				self.element
					.page( "removeContainerBackground" )
					.page( "setContainerBackground", self.options.overlayTheme );
			}
		});
	},

	// Close method goes back in history
	close: function() {
		var dst;

		if ( this._isCloseable ) {
			this._isCloseable = false;
			if ( $.mobile.hashListeningEnabled ) {
				$.mobile.back();
			} else {
				dst = $.mobile.urlHistory.getPrev().url;
				if ( !$.mobile.path.isPath( dst ) ) {
					dst = $.mobile.path.makeUrlAbsolute( "#" + dst );
				}

				$.mobile.changePage( dst, { changeHash: false, fromHashChange: true } );
			}
		}
	}
});

//auto self-init widgets
$( document ).delegate( $.mobile.dialog.prototype.options.initSelector, "pagecreate", function() {
	$.mobile.dialog.prototype.enhance( this );
});

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
