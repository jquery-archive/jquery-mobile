/*!
 * jQuery Mobile v@VERSION
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( $, window, undefined ) {
	
	//jQuery.mobile configurable options
	$.extend( $.mobile, {
		
		//define the url parameter used for referencing widget-generated sub-pages. 
		//Translates to to example.html&ui-page=subpageIdentifier
		//hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: 'ui-page',
		
		//anchor links with a data-rel, or pages with a data-role, that match these selectors will be untrackable in history 
		//(no change in URL, not bookmarkable)
		nonHistorySelectors: 'dialog',
		
		//class assigned to page currently in view, and during transitions
		activePageClass: 'ui-page-active',
		
		//class used for "active" button state, from CSS framework
		activeBtnClass: 'ui-btn-active',
		
		//automatically handle link clicks through Ajax, when possible
		ajaxLinksEnabled: true,
		
		//automatically handle form submissions through Ajax, when possible
		ajaxFormsEnabled: true,
		
		//available CSS transitions
		transitions: ['slide', 'slideup', 'slidedown', 'pop', 'flip', 'fade'],
		
		//set default transition - 'none' for no transitions
		defaultTransition: 'slide',
		
		//show loading message during Ajax requests
		//if false, message will not appear, but loading classes will still be toggled on html el
		loadingMessage: "loading",
		
		//configure meta viewport tag's content attr:
		metaViewportContent: "width=device-width, minimum-scale=1, maximum-scale=1",
		
		//support conditions that must be met in order to proceed
		gradeA: function(){
			return $.support.mediaquery;
		}
	});
	
	//trigger mobileinit event - useful hook for configuring $.mobile settings before they're used
	$( window.document ).trigger('mobileinit');
	
	//if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	//otherwise, proceed with the enhancements
	if ( !$.mobile.gradeA() ) {
		return;
	}	

	//define vars for interal use
	var $window = $(window),
		$html = $('html'),
		$head = $('head'),
		
		//to be populated at DOM ready
		$body,
		
		//loading div which appears during Ajax requests
		//will not appear if $.mobile.loadingMessage is false
		$loader = $.mobile.loadingMessage ? 
			$('<div class="ui-loader ui-body-a ui-corner-all">'+
						'<span class="ui-icon ui-icon-loading spin"></span>'+
						'<h1>'+ $.mobile.loadingMessage +'</h1>'+
					'</div>')
			: undefined,
			
		//define meta viewport tag, if content is defined	
		$metaViewport = $.mobile.metaViewportContent ? $("<meta>", { name: "viewport", content: $.mobile.metaViewportContent}).prependTo( $head ) : undefined,
		
		//define baseUrl for use in relative url management
		baseUrl = getPathDir( location.protocol + '//' + location.host + location.pathname ),
		
		//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
		$base = $.support.dynamicBaseTag ? $("<base>", { href: baseUrl }).prependTo( $head ) : undefined,
		
		//will be defined as first page element in DOM
		$startPage,
		
		//will be defined as $startPage.parent(), which is usually the body element
		//will receive ui-mobile-viewport class
		$pageContainer,
		
		//will be defined when a link is clicked and given an active class
		$activeClickedLink = null,
		
		//array of pages that are visited during a single page load
		//length will grow as pages are visited, and shrink as "back" link/button is clicked
		//each item has a url (string matches ID), and transition (saved for reuse when "back" link/button is clicked)
		urlStack = [ {
			url: location.hash.replace( /^#/, "" ),
			transition: undefined
		} ],
		
		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",
		
		//contains role for next page, if defined on clicked link via data-rel
		nextPageRole = null,
		
		//enable/disable hashchange event listener
		//toggled internally when location.hash is updated to match the url of a successful page load
		hashListener = true,
		
		//media-query-like width breakpoints, which are translated to classes on the html element 
		resolutionBreakpoints = [320,480,768,1024];
	
	//add mobile, initial load "rendering" classes to docEl
	$html.addClass('ui-mobile ui-mobile-rendering');	

	// TODO: don't expose (temporary during code reorg)
	$.mobile.urlStack = urlStack;
	
	//consistent string escaping for urls and IDs
	function idStringEscape(str){
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	}
	
	$.mobile.idStringEscape = idStringEscape;
	
	// hide address bar
	function silentScroll( ypos ) {
		// prevent scrollstart and scrollstop events
		$.event.special.scrollstart.enabled = false;
		setTimeout(function() {
			window.scrollTo( 0, ypos || 0 );
		},20);	
		setTimeout(function() {
			$.event.special.scrollstart.enabled = true;
		}, 150 );
	}
	
	function getPathDir( path ){
		var newPath = path.replace(/#/,'').split('/');
		newPath.pop();
		return newPath.join('/') + (newPath.length ? '/' : '');
	}
	
	function getBaseURL( nonHashPath ){
		return getPathDir( nonHashPath || location.hash );
	}
	
	var setBaseURL = !$.support.dynamicBaseTag ? $.noop : function( nonHashPath ){
		//set base url for new page assets
		$base.attr('href', baseUrl + getBaseURL( nonHashPath ));
	}
	
	var resetBaseURL = !$.support.dynamicBaseTag ? $.noop : function(){
		$base.attr('href', baseUrl);
	}
	
	//set base href to pathname
    resetBaseURL(); 
	
	//for form submission
	$('form').live('submit', function(event){
		if( !$.mobile.ajaxFormsEnabled ){ return; }
		
		var type = $(this).attr("method"),
			url = $(this).attr( "action" ).replace( location.protocol + "//" + location.host, "");	
		
		//external submits use regular HTTP
		if( /^(:?\w+:)/.test( url ) ){
			return;
		}	
		
		//if it's a relative href, prefix href with base url
		if( url.indexOf('/') && url.indexOf('#') !== 0 ){
			url = getBaseURL() + url;
		}
			
		changePage({
				url: url,
				type: type,
				data: $(this).serialize()
			},
			undefined,
			undefined,
			true
		);
		event.preventDefault();
	});	
	
	//click routing - direct to HTTP or Ajax, accordingly
	$( "a" ).live( "click", function(event) {
		var $this = $(this),
			//get href, remove same-domain protocol and host
			href = $this.attr( "href" ).replace( location.protocol + "//" + location.host, ""),
			//if target attr is specified, it's external, and we mimic _blank... for now
			target = $this.is( "[target]" ),
			//if it still starts with a protocol, it's external, or could be :mailto, etc
			external = target || /^(:?\w+:)/.test( href ) || $this.is( "[rel=external]" ),
			target = $this.is( "[target]" );

		if( href === '#' ){
			//for links created purely for interaction - ignore
			return false;
		}
		
		$activeClickedLink = $this.closest( ".ui-btn" ).addClass( $.mobile.activeBtnClass );
		
		if( external || !$.mobile.ajaxLinksEnabled ){
			//remove active link class if external
			removeActiveLinkClass(true);
			
			//deliberately redirect, in case click was triggered
			if( target ){
				window.open(href);
			}
			else{
				location.href = href;
			}
		}
		else {	
			//use ajax
			var transition = $this.data( "transition" ),
				back = $this.data( "back" ),
				changeHashOnSuccess = !$this.is( "[data-rel="+ $.mobile.nonHistorySelectors +"]" );
				
			nextPageRole = $this.attr( "data-rel" );	
	
			//if it's a relative href, prefix href with base url
			if( href.indexOf('/') && href.indexOf('#') !== 0 ){
				href = getBaseURL() + href;
			}
			
			href.replace(/^#/,'');
			
			changePage(href, transition, back, changeHashOnSuccess);			
		}
		event.preventDefault();
	});
	
	// turn on/off page loading message.
	function pageLoading( done ) {
		if ( done ) {
			$html.removeClass( "ui-loading" );
		} else {
		
			if( $.mobile.loadingMessage ){
				$loader.appendTo($pageContainer).css({top: $(window).scrollTop() + 75});
			}	
			$html.addClass( "ui-loading" );
		}
	};
	
	//for directing focus to the page title, or otherwise first focusable element
	function reFocus(page){
		var pageTitle = page.find( ".ui-title:eq(0)" );
		if( pageTitle.length ){
			pageTitle.focus();
		}
		else{
			page.find( focusable ).eq(0).focus();
		}
	}
	
	//function for setting role of next page
	function setPageRole( newPage ) {
		if ( nextPageRole ) {
			newPage.attr( "data-role", nextPageRole );
			nextPageRole = undefined;
		}
	}
	
	//update hash, with or without triggering hashchange event
	$.mobile.updateHash = function(url, disableListening){
		if(disableListening) { hashListener = false; }
		location.hash = url;
	}

	//wrap page and transfer data-attrs if it has an ID
	function wrapNewPage( newPage ){
		var copyAttrs = ['data-role', 'data-theme', 'data-fullscreen'], //TODO: more page-level attrs?
			wrapper = newPage.wrap( "<div>" ).parent();
			
		$.each(copyAttrs,function(i){
			if( newPage.attr( copyAttrs[ i ] ) ){
				wrapper.attr( copyAttrs[ i ], newPage.attr( copyAttrs[ i ] ) );
				newPage.removeAttr( copyAttrs[ i ] );
			}
		});
		return wrapper;
	}
	
	//remove active classes after page transition or error
	function removeActiveLinkClass(forceRemoval){
		if( !!$activeClickedLink && (!$activeClickedLink.closest( '.ui-page-active' ).length || forceRemoval )){
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}


	//for getting or creating a new page 
	function changePage( to, transition, back, changeHash){

		//from is always the currently viewed page
		var toIsArray = $.type(to) === "array",
			from = toIsArray ? to[0] : $.mobile.activePage,
			to = toIsArray ? to[1] : to,
			url = fileUrl = $.type(to) === "string" ? to.replace( /^#/, "" ) : null,
			data = undefined,
			type = 'get',
			isFormRequest = false,
			duplicateCachedPage = null,
			back = (back !== undefined) ? back : ( urlStack.length > 1 && urlStack[ urlStack.length - 2 ].url === url ),
			transition = (transition !== undefined) ? transition : $.mobile.defaultTransition;
		
		if( $.type(to) === "object" && to.url ){
			url = to.url,
			data = to.data,
			type = to.type,
			isFormRequest = true;
			//make get requests bookmarkable
			if( data && type == 'get' ){
				url += "?" + data;
				data = undefined;
			}
		}
			
		//reset base to pathname for new request
		resetBaseURL();
			
		// if the new href is the same as the previous one
		if ( back ) {
			transition = urlStack.pop().transition;
		} else {
			urlStack.push({ url: url, transition: transition });
		}
		
		//function for transitioning between two existing pages
		function transitionPages() {
				
			//kill the keyboard
			$( window.document.activeElement ).blur();
			
			//get current scroll distance
			var currScroll = $window.scrollTop();
			
			//set as data for returning to that spot
			from.data('lastScroll', currScroll);
			
			//trigger before show/hide events
			from.data("page")._trigger("beforehide", {nextPage: to});
			to.data("page")._trigger("beforeshow", {prevPage: from});
			
			function loadComplete(){
				pageLoading( true );
				//trigger show/hide events, allow preventing focus change through return false		
				if( from.data("page")._trigger("hide", null, {nextPage: to}) !== false && to.data("page")._trigger("show", null, {prevPage: from}) !== false ){
					$.mobile.activePage = to;
				}
				reFocus( to );
				if( changeHash && url ){
					$.mobile.updateHash(url, true);
				}
				removeActiveLinkClass();
				
				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if( duplicateCachedPage != null ){
					duplicateCachedPage.remove();
				}
				
				//jump to top or prev scroll, if set
				silentScroll( to.data( 'lastScroll' ) );
			}
			
			if(transition && (transition !== 'none')){	
				$pageContainer.addClass('ui-mobile-viewport-transitioning');
				// animate in / out
				from.addClass( transition + " out " + ( back ? "reverse" : "" ) );
				to.addClass( $.mobile.activePageClass + " " + transition +
					" in " + ( back ? "reverse" : "" ) );
				
				// callback - remove classes, etc
				to.animationComplete(function() {
					from.add( to ).removeClass(" out in reverse " + $.mobile.transitions.join(' ') );
					from.removeClass( $.mobile.activePageClass );
					loadComplete();
					$pageContainer.removeClass('ui-mobile-viewport-transitioning');
				});
			}
			else{
				from.removeClass( $.mobile.activePageClass );
				to.addClass( $.mobile.activePageClass );
				loadComplete();
			}
		};
		
		//shared page enhancements
		function enhancePage(){
			setPageRole( to );
			to.page();
		}
		
		//get the actual file in a jq-mobile nested url
		function getFileURL( url ){
			return url.match( '&' + $.mobile.subPageUrlKey ) ? url.split( '&' + $.mobile.subPageUrlKey )[0] : url;
		}

		//if url is a string
		if( url ){
			to = $( "[id='" + url + "']" ),
			fileUrl = getFileURL(url);
		}
		else{ //find base url of element, if avail
			var toID = to.attr('id'),
				toIDfileurl = getFileURL(toID);
				
			if(toID != toIDfileurl){
				fileUrl = toIDfileurl;
			}	
		}
		
		// find the "to" page, either locally existing in the dom or by creating it through ajax
		if ( to.length && !isFormRequest ) {
			if( fileUrl ){
				setBaseURL(fileUrl);
			}	
			enhancePage();
			transitionPages();
		} else { 
		
			//if to exists in DOM, save a reference to it in duplicateCachedPage for removal after page change
			if( to.length ){
				duplicateCachedPage = to;
			}
			
			pageLoading();

			$.ajax({
				url: fileUrl,
				type: type,
				data: data,
				success: function( html ) {
					setBaseURL(fileUrl);
					var all = $("<div></div>");
					//workaround to allow scripts to execute when included in page divs
					all.get(0).innerHTML = html;
					to = all.find('[data-role="page"]');
					
					//rewrite src and href attrs to use a base url
					if( !$.support.dynamicBaseTag ){
						var baseUrl = getBaseURL(fileUrl);
						to.find('[src],link[href]').each(function(){
							var thisAttr = $(this).is('[href]') ? 'href' : 'src',
								thisUrl = $(this).attr(thisAttr);
							
							//if full path exists and is same, chop it - helps IE out
							thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );
								
							if( !/^(\w+:|#|\/)/.test(thisUrl) ){
								$(this).attr(thisAttr, baseUrl + thisUrl);
							}
						});
					}
					
					//preserve ID on a retrieved page
					if ( to.attr('id') ) {
						to = wrapNewPage( to );
					}

					to
						.attr( "id", fileUrl )
						.appendTo( $pageContainer );
						
					enhancePage();
					transitionPages();
				},
				error: function() {
					pageLoading( true );
					removeActiveLinkClass(true);
					$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>Error Loading Page</h1></div>")
						.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
						.appendTo( $pageContainer )
						.delay( 800 )
						.fadeOut( 400, function(){
							$(this).remove();
						});
				}
			});
		}

	};

	
	$(function() {

		$body = $( "body" );
		pageLoading();
		
		// needs to be bound at domready (for IE6)
		// find or load content, make it active
		$window.bind( "hashchange", function(e, triggered) {
			if( !hashListener ){ 
				hashListener = true;
				return; 
			} 
			
			if( $(".ui-page-active").is("[data-role=" + $.mobile.nonHistorySelectors + "]") ){
				return;
			}
			
			var to = location.hash,
				transition = triggered ? false : undefined;
				
			// either we've backed up to the root page url
			// or it's the first page load with no hash present
			//there's a hash and it wasn't manually triggered
			// > probably a new page, "back" will be figured out by changePage
			if ( to ){
				changePage( to, transition);
			}
			//there's no hash, the active page is not the start page, and it's not manually triggered hashchange
			// > probably backed out to the first page visited
			else if( $.mobile.activePage.length && $startPage[0] !== $.mobile.activePage[0] && !triggered ) {
				changePage( $startPage, transition, true );
			}
			else{
				$startPage.trigger("pagebeforeshow", {prevPage: $('')});
				$startPage.addClass( $.mobile.activePageClass );
				pageLoading( true );
				
				if( $startPage.trigger("pageshow", {prevPage: $('')}) !== false ){
					reFocus($startPage);
				}
			}

		});
	});	
	
	//add orientation class on flip/resize.
	$window.bind( "orientationchange.htmlclass", function( event ) {
		$html.removeClass( "portrait landscape" ).addClass( event.orientation );
	});
	
	//add breakpoint classes for faux media-q support
	function detectResolutionBreakpoints(){
		var currWidth = $window.width(),
			minPrefix = "min-width-",
			maxPrefix = "max-width-",
			minBreakpoints = [],
			maxBreakpoints = [],
			unit = "px",
			breakpointClasses;
			
		$html.removeClass( minPrefix + resolutionBreakpoints.join(unit + " " + minPrefix) + unit + " " + 
			maxPrefix + resolutionBreakpoints.join( unit + " " + maxPrefix) + unit );
					
		$.each(resolutionBreakpoints,function( i ){
			if( currWidth >= resolutionBreakpoints[ i ] ){
				minBreakpoints.push( minPrefix + resolutionBreakpoints[ i ] + unit );
			}
			if( currWidth <= resolutionBreakpoints[ i ] ){
				maxBreakpoints.push( maxPrefix + resolutionBreakpoints[ i ] + unit );
			}
		});
		
		if( minBreakpoints.length ){ breakpointClasses = minBreakpoints.join(" "); }
		if( maxBreakpoints.length ){ breakpointClasses += " " +  maxBreakpoints.join(" "); }
		
		$html.addClass( breakpointClasses );	
	};
	
	//add breakpoints now and on oc/resize events
	$window.bind( "orientationchange resize", detectResolutionBreakpoints);
	detectResolutionBreakpoints();
	
	//common breakpoints, overrideable, changeable
	$.mobile.addResolutionBreakpoints = function( newbps ){
		if( $.type( newbps ) === "array" ){
			resolutionBreakpoints = resolutionBreakpoints.concat( newbps );
		}
		else {
			resolutionBreakpoints.push( newbps );
		}
		detectResolutionBreakpoints();
	} 
	
	//animation complete callback
	//TODO - update support test and create special event for transitions
	//check out transitionEnd (opera per Paul's request)
	$.fn.animationComplete = function(callback){
		if($.support.cssTransitions){
			return $(this).one('webkitAnimationEnd', callback);
		}
		else{
			callback();
		}
	};	
	
	//TODO - add to jQuery.mobile, not $
	$.extend($.mobile, {
		pageLoading: pageLoading,
		changePage: changePage,
		silentScroll: silentScroll
	});

	//dom-ready
	$(function(){
		var $pages = $("[data-role='page']");
		//set up active page
		$startPage = $.mobile.activePage = $pages.first();
		
		//set page container
		$pageContainer = $startPage.parent().addClass('ui-mobile-viewport');
		
		$.extend({
			pageContainer: $pageContainer
		});
		
		//initialize all pages present
		$pages.page();
		
		//trigger a new hashchange, hash or not
		$window.trigger( "hashchange", [ true ] );
		
		//update orientation 
		$window.trigger( "orientationchange.htmlclass" );
		
		//remove rendering class
		$html.removeClass('ui-mobile-rendering');
	});
	
	$window.load(silentScroll);	
	
})( jQuery, this );
