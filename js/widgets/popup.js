//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Popup windows
//>>label: Popups
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.popup.css,../css/structure/jquery.mobile.transition.css,../css/structure/jquery.mobile.transition.fade.css

define( [ "jquery",
	"../jquery.mobile.widget",
	"../jquery.mobile.support",
	"../jquery.mobile.navigation",
	"depend!../jquery.hashchange[jquery]" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	function fitSegmentInsideSegment( winSize, segSize, offset, desired ) {
		var ret = desired;

		if ( winSize < segSize ) {
			// Center segment if it's bigger than the window
			ret = offset + ( winSize - segSize ) / 2;
		} else {
			// Otherwise center it at the desired coordinate while keeping it completely inside the window
			ret = Math.min( Math.max( offset, desired - segSize / 2 ), offset + winSize - segSize );
		}

		return ret;
	}

	function windowCoords() {
		var $win = $( window );

		return {
			x: $win.scrollLeft(),
			y: $win.scrollTop(),
			cx: ( window.innerWidth || $win.width() ),
			cy: ( window.innerHeight || $win.height() )
		};
	}

	$.widget( "mobile.popup", $.mobile.widget, {
		options: {
			theme: null,
			overlayTheme: null,
			shadow: true,
			corners: true,
			transition: "none",
			positionTo: "origin",
			tolerance: null,
			initSelector: ":jqmData(role='popup')",
			closeLinkSelector: "a:jqmData(rel='back')",
			closeLinkEvents: "click.popup",
			navigateEvents: "navigate.popup",
			closeEvents: "navigate.popup pagebeforechange.popup",

			// NOTE Windows Phone 7 has a scroll position caching issue that
			//      requires us to disable popup history management by default
			//      https://github.com/jquery/jquery-mobile/issues/4784
			//
			// NOTE this option is modified in _create!
			history: !$.mobile.browser.ie
		},

		_eatEventAndClose: function( e ) {
			e.preventDefault();
			e.stopImmediatePropagation();
			this.close();
			return false;
		},

		// Make sure the screen size is increased beyond the page height if the popup's causes the document to increase in height
		_resizeScreen: function() {
			var popupHeight = this._ui.container.outerHeight( true );

			this._ui.screen.removeAttr( "style" );
			if ( popupHeight > this._ui.screen.height() ) {
				this._ui.screen.height( popupHeight );
			}
		},

		_handleWindowKeyUp: function( e ) {
			if ( this._isOpen && e.keyCode === $.mobile.keyCode.ESCAPE ) {
				return this._eatEventAndClose( e );
			}
		},

		_maybeRefreshTimeout: function() {
			var winCoords = windowCoords();

			if ( this._resizeData ) {
				if ( winCoords.x === this._resizeData.winCoords.x &&
					winCoords.y === this._resizeData.winCoords.y &&
					winCoords.cx === this._resizeData.winCoords.cx &&
					winCoords.cy === this._resizeData.winCoords.cy ) {
					// timeout not refreshed
					return false;
				} else {
					// clear existing timeout - it will be refreshed below
					clearTimeout( this._resizeData.timeoutId );
				}
			}

			this._resizeData = {
				timeoutId: setTimeout( $.proxy( this, "_resizeTimeout" ), 200 ),
				winCoords: winCoords
			};

			return true;
		},

		_resizeTimeout: function() {
			if ( !this._maybeRefreshTimeout() ) {
				// effectively rapid-open the popup while leaving the screen intact
				this._trigger( "beforeposition" );
				this._ui.container
					.removeClass( "ui-selectmenu-hidden" )
					.offset( this._placementCoords( this._desiredCoords( undefined, undefined, "window" ) ) );

				this._resizeScreen();
				this._resizeData = null;
				this._orientationchangeInProgress = false;
			}
		},

		_handleWindowResize: function( e ) {
			if ( this._isOpen ) {
				this._maybeRefreshTimeout();
			}
		},

		_handleWindowOrientationchange: function( e ) {

			if ( !this._orientationchangeInProgress ) {
				// effectively rapid-close the popup while leaving the screen intact
				this._ui.container
					.addClass( "ui-selectmenu-hidden" )
					.removeAttr( "style" );

				this._orientationchangeInProgress = true;
			}
		},

		_create: function() {
			var ui = {
					screen: $( "<div class='ui-screen-hidden ui-popup-screen'></div>" ),
					placeholder: $( "<div style='display: none;'><!-- placeholder --></div>" ),
					container: $( "<div class='ui-popup-container ui-selectmenu-hidden'></div>" )
				},
				thisPage = this.element.closest( ".ui-page" ),
				myId = this.element.attr( "id" ),
				self = this;

			// We need to adjust the history option to be false if there's no AJAX nav.
			// We can't do it in the option declarations because those are run before
			// it is determined whether there shall be AJAX nav.
			this.options.history = this.options.history && $.mobile.ajaxEnabled && $.mobile.hashListeningEnabled;

			if ( thisPage.length === 0 ) {
				thisPage = $( "body" );
			}

			// define the container for navigation event bindings
			// TODO this would be nice at the the mobile widget level
			this.options.container = this.options.container || $.mobile.pageContainer;

			// Apply the proto
			thisPage.append( ui.screen );
			ui.container.insertAfter( ui.screen );
			// Leave a placeholder where the element used to be
			ui.placeholder.insertAfter( this.element );
			if ( myId ) {
				ui.screen.attr( "id", myId + "-screen" );
				ui.container.attr( "id", myId + "-popup" );
				ui.placeholder.html( "<!-- placeholder for " + myId + " -->" );
			}
			ui.container.append( this.element );

			// Add class to popup element
			this.element.addClass( "ui-popup" );

			// Define instance variables
			$.extend( this, {
				_page: thisPage,
				_ui: ui,
				_fallbackTransition: "",
				_currentTransition: false,
				_prereqs: null,
				_isOpen: false,
				_tolerance: null,
				_resizeData: null,
				_orientationchangeInProgress: false,
				_globalHandlers: [
					{
						src: $( window ),
						handler: {
							orientationchange: $.proxy( this, "_handleWindowOrientationchange" ),
							resize: $.proxy( this, "_handleWindowResize" ),
							keyup: $.proxy( this, "_handleWindowKeyUp" )
						}
					}
				]
			});

			$.each( this.options, function( key, value ) {
				// Cause initial options to be applied by their handler by temporarily setting the option to undefined
				// - the handler then sets it to the initial value
				self.options[ key ] = undefined;
				self._setOption( key, value, true );
			});

			ui.screen.bind( "vclick", $.proxy( this, "_eatEventAndClose" ) );

			$.each( this._globalHandlers, function( idx, value ) {
				value.src.bind( value.handler );
			});
		},

		_applyTheme: function( dst, theme, prefix ) {
			var classes = ( dst.attr( "class" ) || "").split( " " ),
				alreadyAdded = true,
				currentTheme = null,
				matches,
				themeStr = String( theme );

			while ( classes.length > 0 ) {
				currentTheme = classes.pop();
				matches = ( new RegExp( "^ui-" + prefix + "-([a-z])$" ) ).exec( currentTheme );
				if ( matches && matches.length > 1 ) {
					currentTheme = matches[ 1 ];
					break;
				} else {
					currentTheme = null;
				}
			}

			if ( theme !== currentTheme ) {
				dst.removeClass( "ui-" + prefix + "-" + currentTheme );
				if ( ! ( theme === null || theme === "none" ) ) {
					dst.addClass( "ui-" + prefix + "-" + themeStr );
				}
			}
		},

		_setTheme: function( value ) {
			this._applyTheme( this.element, value, "body" );
		},

		_setOverlayTheme: function( value ) {
			this._applyTheme( this._ui.screen, value, "overlay" );

			if ( this._isOpen ) {
				this._ui.screen.addClass( "in" );
			}
		},

		_setShadow: function( value ) {
			this.element.toggleClass( "ui-overlay-shadow", value );
		},

		_setCorners: function( value ) {
			this.element.toggleClass( "ui-corner-all", value );
		},

		_applyTransition: function( value ) {
			this._ui.container.removeClass( this._fallbackTransition );
			if ( value && value !== "none" ) {
				this._fallbackTransition = $.mobile._maybeDegradeTransition( value );
				this._ui.container.addClass( this._fallbackTransition );
			}
		},

		_setTransition: function( value ) {
			if ( !this._currentTransition ) {
				this._applyTransition( value );
			}
		},

		_setTolerance: function( value ) {
			var tol = { t: 30, r: 15, b: 30, l: 15 };

			if ( value ) {
				var ar = String( value ).split( "," );

				$.each( ar, function( idx, val ) { ar[ idx ] = parseInt( val, 10 ); } );

				switch( ar.length ) {
					// All values are to be the same
					case 1:
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.t = tol.r = tol.b = tol.l = ar[ 0 ];
						}
						break;

					// The first value denotes top/bottom tolerance, and the second value denotes left/right tolerance
					case 2:
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.t = tol.b = ar[ 0 ];
						}
						if ( !isNaN( ar[ 1 ] ) ) {
							tol.l = tol.r = ar[ 1 ];
						}
						break;

					// The array contains values in the order top, right, bottom, left
					case 4:
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.t = ar[ 0 ];
						}
						if ( !isNaN( ar[ 1 ] ) ) {
							tol.r = ar[ 1 ];
						}
						if ( !isNaN( ar[ 2 ] ) ) {
							tol.b = ar[ 2 ];
						}
						if ( !isNaN( ar[ 3 ] ) ) {
							tol.l = ar[ 3 ];
						}
						break;

					default:
						break;
				}
			}

			this._tolerance = tol;
		},

		_setOption: function( key, value ) {
			var exclusions, setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
			}

			// TODO REMOVE FOR 1.2.1 by moving them out to a default options object
			exclusions = [
				"initSelector",
				"closeLinkSelector",
				"closeLinkEvents",
				"navigateEvents",
				"closeEvents",
				"history",
				"container"
			];

			$.mobile.widget.prototype._setOption.apply( this, arguments );
			if ( $.inArray( key, exclusions ) === -1 ) {
				// Record the option change in the options and in the DOM data-* attributes
				this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
			}
		},

		// Try and center the overlay over the given coordinates
		_placementCoords: function( desired ) {
			// rectangle within which the popup must fit
			var
				winCoords = windowCoords(),
				rc = {
					x: this._tolerance.l,
					y: winCoords.y + this._tolerance.t,
					cx: winCoords.cx - this._tolerance.l - this._tolerance.r,
					cy: winCoords.cy - this._tolerance.t - this._tolerance.b
				},
				menuSize, ret;

			// Clamp the width of the menu before grabbing its size
			this._ui.container.css( "max-width", rc.cx );
			menuSize = {
				cx: this._ui.container.outerWidth( true ),
				cy: this._ui.container.outerHeight( true )
			};

			// Center the menu over the desired coordinates, while not going outside
			// the window tolerances. This will center wrt. the window if the popup is too large.
			ret = {
				x: fitSegmentInsideSegment( rc.cx, menuSize.cx, rc.x, desired.x ),
				y: fitSegmentInsideSegment( rc.cy, menuSize.cy, rc.y, desired.y )
			};

			// Make sure the top of the menu is visible
			ret.y = Math.max( 0, ret.y );

			// If the height of the menu is smaller than the height of the document
			// align the bottom with the bottom of the document

			// fix for $( document ).height() bug in core 1.7.2.
			var docEl = document.documentElement, docBody = document.body,
				docHeight = Math.max( docEl.clientHeight, docBody.scrollHeight, docBody.offsetHeight, docEl.scrollHeight, docEl.offsetHeight );

			ret.y -= Math.min( ret.y, Math.max( 0, ret.y + menuSize.cy - docHeight ) );

			return { left: ret.x, top: ret.y };
		},

		_createPrereqs: function( screenPrereq, containerPrereq, whenDone ) {
			var self = this, prereqs;

			// It is important to maintain both the local variable prereqs and self._prereqs. The local variable remains in
			// the closure of the functions which call the callbacks passed in. The comparison between the local variable and
			// self._prereqs is necessary, because once a function has been passed to .animationComplete() it will be called
			// next time an animation completes, even if that's not the animation whose end the function was supposed to catch
			// (for example, if an abort happens during the opening animation, the .animationComplete handler is not called for
			// that animation anymore, but the handler remains attached, so it is called the next time the popup is opened
			// - making it stale. Comparing the local variable prereqs to the widget-level variable self._prereqs ensures that
			// callbacks triggered by a stale .animationComplete will be ignored.

			prereqs = {
				screen: $.Deferred(),
				container: $.Deferred()
			};

			prereqs.screen.then( function() {
				if ( prereqs === self._prereqs ) {
					screenPrereq();
				}
			});

			prereqs.container.then( function() {
				if ( prereqs === self._prereqs ) {
					containerPrereq();
				}
			});

			$.when( prereqs.screen, prereqs.container ).done( function() {
				if ( prereqs === self._prereqs ) {
					self._prereqs = null;
					whenDone();
				}
			});

			self._prereqs = prereqs;
		},

		_animate: function( args ) {
			// NOTE before removing the default animation of the screen
			//      this had an animate callback that would relove the deferred
			//      now the deferred is resolved immediately
			// TODO remove the dependency on the screen deferred
			this._ui.screen
				.removeClass( args.classToRemove )
				.addClass( args.screenClassToAdd );

			args.prereqs.screen.resolve();

			if ( args.transition && args.transition !== "none" ) {
				if ( args.applyTransition ) {
					this._applyTransition( args.transition );
				}
				this._ui.container
					.animationComplete( $.proxy( args.prereqs.container, "resolve" ) )
					.addClass( args.containerClassToAdd )
					.removeClass( args.classToRemove );
			} else {
				args.prereqs.container.resolve();
			}
		},

		// The desired coordinates passed in will be returned untouched if no reference element can be identified via
		// desiredPosition.positionTo. Nevertheless, this function ensures that its return value always contains valid
		// x and y coordinates by specifying the center middle of the window if the coordinates are absent.
		_desiredCoords: function( x, y, positionTo ) {
			var dst = null, offset, winCoords = windowCoords();

			// Establish which element will serve as the reference
			if ( positionTo && positionTo !== "origin" ) {
				if ( positionTo === "window" ) {
					x = winCoords.cx / 2 + winCoords.x;
					y = winCoords.cy / 2 + winCoords.y;
				} else {
					try {
						dst = $( positionTo );
					} catch( e ) {
						dst = null;
					}
					if ( dst ) {
						dst.filter( ":visible" );
						if ( dst.length === 0 ) {
							dst = null;
						}
					}
				}
			}

			// If an element was found, center over it
			if ( dst ) {
				offset = dst.offset();
				x = offset.left + dst.outerWidth() / 2;
				y = offset.top + dst.outerHeight() / 2;
			}

			// Make sure x and y are valid numbers - center over the window
			if ( $.type( x ) !== "number" || isNaN( x ) ) {
				x = winCoords.cx / 2 + winCoords.x;
			}
			if ( $.type( y ) !== "number" || isNaN( y ) ) {
				y = winCoords.cy / 2 + winCoords.y;
			}

			return { x: x, y: y };
		},

		_openPrereqsComplete: function() {
			var self = this;

			self._ui.container.addClass( "ui-popup-active" );
			self._isOpen = true;
			self._resizeScreen();

			// Android appears to trigger the animation complete before the popup
			// is visible. Allowing the stack to unwind before applying focus prevents
			// the "blue flash" of element focus in android 4.0
			setTimeout(function(){
				self._ui.container.attr( "tabindex", "0" ).focus();
				self._trigger( "afteropen" );
			});
		},

		_open: function( options ) {
			var coords, transition,
				androidBlacklist = ( function() {
					var w = window,
						ua = navigator.userAgent,
						// Rendering engine is Webkit, and capture major version
						wkmatch = ua.match( /AppleWebKit\/([0-9\.]+)/ ),
						wkversion = !!wkmatch && wkmatch[ 1 ],
						androidmatch = ua.match( /Android (\d+(?:\.\d+))/ ),
						andversion = !!androidmatch && androidmatch[ 1 ],
						chromematch = ua.indexOf( "Chrome" ) > -1;

					// Platform is Android, WebKit version is greater than 534.13 ( Android 3.2.1 ) and not Chrome.
					if( androidmatch !== null && andversion === "4.0" && wkversion && wkversion > 534.13 && !chromematch ) {
						return true;
					}
					return false;
				}());

			// Make sure options is defined
			options = ( options || {} );

			// Copy out the transition, because we may be overwriting it later and we don't want to pass that change back to the caller
			transition = options.transition || this.options.transition;

			// Give applications a chance to modify the contents of the container before it appears
			this._trigger( "beforeposition" );

			coords = this._placementCoords( this._desiredCoords( options.x, options.y, options.positionTo || this.options.positionTo || "origin" ) );

			// Count down to triggering "popupafteropen" - we have two prerequisites:
			// 1. The popup window animation completes (container())
			// 2. The screen opacity animation completes (screen())
			this._createPrereqs(
				$.noop,
				$.noop,
				$.proxy( this, "_openPrereqsComplete" ) );

			if ( transition ) {
				this._currentTransition = transition;
				this._applyTransition( transition );
			} else {
				transition = this.options.transition;
			}

			if ( !this.options.theme ) {
				this._setTheme( this._page.jqmData( "theme" ) || $.mobile.getInheritedTheme( this._page, "c" ) );
			}

			this._ui.screen.removeClass( "ui-screen-hidden" );

			this._ui.container
				.removeClass( "ui-selectmenu-hidden" )
				.offset( coords );

			if ( this.options.overlayTheme && androidBlacklist ) {
				/* TODO:
				The native browser on Android 4.0.X ("Ice Cream Sandwich") suffers from an issue where the popup overlay appears to be z-indexed
				above the popup itself when certain other styles exist on the same page -- namely, any element set to `position: fixed` and certain
				types of input. These issues are reminiscent of previously uncovered bugs in older versions of Android's native browser:
				https://github.com/scottjehl/Device-Bugs/issues/3

				This fix closes the following bugs ( I use "closes" with reluctance, and stress that this issue should be revisited as soon as possible ):

				https://github.com/jquery/jquery-mobile/issues/4816
				https://github.com/jquery/jquery-mobile/issues/4844
				https://github.com/jquery/jquery-mobile/issues/4874
				*/

				// TODO sort out why this._page isn't working
				this.element.closest( ".ui-page" ).addClass( "ui-popup-open" );
			}
			this._animate({
				additionalCondition: true,
				transition: transition,
				classToRemove: "",
				screenClassToAdd: "in",
				containerClassToAdd: "in",
				applyTransition: false,
				prereqs: this._prereqs
			});
		},

		_closePrereqScreen: function() {
			this._ui.screen
				.removeClass( "out" )
				.addClass( "ui-screen-hidden" );
		},

		_closePrereqContainer: function() {
			this._ui.container
				.removeClass( "reverse out" )
				.addClass( "ui-selectmenu-hidden" )
				.removeAttr( "style" );
		},

		_closePrereqsDone: function() {
			var self = this, opts = self.options;

			self._ui.container.removeAttr( "tabindex" );

			// remove nav bindings if they are still present
			opts.container.unbind( opts.closeEvents );

			// unbind click handlers added when history is disabled
			self.element.undelegate( opts.closeLinkSelector, opts.closeLinkEvents );

			// remove the global mutex for popups
			$.mobile.popup.active = undefined;

			// alert users that the popup is closed
			self._trigger( "afterclose" );
		},

		_close: function() {
			this._ui.container.removeClass( "ui-popup-active" );
			this._page.removeClass( "ui-popup-open" );

			this._isOpen = false;

			// Count down to triggering "popupafterclose" - we have two prerequisites:
			// 1. The popup window reverse animation completes (container())
			// 2. The screen opacity animation completes (screen())
			this._createPrereqs(
				$.proxy( this, "_closePrereqScreen" ),
				$.proxy( this, "_closePrereqContainer" ),
				$.proxy( this, "_closePrereqsDone" ) );

			this._animate( {
				additionalCondition: this._ui.screen.hasClass( "in" ),
				transition: ( this._currentTransition || this.options.transition ),
				classToRemove: "in",
				screenClassToAdd: "out",
				containerClassToAdd: "reverse out",
				applyTransition: true,
				prereqs: this._prereqs
			});
		},

		_destroy: function() {
			var self = this;

			// hide and remove bindings
			self._close();

			// Put the element back to where the placeholder was and remove the "ui-popup" class
			self._setTheme( "none" );
			self.element
				.insertAfter( self._ui.placeholder )
				.removeClass( "ui-popup ui-overlay-shadow ui-corner-all" );
			self._ui.screen.remove();
			self._ui.container.remove();
			self._ui.placeholder.remove();

			// Unbind handlers that were bound to elements outside self.element (the window, in self case)
			$.each( self._globalHandlers, function( idx, oneSrc ) {
				$.each( oneSrc.handler, function( eventType, handler ) {
					oneSrc.src.unbind( eventType, handler );
				});
			});
		},

		// any navigation event after a popup is opened should close the popup
		// NOTE the pagebeforechange is bound to catch navigation events that don't
		//      alter the url (eg, dialogs from popups)
		_bindContainerClose: function() {
			var self = this;

			self.options.container
				.one( self.options.closeEvents, $.proxy( self._close, self ));
		},

		// TODO no clear deliniation of what should be here and
		// what should be in _open. Seems to be "visual" vs "history" for now
		open: function( options ) {
			var self = this, opts = this.options, url, hashkey, activePage, currentIsDialog, hasHash, urlHistory;

			// make sure open is idempotent
			if( $.mobile.popup.active ) {
				return;
			}

			// set the global popup mutex
			$.mobile.popup.active = this;

			// if history alteration is disabled close on navigate events
			// and leave the url as is
			if( !( opts.history ) ) {
				self._open( options );
				self._bindContainerClose();

				// When histoy is disabled we have to grab the data-rel
				// back link clicks so we can close the popup instead of
				// relying on history to do it for us
				self.element
					.delegate( opts.closeLinkSelector, opts.closeLinkEvents, function( e ) {
						self._close();

						// NOTE prevent the browser and navigation handlers from
						// working with the link's rel=back. This may cause
						// issues for developers expecting the event to bubble
						return false;
					});

				return;
			}

			// cache some values for min/readability
			hashkey = $.mobile.dialogHashKey;
			activePage = $.mobile.activePage;
			currentIsDialog = activePage.is( ".ui-dialog" );
			url = $.mobile.urlHistory.getActive().url;
			hasHash = ( url.indexOf( hashkey ) > -1 ) && !currentIsDialog;
			urlHistory = $.mobile.urlHistory;

			if ( hasHash ) {
				self._open( options );
				self._bindContainerClose();
				return;
			}

			// if the current url has no dialog hash key proceed as normal
			// otherwise, if the page is a dialog simply tack on the hash key
			if ( url.indexOf( hashkey ) === -1 && !currentIsDialog ){
				url = url + hashkey;
			} else {
				url = $.mobile.path.parseLocation().hash + hashkey;
			}

			// Tack on an extra hashkey if this is the first page and we've just reconstructed the initial hash
			if ( urlHistory.activeIndex === 0 && url === urlHistory.initialDst ) {
				url += hashkey;
			}

			// swallow the the initial navigation event, and bind for the next
			opts.container.one( opts.navigateEvents, function( e ) {
				e.preventDefault();
				self._open( options );
				self._bindContainerClose();
			});

			urlHistory.ignoreNextHashChange = currentIsDialog;

			// Gotta love methods with 1mm args :(
			urlHistory.addNew( url, undefined, undefined, undefined, "dialog" );

			// set the new url with (or without) the new dialog hash key
			$.mobile.path.set( url );
		},

		close: function() {
			// make sure close is idempotent
			if( !$.mobile.popup.active ){
				return;
			}

			if( this.options.history ) {
				$.mobile.back();
			} else {
				this._close();
			}
		}
	});


	// TODO this can be moved inside the widget
	$.mobile.popup.handleLink = function( $link ) {
		var closestPage = $link.closest( ":jqmData(role='page')" ),
			scope = ( ( closestPage.length === 0 ) ? $( "body" ) : closestPage ),
			// NOTE make sure to get only the hash, ie7 (wp7) return the absolute href
			//      in this case ruining the element selection
			popup = $( $.mobile.path.parseUrl($link.attr( "href" )).hash, scope[0] ),
			offset;

		if ( popup.data( "popup" ) ) {
			offset = $link.offset();
			popup.popup( "open", {
				x: offset.left + $link.outerWidth() / 2,
				y: offset.top + $link.outerHeight() / 2,
				transition: $link.jqmData( "transition" ),
				positionTo: $link.jqmData( "position-to" ),
				link: $link
			});
		}

		//remove after delay
		setTimeout( function() {
			$link.removeClass( $.mobile.activeBtnClass );
		}, 300 );
	};

	// TODO move inside _create
	$( document ).bind( "pagebeforechange", function( e, data ) {
		if ( data.options.role === "popup" ) {
			$.mobile.popup.handleLink( data.options.link );
			e.preventDefault();
		}
	});

	$( document ).bind( "pagecreate create", function( e )  {
		$.mobile.popup.prototype.enhanceWithin( e.target, true );
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
