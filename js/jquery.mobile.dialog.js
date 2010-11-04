/*
* jQuery Mobile Framework : prototype for "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function ( $ ) {
$.widget( "mobile.dialog", $.mobile.widget, {
	options: {},
	_create: function(){	
		var $el = this.element,
			$closeBtn = $('<a href="#" data-icon="delete" data-iconpos="notext">Close</a>')
							.click(function(){
								$.changePage([$el, $.activePage], undefined, true );
								return false;
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
			.find('.ui-content,[data-role=footer]')
				.last()
				.addClass('ui-corner-bottom ui-overlay-shadow');

	}
});
})( jQuery );