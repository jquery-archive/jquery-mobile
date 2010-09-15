/*!
 * jQuery Mobile
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( $, window, undefined ) {
	// if we're missing support for any of these, then we're a C-grade browser
	if ( !$.support.display || !$.support.position || !$.support.overflow || !$.support.floatclear ) {
		return;
	}	

	var $window = $(window),
		$html = $('html'),
		$head = $('head'),
		$body,
		$loader = $('<div class="ui-loader ui-body-c ui-corner-all fade in"><span class="ui-icon ui-icon-loading spin"></span><h1>loading.</h1></div>'),
		startPage,
		startPageId = 'ui-page-start',
		activePageClass = 'ui-page-active',
		transitions = 'slide slideup slidedown pop flip fade dissolve swap',
		transitionSpecified = false,
		currentTransition = 'slide',
		transitionDuration = 350,
		orientation,
		backBtnText = "Back",
		prevUrl = location.hash;
	
	/*
		add some core behavior,events
	*/	
	
	//test whether a CSS media type or query applies (adapted from work by Scott Jehl & Paul Irish: http://gist.github.com/557891)
	$.media = (function(){
		/*
		note: once support improves, try window.matchMedia here
		if ( window.matchMedia ){
			//use native support if available
			return window.matchMedia;
		}
		*/
		var cache = {},
	        testDiv = $('<div id="jq-mediatest"></div>'),
	        fakeBody = $('<body></body>').append(testDiv);
	    return function(q){
	      if (cache[q] === undefined) {
	        var styleBlock = $('<style type="text/css"></style>');
	        var cssrule = '@media '+q+' { #jq-mediatest { position: absolute; } }';
	        if (styleBlock[0].styleSheet){ 
	            styleBlock[0].styleSheet.cssText = cssrule;
	        } 
	        else {
	            styleBlock.text(cssrule);
	        }      
	        $html.prepend(fakeBody).prepend(styleBlock);
	        cache[q] = ((window.getComputedStyle ? window.getComputedStyle(testDiv[0],null) : testDiv[0].currentStyle)['position'] == 'absolute');
	        fakeBody.add(styleBlock).remove();
	      }
	      return cache[q];
	    };
	})();
	
	//hide Address bar
	function hideBrowserChrome(){
		$.event.special.scrollstart.enabled = false;
		window.scrollTo(0,0);
		setTimeout(function(){
			$.event.special.scrollstart.enabled = true;
		}, 150);
	}
	
	
	
	//add orientation class on flip/resize. This should probably use special events. Also, any drawbacks to just using resize?
	$window.bind( ($.support.orientation ? 'orientationchange' : 'resize'), updateOrientation);
	
	//orientation change classname logic - logic borrowed/modified from jQtouch
	function updateOrientation() {
        var neworientation = window.innerWidth < window.innerHeight ? 'portrait' : 'landscape';
        if(orientation !== neworientation){
        	$body.trigger('turn', {orientation: orientation}); //temp event name
        }
        orientation = neworientation;
        $html.removeClass('portrait landscape').addClass(orientation);
    }
	
	//add mobile, loading classes to doc
	$html.addClass('ui-mobile');
	
	//insert mobile meta (any other metas needed? webapp? iPhone icon? etc)
	$head.append('<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />');
	
	//send a link through hash tracking
	$.fn.ajaxClick = function(){
		var href = $(this).attr( "href" ),
			transitionAttr = $(this).attr('data-transition');
			
		if(transitionAttr){
			currentTransition = transitionAttr;
			transitionSpecified = true;
		}
		else{
			transitionSpecified = false;
		}
		prevUrl = location.hash.replace(/^#/,'');
		location.hash = href;
		//note: if it's a non-local-anchor and Ajax is not supported, go to page
		if(href.match(/^[^#]/) && !$.support.ajax){ 
			window.location = href;
		}
		else { 
			return false; 
		}
	};
	
	//ajaxify all navigable links
	$('a:not([href="#"])').live('click',function(e){
		if ($(this).is('[target=_blank]') || $(this).is('[rel=external]')){ return true; }
		$(this).ajaxClick();
		return false;
	});
	
	//turn on/off page loading message.. also hides the ui-content div
	function pageLoading(done){
		if(done){
			//remove loading msg
			$html.removeClass('ui-loading');
			//fade in page content, remove loading msg		
			$('.ui-page-active .ui-content')//.addClass('dissolve in');
		}
		else{
			$html.addClass('ui-loading');
			$loader.appendTo($body).addClass('dissolve in');
		}
	};
	
	//transition between pages - based on transitions from jQtouch
	function changePage(from,to,back){
		hideBrowserChrome();
		if(!back && !transitionSpecified){ currentTransition = 'slide'; }
		
		//kill keyboard (thx jQtouch :) )
		$(document.activeElement).blur();
		
		//animate in / out
		from.addClass(currentTransition + ' out ' + (back ? 'reverse':''));
		to.appendTo('body').addClass(activePageClass + ' ' + currentTransition + ' in ' + (back ? 'reverse':''));
		
		//callback - remove classes, etc
		to.animationComplete(function(){
			from.add(to).removeClass(' out in reverse '+ transitions);
			from.removeClass(activePageClass);
			pageLoading(true);	
			$.fixedToolbars.show();
			//$.fixedToolbars.hideAfterDelay();
		});
		if(back){ currentTransition = 'slide'; }
	};
	
	//potential (probably incomplete) fallback to workaround lack of animation callbacks. 
	//should this be extended into a full special event?
	// note: Expects CSS animations use transitionDuration (350ms)
	$.fn.animationComplete = function(callback){
		if($.support.WebKitAnimationEvent){
			return $(this).one('webkitAnimationEnd', callback); //check out transitionEnd (opera per Paul's request)
		}
		else{
			setTimeout(callback, transitionDuration);
		}
	};
	
	
		
	//markup-driven enhancements, to be called on any ui-page upon loading
	function mobilize($el){	
		//to-do: make sure this only runs one time on a page (or maybe per component)
		return $el.each(function(){		
			//checkboxes, radios
			$el.find('input[type=radio],input[type=checkbox]').customCheckboxRadio();
			//custom buttons
			$el.find('button, input[type=submit]').customButton();
			//custom text inputs
			$el.find('input[type=text],input[type=password],textarea').customTextInput();
			//collapsible groupings
			$el.find('[data-role="collapsible"]').collapsible();
			//single-field separators
			$el.find('.field').fieldcontain();
			//selects
			$el.find('select').customSelect();
			//fix toolbars
			$el.fixHeaderFooter();
			//buttons from links in headers,footers,bars, or with data-role
			$el.find('.ui-header a, .ui-footer a, .ui-bar a, [data-role="button"]').not('.ui-btn').buttonMarkup();
			//vertical controlgroups
			$el.find('[data-role="controlgroup"]:not([data-type="horizontal"])').controlgroup();
			//horizontal controlgroups
			$el.find('[data-role="controlgroup"][data-type="horizontal"]').controlgroup({direction: 'horizontal'});
			//listview from data role
			$el.find('[data-role="listview"]').listview();
			//links within content areas
			$el.find('.ui-body a:not(.ui-btn):not(.ui-link-inherit)').addClass('ui-link');
			//rewrite "home" links to mimic the back button (pre-js, these links are usually "home" links)	
			var backBtn = $el.find('.ui-header a.ui-back');
			if(!backBtn.length){
				backBtn = $('<a href="#" class="ui-back" data-icon="arrow-l"></a>').appendTo($el.find('.ui-header')).buttonMarkup();
			}
			backBtn
				.click(function(){
					history.go(-1);
					return false;
				})
				.find('.ui-btn-text').text(backBtnText);
		});
	};

	//dom-ready
	$(function(){
		//set the page loader up
		pageLoading();	
		
		//define body
		$body = $('body');
	
		//hashchange for page state tracking - needs to be bound at domready (for IE6)
		//When document.location.hash changes, find or load content, make it active
		$window.bind( "hashchange", function(e){
			var url = location.hash.replace(/^#/,''),
				back = (url === prevUrl);
			
			if(url){
				//see if content is present - NOTE: local urls aren't working right now - need logic to kill # 
				var localDiv = $('[id="'+url+'"]');
				if(localDiv.length){
					changePage($('.ui-page-active'), localDiv, back);
				}
				else { //ajax it in
					pageLoading();
					var newPage = $('<div class="ui-page" id="'+url+'"></div>')
						.appendTo($body)
						.load(url + ' .ui-page',function(){
						//dumping in HTML() from ui-page div - cleaner way?
						$(this).html( $(this).find('.ui-page:eq(0)').html() );	
						mobilize($(this));
						changePage($('.ui-page-active'), $(this), back);
					});
				}
			}
			else{ 
				//either...
				// we've backed up to the root page url, 
				// it's a plugin state
				//or it's the first page load with no hash present				
				var currentPage = $('.ui-page-active');
				if( currentPage.length && !startPage.is('.ui-page-active')){
					changePage(currentPage, startPage, back);
				}
				else{
					$.fixedToolbars.show();
					startPage.addClass(activePageClass);
					pageLoading(true);
					//$.fixedToolbars.hideAfterDelay();
				}
			}
		});	
		
		hideBrowserChrome();
		
		//global nav
		$('.ui-globalnav').globalnav();
	
		//mobilize all pages present
		mobilize($('.ui-page'));
		
		//set up active page - mobilize it!
		startPage = $('body > .ui-page:first');
		
		//make sure it has an ID - for finding it later
		if(!startPage.attr('id')){ 
			startPage.attr('id', startPageId); 
		}
		
		//trigger a new hashchange, hash or not
		$window.trigger( "hashchange" );
		
		//update orientation 
		updateOrientation();	
		
		//swipe right always triggers a back 
		$body.bind('swiperight.jqm',function(){
			history.go(-1);
			return false;
		});	
		
		//some debug stuff for the events pages
		$('body').bind('scrollstart scrollstop swipe swipeleft swiperight tap taphold turn',function(e){
			$('#eventlogger').prepend('<div>Event fired: '+ e.type +'</div>');
		});
	});
})( jQuery, this );
