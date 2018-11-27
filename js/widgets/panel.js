/*!
 * jQuery Mobile Panel @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Panel
//>>group: Widgets
//>>description: Responsive presentation and behavior for HTML data panels
//>>docs: http://api.jquerymobile.com/panel/
//>>demos: http://demos.jquerymobile.com/@VERSION/panel/
//>>css.structure: ../css/structure/jquery.mobile.panel.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"./page" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.panel", {
	version: "@VERSION",

	options: {
		classes: {
		},
		animate: true,
		theme: null,
		position: "left",
		dismissible: true,

		// Accepts reveal, push, overlay
		display: "reveal",
		swipeClose: true,
		positionFixed: false
	},

	_closeLink: null,
	_parentPage: null,
	_page: null,
	_modal: null,
	_panelInner: null,
	_wrapper: null,
	_fixedToolbars: null,

	_create: function() {
		var el = this.element,
			parentPage = el.closest( ".ui-page, :jqmData(role='page')" );

		// Expose some private props to other methods
		$.extend( this, {
			_closeLink: el.find( ":jqmData(rel='close')" ),
			_parentPage: ( parentPage.length > 0 ) ? parentPage : false,
			_openedPage: null,
			_page: this._getPage,
			_panelInner: this._getPanelInner(),
			_fixedToolbars: this._getFixedToolbars
		} );
		if ( this.options.display !== "overlay" ) {
			this._getWrapper();
		}

		this._addClass( "ui-panel ui-panel-closed", this._getPanelClasses() );

		// If animating, add the class to do so
		if ( $.support.cssTransform3d && !!this.options.animate ) {
			this._addClass( "ui-panel-animate" );
		}

		this._bindUpdateLayout();
		this._bindCloseEvents();
		this._bindLinkListeners();
		this._bindPageEvents();

		if ( !!this.options.dismissible ) {
			this._createModal();
		}

		this._bindSwipeEvents();
		this._superApply( arguments );
	},

	_safelyWrap: function( parent, wrapperHtml, children ) {
		if ( children.length ) {
			children.eq( 0 ).before( wrapperHtml );
			wrapperHtml.append( children );
			return children.parent();
		} else {
			return $( wrapperHtml ).appendTo( parent );
		}
	},

	_getPanelInner: function() {
		var panelInner = this.element.find( ".ui-panel-inner" );

		if ( panelInner.length === 0 ) {
			panelInner = $( "<div>" );
			this._addClass( panelInner, "ui-panel-inner" );
			panelInner = this._safelyWrap( this.element, panelInner, this.element.children() );
		}

		return panelInner;
	},

	_createModal: function() {
		var that = this,
			target = that._parentPage ? that._parentPage.parent() : that.element.parent();

		that._modal = $( "<div>" );
		that._addClass( that._modal, "ui-panel-dismiss" );

		that._modal.on( "mousedown", function() {
				that.close();
			} )
			.appendTo( target );
	},

	_getPage: function() {
		var page = this._openedPage || this._parentPage || $( ".ui-page-active" );

		return page;
	},

	_getWrapper: function() {
		var thePage,
			wrapper = this._page().find( ".ui-panel-wrapper" );

		if ( wrapper.length === 0 ) {
			thePage = this._page();
			wrapper = $( "<div>" );
			this._addClass( wrapper, "ui-panel-wrapper" );
			wrapper = this._safelyWrap( thePage, wrapper,
				this._page().children( ".ui-toolbar-header:not(.ui-toolbar-header-fixed), " +
					"[data-" + $.mobile.ns + "role='toolbar'],"  +
					".ui-content:not(.ui-popup)," +
					".ui-toolbar-footer:not(.ui-toolbar-footer-fixed)" ) );
		}

		this._wrapper = wrapper;
	},

	_getFixedToolbars: function() {
		var extFixedToolbars = $( "body" )
								.children( ".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed" ),
			intFixedToolbars = this._page()
								.find( ".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed" ),
			fixedToolbars = extFixedToolbars.add( intFixedToolbars );

		this._addClass( fixedToolbars, "ui-panel-fixed-toolbar" );

		return fixedToolbars;
	},

	_getPosDisplayClasses: function( prefix ) {
		return prefix + "-position-" +
			this.options.position + " " + prefix +
			"-display-" + this.options.display;
	},

	_getPanelClasses: function() {
		var panelClasses = this._getPosDisplayClasses( "ui-panel" ) +
			" " + "ui-body-" + ( this.options.theme ? this.options.theme : "inherit" );

		if ( !!this.options.positionFixed ) {
			panelClasses += " ui-panel-fixed";
		}

		return panelClasses;
	},

	_handleCloseClick: function( event ) {
		if ( !event.isDefaultPrevented() ) {
			this.close();
		}
	},

	_bindCloseEvents: function() {
		this._on( this._closeLink, {
			"click": "_handleCloseClick"
		} );

		this._on( {
			"click a:jqmData(ajax='false')": "_handleCloseClick"
		} );
	},

	_positionPanel: function( scrollToTop ) {
		var heightWithMargins, heightWithoutMargins,
			that = this,
			panelInnerHeight = that._panelInner.outerHeight(),
			expand = panelInnerHeight > this.window.height();

		if ( expand || !that.options.positionFixed ) {
			if ( expand ) {
				that._unfixPanel();
				$.mobile.resetActivePageHeight( panelInnerHeight );
			} else if ( !this._parentPage ) {
				heightWithMargins = this.element.outerHeight( true );
				if ( heightWithMargins < this.document.height() ) {
					heightWithoutMargins = this.element.outerHeight();

					// Set the panel's total height (including margins) to the document height
					this.element.outerHeight( this.document.height() -
						( heightWithMargins - heightWithoutMargins ) );
				}
			}
			if ( scrollToTop === true &&
				!$.mobile.isElementCurrentlyVisible( ".ui-content" ) ) {
				this.window[ 0 ].scrollTo( 0, $.mobile.defaultHomeScroll );
			}
		} else {
			that._fixPanel();
		}
	},

	_bindFixListener: function() {
		this._on( this.window, { "throttledresize": "_positionPanel" } );
	},

	_unbindFixListener: function() {
		this._off( this.window, "throttledresize" );
	},

	_unfixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this._removeClass( "ui-panel-fixed" );
		}
	},

	_fixPanel: function() {
		if ( !!this.options.positionFixed && $.support.fixedPosition ) {
			this._addClass( "ui-panel-fixed" );
		}
	},

	_bindUpdateLayout: function() {
		var that = this;

		that.element.on( "updatelayout", function( /* e */ ) {
			if ( that._open ) {
				that._positionPanel();
			}
		} );
	},

	_bindLinkListeners: function() {
		this._on( "body", {
			"click a": "_handleClick"
		} );

	},

	_handleClick: function( e ) {
		var link,
			panelId = this.element.attr( "id" ),
			that = this;

		if ( e.currentTarget.href.split( "#" )[ 1 ] === panelId && panelId !== undefined ) {

			e.preventDefault();
			link = $( e.target );
			if ( link.hasClass( "ui-button" ) ) {
				this._addClass( link, null, "ui-button-active" );
				this.element.one( "panelopen panelclose", function() {
					that._removeClass( link, null, "ui-button-active" );
				} );
			}
			this.toggle();
		}
	},

	_handleSwipe: function( event ) {
		if ( !event.isDefaultPrevented() ) {
			this.close();
		}
	},

	_bindSwipeEvents: function() {
		var handler = {};

		// Close the panel on swipe if the swipe event's default is not prevented
		if ( this.options.swipeClose ) {
			handler[ "swipe" + this.options.position ] = "_handleSwipe";
			this._on( ( this._modal ? this.element.add( this._modal ) : this.element ), handler );
		}
	},

	_bindPageEvents: function() {
		var that = this;

		this.document

			// Close the panel if another panel on the page opens
			.on( "panelbeforeopen", function( e ) {
				if ( that._open && e.target !== that.element[ 0 ] ) {
					that.close();
				}
			} )

			// On escape, close? might need to have a target check too...
			.on( "keyup.panel", function( e ) {
				if ( e.keyCode === 27 && that._open ) {
					that.close();
				}
			} );
		if ( !this._parentPage && this.options.display !== "overlay" ) {
			this._on( this.document, {
				"pageshow": function() {
					this._openedPage = null;
					this._getWrapper();
				}
			} );
		}

		// Clean up open panels after page hide
		if ( that._parentPage ) {
			this.document.on( "pagehide", ":jqmData(role='page')", function() {
				if ( that._open ) {
					that.close( true );
				}
			} );
		} else {
			this.document.on( "pagebeforehide", function() {
				if ( that._open ) {
					that.close( true );
				}
			} );
		}
	},

	// State storage of open or closed
	_open: false,
	_pageContentOpenClasses: null,
	_modalOpenClasses: null,

	open: function( immediate ) {
		if ( !this._open ) {
			var that = this,
				o = that.options,

				complete = function() {

					// Bail if the panel was closed before the opening animation has completed
					if ( !that._open ) {
						return;
					}

					if ( o.display !== "overlay" ) {
						that._addClass( that._wrapper, "ui-panel-page-content-open" );
						that._addClass( that._fixedToolbars(), "ui-panel-page-content-open" );
					}

					that._bindFixListener();

					that._trigger( "open" );

					that._openedPage = that._page();
				},

				_openPanel = function() {
					that._off( that.document, "panelclose" );
					that._page().jqmData( "panel", "open" );

					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						that._addClass( that._wrapper, "ui-panel-animate" );
						that._addClass( that._fixedToolbars(), "ui-panel-animate" );
					}

					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						( that._wrapper || that.element )
							.animationComplete( complete, "transition" );
					} else {
						setTimeout( complete, 0 );
					}

					if ( o.theme && o.display !== "overlay" ) {
						that._addClass( that._page().parent(),
							"ui-panel-page-container-themed ui-panel-page-container-" + o.theme );
					}

					that._removeClass( "ui-panel-closed" )
						._addClass( "ui-panel-open" );

					that._positionPanel( true );

					that._pageContentOpenClasses =
						that._getPosDisplayClasses( "ui-panel-page-content" );

					if ( o.display !== "overlay" ) {
						that._addClass( that._page().parent(), "ui-panel-page-container" );
						that._addClass( that._wrapper, that._pageContentOpenClasses );
						that._addClass( that._fixedToolbars(), that._pageContentOpenClasses );
					}

					that._modalOpenClasses =
						that._getPosDisplayClasses( "ui-panel-dismiss" ) +
						" ui-panel-dismiss-open";

					if ( that._modal ) {
						that._addClass( that._modal, that._modalOpenClasses );

						that._modal.height(
							Math.max( that._modal.height(), that.document.height() ) );
					}
				};

			that._trigger( "beforeopen" );

			if ( that._page().jqmData( "panel" ) === "open" ) {
				that._on( that.document, {
					"panelclose": _openPanel
				} );
			} else {
				_openPanel();
			}

			that._open = true;
		}
	},

	close: function( immediate ) {
		if ( this._open ) {
			var that = this,

				// Record what the page is the moment the process of closing begins, because it
				// may change by the time the process completes
				currentPage = that._page(),
				o = this.options,

				complete = function() {
					if ( o.theme && o.display !== "overlay" ) {
						that._removeClass( currentPage.parent(),
							"ui-panel-page-container-themed ui-panel-page-container-" + o.theme );
					}

					that._addClass( "ui-panel-closed" );

					// Scroll to the top
					that._positionPanel( true );

					if ( o.display !== "overlay" ) {
						that._removeClass( currentPage.parent(), "ui-panel-page-container" );
						that._removeClass( that._wrapper, "ui-panel-page-content-open" );
						that._removeClass( that._fixedToolbars(), "ui-panel-page-content-open" );
					}

					if ( $.support.cssTransform3d && !!o.animate && o.display !== "overlay" ) {
						that._removeClass( that._wrapper, "ui-panel-animate" );
						that._removeClass( that._fixedToolbars(), "ui-panel-animate" );
					}

					that._fixPanel();
					that._unbindFixListener();
					$.mobile.resetActivePageHeight();

					currentPage.jqmRemoveData( "panel" );

					that._trigger( "close" );

					that._openedPage = null;
				},
				_closePanel = function() {

					that._removeClass( "ui-panel-open" );

					if ( o.display !== "overlay" ) {
						that._removeClass( that._wrapper, that._pageContentOpenClasses );
						that._removeClass( that._fixedToolbars(), that._pageContentOpenClasses );
					}

					if ( !immediate && $.support.cssTransform3d && !!o.animate ) {
						( that._wrapper || that.element )
							.animationComplete( complete, "transition" );
					} else {
						setTimeout( complete, 0 );
					}

					if ( that._modal ) {
						that._removeClass( that._modal, that._modalOpenClasses );
						that._modal.height( "" );
					}
				};

			that._trigger( "beforeclose" );

			_closePanel();

			that._open = false;
		}
	},

	toggle: function() {
		this[ this._open ? "close" : "open" ]();
	},

	_destroy: function() {
		var otherPanels,
			o = this.options,
			multiplePanels = ( $( "body > :mobile-panel" ).length +
				$.mobile.activePage.find( ":mobile-panel" ).length ) > 1;

		if ( o.display !== "overlay" ) {

			// Remove the wrapper if not in use by another panel
			otherPanels = $( "body > :mobile-panel" ).add(
				$.mobile.activePage.find( ":mobile-panel" ) );

			if ( otherPanels.not( ".ui-panel-display-overlay" ).not( this.element ).length === 0 ) {
				this._wrapper.children().unwrap();
			}

			if ( this._open ) {
				this._removeClass( this._fixedToolbars(), "ui-panel-page-content-open" );

				if ( $.support.cssTransform3d && !!o.animate ) {
					this._removeClass( this._fixedToolbars(), "ui-panel-animate" );
				}

				this._removeClass( this._page().parent(), "ui-panel-page-container" );

				if ( o.theme ) {
					this._removeClass( this._page().parent(),
						"ui-panel-page-container-themed ui-panel-page-container-" + o.theme );
				}
			}
		}

		if ( !multiplePanels ) {
			this.document.off( "panelopen panelclose" );
		}

		if ( this._open ) {
			this._page().jqmRemoveData( "panel" );
		}

		this._panelInner.children().unwrap();

		this._removeClass( "ui-panel ui-panel-closed ui-panel-open ui-panel-animate",
			this._getPanelClasses() );

		this.element.off( "panelbeforeopen panelhide keyup.panel updatelayout" );

		if ( this._modal ) {
			this._modal.remove();
		}

		this._superApply( arguments );
	}
} );

} );
