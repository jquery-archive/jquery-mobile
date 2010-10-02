/*
* jQuery Mobile Framework : prototype for "fixHeaderFooter" plugin - on-demand positioning for headers,footers
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.fixHeaderFooter = function(options){
	return $(this).each(function(){
		$(this).find('.ui-header').addClass('ui-header-fixed fade'); //should be slidedown
		$(this).find('.ui-footer').addClass('ui-footer-fixed fade'); //should be slideup		
	});
};				

//single controller for all showing,hiding,toggling		
$.fixedToolbars = (function(){
	var currentstate = 'inline',
		showAfterScroll = false,
		delayTimer,
		ignoreTargets = 'a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed';

	$(function() {
		$(document)
			.bind('tap',function(e){
				if( !$(e.target).closest(ignoreTargets).length ){
					$.fixedToolbars.toggle();
				}
			})
			.bind('scrollstart',function(){
				if(currentstate == 'overlay'){
					showAfterScroll = true;
					$.fixedToolbars.hide(true);
				}
			})
			.bind('scrollstop',function(){
				if(showAfterScroll){
					showAfterScroll = false;
					$.fixedToolbars.show();
				}
			});

		$(window).bind('resize orientationchange', function(){ $.fixedToolbars.hide(true); });	
	});
	
	function setTop(el){
		var fromTop = $(window).scrollTop(),
			thisTop = el.offset().top,
			thisCSStop = parseFloat(el.css('top')),
			screenHeight = window.innerHeight,
			thisHeight = el.outerHeight();

		return el.css('top', el.is('.ui-header-fixed') ? fromTop - thisTop + thisCSStop : -1 * (thisTop - (fromTop + screenHeight) + thisCSStop + thisHeight) );
	}

	//exposed methods
	return {
		show: function(){
			currentstate = 'overlay';
			return $('.ui-header-fixed,.ui-footer-fixed').each(function(){
				var el = $(this),
					fromTop = $(window).scrollTop(),
					thisTop = el.offset().top,
					screenHeight = window.innerHeight,
					thisHeight = el.outerHeight(),
					alreadyVisible = (el.is('.ui-header-fixed') && fromTop <= thisTop + thisHeight) || (el.is('.ui-footer-fixed') && thisTop <= fromTop + screenHeight);	
					
				if( !alreadyVisible ){
					el.addClass('in').animationComplete(function(){
						el.removeClass('in');
					});
					setTop(el);
				}
			});	
		},
		hide: function(immediately){
			currentstate = 'inline';
			return $('.ui-header-fixed,.ui-footer-fixed').each(function(){
				var el = $(this);
				if(immediately){
					el.css('top',0);
				}
				else{
					if( el.css('top') !== 'auto' && parseFloat(el.css('top')) !== 0 ){
						var classes = 'out reverse';
						el.addClass(classes).animationComplete(function(){
							el.removeClass(classes);
							el.css('top',0);
						});	
					}
				}
			});
		},
		hideAfterDelay: function(){
			delayTimer = setTimeout(function(){
				$.fixedToolbars.hide();
			}, 3000);
		},
		toggle: function(){
			return (currentstate == 'overlay') ? $.fixedToolbars.hide() : $.fixedToolbars.show();
		}
	};
})();

})(jQuery);