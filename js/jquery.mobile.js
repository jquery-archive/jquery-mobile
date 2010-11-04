/*!
 * jQuery Mobile
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( $, window, undefined ) {
	//some critical feature tests should be placed here.
	//if we're missing support for any of these, then we're a C-grade browser
	//to-do: see if we need more qualifiers here.
	if ( !jQuery.support.mediaquery ) {
		return;
	}	
	
	//these properties should be made easy to override externally
	jQuery.mobile = {};
	
	jQuery.extend(jQuery.mobile, {
		subPageUrlKey: 'ui-page', //define the key used in urls for sub-pages. Defaults to &ui-page=
		degradeInputs: {
			color: true,
			date: true,
			datetime: true,
			"datetime-local": true,
			email: true,
			month: true,
			number: true,
			range: true,
			search: true,
			tel: true,
			time: true,
			url: true,
			week: true
		},
		addBackBtn: true
	});

	var $window = jQuery(window),
		$html = jQuery('html'),
		$head = jQuery('head'),
		$body,
		$loader = jQuery('<div class="ui-loader ui-body-a ui-corner-all"><span class="ui-icon ui-icon-loading spin"></span><h1>loading</h1></div>'),
		$startPage,
		$pageContainer,
		startPageId = 'ui-page-start',
		activePageClass = 'ui-page-active',
		activeBtnClass = 'ui-btn-active',
		activeClickedLink = null,
		pageTransition,
		forceBack,
		transitions = 'slide slideup slidedown pop flip fade',
		transitionDuration = 350,
		backBtnText = "Back",
		urlStack = [ {
			url: location.hash.replace( /^#/, "" ),
			transition: "slide"
		} ],
		focusable = "[tabindex],a,button:visible,select:visible,input",
		nextPageRole = null,
		hashListener = true,
		unHashedSelectors = '[data-rel=dialog]',
		baseUrl = getPathDir( location.protocol + '//' + location.host + location.pathname ),
		resolutionBreakpoints = [320,480,768,1024];

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
		$('#ui-base').attr('href', baseUrl + getBaseURL( nonHashPath ));
	}
	
	var resetBaseURL = !$.support.dynamicBaseTag ? $.noop : function(){
		$('#ui-base').attr('href', baseUrl);
	}
	
	//for form submission
	$('form').live('submit', function(){
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
		
		activeClickedLink = $this.closest( ".ui-btn" ).addClass( activeBtnClass );
		
		if( external ){
			//deliberately redirect, in case click was triggered
			location.href = href;
		}
		else {	
			//use ajax
			var pageTransition = $this.data( "transition" ) || "slide",
				forceBack = $this.data( "back" ) || undefined,
				changeHashOnSuccess = !$this.is(unHashedSelectors);
				
			nextPageRole = $this.attr( "data-rel" );	
	
			//if it's a relative href, prefix href with base url
			if( href.indexOf('/') && href.indexOf('#') !== 0 ){
				href = getBaseURL() + href;
			}
			
			href.replace(/^#/,'');
			
			changePage(href, pageTransition, forceBack, changeHashOnSuccess);			
		}
		event.preventDefault();
	});
	
	// turn on/off page loading message.
	function pageLoading( done ) {
		if ( done ) {
			$html.removeClass( "ui-loading" );
		} else {
			$loader.appendTo($pageContainer).css({top: $(window).scrollTop() + 75});
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
		if(activeClickedLink && (!activeClickedLink.closest( '.ui-page-active' ).length) || forceRemoval ){
			activeClickedLink.removeClass( activeBtnClass );
		}
		activeClickedLink = null;
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
			transition = (transition !== undefined) ? transition :  ( pageTransition || "slide" );
		
		if( $.type(to) === "object" ){
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
		
		//unset pageTransition, forceBack	
		pageTransition = undefined;
		forceBack = undefined;
			
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
					setTimeout(function(){
						hashListener = true;
					}, 500);
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
				to.addClass( activePageClass + " " + transition +
					" in " + ( back ? "reverse" : "" ) );
				
				// callback - remove classes, etc
				to.animationComplete(function() {
					from.add( to ).removeClass(" out in reverse " + transitions );
					from.removeClass( activePageClass );
					loadComplete();
					$pageContainer.removeClass('ui-mobile-viewport-transitioning');
				});
			}
			else{
				from.removeClass( activePageClass );
				to.addClass( activePageClass );
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
						to.find('[src],[href]').each(function(){
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
		$window.bind( "hashchange", function(e, extras) {
			if( !hashListener ){ return; } 
			var to = location.hash,
				transition = (extras && extras.manuallyTriggered) ? false : undefined;
				
			// either we've backed up to the root page url
			// or it's the first page load with no hash present
			//there's a hash and it wasn't manually triggered
			// > probably a new page, "back" will be figured out by changePage
			if ( to ){
				changePage( to, transition);
			}
			//there's no hash, the active page is not the start page, and it's not manually triggered hashchange
			// > probably backed out to the first page visited
			else if( $.activePage.length && !$startPage.is( $.activePage ) && !(extras && extras.manuallyTriggered) ) {
				changePage( $startPage, transition, true );
			}
			else{
				$startPage.trigger("pagebeforeshow", {prevPage: $('')});
				$startPage.addClass( activePageClass );
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
	$window.bind( "orientationchange", function( event, data ) {
		$html.removeClass( "portrait landscape" ).addClass( data.orientation );
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
		
	//insert mobile meta - these will need to be configurable somehow.
	var headPrepends = 
	$head.prepend(
		'<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />' +
		($.support.dynamicBaseTag ? '<base  href="" id="ui-base" />' : '')
	);
    
    //set base href to pathname
    resetBaseURL();    
	
	//incomplete fallback to workaround lack of animation callbacks. 
	//should this be extended into a full special event?
	// note: Expects CSS animations use transitionDuration (350ms)
	jQuery.fn.animationComplete = function(callback){
		if(jQuery.support.WebKitAnimationEvent){
			return jQuery(this).one('webkitAnimationEnd', callback); //check out transitionEnd (opera per Paul's request)
		}
		else{
			setTimeout(callback, transitionDuration);
		}
	};	
	
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
		
		//make sure it has an ID - for finding it later
		if(!$startPage.attr('id')){ 
			$startPage.attr('id', startPageId); 
		}
		
		//initialize all pages present
		$pages.page();
		
		//trigger a new hashchange, hash or not
		$window.trigger( "hashchange", { manuallyTriggered: true } );
		
		//update orientation 
		$html.addClass( jQuery.event.special.orientationchange.orientation( $window ) );
	});
	
	$window
		.load(hideBrowserChrome)
		.unload(removeActiveLinkClass);
	
})( jQuery, this );
