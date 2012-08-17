//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Popup windows
//>>label: Popups
//>>group: Widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
//>>css.structure: ../css/structure/jquery.mobile.popup.css,../css/structure/jquery.mobile.transition.css,../css/structure/jquery.mobile.transition.fade.css

define( [ "jquery",
	"../jquery.mobile.widget",
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
			initSelector: ":jqmData(role='popup')"
		},

		_eatEventAndClose: function( e ) {
			e.preventDefault();
			e.stopImmediatePropagation();
			this.close();
			return false;
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

		_closeOnScreenVClick: function( e ) {
			if ( e.target === this._ui.screen[ 0 ] ) {
				return this._eatEventAndClose( e );
			}
		},

		_create: function() {
			var ui = {
					screen: $( "<div class='ui-screen-hidden ui-popup-screen fade'></div>" ),
					placeholder: $( "<div style='display: none;'><!-- placeholder --></div>" ),
					container: $( "<div class='ui-popup-container ui-selectmenu-hidden'></div>" )
				},
				thisPage = this.element.closest( ".ui-page" ),
				myId = this.element.attr( "id" ),
				self = this;

			if ( thisPage.length === 0 ) {
				thisPage = $( "body" );
			}

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

			if ( $.mobile.browser.ie ) {
				this._ui.screen.toggleClass(
					"ui-popup-screen-background-hack",
					( this._ui.screen.css( "background-color" ) === "transparent" &&
						this._ui.screen.css( "background-image" ) === "none" &&
						( this._ui.screen.css( "background" ) === undefined ||
							this._ui.screen.css( "background" ) === "" ) ) );
			}

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
						if ( !isNaN( ar[ 1 ] ) ) {
							tol.t = tol.b = ar[ 1 ];
						}
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.l = tol.r = ar[ 0 ];
						}
						break;

					// The array contains values in the order top, right, bottom, left
					case 4:
						if ( !isNaN( ar[ 1 ] ) ) {
							tol.t = ar[ 1 ];
						}
						if ( !isNaN( ar[ 2 ] ) ) {
							tol.r = ar[ 2 ];
						}
						if ( !isNaN( ar[ 3 ] ) ) {
							tol.b = ar[ 3 ];
						}
						if ( !isNaN( ar[ 0 ] ) ) {
							tol.l = ar[ 0 ];
						}
						break;

					default:
						break;
				}
			}

			this._tolerance = tol;
		},

		_setOption: function( key, value ) {
			var setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
			}
			if ( key !== "initSelector" ) {
				// Record the option change in the options and in the DOM data-* attributes
				$.mobile.widget.prototype._setOption.apply( this, arguments );
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

		_immediate: function() {
			if ( this._prereqs ) {
				$.each( this._prereqs, function( key, val ) {
					val.resolve();
				});
			}
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
			if ( this.options.overlayTheme && args.additionalCondition ) {
				this._ui.screen
					.removeClass( args.classToRemove )
					.addClass( args.screenClassToAdd )
					.animationComplete( $.proxy( args.prereqs.screen, "resolve" ) );
			} else {
				args.prereqs.screen.resolve();
			}

			if ( args.transition && args.transition !== "none" ) {
				if ( args.applyTransition ) {
					this._applyTransition( args.transition );
				}
				this._ui.container
					.addClass( args.containerClassToAdd )
					.removeClass( args.classToRemove )
					.animationComplete( $.proxy( args.prereqs.container, "resolve" ) );
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
			this._ui.container.addClass( "ui-popup-active" );
			this._isOpen = true;
			this._ui.container.attr( "tabindex", "0" ).focus();
			this._trigger( "afteropen" );
		},

		_open: function( options ) {
			var coords, transition;

			// Make sure options is defined
			options = ( options || {} );

			// Copy out the transition, because we may be overwriting it later and we don't want to pass that change back to the caller
			transition = options.transition;

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
			this._ui.container.removeAttr( "tabindex" );
			this._trigger( "afterclose" );
		},

		_close: function() {
			this._ui.container.removeClass( "ui-popup-active" );
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
			// Put the element back to where the placeholder was and remove the "ui-popup" class
			this._setTheme( "none" );
			this.element
				.insertAfter( this._ui.placeholder )
				.removeClass( "ui-popup ui-overlay-shadow ui-corner-all" );
			this._ui.screen.remove();
			this._ui.container.remove();
			this._ui.placeholder.remove();

			// Unbind handlers that were bound to elements outside this.element (the window, in this case)
			$.each( this._globalHandlers, function( idx, oneSrc ) {
				$.each( oneSrc.handler, function( eventType, handler ) {
					oneSrc.src.unbind( eventType, handler );
				});
			});
		},

		open: function( options ) {
			$.mobile.popup.popupManager.push( this, arguments );
		},

		close: function() {
			$.mobile.popup.popupManager.pop( this );
		}
	});

	// Popup manager, whose policy is to ignore requests for opening popups when a popup is already in
	// the process of opening, or already open
	$.mobile.popup.popupManager = {
		_currentlyOpenPopup: null,
		_popupIsOpening: false,
		_popupIsClosing: false,
		_abort: false,

		_handlePageBeforeChange: function( e, data ) {
			var parsedDst, toUrl;

			if ( typeof data.toPage === "string" ) {
				parsedDst = data.toPage;
			} else {
				parsedDst = data.toPage.jqmData( "url" );
			}
			parsedDst = $.mobile.path.parseUrl( parsedDst );
			toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;

			if ( this._myUrl !== toUrl ) {
				this._navUnhook( true );
			}
		},

		// Call _onHashChange if the hash changes /after/ the popup is on the screen
		// Note that placing the popup on the screen can itself cause a hashchange,
		// because the dialogHashKey may need to be added to the URL.
		_navHook: function( whenHooked ) {
			var self = this, dstHash;
			function realInstallListener() {
				$( window ).one( "navigate.popup", function() {
					self._onHashChange();
				});
				whenHooked();
			}

			self._myUrl = $.mobile.activePage.jqmData( "url" );
			$.mobile.pageContainer.one( "pagebeforechange.popup", $.proxy( this, "_handlePageBeforeChange" ) );
			if ( $.mobile.hashListeningEnabled ) {
				var activeEntry = $.mobile.urlHistory.getActive(),
					dstTransition,
					currentIsDialog = $.mobile.activePage.is( ".ui-dialog" ),
					hasHash = ( activeEntry.url.indexOf( $.mobile.dialogHashKey ) > -1 ) && !currentIsDialog;

				if ( $.mobile.urlHistory.activeIndex === 0 ) {
					dstTransition = $.mobile.defaultDialogTransition;
				} else {
					dstTransition = activeEntry.transition;
				}

				if ( hasHash ) {
					realInstallListener();
				} else {
					$( window ).one( "navigate.popupBinder", function() {
						realInstallListener();
					});
					dstHash = activeEntry.url + $.mobile.dialogHashKey;
					if ( $.mobile.urlHistory.activeIndex === 0 && dstHash === $.mobile.urlHistory.initialDst ) {
						dstHash += $.mobile.dialogHashKey;
					}
					$.mobile.urlHistory.ignoreNextHashChange = currentIsDialog;
					$.mobile.urlHistory.addNew( dstHash, dstTransition, activeEntry.title, activeEntry.pageUrl, activeEntry.role );
					$.mobile.path.set( dstHash );
				}
			} else {
				whenHooked();
			}
		},

		_navUnhook: function( abort ) {
			if ( abort ) {
				$( window ).unbind( "navigate.popupBinder navigate.popup" );
			}

			if ( $.mobile.hashListeningEnabled && !abort ) {
				window.history.back();
			}
			else {
				this._onHashChange( abort );
			}
			$.mobile.activePage.unbind( "pagebeforechange.popup" );
		},

		push: function( popup, args ) {
			var self = this;

			if ( !self._currentlyOpenPopup ) {
				self._currentlyOpenPopup = popup;

				self._navHook(function() {
					self._popupIsOpening = true;
					self._currentlyOpenPopup.element.one( "popupafteropen", function() {
						self._popupIsOpening = false;
					});
					self._currentlyOpenPopup._open.apply( self._currentlyOpenPopup, args );
					if ( !self._popupIsOpening && self._abort ) {
						self._currentlyOpenPopup._immediate();
					}
				});
			}
		},

		pop: function( popup ) {
			if ( popup === this._currentlyOpenPopup && !this._popupIsClosing ) {
				this._popupIsClosing = true;
				if ( this._popupIsOpening ) {
					this._currentlyOpenPopup.element.one( "popupafteropen", $.proxy( this, "_navUnhook" ) );
				} else {
					this._navUnhook();
				}
			}
		},

		_handlePopupAfterClose: function() {
			this._popupIsClosing = false;
			this._currentlyOpenPopup = null;
			$( this ).trigger( "done" );
		},

		_onHashChange: function( immediate ) {
			this._abort = immediate;

			if ( this._currentlyOpenPopup ) {
				if ( immediate && this._popupIsOpening ) {
					this._currentlyOpenPopup._immediate();
				}
				this._popupIsClosing = true;
				this._currentlyOpenPopup.element.one( "popupafterclose", $.proxy( this, "_handlePopupAfterClose" ) );
				this._currentlyOpenPopup._close();
				if ( immediate && this._currentlyOpenPopup ) {
					this._currentlyOpenPopup._immediate();
				}
			}
		}
	};

	$.mobile.popup.handleLink = function( $link ) {
		var closestPage = $link.closest( ":jqmData(role='page')" ),
			scope = ( ( closestPage.length === 0 ) ? $( "body" ) : closestPage ),
			popup = $( $link.attr( "href" ), scope[0] ),
			offset;

		if ( popup.data( "popup" ) ) {
			offset = $link.offset();
			popup.popup( "open", {
				x: offset.left + $link.outerWidth() / 2,
				y: offset.top + $link.outerHeight() / 2,
				transition: $link.jqmData( "transition" ),
				positionTo: $link.jqmData( "position-to" )
			});

			// If this link is not inside a popup, re-focus onto it after the popup(s) complete
			// For some reason, a $.proxy( $link, "focus" ) doesn't work as the handler
			if ( $link.parents( ".ui-popup-container" ).length === 0 ) {
				$( $.mobile.popup.popupManager ).one( "done", function() {
					$link.focus();
				});
			}
		}

		//remove after delay
		setTimeout( function() {
			$link.removeClass( $.mobile.activeBtnClass );
		}, 300 );
	};

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
