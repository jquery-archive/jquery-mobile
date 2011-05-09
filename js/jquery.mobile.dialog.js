/*
* jQuery Mobile Framework : "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
(function($, undefined ) {
$.widget( "mobile.dialog", $.mobile.widget, {
	options: {
		closeBtnText: "Close"
	},
	_create: function(){
		var self = this,
			$dialog = self.element,
			dialogTheme = $dialog.jqmData( "theme" );
				
				
		/* class the markup for dialog styling */	
		$dialog			
			//add ARIA role
			.attr("role","dialog")
			.addClass( "ui-page ui-dialog ui-body-" + (dialogTheme || "a"));
			
		var $header = $dialog.find( ":jqmData(role=header)" );
		$header.addClass('ui-corner-top ui-overlay-shadow ui-bar-' + ($header.jqmData( "theme" ) || dialogTheme || "a"))
			   .prepend( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "rel='back' data-" + $.mobile.ns + "iconpos='notext'>"+ this.options.closeBtnText +"</a>" );
		
		var $content = $dialog.find('.ui-content:not([class*="ui-body-"])');
		$content.addClass('ui-body-' + ($content.jqmData( "theme" ) || dialogTheme || "c"));
			
		var $footer = $dialog.find( ".ui-content,:jqmData(role='footer')" ).last();
		$footer.addClass('ui-corner-bottom ui-overlay-shadow ui-bar-' + ($footer.jqmData( "theme" ) || dialogTheme || "a"));
				
		
		/* bind events 
			- clicks and submits should use the closing transition that the dialog opened with
			  unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		this.element		
			.bind( "vclick submit", function(e){
				var $targetel;
				if( e.type == "vclick" ){
					$targetel = $(e.target).closest("a");
				}
				else{
					$targetel = $(e.target).closest("form");
				}
				
				if( $targetel.length && !$targetel.jqmData("transition") ){
					$targetel
						.attr("data-" + $.mobile.ns + "transition", $.mobile.urlHistory.getActive().transition )
						.attr("data-" + $.mobile.ns + "direction", "reverse");
				}
			});

	},
	
	//close method goes back in history
	close: function(){
		window.history.back();
	}
});
})( jQuery );