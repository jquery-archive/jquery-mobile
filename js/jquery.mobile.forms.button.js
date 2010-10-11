/*
* jQuery Mobile Framework : sample plugin for making button links that proxy to native input/buttons
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function($){
$.fn.customButton = function(){
	return $(this).each(function(){	
		var button = $(this).addClass('ui-btn-hidden').attr('tabindex','-1');
		//add ARIA role
		$('<a href="#" role="button">'+ (button.text() || button.val()) +'</a>')
			.buttonMarkup({theme: button.attr('data-theme'), icon: button.attr('data-icon')})
			.click(function(){
				button.click(); 
				return false;
			})
			.insertBefore(button);
	});
};
})(jQuery);