/*
* jQuery Mobile Framework : "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
( function( $, undefined ) {
$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText: "Close"
	},
	_create: function() {
		var $el = this.element;
		
		/* class the markup for dialog styling */	
		$el
			//add ARIA role
			.attr( "role", "dialog" )
			.addClass( "ui-page ui-dialog ui-body-a" )
			.find( ":jqmData(role=header)" )
			.addClass( "ui-corner-top ui-overlay-shadow" )
				.prepend( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "rel='back' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText +"</a>" )
			.end()
			.find( '.ui-content:not([class*="ui-body-"])' )
				.addClass( 'ui-body-c' )
			.end()
			.find( ".ui-content,:jqmData(role='footer')" )
				.last()
				.addClass( "ui-corner-bottom ui-overlay-shadow" );
		
		/* bind events 
			- clicks and submits should use the closing transition that the dialog opened with
			  unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		$el
			.bind( "vclick submit", function( e ) {
				var $target = $( e.target ).closest( e.type === "vclick" ? "a" : "form" );
				
				if( $target.length && ! $target.jqmData( "transition" ) ) {
					var active = $.mobile.urlHistory.getActive() || {};
					$target
						.attr( "data-" + $.mobile.ns + "transition", ( active.transition || $.mobile.defaultDialogTransition ) )
						.attr( "data-" + $.mobile.ns + "direction", "reverse" );
				}
			})
			.bind( "pagehide", function() {
				$( this ).find( "." + $.mobile.activeBtnClass ).removeClass( $.mobile.activeBtnClass );
			});
	},
	
	//close method goes back in history
	close: function() {
		window.history.back();
	}
});
})( jQuery );
