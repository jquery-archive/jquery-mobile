/*
* jQuery Mobile Framework : core utilities for auto ajax navigation, base tag mgmt,
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

	//define vars for interal use
	var $window = $(window),
		$html = $('html'),
		$head = $('head'),

		//url path helpers for use in relative url management
		path = {

			//get path from current hash, or from a file path
			get: function( newPath ){
				if ( newPath == undefined ) {
					if ( $.support.pushState ) {
						newPath = location.pathname;
					} else {
						newPath = location.hash;
					}
				}
				return path.stripHash( newPath ).replace(/[^\/]*\.[^\/*]+$/, '');
			},

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ){
				var splitkey = '&' + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},
			
			//set location hash to path
			set: function( path ) {
				if ( $.support.pushState ) {
					//replace with a proper page title from the loaded page's title element, or title attr on a multipage
					history.pushState({ "url": path }, null, path );
				} else {
					location.hash = path;
				}
			},

			//location pathname from intial directory request
			origin: '',

			setOrigin: function(){
				// TODO was just this in pushstate branch:
				// path.origin = path.get();
				// branch based on $.support.pushState?
				path.origin = path.get( location.protocol + '//' + location.host + location.pathname );
			},
			
			//prefix a relative url with the current path
			makeAbsolute: function( url ){
				return path.get() + url;
			},
			
			//return a url path with the window's location protocol/hostname removed
			clean: function( url ){
				return url.replace( location.protocol + "//" + location.host, "");
			},
			
			//just return the url without an initial #
			stripHash: function( url ){
				return url.replace( /^#/, "" );
			},
			
			//check whether a url is referencing the same domain, or an external domain or different protocol
			//could be mailto, etc
			isExternal: function( url ){
				return path.hasProtocol( path.clean( url ) );
			},
			
			hasProtocol: function( url ){
				return /^(:?\w+:)/.test( url );
			},
			
			//check if the url is relative
			isRelative: function( url ){
				return  /^[^\/|#]/.test( url ) && !path.hasProtocol( url );
			}
		},

		//will be defined when a link is clicked and given an active class
		$activeClickedLink = null,
		
		//urlHistory is purely here to make guesses at whether the back or forward button was clicked
		//and provide an appropriate transition
		urlHistory = {
			//array of pages that are visited during a single page load. each has a url and optional transition
			stack: [],
			
			//maintain an index number for the active page in the stack
			activeIndex: 0,
			
			//get active
			getActive: function(){
				return urlHistory.stack[ urlHistory.activeIndex ];
			},
			
			getPrev: function(){
				return urlHistory.stack[ urlHistory.activeIndex - 1 ];
			},
			
			getNext: function(){
				return urlHistory.stack[ urlHistory.activeIndex + 1 ];
			},
			
			// addNew is used whenever a new page is added
			addNew: function( url, transition ){
				//if there's forward history, wipe it
				if( urlHistory.getNext() ){
					urlHistory.clearForward();
				}
				
				urlHistory.stack.push( {url : url, transition: transition } );
					
				urlHistory.activeIndex = urlHistory.stack.length - 1;
			},
			
			//wipe urls ahead of active index
			clearForward: function(){
				urlHistory.stack = urlHistory.stack.slice( 0, urlHistory.activeIndex + 1 );
			},
			
			//enable/disable hashchange event listener
			//toggled internally when location.hash is updated to match the url of a successful page load
			listeningEnabled: true
		},

		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",

		//contains role for next page, if defined on clicked link via data-rel
		nextPageRole = null,
		
		//dumb workaround to ignore the initial popstate event currently triggered on load in Chrome
		popEnabled = false,
		
		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog";

		//existing base tag?
		var $base = $head.children("base"),
			hostURL = location.protocol + '//' + location.host,
			docLocation = path.get( hostURL + location.pathname ),
			docBase = docLocation;

		if ($base.length) {
			var href = $base.attr("href");
			if (href) {
				if (href.search(/^[^:/]+:\/\/[^/]+\/?/) == -1) {
					//the href is not absolute, we need to turn it into one
					//so that we can turn paths stored in our location hash into
					//relative paths.
					if (href.charAt(0) == '/') {
						//site relative url
						docBase = hostURL + href;
					}
					else {
						//the href is a document relative url
						docBase = docLocation + href;
						//XXX: we need some code here to calculate the final path
						// just in case the docBase contains up-level (../) references.
					}
				}
				else {
					//the href is an absolute url
					docBase = href;
				}
			}
			//make sure docBase ends with a slash
			docBase = docBase  + (docBase.charAt(docBase.length - 1) == '/' ? ' ' : '/');
		}

		//base element management, defined depending on dynamic base tag support
		base = $.support.dynamicBaseTag ? {

			//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
			element: ($base.length ? $base : $("<base>", { href: docBase }).prependTo( $head )),

			//set the generated BASE element's href attribute to a new page's base path
			set: function( href ){
				base.element.attr('href', docBase + path.get( href ));
			},

			//set the generated BASE element's href attribute to a new page's base path
			reset: function(){
				base.element.attr('href', docBase );
			}

		} : undefined;

		//set location pathname from intial directory request
		path.setOrigin();

/*
	internal utility functions
--------------------------------------*/


	//direct focus to the page title, or otherwise first focusable element
	function reFocus( page ){
		var pageTitle = page.find( ".ui-title:eq(0)" );
		if( pageTitle.length ){
			pageTitle.focus();
		}
		else{
			page.find( focusable ).eq(0).focus();
		}
	};

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ){
		if( !!$activeClickedLink && (!$activeClickedLink.closest( '.ui-page-active' ).length || forceRemoval )){
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	};

	//animation complete callback
	$.fn.animationComplete = function( callback ){
		if($.support.cssTransitions){
			return $(this).one('webkitAnimationEnd', callback);
		}
		else{
			callback();
		}
	};



/* exposed $.mobile methods	 */

	//update location.hash, with or without triggering hashchange event
	//TODO - deprecate this one at 1.0
	$.mobile.updateHash = path.set;
	
	//expose path object on $.mobile
	$.mobile.path = path;
	
	//expose base object on $.mobile
	$.mobile.base = base;

	//url stack, useful when plugins need to be aware of previous pages viewed
	//TODO: deprecate this one at 1.0
	$.mobile.urlstack = urlHistory.stack;
	
	//history stack
	$.mobile.urlHistory = urlHistory;

	// changepage function
	// TODO : consider moving args to an object hash
	$.mobile.changePage = function( to, transition, reverse, changeHash, fromHashChange ){
		//from is always the currently viewed page
		var toIsArray = $.type(to) === "array",
			toIsObject = $.type(to) === "object",
			from = toIsArray ? to[0] : $.mobile.activePage,
			to = toIsArray ? to[1] : to,
			url = fileUrl = $.type(to) === "string" ? path.stripHash( to ) : "",
			data = undefined,
			type = 'get',
			isFormRequest = false,
			duplicateCachedPage = null,
			currPage = urlHistory.getActive(),
			back = false,
			forward = false;
			
			
		// If we are trying to transition to the same page that we are currently on ignore the request.
		// an illegal same page request is defined by the current page being the same as the url, as long as there's history
		// and to is not an array or object (those are allowed to be "same")
		if( currPage && urlHistory.stack.length > 1 && currPage.url === url && !toIsArray && !toIsObject ) {
			return;
		}	
			
		// if the changePage was sent from a hashChange event
		// guess if it came from the history menu
		if( fromHashChange ){
			
			// check if url is in history and if it's ahead or behind current page
			$.each( urlHistory.stack, function( i ){
				//if the url is in the stack, it's a forward or a back
				if( this.url == url ){
					urlIndex = i;
					//define back and forward by whether url is older or newer than current page
					back = i < urlHistory.activeIndex;
					//forward set to opposite of back
					forward = !back;
					//reset activeIndex to this one
					urlHistory.activeIndex = i;
				}
			});
			
			//if it's a back, use reverse animation
			if( back ){
				reverse = true;
				transition = transition || currPage.transition;
			}
			else if ( forward ){
				transition = transition || urlHistory.getActive().transition;
			}
		}
		

		if( toIsObject && to.url ){
			url = to.url,
			data = to.data,
			type = to.type,
			isFormRequest = true;
			//make get requests bookmarkable
			if( data && type == 'get' ){
				if($.type( data ) == "object" ){
					data = $.param(data);
				}
			
				url += "?" + data;
				data = undefined;
			}
		}

		//reset base to pathname for new request
		if(base){ base.reset(); }

		//kill the keyboard
		$( window.document.activeElement ).add(':focus').blur();

		function defaultTransition(){
			if(transition === undefined){
				transition = $.mobile.defaultTransition;
			}
		}

		//function for transitioning between two existing pages
		function transitionPages() {

			//get current scroll distance
			var currScroll = $window.scrollTop(),
					perspectiveTransitions = ["flip"],
					pageContainerClasses = [];
			
			//support deep-links to generated sub-pages	
			if( url.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ){
				to = $( "[data-url='" + url + "']" );
			}

			//set as data for returning to that spot
			from.data('lastScroll', currScroll);

			//trigger before show/hide events
			from.data("page")._trigger("beforehide", {nextPage: to});
			to.data("page")._trigger("beforeshow", {prevPage: from});

			function loadComplete(){
				$.mobile.pageLoading( true );

				reFocus( to );

				if( changeHash !== false && url ){
					if( !back  ){
						urlHistory.listeningEnabled = false;
					}
					path.set( url );
					urlHistory.listeningEnabled = true;
				}
				
				//add page to history stack if it's not back or forward
				if( !back && !forward ){
					urlHistory.addNew( url, transition );
				}
				
				removeActiveLinkClass();

				//jump to top or prev scroll, if set
				$.mobile.silentScroll( to.data( 'lastScroll' ) );

				//trigger show/hide events, allow preventing focus change through return false
				from.data("page")._trigger("hide", null, {nextPage: to});
				if( to.data("page")._trigger("show", null, {prevPage: from}) !== false ){
					$.mobile.activePage = to;
				}

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if (duplicateCachedPage != null) {
				    duplicateCachedPage.remove();
				}
			};

			function addContainerClass(className){
				$.mobile.pageContainer.addClass(className);
				pageContainerClasses.push(className);
			};

			function removeContainerClasses(){
				$.mobile
					.pageContainer
					.removeClass(pageContainerClasses.join(" "));

				pageContainerClasses = [];
			};
			
			

			if(transition && (transition !== 'none')){
				if( $.inArray(transition, perspectiveTransitions) >= 0 ){
					addContainerClass('ui-mobile-viewport-perspective');
				}

				addContainerClass('ui-mobile-viewport-transitioning');

				// animate in / out
				from.addClass( transition + " out " + ( reverse ? "reverse" : "" ) );
				to.addClass( $.mobile.activePageClass + " " + transition +
					" in " + ( reverse ? "reverse" : "" ) );

				// callback - remove classes, etc
				to.animationComplete(function() {
					from.add( to ).removeClass("out in reverse " + transition );
					from.removeClass( $.mobile.activePageClass );
					loadComplete();
					removeContainerClasses();
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

			//set next page role, if defined
			if ( nextPageRole || to.data('role') == 'dialog' ) {
				url = urlHistory.getActive().url + dialogHashKey;
				if(nextPageRole){
					to.attr( "data-role", nextPageRole );
					nextPageRole = null;
				}
			}

			//run page plugin
			to.page();
		};

		//if url is a string
		if( url ){
			to = $( "[data-url='" + url + "']" );
			fileUrl = path.getFilePath(url);
		}
		else{ //find base url of element, if avail
			var toID = to.attr('data-url'),
				toIDfileurl = path.getFilePath(toID);

			if(toID != toIDfileurl){
				fileUrl = toIDfileurl;
			}
		}
		
		// ensure a transition has been set where pop is undefined
		defaultTransition();

		// find the "to" page, either locally existing in the dom or by creating it through ajax
		if ( to.length && !isFormRequest ) {
			if( fileUrl && base ){
				base.set( fileUrl );
			}
			enhancePage();
			transitionPages();
		} else {

			//if to exists in DOM, save a reference to it in duplicateCachedPage for removal after page change
			if( to.length ){
				duplicateCachedPage = to;
			}

			$.mobile.pageLoading();

			$.ajax({
				url: fileUrl,
				type: type,
				data: data,
				success: function( html ) {
					
					//pre-parse html to check for a data-url, 
					//use it as the new fileUrl, base path, etc
					var redirectLoc = / data-url="(.*)"/.test( html ) && RegExp.$1;

					if( redirectLoc ){
						if(base){
							base.set( redirectLoc );
						}	
						url = fileUrl = path.makeAbsolute( path.getFilePath( redirectLoc ) );
					}
					else {
						if(base){
							base.set(fileUrl);
						}	
					}
					
					var all = $("<div></div>");
					//workaround to allow scripts to execute when included in page divs
					all.get(0).innerHTML = html;
					to = all.find('[data-role="page"], [data-role="dialog"]').first();

					//rewrite src and href attrs to use a base url
					if( !$.support.dynamicBaseTag ){
						var newPath = path.get( fileUrl );
						to.find('[src],link[href]').each(function(){
							var thisAttr = $(this).is('[href]') ? 'href' : 'src',
								thisUrl = $(this).attr(thisAttr);

							//if full path exists and is same, chop it - helps IE out
							thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

							if( !/^(\w+:|#|\/)/.test(thisUrl) ){
								$(this).attr(thisAttr, newPath + thisUrl);
							}
						});
					}
					
					//append to page and enhance
					to
						.attr( "data-url", fileUrl )
						.appendTo( $.mobile.pageContainer );

					enhancePage();
					transitionPages();
				},
				error: function() {
					$.mobile.pageLoading( true );
					removeActiveLinkClass(true);
					base.set(path.get());
					$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>Error Loading Page</h1></div>")
						.css({ "display": "block", "opacity": 0.96, "top": $(window).scrollTop() + 100 })
						.appendTo( $.mobile.pageContainer )
						.delay( 800 )
						.fadeOut( 400, function(){
							$(this).remove();
						});
				}
			});
		}

	};


/* Event Bindings - hashchange, submit, and click */

	//bind to form submit events, handle with Ajax
	$( "form[data-ajax!='false']" ).live('submit', function(event){
		if( !$.mobile.ajaxEnabled ||
			//TODO: deprecated - remove at 1.0
			!$.mobile.ajaxFormsEnabled ){ return; }

		var type = $(this).attr("method"),
			url = path.clean( $(this).attr( "action" ) );

		//external submits use regular HTTP
		if( path.isExternal( url ) ){
			return;
		}

		//if it's a relative href, prefix href with base url
		if( path.isRelative( url ) ){
			url = path.makeAbsolute( url );
		}

		$.mobile.changePage({
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
			url = path.clean( $this.attr( "href" ) ),
			
			//check if it's external
			isExternal = path.isExternal( url ) || $this.is( "[rel='external']" ),
			
			//if target attr is specified we mimic _blank... for now
			hasTarget = $this.is( "[target]" );
		
		//if there's a data-rel=back attr, go back in history
		if( $this.is( "[data-rel='back']" ) ){
			window.history.back();
			return false;
		}	

		if( url === "#" ){
			//for links created purely for interaction - ignore
			return false;
		}

		$activeClickedLink = $this.closest( ".ui-btn" ).addClass( $.mobile.activeBtnClass );

		if( isExternal || hasTarget || !$.mobile.ajaxEnabled ||
			// TODO: deprecated - remove at 1.0
			!$.mobile.ajaxLinksEnabled ){
			//remove active link class if external (then it won't be there if you come back)
			removeActiveLinkClass(true);

			//deliberately redirect, in case click was triggered
			if( hasTarget ){
				window.open( url );
			}
			else{
				location.href = url;
			}
		}
		else {
			//use ajax
			var transition = $this.data( "transition" ),
				direction = $this.data("direction"),
				reverse = direction && direction == "reverse" || 
				// deprecated - remove by 1.0
				$this.data( "back" );
				
			//this may need to be more specific as we use data-rel more	
			nextPageRole = $this.attr( "data-rel" );

			//if it's a relative href, prefix href with base url
			if( path.isRelative( url ) ){
				url = path.makeAbsolute( url );
			}

			url = path.stripHash( url );

			$.mobile.changePage( url, transition, reverse);
		}
		event.preventDefault();
	});

	//Again, for Chrome: set popstate listening to true after onload and an arbitrary timeout 
	//(0 seemed to work, but playing it safe)
	$window.load(function(){
		setTimeout(function(){ popEnabled = true; }, 100);
	});	

	//hashchange event handler
	$window.bind( "hashchange popstate", function(e, triggered) {
		//return to ignore initial popstate event fired in Chrome
		//or if the active page is a dialog
		if( ( e.type === "popstate" && !popEnabled ) || $(".ui-page-active").is("[data-role=" + $.mobile.nonHistorySelectors + "]") ){
			return;
		}
		
		if( !triggered && ( !urlHistory.listeningEnabled || !$.mobile.ajaxEnabled ||
			// TODO: deprecated - remove at 1.0
			// only links need to be checked here, as forms don't trigger a hashchange event (they just silently update the hash)
			!$.mobile.ajaxLinksEnabled ) ){
			return;
		}
		
		var to = (e.type == "hashchange" || triggered) ? path.stripHash( location.hash ) : location.pathname,
			transition = triggered ? false : undefined;	

		// replace current location in loading first page
		if ($.support.pushState) {
			if (triggered) {
				if (to == "") {
					//using pathname for first page if hash is empty
					//because URL does not accord with the contents of real contents.
					to = location.pathname;
				}
				history.replaceState({ "url": to }, null, to );
			}
		}

		//make sure that hash changes that produce a dialog url do nothing	
		if( urlHistory.stack.length > 1 &&
				to.indexOf( dialogHashKey ) > -1 &&
				!$.mobile.activePage.is( ".ui-dialog" ) ){
			return;
		}	

		//if to is defined, use it
		if ( to ){
			$.mobile.changePage( to, transition, undefined, false, true );
		}
		//there's no hash, the active page is not the start page, and it's not manually triggered hashchange
		//we probably backed out to the first page visited
		else if( $.mobile.activePage.length && $.mobile.startPage[0] !== $.mobile.activePage[0] && !triggered ) {
			$.mobile.changePage( $.mobile.startPage, transition, true, false, true );
		}
		//probably the first page - show it
		else{
			urlHistory.addNew( "" );
			$.mobile.startPage.trigger("pagebeforeshow", {prevPage: $('')});
			$.mobile.startPage.addClass( $.mobile.activePageClass );
			$.mobile.pageLoading( true );

			if( $.mobile.startPage.trigger("pageshow", {prevPage: $('')}) !== false ){
				reFocus($.mobile.startPage);
			}
		}
	});
})( jQuery );
