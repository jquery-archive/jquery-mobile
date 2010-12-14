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
			$el = self.element,
			$prevPage = $.mobile.activePage,
			$closeBtn = $('<a href="#" data-icon="delete" data-iconpos="notext">Close</a>');
	
		$el.delegate("a, form", "click submit", function(e){
			if( e.type == "click" && ( $(e.target).closest('[data-back]')[0] || this==$closeBtn[0] ) ){
				self.close();
				return false;
			}
			//otherwise, assume we're headed somewhere new. set activepage to dialog so the transition will work
			$.mobile.activePage = self.element;
		});
	
		this.element
			.bind("pageshow",function(){
				return false;
			})
			//add ARIA role
			.attr("role","dialog")
			.addClass('ui-page ui-dialog ui-body-a')
			.find('[data-role=header]')
			.addClass('ui-corner-top ui-overlay-shadow')
				.prepend( $closeBtn )
			.end()
			.find('.ui-content:not([class*="ui-body-"])')
				.addClass('ui-body-c')
			.end()	
			.find('.ui-content,[data-role=footer]')
				.last()
				.addClass('ui-corner-bottom ui-overlay-shadow');
		
		$(window).bind('hashchange',function(){
			if( $el.is('.ui-page-active') ){
				self.close();
				$el.bind('pagehide',function(){
					$.mobile.updateHash( $prevPage.attr('data-url'), true);
				});
			}
		});		

	},
	
	close: function(){
		$.mobile.changePage([this.element, $.mobile.activePage], undefined, true, true );
	}
});
})( jQuery );