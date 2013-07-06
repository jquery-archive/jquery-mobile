//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Popup windows
//>>label: Popups
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.popup.css,../css/structure/jquery.mobile.transition.css,../css/structure/jquery.mobile.transition.fade.css

// Lessons:
// You must remove nav bindings even if there is no history. Make sure you
// remove nav bindings in the same frame as the beginning of the close process
// if there is no history. If there is history, remove nav bindings from the nav
// bindings handler - that way, only one of them can fire per close process.

define( [
	"jquery",
	"../jquery.mobile.links",
	"../jquery.mobile.widget",
	"../jquery.mobile.support",
	"../events/navigate",
	"../navigation/path",
	"../navigation/history",
	"../navigation/navigator",
	"../navigation/method",
	"../jquery.mobile.navigation",
	"../jquery.mobile.registry",
	"jquery.hashchange" ], function( jQuery ) {
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
	var $win = $.mobile.window;

	return {
		x: $win.scrollLeft(),
		y: $win.scrollTop(),
		cx: ( window.innerWidth || $win.width() ),
		cy: ( window.innerHeight || $win.height() )
	};
}

$.widget( "mobile.popup", {
	options: {
		wrapperClass: null,
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
		dismissible: true,
		enhanced: false,

		// NOTE Windows Phone 7 has a scroll position caching issue that
		//      requires us to disable popup history management by default
		//      https://github.com/jquery/jquery-mobile/issues/4784
		//
		// NOTE this option is modified in _create!
		history: !$.mobile.browser.oldIE
	},

	_eatEventAndClose: function( evt ) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		if ( this.options.dismissible ) {
			this.close();
		}
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

	_handleWindowKeyUp: function( evt ) {
		if ( this._isOpen && evt.keyCode === $.mobile.keyCode.ESCAPE ) {
			return this._eatEventAndClose( evt );
		}
	},

	_expectResizeEvent: function() {
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
			timeoutId: this._delay( "_resizeTimeout", 200 ),
			winCoords: winCoords
		};

		return true;
	},

	_resizeTimeout: function() {
		if ( this._isOpen ) {
			if ( !this._expectResizeEvent() ) {
				if ( this._ui.container.hasClass( "ui-popup-hidden" ) ) {
					// effectively rapid-open the popup while leaving the screen intact
					this._ui.container.removeClass( "ui-popup-hidden" );
					this.reposition( { positionTo: "window" } );
					this._ignoreResizeEvents();
				}

				this._resizeScreen();
				this._resizeData = null;
				this._orientationchangeInProgress = false;
			}
		} else {
			this._resizeData = null;
			this._orientationchangeInProgress = false;
		}
	},

	_stopIgnoringResizeEvents: function() {
		this._ignoreResizeTo = 0;
	},

	_ignoreResizeEvents: function() {
		if ( this._ignoreResizeTo ) {
			clearTimeout( this._ignoreResizeTo );
		}
		this._ignoreResizeTo = this._delay( "_stopIgnoringResizeEvents", 1000 );
	},

	_handleWindowResize: function(/* evt */) {
		if ( this._isOpen && this._ignoreResizeTo === 0 ) {
			if ( ( this._expectResizeEvent() || this._orientationchangeInProgress ) &&
				!this._ui.container.hasClass( "ui-popup-hidden" ) ) {
				// effectively rapid-close the popup while leaving the screen intact
				this._ui.container
					.addClass( "ui-popup-hidden" )
					.removeAttr( "style" );
			}
		}
	},

	_handleWindowOrientationchange: function(/* evt */) {
		if ( !this._orientationchangeInProgress && this._isOpen && this._ignoreResizeTo === 0 ) {
			this._expectResizeEvent();
			this._orientationchangeInProgress = true;
		}
	},

	// When the popup is open, attempting to focus on an element that is not a
	// child of the popup will redirect focus to the popup
	_handleDocumentFocusIn: function( evt ) {
		var tgt = evt.target, $tgt, ui = this._ui;

		if ( !this._isOpen ) {
			return;
		}

		if ( tgt !== ui.container[ 0 ] ) {
			$tgt = $( evt.target );
			if ( 0 === $tgt.parents().filter( ui.container[ 0 ] ).length ) {
				$( document.activeElement ).one( "focus", function(/* evt */) {
					$tgt.blur();
				});
				ui.focusElement.focus();
				evt.preventDefault();
				evt.stopImmediatePropagation();
				return false;
			} else if ( ui.focusElement[ 0 ] === ui.container[ 0 ] ) {
				ui.focusElement = $tgt;
			}
		}

		this._ignoreResizeEvents();
	},

	_create: function() {
		var elem = this.element,
			myId = elem.attr( "id" ),
			opts = this.options;

		// We need to adjust the history option to be false if there's no AJAX nav.
		// We can't do it in the option declarations because those are run before
		// it is determined whether there shall be AJAX nav.
		opts.history = opts.history && $.mobile.ajaxEnabled && $.mobile.hashListeningEnabled;

		// Define instance variables
		$.extend( this, {
			_containerClasses: "",
			_scrollTop: 0,
			_page: elem.closest( ".ui-page" ),
			_ui: null,
			_fallbackTransition: "",
			_currentTransition: false,
			_prereqs: null,
			_isOpen: false,
			_tolerance: null,
			_resizeData: null,
			_ignoreResizeTo: 0,
			_orientationchangeInProgress: false
		});

		if ( this._page.length === 0 ) {
			this._page = this.body;
		}

		if ( opts.enhanced ) {
			this._ui = {
				container: elem.parent(),
				screen: elem.parent().prev(),
				placeholder: $( this.document[ 0 ].getElementById( myId + "-placeholder" ) )
			};
		} else {
			this._ui = this._enhance( elem, myId );
			this._setOptions( opts );
		}
		this._ui.focusElement = this._ui.container;

		// Event handlers
		this._on( this._ui.screen, { "vclick": "_eatEventAndClose" } );
		this._on( $.mobile.window, {
			orientationchange: $.proxy( this, "_handleWindowOrientationchange" ),
			resize: $.proxy( this, "_handleWindowResize" ),
			keyup: $.proxy( this, "_handleWindowKeyUp" )
		});
		this._on( $.mobile.document, { "focusin": "_handleDocumentFocusIn" } );
	},

	_enhance: function( elem, myId ) {
		var ui = {
				screen: $( "<div class='ui-screen-hidden ui-popup-screen'></div>" ),
				placeholder: $( "<div style='display: none;'><!-- placeholder --></div>" ),
				container: $( "<div class='ui-popup-container ui-popup-hidden'></div>" )
			},
			frag = this.document[ 0 ].createDocumentFragment();

		frag.appendChild( ui.screen[ 0 ] );
		frag.appendChild( ui.container[ 0 ] );

		if ( myId ) {
			ui.screen.attr( "id", myId + "-screen" );
			ui.container.attr( "id", myId + "-popup" );
			ui.placeholder
				.attr( "id", myId + "-placeholder" )
				.html( "<!-- placeholder for " + myId + " -->" );
		}

		// Apply the proto
		this._page[ 0 ].appendChild( frag );
		// Leave a placeholder where the element used to be
		ui.placeholder.insertAfter( elem );
		elem.addClass( "ui-popup" ).appendTo( ui.container );

		return ui;
	},

	_applyTheme: function( dst, theme, prefix ) {
		var themeStr, matches,
			classes = ( dst.attr( "class" ) || "" ).split( " " ),
			currentTheme = null;

		theme = ( ( theme === null && prefix === "body" ) ? "inherit" : theme );
		themeStr = String( theme );

		while ( classes.length > 0 ) {
			currentTheme = classes.pop();
			matches = ( new RegExp( "^ui-" + prefix + "-([a-z]|inherit)$" ) ).exec( currentTheme );
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

	_applyTransition: function( value ) {
		this._ui.container.removeClass( this._fallbackTransition );
		if ( value && value !== "none" ) {
			this._fallbackTransition = $.mobile._maybeDegradeTransition( value );
			if ( this._fallbackTransition === "none" ) {
				this._fallbackTransition = "";
			}
			this._ui.container.addClass( this._fallbackTransition );
		}
	},

	_setOptions: function( opts ) {
		var el = this.element,
			screen = this._ui.screen;

		if ( opts.wrapperClass !== undefined ) {
			this._ui.container
				.removeClass( this._containerClasses )
				.addClass( opts.wrapperClass );
			this._containerClasses = opts.wrapperClass;
		}

		if ( opts.theme !== undefined ) {
			this._applyTheme( el, opts.theme, "body" );
		}

		if ( opts.overlayTheme !== undefined ) {
			this._applyTheme( screen, opts.overlayTheme, "overlay" );

			if ( this._isOpen ) {
				screen.addClass( "in" );
			}
		}

		if ( opts.shadow !== undefined ) {
			el.toggleClass( "ui-overlay-shadow", opts.shadow );
		}

		if ( opts.corners !== undefined ) {
			el.toggleClass( "ui-corner-all", opts.corners );
		}

		if ( opts.transition !== undefined ) {
			if ( !this._currentTransition ) {
				this._applyTransition( opts.transition );
			}
		}

		if ( opts.tolerance !== undefined ) {
			this._setTolerance( opts.tolerance );
		}

		this._super( opts );
	},

	_setTolerance: function( value ) {
		var tol = { t: 30, r: 15, b: 30, l: 15 },
			ar;

		if ( value !== undefined ) {
			ar = String( value ).split( "," );

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

	_clampPopupWidth: function( infoOnly ) {
		var menuSize,
			winCoords = windowCoords(),
			// rectangle within which the popup must fit
			rc = {
				x: this._tolerance.l,
				y: winCoords.y + this._tolerance.t,
				cx: winCoords.cx - this._tolerance.l - this._tolerance.r,
				cy: winCoords.cy - this._tolerance.t - this._tolerance.b
			};

		if ( !infoOnly ) {
			// Clamp the width of the menu before grabbing its size
			this._ui.container.css( "max-width", rc.cx );
		}

		menuSize = {
			cx: this._ui.container.outerWidth( true ),
			cy: this._ui.container.outerHeight( true )
		};

		return { rc: rc, menuSize: menuSize };
	},

	_calculateFinalLocation: function( desired, clampInfo ) {
		var ret,
			rc = clampInfo.rc,
			menuSize = clampInfo.menuSize,
			// fix for $.mobile.document.height() bug in core 1.7.2.
			docEl = document.documentElement,
			docBody = document.body,
			docHeight = Math.max( docEl.clientHeight, docBody.scrollHeight, docBody.offsetHeight, docEl.scrollHeight, docEl.offsetHeight );


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

		ret.y -= Math.min( ret.y, Math.max( 0, ret.y + menuSize.cy - docHeight ) );

		return { left: ret.x, top: ret.y };
	},

	// Try and center the overlay over the given coordinates
	_placementCoords: function( desired ) {
		return this._calculateFinalLocation( desired, this._clampPopupWidth() );
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
		//      this had an animate callback that would resolve the deferred
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
			if ( this._fallbackTransition ) {
				this._ui.container
					.animationComplete( $.proxy( args.prereqs.container, "resolve" ) )
					.addClass( args.containerClassToAdd )
					.removeClass( args.classToRemove );
				return;
			}
		}
		this._ui.container.removeClass( args.classToRemove );
		args.prereqs.container.resolve();
	},

	// The desired coordinates passed in will be returned untouched if no reference element can be identified via
	// desiredPosition.positionTo. Nevertheless, this function ensures that its return value always contains valid
	// x and y coordinates by specifying the center middle of the window if the coordinates are absent.
	// options: { x: coordinate, y: coordinate, positionTo: string: "origin", "window", or jQuery selector
	_desiredCoords: function( opts ) {
		var dst = null, offset, winCoords = windowCoords(), x = opts.x, y = opts.y, pTo = opts.positionTo;

		// Establish which element will serve as the reference
		if ( pTo && pTo !== "origin" ) {
			if ( pTo === "window" ) {
				x = winCoords.cx / 2 + winCoords.x;
				y = winCoords.cy / 2 + winCoords.y;
			} else {
				try {
					dst = $( pTo );
				} catch( err ) {
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

	_reposition: function( opts ) {
		// We only care about position-related parameters for repositioning
		opts = { x: opts.x, y: opts.y, positionTo: opts.positionTo };
		this._trigger( "beforeposition", undefined, opts );
		this._ui.container.offset( this._placementCoords( this._desiredCoords( opts ) ) );
	},

	reposition: function( opts ) {
		if ( this._isOpen ) {
			this._reposition( opts );
		}
	},

	_openPrereqsComplete: function() {
		this._ui.container.addClass( "ui-popup-active" );
		this._isOpen = true;
		this._resizeScreen();
		this._ui.container.attr( "tabindex", "0" ).focus();
		this._ignoreResizeEvents();
		this._trigger( "afteropen" );
	},

	_open: function( options ) {
		var opts = $.extend( {}, this.options, options ),
			// TODO move blacklist to private method
			androidBlacklist = ( function() {
				var ua = navigator.userAgent,
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

		// Count down to triggering "popupafteropen" - we have two prerequisites:
		// 1. The popup window animation completes (container())
		// 2. The screen opacity animation completes (screen())
		this._createPrereqs(
			$.noop,
			$.noop,
			$.proxy( this, "_openPrereqsComplete" ) );

		this._currentTransition = opts.transition;
		this._applyTransition( opts.transition );

		this._ui.screen.removeClass( "ui-screen-hidden" );
		this._ui.container.removeClass( "ui-popup-hidden" );

		// Give applications a chance to modify the contents of the container before it appears
		this._reposition( opts );

		if ( this.options.overlayTheme && androidBlacklist ) {
			/* TODO: The native browser on Android 4.0.X ("Ice Cream Sandwich") suffers from an issue where the popup overlay appears to be z-indexed above the popup itself when certain other styles exist on the same page -- namely, any element set to `position: fixed` and certain types of input. These issues are reminiscent of previously uncovered bugs in older versions of Android's native browser: https://github.com/scottjehl/Device-Bugs/issues/3
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
			transition: opts.transition,
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
			.addClass( "ui-popup-hidden" )
			.removeAttr( "style" );
	},

	_closePrereqsDone: function() {
		var container = this._ui.container;

		container.removeAttr( "tabindex" );

		// remove the global mutex for popups
		$.mobile.popup.active = undefined;

		// Blur elements inside the container, including the container
		$( ":focus", container[ 0 ] ).add( container[ 0 ] ).blur();

		// alert users that the popup is closed
		this._trigger( "afterclose" );
	},

	_close: function( immediate ) {
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
			transition: ( immediate ? "none" : ( this._currentTransition ) ),
			classToRemove: "in",
			screenClassToAdd: "out",
			containerClassToAdd: "reverse out",
			applyTransition: true,
			prereqs: this._prereqs
		});
	},

	_unenhance: function() {
		// Put the element back to where the placeholder was and remove the "ui-popup" class
		this._setOptions( { theme: $.mobile.popup.prototype.options.theme } );
		this.element
			// Cannot directly insertAfter() - we need to detach() first, because
			// insertAfter() will do nothing if the payload div was not attached
			// to the DOM at the time the widget was created, and so the payload
			// will remain inside the container even after we call insertAfter().
			// If that happens and we remove the container a few lines below, we
			// will cause an infinite recursion - #5244
			.detach()
			.insertAfter( this._ui.placeholder )
			.removeClass( "ui-popup ui-overlay-shadow ui-corner-all ui-body-inherit" );
		this._ui.screen.remove();
		this._ui.container.remove();
		this._ui.placeholder.remove();
	},

	_destroy: function() {
		if ( $.mobile.popup.active === this ) {
			this.element.one( "popupafterclose", $.proxy( this, "_unenhance" ) );
			this.close();
		} else {
			this._unenhance();
		}
	},

	_closePopup: function( evt, data ) {
		var parsedDst, toUrl, opts = this.options, immediate = false;

		if ( evt && evt.isDefaultPrevented() ) {
			return;
		}

		// restore location on screen
		window.scrollTo( 0, this._scrollTop );

		if ( evt && evt.type === "pagebeforechange" && data ) {
			// Determine whether we need to rapid-close the popup, or whether we can
			// take the time to run the closing transition
			if ( typeof data.toPage === "string" ) {
				parsedDst = data.toPage;
			} else {
				parsedDst = data.toPage.jqmData( "url" );
			}
			parsedDst = $.mobile.path.parseUrl( parsedDst );
			toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;

			if ( this._myUrl !== $.mobile.path.makeUrlAbsolute( toUrl ) ) {
				// Going to a different page - close immediately
				immediate = true;
			} else {
				evt.preventDefault();
			}
		}

		// remove nav bindings
		$.mobile.window.off( opts.closeEvents );
		// unbind click handlers added when history is disabled
		this.element.undelegate( opts.closeLinkSelector, opts.closeLinkEvents );

		this._close( immediate );
	},

	// any navigation event after a popup is opened should close the popup
	// NOTE the pagebeforechange is bound to catch navigation events that don't
	//      alter the url (eg, dialogs from popups)
	_bindContainerClose: function() {
		$.mobile.window
			.on( this.options.closeEvents, $.proxy( this, "_closePopup" ) );
	},

	widget: function() {
		return this._ui.container;
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
		this._scrollTop = $.mobile.window.scrollTop();

		// if history alteration is disabled close on navigate events
		// and leave the url as is
		if( !( opts.history ) ) {
			self._open( options );
			self._bindContainerClose();

			// When histoy is disabled we have to grab the data-rel
			// back link clicks so we can close the popup instead of
			// relying on history to do it for us
			self.element
				.delegate( opts.closeLinkSelector, opts.closeLinkEvents, function( evt ) {
					self.close();
					evt.preventDefault();
				});

			return;
		}

		// cache some values for min/readability
		urlHistory = $.mobile.urlHistory;
		hashkey = $.mobile.dialogHashKey;
		activePage = $.mobile.activePage;
		currentIsDialog = ( activePage ? activePage.hasClass( "ui-dialog" ) : false );
		this._myUrl = url = urlHistory.getActive().url;
		hasHash = ( url.indexOf( hashkey ) > -1 ) && !currentIsDialog && ( urlHistory.activeIndex > 0 );

		if ( hasHash ) {
			self._open( options );
			self._bindContainerClose();
			return;
		}

		// if the current url has no dialog hash key proceed as normal
		// otherwise, if the page is a dialog simply tack on the hash key
		if ( url.indexOf( hashkey ) === -1 && !currentIsDialog ){
			url = url + (url.indexOf( "#" ) > -1 ? hashkey : "#" + hashkey);
		} else {
			url = $.mobile.path.parseLocation().hash + hashkey;
		}

		// Tack on an extra hashkey if this is the first page and we've just reconstructed the initial hash
		if ( urlHistory.activeIndex === 0 && url === urlHistory.initialDst ) {
			url += hashkey;
		}

		// swallow the the initial navigation event, and bind for the next
		$.mobile.window.one( "beforenavigate", function( evt ) {
			evt.preventDefault();
			self._open( options );
			self._bindContainerClose();
		});

		this.urlAltered = true;
		$.mobile.navigate( url, {role: "dialog"} );
	},

	close: function() {
		// make sure close is idempotent
		if( $.mobile.popup.active !== this ) {
			return;
		}

		this._scrollTop = $.mobile.window.scrollTop();

		if( this.options.history && this.urlAltered ) {
			$.mobile.back();
			this.urlAltered = false;
		} else {
			// simulate the nav bindings having fired
			this._closePopup();
		}
	}
});


// TODO this can be moved inside the widget
$.mobile.popup.handleLink = function( $link ) {
	var closestPage = $link.closest( ":jqmData(role='page')" ),
		path = $.mobile.path,
		scope = ( ( closestPage.length === 0 ) ? $( "body" ) : closestPage ),
		// NOTE make sure to get only the hash, ie7 (wp7) returns the absolute href
		//      in this case ruining the element selection
		popup = $( path.hashToSelector( path.parseUrl( $link.attr( "href" ) ).hash ), scope[ 0 ] ),
		offset;

	if ( popup.data( "mobile-popup" ) ) {
		offset = $link.offset();
		popup.popup( "open", {
			x: offset.left + $link.outerWidth() / 2,
			y: offset.top + $link.outerHeight() / 2,
			transition: $link.jqmData( "transition" ),
			positionTo: $link.jqmData( "position-to" )
		});
	}

	//remove after delay
	setTimeout( function() {
		$link.removeClass( $.mobile.activeBtnClass );
	}, 300 );
};

// TODO move inside _create
$.mobile.document.bind( "pagebeforechange", function( evt, data ) {
	if ( data.options.role === "popup" ) {
		$.mobile.popup.handleLink( data.options.link );
		evt.preventDefault();
	}
});

$.mobile.popup.initSelector = ":jqmData(role='popup')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.popup" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
