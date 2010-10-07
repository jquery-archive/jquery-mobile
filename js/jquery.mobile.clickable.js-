/*
* jQuery Mobile Framework : sample scripting for manipulating themed interaction states
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.clickable = function(){
	return $(this).each(function(){
		var theme = $(this).attr('data-theme');
		$(this)
			.mousedown(function(){
				$(this).removeClass('ui-btn-up-'+theme).addClass('ui-btn-down-'+theme);
			})
			.mouseup(function(){
				$(this).removeClass('ui-btn-down-'+theme).addClass('ui-btn-up-'+theme);
			})
			.bind('mouseover',function(){
				$(this).removeClass('ui-btn-up-'+theme).addClass('ui-btn-hover-'+theme);
			})
			.bind('mouseout',function(){
				$(this).removeClass('ui-btn-hover-'+theme).addClass('ui-btn-up-'+theme);
			})
			.bind('focus',function(){
				$(this).addClass('ui-focus');
			})
			.bind('blur',function(){
				$(this).removeClass('ui-focus');
			});
	});	
};		
})(jQuery);


