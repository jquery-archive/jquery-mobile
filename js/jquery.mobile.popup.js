//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Popup windows.
//>>label: Popups

define( [ "jquery",
	"jquery.mobile.widget",
	"jquery.mobile.navigation",
	"../external/requirejs/depend!./jquery.mobile.hashchange[jquery]" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.popup", $.mobile.widget, {
		options: {
			theme: null,
			overlayTheme: null,
			shadow: true,
			corners: true,
			fade: true,
			transition: $.mobile.defaultDialogTransition,
			initSelector: ":jqmData(role='popup')"
		},

		_create: function() {
			var ui = {
					screen: "#ui-popup-screen",
					container: "#ui-popup-container"
				},
				proto = $(
					"<div>" +
					"    <div id='ui-popup-screen' class='ui-selectmenu-screen ui-screen-hidden ui-popup-screen'></div>" +
					"    <div id='ui-popup-container' class='ui-popup-container ui-selectmenu-hidden'></div>" +
					"</div>"
				),
				thisPage = this.element.closest( ":jqmData(role='page')" ),
				self = this;

			if ( thisPage.length === 0 ) {
				thisPage = $( "body" );
			}

			// Assign the relevant parts of the proto
			for ( var key in ui ) {
				ui[ key ] = proto.find( ui[ key ] ).removeAttr( "id" );
			}

			// Apply the proto
			thisPage.append( ui.screen );
			ui.container.insertAfter( ui.screen );
			ui.container.append( this.element );

			// Define instance variables
			$.extend( this, {
				_ui: ui,
				_isOpen: false
			});

			$.each( this.options, function( key ) {
				// Cause initial options to be applied by their handler by temporarily setting the option to undefined
				// - the handler then sets it to the initial value
				var value = self.options[ key ];

				self.options[ key ] = undefined;
				self._setOption( key, value, true );
			});

			ui.screen.bind( "vclick", function( e ) {
				e.preventDefault();
				e.stopImmediatePropagation();
				self.close();
			});
		},

		_realSetTheme: function( dst, theme ) {
			var classes = ( dst.attr( "class" ) || "").split( " " ),
				alreadyAdded = true,
				currentTheme = null,
				matches;

			theme = String( theme );
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
				if ( theme !== null ) {
					dst.addClass( "ui-body-" + theme );
				}
			}
		},

		_setTheme: function( value ) {
			this._realSetTheme( this.element, value );
			this.options.theme = value;
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "theme", value );
		},

		_setOverlayTheme: function( value ) {
			this._realSetTheme( this._ui.container, value );
			// The screen must always have some kind of background for fade to work, so, if the theme is being unset,
			// set the background to "a".
			this._realSetTheme( this._ui.screen, (value === "" ? "a" : value) );
			this.options.overlayTheme = value;
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "overlay-theme", value );
		},

		_setShadow: function( value ) {
			this._ui.container[value ? "addClass" : "removeClass"]( "ui-overlay-shadow" );
			this.options.shadow = value;
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "shadow", value );
		},

		_setCorners: function( value ) {
			this._ui.container[value ? "addClass" : "removeClass"]( "ui-corner-all" );
			this.options.corners = value;
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "corners", value );
		},

		_setFade: function( value ) {
			this.options.fade = value;
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "fade", value );
		},

		_setTransition: function( value ) {
			this._ui.container.removeClass( this.options.transition || "" );
			if ( value && value !== "none" ) {
				this._ui.container.addClass( value );
			}
			this.options.transition = value;
			this.element.attr( "data-" + ( $.mobile.ns || "" ) + "transition", value );
		},

		_setOption: function( key, value ) {
			var setter = "_set" + key.replace( /^[a-z]/, function(c) {
				return c.toUpperCase();
			});

			if ( this[setter] !== undefined ) {
				this[setter]( value );
			} else {
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
				maxwidth = parseFloat( this._ui.container.css( "max-width" ) ),
				roomtop = y - scrollTop,
				roombot = scrollTop + screenHeight - y,
				newtop, newleft;

			if ( roomtop > menuHeight / 2 && roombot > menuHeight / 2 ) {
				newtop = y - halfheight;
			} else {
				// 30px tolerance off the edges
				newtop = roomtop > roombot ? scrollTop + screenHeight - menuHeight - 30 : scrollTop + 30;
			}

			// If the menuwidth is smaller than the screen center is
			if ( menuWidth < maxwidth ) {
				newleft = ( screenWidth - menuWidth ) / 2;
			} else {
				//otherwise insure a >= 30px offset from the left
				newleft = x - menuWidth / 2;

				// 10px tolerance off the edges
				if ( newleft < 10 ) {
					newleft = 10;
				} else if ( ( newleft + menuWidth ) > screenWidth ) {
					newleft = screenWidth - menuWidth - 10;
				}
			}

			return { x: newleft, y: newtop };
		},

		open: function( x, y ) {
			if ( !this._isOpen ) {
				var self = this,
					onAnimationComplete = function() {
						self._ui.screen.height( $( document ).height() );
						$.mobile.popup.popupStack.push( self );
					},
					coords = this._placementCoords(
							(undefined === x ? window.innerWidth / 2 : x),
							(undefined === y ? window.innerHeight / 2 : y) );

				this._ui.screen
						.height( $( document ).height() )
						.removeClass( "ui-screen-hidden" );

				if ( this.options.fade ) {
					this._ui.screen.animate( {opacity: 0.5}, "fast" );
				}

				this._ui.container
					.removeClass( "ui-selectmenu-hidden" )
					.css( {
						left: coords.x,
						top: coords.y
					});

				if ( this.options.transition && this.options.transition !== "none" ) {
					this._ui.container
						.addClass( "in" )
						.animationComplete( onAnimationComplete );
				} else {
					onAnimationComplete();
				}

				this._isOpen = true;
			}
		},

		close: function( ) {
			if ( this._isOpen ) {
				var self = this,
					onAnimationComplete = function() {
						self._ui.container
							.removeClass( "reverse out" )
							.addClass( "ui-selectmenu-hidden" )
							.removeAttr( "style" );
						$.mobile.popup.popupStack.pop( self );
					},
					hideScreen = function() {
						self._ui.screen.addClass( "ui-screen-hidden" );
						self._isOpen = false;
						self.element.trigger( "closed" );
						self._ui.screen.removeAttr( "style" );
					};

				if ( this.options.transition && this.options.transition !== "none" ) {
					this._ui.container
						.removeClass( "in" )
						.addClass( "reverse out" )
						.animationComplete( onAnimationComplete );
				} else {
					onAnimationComplete();
				}

				if ( this.options.fade ) {
					this._ui.screen.animate( {opacity: 0.0}, "fast", hideScreen );
				} else {
					hideScreen();
				}
			}
		}
	});

	$.mobile.popup.popupStack = {
		_stack: [],

		push: function( popup ) {
			if ( 0 === this._stack.length ) {
				this._baseUrl = $.mobile.urlHistory.getActive().url;
			}
			this._stack.push( popup );

			if ( 1 === this._stack.length ) {
				var activeEntry = $.mobile.urlHistory.getActive();

				this._installListener();
				$.mobile.path.set( this._getPathPrefix() + $.mobile.dialogHashKey );
				$.mobile.urlHistory.addNew( activeEntry.url + $.mobile.dialogHashKey, activeEntry.transition, activeEntry.title, activeEntry.pageUrl, activeEntry.role );
			}
		},

		pop: function( popup ) {
			if ( this._stack.indexOf( popup ) >= 0 ) {
				if ( 1 === this._stack.length ) {
					this._currentPopup = popup;
					window.history.back();
				}
				else {
					this._afterPop( popup );
				}
			}
		},

		_afterPop: function( popup ) {
				this._stack.pop( popup );
				if ( 0 === this._stack.length ) {
					this._baseUrl = undefined;
				}
		},

		_removeListener: function() {
			$( window ).unbind( "hashchange.popupStackBinder hashchange.popupStack pagebeforechange.popupStack" );
		},

		_installListener: function() {
			var self = this;

			$( window ).one( "hashchange.popupStackBinder", function() {
				$( window ).one( "hashchange.popupStack", function() {
					self._handleHashChange();
				});
			});

			$( window ).bind( "pagebeforechange.popupStack", function( e, data ) {
				self._handlePBC( e, data );
			});
		},

		_getPathPrefix: function() {
			return ( ( $.mobile.activePage != $.mobile.firstPage ) ? $.mobile.urlHistory.getActive().url : "" );
		},

		_handleHashChange: function() {
			$.each( this._stack, function( key, value ) {
				value.close();
			});
			this._stack = [];
			this._removeListener();
			if ( this._currentPopup ) {
				this._afterPop( this._currentPopup );
				this._currentPopup = undefined;
			}
		},

		_handlePBC: function( e, data ) {
			if ( typeof data.toPage === "object" && data.toPage.jqmData( "url" ) === this._baseUrl ) {
				$.mobile.urlHistory.activeIndex = Math.max( 0, $.mobile.urlHistory.activeIndex - 1 );
			}
		}
	};

	$.mobile.popup.bindPopupToButton = function( btn, popup ) {
		if ( btn.length === 0 || popup.length === 0 ) return;

		var btnVClickHandler = function( e ) {
			// When /this/ button causes a popup, align the popup's theme with that of the button, unless the popup has a theme pre-set
			if ( !popup.jqmData( "overlay-theme-set" ) ) {
				popup.popup( "option", "overlayTheme", btn.jqmData( "theme" ) || $.mobile.getInheritedTheme( btn, "c") );
			}
			popup.popup( "open",
					btn.offset().left + btn.outerWidth() / 2,
					btn.offset().top + btn.outerHeight() / 2 );

			// Swallow event, because it might end up getting picked up by the popup window's screen handler, which
			// will in turn cause the popup window to close - Thanks Sasha!
			if ( e.stopPropagation ) {
				e.stopPropagation();
			}
			if ( e.preventDefault ) {
				e.preventDefault();
			}
		};

		// If the popup has a theme set, prevent it from being clobbered by the associated button
		if ( (popup.popup( "option", "overlayTheme" ) || "").match( /[a-z]/ ) ) {
			popup.jqmData( "overlay-theme-set", true );
		}

		btn.attr( {
			"aria-haspopup": true,
			"aria-owns": btn.attr( "href" )
		})
			.removeAttr( "href" )
			.bind( "vclick", btnVClickHandler );
	};

	$( document ).bind( "pagecreate create", function( e )  {
		$( $.mobile.popup.prototype.options.initSelector, e.target )
				.not( ":jqmData(role='none'), :jqmData(role='nojs')" )
				.popup();

		$( "a[href^='#']:jqmData(rel='popup')", e.target ).each( function() {
			$.mobile.popup.bindPopupToButton( $( this ), $( $( this ).attr( "href" ) ) );
		});
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
