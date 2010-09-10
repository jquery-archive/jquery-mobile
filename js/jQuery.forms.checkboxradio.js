/*
* jQuery Mobile Framework : "customCheckboxRadio" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/  
(function($){
$.fn.customCheckboxRadio = function(options){
	return $(this).each(function(){	
		if($(this).is('[type=checkbox],[type=radio]')){
			var input = $(this);
			
			var o = $.extend({
				theme: 'b',
				icon: !input.parents('[data-type="horizontal"]').length,
				checkedicon: 'ui-icon-'+input.attr('type')+'-on',
				uncheckedicon: 'ui-icon-'+input.attr('type')+'-off'
			},options);
			
			// get the associated label using the input's id
			var label = $('label[for='+input.attr('id')+']').buttonMarkup({iconPos: o.icon ? 'left' : '', shadow: false});
						
			var icon = label.find('.ui-icon');
			
			// wrap the input + label in a div 
			input
				.add(label)
				.wrapAll('<div class="ui-'+ input.attr('type') +'"></div>');
			
			// necessary for browsers that don't support the :hover pseudo class on labels
			label
			.mousedown(function(){
				$(this).data('state', input.attr('checked'));
			})
			.click(function(){
				setTimeout(function(){
					if(input.attr('checked') == $(this).data('state')){
						input.trigger('click');
					}
				}, 1);
			})
			.clickable();
			
			//bind custom event, trigger it, bind click,focus,blur events					
			input.bind('updateState', function(){	
				if(input.is(':checked')){
					label.addClass('ui-btn-active');
					icon.addClass(o.checkedicon);
					icon.removeClass(o.uncheckedicon);
				}
				else {
					label.removeClass('ui-btn-active'); 
					icon.removeClass(o.checkedicon);
					icon.addClass(o.uncheckedicon);
				} 
				if(!input.is(':checked')){ label.removeClass('ui-focus'); }
			})
			.trigger('updateState')
			.click(function(){ 
				$('input[name='+ $(this).attr('name') +']').trigger('updateState'); 
			})
			.focus(function(){ 
				label.addClass('ui-focus'); 
				if(input.is(':checked')){  label.addClass('ui-focus'); } 
			})
			.blur(function(){ label.removeClass('ui-focus'); });
		}
	});
};
})(jQuery);