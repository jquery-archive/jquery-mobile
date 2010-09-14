/*
* jQuery Mobile Framework : prototype for "fixHeaderFooter" plugin - on-demand positioning for headers,footers
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.fixHeaderFooter = function(options){
	return $(this).each(function(){
		//make sure these things only get wrapped once
		if($(this).data('fixedapplied')){ return; }
		var el = $uipage = $(this).data('fixedapplied',true),
			els = el.find('.ui-header,.ui-footer').wrap('<div class="ui-headfoot-placehold"><div class="ui-headfoot-wrap"></div></div>');	
			//wrapper explanation: placehold wrapper sits inline and holds the height of the toolbars open while they are position abs, 
			//unless it's overlay-only, in which case the height is 0 so it's hidden when pos static
		
		//config options - currently driven off data attr's 
		var o = $.extend({
			transition: el.find('[data-headfoottransition]').attr('data-headfoottransition') || ['slidedown','slideup'],
			//also accepts a string, like 'fade'. All animations work, but fade and slidedown/up look best
			overlayOnly: el.find('.ui-fullscreen').length
		},options);
			
		//add transition types	
		els.filter('.ui-header').addClass( $.isArray(o.transition) ? o.transition[0] : o.transition);
		els.filter('.ui-footer').addClass( $.isArray(o.transition) ? o.transition[1] : o.transition);
				
		//set placeholder heights, then bind custom events	
		els
			.each(function(){ 
				var placehold = $(this).parents('.ui-headfoot-placehold:eq(0)');
				if(o.overlayOnly){	
					placehold.height(0).addClass('ui-headfoot-overlayonly');
				}
				else{
					placehold.height($(this).parent().height());
				}
			})
			.bind('setTop',function(){
				var fromTop = $(window).scrollTop(),
					screenHeight = window.innerHeight,
					thisHeight = $(this).parent().height();
					return $(this).parent().css('top', ($(this).is('.ui-header')) ? fromTop : fromTop + screenHeight - thisHeight);
			});			
	});
};				



//single controller for all showing,hiding,toggling		
$.fixedToolbars = (function(){
	
		var currentstate = 'inline',
			showAfterScroll = false,
			delayTimer,
			ignoreTargets = 'a,input,textarea,select,button,label,.ui-headfoot-placehold';
	
		function allToolbars(){
			return $('.ui-header,.ui-footer');
		}
		
		//for determining whether a placeholder is visible on the screen or not	
		function placeHolderOutofView(thisel){
			//always return true if it's overlayOnly
			if(thisel.closest('.ui-headfoot-overlayonly').length){ return true; }
			
			var fromTop = $(window).scrollTop(),
				screenHeight = window.innerHeight,
				thisHeight = thisel.parent().parent().height(),
				thisTop = thisel.parent().parent().offset().top;
				
			return thisel.is('.ui-header') ? (thisTop + thisHeight <= fromTop) : (thisTop > fromTop + screenHeight);
		}	


	$(document)
		.bind('tap',function(e){
			if( !$(e.target).closest(ignoreTargets).length ){
				$.fixedToolbars.toggle();
			}
		})
		.bind('scrollstart',function(){
			if(currentstate == 'overlay'){
				showAfterScroll = true;
			}
			$.fixedToolbars.hide(true);
		})
		.bind('scrollstop',function(){
			if(showAfterScroll){
				$.fixedToolbars.show();
				showAfterScroll = false;
			}
		});


		//hide on resize?
		$(window).resize(function(){ $.fixedToolbars.hide(true); });


	return {
		show: function(){
			if(currentstate == 'overlay'){ return; }
			currentstate = 'overlay';
			var els = allToolbars();
			return els.each(function(){
				var el = $(this),
					overlayOnly = el.closest('.ui-headfoot-overlayonly').length;
				el.parent().addClass('ui-fixpos');
				//only animate if placeholder is out of view
				if( placeHolderOutofView(el) ){
					el.addClass('in').animationComplete(function(){
						el.removeClass('in');
					});
				}
				if(overlayOnly){	
					el.parent().parent().removeClass('ui-headfoot-hidden');
				}
				el.trigger('setTop');
			});	
		},
		hide: function(immediately){
			if(currentstate == 'inline'){ return; }
			currentstate = 'inline';
			var els = allToolbars();
			return els.each(function(){
				var el = $(this),
					overlayOnly = el.closest('.ui-headfoot-overlayonly').length;
				
				function addOverlayOnlyClass(){
					if(overlayOnly){	
						el.parent().parent().addClass('ui-headfoot-hidden');
					}
				}
				//if immediately flag is true, or the placeholder is in view, don't animate the hide
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