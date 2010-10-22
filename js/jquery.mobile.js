/*!
 * jQuery Mobile
 * http://jquerymobile.com/
 *
 * Copyright 2010, jQuery Project
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( jQuery, window, undefined ) {
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
		baseUrl = location.protocol + '//' + location.host + location.pathname;
	
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
	
	function getBaseURL( nonHashPath ){
	    var newPath = nonHashPath || location.hash,
	    	newBaseURL = newPath.replace(/#/,'').split('/');
	    	
		if(newBaseURL.length && /[.|&]/.test(newBaseURL[newBaseURL.length-1]) ){
			newBaseURL.pop();	
		}
		newBaseURL = newBaseURL.join('/');
		if(newBaseURL !== "" && newBaseURL.charAt(newBaseURL.length-1) !== '/'){  newBaseURL += '/'; }
		return newBaseURL;
	}
	
	var setBaseURL = !$.support.dynamicBaseTag ? $.noop : function( nonHashPath ){
		//set base url for new page assets
		$('#ui-base').attr('href', baseUrl + getBaseURL( nonHashPath ));
	}
	
	var resetBaseURL = !$.support.dynamicBaseTag ? $.noop : function(){
		$('#ui-base').attr('href', baseUrl);
	}
	
	
	// send a link through hash tracking
	jQuery.fn.ajaxClick = function() {
		var href = jQuery( this ).attr( "href" );
		pageTransition = jQuery( this ).data( "transition" ) || "slide";
		forceBack = jQuery( this ).data( "back" ) || undefined;
		nextPageRole = jQuery( this ).attr( "data-rel" );
		  	
		//find new base for url building
		var newBaseURL = getBaseURL();
		
		//if href is absolute but local, or a local ID, no base needed
		if( /^\//.test(href) || (/https?:\/\//.test(href) && !!(href).match(location.hostname)) || /^#/.test(href) ){
			newBaseURL = '';
		}
		
		// set href to relative path using baseURL and
		if( !/https?:\/\//.test(href) ){
			href = newBaseURL + href;
		}
						
		//if it's a non-local-anchor and Ajax is not supported, or if it's an external link, go to page without ajax
		if ( ( /^[^#]/.test(href) && !jQuery.support.ajax ) || ( /https?:\/\//.test(href) && !!!href.match(location.hostname) ) ) {
			location = href
		}
		else{			
			if( $(this).is(unHashedSelectors) ){
				changePage(href, pageTransition, undefined);
			}
			else{
				changePage(href, pageTransition, undefined, true);
			}
			
		}
		return this;
	};
	
	// ajaxify all navigable links
	jQuery( "a:not([href='#']):not([target]):not([rel='external']):not([href^='mailto:'])" ).live( "click", function(event) {
		jQuery( this ).ajaxClick();
		return false;
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
	  
	jQuery.ajaxExt = jQuery.ajax;  // extension point (e.g. hook in local database persistence layer)

	//for getting or creating a new page 
	function changePage( to, transition, back, changeHash){

		//from is always the currently viewed page
		var toIsArray = $.type(to) === "array",
			from = toIsArray ? to[0] : $.activePage,
			to = toIsArray ? to[1] : to,
			url = fileUrl = $.type(to) === "string" ? to.replace( /^#/, "" ) : null,
			back = (back !== undefined) ? back : (forceBack || ( urlStack.length > 1 && urlStack[ urlStack.length - 2 ].url === url )),
			transition = (transition !== undefined) ? transition :  ( pageTransition || "slide" );
		
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
			}
			
			if(transition){		
				// animate in / out
				from.addClass( transition + " out " + ( back ? "reverse" : "" ) );
				to.addClass( activePageClass + " " + transition +
					" in " + ( back ? "reverse" : "" ) );
				
				// callback - remove classes, etc
				to.animationComplete(function() {
					from.add( to ).removeClass(" out in reverse " + transitions );
					from.removeClass( activePageClass );
					loadComplete();
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
		if ( to.length ) {
			if( fileUrl ){
				setBaseURL(fileUrl);
			}	
			enhancePage();
			transitionPages();
		} else { 
			
			pageLoading();

			$.ajaxExt({
				url: fileUrl,
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
							var thisHref = $(this).attr('href'),
								thisSrc = $(this).attr('src'),
								thisAttr = thisHref ? 'href' : 'src',
								thisUrl = thisHref || thisSrc;
							
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
	function resolutionBreakpoints(){
		var currWidth = $window.width(),
			minPrefix = "min-width-",
			maxPrefix = "max-width-",
			minBreakpoints = [],
			maxBreakpoints = [];
			
		$html.removeClass( minPrefix + $.mobile.resolutionBreakpoints.join(" " + minPrefix) + maxPrefix + " " +  $.mobile.resolutionBreakpoints.join(" " + maxPrefix) );
					
		$.each($.mobile.resolutionBreakpoints,function( i ){
			if( currWidth >= $.mobile.resolutionBreakpoints[ i ] ){
				minBreakpoints.push( $.mobile.resolutionBreakpoints[ i ] );
			}
			if( currWidth <= $.mobile.resolutionBreakpoints[ i ] ){
				maxBreakpoints.push( $.mobile.resolutionBreakpoints[ i ] );
			}
		});
		
		$html.addClass( minPrefix + minBreakpoints.join(" " + minPrefix) + " " + maxPrefix + maxBreakpoints.join(" " + maxPrefix) );	
	};
	
	//common breakpoints, overrideable, changeable
	$.mobile.resolutionBreakpoints = [320,480,768,1024];
	$window.bind( "orientationchange resize", resolutionBreakpoints);
	resolutionBreakpoints();
	
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
		
		//set up active page
		$startPage = $.activePage = jQuery("[data-role='page']").first();
		
		//set page container
		$pageContainer = $startPage.parent();
		
		jQuery.extend({
			pageContainer: $pageContainer
		});
		
		//make sure it has an ID - for finding it later
		if(!$startPage.attr('id')){ 
			$startPage.attr('id', startPageId); 
		}
		
		//initialize all pages present
		jQuery("[data-role='page']").page();
		
		//trigger a new hashchange, hash or not
		$window.trigger( "hashchange", { manuallyTriggered: true } );
		
		//update orientation 
		$html.addClass( jQuery.event.special.orientationchange.orientation( $window ) );
	});
	
	$window.load(hideBrowserChrome);
	
})( jQuery, this );
