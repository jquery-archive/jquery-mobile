//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data panels
//>>label: Panel
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.panel.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.panel", {
	options: {
		classes: {
			panel: "ui-panel",
			panelOpen: "ui-panel-open",
			panelClosed: "ui-panel-closed",
			panelFixed: "ui-panel-fixed",
			panelInner: "ui-panel-inner",
			modal: "ui-panel-dismiss",
			modalOpen: "ui-panel-dismiss-open",
			pageContainer: "ui-panel-page-container",
			pageWrapper: "ui-panel-wrapper",
			pageFixedToolbar: "ui-panel-fixed-toolbar",
			pageContentPrefix: "ui-panel-page-content", /* Used for wrapper and fixed toolbars position, display and open classes. */
			animate: "ui-panel-animate"
		},
		animate: true,
		theme: "a",
		position: "left",
		dismissible: true,
		display: "reveal", //accepts reveal, push, overlay
		swipeClose: true,
		positionFixed: false
	},

	_panelID: null,
	_closeLink: null,
	_parentPage: null,
	_overlayTheme: null,
	_modal: null,
	_panelInner: null,
	_wrapper: null,
	_fixedToolbars: null,

	_create: function() {
		var $el = this.element,
			parentPage = $el.closest( ":jqmData(role='page')" );

		// expose some private props to other methods
		$.extend( this, {
			_panelID: $el.attr( "id" ),
			_closeLink: $el.find( ":jqmData(rel='close')" ),
			_parentPage: ( parentPage.length > 0 ) ? parentPage : false,
			_overlayTheme: this._getOverlayTheme,
			_panelInner: this._getPanelInner(),
			_wrapper: this._getWrapper,
			_fixedToolbars: this._getFixedToolbars
		});
		
		this._addPanelClasses();

		// if animating, add the class to do so
		if ( $.support.cssTransform3d && !!this.options.animate ) {
			this.element.addClass( this.options.classes.animate );
		}

		this._bindUpdateLayout();
		this._bindCloseEvents();
		this._bindLinkListeners();
		this._bindPageEvents();

		if ( !!this.options.dismissible ) {
			this._createModal();
		}

		this._bindSwipeEvents();
	},
	
	_getOverlayTheme: function() {
		// Overlay theme on page container is the same as the page theme
		var $overlayTheme = $.data( $.mobile.activePage[ 0 ], "mobile-page" ).options.theme,
			$overlayThemeClass = "ui-overlay-" + $overlayTheme;

		return $overlayThemeClass;
	},
	
	_getPanelInner: function() {
		var $panelInner = this.element.find( "." + this.options.classes.panelInner );
		
		if ( $panelInner.length === 0 ) {
			$panelInner = this.element.children().wrapAll( "<div class='" + this.options.classes.panelInner + "' />" ).parent();
		}
		
		return $panelInner;
	},
	
	_createModal: function() {
		var self = this,
			target = $.mobile.pageContainer;

		self._modal = $( "<div class='" + self.options.classes.modal + "' data-panelid='" + self._panelID + "'></div>" )
			.on( "mousedown", function() {
				self.close();
			})
			.appendTo( target );
	},
	
	_getWrapper: function() {
		var $wrapper = $( ".ui-page-active" ).find( "." + this.options.classes.pageWrapper ),
			animateClass = ( $.support.cssTransform3d && !!this.options.animate ) ? " " + this.options.classes.animate : "";

		if ( $wrapper.length === 0 ) {
			$wrapper = $( ".ui-page-active" ).children( ".ui-header:not(:jqmData(position='fixed')), .ui-content:not(:jqmData(role='popup')), .ui-footer:not(:jqmData(position='fixed'))" )
				.wrapAll( "<div class='" + this.options.classes.pageWrapper + animateClass + "' /></div>" )
				.parent();
		}

		return $wrapper;
	},
	
	_getFixedToolbars: function() {
		var $extFixedToolbars = $( "body" ).children( ".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')" ),
			$intFixedToolbars = $( ".ui-page-active" ).find( ".ui-header:jqmData(position='fixed'), .ui-footer:jqmData(position='fixed')" ),
			$fixedToolbars = $extFixedToolbars.add( $intFixedToolbars ).addClass( this.options.classes.pageFixedToolbar );

		return $fixedToolbars;
	},

	_getPosDisplayClasses: function( prefix ) {
		return prefix + "-position-" + this.options.position + " " + prefix + "-display-" + this.options.display;
	},

	_getPanelClasses: function() {
		var panelClasses = this.options.classes.panel +
			" " + this._getPosDisplayClasses( this.options.classes.panel ) +
			" " + this.options.classes.panelClosed;

		if ( this.options.theme ) {
			panelClasses += " ui-body-" + this.options.theme;
		}
		if ( !!this.options.positionFixed ) {
			panelClasses += " " + this.options.classes.panelFixed;
		}
		return panelClasses;
	},

	_addPanelClasses: function() {
		this.element.addClass( this._getPanelClasses() );
	},

	_bindCloseEvents: function() {
		var self = this;

		self._closeLink.on( "click.panel" , function( e ) {
			e.preventDefault();
			self.close();
			return false;
		});
		self.element.on( "click.panel" , "a:jqmData(ajax='false')", function(/* e */) {
			self.close();
		});
	},

	_positionPanel: function() {
		var self = this,
			panelInnerHeight = self._panelInner.outerHeight(),
			expand = panelInnerHeight > $.mobile.getScreenHeight();

		if ( expand || !self.options.positionFixed ) {
			if ( expand ) {
				self._unfixPanel();
				$.mobile.resetActivePageHeight( panelInnerHeight );
			}
			window.scrollTo( 0, $.mobile.defaultHomeScroll );
		} else {
			self._fixPanel();
		}
	},

	_bindFixListener: function() {
		this._on( $( window ), { "throttledresize": "_positionPanel" });
	},

	_unbindFixListener: function() {
		this._off( $( window ), "throttledresize" );
	},

	_unfixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.removeClass( this.options.classes.panelFixed );
		}
	},

	_fixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this.element.addClass( this.options.classes.panelFixed );
		}
	},

	_bindUpdateLayout: function() {
		var self = this;

		self.element.on( "updatelayout", function(/* e */) {
			if ( self._open ) {
				self._positionPanel();
			}
		});
	},

	_bindLinkListeners: function() {
		var self = this;

		$.mobile.document.on( "click.panel" , "a", function( e ) {
			if ( this.href.split( "#" )[ 1 ] === self._panelID && self._panelID !== undefined ) {
				e.preventDefault();
				var $link = $( this );
				if ( ! $link.hasClass( "ui-link" ) ) {
					$link.addClass( $.mobile.activeBtnClass );
					self.element.one( "panelopen panelclose", function() {
						$link.removeClass( $.mobile.activeBtnClass );
					});
				}
				self.toggle();
				return false;
			}
		});
	},

	_bindSwipeEvents: function() {
		var self = this,
			area = self._modal ? self.element.add( self._modal ) : self.element;

		// on swipe, close the panel
		if ( !!self.options.swipeClose ) {
			if ( self.options.position === "left" ) {
				area.on( "swipeleft.panel", function(/* e */) {
					self.close();
				});
			} else {
				area.on( "swiperight.panel", function(/* e */) {
					self.close();
				});
			}
		}
	},

	_bindPageEvents: function() {
		var self = this;

		$.mobile.document
			// Close the panel if another panel on the page opens
			.on( "panelbeforeopen", ":jqmData(role='page')", function( e ) {
				if ( self._open && e.target !== self.element[ 0 ] ) {
					self.close();
				}
			})
			// Clean up open panels after page hide
			.on( "pagehide", ":jqmData(role='page')", function(/* e */) {
				if ( self._open ) {
					self.close( true );
				}
			})
			// On escape, close? might need to have a target check too...
			.on( "keyup.panel", ":jqmData(role='page')", function( e ) {
				if ( e.keyCode === 27 && self._open ) {
					self.close();
				}
			});
	},

	// state storage of open or closed
	_open: false,
	_pageContentOpenClasses: null,
	_modalOpenClasses: null,

	open: function( immediate ) {
		if ( !this._open ) {
			var self = this,
				o = self.options,
				
				_openPanel = function() {
					$( ".ui-page-active" ).off( "panelclose" );
					$( ".ui-page-active" ).jqmData( "panel", "open" );
					
					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						self._wrapper().addClass( o.classes.animate );
						self._fixedToolbars().addClass( o.classes.animate );
					}

					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						$.mobile.pageContainer.on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}

					if ( o.theme && o.display !== "overlay" ) {
						$( ".ui-page-active" ).page( "removeContainerBackground" );
						$.mobile.pageContainer.addClass( o.classes.pageContainer + " ui-overlay-" + o.theme );
					}

					self.element
						.removeClass( o.classes.panelClosed )
						.addClass( o.classes.panelOpen );

					self._positionPanel();

					self._pageContentOpenClasses = self._getPosDisplayClasses( o.classes.pageContentPrefix );
					
					if ( o.display !== "overlay" ) {
						self._wrapper().addClass( self._pageContentOpenClasses + " " + o.classes.pageContentPrefix + "-open" );
						self._fixedToolbars().addClass( self._pageContentOpenClasses + " " + o.classes.pageContentPrefix + "-open" );
					}

					self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
					if ( self._modal ) {
						self._modal.addClass( self._modalOpenClasses );
					}
				},
				complete = function() {
					$.mobile.pageContainer.off( self._transitionEndEvents, complete );

					self._bindFixListener();

					self._trigger( "open" );
				};

			if ( this.element.closest( ".ui-page-active" ).length < 0 ) {
				immediate = true;
			}

			self._trigger( "beforeopen" );

			if ( $( ".ui-page-active" ).jqmData( "panel" ) === "open" ) {
				$( ".ui-page-active" ).on( "panelclose", function() {
					_openPanel();
				});
			} else {
				_openPanel();
			}

			self._open = true;
		}
	},

	close: function( immediate ) {
		if ( this._open ) {
			var self = this,
				o = this.options,
				
				_closePanel = function() {
					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						$.mobile.pageContainer.on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}

					self.element.removeClass( o.classes.panelOpen );
					
					if ( o.display !== "overlay" ) {
						self._wrapper().removeClass( o.classes.pageContentPrefix + "-open" );
						self._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );
					}
					
					if ( self._modal ) {
						self._modal.removeClass( self._modalOpenClasses );
					}
				},
				complete = function() {
					if ( o.theme && o.display !== "overlay" ) {
						$( ".ui-page-active" ).page( "removeContainerBackground" );
						$.mobile.pageContainer.removeClass( o.classes.pageContainer );
						$.mobile.pageContainer.addClass( self._overlayTheme );
					}
					
					$.mobile.pageContainer.off( self._transitionEndEvents, complete );
						
					self.element.addClass( o.classes.panelClosed );

					self._wrapper().removeClass( self._pageContentOpenClasses );
					self._fixedToolbars().removeClass( self._pageContentOpenClasses );
					
					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						self._wrapper().removeClass( o.classes.animate );
						self._fixedToolbars().removeClass( o.classes.animate );
					}

					self._fixPanel();
					self._unbindFixListener();
					$.mobile.resetActivePageHeight();

					$( ".ui-page-active" ).jqmRemoveData( "panel" );
					self._trigger( "close" );
				};

			if ( this.element.closest( ".ui-page-active" ).length < 0 ) {
				immediate = true;
			}
			self._trigger( "beforeclose" );

			_closePanel();

			self._open = false;
		}
	},

	toggle: function() {
		this[ this._open ? "close" : "open" ]();
	},

	_transitionEndEvents: "webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",

	_destroy: function() {
		var o = this.options,
			multiplePanels = ( $( "body > :mobile-panel" ).length + $.mobile.activePage.find( ":mobile-panel" ).length ) > 1;

		if ( !multiplePanels ) {
			if ( o.display !== "overlay" ) {
				this._wrapper().children().unwrap();
			}
			
			$( ".ui-page-active" ).find( "a" ).unbind( "panelopen panelclose" );
			
			if ( this._open ) {
				$.mobile.resetActivePageHeight();
			}
			
			if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
				this._wrapper().removeClass( o.classes.animate );
				this._fixedToolbars().removeClass( o.classes.animate );
			}
		}
		
		if ( multiplePanels && this._open && o.display !== "overlay" ) {
			this._wrapper().removeClass( o.classes.pageContentPrefix + "-open" );
		}
		
		if ( this._open && o.display !== "overlay" ) {
			this._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );
		}
		
		if ( this._open && o.theme && o.display !== "overlay" ) {
			$( ".ui-page-active" ).page( "removeContainerBackground" );
			$.mobile.pageContainer.removeClass( o.classes.pageContainer );
			$.mobile.pageContainer.addClass( this._overlayTheme );
		}
		
		if ( this._open ) {
			$( ".ui-page-active" ).jqmRemoveData( "panel" );
		}
		
		this._panelInner.children().unwrap();

		this.element.removeClass( [ this._getPanelClasses(), this.options.classes.panelAnimate ].join( " " ) )
			.off( "swipeleft.panel swiperight.panel" )
			.off( "panelbeforeopen" )
			.off( "panelhide" )
			.off( "keyup.panel" )
			.off( "updatelayout" );

		this._closeLink.off( "click.panel" );

		if ( this._modal ) {
			this._modal.remove();
		}

		// open and close
		this.element
			.off( this._transitionEndEvents )
			.removeClass( [ this.options.classes.panelUnfixed, this.options.classes.panelClosed, this.options.classes.panelOpen ].join( " " ) );
		$.mobile.pageContainer.off( this._transitionEndEvents );
	}
});

$.mobile.panel.initSelector = ":jqmData(role='panel')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.panel" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
