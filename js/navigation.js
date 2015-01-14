//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies the AJAX navigation system to links and forms to enable page transitions
//>>label: Content Management
//>>group: Navigation
define( [
	"jquery",
	"./core",
	"./navigation/path",
	"./events/navigate",
	"./navigation/history",
	"./navigation/navigator",
	"./navigation/method",
	"./support",
	"./animationComplete",
	"./widgets/pagecontainer",
	"./widgets/page",
	"./transitions/handlers" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

		// resolved on domready
	var domreadyDeferred = $.Deferred(),

		// resolved and nulled on window.load()
		loadDeferred = $.Deferred(),

		// function that resolves the above deferred
		pageIsFullyLoaded = function() {

			// Resolve and null the deferred
			loadDeferred.resolve();
			loadDeferred = null;
		},

		path = $.mobile.path,
		documentUrl = path.documentUrl,

		// used to track last vclicked element to make sure its value is added to form data
		$lastVClicked = null;

	/* Event Bindings - hashchange, submit, and click */
	function findClosestLink( ele )	{
		while ( ele ) {
			// Look for the closest element with a nodeName of "a".
			// Note that we are checking if we have a valid nodeName
			// before attempting to access it. This is because the
			// node we get called with could have originated from within
			// an embedded SVG document where some symbol instance elements
			// don't have nodeName defined on them, or strings are of type
			// SVGAnimatedString.
			if ( ( typeof ele.nodeName === "string" ) && ele.nodeName.toLowerCase() === "a" ) {
				break;
			}
			ele = ele.parentNode;
		}
		return ele;
	}

	$.mobile.loadPage = function( url, opts ) {
		var container;

		opts = opts || {};
		container = ( opts.pageContainer || $.mobile.pageContainer );

		// create the deferred that will be supplied to loadPage callers
		// and resolved by the content widget's load method
		opts.deferred = $.Deferred();

		// Preferring to allow exceptions for uninitialized opts.pageContainer
		// widgets so we know if we need to force init here for users
		container.pagecontainer( "load", url, opts );

		// provide the deferred
		return opts.deferred.promise();
	};

	//define vars for interal use

	/* internal utility functions */

	// NOTE Issue #4950 Android phonegap doesn't navigate back properly
	//      when a full page refresh has taken place. It appears that hashchange
	//      and replacestate history alterations work fine but we need to support
	//      both forms of history traversal in our code that uses backward history
	//      movement
	$.mobile.back = function() {
		var nav = window.navigator;

		// if the setting is on and the navigator object is
		// available use the phonegap navigation capability
		if ( this.phonegapNavigationEnabled &&
			nav &&
			nav.app &&
			nav.app.backHistory ) {
			nav.app.backHistory();
		} else {
			$.mobile.pageContainer.pagecontainer( "back" );
		}
	};

	// Direct focus to the page title, or otherwise first focusable element
	$.mobile.focusPage = function ( page ) {
		var autofocus = page.find( "[autofocus]" ),
			pageTitle = page.find( ".ui-title:eq(0)" );

		if ( autofocus.length ) {
			autofocus.focus();
			return;
		}

		if ( pageTitle.length ) {
			pageTitle.focus();
		} else{
			page.focus();
		}
	};

	// No-op implementation of transition degradation
	$.mobile._maybeDegradeTransition = $.mobile._maybeDegradeTransition || function( transition ) {
		return transition;
	};

	// Exposed $.mobile methods

	$.mobile.changePage = function( to, options ) {
		$.mobile.pageContainer.pagecontainer( "change", to, options );
	};

	$.mobile.changePage.defaults = {
		transition: undefined,
		reverse: false,
		changeHash: true,
		fromHashChange: false,
		role: undefined, // By default we rely on the role defined by the @data-role attribute.
		duplicateCachedPage: undefined,
		pageContainer: undefined,
		showLoadMsg: true, //loading message shows by default when pages are being fetched during changePage
		dataUrl: undefined,
		fromPage: undefined,
		allowSamePageTransition: false
	};

	$.mobile._registerInternalEvents = function() {
		var getAjaxFormData = function( $form, calculateOnly ) {
			var url, ret = true, formData, vclickedName, method;
			if ( !$.mobile.ajaxEnabled ||
					// test that the form is, itself, ajax false
					$form.is( ":jqmData(ajax='false')" ) ||
					// test that $.mobile.ignoreContentEnabled is set and
					// the form or one of it's parents is ajax=false
					!$form.jqmHijackable().length ||
					$form.attr( "target" ) ) {
				return false;
			}

			url = ( $lastVClicked && $lastVClicked.attr( "formaction" ) ) ||
				$form.attr( "action" );
			method = ( $form.attr( "method" ) || "get" ).toLowerCase();

			// If no action is specified, browsers default to using the
			// URL of the document containing the form. Since we dynamically
			// pull in pages from external documents, the form should submit
			// to the URL for the source document of the page containing
			// the form.
			if ( !url ) {
				// Get the @data-url for the page containing the form.
				url = $.mobile.getClosestBaseUrl( $form );

				// NOTE: If the method is "get", we need to strip off the query string
				// because it will get replaced with the new form data. See issue #5710.
				if ( method === "get" ) {
					url = path.parseUrl( url ).hrefNoSearch;
				}

				if ( url === path.documentBase.hrefNoHash ) {
					// The url we got back matches the document base,
					// which means the page must be an internal/embedded page,
					// so default to using the actual document url as a browser
					// would.
					url = documentUrl.hrefNoSearch;
				}
			}

			url = path.makeUrlAbsolute(  url, $.mobile.getClosestBaseUrl( $form ) );

			if ( ( path.isExternal( url ) && !path.isPermittedCrossDomainRequest( documentUrl, url ) ) ) {
				return false;
			}

			if ( !calculateOnly ) {
				formData = $form.serializeArray();

				if ( $lastVClicked && $lastVClicked[ 0 ].form === $form[ 0 ] ) {
					vclickedName = $lastVClicked.attr( "name" );
					if ( vclickedName ) {
						// Make sure the last clicked element is included in the form
						$.each( formData, function( key, value ) {
							if ( value.name === vclickedName ) {
								// Unset vclickedName - we've found it in the serialized data already
								vclickedName = "";
								return false;
							}
						});
						if ( vclickedName ) {
							formData.push( { name: vclickedName, value: $lastVClicked.attr( "value" ) } );
						}
					}
				}

				ret = {
					url: url,
					options: {
						type:		method,
						data:		$.param( formData ),
						transition:	$form.jqmData( "transition" ),
						reverse:	$form.jqmData( "direction" ) === "reverse",
						reloadPage:	true
					}
				};
			}

			return ret;
		};

		//bind to form submit events, handle with Ajax
		$.mobile.document.delegate( "form", "submit", function( event ) {
			var formData;

			if ( !event.isDefaultPrevented() ) {
				formData = getAjaxFormData( $( this ) );
				if ( formData ) {
					$.mobile.changePage( formData.url, formData.options );
					event.preventDefault();
				}
			}
		});

		//add active state on vclick
		$.mobile.document.bind( "vclick", function( event ) {
			var theButton, target = event.target;
			// if this isn't a left click we don't care. Its important to note
			// that when the virtual event is generated it will create the which attr
			if ( event.which > 1 || !$.mobile.linkBindingEnabled ) {
				return;
			}

			// Record that this element was clicked, in case we need it for correct
			// form submission during the "submit" handler above
			$lastVClicked = $( target );

			// Try to find a target element to which the active class will be applied
			if ( $.data( target, "mobile-button" ) ) {
				// If the form will not be submitted via AJAX, do not add active class
				if ( !getAjaxFormData( $( target ).closest( "form" ), true ) ) {
					return;
				}
				// We will apply the active state to this button widget - the parent
				// of the input that was clicked will have the associated data
				if ( target.parentNode ) {
					target = target.parentNode;
				}
			} else {
				target = findClosestLink( target );
				if ( !target ||
						( path.parseUrl( target.getAttribute( "href" ) || "#" ).hash === "#" &&
							target.getAttribute( "data-" + $.mobile.ns + "rel" ) !== "back" ) ) {
					return;
				}

				// TODO teach $.mobile.hijackable to operate on raw dom elements so the
				// link wrapping can be avoided
				if ( !$( target ).jqmHijackable().length ) {
					return;
				}
			}

			theButton = $( target ).closest( ".ui-btn" );

			if ( theButton.length > 0 &&
				!( theButton.hasClass( "ui-state-disabled" ||

					// DEPRECATED as of 1.4.0 - remove after 1.4.0 release
					// only ui-state-disabled should be present thereafter
					theButton.hasClass( "ui-disabled" ) ) ) ) {
				$.mobile.removeActiveLinkClass( true );
				$.mobile.activeClickedLink = theButton;
				$.mobile.activeClickedLink.addClass( $.mobile.activeBtnClass );
			}
		});

		// click routing - direct to HTTP or Ajax, accordingly
		$.mobile.document.bind( "click", function( event ) {
			if ( !$.mobile.linkBindingEnabled || event.isDefaultPrevented() ) {
				return;
			}

			var link = findClosestLink( event.target ),
				$link = $( link ),

				//remove active link class if external (then it won't be there if you come back)
				httpCleanup = function() {
					window.setTimeout(function() { $.mobile.removeActiveLinkClass( true ); }, 200 );
				},
				baseUrl, href,
				useDefaultUrlHandling, isExternal,
				transition, reverse, role;

			// If a button was clicked, clean up the active class added by vclick above
			if ( $.mobile.activeClickedLink &&
				$.mobile.activeClickedLink[ 0 ] === event.target.parentNode ) {
				httpCleanup();
			}

			// If there is no link associated with the click or its not a left
			// click we want to ignore the click
			// TODO teach $.mobile.hijackable to operate on raw dom elements so the link wrapping
			// can be avoided
			if ( !link || event.which > 1 || !$link.jqmHijackable().length ) {
				return;
			}

			//if there's a data-rel=back attr, go back in history
			if ( $link.is( ":jqmData(rel='back')" ) ) {
				$.mobile.back();
				return false;
			}

			baseUrl = $.mobile.getClosestBaseUrl( $link );

			//get href, if defined, otherwise default to empty hash
			href = path.makeUrlAbsolute( $link.attr( "href" ) || "#", baseUrl );

			//if ajax is disabled, exit early
			if ( !$.mobile.ajaxEnabled && !path.isEmbeddedPage( href ) ) {
				httpCleanup();
				//use default click handling
				return;
			}

			// XXX_jblas: Ideally links to application pages should be specified as
			//            an url to the application document with a hash that is either
			//            the site relative path or id to the page. But some of the
			//            internal code that dynamically generates sub-pages for nested
			//            lists and select dialogs, just write a hash in the link they
			//            create. This means the actual URL path is based on whatever
			//            the current value of the base tag is at the time this code
			//            is called.
			if ( href.search( "#" ) !== -1 &&
				!( path.isExternal( href ) && path.isAbsoluteUrl( href ) ) ) {

				href = href.replace( /[^#]*#/, "" );
				if ( !href ) {
					//link was an empty hash meant purely
					//for interaction, so we ignore it.
					event.preventDefault();
					return;
				} else if ( path.isPath( href ) ) {
					//we have apath so make it the href we want to load.
					href = path.makeUrlAbsolute( href, baseUrl );
				} else {
					//we have a simple id so use the documentUrl as its base.
					href = path.makeUrlAbsolute( "#" + href, documentUrl.hrefNoHash );
				}
			}

			// Should we handle this link, or let the browser deal with it?
			useDefaultUrlHandling = $link.is( "[rel='external']" ) || $link.is( ":jqmData(ajax='false')" ) || $link.is( "[target]" );

			// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
			// requests if the document doing the request was loaded via the file:// protocol.
			// This is usually to allow the application to "phone home" and fetch app specific
			// data. We normally let the browser handle external/cross-domain urls, but if the
			// allowCrossDomainPages option is true, we will allow cross-domain http/https
			// requests to go through our page loading logic.

			//check for protocol or rel and its not an embedded page
			//TODO overlap in logic from isExternal, rel=external check should be
			//     moved into more comprehensive isExternalLink
			isExternal = useDefaultUrlHandling || ( path.isExternal( href ) && !path.isPermittedCrossDomainRequest( documentUrl, href ) );

			if ( isExternal ) {
				httpCleanup();
				//use default click handling
				return;
			}

			//use ajax
			transition = $link.jqmData( "transition" );
			reverse = $link.jqmData( "direction" ) === "reverse" ||
						// deprecated - remove by 1.0
						$link.jqmData( "back" );

			//this may need to be more specific as we use data-rel more
			role = $link.attr( "data-" + $.mobile.ns + "rel" ) || undefined;

			$.mobile.changePage( href, { transition: transition, reverse: reverse, role: role, link: $link } );
			event.preventDefault();
		});

		//prefetch pages when anchors with data-prefetch are encountered
		$.mobile.document.delegate( ".ui-page", "pageshow.prefetch", function() {
			var urls = [];
			$( this ).find( "a:jqmData(prefetch)" ).each(function() {
				var $link = $( this ),
					url = $link.attr( "href" );

				if ( url && $.inArray( url, urls ) === -1 ) {
					urls.push( url );

					$.mobile.loadPage( url, { role: $link.attr( "data-" + $.mobile.ns + "rel" ),prefetch: true } );
				}
			});
		});

		// TODO ensure that the navigate binding in the content widget happens at the right time
		$.mobile.pageContainer.pagecontainer();

		//set page min-heights to be device specific
		$.mobile.document.bind( "pageshow", function() {

			// We need to wait for window.load to make sure that styles have already been rendered,
			// otherwise heights of external toolbars will have the wrong value
			if ( loadDeferred ) {
				loadDeferred.done( $.mobile.resetActivePageHeight );
			} else {
				$.mobile.resetActivePageHeight();
			}
		});
		$.mobile.window.bind( "throttledresize", $.mobile.resetActivePageHeight );

	};//navreadyDeferred done callback

	$( function() { domreadyDeferred.resolve(); } );

	// Account for the possibility that the load event has already fired
	if ( document.readyState === "complete" ) {
		pageIsFullyLoaded();
	} else {
		$.mobile.window.load( pageIsFullyLoaded );
	}

	$.when( domreadyDeferred, $.mobile.navreadyDeferred ).done( function() { $.mobile._registerInternalEvents(); } );
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
