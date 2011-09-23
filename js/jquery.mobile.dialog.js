/*
* jQuery Mobile Framework : "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
*/

(function( $, window, undefined ) {

$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText 	: "Close",
		theme			: "a",
		initSelector	: ":jqmData(role='dialog')"
	},
	_create: function() {
		var self = this,
			$el = this.element,
			pageTheme = $el.attr( "class" ).match( /ui-body-[a-z]/ ),
			headerCloseButton = $( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText + "</a>" );

		if( pageTheme.length ){
			$el.removeClass( pageTheme[ 0 ] );
		}

		$el.addClass( "ui-body-" + this.options.theme );

		// Class the markup for dialog styling
		// Set aria role
		$el.attr( "role", "dialog" )
			.addClass( "ui-dialog" )
			.find( ":jqmData(role='header')" )
			.addClass( "ui-corner-top ui-overlay-shadow" )
				.prepend( headerCloseButton )
			.end()
			.find( ":jqmData(role='content'),:jqmData(role='footer')" )
				.last()
				.addClass( "ui-corner-bottom ui-overlay-shadow" );

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
		.bind( "pagehide", function() {
			$( this ).find( "." + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass );
		});
	},

	// Close method goes back in history
	close: function() {
		window.history.back();
	}
});

//auto self-init widgets
$( $.mobile.dialog.prototype.options.initSelector ).live( "pagecreate", function(){
	$( this ).dialog();
});

})( jQuery, this );
