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
				if( newPath === undefined ){
					newPath = location.hash;
				}
				return path.stripHash( newPath ).replace(/[^\/]*\.[^\/*]+$/, '');
			},

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ){
				var splitkey = '&' + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},

			//set location hash to path
			set: function( path ){
				location.hash = path;
			},

			//location pathname from intial directory request
			origin: '',

			setOrigin: function(){
				path.origin = path.get( location.protocol + '//' + location.host + location.pathname );
			},

			//prefix a relative url with the current path
			// TODO rename to reflect conditional functionality
			makeAbsolute: function( url ){
				// only create an absolute path when the hash can be used as one
				return path.isPath(window.location.hash) ? path.get() + url : url;
			},

			// test if a given url (string) is a path
			// NOTE might be exceptionally naive
			isPath: function( url ){
				return /\//.test(url);
			},

			//return a url path with the window's location protocol/hostname/pathname removed
			clean: function( url ){
				// Replace the protocol, host, and pathname only once at the beginning of the url to avoid
				// problems when it's included as a part of a param
				// Also, since all urls are absolute in IE, we need to remove the pathname as well.
				var leadingUrlRootRegex = new RegExp("^" + location.protocol + "//" + location.host + location.pathname);
				return url.replace(leadingUrlRootRegex, "");
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
				return (/^(:?\w+:)/).test( url );
			},

			//check if the url is relative
			isRelative: function( url ){
				return  (/^[^\/|#]/).test( url ) && !path.hasProtocol( url );
			},

			isEmbeddedPage: function( url ){
				return (/^#/).test( url );
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
			addNew: function( url, transition, title, storedTo ){
				//if there's forward history, wipe it
				if( urlHistory.getNext() ){
					urlHistory.clearForward();
				}

				urlHistory.stack.push( {url : url, transition: transition, title: title, page: storedTo } );

				urlHistory.activeIndex = urlHistory.stack.length - 1;
			},

			//wipe urls ahead of active index
			clearForward: function(){
				urlHistory.stack = urlHistory.stack.slice( 0, urlHistory.activeIndex + 1 );
			},

			directHashChange: function(opts){
				var back , forward, newActiveIndex;

				// check if url isp in history and if it's ahead or behind current page
				$.each( urlHistory.stack, function( i, historyEntry ){

					//if the url is in the stack, it's a forward or a back
					if( opts.currentUrl === historyEntry.url ){
						//define back and forward by whether url is older or newer than current page
						back = i < urlHistory.activeIndex;
						forward = !back;
						newActiveIndex = i;
					}
				});

				// save new page index, null check to prevent falsey 0 result
				this.activeIndex = newActiveIndex !== undefined ? newActiveIndex : this.activeIndex;

				if( back ){
					opts.isBack();
				} else if( forward ){
					opts.isForward();
				}
			},

			//disable hashchange event listener internally to ignore one change
			//toggled internally when location.hash is updated to match the url of a successful page load
			ignoreNextHashChange: true
		},

		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",

		//contains role for next page, if defined on clicked link via data-rel
		nextPageRole = null,

		//queue to hold simultanious page transitions
		pageTransitionQueue = [],

		// indicates whether or not page is in process of transitioning
		isPageTransitioning = false,

		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog",

		//existing base tag?
		$base = $head.children("base"),
		hostURL = location.protocol + '//' + location.host,
		docLocation = path.get( hostURL + location.pathname ),
		docBase = docLocation;

		if ($base.length){
			var href = $base.attr("href");
			if (href){
				if (href.search(/^[^:\/]+:\/\/[^\/]+\/?/) === -1){
					//the href is not absolute, we need to turn it into one
					//so that we can turn paths stored in our location hash into
					//relative paths.
					if (href.charAt(0) === '/'){
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
			docBase = docBase  + (docBase.charAt(docBase.length - 1) === '/' ? ' ' : '/');
		}

		//base element management, defined depending on dynamic base tag support
		var base = $.support.dynamicBaseTag ? {

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
	}

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ){
		if( !!$activeClickedLink && (!$activeClickedLink.closest( '.ui-page-active' ).length || forceRemoval )){
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}

	//animation complete callback
	$.fn.animationComplete = function( callback ){
		if($.support.cssTransitions){
			return $(this).one('webkitAnimationEnd', callback);
		}
		else{
			// defer execution for consistency between webkit/non webkit
			setTimeout(callback, 0);
			return $(this);
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

	//enable cross-domain page support
	$.mobile.allowCrossDomainPages = false;

	// changepage function
	$.mobile.changePage = function( to, transition, reverse, changeHash, fromHashChange ){
		//from is always the currently viewed page
		var toIsArray = $.type(to) === "array",
			toIsObject = $.type(to) === "object",
			from = toIsArray ? to[0] : $.mobile.activePage;

			to = toIsArray ? to[1] : to;

		var url = $.type(to) === "string" ? path.stripHash( to ) : "",
			fileUrl = url,
			data,
			type = 'get',
			isFormRequest = false,
			duplicateCachedPage = null,
			currPage = urlHistory.getActive(),
			back = false,
			forward = false,
			pageTitle = document.title;


		// If we are trying to transition to the same page that we are currently on ignore the request.
		// an illegal same page request is defined by the current page being the same as the url, as long as there's history
		// and to is not an array or object (those are allowed to be "same")
		if( currPage && urlHistory.stack.length > 1 && currPage.url === url && !toIsArray && !toIsObject ) {
			return;
		}
		else if(isPageTransitioning) {
			pageTransitionQueue.unshift(arguments);
			return;
		}

		isPageTransitioning = true;

		// if the changePage was sent from a hashChange event guess if it came from the history menu
		// and match the transition accordingly
		if( fromHashChange ){
			urlHistory.directHashChange({
				currentUrl: url,
				isBack: function(){
					forward = !(back = true);
					reverse = true;
					transition = transition || currPage.transition;
				},
				isForward: function(){
					forward = !(back = false);
					transition = transition || urlHistory.getActive().transition;
				}
			});

			//TODO forward = !back was breaking for some reason
		}

		if( toIsObject && to.url ){
			url = to.url;
			data = to.data;
			type = to.type;
			isFormRequest = true;
			//make get requests bookmarkable
			if( data && type === 'get' ){
				if($.type( data ) === "object" ){
					data = $.param(data);
				}

				url += "?" + data;
				data = undefined;
			}
		}

		//reset base to pathname for new request
		if(base){ base.reset(); }

		//kill the keyboard
		if( window.document.activeElement ){
			$( window.document.activeElement || "" ).add( "input:focus, textarea:focus, select:focus" ).blur();
		}

		function defaultTransition(){
			if(transition === undefined){
				transition = ( nextPageRole && nextPageRole === 'dialog' ) ? 'pop' : $.mobile.defaultTransition;
			}
		}

		function releasePageTransitionLock(){
			isPageTransitioning = false;
			if(pageTransitionQueue.length>0) {
				$.mobile.changePage.apply($.mobile, pageTransitionQueue.pop());
			}
		}

		//function for transitioning between two existing pages
		function transitionPages() {
		    $.mobile.silentScroll();

			//get current scroll distance
			var currScroll = $window.scrollTop(),
					perspectiveTransitions = [ "flip" ],
					pageContainerClasses = [];

			//support deep-links to generated sub-pages
			if( url.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ){
				to = $( ":jqmData(url='" + url + "')" );
			}

			if( from ){
				//set as data for returning to that spot
				from.jqmData( "lastScroll", currScroll);
				//trigger before show/hide events
				from.data( "page" )._trigger( "beforehide", null, { nextPage: to } );
			}
			to.data( "page" )._trigger( "beforeshow", null, { prevPage: from || $("") } );

			function loadComplete(){

				if( changeHash !== false && url ){
					//disable hash listening temporarily
					urlHistory.ignoreNextHashChange = false;
					//update hash and history
					path.set( url );
				}

				//if title element wasn't found, try the page div data attr too
				var newPageTitle = to.jqmData("title") || to.find(".ui-header .ui-title" ).text();
				if( !!newPageTitle && pageTitle == document.title ){
					pageTitle = newPageTitle;
				}

				//add page to history stack if it's not back or forward
				if( !back && !forward ){
					urlHistory.addNew( url, transition, pageTitle, to );
				}

				//set page title
				document.title = urlHistory.getActive().title;

				removeActiveLinkClass();

				//jump to top or prev scroll, sometimes on iOS the page has not rendered yet.  I could only get by this with a setTimeout, but would like to avoid that.
				$.mobile.silentScroll( to.jqmData( "lastScroll" ) );

				reFocus( to );

				//trigger show/hide events
				if( from ){
					from.data( "page" )._trigger( "hide", null, { nextPage: to } );
				}
				//trigger pageshow, define prevPage as either from or empty jQuery obj
				to.data( "page" )._trigger( "show", null, { prevPage: from || $("") } );

				//set "to" as activePage
				$.mobile.activePage = to;

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if (duplicateCachedPage !== null) {
				    duplicateCachedPage.remove();
				}

				//remove initial build class (only present on first pageshow)
				$html.removeClass( "ui-mobile-rendering" );

				releasePageTransitionLock();
			}

			function addContainerClass(className){
				$.mobile.pageContainer.addClass(className);
				pageContainerClasses.push(className);
			}

			function removeContainerClasses(){
				$.mobile
					.pageContainer
					.removeClass(pageContainerClasses.join(" "));

				pageContainerClasses = [];
			}

			if(transition && (transition !== 'none')){
			    $.mobile.pageLoading( true );
				if( $.inArray(transition, perspectiveTransitions) >= 0 ){
					addContainerClass('ui-mobile-viewport-perspective');
				}

				addContainerClass('ui-mobile-viewport-transitioning');

				if( from ){
					from.addClass( transition + " out " + ( reverse ? "reverse" : "" ) );
				}
				to.addClass( $.mobile.activePageClass + " " + transition +
					" in " + ( reverse ? "reverse" : "" ) );

				// callback - remove classes, etc
				to.animationComplete(function() {
					to.add(from).removeClass("out in reverse " + transition );
					if( from ){
						from.removeClass( $.mobile.activePageClass );
					}
					loadComplete();
					removeContainerClasses();
				});
			}
			else{
			    $.mobile.pageLoading( true );
			    if( from ){
					from.removeClass( $.mobile.activePageClass );
				}
				to.addClass( $.mobile.activePageClass );
				loadComplete();
			}
		}

		//shared page enhancements
		function enhancePage(){

			//set next page role, if defined
			if ( nextPageRole || to.jqmData('role') === 'dialog' ) {
				url = urlHistory.getActive().url + dialogHashKey;
				if(nextPageRole){
					to.attr( "data-" + $.mobile.ns + "role", nextPageRole );
					nextPageRole = null;
				}
			}

			//run page plugin
			to.page();
		}

		//if url is a string
		if( url ){
			to = $( ":jqmData(url='" + url + "')" );
			fileUrl = path.getFilePath(url);
		}
		else{ //find base url of element, if avail
			var toID = to.attr( "data-" + $.mobile.ns + "url" ),
				toIDfileurl = path.getFilePath(toID);

			if(toID !== toIDfileurl){
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
				dataType: "html",
				success: function( html ) {
					//pre-parse html to check for a data-url,
					//use it as the new fileUrl, base path, etc
					var all = $("<div></div>"),
							redirectLoc,

							//page title regexp
							newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,

							// TODO handle dialogs again
							pageElemRegex = new RegExp(".*(<[^>]+\\bdata-" + $.mobile.ns + "role=[\"']?page[\"']?[^>]*>).*"),
							dataUrlRegex = new RegExp("\\bdata-" + $.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?");


					// data-url must be provided for the base tag so resource requests can be directed to the
					// correct url. loading into a temprorary element makes these requests immediately
					if(pageElemRegex.test(html) && RegExp.$1 && dataUrlRegex.test(RegExp.$1) && RegExp.$1) {
						redirectLoc = RegExp.$1;
					}

					if( redirectLoc ){
						if(base){
							base.set( redirectLoc );
						}
						url = fileUrl = path.getFilePath( redirectLoc );
					}
					else {
						if(base){
							base.set(fileUrl);
						}
					}

					//workaround to allow scripts to execute when included in page divs
					all.get(0).innerHTML = html;
					to = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

					//finally, if it's defined now, set the page title for storage in urlHistory
					if( newPageTitle ){
						pageTitle = newPageTitle;
					}

					//rewrite src and href attrs to use a base url
					if( !$.support.dynamicBaseTag ){
						var newPath = path.get( fileUrl );
						to.find( "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]" ).each(function(){
							var thisAttr = $(this).is('[href]') ? 'href' : 'src',
								thisUrl = $(this).attr(thisAttr);


							//if full path exists and is same, chop it - helps IE out
							thisUrl = thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

							if( !/^(\w+:|#|\/)/.test(thisUrl) ){
								$(this).attr(thisAttr, newPath + thisUrl);
							}
						});
					}

					//append to page and enhance
					to
						.attr( "data-" + $.mobile.ns + "url", fileUrl )
						.appendTo( $.mobile.pageContainer );

					enhancePage();
					setTimeout(function() { transitionPages(); }, 0);
				},
				error: function() {

					//remove loading message
					$.mobile.pageLoading( true );

					//clear out the active button state
					removeActiveLinkClass(true);

					//set base back to current path
					if( base ){
						base.set( path.get() );
					}

					//release transition lock so navigation is free again
					releasePageTransitionLock();

					//show error message
					$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ $.mobile.pageLoadErrorMessage +"</h1></div>")
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
	$( "form" ).live('submit', function(event){
		if( !$.mobile.ajaxEnabled ||
			//TODO: deprecated - remove at 1.0
			!$.mobile.ajaxFormsEnabled ||
			$(this).is( ":jqmData(ajax='false')" ) ){ return; }

		var type = $(this).attr("method"),
			url = path.clean( $(this).attr( "action" ) ),
			target = $(this).attr("target");

		//external submits use regular HTTP
		if( path.isExternal( url ) || target ){
			return;
		}

		//if it's a relative href, prefix href with base url
		if( path.isRelative( url ) ){
			url = path.makeAbsolute( url );
		}

		$.mobile.changePage({
				url: url.length && url || path.get(),
				type: type.length && type.toLowerCase() || "get",
				data: $(this).serialize()
			},
			$(this).jqmData("transition"),
			$(this).jqmData("direction"),
			true
		);
		event.preventDefault();
	});


	//click routing - direct to HTTP or Ajax, accordingly
	$( "a" ).live( "click", function(event) {

		var $this = $(this),

			//get href, if defined, otherwise fall to null #
			href = $this.attr( "href" ) || "#",

			//cache a check for whether the link had a protocol
			//if this is true and the link was same domain, we won't want
			//to prefix the url with a base (esp helpful in IE, where every
			//url is absolute
			hadProtocol = path.hasProtocol( href ),

			//get href, remove same-domain protocol and host
			url = path.clean( href ),

			//rel set to external
			isRelExternal = $this.is( "[rel='external']" ),

			//rel set to external
			isEmbeddedPage = path.isEmbeddedPage( url ),

			// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
			// requests if the document doing the request was loaded via the file:// protocol.
			// This is usually to allow the application to "phone home" and fetch app specific
			// data. We normally let the browser handle external/cross-domain urls, but if the
			// allowCrossDomainPages option is true, we will allow cross-domain http/https
			// requests to go through our page loading logic.
			isCrossDomainPageLoad = ($.mobile.allowCrossDomainPages && location.protocol === "file:" && url.search(/^https?:/) != -1),

			//check for protocol or rel and its not an embedded page
			//TODO overlap in logic from isExternal, rel=external check should be
			//     moved into more comprehensive isExternalLink
			isExternal = (path.isExternal(url) && !isCrossDomainPageLoad) || (isRelExternal && !isEmbeddedPage),

			//if target attr is specified we mimic _blank... for now
			hasTarget = $this.is( "[target]" ),

			//if data-ajax attr is set to false, use the default behavior of a link
			hasAjaxDisabled = $this.is( ":jqmData(ajax='false')" );

		//if there's a data-rel=back attr, go back in history
		if( $this.is( ":jqmData(rel='back')" ) ){
			window.history.back();
			return false;
		}

		//prevent # urls from bubbling
		//path.get() is replaced to combat abs url prefixing in IE
		if( url.replace(path.get(), "") == "#"  ){
			//for links created purely for interaction - ignore
			event.preventDefault();
			return;
		}

		$activeClickedLink = $this.closest( ".ui-btn" ).addClass( $.mobile.activeBtnClass );

		if( isExternal || hasAjaxDisabled || hasTarget || !$.mobile.ajaxEnabled ||
			// TODO: deprecated - remove at 1.0
			!$.mobile.ajaxLinksEnabled ){
			//remove active link class if external (then it won't be there if you come back)
			window.setTimeout(function() {removeActiveLinkClass(true);}, 200);

			//use default click handling
			return;
		}

		//use ajax
		var transition = $this.jqmData( "transition" ),
			direction = $this.jqmData("direction"),
			reverse = (direction && direction === "reverse") ||
			// deprecated - remove by 1.0
			$this.jqmData( "back" );

		//this may need to be more specific as we use data-rel more
		nextPageRole = $this.attr( "data-" + $.mobile.ns + "rel" );

		//if it's a relative href, prefix href with base url
		if( path.isRelative( url ) && !hadProtocol ){
			url = path.makeAbsolute( url );
		}

		url = path.stripHash( url );

		$.mobile.changePage( url, transition, reverse);
		event.preventDefault();
	});

	//hashchange event handler
	$window.bind( "hashchange", function( e, triggered ) {
		//find first page via hash
		var to = path.stripHash( location.hash ),
			//transition is false if it's the first page, undefined otherwise (and may be overridden by default)
			transition = $.mobile.urlHistory.stack.length === 0 ? false : undefined;

		//if listening is disabled (either globally or temporarily), or it's a dialog hash
		if( !$.mobile.hashListeningEnabled || !urlHistory.ignoreNextHashChange ){
			if( !urlHistory.ignoreNextHashChange ){
				urlHistory.ignoreNextHashChange = true;
			}

			return;
		}

		// special case for dialogs
		if( urlHistory.stack.length > 1 &&
				to.indexOf( dialogHashKey ) > -1 ){

			// If current active page is not a dialog skip the dialog and continue
			// in the same direction
			if(!$.mobile.activePage.is( ".ui-dialog" )) {
				//determine if we're heading forward or backward and continue accordingly past
				//the current dialog
				urlHistory.directHashChange({
					currentUrl: to,
					isBack: function(){ window.history.back(); },
					isForward: function(){ window.history.forward(); }
				});

				// prevent changepage
				return;
			} else {
				var setTo = function(){ to = $.mobile.urlHistory.getActive().page; };
				// if the current active page is a dialog and we're navigating
				// to a dialog use the dialog objected saved in the stack
				urlHistory.directHashChange({	currentUrl: to, isBack: setTo, isForward: setTo	});
			}
		}

		//if to is defined, load it
		if ( to ){
			$.mobile.changePage( to, transition, undefined, false, true );
		}
		//there's no hash, go to the first page in the dom
		else {
			$.mobile.changePage( $.mobile.firstPage, transition, true, false, true );
		}
		});

})( jQuery );
