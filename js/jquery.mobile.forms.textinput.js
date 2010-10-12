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
			search: input.is('[type="search"],[data-type="search"]'), 
			theme: input.data("theme") || "c"
		}, options);
		
		$('label[for='+input.attr('id')+']').addClass('ui-input-text');
		
		input.addClass('ui-input-text ui-body-'+ o.theme);
		
		var focusedEl = input;
		
		//"search" input widget
		if(o.search){
			focusedEl = input.wrap('<div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-body-c ui-btn-shadow ui-icon-search"></div>').parent();
			var clearbtn = $('<a href="#" class="ui-input-clear" title="clear text">clear text</a>')
				.buttonMarkup({icon: 'delete', iconpos: 'notext', corners:true, shadow:true})
				.click(function(){
					input.val('').focus();
					input.trigger('change'); 
					clearbtn.addClass('ui-input-clear-hidden');
					return false;
				})
				.appendTo(focusedEl);
			
			function toggleClear(){
				if(input.val() == ''){
					clearbtn.addClass('ui-input-clear-hidden');
				}
				else{
					clearbtn.removeClass('ui-input-clear-hidden');
				}
			}
			
			toggleClear();
			input.keyup(toggleClear);	
		}
		else{
			input.addClass('ui-corner-all ui-shadow-inset');
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
			input.keydown(function(){
				if( input[0].offsetHeight < input[0].scrollHeight ){
					input.css({height: input[0].scrollHeight + 10 });
				}
			})
		}	
	});
};
})(jQuery);
