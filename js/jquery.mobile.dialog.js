/*
* jQuery Mobile Framework : "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change
*/
(function($, undefined ) {
$.widget( "mobile.dialog", $.mobile.widget, {
	options: {},
	_create: function(){
		var self = this,
			$el = self.element;
		
		/* class the markup for dialog styling */	
		this.element			
			//add ARIA role
			.attr("role","dialog")
			.addClass('ui-page ui-dialog ui-body-a')
			.find( "[data-" + $.mobile.ns + "role=header]" )
			.addClass('ui-corner-top ui-overlay-shadow')
				.prepend( "<a href='#' data-" + $.mobile.ns + "icon='delete' data-" + $.mobile.ns + "rel='back' data-" + $.mobile.ns + "iconpos='notext'>Close</a>" )
			.end()
			.find('.ui-content:not([class*="ui-body-"])')
				.addClass('ui-body-c')
			.end()
			.find( ".ui-content,[data-" + $.mobile.ns + "role='footer']" )
				.last()
				.addClass('ui-corner-bottom ui-overlay-shadow');
		
		/* bind events 
			- clicks and submits should use the closing transition that the dialog opened with
			  unless a data-transition is specified on the link/form
			- if the click was on the close button, or the link has a data-rel="back" it'll go back in history naturally
		*/
		this.element		
			.bind( "click submit", function(e){
				var $targetel;
				if( e.type == "click" ){
					$targetel = $(e.target).closest("a");
				}
				else{
					$targetel = $(e.target).closest("form");
				}
				
				if( $targetel.length && !$targetel.data("transition") ){
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