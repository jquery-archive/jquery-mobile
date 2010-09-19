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
			search: input.is('[data-role="search"]') 
			//defaultTheme: "a"
		}, options);
		
		$('label[for='+input.attr('id')+']').addClass('ui-input-text');
		
		input.addClass('ui-input-text');
		
		var focusedEl = input;
		if(o.search){
			focusedEl = input.wrap('<div class="ui-input-search ui-clickable-corner-all ui-body-c ui-btn-shadow"></div>').parent();
		}
		else{
			input.addClass('ui-corner-all ui-body-c');
		}
				
		input
			.focus(function(){
				focusedEl.addClass('ui-focus');
			})
			.blur(function(){
				focusedEl.removeClass('ui-focus');
			});	
			
		//autogrow	
		if(input.is('textarea')){
			input.expandable();
		}	
	});
};
})(jQuery);
