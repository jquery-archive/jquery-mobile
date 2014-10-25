//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Widget to create page container which manages pages and transitions
//>>label: Content Management
//>>group: Navigation
define( [
	"jquery",
	"../jquery.mobile.core",
	"../navigation/path",
	"../navigation/base",
	"../events/navigate",
	"../navigation/history",
	"../navigation/navigator",
	"../navigation/method",
	"../jquery.mobile.events",
	"../jquery.mobile.support",
	"jquery-plugins/jquery.hashchange",
	"../widgets/page",
	"../transitions/handlers" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.pagecontainer", {
		options: {
			theme: "a"
		},

		initSelector: false,

		_create: function() {
			this._trigger( "beforecreate" );
			this.setLastScrollEnabled = true;

			this._on( this.window, {
				// disable an scroll setting when a hashchange has been fired,
				// this only works because the recording of the scroll position
				// is delayed for 100ms after the browser might have changed the
				// position because of the hashchange
				navigate: "_disableRecordScroll",

				// bind to scrollstop for the first page, "pagechange" won't be
				// fired in that case
				scrollstop: "_delayedRecordScroll"
			});

			// TODO consider moving the navigation handler OUT of widget into
			//      some other object as glue between the navigate event and the
			//      content widget load and change methods
			this._on( this.window, { navigate: "_filterNavigateEvents" });

			// TODO move from page* events to content* events
			this._on({ pagechange: "_afterContentChange" });

			// handle initial hashchange from chrome :(
			this.window.one( "navigate", $.proxy(function() {
				this.setLastScrollEnabled = true;
			}, this));
		},

		_setOptions: function( options ) {
			if ( options.theme !== undefined && options.theme !== "none" ) {
				this.element.removeClass( "ui-overlay-" + this.options.theme )
					.addClass( "ui-overlay-" + options.theme );
			} else if ( options.theme !== undefined ) {
				this.element.removeClass( "ui-overlay-" + this.options.theme );
			}

			this._super( options );
		},

		_disableRecordScroll: function() {
			this.setLastScrollEnabled = false;
		},

		_enableRecordScroll: function() {
			this.setLastScrollEnabled = true;
		},

		// TODO consider the name here, since it's purpose specific
		_afterContentChange: function() {
			// once the page has changed, re-enable the scroll recording
			this.setLastScrollEnabled = true;

			// remove any binding that previously existed on the get scroll
			// which may or may not be different than the scroll element
			// determined for this page previously
			this._off( this.window, "scrollstop" );

			// determine and bind to the current scoll element which may be the
			// window or in the case of touch overflow the element touch overflow
			this._on( this.window, { scrollstop: "_delayedRecordScroll" });
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
			return this.window.scrollTop();
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

			if ( !url || url === "#" || url.indexOf( "#" + $.mobile.path.uiStateKey ) === 0 ) {
				url = location.href;
			}

			this._handleNavigate( url, data.state );
		},

		_getHash: function() {
			return $.mobile.path.parseLocation().hash;
		},

		// TODO active page should be managed by the container (ie, it should be a property)
		getActivePage: function() {
			return this.activePage;
		},

		// TODO the first page should be a property set during _create using the logic
		//      that currently resides in init
		_getInitialContent: function() {
			return $.mobile.firstPage;
		},

		// TODO each content container should have a history object
		_getHistory: function() {
			return $.mobile.navigate.history;
		},

		_getActiveHistory: function() {
			return this._getHistory().getActive();
		},

		// TODO the document base should be determined at creation
		_getDocumentBase: function() {
			return $.mobile.path.documentBase;
		},

		back: function() {
			this.go( -1 );
		},

		forward: function() {
			this.go( 1 );
		},

		go: function( steps ) {

			//if hashlistening is enabled use native history method
			if ( $.mobile.hashListeningEnabled ) {
				window.history.go( steps );
			} else {

				//we are not listening to the hash so handle history internally
				var activeIndex = $.mobile.navigate.history.activeIndex,
					index = activeIndex + parseInt( steps, 10 ),
					url = $.mobile.navigate.history.stack[ index ].url,
					direction = ( steps >= 1 )? "forward" : "back";

				//update the history object
				$.mobile.navigate.history.activeIndex = index;
				$.mobile.navigate.history.previousIndex = activeIndex;

				//change to the new page
				this.change( url, { direction: direction, changeHash: false, fromHashChange: true } );
			}
		},

		// TODO rename _handleDestination
		_handleDestination: function( to ) {
			var history;

			// clean the hash for comparison if it's a url
			if ( $.type(to) === "string" ) {
				to = $.mobile.path.stripHash( to );
			}

			if ( to ) {
				history = this._getHistory();

				// At this point, 'to' can be one of 3 things, a cached page
				// element from a history stack entry, an id, or site-relative /
				// absolute URL. If 'to' is an id, we need to resolve it against
				// the documentBase, not the location.href, since the hashchange
				// could've been the result of a forward/backward navigation
				// that crosses from an external page/dialog to an internal
				// page/dialog.
				//
				// TODO move check to history object or path object?
				to = !$.mobile.path.isPath( to ) ? ( $.mobile.path.makeUrlAbsolute( "#" + to, this._getDocumentBase() ) ) : to;
			}
			return to || this._getInitialContent();
		},

		_transitionFromHistory: function( direction, defaultTransition ) {
			var history = this._getHistory(),
				entry = ( direction === "back" ? history.getLast() : history.getActive() );

			return ( entry && entry.transition ) || defaultTransition;
		},

		_handleDialog: function( changePageOptions, data ) {
			var to, active, activeContent = this.getActivePage();

			// If current active page is not a dialog skip the dialog and continue
			// in the same direction
			// Note: The dialog widget is deprecated as of 1.4.0 and will be removed in 1.5.0.
			// Thus, as of 1.5.0 activeContent.data( "mobile-dialog" ) will always evaluate to
			// falsy, so the second condition in the if-statement below can be removed altogether.
			if ( activeContent && !activeContent.data( "mobile-dialog" ) ) {
				// determine if we're heading forward or backward and continue
				// accordingly past the current dialog
				if ( data.direction === "back" ) {
					this.back();
				} else {
					this.forward();
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
					transition: this._transitionFromHistory(
						data.direction,
						changePageOptions.transition ),
					reverse: data.direction === "back"
				});
			}

			return to;
		},

		_handleNavigate: function( url, data ) {
			//find first page via hash
			// TODO stripping the hash twice with handleUrl
			var to = $.mobile.path.stripHash( url ), history = this._getHistory(),

				// transition is false if it's the first page, undefined
				// otherwise (and may be overridden by default)
				transition = history.stack.length === 0 ? "none" :
					this._transitionFromHistory( data.direction ),

				// default options for the changPage calls made after examining
				// the current state of the page and the hash, NOTE that the
				// transition is derived from the previous history entry
				changePageOptions = {
					changeHash: false,
					fromHashChange: true,
					reverse: data.direction === "back"
				};

			$.extend( changePageOptions, data, {
				transition: transition
			});

			// TODO move to _handleDestination ?
			// If this isn't the first page, if the current url is a dialog hash
			// key, and the initial destination isn't equal to the current target
			// page, use the special dialog handling
			if ( history.activeIndex > 0 &&
				to.indexOf( $.mobile.dialogHashKey ) > -1 ) {

				to = this._handleDialog( changePageOptions, data );

				if ( to === false ) {
					return;
				}
			}

			this._changeContent( this._handleDestination( to ), changePageOptions );
		},

		_changeContent: function( to, opts ) {
			$.mobile.changePage( to, opts );
		},

		_getBase: function() {
			return $.mobile.base;
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
			// NOTE do _not_ use the :jqmData pseudo selector because parenthesis
			//      are a valid url char and it breaks on the first occurence
			page = this.element
				.children( "[data-" + this._getNs() +
					"url='" + $.mobile.path.hashToSelector( dataUrl ) + "']" );

			// If we failed to find the page, check to see if the url is a
			// reference to an embedded page. If so, it may have been dynamically
			// injected by a developer, in which case it would be lacking a
			// data-url attribute and in need of enhancement.
			if ( page.length === 0 && dataUrl && !$.mobile.path.isPath( dataUrl ) ) {
				page = this.element.children( $.mobile.path.hashToSelector("#" + dataUrl) )
					.attr( "data-" + this._getNs() + "url", dataUrl )
					.jqmData( "url", dataUrl );
			}

			// If we failed to find a page in the DOM, check the URL to see if it
			// refers to the first page in the application. Also check to make sure
			// our cached-first-page is actually in the DOM. Some user deployed
			// apps are pruning the first page from the DOM for various reasons.
			// We check for this case here because we don't want a first-page with
			// an id falling through to the non-existent embedded page error case.
			if ( page.length === 0 &&
				$.mobile.path.isFirstPageUrl( fileUrl ) &&
				initialContent &&
				initialContent.parent().length ) {
				page = $( initialContent );
			}

			return page;
		},

		_getLoader: function() {
			return $.mobile.loading();
		},

		_showLoading: function( delay, theme, msg, textonly ) {
			// This configurable timeout allows cached pages a brief
			// delay to load without showing a message
			if ( this._loadMsg ) {
				return;
			}

			this._loadMsg = setTimeout($.proxy(function() {
				this._getLoader().loader( "show", theme, msg, textonly );
				this._loadMsg = 0;
			}, this), delay );
		},

		_hideLoading: function() {
			// Stop message show timer
			clearTimeout( this._loadMsg );
			this._loadMsg = 0;

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

			// TODO tagging a page with external to make sure that embedded pages aren't
			// removed by the various page handling code is bad. Having page handling code
			// in many places is bad. Solutions post 1.0
			page.attr( "data-" + this._getNs() + "url", this._createDataUrl( fileUrl ) )
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
			return $.mobile.path.convertUrlToDataUrl( absoluteUrl );
		},

		_createFileUrl: function( absoluteUrl ) {
			return $.mobile.path.getFilePath( absoluteUrl );
		},

		_triggerWithDeprecated: function( name, data, page ) {
			var deprecatedEvent = $.Event( "page" + name ),
				newEvent = $.Event( this.widgetName + name );

			// DEPRECATED
			// trigger the old deprecated event on the page if it's provided
			( page || this.element ).trigger( deprecatedEvent, data );

			// use the widget trigger method for the new content* event
			this._trigger( name, newEvent, data );

			return {
				deprecatedEvent: deprecatedEvent,
				event: newEvent
			};
		},

		// TODO it would be nice to split this up more but everything appears to be "one off"
		//      or require ordering such that other bits are sprinkled in between parts that
		//      could be abstracted out as a group
		_loadSuccess: function( absUrl, triggerData, settings, deferred ) {
			var fileUrl = this._createFileUrl( absUrl );

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
					fileUrl = $.mobile.path.getFilePath( $("<div>" + RegExp.$1 + "</div>").text() );

					// We specify that, if a data-url attribute is given on the page div, its value
					// must be given non-URL-encoded. However, in this part of the code, fileUrl is
					// assumed to be URL-encoded, so we URL-encode the retrieved value here
					fileUrl = this.window[ 0 ].encodeURIComponent( fileUrl );
				}

				//dont update the base tag if we are prefetching
				if ( settings.prefetch === undefined ) {
					this._getBase().set( fileUrl );
				}

				content = this._parse( html, fileUrl );

				this._setLoadedTitle( content, html );

				// Add the content reference and xhr to our triggerData.
				triggerData.xhr = xhr;
				triggerData.textStatus = textStatus;

				// DEPRECATED
				triggerData.page = content;

				triggerData.content = content;

				triggerData.toPage = content;

				// If the default behavior is prevented, stop here!
				// Note that it is the responsibility of the listener/handler
				// that called preventDefault(), to resolve/reject the
				// deferred object within the triggerData.
				if ( this._triggerWithDeprecated( "load", triggerData ).event.isDefaultPrevented() ) {
					return;
				}

				// rewrite src and href attrs to use a base url if the base tag won't work
				if ( this._isRewritableBaseTag() && content ) {
					this._getBase().rewrite( fileUrl, content );
				}

				this._include( content, settings );

				// Remove loading message.
				if ( settings.showLoadMsg ) {
					this._hideLoading();
				}

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
			var deferred = ( options && options.deferred ) || $.Deferred(),

				// Examining the option "reloadPage" passed by the user is deprecated as of 1.4.0
				// and will be removed in 1.5.0.
				// Copy option "reloadPage" to "reload", but only if option "reload" is not present
				reloadOptionExtension =
					( ( options && options.reload === undefined &&
						options.reloadPage !== undefined ) ?
							{ reload: options.reloadPage } : {} ),

				// The default load options with overrides specified by the caller.
				settings = $.extend( {}, this._loadDefaults, options, reloadOptionExtension ),

				// The DOM element for the content after it has been loaded.
				content = null,

				// The absolute version of the URL passed into the function. This
				// version of the URL may contain dialog/subcontent params in it.
				absUrl = $.mobile.path.makeUrlAbsolute( url, this._findBaseWithDefault() ),
				fileUrl, dataUrl, pblEvent, triggerData;

			// If the caller provided data, and we're using "get" request,
			// append the data to the URL.
			if ( settings.data && settings.type === "get" ) {
				absUrl = $.mobile.path.addSearchParams( absUrl, settings.data );
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
			// the content. For embedded content, it is just the id of the page. For
			// content within the same domain as the document base, it is the site
			// relative path. For cross-domain content (Phone Gap only) the entire
			// absolute Url is used to load the content.
			dataUrl = this._createDataUrl( absUrl );

			content = this._find( absUrl );

			// If it isn't a reference to the first content and refers to missing
			// embedded content reject the deferred and return
			if ( content.length === 0 &&
				$.mobile.path.isEmbeddedPage(fileUrl) &&
				!$.mobile.path.isFirstPageUrl(fileUrl) ) {
				deferred.reject( absUrl, settings );
				return deferred.promise();
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
				if ( !settings.prefetch ) {
					this._getBase().set(url);
				}

				return deferred.promise();
			}

			triggerData = {
				url: url,
				absUrl: absUrl,
				toPage: url,
				prevPage: options ? options.fromPage : undefined,
				dataUrl: dataUrl,
				deferred: deferred,
				options: settings
			};

			// Let listeners know we're about to load content.
			pblEvent = this._triggerWithDeprecated( "beforeload", triggerData );

			// If the default behavior is prevented, stop here!
			if ( pblEvent.deprecatedEvent.isDefaultPrevented() ||
				pblEvent.event.isDefaultPrevented() ) {
				return deferred.promise();
			}

			if ( settings.showLoadMsg ) {
				this._showLoading( settings.loadMsgDelay );
			}

			// Reset base to the default document base.
			// only reset if we are not prefetching
			if ( settings.prefetch === undefined ) {
				this._getBase().reset();
			}

			if ( !( $.mobile.allowCrossDomainPages ||
				$.mobile.path.isSameDomain($.mobile.path.documentUrl, absUrl ) ) ) {
				deferred.reject( absUrl, settings );
				return deferred.promise();
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

			return deferred.promise();
		},

		_loadError: function( absUrl, triggerData, settings, deferred ) {
			return $.proxy(function( xhr, textStatus, errorThrown ) {
				//set base back to current path
				this._getBase().set( $.mobile.path.get() );

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
			var samePage = false;

			prefix = prefix || "";

			// TODO decide if these events should in fact be triggered on the container
			if ( from ) {

				//Check if this is a same page transition and tell the handler in page
				if( to[0] === from[0] ){
					samePage = true;
				}

				//trigger before show/hide events
				// TODO deprecate nextPage in favor of next
				this._triggerWithDeprecated( prefix + "hide", {

					// Deprecated in 1.4 remove in 1.5
					nextPage: to,
					toPage: to,
					prevPage: from,
					samePage: samePage
				}, from );
			}

			// TODO deprecate prevPage in favor of previous
			this._triggerWithDeprecated( prefix + "show", {
				prevPage: from || $( "" ),
				toPage: to
			}, to );
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

			promise = ( new TransitionHandler( transition, reverse, to, from ) ).transition();

			promise.done( $.proxy( function() {
				this._triggerCssTransitionEvents( to, from );
			}, this ));

			// TODO temporary accomodation of argument deferred
			promise.done(function() {
				deferred.resolve.apply( deferred, arguments );
			});
		},

		_releaseTransitionLock: function() {
			//release transition lock so navigation is free again
			isPageTransitioning = false;
			if ( pageTransitionQueue.length > 0 ) {
				$.mobile.changePage.apply( null, pageTransitionQueue.pop() );
			}
		},

		_removeActiveLinkClass: function( force ) {
			//clear out the active button state
			$.mobile.removeActiveLinkClass( force );
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
			var returnEvents;

			triggerData.prevPage = this.activePage;
			$.extend( triggerData, {
				toPage: to,
				options: settings
			});

			// NOTE: preserve the original target as the dataUrl value will be
			// simplified eg, removing ui-state, and removing query params from
			// the hash this is so that users who want to use query params have
			// access to them in the event bindings for the page life cycle
			// See issue #5085
			if ( $.type(to) === "string" ) {
				// if the toPage is a string simply convert it
				triggerData.absUrl = $.mobile.path.makeUrlAbsolute( to, this._findBaseWithDefault() );
			} else {
				// if the toPage is a jQuery object grab the absolute url stored
				// in the loadPage callback where it exists
				triggerData.absUrl = settings.absUrl;
			}

			// Let listeners know we're about to change the current page.
			returnEvents = this._triggerWithDeprecated( "beforechange", triggerData );

			// If the default behavior is prevented, stop here!
			if ( returnEvents.event.isDefaultPrevented() ||
				returnEvents.deprecatedEvent.isDefaultPrevented() ) {
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
			settings.fromPage = settings.fromPage || this.activePage;

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

			triggerData.prevPage = settings.fromPage;
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
				settings.dataUrl = $.mobile.path.documentUrl.hrefNoHash;
			}

			// The caller passed us a real page DOM element. Update our
			// internal state and then trigger a transition to the page.
			fromPage = settings.fromPage;
			url = ( settings.dataUrl && $.mobile.path.convertUrlToDataUrl(settings.dataUrl) ) ||
				toPage.jqmData( "url" );

			// The pageUrl var is usually the same as url, except when url is obscured
			// as a dialog url. pageUrl always contains the file path
			pageUrl = url;
			fileUrl = $.mobile.path.getFilePath( url );
			active = $.mobile.navigate.history.getActive();
			activeIsInitialPage = $.mobile.navigate.history.activeIndex === 0;
			historyDir = 0;
			pageTitle = document.title;
			isDialog = ( settings.role === "dialog" ||
				toPage.jqmData( "role" ) === "dialog" ) &&
				toPage.jqmData( "dialog" ) !== true;

			// By default, we prevent changePage requests when the fromPage and toPage
			// are the same element, but folks that generate content
			// manually/dynamically and reuse pages want to be able to transition to
			// the same page. To allow this, they will need to change the default
			// value of allowSamePageTransition to true, *OR*, pass it in as an
			// option when they manually call changePage(). It should be noted that
			// our default transition animations assume that the formPage and toPage
			// are different elements, so they may behave unexpectedly. It is up to
			// the developer that turns on the allowSamePageTransitiona option to
			// either turn off transition animations, or make sure that an appropriate
			// animation transition is used.
			if ( fromPage && fromPage[0] === toPage[0] &&
				!settings.allowSamePageTransition ) {

				isPageTransitioning = false;
				this._triggerWithDeprecated( "transition", triggerData );
				this._triggerWithDeprecated( "change", triggerData );

				// Even if there is no page change to be done, we should keep the
				// urlHistory in sync with the hash changes
				if ( settings.fromHashChange ) {
					$.mobile.navigate.history.direct({ url: url });
				}

				return;
			}

			// We need to make sure the page we are given has already been enhanced.
			toPage.page({ role: settings.role });

			// If the changePage request was sent from a hashChange event, check to
			// see if the page is already within the urlHistory stack. If so, we'll
			// assume the user hit the forward/back button and will try to match the
			// transition accordingly.
			if ( settings.fromHashChange ) {
				historyDir = settings.direction === "back" ? -1 : 1;
			}

			// Kill the keyboard.
			// XXX_jblas: We need to stop crawling the entire document to kill focus.
			//            Instead, we should be tracking focus with a delegate()
			//            handler so we already have the element in hand at this
			//            point.
			// Wrap this in a try/catch block since IE9 throw "Unspecified error" if
			// document.activeElement is undefined when we are in an IFrame.
			try {
				if ( document.activeElement &&
					document.activeElement.nodeName.toLowerCase() !== "body" ) {

					$( document.activeElement ).blur();
				} else {
					$( "input:focus, textarea:focus, select:focus" ).blur();
				}
			} catch( e ) {}

			// Record whether we are at a place in history where a dialog used to be -
			// if so, do not add a new history entry and do not change the hash either
			alreadyThere = false;

			// If we're displaying the page as a dialog, we don't want the url
			// for the dialog content to be used in the hash. Instead, we want
			// to append the dialogHashKey to the url of the current page.
			if ( isDialog && active ) {
				// on the initial page load active.url is undefined and in that case
				// should be an empty string. Moving the undefined -> empty string back
				// into urlHistory.addNew seemed imprudent given undefined better
				// represents the url state

				// If we are at a place in history that once belonged to a dialog, reuse
				// this state without adding to urlHistory and without modifying the
				// hash. However, if a dialog is already displayed at this point, and
				// we're about to display another dialog, then we must add another hash
				// and history entry on top so that one may navigate back to the
				// original dialog
				if ( active.url &&
					active.url.indexOf( $.mobile.dialogHashKey ) > -1 &&
					this.activePage &&
					!this.activePage.hasClass( "ui-dialog" ) &&
					$.mobile.navigate.history.activeIndex > 0 ) {

					settings.changeHash = false;
					alreadyThere = true;
				}

				// Normally, we tack on a dialog hash key, but if this is the location
				// of a stale dialog, we reuse the URL from the entry
				url = ( active.url || "" );

				// account for absolute urls instead of just relative urls use as hashes
				if ( !alreadyThere && url.indexOf("#") > -1 ) {
					url += $.mobile.dialogHashKey;
				} else {
					url += "#" + $.mobile.dialogHashKey;
				}
			}

			// if title element wasn't found, try the page div data attr too
			// If this is a deep-link or a reload ( active === undefined ) then just
			// use pageTitle
			newPageTitle = ( !active ) ? pageTitle : toPage.jqmData( "title" ) ||
				toPage.children( ":jqmData(role='header')" ).find( ".ui-title" ).text();
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
				$.mobile.navigate.history.getActive().pageUrl = pageUrl;
			}

			// Set the location hash.
			if ( url && !settings.fromHashChange ) {

				// rebuilding the hash here since we loose it earlier on
				// TODO preserve the originally passed in path
				if ( !$.mobile.path.isPath( url ) && url.indexOf( "#" ) < 0 ) {
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
					$.mobile.navigate( this.window[ 0 ].encodeURI( url ), params, true);
				} else if ( toPage[ 0 ] !== $.mobile.firstPage[ 0 ] ) {
					$.mobile.navigate.history.add( url, params );
				}
			}

			//set page title
			document.title = pageTitle;

			//set "toPage" as activePage deprecated in 1.4 remove in 1.5
			$.mobile.activePage = toPage;

			//new way to handle activePage
			this.activePage = toPage;

			// If we're navigating back in the URL history, set reverse accordingly.
			settings.reverse = settings.reverse || historyDir < 0;

			cssTransitionDeferred = $.Deferred();

			this._cssTransition(toPage, fromPage, {
				transition: settings.transition,
				reverse: settings.reverse,
				deferred: cssTransitionDeferred
			});

			cssTransitionDeferred.done($.proxy(function( name, reverse, $to, $from, alreadyFocused ) {
				$.mobile.removeActiveLinkClass();

				//if there's a duplicateCachedPage, remove it from the DOM now that it's hidden
				if ( settings.duplicateCachedPage ) {
					settings.duplicateCachedPage.remove();
				}

				// despite visibility: hidden addresses issue #2965
				// https://github.com/jquery/jquery-mobile/issues/2965
				if ( !alreadyFocused ) {
					$.mobile.focusPage( toPage );
				}

				this._releaseTransitionLock();
				this._triggerWithDeprecated( "transition", triggerData );
				this._triggerWithDeprecated( "change", triggerData );
			}, this));
		},

		// determine the current base url
		_findBaseWithDefault: function() {
			var closestBase = ( this.activePage &&
			$.mobile.getClosestBaseUrl( this.activePage ) );
		return closestBase || $.mobile.path.documentBase.hrefNoHash;
		}
	});

	// The following handlers should be bound after mobileinit has been triggered
	// the following deferred is resolved in the init file
	$.mobile.navreadyDeferred = $.Deferred();

	//these variables make all page containers use the same queue and only navigate one at a time
	// queue to hold simultanious page transitions
	var pageTransitionQueue = [],

		// indicates whether or not page is in process of transitioning
		isPageTransitioning = false;

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
