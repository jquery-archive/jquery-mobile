/*
* jQuery Mobile Framework : "collapsible" plugin (based on code from Filament Group,Inc)
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function($){
$.fn.collapsible = function(options){
	return $(this).each(function(){
		var o = $.extend({
			expandCueText: ' click to expand contents',
			collapseCueText: ' click to collapse contents',
			collapsed: $(this).is('[data-state="collapsed"]'),
			heading: '>h1,>h2,>h3,>h4,>h5,>h6,>legend',
			theme: $(this).data('theme'),
			iconTheme: $(this).data('icontheme') || 'd'
		},options);

		//define
		var collapsibleContain = $(this).addClass('ui-collapsible-contain'),
			collapsibleHeading = $(this).find(o.heading).eq(0),
			collapsibleContent = collapsibleContain.wrapInner('<div class="ui-collapsible-content"></div>').find('.ui-collapsible-content');				
		
		//replace collapsibleHeading if it's a legend	
		if(collapsibleHeading.is('legend')){
			collapsibleHeading = $('<div role="heading">'+ collapsibleHeading.html() +'</div>').insertBefore(collapsibleHeading);
			collapsibleHeading.next().remove();
		}	
		
		//drop heading in before content
		collapsibleHeading.insertBefore(collapsibleContent);
		
		//modify markup & attributes
		collapsibleHeading.addClass('ui-collapsible-heading')
			.append('<span class="ui-collapsible-heading-status"></span>')
			.wrapInner('<a href="#" class="ui-collapsible-heading-toggle"></a>')
			.find('a:eq(0)')
			.buttonMarkup({
				shadow: true,
				corners:false,
				iconPos: 'left',
				icon: 'plus',
				theme: o.theme
			})
			.removeClass('ui-btn-corner-all')
			.addClass('ui-corner-all')
			.find('.ui-btn-inner')
			.removeClass('ui-btn-corner-all')
			.addClass('ui-corner-all')
			.find('.ui-icon')
			.removeAttr('class')
			.buttonMarkup({
				shadow: true,
				corners:true,
				iconPos: 'notext',
				icon: 'plus',
				theme: o.iconTheme
			});
		
		//events
		collapsibleContain	
			.bind('collapse', function(){
				collapsibleHeading
					.addClass('ui-collapsible-heading-collapsed')
					.find('.ui-collapsible-heading-status').text(o.expandCueText);
				
				collapsibleHeading.find('.ui-icon').removeClass('ui-icon-minus').addClass('ui-icon-plus');	
				collapsibleContent.addClass('ui-collapsible-content-collapsed').attr('aria-hidden',true);						
				
			})
			.bind('expand', function(){
				collapsibleHeading
					.removeClass('ui-collapsible-heading-collapsed')
					.find('.ui-collapsible-heading-status').text(o.collapseCueText);
				
				collapsibleHeading.find('.ui-icon').removeClass('ui-icon-plus').addClass('ui-icon-minus');	
				collapsibleContent.removeClass('ui-collapsible-content-collapsed').attr('aria-hidden',false);

			})
			.trigger(o.collapsed ? 'collapse' : 'expand');
			
		collapsibleHeading.click(function(){ 
			if( collapsibleHeading.is('.ui-collapsible-heading-collapsed') ){
				collapsibleContain.triggerHandler('expand'); 
			}	
			else {
				collapsibleContain.triggerHandler('collapse'); 
			}
			return false;
		});
			
	});	
};	
})(jQuery);