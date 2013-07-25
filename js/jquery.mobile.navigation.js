//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Applies the AJAX navigation system to links and forms to enable page transitions
//>>label: Content Management
//>>group: Navigation
define( [
	"jquery",
	"./jquery.mobile.core",
	"./navigation/path",
	"./events/navigate",
	"./navigation/history",
	"./navigation/navigator",
	"./navigation/method",
	"./jquery.mobile.events",
	"./jquery.mobile.support",
	"jquery.hashchange",
	"./widgets/page",
	"./transitions/handlers" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.content", $.mobile.widget, {
		_create: function() {
			var $window = $( window );

			this.setLastScrollEnabled = true;

			// TODO consider moving the navigation handler OUT of widget into
			//      some other object as glue between the navigate event and the
			//      content widget load and change methods
			this._on( $window, { navigate: "_filterNavigateEvents" });

			this._on( $window, {
				// disable an scroll setting when a hashchange has been fired,
				// this only works because the recording of the scroll position
				// is delayed for 100ms after the browser might have changed the
				// position because of the hashchange
				navigate: "_disableRecordScroll",

				// bind to scrollstop for the first page, "pagechange" won't be
				// fired in that case
				scrollstop: "_delayedRecordScroll"
			});

			// TODO move from page* events to content* events
			this._on({ pagechange: "_afterContentChange" });

			// handle initial hashchange from chrome :(
			$window.one( "navigate", $.proxy(function() {
				this.setLastScrollEnabled = true;
			}, this));
		},

		_disableRecordScroll: function() {
			this.setLastScrollEnabled = false;
		},

		_enableRecordScroll: function() {
			this.setLastScrollEnabled = true;
		},

		// TODO consider the name here, since it's purpose specific
		_afterContentChange:  function() {
			// once the page has changed, re-enable the scroll recording
			this.setLastScrollEnabled = true;

			// remove any binding that previously existed on the get scroll
			// which may or may not be different than the scroll element
			// determined for this page previously
			this._off( $window, "scrollstop" );

			// determine and bind to the current scoll element which may be the
			// window or in the case of touch overflow the element touch overflow
			this._on( $window, { scrollstop: "_delayedRecordScroll" });
		},

		_recordScroll: function() {
			// this barrier prevents setting the scroll value based on
			// the browser scrolling the window based on a hashchange
			if ( !this.setLastScrollEnabled ) {
				return;
			}

			var active = this._getActiveHistory(),
				currentScroll, minScroll, defaultScroll;

			if ( active ) {
				currentScroll = this._getScroll();
				minScroll = this._getMinScroll();
				defaultScroll = this._getDefaultScroll();

				// Set active page's lastScroll prop. If the location we're
				// scrolling to is less than minScrollBack, let it go.
				active.lastScroll = currentScroll < minScroll ? defaultScroll : currentScroll;
			}
		},

		_delayedRecordScroll: function() {
			setTimeout( $.proxy(this, "_recordScroll"), 100 );
		},

		_getScroll: function() {
			return $window.scrollTop();
		},

		_getMinScroll: function() {
			return $.mobile.minScrollBack;
		},

		_getDefaultScroll: function() {
			return $.mobile.defaultHomeScroll;
		},

		_filterNavigateEvents: function( e, data ) {
			var url;

			if ( e.originalEvent && e.originalEvent.isDefaultPrevented() ) {
				return;
			}

			url = e.originalEvent.type.indexOf( "hashchange" ) > -1 ? data.state.hash : data.state.url;

			if ( !url ) {
				url = this._getHash();
			}

			if ( !url || url === "#" || url.indexOf( "#" + $.mobile.path.uiStateKey ) === 0 ){
				url = location.href;
			}

			this._handleNavigate( url, data.state );
		},

		_getHash: function() {
			return $.mobile.path.parseLocation().hash;
		},

		// TODO active page should be managed by the container (ie, it should be a property)
		_getActiveContent: function() {
			return $.mobile.activePage;
		},

		// TODO the first page should be a property set during creat using the logic
		//      that currently resides in init
		_getInitialContent: function() {
			return $.mobile.firstPage;
		},

		// TODO each content container should have a history object
		_getHistory: function() {
			return urlHistory;
		},

		// TODO use _getHistory
		_getActiveHistory: function() {
			return $.mobile.urlHistory.getActive();
		},

		// TODO the document base should be determined at creation
		_getDocumentBase: function() {
			return documentBase;
		},

		_back: function() {
			$.mobile.back();
		},

		_forward: function() {
			window.history.forward();
		},

		// TODO rename _handleDestination
		_handleDestination: function( to ) {
			var history, documentBase;

			// clean the hash for comparison if it's a url
			if ( $.type(to) === "string" ) {
				to = path.stripHash(to);
			}

			if ( to ) {
				history = this._getHistory(),
				documentBase = this._getDocumentBase();

				// At this point, 'to' can be one of 3 things, a cached page
				// element from a history stack entry, an id, or site-relative /
				// absolute URL. If 'to' is an id, we need to resolve it against
				// the documentBase, not the location.href, since the hashchange
				// could've been the result of a forward/backward navigation
				// that crosses from an external page/dialog to an internal
				// page/dialog.
				//
				// TODO move check to history object or path object?
				to = !path.isPath( to ) ? ( path.makeUrlAbsolute( "#" + to, documentBase ) ) : to;

				// If we're about to go to an initial URL that contains a
				// reference to a non-existent internal page, go to the first
				// page instead. We know that the initial hash refers to a
				// non-existent page, because the initial hash did not end
				// up in the initial history entry
				// TODO move check to history object?
				if ( to === path.makeUrlAbsolute( "#" + history.initialDst, documentBase ) &&
					history.stack.length &&
					history.stack[0].url !== history.initialDst.replace( dialogHashKey, "" ) ) {
					to = this._getInitialContent();
				}
			}

			return to || this._getInitialContent();
		},

		_handleDialog: function( changePageOptions, data ) {
			var to, active, activeContent = this._getActiveContent();

			// If current active page is not a dialog skip the dialog and continue
			// in the same direction
			if ( activeContent && !activeContent.hasClass( "ui-dialog" ) ) {
				// determine if we're heading forward or backward and continue
				// accordingly past the current dialog
				if ( data.direction === "back" ) {
					this._back();
				} else {
					this._forward();
				}

				// prevent changePage call
				return false;
			} else {
				// if the current active page is a dialog and we're navigating
				// to a dialog use the dialog objected saved in the stack
				to = data.pageUrl;
				active = this._getActiveHistory();

				// make sure to set the role, transition and reversal
				// as most of this is lost by the domCache cleaning
				$.extend( changePageOptions, {
					role: active.role,
					transition: active.transition,
					reverse: data.direction === "back"
				});
			}

			return to;
		},

		_handleNavigate: function( url, data ) {
			//find first page via hash
			// TODO striping the hash twice with handleUrl
			var to = path.stripHash(url), history = this._getHistory(),

				// transition is false if it's the first page, undefined
				// otherwise (and may be overridden by default)
				transition = history.stack.length === 0 ? "none" : undefined,

				// default options for the changPage calls made after examining
				// the current state of the page and the hash, NOTE that the
				// transition is derived from the previous history entry
				changePageOptions = {
					changeHash: false,
					fromHashChange: true,
					reverse: data.direction === "back"
				};

			$.extend( changePageOptions, data, {
				transition: (history.getLast() || {}).transition || transition
			});

			// TODO move to _handleDestination ?
			// If this isn't the first page, if the current url is a dialog hash
			// key, and the initial destination isn't equal to the current target
			// page, use the special dialog handling
			if ( history.activeIndex > 0 &&
				to.indexOf( dialogHashKey ) > -1 &&
				history.initialDst !== to ) {

				to = this._handleDialog( changePageOptions, data );

				if ( to === false ) {
					return;
				}
			}

			this._changeContent( this._handleDestination(to), changePageOptions );
		},

		_changeContent: function( to, opts ) {
			$.mobile.changePage( to, opts );
		},

		_getBase: function() {
			return base;
		},

		_getBaseWithDefault: function() {
			return findBaseWithDefault();
		},

		_getNs: function() {
			return $.mobile.ns;
		},

		_enhance: function( content, role ) {
			// TODO consider supporting a custom callback, and passing in
			// the settings which includes the role
			return content.page({ role: role });
		},

		_include: function( page, settings ) {
			// append to page and enhance
			page.appendTo( this.element );

			// use the page widget to enhance
			this._enhance( page, settings.role );

			// remove page on hide
			page.page( "bindRemove" );
		},

		_find: function( absUrl ) {
			// TODO consider supporting a custom callback
			var fileUrl = this._createFileUrl( absUrl ),
				dataUrl = this._createDataUrl( absUrl ),
				page, initialContent = this._getInitialContent();

			// Check to see if the page already exists in the DOM.
			// NOTE do _not_ use the :jqmData psuedo selector because parenthesis
			//      are a valid url char and it breaks on the first occurence
			page = this.element
				.children( "[data-" + this._getNs() +"url='" + dataUrl + "']" );

			// If we failed to find the page, check to see if the url is a
			// reference to an embedded page. If so, it may have been dynamically
			// injected by a developer, in which case it would be lacking a
			// data-url attribute and in need of enhancement.
			if ( page.length === 0 && dataUrl && !path.isPath( dataUrl ) ) {
				page = this.element.children( path.hashToSelector("#" + dataUrl) )
					.attr( "data-" + this._getNs() + "url", dataUrl )
					.jqmData( "url", dataUrl );
			}


			// If we failed to find a page in the DOM, check the URL to see if it
			// refers to the first page in the application. Also Check to make sure
			// our cached-first-page is actually in the DOM. Some user deployed
			// apps are pruning the first page from the DOM for various reasons,
			// we check for this case here because we don't want a first-page with
			// an id falling through to the non-existent embedded page error case.
			if ( page.length === 0 &&
				path.isFirstPageUrl(fileUrl) &&
				initialContent &&
				initialContent.parent().length ) {
				page = $( initialContent );
			}

			return page;
		},

		_getLoader: function() {
			return $.mobile.loaderWidget;
		},

		_showLoading: function( delay, theme, msg, textonly ) {
			// This configurable timeout allows cached pages a brief
			// delay to load without showing a message
			this._loadMsg = setTimeout($.proxy(function() {
				this._getLoader().loader( "show", theme, msg, textonly );
			}, this), delay );
		},

		_hideLoading: function() {
			// Stop message show timer
			clearTimeout( this._loadMsg );

			// Hide loading message
			this._getLoader().loader( "hide" );
		},

		_showError: function() {
			// make sure to remove the current loading message
			this._hideLoading();

			// show the error message
			this._showLoading( 0, $.mobile.pageLoadErrorMessageTheme, $.mobile.pageLoadErrorMessage, true );

			// hide the error message after a delay
			// TODO configuration
			setTimeout( $.proxy(this, "_hideLoading"), 1500 );
		},

		_parse: function( html, fileUrl ) {
			// TODO consider allowing customization of this method. It's very JQM specific
			var page, all = $( "<div></div>" );

			//workaround to allow scripts to execute when included in page divs
			all.get( 0 ).innerHTML = html;

			page = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

			//if page elem couldn't be found, create one and insert the body element's contents
			if ( !page.length ) {
				page = $( "<div data-" + this._getNs() + "role='page'>" +
					( html.split( /<\/?body[^>]*>/gmi )[1] || "" ) +
					"</div>" );
			}

			// TODO taging a page with external to make sure that embedded pages aren't
			// removed by the various page handling code is bad. Having page handling code
			// in many places is bad. Solutions post 1.0
			page.attr( "data-" + this._getNs() + "url", path.convertUrlToDataUrl(fileUrl) )
				.attr( "data-" + this._getNs() + "external-page", true );

			return page;
		},

		_setLoadedTitle: function( page, html ) {
			//page title regexp
			var newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1;

			if ( newPageTitle && !page.jqmData("title") ) {
				newPageTitle = $( "<div>" + newPageTitle + "</div>" ).text();
				page.jqmData( "title", newPageTitle );
			}
		},

		_isRewritableBaseTag: function() {
			return $.mobile.dynamicBaseEnabled && !$.support.dynamicBaseTag;
		},

		_createDataUrl: function( absoluteUrl ) {
			return path.convertUrlToDataUrl( absoluteUrl );
		},

		_createFileUrl: function( absoluteUrl ) {
			return path.getFilePath( absoluteUrl );
		},

		_triggerWithDeprecated: function( name, data, page ) {
			var deprecatedEvent = $.Event( "page" + name ),
				newEvent = $.Event( this.widgetName + name );

			// DEPRECATED
			// trigger the old deprecated event on the page if it's provided
			(page || this.element).trigger( deprecatedEvent, data );

			// use the widget trigger method for the new content* event
			this.element.trigger( newEvent, data );

			return {
				deprecatedEvent: deprecatedEvent,
				event: newEvent
			};
		},

		// TODO it would be nice to split this up more but everything appears to be "one off"
		//      or require ordering such that other bits are sprinkled in between parts that
		//      could be abstracted out as a group
		_loadSuccess: function( absUrl, triggerData, settings, deferred ) {
			var fileUrl = this._createFileUrl( absUrl ),
				dataUrl = this._createDataUrl( absUrl );

			return $.proxy(function( html, textStatus, xhr ) {
				//pre-parse html to check for a data-url,
				//use it as the new fileUrl, base path, etc
				var content,

					// TODO handle dialogs again
					pageElemRegex = new RegExp( "(<[^>]+\\bdata-" + this._getNs() + "role=[\"']?page[\"']?[^>]*>)" ),

					dataUrlRegex = new RegExp( "\\bdata-" + this._getNs() + "url=[\"']?([^\"'>]*)[\"']?" );

				// data-url must be provided for the base tag so resource requests
				// can be directed to the correct url. loading into a temprorary
				// element makes these requests immediately
				if ( pageElemRegex.test( html ) &&
					RegExp.$1 &&
					dataUrlRegex.test( RegExp.$1 ) &&
					RegExp.$1 ) {
					fileUrl = path.getFilePath( $("<div>" + RegExp.$1 + "</div>").text() );
				}

				//dont update the base tag if we are prefetching
				if ( settings.prefetch === undefined ){
					this._getBase().set( fileUrl );
				}

				content = this._parse( html, fileUrl );

				this._setLoadedTitle( content, html );

				// rewrite src and href attrs to use a base url if the base tag won't work
				if ( this._isRewritableBaseTag() && content ) {
					this._getBase().rewrite( fileUrl, content );
				}

				this._include( content, settings );

				// Enhancing the content may result in new dialogs/sub content being inserted
				// into the DOM. If the original absUrl refers to a sub-content, that is the
				// real content we are interested in.
				if ( absUrl.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ) {
					content = this.element.children( "[data-" + this._getNs() +"url='" + dataUrl + "']" );
				}

				// Remove loading message.
				if ( settings.showLoadMsg ) {
					this._hideLoading();
				}

				// Add the content reference and xhr to our triggerData.
				triggerData.xhr = xhr;
				triggerData.textStatus = textStatus;

				// DEPRECATED
				triggerData.page = content;

				triggerData.content = content;

				// Let listeners know the content loaded successfully.
				this._triggerWithDeprecated( "load", triggerData );

				deferred.resolve( absUrl, settings, content );
			}, this);
		},

		_loadDefaults: {
			type: "get",
			data: undefined,

			// DEPRECATED
			reloadPage: false,

			reload: false,

			// By default we rely on the role defined by the @data-role attribute.
			role: undefined,

			showLoadMsg: false,

			// This delay allows loads that pull from browser cache to
			// occur without showing the loading message.
			loadMsgDelay: 50
		},

		load: function( url, options ) {
			// This function uses deferred notifications to let callers
			// know when the content is done loading, or if an error has occurred.
			var deferred = options.deferred || $.Deferred(),

				// The default load options with overrides specified by the caller.
				settings = $.extend( {}, this._loadDefaults, options ),

				// The DOM element for the content after it has been loaded.
				content = null,

				// The absolute version of the URL passed into the function. This
				// version of the URL may contain dialog/subcontent params in it.
				absUrl = path.makeUrlAbsolute( url, this._getBaseWithDefault() ),
				fileUrl, dataUrl, pblEvent, triggerData;

			// DEPRECATED reloadPage
			settings.reload = settings.reloadPage;

			// If the caller provided data, and we're using "get" request,
			// append the data to the URL.
			if ( settings.data && settings.type === "get" ) {
				absUrl = path.addSearchParams( absUrl, settings.data );
				settings.data = undefined;
			}

			// If the caller is using a "post" request, reload must be true
			if ( settings.data && settings.type === "post" ) {
				settings.reload = true;
			}

			// The absolute version of the URL minus any dialog/subcontent params.
			// In otherwords the real URL of the content to be loaded.
			fileUrl = this._createFileUrl( absUrl );

			// The version of the Url actually stored in the data-url attribute of
			// the content. For embedded content, it is just the id of the page. For content
			// within the same domain as the document base, it is the site relative
			// path. For cross-domain content (Phone Gap only) the entire absolute Url
			// used to load the content.
			dataUrl = this._createDataUrl( absUrl );

			content = this._find( absUrl );

			// If it isn't a reference to the first content and refers to missing embedded content
			// reject the deferred and return
			if ( content.length === 0 &&
				path.isEmbeddedPage(fileUrl) &&
				!path.isFirstPageUrl(fileUrl) ) {
				deferred.reject( absUrl, settings );
				return;
			}

			// Reset base to the default document base
			// TODO figure out why we doe this
			this._getBase().reset();

			// If the content we are interested in is already in the DOM,
			// and the caller did not indicate that we should force a
			// reload of the file, we are done. Resolve the deferrred so that
			// users can bind to .done on the promise
			if ( content.length && !settings.reload ) {
				this._enhance( content, settings.role );
				deferred.resolve( absUrl, settings, content );

				//if we are reloading the content make sure we update
				// the base if its not a prefetch
				if ( !settings.prefetch ){
					this._getBase().set(url);
				}

				return;
			}

			triggerData = {
				url: url,
				absUrl: absUrl,
				dataUrl: dataUrl,
				deferred: deferred,
				options: settings
			};

			// Let listeners know we're about to load a content.
			pblEvent = this._triggerWithDeprecated( "beforeload", triggerData );

			// If the default behavior is prevented, stop here!
			if ( pblEvent.deprecatedEvent.isDefaultPrevented() ||
				 pblEvent.event.isDefaultPrevented() ) {
				return;
			}

			if ( settings.showLoadMsg ) {
				this._showLoading( settings.loadMsgDelay );
			}

			// Reset base to the default document base.
			// only reset if we are not prefetching
			if ( settings.prefetch === undefined ) {
				this._getBase().reset();
			}

			if ( !($.mobile.allowCrossDomainPages ||
				path.isSameDomain(documentUrl, absUrl)) ) {
				deferred.reject( absUrl, settings );
				return;
			}

			// Load the new content.
			$.ajax({
				url: fileUrl,
				type: settings.type,
				data: settings.data,
				contentType: settings.contentType,
				dataType: "html",
				success: this._loadSuccess( absUrl, triggerData, settings, deferred ),
				error: this._loadError( absUrl, triggerData, settings, deferred )
			});
		},

		_loadError: function( absUrl, triggerData, settings, deferred ) {
			return $.proxy(function( xhr, textStatus, errorThrown ) {
				//set base back to current path
				this._getBase().set( path.get() );

				// Add error info to our triggerData.
				triggerData.xhr = xhr;
				triggerData.textStatus = textStatus;
				triggerData.errorThrown = errorThrown;

				// Let listeners know the page load failed.
				var plfEvent = this._triggerWithDeprecated( "loadfailed", triggerData );

				// If the default behavior is prevented, stop here!
				// Note that it is the responsibility of the listener/handler
				// that called preventDefault(), to resolve/reject the
				// deferred object within the triggerData.
				if ( plfEvent.deprecatedEvent.isDefaultPrevented() ||
					plfEvent.event.isDefaultPrevented() ) {
					return;
				}

				// Remove loading message.
				if ( settings.showLoadMsg ) {
					this._showError();
				}

				deferred.reject( absUrl, settings );
			}, this);
		},

		_getTransitionHandler: function( transition ) {
			transition = $.mobile._maybeDegradeTransition( transition );

			//find the transition handler for the specified transition. If there
			//isn't one in our transitionHandlers dictionary, use the default one.
			//call the handler immediately to kick-off the transition.
			return $.mobile.transitionHandlers[ transition ] || $.mobile.defaultTransitionHandler;
		},

		// TODO move into transition handlers?
		_triggerCssTransitionEvents: function( to, from, prefix ) {
			prefix = prefix || "";

			// TODO decide if these events should in fact be triggered on the container
			if ( from ) {
				//trigger before show/hide events
				// TODO deprecate nextPage in favor of next
				this._triggerWithDeprecated( prefix + "hide", {nextPage: to}, from );
			}

			// TODO deprecate prevPage in favor of previous
			this._triggerWithDeprecated( prefix + "show", {prevPage: from || $( "" )}, to );
		},

		// TODO make private once change has been defined in the widget
		_cssTransition: function( to, from, options ) {
			var transition = options.transition,
				reverse = options.reverse,
				deferred = options.deferred,
				TransitionHandler,
				promise;

			this._triggerCssTransitionEvents( to, from, "before" );

			// TODO put this in a binding to events *outside* the widget
			this._hideLoading();

			TransitionHandler = this._getTransitionHandler( transition );

			promise = (new TransitionHandler( transition, reverse, to, from )).transition();

			// TODO temporary accomodation of argument deferred
			promise.done(function() {
				deferred.resolve.apply(deferred, arguments);
			});

			promise.done($.proxy(function() {
				this._triggerCssTransitionEvents( to, from );
			}, this));
		},

		_releaseTransitionLock: function() {
			//release transition lock so navigation is free again
			releasePageTransitionLock();
		},

		_removeActiveLinkClass: function( force ) {
			//clear out the active button state
			removeActiveLinkClass( force );
		},

		_loadUrl: function( to, triggerData, settings ) {
			// preserve the original target as the dataUrl value will be
			// simplified eg, removing ui-state, and removing query params
			// from the hash this is so that users who want to use query
			// params have access to them in the event bindings for the page
			// life cycle See issue #5085
			settings.target = to;
			settings.deferred = $.Deferred();

			this.load( to, settings );

			settings.deferred.done($.proxy(function( url, options, content ) {
				isPageTransitioning = false;

				// store the original absolute url so that it can be provided
				// to events in the triggerData of the subsequent changePage call
				options.absUrl = triggerData.absUrl;

				this.transition( content, triggerData, options );
			}, this));

			settings.deferred.fail($.proxy(function(/* url, options */) {
				this._removeActiveLinkClass( true );
				this._releaseTransitionLock();
				this._triggerWithDeprecated( "changefailed", triggerData );
			}, this));
		},

		_triggerPageBeforeChange: function( to, triggerData, settings ) {
			var pbcEvent = new $.Event( "pagebeforechange" );

			$.extend(triggerData, { toPage: to, options: settings });

			// NOTE: preserve the original target as the dataUrl value will be
			// simplified eg, removing ui-state, and removing query params from
			// the hash this is so that users who want to use query params have
			// access to them in the event bindings for the page life cycle
			// See issue #5085
			if ( $.type(to) === "string" ) {
				// if the toPage is a string simply convert it
				triggerData.absUrl = path.makeUrlAbsolute( to, findBaseWithDefault() );
			} else {
				// if the toPage is a jQuery object grab the absolute url stored
				// in the loadPage callback where it exists
				triggerData.absUrl = settings.absUrl;
			}

			// Let listeners know we're about to change the current page.
			this.element.trigger( pbcEvent, triggerData );

			// If the default behavior is prevented, stop here!
			if ( pbcEvent.isDefaultPrevented() ) {
				return false;
			}

			return true;
		},

		change: function( to, options ) {
			// If we are in the midst of a transition, queue the current request.
			// We'll call changePage() once we're done with the current transition
			// to service the request.
			if ( isPageTransitioning ) {
				pageTransitionQueue.unshift( arguments );
				return;
			}

			var settings = $.extend( {}, $.mobile.changePage.defaults, options ),
				triggerData = {};

			// Make sure we have a fromPage.
			settings.fromPage = settings.fromPage || $.mobile.activePage;

			// if the page beforechange default is prevented return early
			if ( !this._triggerPageBeforeChange(to, triggerData, settings) ) {
				return;
			}

			// We allow "pagebeforechange" observers to modify the to in
			// the trigger data to allow for redirects. Make sure our to is
			// updated. We also need to re-evaluate whether it is a string,
			// because an object can also be replaced by a string
			to = triggerData.toPage;

			// If the caller passed us a url, call loadPage()
			// to make sure it is loaded into the DOM. We'll listen
			// to the promise object it returns so we know when
			// it is done loading or if an error ocurred.
			if ( $.type(to) === "string" ) {
				// Set the isPageTransitioning flag to prevent any requests from
				// entering this method while we are in the midst of loading a page
				// or transitioning.
				isPageTransitioning = true;

				this._loadUrl( to, triggerData, settings );
			} else {
				this.transition( to, triggerData, settings );
			}
		},

		transition: function( toPage, triggerData, settings ) {
			var fromPage, url, pageUrl, fileUrl,
				active, activeIsInitialPage,
				historyDir, pageTitle, isDialog,
				alreadyThere, newPageTitle,
				params,	cssTransitionDeferred,
				beforeTransition;

			// If we are in the midst of a transition, queue the current request.
			// We'll call changePage() once we're done with the current transition
			// to service the request.
			if ( isPageTransitioning ) {
				// make sure to only queue the to and settings values so the arguments
				// work with a call to the change method
				pageTransitionQueue.unshift( [toPage, settings] );
				return;
			}

			// DEPRECATED - this call only, in favor of the before transition
			// if the page beforechange default is prevented return early
			if ( !this._triggerPageBeforeChange(toPage, triggerData, settings) ) {
				return;
			}

			// if the (content|page)beforetransition default is prevented return early
			// Note, we have to check for both the deprecated and new events
			beforeTransition = this._triggerWithDeprecated( "beforetransition", triggerData );
			if (beforeTransition.deprecatedEvent.isDefaultPrevented() ||
				beforeTransition.event.isDefaultPrevented() ) {
				return;
			}

			// Set the isPageTransitioning flag to prevent any requests from
			// entering this method while we are in the midst of loading a page
			// or transitioning.
			isPageTransitioning = true;

			// If we are going to the first-page of the application, we need to make
			// sure settings.dataUrl is set to the application document url. This allows
			// us to avoid generating a document url with an id hash in the case where the
			// first-page of the document has an id attribute specified.
			if ( toPage[ 0 ] === $.mobile.firstPage[ 0 ] && !settings.dataUrl ) {
				settings.dataUrl = documentUrl.hrefNoHash;
			}

			// The caller passed us a real page DOM element. Update our
			// internal state and then trigger a transition to the page.
			fromPage = settings.fromPage;
			url = ( settings.dataUrl && path.convertUrlToDataUrl(settings.dataUrl) ) ||
				toPage.jqmData( "url" );

			// The pageUrl var is usually the same as url, except when url is obscured
			// as a dialog url. pageUrl always contains the file path
			pageUrl = url;
			fileUrl = path.getFilePath( url );
			active = urlHistory.getActive();
			activeIsInitialPage = urlHistory.activeIndex === 0;
			historyDir = 0;
			pageTitle = document.title;
			isDialog = settings.role === "dialog" || toPage.jqmData( "role" ) === "dialog";

			// By default, we prevent changePage requests when the fromPage and toPage
			// are the same element, but folks that generate content manually/dynamically
			// and reuse pages want to be able to transition to the same page. To allow
			// this, they will need to change the default value of allowSamePageTransition
			// to true, *OR*, pass it in as an option when they manually call changePage().
			// It should be noted that our default transition animations assume that the
			// formPage and toPage are different elements, so they may behave unexpectedly.
			// It is up to the developer that turns on the allowSamePageTransitiona option
			// to either turn off transition animations, or make sure that an appropriate
			// animation transition is used.
			if ( fromPage && fromPage[0] === toPage[0] && !settings.allowSamePageTransition ) {
				isPageTransitioning = false;
				this._triggerWithDeprecated( "transition", triggerData );
				this.element.trigger( "pagechange", triggerData );

				// Even if there is no page change to be done, we should keep the urlHistory
				// in sync with the hash changes
				if ( settings.fromHashChange ) {
					urlHistory.direct({ url: url });
				}

				return;
			}

			// We need to make sure the page we are given has already been enhanced.
			toPage.page({ role: settings.role });

			// If the changePage request was sent from a hashChange event, check to see if the
			// page is already within the urlHistory stack. If so, we'll assume the user hit
			// the forward/back button and will try to match the transition accordingly.
			if ( settings.fromHashChange ) {
				historyDir = settings.direction === "back" ? -1 : 1;
			}

			// Kill the keyboard.
			// XXX_jblas: We need to stop crawling the entire document to kill focus. Instead,
			//            we should be tracking focus with a delegate() handler so we already have
			//            the element in hand at this point.
			// Wrap this in a try/catch block since IE9 throw "Unspecified error" if document.activeElement
			// is undefined when we are in an IFrame.
			try {
				if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {
					$( document.activeElement ).blur();
				} else {
					$( "input:focus, textarea:focus, select:focus" ).blur();
				}
			} catch( e ) {}

			// Record whether we are at a place in history where a dialog used to be - if so, do not add a new history entry and do not change the hash either
			alreadyThere = false;

			// If we're displaying the page as a dialog, we don't want the url
			// for the dialog content to be used in the hash. Instead, we want
			// to append the dialogHashKey to the url of the current page.
			if ( isDialog && active ) {
				// on the initial page load active.url is undefined and in that case should
				// be an empty string. Moving the undefined -> empty string back into
				// urlHistory.addNew seemed imprudent given undefined better represents
				// the url state

				// If we are at a place in history that once belonged to a dialog, reuse
				// this state without adding to urlHistory and without modifying the hash.
				// However, if a dialog is already displayed at this point, and we're
				// about to display another dialog, then we must add another hash and
				// history entry on top so that one may navigate back to the original dialog
				if ( active.url &&
					 active.url.indexOf( dialogHashKey ) > -1 &&
					 $.mobile.activePage &&
					 !$.mobile.activePage.hasClass( "ui-dialog" ) &&
					 urlHistory.activeIndex > 0 ) {
					settings.changeHash = false;
					alreadyThere = true;
				}

				// Normally, we tack on a dialog hash key, but if this is the location of a stale dialog,
				// we reuse the URL from the entry
				url = ( active.url || "" );

				// account for absolute urls instead of just relative urls use as hashes
				if ( !alreadyThere && url.indexOf("#") > -1 ) {
					url += dialogHashKey;
				} else {
					url += "#" + dialogHashKey;
				}

				// tack on another dialogHashKey if this is the same as the initial hash
				// this makes sure that a history entry is created for this dialog
				if ( urlHistory.activeIndex === 0 && url === urlHistory.initialDst ) {
					url += dialogHashKey;
				}
			}

			// if title element wasn't found, try the page div data attr too
			// If this is a deep-link or a reload ( active === undefined ) then just use pageTitle
			newPageTitle = ( !active )? pageTitle : toPage.jqmData( "title" ) || toPage.children( ":jqmData(role='header')" ).find( ".ui-title" ).text();
			if ( !!newPageTitle && pageTitle === document.title ) {
				pageTitle = newPageTitle;
			}
			if ( !toPage.jqmData( "title" ) ) {
				toPage.jqmData( "title", pageTitle );
			}

			// Make sure we have a transition defined.
			settings.transition = settings.transition ||
				( ( historyDir && !activeIsInitialPage ) ? active.transition : undefined ) ||
				( isDialog ? $.mobile.defaultDialogTransition : $.mobile.defaultPageTransition );

			//add page to history stack if it's not back or forward
			if ( !historyDir && alreadyThere ) {
				urlHistory.getActive().pageUrl = pageUrl;
			}

			// Set the location hash.
			if ( url && !settings.fromHashChange ) {

				// rebuilding the hash here since we loose it earlier on
				// TODO preserve the originally passed in path
				if ( !path.isPath( url ) && url.indexOf( "#" ) < 0 ) {
					url = "#" + url;
				}

				// TODO the property names here are just silly
				params = {
					transition: settings.transition,
					title: pageTitle,
					pageUrl: pageUrl,
					role: settings.role
				};

				if ( settings.changeHash !== false && $.mobile.hashListeningEnabled ) {
					$.mobile.navigate( url, params, true);
				} else if ( toPage[ 0 ] !== $.mobile.firstPage[ 0 ] ) {
					$.mobile.navigate.history.add( url, params );
				}
			}

			//set page title
			document.title = pageTitle;

			//set "toPage" as activePage
			$.mobile.activePage = toPage;

			// If we're navigating back in the URL history, set reverse accordingly.
			settings.reverse = settings.reverse || historyDir < 0;

			cssTransitionDeferred = $.Deferred();

			this._cssTransition(toPage, fromPage, {
				transition: settings.transition,
				reverse: settings.reverse,
				deferred: cssTransitionDeferred
			});

			cssTransitionDeferred.done($.proxy(function( name, reverse, $to, $from, alreadyFocused ) {
				removeActiveLinkClass();

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if ( settings.duplicateCachedPage ) {
					settings.duplicateCachedPage.remove();
				}

				// despite visibility: hidden addresses issue #2965
				// https://github.com/jquery/jquery-mobile/issues/2965
				if ( !alreadyFocused ) {
					$.mobile.focusPage( toPage );
				}

				releasePageTransitionLock();
				this.element.trigger( "pagechange", triggerData );
				this._triggerWithDeprecated( "transition", triggerData );
			}, this));
		}
		// TODO resetActivePageHeight
		// TODO changePage
	});

	$.mobile.loadPage = function( url, opts ) {
		var container = ( opts.pageContainer || $.mobile.pageContainer );

		opts = opts || {},

		// create the deferred that will be supplied to loadPage callers
		// and resolved by the content widget's load method
		opts.deferred = $.Deferred();

		// Preferring to allow exceptions for uninitialized opts.pageContainer
		// widgets so we know if we need to force init here for users
		container.content( "load", url, opts );

		// provide the deferred
		return opts.deferred.promise();
	};

	//define vars for interal use
	var $window = $.mobile.window,
		$head = $( "head" ),

		// NOTE: path extensions dependent on core attributes. Moved here to remove deps from
		//       $.mobile.path definition
		path = $.extend($.mobile.path, {

			//return the substring of a filepath before the sub-page key, for making a server request
			getFilePath: function( path ) {
				var splitkey = "&" + $.mobile.subPageUrlKey;
				return path && path.split( splitkey )[0].split( dialogHashKey )[0];
			},

			//check if the specified url refers to the first page in the main application document.
			isFirstPageUrl: function( url ) {
				// We only deal with absolute paths.
				var u = path.parseUrl( path.makeUrlAbsolute( url, this.documentBase ) ),

					// Does the url have the same path as the document?
					samePath = u.hrefNoHash === this.documentUrl.hrefNoHash || ( this.documentBaseDiffers && u.hrefNoHash === this.documentBase.hrefNoHash ),

					// Get the first page element.
					fp = $.mobile.firstPage,



					// Get the id of the first page element if it has one.
					fpId = fp && fp[0] ? fp[0].id : undefined;

				// The url refers to the first page if the path matches the document and
				// it either has no hash value, or the hash is exactly equal to the id of the
				// first page element.
				return samePath && ( !u.hash || u.hash === "#" || ( fpId && u.hash.replace( /^#/, "" ) === fpId ) );
			},

			// Some embedded browsers, like the web view in Phone Gap, allow cross-domain XHR
			// requests if the document doing the request was loaded via the file:// protocol.
			// This is usually to allow the application to "phone home" and fetch app specific
			// data. We normally let the browser handle external/cross-domain urls, but if the
			// allowCrossDomainPages option is true, we will allow cross-domain http/https
			// requests to go through our page loading logic.
			isPermittedCrossDomainRequest: function( docUrl, reqUrl ) {
				return $.mobile.allowCrossDomainPages &&
					docUrl.protocol === "file:" &&
					reqUrl.search( /^https?:/ ) !== -1;
			}
		}),

		// used to track last vclicked element to make sure its value is added to form data
		$lastVClicked = null,

		//will be defined when a link is clicked and given an active class
		$activeClickedLink = null,

		// resolved on domready
		domreadyDeferred = $.Deferred(),

		//urlHistory is purely here to make guesses at whether the back or forward button was clicked
		//and provide an appropriate transition
		urlHistory = $.mobile.navigate.history,

		//queue to hold simultanious page transitions
		pageTransitionQueue = [],

		//indicates whether or not page is in process of transitioning
		isPageTransitioning = false,

		//nonsense hash change key for dialogs, so they create a history entry
		dialogHashKey = "&ui-state=dialog",

		//existing base tag?
		$base = $head.children( "base" ),

		//tuck away the original document URL minus any fragment.
		documentUrl = path.documentUrl,

		//if the document has an embedded base tag, documentBase is set to its
		//initial value. If a base tag does not exist, then we default to the documentUrl.
		documentBase = path.documentBase,

		// base element management, defined depending on dynamic base tag support
		// TODO move to external widget
		base = {
			//define base element, for use in routing asset urls that are referenced in Ajax-requested markup
			element: ( $base.length ? $base : $( "<base>", { href: documentBase.hrefNoHash } ).prependTo( $head ) ),

			linkSelector: "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]",

			//set the generated BASE element's href attribute to a new page's base path
			set: function( href ) {
				// we should do nothing if the user wants to manage their url base manually
				if ( !$.mobile.dynamicBaseEnabled ){
					return;
				}

				// we should use the base tag if we can manipulate it dynamically
				if ( $.support.dynamicBaseTag ){
					base.element.attr( "href", path.makeUrlAbsolute( href, documentBase ) );
				}
			},

			rewrite: function( href, page ) {
				var newPath = path.get( href );

				page.find( base.linkSelector ).each(function( i, link ) {
					var thisAttr = $( link ).is( "[href]" ) ? "href" : $( link ).is( "[src]" ) ? "src" : "action",
					thisUrl = $( link ).attr( thisAttr );

					// XXX_jblas: We need to fix this so that it removes the document
					//            base URL, and then prepends with the new page URL.
					//if full path exists and is same, chop it - helps IE out
					thisUrl = thisUrl.replace( location.protocol + "//" + location.host + location.pathname, "" );

					if ( !/^(\w+:|#|\/)/.test( thisUrl ) ) {
						$( link ).attr( thisAttr, newPath + thisUrl );
					}
				});
			},

			//set the generated BASE element's href attribute to a new page's base path
			reset: function(/* href */) {
				base.element.attr( "href", documentBase.hrefNoSearch );
			}
		};

	//return the original document url
	$.mobile.getDocumentUrl = path.getDocumentUrl;

	//return the original document base url
	$.mobile.getDocumentBase = path.getDocumentBase;

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
			nav.app.backHistory ){
			nav.app.backHistory();
		} else {
			window.history.back();
		}
	};

	//direct focus to the page title, or otherwise first focusable element
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

	//remove active classes after page transition or error
	function removeActiveLinkClass( forceRemoval ) {
		if ( !!$activeClickedLink && ( !$activeClickedLink.closest( "." + $.mobile.activePageClass ).length || forceRemoval ) ) {
			$activeClickedLink.removeClass( $.mobile.activeBtnClass );
		}
		$activeClickedLink = null;
	}

	function releasePageTransitionLock() {
		isPageTransitioning = false;
		if ( pageTransitionQueue.length > 0 ) {
			$.mobile.changePage.apply( null, pageTransitionQueue.pop() );
		}
	}

	// No-op implementation of transition degradation
	$.mobile._maybeDegradeTransition = $.mobile._maybeDegradeTransition || function( transition ) {
		return transition;
	};

	// determine the current base url
	function findBaseWithDefault() {
		var closestBase = ( $.mobile.activePage && getClosestBaseUrl( $.mobile.activePage ) );
		return closestBase || documentBase.hrefNoHash;
	}

	/* exposed $.mobile methods */

	//animation complete callback
	$.fn.animationComplete = function( callback ) {
		if ( $.support.cssTransitions ) {
			return $( this ).one( "webkitAnimationEnd animationend", callback );
		}
		else{
			// defer execution for consistency between webkit/non webkit
			setTimeout( callback, 0 );
			return $( this );
		}
	};

	//expose path object on $.mobile
	$.mobile.path = path;

	//expose base object on $.mobile
	$.mobile.base = base;

	//history stack
	$.mobile.urlHistory = urlHistory;

	$.mobile.dialogHashKey = dialogHashKey;

	//enable cross-domain page support
	$.mobile.allowCrossDomainPages = false;

	$.mobile.changePage = function( to, options ) {
		$.mobile.pageContainer.content( "change", to, options );
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

	// The base URL for any given element depends on the page it resides in.
	function getClosestBaseUrl( ele )	{
		// Find the closest page and extract out its url.
		var url = $( ele ).closest( ".ui-page" ).jqmData( "url" ),
			base = documentBase.hrefNoHash;

		if ( !$.mobile.dynamicBaseEnabled || !url || !path.isPath( url ) ) {
			url = base;
		}

		return path.makeUrlAbsolute( url, base );
	}

	//The following event bindings should be bound after mobileinit has been triggered
	//the following deferred is resolved in the init file
	$.mobile.navreadyDeferred = $.Deferred();
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

			url = $form.attr( "action" );
			method = ( $form.attr( "method" ) || "get" ).toLowerCase();

			// If no action is specified, browsers default to using the
			// URL of the document containing the form. Since we dynamically
			// pull in pages from external documents, the form should submit
			// to the URL for the source document of the page containing
			// the form.
			if ( !url ) {
				// Get the @data-url for the page containing the form.
				url = getClosestBaseUrl( $form );

				// NOTE: If the method is "get", we need to strip off the query string
				// because it will get replaced with the new form data. See issue #5710.
				if ( method === "get" ) {
					url = path.parseUrl( url ).hrefNoSearch;
				}

				if ( url === documentBase.hrefNoHash ) {
					// The url we got back matches the document base,
					// which means the page must be an internal/embedded page,
					// so default to using the actual document url as a browser
					// would.
					url = documentUrl.hrefNoSearch;
				}
			}

			url = path.makeUrlAbsolute(  url, getClosestBaseUrl( $form ) );

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
			var formData = getAjaxFormData( $( this ) );

			if ( formData ) {
				$.mobile.changePage( formData.url, formData.options );
				event.preventDefault();
			}
		});

		//add active state on vclick
		$.mobile.document.bind( "vclick", function( event ) {
			var $btn, btnEls, target = event.target, needClosest = false;
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
				if ( !( target && path.parseUrl( target.getAttribute( "href" ) || "#" ).hash !== "#" ) ) {
					return;
				}

				// TODO teach $.mobile.hijackable to operate on raw dom elements so the
				// link wrapping can be avoided
				if ( !$( target ).jqmHijackable().length ) {
					return;
				}
			}

			// Avoid calling .closest by using the data set during .buttonMarkup()
			// List items have the button data in the parent of the element clicked
			if ( !!~target.className.indexOf( "ui-link-inherit" ) ) {
				if ( target.parentNode ) {
					btnEls = $.data( target.parentNode, "buttonElements" );
				}
			// Otherwise, look for the data on the target itself
			} else {
				btnEls = $.data( target, "buttonElements" );
			}
			// If found, grab the button's outer element
			if ( btnEls ) {
				target = btnEls.outer;
			} else {
				needClosest = true;
			}

			$btn = $( target );
			// If the outer element wasn't found by the our heuristics, use .closest()
			if ( needClosest ) {
				$btn = $btn.closest( ".ui-btn" );
			}

			if ( $btn.length > 0 && !$btn.hasClass( "ui-disabled" ) ) {
				removeActiveLinkClass( true );
				$activeClickedLink = $btn;
				$activeClickedLink.addClass( $.mobile.activeBtnClass );
			}
		});

		// click routing - direct to HTTP or Ajax, accordingly
		$.mobile.document.bind( "click", function( event ) {
			if ( !$.mobile.linkBindingEnabled || event.isDefaultPrevented() ) {
				return;
			}

			var link = findClosestLink( event.target ),
				$link = $( link ),
				httpCleanup,
				baseUrl, href,
				useDefaultUrlHandling, isExternal,
				transition, reverse, role;

			// If there is no link associated with the click or its not a left
			// click we want to ignore the click
			// TODO teach $.mobile.hijackable to operate on raw dom elements so the link wrapping
			// can be avoided
			if ( !link || event.which > 1 || !$link.jqmHijackable().length ) {
				return;
			}

			//remove active link class if external (then it won't be there if you come back)
			httpCleanup = function() {
				window.setTimeout(function() { removeActiveLinkClass( true ); }, 200 );
			};

			//if there's a data-rel=back attr, go back in history
			if ( $link.is( ":jqmData(rel='back')" ) ) {
				$.mobile.back();
				return false;
			}

			baseUrl = getClosestBaseUrl( $link );

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
			//            is called. For now we are just assuming that any url with a
			//            hash in it is an application page reference.
			if ( href.search( "#" ) !== -1 ) {
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
		$.mobile.pageContainer.content();

		//set page min-heights to be device specific
		$.mobile.document.bind( "pageshow", $.mobile.resetActivePageHeight );
		$.mobile.window.bind( "throttledresize", $.mobile.resetActivePageHeight );

	};//navreadyDeferred done callback

	$( function() { domreadyDeferred.resolve(); } );

	$.when( domreadyDeferred, $.mobile.navreadyDeferred ).done( function() { $.mobile._registerInternalEvents(); } );
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");