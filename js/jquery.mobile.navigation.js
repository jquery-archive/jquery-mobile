/*
* jQuery Mobile Framework : core utilities for auto ajax navigation, base tag mgmt,
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

	//define vars for interal use
	var $window = $( window ),
		$html = $( 'html' ),
		$head = $( 'head' ),

		//url path helpers for use in relative url management
		path = {

			// This scary looking regular expression parses an absolute URL or its relative
			// variants (protocol, site, document, query, and hash), into the various
			// components (protocol, host, path, query, fragment, etc that make up the
			// URL as well as some other commonly used sub-parts. When used with RegExp.exec()
			// or String.match, it parses the URL into a results array that looks like this:
			//
			//     [0]: http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content
			//     [1]: http://jblas:password@mycompany.com:8080
			//     [2]: http:
			//     [3]: jblas:password@mycompany.com:8080
			//     [4]: jblas:password
			//     [5]: jblas
			//     [6]: password
			//     [7]: mycompany.com:8080
			//     [8]: mycompany.com
			//     [9]: 8080
			//    [10]: /mail/inbox
			//    [11]: /mail/
			//    [12]: inbox
			//    [13]: ?msg=1234&type=unread
			//    [14]: #msg-content
			//
			urlParseRE: /^(([^:\/#\?]+:)?\/\/((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?]+)(?:\:([0-9]+))?))?)?((\/?(?:[^\/\?#]+\/)*)([^\?#]*))?(\?[^#]+)?(#.*)?/,

			// Parse a URL into a structure that allows easy access to
			// all of the URL components by name.
			parseUrl: function( url ) {
				var u = url || "",
					matches = path.urlParseRE.exec(url),
					results;
				if ( matches ) {
					results = {
						href:      matches[0],
						domain:    matches[1],
						protocol:  matches[2],
						authority: matches[3],
						username:  matches[5],
						password:  matches[6],
						host:      matches[7],
						hostname:  matches[8],
						port:      matches[9],
						pathname:  matches[10],
						directory: matches[11],
						filename:  matches[12],
						search:    matches[13],
						hash:      matches[14]
					};
				}
				return results || {};
			},

			// Turn relPath into an asbolute path. absPath is
			// an optional absolute path which describes what
			// relPath is relative to.
			makePathAbsolute: function( relPath, absPath ) {
				if ( relPath && relPath.charAt( 0 ) === "/" ) {
					return relPath
				}
		
				relPath = relPath || "";
				absPath = absPath ? absPath.replace( /^\/|\/?[^\/]*$/g, "" ) : "";
		
				var absStack = absPath ? absPath.split( "/" ) : [],
					relStack = relPath.split("/");
				for ( var i = 0; i < relStack.length; i++ ) {
					var d = relStack[ i ];
					switch ( d ) {
						case ".":
							break;
						case "..":
							if ( absStack.length ) {
								absStack.pop();
							}
							break;
						default:
							absStack.push( d );
							break;
					}
				}
				return "/" + absStack.join( "/" );
			},

			// Returns true for any relative variant.
			isRelativeUrl: function( url ) {
				// All relative Url variants have one thing in common, no protocol.
				return path.parseUrl(url).protocol === undefined;
			},

			// Turn the specified realtive URL into an absolute one. This function
			// can handle all relative variants (protocol, site, document, query, fragment).
			makeUrlAbsolute: function( relUrl, absUrl ) {
				if ( !path.isRelativeUrl( relUrl ) ) {
					return relUrl;
				}
		
				var relObj = path.parseUrl( relUrl ),
					absObj = path.parseUrl( absUrl ),
					protocol = relObj.protocol || absObj.protocol,
					authority = relObj.authority || absObj.authority || "",
					hasPath = relObj.pathname !== undefined,
					pathname = path.makePathAbsolute( relObj.pathname || absObj.filename, absObj.pathname ),
					search = relObj.search || ( !hasPath && absObj.search ) || "",
					hash = relObj.hash || "";
		
				return protocol + "//" + authority + pathname + search + hash;
			},

			//get path from current hash, or from a file path
			get: function( newPath ) {
				if( newPath === undefined ) {
					newPath = location.hash;
				}
				return path.stripHash( newPath ).replace( /[^\/]*\.[^\/*]+$/, '' );
			},

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ) {
				var splitkey = '&' + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},

			//set location hash to path
			set: function( path ) {
				location.hash = path;
			},

			//location pathname from intial directory request
			origin: '',

			setOrigin: function() {
				path.origin = path.get( location.protocol + '//' + location.host + location.pathname );
			},

			// prefix a relative url with the current path
			// TODO force old relative deeplinks into new absolute path
			makeAbsolute: function( url ) {
				var isHashPath = path.isPath( location.hash );

				if( path.isQuery( url ) ) {
					// if the path is a list of query params and the hash is a path
					// append the query params to the hash (without params or dialog keys).
					// otherwise use the pathname and append the query params
					return ( isHashPath ? path.cleanHash( location.hash ) : location.pathname ) + url;
				}

				// If the hash is a path, even if its not absolute, use it to prepend to the url
				// otherwise use the path with the trailing segement removed
				return ( isHashPath ? path.get() : path.get( location.pathname ) ) + url;
			},

			// test if a given url (string) is a path
			// NOTE might be exceptionally naive
			isPath: function( url ) {
				return /\//.test( url );
			},

			isQuery: function( url ) {
				return /^\?/.test( url );
			},

			//return a url path with the window's location protocol/hostname/pathname removed
			clean: function( url ) {
				// Replace the protocol host only once at the beginning of the url to avoid
				// problems when it's included as a part of a param
				var leadingUrlRootRegex = new RegExp("^" + location.protocol + "//" + location.host );
				return url.replace( leadingUrlRootRegex, "" );
			},

			//just return the url without an initial #
			stripHash: function( url ) {
				return url.replace( /^#/, "" );
			},

			//remove the preceding hash, any query params, and dialog notations
			cleanHash: function( hash ) {
				return path.stripHash( hash.replace( /\?.*$/, "" ).replace( dialogHashKey, "" ) );
			},

			//check whether a url is referencing the same domain, or an external domain or different protocol
			//could be mailto, etc
			isExternal: function( url ) {
				return path.hasProtocol( path.clean( url ) );
			},

			hasProtocol: function( url ) {
				return (/^(:?\w+:)/).test( url );
			},

			//check if the url is relative
			isRelative: function( url ) {
				return  (/^[^\/|#]/).test( url ) && !path.hasProtocol( url );
			},

			isEmbeddedPage: function( url ) {
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
			getActive: function() {
				return urlHistory.stack[ urlHistory.activeIndex ];
			},

			getPrev: function() {
				return urlHistory.stack[ urlHistory.activeIndex - 1 ];
			},

			getNext: function() {
				return urlHistory.stack[ urlHistory.activeIndex + 1 ];
			},

			// addNew is used whenever a new page is added
			addNew: function( url, transition, title, storedTo ) {
				//if there's forward history, wipe it
				if( urlHistory.getNext() ) {
					urlHistory.clearForward();
				}

				urlHistory.stack.push( {url : url, transition: transition, title: title, page: storedTo } );

				urlHistory.activeIndex = urlHistory.stack.length - 1;
			},

			//wipe urls ahead of active index
			clearForward: function() {
				urlHistory.stack = urlHistory.stack.slice( 0, urlHistory.activeIndex + 1 );
			},

			directHashChange: function( opts ) {
				var back , forward, newActiveIndex;

				// check if url isp in history and if it's ahead or behind current page
				$.each( urlHistory.stack, function( i, historyEntry ) {

					//if the url is in the stack, it's a forward or a back
					if( opts.currentUrl === historyEntry.url ) {
						//define back and forward by whether url is older or newer than current page
						back = i < urlHistory.activeIndex;
						forward = !back;
						newActiveIndex = i;
					}
				});

				// save new page index, null check to prevent falsey 0 result
				this.activeIndex = newActiveIndex !== undefined ? newActiveIndex : this.activeIndex;

				if( back ) {
					opts.isBack();
				} else if( forward ) {
					opts.isForward();
				}
			},

			//disable hashchange event listener internally to ignore one change
			//toggled internally when location.hash is updated to match the url of a successful page load
			ignoreNextHashChange: false
		},

		//define first selector to receive focus when a page is shown
		focusable = "[tabindex],a,button:visible,select:visible,input",

		//queue to hold simultanious page transitions
		pageTransitionQueue = [],

		// indicates whether or not page is in process of transitioning
		isPageTransitioning = false,

		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog",

		//existing base tag?
		$base = $head.children( "base" ),

		//tuck away the original document URL
		documentUrl = location.href,

		//extract out the domain and path of the documentUrl
		documentDomainPath = documentUrl.replace(/[\?#].*/, ""),

		//if the document has an embedded base tag, documentBase is set to its
		//initial value. If a base tag does not exist, then we default to the documentDomainPath.
		documentBase = $base.length ? path.makeUrlAbsolute( $base.attr( "href" ), documentDomainPath ) : documentDomainPath;

		//base element management, defined depending on dynamic base tag support
		var base = $.support.dynamicBaseTag ? {

			//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
			element: ( $base.length ? $base : $( "<base>", { href: documentBase } ).prependTo( $head ) ),

			//set the generated BASE element's href attribute to a new page's base path
			set: function( href ) {
				base.element.attr( "href", path.makeUrlAbsolute( href, documentBase ) );
			},

			//set the generated BASE element's href attribute to a new page's base path
			reset: function() {
				base.element.attr( "href", documentBase );
			}

		} : undefined;

		//set location pathname from intial directory request
		path.setOrigin();

