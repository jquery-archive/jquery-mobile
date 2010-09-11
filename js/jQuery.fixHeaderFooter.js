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
			transition: ['slidedown','slideup'],//also accepts a string, like 'fade'. All animations work, but fade and slidedown/up look best
			overlayOnly: el.find('.ui-fullscreen').length //if this is true, we should set the parent div to height 0 to force overlays...?
		},options);

		var els = el.find('.ui-header,.ui-footer').wrap('<div class="ui-headfoot-placehold"><div class="ui-headfoot-wrap"></div></div>'),
			posLoop = setInterval(function(){ els.trigger('setTop'); }, 20),
			tIsArray = $.isArray(o.transition);	
			
		//add transition types	
		els.filter('.ui-header').addClass(tIsArray ? o.transition[0] : o.transition);
		els.filter('.ui-footer').addClass(tIsArray ? o.transition[1] : o.transition);
	
		//for determining whether a placeholder is visible on the screen or not	
		function placeHolderOutofView(thisel){
			//always return false if it's overlayOnly
			if(o.overlayOnly){ return false; }
			
			var fromTop = $.scrollY(),
				screenHeight = window.innerHeight,
				thisHeight = thisel.parent().parent().height(),
				thisTop = thisel.parent().parent().offset().top;
				
			return thisel.is('.ui-header') ? (thisTop + thisHeight <= fromTop) : (thisTop > fromTop + screenHeight);
		}	
			
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
				var el = $(this);
				el.parent().addClass('ui-fixpos');
				//only animate if placeholder is out of view
				if( placeHolderOutofView(el) ){
					el.addClass('in').animationComplete(function(){
						el.removeClass('in');
					});
				}
				if(o.overlayOnly){	
					el.parent().parent().removeClass('ui-headfoot-hidden');
				}
				return $(this).trigger('setTop');	
			})
			.bind('overlayOut',function(e,immediately){
				var el = $(this);
				if(immediately || !placeHolderOutofView(el)){
					el.parent().removeClass('ui-fixpos');
					addOverlayOnlyClass();
				}
				else{
					var classes = 'out';
					//if it's one of these, we'll need to add the reverse class too
					if(el.is('.slidedown,.slideup, .swap, .pop, .flip')){
						classes += ' reverse';
					}
					el.addClass(classes).animationComplete(function(){
						el.removeClass(classes);
						el.parent().removeClass('ui-fixpos');
						addOverlayOnlyClass();
					});	
				}
				function addOverlayOnlyClass(){
					if(o.overlayOnly){	
						el.parent().parent().addClass('ui-headfoot-hidden');
					}
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
					els.data('visiblebeforescroll', true);
				}
				els.trigger('overlayOut',[true]);
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