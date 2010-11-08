/*!
 * jQuery Mobile
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( $, window, undefined ) {
	
	//jQuery.mobile obj extendable options
	jQuery.mobile = jQuery.extend({
		
		//define the url parameter used for referencing widget-generated sub-pages. 
		//Translates to to example.html&ui-page=subpageIdentifier
		//hash segment before &ui-page= is used to make Ajax request
		subPageUrlKey: 'ui-page',
		
		//anchor links that match these selectors will be untrackable in history 
		//(no change in URL, not bookmarkable)
		nonHistorySelectors: '[data-rel=dialog]',
		
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
		
		//set default transition
		defaultTransition: 'slide',
		
		//show loading message during Ajax requests
		//if false, message will not appear, but loading classes will still be toggled on html el
		loadingMessage: "loading",
		
		//configure meta viewport tag's content attr:
		metaViewportContent: "width=device-width, minimum-scale=1, maximum-scale=1",
		
		//additional markup to prepend to head
		headExtras: undefined,
		
		//support conditions that must be met in order to proceed
		gradeA: function(){
			return jQuery.support.mediaquery;
		}
		
	}, jQuery.mobile );
	
	//if device support condition(s) aren't met, leave things as they are -> a basic, usable experience,
	//otherwise, proceed with the enhancements
	if ( !jQuery.mobile.gradeA() ) {
		return;
	}	

	//define vars for interal use
	var $window = jQuery(window),
		$html = jQuery('html'),
		$head = jQuery('head'),
		
		//to be populated at DOM ready
		$body,
		
		//loading div which appears during Ajax requests
		//will not appear if $.mobile.loadingMessage is false
		$loader = $.mobile.loadingMessage ? 
			jQuery('<div class="ui-loader ui-body-a ui-corner-all">'+
						'<span class="ui-icon ui-icon-loading spin"></span>'+
						'<h1>'+ $.mobile.loadingMessage +'</h1>'+
					'</div>')
			: undefined,
			
		//define meta viewport tag, if content is defined	
		$metaViewport = $.mobile.metaViewportContent ? $("<meta>", { name: "viewport", content: $.mobile.metaViewportContent}) : undefined,
		
		//define baseUrl for use in relative url management
		baseUrl = getPathDir( location.protocol + '//' + location.host + location.pathname ),
		
		//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
		$base = $.support.dynamicBaseTag ? $("<base>", { href: baseUrl }) : undefined,
		
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
		
		
	//prepend head markup additions
	$head.prepend( $.mobile.headExtras || {}, $metaViewport || {}, $base || {} );

	// TODO: don't expose (temporary during code reorg)
	$.mobile.urlStack = urlStack;
	
	//consistent string escaping for urls and IDs
	function idStringEscape(str){
		return str.replace(/[^a-zA-Z0-9]/g, '-');
	}
	
	$.mobile.idStringEscape = idStringEscape;
	
	// hide address bar
	function hideBrowserChrome() {
		// prevent scrollstart and scrollstop events
		jQuery.event.special.scrollstart.enabled = false;
		setTimeout(function() {
			window.scrollTo( 0, 0 );
		},0);	
		setTimeout(function() {
			jQuery.event.special.scrollstart.enabled = true;
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
	$('form').live('submit', function(){
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
			
		$.changePage({
				url: url,
				type: type,
				data: $(this).serialize()
			},
			undefined,
			undefined,
			true
		);
		return false;
	});	
	
	//click routing - direct to HTTP or Ajax, accordingly
	jQuery( "a" ).live( "click", function(event) {
		var $this = $(this),
			//get href, remove same-domain protocol and host
			href = $this.attr( "href" ).replace( location.protocol + "//" + location.host, ""),
			//if it still starts with a protocol, it's external, or could be :mailto, etc
			external = /^(:?\w+:)/.test( href ) || $this.is( "[target],[rel=external]" );

		if( href === '#' ){
			//for links created purely for interaction - ignore
			return false;
		}
		
		$activeClickedLink = $this.closest( ".ui-btn" ).addClass( $.mobile.activeBtnClass );
		
		if( external || !$.mobile.ajaxLinksEnabled ){
			//deliberately redirect, in case click was triggered
			location.href = href;
		}
		else {	
			//use ajax
			var transition = $this.data( "transition" ),
				back = $this.data( "back" ),
				changeHashOnSuccess = !$this.is( $.mobile.nonHistorySelectors );
				
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
			from = toIsArray ? to[0] : $.activePage,
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
			jQuery( document.activeElement ).blur();
			
			//trigger before show/hide events
			from.data("page")._trigger("beforehide", {nextPage: to});
			to.data("page")._trigger("beforeshow", {prevPage: from});
			
			function loadComplete(){
				pageLoading( true );
				//trigger show/hide events, allow preventing focus change through return false		
				if( from.data("page")._trigger("hide", null, {nextPage: to}) !== false && to.data("page")._trigger("show", null, {prevPage: from}) !== false ){
					$.activePage = to;
				}
				reFocus( to );
				if( changeHash && url ){
					hashListener = false;
					location.hash = url;
				}
				removeActiveLinkClass();
				
				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if( duplicateCachedPage != null ){
					duplicateCachedPage.remove();
				}
			}
			
			if(transition){		
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
			return url.match( '&' + jQuery.mobile.subPageUrlKey ) ? url.split( '&' + jQuery.mobile.subPageUrlKey )[0] : url;
		}

		//if url is a string
		if( url ){
			to = jQuery( "[id='" + url + "']" ),
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
					var all = jQuery("<div></div>");
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
					jQuery("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>Error Loading Page</h1></div>")
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

	
	jQuery(function() {

		$body = jQuery( "body" );
		pageLoading();
		
		// needs to be bound at domready (for IE6)
		// find or load content, make it active
		$window.bind( "hashchange", function(e, triggered) {
			if( !hashListener ){ 
				hashListener = true;
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
			else if( $.activePage.length && !$startPage.is( $.activePage ) && !triggered ) {
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
	
	//add mobile, loading classes to doc
	$html.addClass('ui-mobile');
	
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
	jQuery.fn.animationComplete = function(callback){
		if(jQuery.support.cssTransitions){
			return jQuery(this).one('webkitAnimationEnd', callback);
		}
		else{
			callback();
		}
	};	
	
	//TODO - add to jQuery.mobile, not $
	jQuery.extend({
		pageLoading: pageLoading,
		changePage: changePage,
		hideBrowserChrome: hideBrowserChrome
	});

	//dom-ready
	jQuery(function(){
		var $pages = jQuery("[data-role='page']");
		//set up active page
		$startPage = $.activePage = $pages.first();
		
		//set page container
		$pageContainer = $startPage.parent().addClass('ui-mobile-viewport');
		
		jQuery.extend({
			pageContainer: $pageContainer
		});
		
		//initialize all pages present
		$pages.page();
		
		//trigger a new hashchange, hash or not
		$window.trigger( "hashchange", [ true ] );
		
		//update orientation 
		$window.trigger( "orientationchange.htmlclass" );
	});
	
	$window
		.load(hideBrowserChrome)
		.unload(removeActiveLinkClass);
	
})( jQuery, this );
