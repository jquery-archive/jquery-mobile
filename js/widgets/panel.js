//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data panels
//>>label: Panel
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.panel.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page" ], function( jQuery ) {
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
		theme: null,
		position: "left",
		dismissible: true,
		display: "reveal", //accepts reveal, push, overlay
		swipeClose: true,
		positionFixed: false
	},

	_panelID: null,
	_closeLink: null,
	_parentPage: null,
	_page: null,
	_modal: null,
	_panelInner: null,
	_wrapper: null,
	_fixedToolbars: null,

	_create: function() {
		var el = this.element,
			parentPage = el.closest( ":jqmData(role='page')" );

		// expose some private props to other methods
		$.extend( this, {
			_panelID: el.attr( "id" ),
			_closeLink: el.find( ":jqmData(rel='close')" ),
			_parentPage: ( parentPage.length > 0 ) ? parentPage : false,
			_page: this._getPage,
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

	_getPanelInner: function() {
		var panelInner = this.element.find( "." + this.options.classes.panelInner );

		if ( panelInner.length === 0 ) {
			panelInner = this.element.children().wrapAll( "<div class='" + this.options.classes.panelInner + "' />" ).parent();
		}

		return panelInner;
	},

	_createModal: function() {
		var self = this,
			target = self._parentPage ? self._parentPage.parent() : self.element.parent();

		self._modal = $( "<div class='" + self.options.classes.modal + "' data-panelid='" + self._panelID + "'></div>" )
			.on( "mousedown", function() {
				self.close();
			})
			.appendTo( target );
	},

	_getPage: function() {
		var page = this._parentPage ? this._parentPage : $( "." + $.mobile.activePageClass );

		return page;
	},

	_getWrapper: function() {
		var wrapper = this._page().find( "." + this.options.classes.pageWrapper );

		if ( wrapper.length === 0 ) {
			wrapper = this._page().children( ".ui-header:not(.ui-header-fixed), .ui-content:not(.ui-popup), .ui-footer:not(.ui-footer-fixed)" )
				.wrapAll( "<div class='" + this.options.classes.pageWrapper + "'></div>" )
				.parent();
		}

		return wrapper;
	},

	_getFixedToolbars: function() {
		var extFixedToolbars = $( "body" ).children( ".ui-header-fixed, .ui-footer-fixed" ),
			intFixedToolbars = this._page().find( ".ui-header-fixed, .ui-footer-fixed" ),
			fixedToolbars = extFixedToolbars.add( intFixedToolbars ).addClass( this.options.classes.pageFixedToolbar );

		return fixedToolbars;
	},

	_getPosDisplayClasses: function( prefix ) {
		return prefix + "-position-" + this.options.position + " " + prefix + "-display-" + this.options.display;
	},

	_getPanelClasses: function() {
		var panelClasses = this.options.classes.panel +
			" " + this._getPosDisplayClasses( this.options.classes.panel ) +
			" " + this.options.classes.panelClosed +
			" " + "ui-body-" + ( this.options.theme ? this.options.theme : "inherit" );

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
		this._on( "body", {
			"click a": "_handleClick"
		});

	},

	_handleClick: function( e ) {
		if (  e.currentTarget.href.split( "#" )[ 1 ] === this._panelID && this._panelID !== undefined ) {
			e.preventDefault();
			var link = $( e.target );
			if ( link.hasClass( "ui-btn" ) ) {
				link.addClass( $.mobile.activeBtnClass );
				this.element.one( "panelopen panelclose", function() {
					link.removeClass( $.mobile.activeBtnClass );
				});
			}
			this.toggle();
			return false;
		}
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

		this.document
			// Close the panel if another panel on the page opens
			.on( "panelbeforeopen", function( e ) {
				if ( self._open && e.target !== self.element[ 0 ] ) {
					self.close();
				}
			})
			// On escape, close? might need to have a target check too...
			.on( "keyup.panel", function( e ) {
				if ( e.keyCode === 27 && self._open ) {
					self.close();
				}
			});

		// Clean up open panels after page hide
		if ( self._parentPage ) {
			this.document.on( "pagehide", ":jqmData(role='page')", function() {
				if ( self._open ) {
					self.close( true );
				}
			});
		} else {
			this.document.on( "pagebeforehide", function() {
				if ( self._open ) {
					self.close( true );
				}
			});
		}
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
					self.document.off( "panelclose" );
					self._page().jqmData( "panel", "open" );

					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						self._wrapper().addClass( o.classes.animate );
						self._fixedToolbars().addClass( o.classes.animate );
					}

					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						self.document.on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}

					if ( o.theme && o.display !== "overlay" ) {
						self._page().parent()
							.addClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
					}

					self.element
						.removeClass( o.classes.panelClosed )
						.addClass( o.classes.panelOpen );

					self._positionPanel();

					self._pageContentOpenClasses = self._getPosDisplayClasses( o.classes.pageContentPrefix );

					if ( o.display !== "overlay" ) {
						self._page().parent().addClass( o.classes.pageContainer );
						self._wrapper().addClass( self._pageContentOpenClasses );
						self._fixedToolbars().addClass( self._pageContentOpenClasses );
					}

					self._modalOpenClasses = self._getPosDisplayClasses( o.classes.modal ) + " " + o.classes.modalOpen;
					if ( self._modal ) {
						self._modal
							.addClass( self._modalOpenClasses )
							.height( Math.max( self._modal.height(), self.document.height() ) );
					}
				},
				complete = function() {
					self.document.off( self._transitionEndEvents, complete );

					if ( o.display !== "overlay" ) {
						self._wrapper().addClass( o.classes.pageContentPrefix + "-open" );
						self._fixedToolbars().addClass( o.classes.pageContentPrefix + "-open" );
					}

					self._bindFixListener();

					self._trigger( "open" );
				};

			self._trigger( "beforeopen" );

			if ( self._page().jqmData( "panel" ) === "open" ) {
				self.document.on( "panelclose", function() {
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
						self.document.on( self._transitionEndEvents, complete );
					} else {
						setTimeout( complete, 0 );
					}

					self.element.removeClass( o.classes.panelOpen );

					if ( o.display !== "overlay" ) {
						self._wrapper().removeClass( self._pageContentOpenClasses );
						self._fixedToolbars().removeClass( self._pageContentOpenClasses );
					}

					if ( self._modal ) {
						self._modal.removeClass( self._modalOpenClasses );
					}
				},
				complete = function() {
					self.document.off( self._transitionEndEvents, complete );

					if ( o.theme && o.display !== "overlay" ) {
						self._page().parent().removeClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
					}

					self.element.addClass( o.classes.panelClosed );

					if ( o.display !== "overlay" ) {
						self._page().parent().removeClass( o.classes.pageContainer );
						self._wrapper().removeClass( o.classes.pageContentPrefix + "-open" );
						self._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );
					}

					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						self._wrapper().removeClass( o.classes.animate );
						self._fixedToolbars().removeClass( o.classes.animate );
					}

					self._fixPanel();
					self._unbindFixListener();
					$.mobile.resetActivePageHeight();

					self._page().jqmRemoveData( "panel" );

					self._trigger( "close" );
				};

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
		var otherPanels,
		o = this.options,
		multiplePanels = ( $( "body > :mobile-panel" ).length + $.mobile.activePage.find( ":mobile-panel" ).length ) > 1;

		if ( o.display !== "overlay" ) {

			//  remove the wrapper if not in use by another panel
			otherPanels = $( "body > :mobile-panel" ).add( $.mobile.activePage.find( ":mobile-panel" ) );
			if ( otherPanels.not( ".ui-panel-display-overlay" ).not( this.element ).length === 0 ) {
				this._wrapper().children().unwrap();
			}

			if ( this._open ) {

				this._fixedToolbars().removeClass( o.classes.pageContentPrefix + "-open" );

				if ( $.support.cssTransform3d && !!o.animate ) {
					this._fixedToolbars().removeClass( o.classes.animate );
				}

				this._page().parent().removeClass( o.classes.pageContainer );

				if ( o.theme ) {
					this._page().parent().removeClass( o.classes.pageContainer + "-themed " + o.classes.pageContainer + "-" + o.theme );
				}
			}
		}

		if ( !multiplePanels ) {

			this.document.off( "panelopen panelclose" );

			if ( this._open ) {
				this.document.off( this._transitionEndEvents );
				$.mobile.resetActivePageHeight();
			}
		}

		if ( this._open ) {
			this._page().jqmRemoveData( "panel" );
		}

		this._panelInner.children().unwrap();

		this.element
			.removeClass( [ this._getPanelClasses(), o.classes.panelOpen, o.classes.animate ].join( " " ) )
			.off( "swipeleft.panel swiperight.panel" )
			.off( "panelbeforeopen" )
			.off( "panelhide" )
			.off( "keyup.panel" )
			.off( "updatelayout" )
			.off( this._transitionEndEvents );

		this._closeLink.off( "click.panel" );

		if ( this._modal ) {
			this._modal.remove();
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
