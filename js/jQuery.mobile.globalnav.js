/*
* jQuery Mobile Framework : prototype for "globalnav" plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.globalnav = function(settings){
	return $(this).each(function(){ //there should only ever be one of these... is each necessary?
		if($(this).find('.ui-globalnav').length){ return; }
		
		//remove any other globalnav currently present
		$('.ui-globalnav').remove();	
		
		var o = $.extend({
			fixedAs: 'footer'
		},settings);
		
		//wrap it with footer classes
		var $globalnav = $(this);
			$globalnav
				.wrapInner('<div class="ui-globalnav ui-bar-a"></div>')
				.children(0)
				.addClass(o.fixedAs == 'footer' ? 'ui-footer' : 'ui-header');
		
		//set up the nav tabs widths (currently evenly divided widths, to be improved later)
		$globalnav
			.find('ul')
			.grid({grid: $globalnav.find('li').length > 2 ? 'b' : 'a'})		
			.find('a')
			.buttonMarkup({corners: false, iconPos: 'top', icon: 'arrow-u'})
			.bind('tap',function(){
				//NOTE: we'll need to find a way to highlight an active tab at load as well
				$globalnav.find('.ui-btn-active').removeClass('ui-btn-active');
				$(this).addClass('ui-btn-active');
			});
		
		$globalnav
			.appendTo('body')
			.fixHeaderFooter();	

	});
};	
})(jQuery);