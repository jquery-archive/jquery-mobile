//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Degrades inputs to another type after custom enhancements are made.
//>>label: Dialog-style Pages

define( [ "jquery", "jquery.mobile.widget" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window, undefined ) {

$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText 	: "Close",
		overlayTheme	: "a",
		initSelector	: ":jqmData(role='dialog')"
	},
	_create: function() {
		var self = this,
			$el = this.element,
			headerCloseButton = $( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText + "</a>" ),
			dialogWrap = $("<div/>", {
					"role" : "dialog",
					"class" : "ui-dialog ui-corner-all ui-overlay-shadow"
				});

		$el.addClass( "ui-dialog-page ui-overlay-" + this.options.overlayTheme );
		
		// Class the markup for dialog styling
		// Set aria role
		$el
			.wrapInner( dialogWrap )
			.find( ":jqmData(role='header')" )
				.prepend( headerCloseButton )
			.end()
			.find(':first-child')
				.addClass( "ui-corner-top" )
			.end()
			.find( ":last-child" )
				.addClass( "ui-corner-bottom" );

		// this must be an anonymous function so that select menu dialogs can replace
		// the close method. This is a change from previously just defining data-rel=back
		// on the button and letting nav handle it
		headerCloseButton.bind( "vclick", function() {
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
			$( this ).find( "." + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass );
			
			// if there's an overlay theme, we're going to remove it from the page container.
			// First though, check that the incoming page isn't a dialog with the same theme. If so, don't remove.
			if( self.options.overlayTheme ){
				if( !ui.nextPage || !ui.nextPage.is( ".ui-dialog-page.ui-overlay-" + self.options.overlayTheme ) ){
					$.mobile.pageContainer.removeClass( "ui-overlay-" + self.options.overlayTheme );
				}	
			}
		})
		.bind( "pagebeforeshow", function(){
			if( self.options.overlayTheme ){
				$.mobile.pageContainer.addClass( "ui-overlay-" + self.options.overlayTheme );
			}
		});
	},

	// Close method goes back in history
	close: function() {
		window.history.back();
	}
});

//auto self-init widgets
$( document ).delegate( $.mobile.dialog.prototype.options.initSelector, "pagecreate", function(){
	$( this ).dialog();
});

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
