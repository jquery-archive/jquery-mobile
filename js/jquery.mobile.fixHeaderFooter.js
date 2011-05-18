/*
* jQuery Mobile Framework : "fixHeaderFooter" plugin - on-demand positioning for headers,footers
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {
$.fn.fixHeaderFooter = function(options){
	if( !$.support.scrollTop ){ return this; }
	
	return this.each(function(){
		var $this = $(this);
		
		if( $this.jqmData('fullscreen') ){ $this.addClass('ui-page-fullscreen'); }
		$this.find( ".ui-header:jqmData(position='fixed')" ).addClass('ui-header-fixed ui-fixed-inline fade'); //should be slidedown
		$this.find( ".ui-footer:jqmData(position='fixed')" ).addClass('ui-footer-fixed ui-fixed-inline fade'); //should be slideup		
	});
};

//single controller for all showing,hiding,toggling		
$.fixedToolbars = (function(){
	if( !$.support.scrollTop ){ return; }
	var currentstate = 'inline',
		autoHideMode = false,
		showDelay = 100,
		delayTimer,
		ignoreTargets = 'a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed',
		toolbarSelector = '.ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last',
		stickyFooter, //for storing quick references to duplicate footers
		supportTouch = $.support.touch,
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		stateBefore = null,
		scrollTriggered = false,
        touchToggleEnabled = true;

	function showEventCallback(event)
	{
		// An event that affects the dimensions of the visual viewport has
		// been triggered. If the header and/or footer for the current page are in overlay
		// mode, we want to hide them, and then fire off a timer to show them at a later
		// point. Events like a resize can be triggered continuously during a scroll, on
		// some platforms, so the timer is used to delay the actual positioning until the
		// flood of events have subsided.
		//
		// If we are in autoHideMode, we don't do anything because we know the scroll
		// callbacks for the plugin will fire off a show when the scrolling has stopped.
		if (!autoHideMode && currentstate == 'overlay') {
			if (!delayTimer)
				$.fixedToolbars.hide(true);
			$.fixedToolbars.startShowTimer();
		}
	}

	$(function() {
		$(document)
			.bind( "vmousedown",function(event){
				if( touchToggleEnabled ) {
					stateBefore = currentstate;
				}
			})
			.bind( "vclick",function(event){
				if( touchToggleEnabled ) {
					if( $(event.target).closest(ignoreTargets).length ){ return; }
					if( !scrollTriggered ){
						$.fixedToolbars.toggle(stateBefore);
						stateBefore = null;
					}
				}
			})
			.bind('scrollstart',function(event){
				scrollTriggered = true;
				if(stateBefore == null){ stateBefore = currentstate; }

				// We only enter autoHideMode if the headers/footers are in
				// an overlay state or the show timer was started. If the
				// show timer is set, clear it so the headers/footers don't
				// show up until after we're done scrolling.
				var isOverlayState = stateBefore == 'overlay';
				autoHideMode = isOverlayState || !!delayTimer;
				if (autoHideMode){
					$.fixedToolbars.clearShowTimer();
					if (isOverlayState) {
						$.fixedToolbars.hide(true);
					}
				}
			})
			.bind('scrollstop',function(event){
				if( $(event.target).closest(ignoreTargets).length ){ return; }
				scrollTriggered = false;
				if (autoHideMode) {
					autoHideMode = false;
					$.fixedToolbars.startShowTimer();
				}
				stateBefore = null;
			})
			.bind('silentscroll', showEventCallback);

			$(window).bind('resize', showEventCallback);
	});
		
	//before page is shown, check for duplicate footer
	$('.ui-page').live('pagebeforeshow', function(event, ui){
		var page = $(event.target),
			footer = page.find( ":jqmData(role='footer')" ),
			id = footer.data('id'),
			prevPage = ui.prevPage,
			prevFooter = prevPage && prevPage.find( ":jqmData(role='footer')" ),
			prevFooterMatches = prevFooter.length && prevFooter.jqmData( "id" ) === id;
		
		if( id && prevFooterMatches ){
			stickyFooter = footer;
			setTop( stickyFooter.removeClass( "fade in out" ).appendTo( $.mobile.pageContainer ) );
		}
	});

	//after page is shown, append footer to new page
	$('.ui-page').live('pageshow', function(event, ui){
		var $this = $(this);
		
		if( stickyFooter && stickyFooter.length ){	
			
			setTimeout(function(){
				setTop( stickyFooter.appendTo( $this ).addClass("fade") );
				stickyFooter = null;
			}, 500);	
		}
		
		$.fixedToolbars.show(true, this);	
	});
    
    //When a collapsiable is hidden or shown we need to trigger the fixed toolbar to reposition itself (#1635)
	$( ".ui-collapsible-contain" ).live( "collapse expand", showEventCallback );

	// element.getBoundingClientRect() is broken in iOS 3.2.1 on the iPad. The
	// coordinates inside of the rect it returns don't have the page scroll position
	// factored out of it like the other platforms do. To get around this,
	// we'll just calculate the top offset the old fashioned way until core has
	// a chance to figure out how to handle this situation.
	//
	// TODO: We'll need to get rid of getOffsetTop() once a fix gets folded into core.

	function getOffsetTop(ele)
	{
		var top = 0;
		if (ele)
		{
			var op = ele.offsetParent, body = document.body;
			top = ele.offsetTop;
			while (ele && ele != body)
			{
				top += ele.scrollTop || 0;
				if (ele == op)
				{
					top += op.offsetTop;
					op = ele.offsetParent;
				}
				ele = ele.parentNode;
			}
		}
		return top;
	}

	function setTop(el){
		var fromTop = $(window).scrollTop(),
			thisTop = getOffsetTop(el[0]), // el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
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
			//relval = -1 * (thisTop - (fromTop + screenHeight) + thisCSStop + thisHeight);
			//if( relval > thisTop ){ relval = 0; }
			relval = fromTop + screenHeight - thisHeight - (thisTop - thisCSStop);
			return el.css('top', ( useRelative ) ? relval : fromTop + screenHeight - thisHeight );
		}
	}

	//exposed methods
	return {
		show: function(immediately, page){
			$.fixedToolbars.clearShowTimer();
			currentstate = 'overlay';
			var $ap = page ? $(page) : ($.mobile.activePage ? $.mobile.activePage : $(".ui-page-active"));
			return $ap.children( toolbarSelector ).each(function(){
				var el = $(this),
					fromTop = $(window).scrollTop(),
					thisTop = getOffsetTop(el[0]), // el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
					screenHeight = window.innerHeight,
					thisHeight = el.outerHeight(),
					alreadyVisible = (el.is('.ui-header-fixed') && fromTop <= thisTop + thisHeight) || (el.is('.ui-footer-fixed') && thisTop <= fromTop + screenHeight);	
				
				//add state class
				el.addClass('ui-fixed-overlay').removeClass('ui-fixed-inline');	
					
				if( !alreadyVisible && !immediately ){
					el.animationComplete(function(){
						el.removeClass('in');
					}).addClass('in');
				}
				setTop(el);
			});	
		},
		hide: function(immediately){
			currentstate = 'inline';
			var $ap = $.mobile.activePage ? $.mobile.activePage : $(".ui-page-active");
			return $ap.children( toolbarSelector ).each(function(){
				var el = $(this);

				var thisCSStop = el.css('top'); thisCSStop = thisCSStop == 'auto' ? 0 : parseFloat(thisCSStop);
				
				//add state class
				el.addClass('ui-fixed-inline').removeClass('ui-fixed-overlay');
				
				if (thisCSStop < 0 || (el.is('.ui-header-fixed') && thisCSStop != 0))
				{
					if(immediately){
						el.css('top',0);
					}
					else{
						if( el.css('top') !== 'auto' && parseFloat(el.css('top')) !== 0 ){
							var classes = 'out reverse';
							el.animationComplete(function(){
								el.removeClass(classes);
								el.css('top',0);
							}).addClass(classes);	
						}
					}
				}
			});
		},
		startShowTimer: function(){
			$.fixedToolbars.clearShowTimer();
			var args = $.makeArray(arguments);
			delayTimer = setTimeout(function(){
				delayTimer = undefined;
				$.fixedToolbars.show.apply(null, args);
			}, showDelay);
		},
		clearShowTimer: function() {
			if (delayTimer) {
				clearTimeout(delayTimer);
			}
			delayTimer = undefined;
		},
		toggle: function(from){
			if(from){ currentstate = from; }
			return (currentstate == 'overlay') ? $.fixedToolbars.hide() : $.fixedToolbars.show();
		},
        setTouchToggleEnabled: function(enabled) {
            touchToggleEnabled = enabled;
        }
	};
})();

})(jQuery);
