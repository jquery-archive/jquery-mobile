/*
* jQuery Mobile Framework : prototype for "dialog" plugin.
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.dialog = function(options){
	return $(this).each(function(){		
		$(this)
			//add ARIA role
			.attr("role","dialog")
			.addClass('ui-page ui-dialog ui-body-a')
			.find('[data-role=header]')
			.addClass('ui-corner-top ui-overlay-shadow')
				.find('.ui-btn-left').tap(function(){
					$.changePage()
					return false;
				})
				.click(function(){
					return false;
				})
				.end()
			.end()
			.find('.ui-content,[data-role=footer]')
				.last()
				.addClass('ui-corner-bottom ui-overlay-shadow');
	});
};
})(jQuery);