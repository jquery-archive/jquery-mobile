/*
* jQuery Mobile Framework : "customTextInput" plugin for text inputs, textareas (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
jQuery.fn.customTextInput = function(options){
	return $(this).each(function(){	
		var input = $(this);
		
		var o = $.extend({
			//defaultTheme: "a"
		}, options);
		
		$('label[for='+input.attr('id')+']').addClass('ui-input-text');
		
		input
			.addClass('ui-corner-all ui-body-c ui-input-text')
			.focus(function(){
				$(this).addClass('ui-focus');
			})
			.blur(function(){
				$(this).removeClass('ui-focus');
			});
			
		//autogrow	
		if(input.is('textarea')){
			input.expandable();
		}	
	});
};
})(jQuery);
