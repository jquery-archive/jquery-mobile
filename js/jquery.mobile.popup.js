//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Popup windows.
//>>label: Popups
//>>css: ../css/themes/default/jquery.mobile.theme.css,../css/structure/jquery.mobile.popup.css,../css/structure/jquery.mobile.transition.css,../css/structure/jquery.mobile.transition.fade.css

define( [ "jquery",
	"jquery.mobile.widget",
	"jquery.mobile.navigation",
	"../external/requirejs/depend!./jquery.hashchange[jquery]" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.popup", $.mobile.widget, {
		options: {
			theme: null,
			overlayTheme: null,
			shadow: true,
			corners: true,
			transition: $.mobile.defaultDialogTransition,
			initSelector: ":jqmData(role='popup')"
		},

		_create: function() {
			var ui = {
			    	screen: $("<div class='ui-screen-hidden ui-popup-screen fade'></div>"),
			    	placeholder: $("<div id='placeholder' style='display: none;'><!-- placeholder --></div>"),
			    	container: $("<div id='ui-popup-container' class='ui-popup-container ui-selectmenu-hidden'></div>")
			    },
			    eatEventAndClose = function( e ) {
			    	e.preventDefault();
			    	e.stopImmediatePropagation();
			    	self.close();
			    },
			    thisPage = this.element.closest( ":jqmData(role='page')" ),
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
				ui.placeholder.html( "<!-- placeholder for " + myId + " -->" );
			}
			ui.container.append( this.element );

			// Define instance variables
			$.extend( this, {
				_page: thisPage,
				_ui: ui,
				_fallbackTransition: "",
				_currentTransition: false,
				_isOpen: false
			});

			$.each( this.options, function( key, value ) {
				// Cause initial options to be applied by their handler by temporarily setting the option to undefined
				// - the handler then sets it to the initial value
				self.options[ key ] = undefined;
				self._setOption( key, value, true );
			});

			ui.screen.bind( "vclick", function( e ) { eatEventAndClose( e ); });
			$( window ).bind( "keyup", function( e ) {
				if ( self._isOpen && e.keyCode === $.mobile.keyCode.ESCAPE ) {
					eatEventAndClose( e );
				}
			});
		},

		_realSetTheme: function( dst, theme ) {
			var classes = ( dst.attr( "class" ) || "").split( " " ),
			    alreadyAdded = true,
			    currentTheme = null,
			    matches,
			    themeStr = String( theme );

			while ( classes.length > 0 ) {
				currentTheme = classes.pop();
				matches = currentTheme.match( /^ui-body-([a-z])$/ );
				if ( matches && matches.length > 1 ) {
					currentTheme = matches[ 1 ];
					break;
				}
				else {
					currentTheme = null;
				}
			}

			if ( theme !== currentTheme ) {
				dst.removeClass( "ui-body-" + currentTheme );
				if ( ! ( theme === null || theme === "none" ) ) {
					dst.addClass( "ui-body-" + themeStr );
				}
			}
		},

		_setTheme: function( value ) {
			this._realSetTheme( this._ui.container, value );
		},

		_setOverlayTheme: function( value ) {
			this._realSetTheme( this._ui.screen, value );
		},

		_setShadow: function( value ) {
			this._ui.container.toggleClass( "ui-overlay-shadow", value );
		},

		_setCorners: function( value ) {
			this._ui.container.toggleClass( "ui-corner-all", value );
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

		_setOption: function( key, value ) {
			var setter = "_set" + key.replace( /^[a-z]/, function( c ) { return c.toUpperCase(); } );

			if ( this[ setter ] !== undefined ) {
				this[ setter ]( value );
				// Record the option change in the options and in the DOM data-* attributes
				this.options[ key ] = value;
				this.element.attr( "data-" + ( $.mobile.ns || "" ) + ( key.replace( /([A-Z])/, "-$1" ).toLowerCase() ), value );
			}
			else {
				$.mobile.widget.prototype._setOption.apply( this, arguments );
			}
		},

		_placementCoords: function( x, y ) {
			// Try and center the overlay over the given coordinates
			var ret,
			    menuHeight = this._ui.container.outerHeight( true ),
			    menuWidth = this._ui.container.outerWidth( true ),
			    scrollTop = $( window ).scrollTop(),
			    screenHeight = $( window ).height(),
			    screenWidth = $( window ).width(),
			    halfheight = menuHeight / 2,
			    maxwidth = screenWidth - 20,
			    roomtop = y - scrollTop,
			    roombot = scrollTop + screenHeight - y,
			    newtop, newleft;

			this._ui.container.css( "max-width", maxwidth );

			menuWidth = this._ui.container.outerWidth( true );
			menuHeight = this._ui.container.outerHeight( true );

			if ( roomtop > menuHeight / 2 && roombot > menuHeight / 2 ) {
				newtop = y - halfheight;
			}
			else {
				// 30px tolerance off the edges
				newtop = roomtop > roombot ? scrollTop + screenHeight - menuHeight - 30 : scrollTop + 30;
			}

			// If the menuwidth is greater or equal to the max-width, center it on screen
			if ( menuWidth >= maxwidth ) {
				newleft = ( screenWidth - menuWidth ) / 2;
			}
			else {
				//otherwise insure a >= 30px offset from the left
				newleft = x - menuWidth / 2;

				// 10px tolerance off the edges
				if ( newleft < 10 ) {
					newleft = 10;
				}
				else
				if ( ( newleft + menuWidth ) > screenWidth ) {
					newleft = screenWidth - menuWidth - 10;
				}
			}

			return { x: newleft, y: newtop };
		},

		_realOpen: function( x, y, transition ) {
			var self = this,
			    // Count down to triggering "opened" - we have two prerequisits:
			    // 1. The popup window animation completes (onAnimationComplete())
			    // 2. The screen opacity animation completes (showScreen())
			    triggerPrereqs = 2,
			    maybeTriggerOpened = function() {
			    	triggerPrereqs--;

			    	if ( 0 === triggerPrereqs ) {
			    		self._isOpen = true;
			    		self.element.trigger( "opened" );
			    	}
			    },
			    onAnimationComplete = function() {
			    	self._ui.screen.height( $( document ).height() );
			    	maybeTriggerOpened();
			    },
			    coords = self._placementCoords(
			    	( undefined === x ? window.innerWidth / 2 : x ),
			    	( undefined === y ? window.innerHeight / 2 : y ) );

			if ( transition ) {
				self._currentTransition = transition;
				self._applyTransition( transition );
			}
			else {
				transition = self.options.transition;
			}

			if ( !self.options.theme ) {
				self._setTheme( self._page.jqmData( "theme" ) || $.mobile.getInheritedTheme( self._page, "c" ) );
			}

			self._ui.screen
					.height( $( document ).height() )
					.removeClass( "ui-screen-hidden" );

			if ( self.options.overlayTheme ) {
				self._ui.screen
					.addClass("in")
					.animationComplete( maybeTriggerOpened );
			}
			else {
				maybeTriggerOpened();
			}

			self._ui.container
				.removeClass( "ui-selectmenu-hidden" )
				.css( {
					left: coords.x,
					top: coords.y
				});

			if ( transition && transition !== "none" ) {
				self._ui.container
					.addClass( "in" )
					.animationComplete( onAnimationComplete );
			}
			else {
				onAnimationComplete();
			}
		},

		_realClose: function() {
			var self = this,
			    transition = ( self._currentTransition ? self._currentTransition : self.options.transition ),
			    // Count down to triggering "closed" - we have two prerequisits:
			    // 1. The popup window reverse animation completes (onAnimationComplete())
			    // 2. The screen opacity animation completes (hideScreen())
			    triggerPrereqs = 2,
			    maybeTriggerClosed = function() {
			    	triggerPrereqs--;

			    	if ( 0 === triggerPrereqs ) {
			    		self._isOpen = false;
			    		if ( self._currentTransition ) {
			    			self._applyTransition( self.options.transition );
			    			self._currentTransition = false;
			    		}
			    		self.element.trigger( "closed" );
			    	}
			    },
			    onAnimationComplete = function() {
			    	self._ui.container
			    		.removeClass( "reverse out" )
			    		.addClass( "ui-selectmenu-hidden" )
			    		.removeAttr( "style" );
			    	maybeTriggerClosed();
			    },
			    hideScreen = function() {
			    	self._ui.screen
			    		.removeClass( "out" )
			    		.addClass( "ui-screen-hidden" );
			    	maybeTriggerClosed();
			    };

			if ( transition && transition !== "none" ) {
				this._ui.container
					.removeClass( "in" )
					.addClass( "reverse out" )
					.animationComplete( onAnimationComplete );
			}
			else {
				onAnimationComplete();
			}

			if ( this.options.overlayTheme && this._ui.screen.hasClass( "in" ) ) {
				this._ui.screen
					.removeClass( "in" )
					.addClass( "out" )
					.animationComplete( hideScreen );
			}
			else {
				hideScreen();
			}
		},

		_destroy: function() {
			// Put the element back to where the placeholder was
			this.element.insertAfter( this._ui.placeholder );
			this._ui.screen.remove();
			this._ui.container.remove();
			this._ui.placeholder.remove();
		},

		open: function( x, y, transition ) {
			$.mobile.popup.popupManager.push( this, arguments );
		},

		close: function() {
			$.mobile.popup.popupManager.pop( this );
		}
	});

	$.mobile.popup.popupManager = {
		// array of: {
		//   open: true/false
		//   popup: popup
		//   args: args for _realOpen
		// }
		_actionQueue: [],
		_inProgress: false,
		_haveNavHook: false,
		_currentlyOpenPopup: null,
		_myOwnHashChange: false,

		// Call _onHashChange if the hash changes /after/ the popup is on the screen
		// Note that placing the popup on the screen can itself cause a hashchange,
		// because the dialogHashKey may need to be added to the URL.
		_doNavHook: function( whenHooked ) {
			var self = this;

			if ( $.mobile.hashListeningEnabled ) {
				var activeEntry = $.mobile.urlHistory.getActive(),
				    hasHash = ( activeEntry.url.indexOf( $.mobile.dialogHashKey ) > -1 );

				function realInstallListener() {
					$( window ).one( "hashchange.popup", function() {
						self._onHashChange();
					});
					whenHooked();
				}

				if ( hasHash ) {
					realInstallListener();
				}
				else {
					$( window ).one( "hashchange.popupBinder", function() {
						realInstallListener();
					});
					$.mobile.path.set( activeEntry.url + $.mobile.dialogHashKey );
					$.mobile.urlHistory.addNew( activeEntry.url + $.mobile.dialogHashKey, activeEntry.transition, activeEntry.title, activeEntry.pageUrl, activeEntry.role );
				}
			}
			else {
				whenHooked();
			}
		},

		_undoNavHook: function() {
			if ( $.mobile.hashListeningEnabled ) {
				window.history.back();
			}
			else {
				this._onHashChange();
			}
		},

		_inArray: function( action ) {
			var self = this,
			    idx = -1;

			$.each( self._actionQueue, function( arIdx, value ) {
				if ( value.open === action.open && value.popup === action.popup ) {
					idx = arIdx;
					return false;
				}
				return true;
			});

			return idx;
		},

		_completeAction: function() {
			var self = this,
			    current = self._actionQueue.shift();

			self._currentlyOpenPopup = ( current.open ? current.popup : null );

			if ( self._actionQueue.length === 0 && !current.open && self._haveNavHook ) {
					self._haveNavHook = false;
					self._myOwnHashChange = true;
					self._undoNavHook();
			}
			else {
				self._inProgress = false;
			}

			if ( self._actionQueue.length > 0 ) {
				self._runSingleAction();
			}
		},

		_continueWithAction: function() {
			var self = this,
			    signal, fn, args;

			if ( self._actionQueue[0].open ) {
				if ( self._currentlyOpenPopup ) {
					self._actionQueue.unshift( { open: false, popup: self._currentlyOpenPopup } );
					self._inProgress = false;
					self._runSingleAction();
					return;
				}
				signal = "opened";
				fn = "_realOpen";
				args = self._actionQueue[0].args;
			}
			else {
				signal = "closed";
				fn = "_realClose";
				args = [];
			}

			self._actionQueue[0].popup.element.one( signal, function() { self._completeAction(); });
			self._actionQueue[0].popup[fn].apply( self._actionQueue[0].popup, args );
		},

		_runSingleAction: function() {
			var self = this;

			if ( !self._inProgress ) {
				self._inProgress = true;
				if ( self._haveNavHook || !self._actionQueue[0].open ) {
					self._continueWithAction();
				}
				else {
					self._doNavHook( function() {
						self._haveNavHook = true;
						self._continueWithAction();
					});
				}
			}
		},

		push: function( popup, args ) {
			var self = this,
			    newAction = { open: true, popup: popup, args: args },
			    idx = self._inArray( newAction );

			if ( -1 === idx ) {
				if ( self._currentlyOpenPopup === popup ) {
					var closeAction = { open: false, popup: popup },
					    cIdx = self._inArray( closeAction );

					if ( cIdx !== -1 ) {
						if ( 0 === cIdx && self._inProgress ) {
							self._actionQueue.push( newAction );
						}
						else {
							self._actionQueue.splice( cIdx, 1 );
						}
						self._runSingleAction();
					}
				}
				else {
					self._actionQueue.push( newAction );
					self._runSingleAction();
				}
			}
		},

		pop: function( popup ) {
			var self = this,
			    newAction = { open: false, popup: popup },
			    idx = self._inArray( newAction );

			if ( -1 === idx ) {
				var openAction = { open: true, popup: popup },
				    oIdx = self._inArray( openAction );

				if ( oIdx !== -1 ) {
					if ( 0 === oIdx ) {
						self._actionQueue.splice( 1, 0, newAction );
						self._runSingleAction();
					}
					else {
						self._actionQueue.splice( oIdx, 1 );
					}
				}
				else
				if ( self._currentlyOpenPopup === popup ) {
					if ( self._actionQueue.length === 0 ) {
						self._actionQueue.push( newAction );
						self._runSingleAction();
					}
					else {
						self._actionQueue.splice( ( self._inProgress ? 1 : 0 ), 0, newAction );
						self._runSingleAction();
					}
				}
			}
		},

		_onHashChange: function() {
			this._haveNavHook = false;

			if ( this._myOwnHashChange ) {
				this._myOwnHashChange = false;
				this._inProgress = false;
			}
			else {
				var dst = this._currentlyOpenPopup;

				if ( this._inProgress ) {
					this._actionQueue = [ this._actionQueue[ 0 ] ];
					dst = ( this._actionQueue[ 0 ].open ? this._actionQueue[ 0 ].popup : null );
				}
				else {
					this._actionQueue = [];
				}

				if ( dst ) {
					this._actionQueue.push( { open: false, popup: dst } );
				}
			}

			if ( this._actionQueue.length > 0 ) {
				this._runSingleAction() ;
			}
		}
	}

	$.mobile.popup.bindPopupToButton = function( btn, popup ) {
		if ( btn.length === 0 || popup.length === 0 ) return;

		var btnVClickHandler = function( e ) {
			popup.popup( "open",
					btn.offset().left + btn.outerWidth() / 2,
					btn.offset().top + btn.outerHeight() / 2,
					btn.jqmData( "transition" ) );

			// Swallow event, because it might end up getting picked up by the popup window's screen handler, which
			// will in turn cause the popup window to close - Thanks Sasha!
			if ( e.stopPropagation ) {
				e.stopPropagation();
			}
			if ( e.preventDefault ) {
				e.preventDefault();
			}
		};

		btn.attr( {
			"aria-haspopup": true,
			"aria-owns": btn.attr( "href" )
		})
			.removeAttr( "href" )
			.bind( "vclick", btnVClickHandler );
	};

	$( document ).bind( "pagecreate create", function( e )  {
		$.mobile.popup.prototype.enhanceWithin( e.target, true );

		$( "a[href^='#']:jqmData(rel='popup')", e.target ).each( function() {
			$.mobile.popup.bindPopupToButton( $( this ), $( $( this ).attr( "href" ) ) );
		});
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
