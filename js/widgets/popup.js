//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Popup windows.
//>>label: Popups
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
					placeholder: $("<div style='display: none;'><!-- placeholder --></div>"),
					container: $("<div class='ui-popup-container ui-selectmenu-hidden'></div>")
				},
				eatEventAndClose = function( e ) {
					e.preventDefault();
					e.stopImmediatePropagation();
					self.close();
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
				ui.placeholder.html( "<!-- placeholder for " + myId + " -->" );
			}
			ui.container.append( this.element );

			// Define instance variables
			$.extend( this, {
				_page: thisPage,
				_ui: ui,
				_fallbackTransition: "",
				_currentTransition: false,
				_prereqs: null,
				_isOpen: false,
				_globalHandlers: [
					{
						src: $( window ),
						handler: {
							resize: function( e ) {
								if ( self._isOpen ) {
									self._resizeScreen();
								}
							},
							keyup: function( e ) {
								if ( self._isOpen && e.keyCode === $.mobile.keyCode.ESCAPE ) {
									eatEventAndClose( e );
								}
							}
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

			ui.screen.bind( "vclick", function( e ) { eatEventAndClose( e ); });

			$.each( this._globalHandlers, function( idx, value ) {
				value.src.bind( value.handler );
			});
		},

		_resizeScreen: function() {
			this._ui.screen.height( Math.max( $( window ).height(), this._page.height() ) );
		},

		_applyTheme: function( dst, theme ) {
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
				} else {
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
			this._applyTheme( this._ui.container, value );
		},

		_setOverlayTheme: function( value ) {
			this._applyTheme( this._ui.screen, value );

			if ( $.mobile.browser.ie ) {
				this._ui.screen.toggleClass(
					"ui-popup-screen-background-hack",
					( this._ui.screen.css( "background-color" ) === "transparent" &&
						this._ui.screen.css( "background-image" ) === "none" &&
						this._ui.screen.css( "background" ) === undefined ) );
			}
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
			} else {
				$.mobile.widget.prototype._setOption.apply( this, arguments );
			}
		},

		// Try and center the overlay over the given coordinates
		_placementCoords: function( x, y ) {
			// Tolerances off the window edges
			var tol = { l: 10, t: 30, r: 10, b: 30 },
			// rectangle within which the popup must fit
				rc = {
					l: tol.l,
					t: $( window ).scrollTop() + tol.t,
					cx: $( window ).width() - tol.l - tol.r,
					cy: $( window ).height() - tol.t - tol.b
				},
				menuSize;

			// Clamp the width of the menu before grabbing its size
			this._ui.container.css( "max-width", rc.cx );
			menuSize = {
				cx: this._ui.container.outerWidth( true ),
				cy: this._ui.container.outerHeight( true )
			};

			return {
				x: fitSegmentInsideSegment( rc.cx, menuSize.cx, rc.l, x ),
				y: fitSegmentInsideSegment( rc.cy, menuSize.cy, rc.t, y )
			};
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

			prereqs = {
				screen: $.Deferred( function( d ) {
					d.then( function() {
						if ( prereqs === self._prereqs ) {
							screenPrereq();
						}
					});
				}),
				container: $.Deferred( function( d ) {
					d.then( function() {
						if ( prereqs === self._prereqs ) {
							containerPrereq();
						}
					});
				})
			};

			$.when( prereqs.screen, prereqs.container ).done( function() {
				if ( prereqs === self._prereqs ) {
					self._prereqs = null;
					whenDone();
				}
			});

			self._prereqs = prereqs;
		},

		_animate: function( args ) {
			var self = this;

			if ( self.options.overlayTheme && args.additionalCondition ) {
				self._ui.screen
					.removeClass( args.classToRemove )
					.addClass( args.screenClassToAdd )
					.animationComplete( function() {
						args.prereqs.screen.resolve();
					});
			} else {
				args.prereqs.screen.resolve();
			}

			if ( args.transition && args.transition !== "none" ) {
				if ( args.applyTransition ) { self._applyTransition( args.transition ); }
				self._ui.container
					.addClass( args.containerClassToAdd )
					.removeClass( args.classToRemove )
					.animationComplete( function() {
						args.prereqs.container.resolve();
					});
			} else {
				args.prereqs.container.resolve();
			}
		},

		_open: function( x, y, transition ) {
			var self = this,
				coords = self._placementCoords(
					( undefined === x ? window.innerWidth / 2 : x ),
					( undefined === y ? window.innerHeight / 2 : y ) );

			// Count down to triggering "opened" - we have two prerequisites:
			// 1. The popup window animation completes (container())
			// 2. The screen opacity animation completes (screen())
			self._createPrereqs(
				$.noop,
				function() {
					self._applyTransition( "none" );
					self._ui.container.removeClass( "in" );
					self._resizeScreen();
				},
				function() {
					self._isOpen = true;
					self._ui.container.attr("tabindex", "0" ).focus();
					self.element.trigger( "opened" );
				});

			if ( transition ) {
				self._currentTransition = transition;
				self._applyTransition( transition );
			} else {
				transition = self.options.transition;
			}

			if ( !self.options.theme ) {
				self._setTheme( self._page.jqmData( "theme" ) || $.mobile.getInheritedTheme( self._page, "c" ) );
			}

			self._resizeScreen();
			self._ui.screen.removeClass( "ui-screen-hidden" );

			self._ui.container
				.removeClass( "ui-selectmenu-hidden" )
				.offset( {
					left: coords.x,
					top: coords.y
				});

			self._animate({
				additionalCondition: true,
				transition: transition,
				classToRemove: "",
				screenClassToAdd: "in",
				containerClassToAdd: "in",
				applyTransition: false,
				prereqs: self._prereqs
			});
		},

		_close: function() {
			var self = this,
				transition = ( self._currentTransition ? self._currentTransition : self.options.transition );

			this._isOpen = false;

			// Count down to triggering "closed" - we have two prerequisites:
			// 1. The popup window reverse animation completes (container())
			// 2. The screen opacity animation completes (screen())
			self._createPrereqs(
				function() {
					self._ui.screen
						.removeClass( "out" )
						.addClass( "ui-screen-hidden" );
				},
				function() {
					self._ui.container
						.removeClass( "reverse out" )
						.addClass( "ui-selectmenu-hidden" )
						.removeAttr( "style" );
				},
				function() {
					self._ui.container.removeAttr( "tabindex" );
					self.element.trigger( "closed" );
				});

			self._animate( {
				additionalCondition: self._ui.screen.hasClass( "in" ),
				transition: transition,
				classToRemove: "in",
				screenClassToAdd: "out",
				containerClassToAdd: "reverse out",
				applyTransition: true,
				prereqs: self._prereqs
			});
		},

		_destroy: function() {
			// Put the element back to where the placeholder was
			this.element.insertAfter( this._ui.placeholder );
			this._ui.screen.remove();
			this._ui.container.remove();
			this._ui.placeholder.remove();

			$.each( this._globalHandlers, function( idx, oneSrc ) {
				$.each( oneSrc.handler, function( eventType, handler ) {
					oneSrc.src.unbind( eventType, handler );
				});
			});
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
		//   args: args for _open
		// }
		_actionQueue: [],
		_inProgress: false,
		_haveNavHook: false,
		_currentlyOpenPopup: null,
		_myOwnHashChange: false,
		_myUrl: "",

		// Call _onHashChange if the hash changes /after/ the popup is on the screen
		// Note that placing the popup on the screen can itself cause a hashchange,
		// because the dialogHashKey may need to be added to the URL.
		_navHook: function( whenHooked ) {
			var self = this, dstHash;
			function realInstallListener() {
				$( window ).one( "hashchange.popup", function() {
					self._onHashChange();
				});
				whenHooked();
			}

			self._myUrl = $.mobile.activePage.jqmData( "url" );
			$.mobile.pageContainer.one( "pagebeforechange.popup", function( e, data ) {
				var parsedDst, toUrl;

				if ( typeof data.toPage === "string" ) {
					parsedDst = data.toPage;
				} else {
					parsedDst = data.toPage.jqmData( "url" );
				}
				toUrl = parsedDst.pathname + parsedDst.search + parsedDst.hash;

				if ( self._myUrl !== toUrl ) {
					self._onHashChange( true );
				}
			});
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
					$( window ).one( "hashchange.popupBinder", function() {
						realInstallListener();
					});
					dstHash = activeEntry.url + $.mobile.dialogHashKey;
					if ( $.mobile.urlHistory.activeIndex === 0 && dstHash === $.mobile.urlHistory.initialDst ) {
						dstHash += $.mobile.dialogHashKey;
					}
					$.mobile.urlHistory.ignoreNextHashChange = currentIsDialog;
					$.mobile.path.set( dstHash );
					$.mobile.urlHistory.addNew( dstHash, dstTransition, activeEntry.title, activeEntry.pageUrl, activeEntry.role );
				}
			} else {
				whenHooked();
			}
		},

		_navUnhook: function( abort ) {
			if ( abort ) {
				$( window ).unbind( "hashchange.popupBinder hashchange.popup" );
			}

			if ( $.mobile.hashListeningEnabled && !abort ) {
				window.history.back();
			}
			else {
				this._onHashChange();
			}
			$.mobile.activePage.unbind( "pagebeforechange.popup" );
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
					self._navUnhook( current.abort );
			} else {
				self._inProgress = false;
			}

			if ( self._actionQueue.length > 0 ) {
				self._runSingleAction();
			}
		},

		_continueWithAction: function() {
			var self = this,
				signal, fn, args,
				actionComplete = false;

			if ( self._actionQueue[0].open ) {
				if ( self._currentlyOpenPopup ) {
					self._actionQueue.unshift( { open: false, popup: self._currentlyOpenPopup } );
					self._inProgress = false;
					self._runSingleAction();
					return;
				}
				signal = "opened";
				fn = "_open";
				args = self._actionQueue[0].args;
			} else {
				signal = "closed";
				fn = "_close";
				args = [];
			}

			if ( self._yScroll !== undefined && self._actionQueue[0].open ) {
				if ( self._yScroll !== $( window ).scrollTop() ) {
					window.scrollTo( 0, self._yScroll );
				}
			}
			self._yScroll = $( window ).scrollTop();

			self._actionQueue[0].waitingForPopup = true;
			self._actionQueue[0].popup.element.one( signal, function() {
				self._completeAction();
				actionComplete = true;
			});
			self._actionQueue[0].popup[fn].apply( self._actionQueue[0].popup, args );
			if ( !actionComplete && self._actionQueue[0].abort ) {
				self._actionQueue[0].popup._immediate();
			}
		},

		_runSingleAction: function() {
			var self = this;

			if ( !self._inProgress ) {
				self._inProgress = true;
				if ( self._haveNavHook || !self._actionQueue[0].open ) {
					self._continueWithAction();
				} else {
					self._navHook( function() {
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
						} else {
							self._actionQueue.splice( cIdx, 1 );
						}
						self._runSingleAction();
					}
				} else {
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
					} else {
						self._actionQueue.splice( oIdx, 1 );
					}
				}
				else
				if ( self._currentlyOpenPopup === popup ) {
					if ( self._actionQueue.length === 0 ) {
						self._actionQueue.push( newAction );
						self._runSingleAction();
					} else {
						self._actionQueue.splice( ( self._inProgress ? 1 : 0 ), 0, newAction );
						self._runSingleAction();
					}
				}
			}
		},

		_onHashChange: function( immediate ) {
			this._haveNavHook = false;
			this._yScroll = undefined;
			$( this ).trigger( "done" );

			if ( this._myOwnHashChange ) {
				this._myOwnHashChange = false;
				this._inProgress = false;
			} else {
				var dst = this._currentlyOpenPopup;

				if ( this._inProgress ) {
					this._actionQueue = [ this._actionQueue[ 0 ] ];
					if ( this._actionQueue[ 0 ].open ) {
						dst = this._actionQueue[ 0 ].popup;
						if ( immediate && this._actionQueue[ 0 ].waitingForPopup ) {
							this._actionQueue[ 0 ].popup._immediate();
						}
					} else {
						dst = null;
					}
				} else {
					this._actionQueue = [];
				}

				if ( dst ) {
					this._actionQueue.push( { open: false, popup: dst } );
				}
			}

			if ( this._actionQueue.length > 0 ) {
				$.each( this._actionQueue, function( idx, val ) {
					val.abort = immediate;
				});
				this._runSingleAction() ;
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

			popup
				.popup( "open",
					offset.left + $link.outerWidth() / 2,
					offset.top + $link.outerHeight() / 2,
					$link.jqmData( "transition" ) );

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

	$( document ).bind( "pagecreate create", function( e )  {
		$.mobile.popup.prototype.enhanceWithin( e.target, true );
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
