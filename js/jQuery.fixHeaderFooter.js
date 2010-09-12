/*
* jQuery Mobile Framework : prototype for "fixHeaderFooter" plugin - on-demand positioning for headers,footers
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.fixHeaderFooter = function(options){
	return $(this).each(function(){
		if($(this).data('fixedapplied')){ return; }
		var el = $uipage = $(this).data('fixedapplied',true);		
		var o = $.extend({
			ignoreTargets: 'a,input,textarea,select,button,label,.ui-headfoot-placehold',
			transition: el.find('[data-headfoottransition]').attr('data-headfoottransition') || ['slidedown','slideup'],
			//also accepts a string, like 'fade'. All animations work, but fade and slidedown/up look best
			overlayOnly: el.find('.ui-fullscreen').length
		},options);

		var els = el.find('.ui-header,.ui-footer').wrap('<div class="ui-headfoot-placehold"><div class="ui-headfoot-wrap"></div></div>'),
			tIsArray = $.isArray(o.transition),
			currentstate = 'inline';
			
		//add transition types	
		els.filter('.ui-header').addClass(tIsArray ? o.transition[0] : o.transition);
		els.filter('.ui-footer').addClass(tIsArray ? o.transition[1] : o.transition);
	
		//for determining whether a placeholder is visible on the screen or not	
		function placeHolderOutofView(thisel){
			//always return true if it's overlayOnly
			if(o.overlayOnly){ return true; }
			
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
			.bind('click tap mousedown',function(e){
				e.stopImmediatePropagation();
				return false;
			});	
			
		$uipage
			.bind('overlayIn',function(){
			console.log('out')
				currentstate = 'overlay';
				return els.each(function(){
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
					el.trigger('setTop');
				});	
			})
			.bind('overlayOut',function(e,immediately){
			console.log('in')
				currentstate = 'inline';
				return els.each(function(){
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
				});
			})
			.bind('overlayToggle',function(){
				return (currentstate == 'overlay') ? $(this).trigger('overlayOut') : $(this).trigger('overlayIn');
			});		
			
			
		
		$uipage
			.bind('tap',function(e){
				if( !$(e.target).closest(o.ignoreTargets).length ){
					$(this).trigger('overlayToggle');
				}
			})
			.bind('scrollstart',function(){
				if(currentstate == 'overlay'){
					$uipage.data('visiblebeforescroll', true);
				}
				$uipage.trigger('overlayOut',[true]);
				return false;
			})
			.bind('scrollstop',function(){
				if($uipage.data('visiblebeforescroll')){
					$uipage.removeData('visiblebeforescroll').trigger('overlayIn');
				}
				return false;
			});
			

		$('body').scrollstart(function(){
			$uipage.trigger('scrollstart');
		})
		.scrollstop(function(){
			$uipage.trigger('scrollstop');
		});	

					
		$(window)
			.bind('load',function(){
				$uipage.trigger('overlayIn');
					
				if(o.overlayOnly){	
					//to-do...for a photo-viewer or something full-screen 
					els.parents('.ui-headfoot-placehold:eq(0)').addClass('ui-headfoot-overlayonly');
				}
			})
			.resize(function(){ $uipage.trigger('overlayOut',[true]); });
	});			
};
})(jQuery);