/*
* jQuery Mobile Framework : "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
*/

(function( $, window, undefined ) {

//auto self-init widgets
var initSelector = ":jqmData(role='dialog')";

$( initSelector ).live( "pagecreate", function(){
	$( this ).dialog();
});

$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText 	: "Close",
		theme			: "a",
		initSelector	: initSelector
	},
	_create: function() {
		var $el = this.element,
			pageTheme = $el.attr( "class" ).match( /ui-body-[a-z]/ );
			
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
				.prepend( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "rel='back' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText + "</a>" )
			.end()
			.find( ":jqmData(role='content'),:jqmData(role='footer')" )
				.last()
				.addClass( "ui-corner-bottom ui-overlay-shadow" );

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
})( jQuery, this );
