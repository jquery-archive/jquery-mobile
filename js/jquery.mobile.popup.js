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

		_bindHashChange: function() {
			var self = this;
			$( window ).one( "hashchange.popup", function() {
				self.close( true );
			});
		},

		_unbindHashChange: function() {
			$( window ).unbind( "hashchange.popup" );
		},

		open: function( x, y ) {
			if ( !this._isOpen ) {
				var self = this,
					onAnimationComplete = function() {
						self._ui.screen.height( $( document ).height() );
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

				// listen for hashchange that will occur when we set it to null dialog hash
				$( window ).one( "hashchange", function() {
					self._bindHashChange();
				});

				// set hash to non-linkable dialog url
				$.mobile.path.set( ( ( $.mobile.activePage != $.mobile.firstPage) ? $.mobile.urlHistory.getActive().url : "" ) + "&ui-state=dialog" );

				this._isOpen = true;
			}
		},

		close: function( fromHash ) {
			if ( this._isOpen ) {
				var self = this,
					onAnimationComplete = function() {
						self._ui.container
							.removeClass( "reverse out" )
							.addClass( "ui-selectmenu-hidden" )
							.removeAttr( "style" );
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

				// unbind listener that comes with opening popup
				this._unbindHashChange();

				// if the close event did not come from an internal hash listener, reset URL back
				if ( !fromHash ) {
					window.history.back();
				}
			}
		}
	});

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