/*
	internal utility functions
--------------------------------------*/


	//direct focus to the page title, or otherwise first focusable element
	function reFocus( page ) {
		var lastClicked = page.jqmData( "lastClicked" );

		if( lastClicked && lastClicked.length ) {
			lastClicked.focus();
		}
		else {
			var pageTitle = page.find( ".ui-title:eq(0)" );

			if( pageTitle.length ) {
				pageTitle.focus();
			}
			else{
				page.find( focusable ).eq( 0 ).focus();
			}
		}
	}

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ) {
		if( !!$activeClickedLink && (!$activeClickedLink.closest( '.ui-page-active' ).length || forceRemoval )) {
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}

	function releasePageTransitionLock() {
		isPageTransitioning = false;
		if( pageTransitionQueue.length > 0 ) {
			$.mobile.changePage.apply(null, pageTransitionQueue.pop());
		}
	}

	//function for transitioning between two existing pages
	function transitionPages( toPage, fromPage, transition, reverse ) {
		$.mobile.silentScroll();

		//get current scroll distance
		var currScroll = $window.scrollTop();

		if( fromPage ) {
			//set as data for returning to that spot
			fromPage
				.jqmData( "lastScroll", currScroll )
				.jqmData( "lastClicked", $activeClickedLink );
			//trigger before show/hide events
			fromPage.data( "page" )._trigger( "beforehide", null, { nextPage: toPage } );
		}
		toPage.data( "page" )._trigger( "beforeshow", null, { prevPage: fromPage || $( "" ) } );

		//clear page loader
		$.mobile.hidePageLoadingMsg();

		//find the transition handler for the specified transition. If there
		//isn't one in our transitionHandlers dictionary, use the default one.
		//call the handler immediately to kick-off the transition.
		var th = $.mobile.transitionHandlers[transition || "none"] || $.mobile.defaultTransitionHandler,
			promise = th( transition, reverse, toPage, fromPage );

		promise.done(function() {
			//jump to top or prev scroll, sometimes on iOS the page has not rendered yet.
			$.mobile.silentScroll( toPage.jqmData( "lastScroll" ) || 0 );
			$( document ).one( "silentscroll", function() { reFocus( toPage ); } );

			//trigger show/hide events
			if( fromPage ) {
				fromPage.data( "page" )._trigger( "hide", null, { nextPage: toPage } );
			}
			//trigger pageshow, define prevPage as either fromPage or empty jQuery obj
			toPage.data( "page" )._trigger( "show", null, { prevPage: fromPage || $( "" ) } );

		});

		return promise;
	}

	//shared page enhancements
	function enhancePage( $page, role ) {
		// If a role was specified, make sure the data-role attribute
		// on the page element is in sync.
		if( role ) {
			$page.attr( "data-" + $.mobile.ns + "role", role );
		}

		//run page plugin
		$page.page();
	}

/* exposed $.mobile methods	 */

	//animation complete callback
	$.fn.animationComplete = function( callback ) {
		if( $.support.cssTransitions ) {
			return $( this ).one( 'webkitAnimationEnd', callback );
		}
		else{
			// defer execution for consistency between webkit/non webkit
			setTimeout( callback, 0 );
			return $( this );
		}
	};

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

	//default non-animation transition handler
	$.mobile.noneTransitionHandler = function( name, reverse, $toPage, $fromPage ) {
		if ( $fromPage ) {
			$fromPage.removeClass( $.mobile.activePageClass );
		}
		$toPage.addClass( $.mobile.activePageClass );

		return $.Deferred().resolve( name, reverse, $toPage, $fromPage ).promise();
	};

	//default handler for unknown transitions
	$.mobile.defaultTransitionHandler = $.mobile.noneTransitionHandler;

	//transition handler dictionary for 3rd party transitions
	$.mobile.transitionHandlers = {
		none: $.mobile.defaultTransitionHandler
	};

	//enable cross-domain page support
	$.mobile.allowCrossDomainPages = false;

	// Load a page into the DOM.
	$.mobile.loadPage = function( url, options ) {
		// This function uses deferred notifications to let callers
		// know when the page is done loading, or if an error has occurred.
		var deferred = $.Deferred(),

			// The default loadPage options with overrides specified by
			// the caller.
			settings = $.extend( {}, $.mobile.loadPage.defaults, options ),

			// The absolute version of the URL passed into the function. This
			// version of the URL may contain dialog/subpage params in it.
			absUrl = path.stripHash( url ), // XXX_jblas: path.makeAbsolute( url ),

			// The absolute version of the URL minus any dialog/subpage params.
			// In otherwords the real URL of the page to be loaded.
			fileUrl = path.getFilePath( absUrl ),

			// The DOM element for the page after it has been loaded.
			page = null,

			// If the reloadPage option is true, and the page is already
			// in the DOM, dupCachedPage will be set to the page element
			// so that it can be removed after the new version of the
			// page is loaded off the network.
			dupCachedPage = null;

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// If the caller provided data, and we're using "get" request,
		// append the data to the URL.
		if ( settings.data && settings.type === "get" ) {
			if ( $.type( settings.data ) === "object" ) {
				settings.data = $.param( settings.data );
			}
			// XXX_jblas: We should be checking to see if the url already has a query in it.
			absUrl += absUrl + "?" + settings.data;
			settings.data = undefined;
			fileUrl = path.getFilePath( absUrl );
		}

		// Check to see if the page already exists in the DOM.
		page = settings.pageContainer.children( ":jqmData(url='" + absUrl + "')" );

		// Reset base to the default document base.
		if ( base ) {
			base.reset();
		}

		// If the page we are interested in is already in the DOM,
		// and the caller did not indicate that we should force a
		// reload of the file, we are done. Otherwise, track the
		// existing page as a duplicated.
		if ( page.length ) {
			if ( !settings.reloadPage ) {
				enhancePage( page, settings.role );
				deferred.resolve( absUrl, options, page );
				return deferred.promise();
			}
			dupCachedPage = page;
		}

		if ( settings.showLoadMsg ) {
			$.mobile.showPageLoadingMsg();
		}

		// Load the new page.
		$.ajax({
			url: fileUrl,
			type: settings.type,
			data: settings.data,
			dataType: "html",
			success: function( html ) {
				//pre-parse html to check for a data-url,
				//use it as the new fileUrl, base path, etc
				var all = $( "<div></div>" ),

						//page title regexp
						newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,

						// TODO handle dialogs again
						pageElemRegex = new RegExp( ".*(<[^>]+\\bdata-" + $.mobile.ns + "role=[\"']?page[\"']?[^>]*>).*" ),
						dataUrlRegex = new RegExp( "\\bdata-" + $.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?" );


				// data-url must be provided for the base tag so resource requests can be directed to the
				// correct url. loading into a temprorary element makes these requests immediately
				if( pageElemRegex.test( html )
						&& RegExp.$1
						&& dataUrlRegex.test( RegExp.$1 )
						&& RegExp.$1 ) {
					url = fileUrl = path.getFilePath( RegExp.$1 );
				}

				if ( base ) {
					base.set( fileUrl );
				}

				//workaround to allow scripts to execute when included in page divs
				all.get( 0 ).innerHTML = html;
				page = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

				if ( newPageTitle && !page.jqmData( "title" ) ) {
					page.jqmData( "title", newPageTitle );
				}

				//rewrite src and href attrs to use a base url
				if( !$.support.dynamicBaseTag ) {
					var newPath = path.get( fileUrl );
					page.find( "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]" ).each(function() {
						var thisAttr = $( this ).is( '[href]' ) ? 'href' : 'src',
							thisUrl = $( this ).attr( thisAttr );

						// XXX_jblas: We need to fix this so that it removes the document
						//            base URL, and then prepends with the new page URL.
						//if full path exists and is same, chop it - helps IE out
						thisUrl = thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

						if( !/^(\w+:|#|\/)/.test( thisUrl ) ) {
							$( this ).attr( thisAttr, newPath + thisUrl );
						}
					});
				}

				//append to page and enhance
				page
					.attr( "data-" + $.mobile.ns + "url", fileUrl )
					.appendTo( settings.pageContainer );

				enhancePage( page, settings.role );

				// Enhancing the page may result in new dialogs/sub pages being inserted
				// into the DOM. If the original absUrl refers to a sub-page, that is the
				// real page we are interested in.
				if ( absUrl.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ) {
					page = settings.pageContainer.children( ":jqmData(url='" + absUrl + "')" );
				}

				// Remove loading message.
				if ( settings.showLoadMsg ) {
					$.mobile.hidePageLoadingMsg();
				}

				deferred.resolve( absUrl, options, page, dupCachedPage );
			},
			error: function() {
				//set base back to current path
				if( base ) {
					base.set( path.get() );
				}

				// Remove loading message.
				if ( settings.showLoadMsg ) {
					$.mobile.hidePageLoadingMsg();

					//show error message
					$( "<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>"+ $.mobile.pageLoadErrorMessage +"</h1></div>" )
						.css({ "display": "block", "opacity": 0.96, "top": $window.scrollTop() + 100 })
						.appendTo( settings.pageContainer )
						.delay( 800 )
						.fadeOut( 400, function() {
							$( this ).remove();
						});
				}

				deferred.reject( absUrl, options );
			}
		});

		return deferred.promise();
	};

	$.mobile.loadPage.defaults = {
		type: "get",
		data: undefined,
		reloadPage: false,
		role: "page",
		showLoadMsg: true,
		pageContainer: undefined
	};

	// Show a specific page in the page container.
	$.mobile.changePage = function( toPage, options ) {
		// XXX: REMOVE_BEFORE_SHIPPING_1.0
		// This is temporary code that makes changePage() compatible with previous alpha versions.
		if ( typeof options !== "object" ) {
			var opts = null;

			// Map old-style call signature for form submit to the new options object format.
			if ( typeof toPage === "object" && toPage.url && toPage.type ) {
				opts = {
					type: toPage.type,
					data: toPage.data,
					forcePageLoad: true
				};
				toPage = toPage.url;
			}

			// The arguments passed into the function need to be re-mapped
			// to the new options object format.
			var len = arguments.length;
			if ( len > 1 ) {
				var argNames = [ "transition", "reverse", "changeHash", "fromHashChange" ], i;
				for ( i = 1; i < len; i++ ) {
					var a = arguments[ i ];
					if ( typeof a !== "undefined" ) {
						opts = opts || {};
						opts[ argNames[ i - 1 ] ] = a;
					}
				}
			}

			// If an options object was created, then we know changePage() was called
			// with an old signature.
			if ( opts ) {
				return $.mobile.changePage( toPage, opts );
			}
		}
		// XXX: REMOVE_BEFORE_SHIPPING_1.0

		// If we are in the midst of a transition, queue the current request.
		// We'll call changePage() once we're done with the current transition to
		// service the request.
		if( isPageTransitioning ) {
			pageTransitionQueue.unshift( arguments );
			return;
		}

		// Set the isPageTransitioning flag to prevent any requests from
		// entering this method while we are in the midst of loading a page
		// or transitioning.

		isPageTransitioning = true;

		var settings = $.extend( {}, $.mobile.changePage.defaults, options );

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// If the caller passed us a url, call loadPage()
		// to make sure it is loaded into the DOM. We'll listen
		// to the promise object it returns so we know when
		// it is done loading or if an error ocurred.
		if ( typeof toPage == "string" ) {
			var promise = $.mobile.loadPage( toPage, settings );
			if ( promise ) {
				promise
					.done(function( url, options, newPage, dupCachedPage ) {
						isPageTransitioning = false;
						options.duplicateCachedPage = dupCachedPage
						$.mobile.changePage( newPage, options );
					})
					.fail(function( url, options ) {
						// XXX_jblas: Fire off changepagefailed notificaiton.
						isPageTransitioning = false;

						//clear out the active button state
						removeActiveLinkClass( true );

						//release transition lock so navigation is free again
						releasePageTransitionLock();
					});
				return;
			}
		}

		// The caller passed us a real page DOM element. Update our
		// internal state and then trigger a transition to the page.
		var mpc = settings.pageContainer,
			fromPage = $.mobile.activePage,
			url = toPage.jqmData( "url" ),
			fileUrl = path.getFilePath( url ),
			active = urlHistory.getActive(),
			historyDir = 0,
			pageTitle = document.title,
			isDialog = settings.role === "dialog" || toPage.jqmData( "role" ) === "dialog";

		// Let listeners know we're about to change the current page.
		mpc.trigger( "beforechangepage" );

		// If we are trying to transition to the same page that we are currently on ignore the request.
		// an illegal same page request is defined by the current page being the same as the url, as long as there's history
		// and toPage is not an array or object (those are allowed to be "same")
		//
		// XXX_jblas: We need to remove this at some point when we allow for transitions
		//            to the same page.
		if( active && active.page[0] === toPage[0] ) {
			isPageTransitioning = false;
			return;
		}

		// We need to make sure the page we are given has already been enhanced.
		enhancePage( toPage, settings.role );

		// If the changePage request was sent from a hashChange event, check to see if the
		// page is already within the urlHistory stack. If so, we'll assume the user hit
		// the forward/back button and will try to match the transition accordingly.
		if( settings.fromHashChange ) {
			urlHistory.directHashChange({
				currentUrl:	url,
				isBack:		function() { historyDir = -1; },
				isForward:	function() { historyDir = 1; }
			});
		}

		// Kill the keyboard.
		// XXX_jblas: We need to stop crawling the entire document to kill focus. Instead,
		//            we should be tracking focus with a live() handler so we already have
		//            the element in hand at this point.
		$( document.activeElement || "" ).add( "input:focus, textarea:focus, select:focus" ).blur();

		// If we're displaying the page as a dialog, we don't want the url
		// for the dialog content to be used in the hash. Instead, we want
		// to append the dialogHashKey to the url of the current page.
		if ( isDialog && active ) {
			url = active.url + dialogHashKey;
		}

		// Set the location hash.
		if( settings.changeHash !== false && url ) {
			//disable hash listening temporarily
			urlHistory.ignoreNextHashChange = true;
			//update hash and history
			path.set( url );
		}

		//if title element wasn't found, try the page div data attr too
		var newPageTitle = toPage.jqmData( "title" ) || toPage.children(":jqmData(role='header')").find(".ui-title" ).text();
		if( !!newPageTitle && pageTitle == document.title ) {
			pageTitle = newPageTitle;
		}

		//add page to history stack if it's not back or forward
		if( !historyDir ) {
			urlHistory.addNew( url, settings.transition, pageTitle, toPage );
		}

		//set page title
		document.title = urlHistory.getActive().title;

		//set "toPage" as activePage
		$.mobile.activePage = toPage;

		// Make sure we have a transition defined.
		settings.transition = settings.transition
			|| ( historyDir ? active.transition : undefined )
			|| ( settings.role === "dialog" ? $.mobile.defaultDialogTransition : $.mobile.defaultPageTransition );

		// If we're navigating back in the URL history, set reverse accordingly.
		settings.reverse = settings.reverse || historyDir < 0;

		var promise = transitionPages( toPage, fromPage, settings.transition, settings.reverse, settings.changeHash );

		promise.done(function() {
			removeActiveLinkClass();

			//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
			if ( settings.duplicateCachedPage ) {
				settings.duplicateCachedPage.remove();
			}

			//remove initial build class (only present on first pageshow)
			$html.removeClass( "ui-mobile-rendering" );

			releasePageTransitionLock();


			// Let listeners know we're all done changing the current page.
			mpc.trigger( "changepage" );
		});
	};

	$.mobile.changePage.defaults = {
		transition: undefined,
		reverse: false,
		changeHash: true,
		fromHashChange: false,
		role: "page",
		duplicateCachedPage: undefined,
		pageContainer: undefined
	};

/* Event Bindings - hashchange, submit, and click */

	//bind to form submit events, handle with Ajax
	$( "form" ).live('submit', function( event ) {
		var $this = $( this );
		if( !$.mobile.ajaxEnabled ||
			$this.is( ":jqmData(ajax='false')" ) ) {
				return;
			}

		var type = $this.attr( "method" ),
			url = path.clean( $this.attr( "action" ) ),
			target = $this.attr( "target" );

		//external submits use regular HTTP
		if( path.isExternal( url ) || target ) {
			return;
		}

		//if it's a relative href, prefix href with base url
		if( path.isRelative( url ) ) {
			url = path.makeAbsolute( url );
		}

		$.mobile.changePage(
			url.length && url || path.get(),
			{
				type:		type.length && type.toLowerCase() || "get",
				data:		$this.serialize(),
				transition:	$this.jqmData( "transition" ),
				direction:	$this.jqmData( "direction" ),
				reloadPage:	true
			}
		);
		event.preventDefault();
	});

	function findClosestLink( ele )
	{
		while ( ele ) {
			if ( ele.nodeName.toLowerCase() == "a" ) {
				break;
			}
			ele = ele.parentNode;
		}
		return ele;
	}

	// The base URL for any given element depends on the page it resides in.
	function getClosestBaseUrl( ele )
	{
		// Find the closest page and extract out its url.
		var url = $( ele ).closest( ".ui-page" ).jqmData( "url" );

		// If the data-url is an id instead of a path, default to using
		// the documentBase.
		if ( url && !path.isPath( url ) ) {
			url = documentBase;
		}

		return path.makeUrlAbsolute( ( url && !path.isPath( url ) ) ? url : documentBase, documentBase);
	}

	//add active state on vclick
	$( document ).bind( "vclick", function( event ) {
		var link = findClosestLink( event.target );
		if ( link ) {
			if ( path.parseUrl( link.getAttribute( "href" ) || "#" ).hash !== "#" ) {
				$( link ).closest( ".ui-btn" ).not( ".ui-disabled" ).addClass( $.mobile.activeBtnClass );
			}
		}
	});


	//click routing - direct to HTTP or Ajax, accordingly
	$( document ).bind( "click", function( event ) {
		var link = findClosestLink( event.target );
		if ( !link ) {
			return;
		}

		var $link = $( link ),

			//get href, if defined, otherwise fall to null #
			href = $link.attr( "href" ) || "#",

			//cache a check for whether the link had a protocol
			//if this is true and the link was same domain, we won't want
			//to prefix the url with a base (esp helpful in IE, where every
			//url is absolute
			hadProtocol = path.hasProtocol( href ),

			//get href, remove same-domain protocol and host
			url = path.clean( href ),

			//rel set to external
			isRelExternal = $link.is( "[rel='external']" ),

			//rel set to external
			isEmbeddedPage = path.isEmbeddedPage( url ),

			// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
			// requests if the document doing the request was loaded via the file:// protocol.
			// This is usually to allow the application to "phone home" and fetch app specific
			// data. We normally let the browser handle external/cross-domain urls, but if the
			// allowCrossDomainPages option is true, we will allow cross-domain http/https
			// requests to go through our page loading logic.
			isCrossDomainPageLoad = ( $.mobile.allowCrossDomainPages && location.protocol === "file:" && url.search( /^https?:/ ) != -1 ),

			//check for protocol or rel and its not an embedded page
			//TODO overlap in logic from isExternal, rel=external check should be
			//     moved into more comprehensive isExternalLink
			isExternal = ( path.isExternal( url ) && !isCrossDomainPageLoad ) || ( isRelExternal && !isEmbeddedPage ),

			//if target attr is specified we mimic _blank... for now
			hasTarget = $link.is( "[target]" ),

			//if data-ajax attr is set to false, use the default behavior of a link
			hasAjaxDisabled = $link.is( ":jqmData(ajax='false')" );

alert("a: " + $link.attr("href") + "\np: " + $link.prop("href") + "\nd: " + $link.closest(".ui-page").jqmData("url") + "\nb: " + getClosestBaseUrl($link) + "\nc: " + path.makeUrlAbsolute($link.attr("href"), getClosestBaseUrl($link)));
		//if there's a data-rel=back attr, go back in history
		if( $link.is( ":jqmData(rel='back')" ) ) {
			window.history.back();
			return false;
		}

		//prevent # urls from bubbling
		//path.get() is replaced to combat abs url prefixing in IE
		if( url.replace( path.get(), "" ) == "#" ) {
			//for links created purely for interaction - ignore
			event.preventDefault();
			return;
		}

		$activeClickedLink = $link.closest( ".ui-btn" );

		if( isExternal || hasAjaxDisabled || hasTarget || !$.mobile.ajaxEnabled ) {
			//remove active link class if external (then it won't be there if you come back)
			window.setTimeout( function() { removeActiveLinkClass( true ); }, 200 );

			//use default click handling
			return;
		}

		//use ajax
		var transition = $link.jqmData( "transition" ),
			direction = $link.jqmData( "direction" ),
			reverse = ( direction && direction === "reverse" ) ||
			// deprecated - remove by 1.0
			$link.jqmData( "back" ),

			//this may need to be more specific as we use data-rel more
			role = $link.attr( "data-" + $.mobile.ns + "rel" ) || "page";

		//if it's a relative href, prefix href with base url
		if( path.isRelative( url ) && !hadProtocol ) {
			url = path.makeAbsolute( url );
		}

		url = path.stripHash( url );

		$.mobile.changePage( url, { transition: transition, reverse: reverse, role: role } );
		event.preventDefault();
	});

	//hashchange event handler
	$window.bind( "hashchange", function( e, triggered ) {
		//find first page via hash
		var to = path.stripHash( location.hash ),
			//transition is false if it's the first page, undefined otherwise (and may be overridden by default)
			transition = $.mobile.urlHistory.stack.length === 0 ? "none" : undefined;

		//if listening is disabled (either globally or temporarily), or it's a dialog hash
		if( !$.mobile.hashListeningEnabled || urlHistory.ignoreNextHashChange ) {
			urlHistory.ignoreNextHashChange = false;
			return;
		}

		// special case for dialogs
		if( urlHistory.stack.length > 1 &&
				to.indexOf( dialogHashKey ) > -1 ) {

			// If current active page is not a dialog skip the dialog and continue
			// in the same direction
			if(!$.mobile.activePage.is( ".ui-dialog" )) {
				//determine if we're heading forward or backward and continue accordingly past
				//the current dialog
				urlHistory.directHashChange({
					currentUrl: to,
					isBack: function() { window.history.back(); },
					isForward: function() { window.history.forward(); }
				});

				// prevent changepage
				return;
			} else {
				var setTo = function() { to = $.mobile.urlHistory.getActive().page; };
				// if the current active page is a dialog and we're navigating
				// to a dialog use the dialog objected saved in the stack
				urlHistory.directHashChange({	currentUrl: to, isBack: setTo, isForward: setTo	});
			}
		}

		//if to is defined, load it
		if ( to ) {
			$.mobile.changePage( to, { transition: transition, changeHash: false, fromHashChange: true } );
		}
		//there's no hash, go to the first page in the dom
		else {
			$.mobile.changePage( $.mobile.firstPage, { transition: transition, changeHash: false, fromHashChange: true } );
		}
	});

})( jQuery );
