/*
* jQuery Mobile Framework : "fixHeaderFooter" plugin - on-demand positioning for headers,footers
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.fixHeaderFooter = function(options){
	if( !$.support.scrollTop ){ return $(this); }
	return $(this).each(function(){
		if( $(this).data('fullscreen') ){ $(this).addClass('ui-page-fullscreen'); }
		$(this).find('.ui-header[data-position="fixed"]').addClass('ui-header-fixed ui-fixed-inline fade'); //should be slidedown
		$(this).find('.ui-footer[data-position="fixed"]').addClass('ui-footer-fixed ui-fixed-inline fade'); //should be slideup		
	});
};				

//single controller for all showing,hiding,toggling		
$.fixedToolbars = (function(){
	if( !$.support.scrollTop ){ return; }
	var currentstate = 'inline',
		delayTimer,
		ignoreTargets = 'a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed',
		toolbarSelector = '.ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last',
		stickyFooter, //for storing quick references to duplicate footers
		supportTouch = $.support.touch,
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		stateBefore = null,
		scrollTriggered = false;
		
	$(function() {
		$(document)
			.bind(touchStartEvent,function(event){
				if( $(event.target).closest(ignoreTargets).length ){ return; }
				stateBefore = currentstate;
				$.fixedToolbars.hide(true);
			})
			.bind('scrollstart',function(event){
				if( $(event.target).closest(ignoreTargets).length ){ return; } //because it could be a touchmove...
				scrollTriggered = true;
				if(stateBefore == null){ stateBefore = currentstate; }
				$.fixedToolbars.hide(true);
			})
			.bind(touchStopEvent,function(event){
				if( $(event.target).closest(ignoreTargets).length ){ return; }
				if( !scrollTriggered ){
					$.fixedToolbars.toggle(stateBefore);
					stateBefore = null;
				}
			})
			.bind('scrollstop',function(event){
				if( $(event.target).closest(ignoreTargets).length ){ return; }
				scrollTriggered = false;
				$.fixedToolbars.toggle( stateBefore == 'overlay' ? 'inline' : 'overlay' );
				stateBefore = null;
			});
		
		//function to return another footer already in the dom with the same data-id
		function findStickyFooter(el){
			var thisFooter = el.find('[data-role="footer"]');
			return jQuery( '.ui-footer[data-id="'+ thisFooter.data('id') +'"]:not(.ui-footer-duplicate)' ).not(thisFooter);
		}
		
		//before page is shown, check for duplicate footer
		$('.ui-page').live('pagebeforeshow', function(event, ui){
			stickyFooter = findStickyFooter( $(event.target) );
			if( stickyFooter.length ){
				//if the existing footer is the first of its kind, create a placeholder before stealing it 
				if( stickyFooter.parents('.ui-page:eq(0)').find('.ui-footer[data-id="'+ stickyFooter.data('id') +'"]').length == 1 ){
					stickyFooter.before( stickyFooter.clone().addClass('ui-footer-duplicate') );
				}
				$(event.target).find('[data-role="footer"]').addClass('ui-footer-duplicate');
				stickyFooter.appendTo($.pageContainer).css('top',0);
				setTop(stickyFooter);
			}
		});

		//after page is shown, append footer to new page
		$('.ui-page').live('pageshow', function(event, ui){
			if( stickyFooter && stickyFooter.length ){
				stickyFooter.appendTo(event.target).css('top',0);
			}
			$.fixedToolbars.show(true);
		});
		
	});
	
	function setTop(el){
		var fromTop = $(window).scrollTop(),
			thisTop = el.offset().top,
			thisCSStop = el.css('top') == 'auto' ? 0 : parseFloat(el.css('top')),
			screenHeight = window.innerHeight,
			thisHeight = el.outerHeight(),
			useRelative = el.parents('.ui-page:not(.ui-page-fullscreen)').length,
			relval;
		if( el.is('.ui-header-fixed') ){
			relval = fromTop - thisTop + thisCSStop;
			if( relval < thisTop){ relval = 0; }
			return el.css('top', ( useRelative ) ? relval : fromTop);
		}
		else{
			relval = -1 * (thisTop - (fromTop + screenHeight) + thisCSStop + thisHeight);
			if( relval > thisTop ){ relval = 0; }
			return el.css('top', ( useRelative ) ? relval : fromTop + screenHeight - thisHeight );
		}
	}

	//exposed methods
	return {
		show: function(immediately){
			currentstate = 'overlay';
			var $ap = $.activePage ? $.activePage : $(".ui-page-active");
			return $ap.children( toolbarSelector ).each(function(){
				var el = $(this),
					fromTop = $(window).scrollTop(),
					thisTop = el.offset().top,
					screenHeight = window.innerHeight,
					thisHeight = el.outerHeight(),
					alreadyVisible = (el.is('.ui-header-fixed') && fromTop <= thisTop + thisHeight) || (el.is('.ui-footer-fixed') && thisTop <= fromTop + screenHeight);	
				
				//add state class
				el.addClass('ui-fixed-overlay').removeClass('ui-fixed-inline');	
					
				if( !alreadyVisible && !immediately ){
					el.addClass('in').animationComplete(function(){
						el.removeClass('in');
					});
				}
				setTop(el);
			});	
		},
		hide: function(immediately){
			currentstate = 'inline';
			var $ap = $.activePage ? $.activePage : $(".ui-page-active");
			return $ap.children( toolbarSelector ).each(function(){
				var el = $(this);
				
				//add state class
				el.addClass('ui-fixed-inline').removeClass('ui-fixed-overlay');
				
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
		toggle: function(from){
			if(from){ currentstate = from; }
			return (currentstate == 'overlay') ? $.fixedToolbars.hide() : $.fixedToolbars.show();
		}
	};
})();

})(jQuery);