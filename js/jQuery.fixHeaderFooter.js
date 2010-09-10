/*
* jQuery Mobile Framework : prototype for "fixHeaderFooter" plugin - on-demand positioning for headers,footers
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.fixHeaderFooter = function(options){
	return $(this).each(function(){
		var el = $(this);		
		var o = $.extend({
			ignoreTargets: 'a,input,textarea,select,button,label,.ui-headfoot-placehold',
			overlayOnly: el.find('.ui-fullscreen').length //if this is true, we should set the parent div to height 0 to force overlays...?
		},options);

		var els = el.find('.ui-header,.ui-footer').wrap('<div class="ui-headfoot-placehold"><div class="ui-headfoot-wrap"></div></div>'),
			posLoop = setInterval(function(){ els.trigger('setTop'); }, 20);	
			
		//set placeholder heights, then bind custom events	
		els
			.each(function(){ 
				var placehold = $(this).parents('.ui-headfoot-placehold:eq(0)');
				if(o.overlayOnly){	
					$(this).parent().parent().height(0);
				}
				else{
					$(this).parent().parent().height($(this).parent().height());
				}
			})
			.bind('setTop',function(){
				var fromTop = $.scrollY(),
					screenHeight = window.innerHeight,
					thisHeight = $(this).parent().outerHeight();
					return $(this).parent().css('top', ($(this).is('.ui-header')) ? fromTop : fromTop + screenHeight - thisHeight);
			})
			.bind('overlayIn',function(){
				$(this).parent().addClass('ui-fixpos');
				if(o.overlayOnly){	
					$(this).parent().parent().removeClass('ui-headfoot-hidden');
				}
				return $(this).trigger('setTop');	
			})
			.bind('overlayOut',function(){
				$(this).parent().removeClass('ui-fixpos');
				if(o.overlayOnly){	
					$(this).parent().parent().addClass('ui-headfoot-hidden');
				}
				return $(this);
			})
			.bind('overlayToggle',function(){
				return $(this).parent().is('.ui-fixpos') ? $(this).trigger('overlayOut') : $(this).trigger('overlayIn');
			})
			.bind('mousedown',function(e){
				return false;
			})
			.bind('click tap',function(e){
				e.stopImmediatePropagation();
			});			
		
		$(document)
			.bind('tap',function(e){
				if( !$(e.target).closest(o.ignoreTargets).length ){
					els.trigger('overlayToggle');
				}
			})
			.bind('scrollstart',function(){
				if(els.parent().is('.ui-fixpos')){
					els.data('visiblebeforescroll',true);
				}
				els.trigger('overlayOut');
			})
			.bind('scrollstop',function(){
				if(els.data('visiblebeforescroll')){
					els.removeData('visiblebeforescroll').trigger('overlayIn');
				}
			});
					
		$(window)
			.bind('load',function(){
				els.trigger('overlayIn');
				setTimeout(function(){
					els.trigger('overlayOut');
					if(posLoop){ clearInterval(posLoop); }
				}, 2000);
					
				if(o.overlayOnly){	
					//to-do...for a photo-viewer or something full-screen 
					els.parents('.ui-headfoot-placehold:eq(0)').addClass('ui-headfoot-overlayonly');
				}
			})
			.resize(function(){ els.trigger('overlayOut'); });
	});			
};
})(jQuery);