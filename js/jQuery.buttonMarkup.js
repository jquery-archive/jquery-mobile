/*
* jQuery Mobile Framework : sample plugin for making button-like links
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/ 
(function($){
$.fn.buttonMarkup = function(options){
	return $(this).each(function(){
		var el = $(this);
		var o = $.extend({
			theme: (function(){
				//if data-theme attr is present
				if(el.is('[data-theme]')){
					return el.attr('data-theme');
				}
				//if not, find closest theme container
				if(el.parents('body').length){
					var themedParent = el.closest('[class*=ui-bar-]'); //this still catches ui-bar-blah... 
					return themedParent.length ? themedParent.attr('class').match(/ui-bar-([a-z])/)[1] : 'c';
				}
				else {
					return 'c';
				}
			})(),
			corners: true,
			shadow: true,
			iconshadow: true,
			iconPos: el.attr('data-iconPos'),
			icon: el.attr('data-icon')
		},options);
		
		if(o.icon){
			o.icon = 'ui-icon-'+o.icon;
			if(!o.iconPos){ o.iconPos = 'left'; }
		}
		
		el
			.attr('data-theme', o.theme)
			.addClass('ui-btn ui-btn-up-'+ o.theme + (o.corners?' ui-btn-corner-all':'') + (o.iconPos? ' ui-btn-icon-'+o.iconPos : '')+ (o.shadow? ' ui-shadow' : ''))
			.wrapInner('<span class="ui-btn-text"></span>')
			.prepend(o.iconPos ? '<span class="ui-icon '+o.icon+ (o.shadow? ' ui-icon-shadow' : '')+'"></span>': '')
			.wrapInner('<span class="ui-btn-inner '+ (o.corners?' ui-btn-corner-all':'') +'"></span>')
			.clickable();
	});		

};
})(jQuery);

