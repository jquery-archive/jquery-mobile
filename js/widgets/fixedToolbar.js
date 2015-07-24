/*!
 * jQuery Mobile Fixed Toolbar @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Toolbars: Fixed
//>>group: Widgets
//>>description: Behavior for "fixed" headers and footers - be sure to also include the item 'Browser specific workarounds for "fixed" headers and footers' when supporting Android 2.x or iOS 5
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar-fixed/
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"../core",
			"../animationComplete",
			"../navigation",
			"./page",
			"./toolbar",
			"../zoom" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.toolbar", $.mobile.toolbar, {
	options: {
		position:null,
		visibleOnPageShow: true,
		disablePageZoom: true,
		transition: "slide", //can be none, fade, slide (slide maps to slideup or slidedown)
		fullscreen: false,
		tapToggle: true,
		tapToggleBlacklist: "a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-flipswitch, .ui-popup, .ui-panel, .ui-panel-dismiss-open",
		updatePagePadding: true,

		// Browser detection! Weeee, here we go...
		// Unfortunately, position:fixed is costly, not to mention probably impossible, to feature-detect accurately.
		// Some tests exist, but they currently return false results in critical devices and browsers, which could lead to a broken experience.
		// Testing fixed positioning is also pretty obtrusive to page load, requiring injected elements and scrolling the window
		// The following function serves to rule out some popular browsers with known fixed-positioning issues
		// This is a plugin option like any other, so feel free to improve or overwrite it
		supportBlacklist: function() {
			return !$.support.fixedPosition;
		}
	},

	_create: function() {
		this._super();
		if ( this.options.position === "fixed" && !this.options.supportBlacklist() ) {
			this.pagecontainer = this.element.closest( ".ui-mobile-viewport" );
			this._makeFixed();
		}
	},

	_makeFixed: function() {
		this._addClass( "ui-toolbar-" + this.role + "-fixed" );
		this.updatePagePadding();
		this._addTransitionClass();
		this._bindPageEvents();
		this._bindToggleHandlers();
	},

	_setOptions: function( o ) {
		if ( o.position === "fixed" && this.options.position !== "fixed" ) {
			this._makeFixed();
		}
		if ( this.options.position === "fixed" && !this.options.supportBlacklist() ) {
			var pageActive = $( ".ui-page-active" ),
				currentPage = !!this.page ?
				this.page :
				pageActive.length ?
				pageActive :
				$( ".ui-page" ).eq( 0 );
			if ( o.fullscreen !== undefined ) {
				if ( o.fullscreen ) {
					this._addClass( "ui-toolbar-" + this.role + "-fullscreen" );
					this._addClass( currentPage,
						"ui-toolbar-page-" + this.role + "-fullscreen" );
				} else {

					// If not fullscreen, add class to page to set top or bottom padding
					this._removeClass( "ui-toolbar-" + this.role + "-fullscreen" );
					this._removeClass( currentPage,
						"ui-toolbar-page-" + this.role + "-fullscreen" );
					this._addClass( currentPage, "ui-toolbar-page-" + this.role + "-fixed" );
				}
			}
		}
		this._super( o );
	},

	_addTransitionClass: function() {
		var transitionClass = this.options.transition;

		if ( transitionClass && transitionClass !== "none" ) {

			// use appropriate slide for header or footer
			if ( transitionClass === "slide" ) {
				transitionClass = this.role === "header" ? "slidedown" : "slideup";
			}

			this._addClass( null, transitionClass );
		}
	},

	_bindPageEvents: function() {
		var page = ( !!this.page ) ? this.element.closest( ".ui-page" ) : this.document;

		//page event bindings
		// Fixed toolbars require page zoom to be disabled, otherwise usability issues crop up
		// This method is meant to disable zoom while a fixed-positioned toolbar page is visible
		this._on( page, {
			"pagebeforeshow": "_handlePageBeforeShow",
			"webkitAnimationStart":"_handleAnimationStart",
			"animationstart":"_handleAnimationStart",
			"updatelayout": "_handleAnimationStart",
			"pageshow": "_handlePageShow",
			"pagebeforehide": "_handlePageBeforeHide"
		} );
	},

	_handlePageBeforeShow: function( ) {
		var o = this.options;
		if ( o.disablePageZoom ) {
			$.mobile.zoom.disable( true );
		}
		if ( !o.visibleOnPageShow ) {
			this.hide( true );
		}
	},

	_handleAnimationStart: function() {
		if ( this.options.updatePagePadding ) {
			this.updatePagePadding( ( !!this.page ) ? this.page : ".ui-page-active" );
		}
	},

	_handlePageShow: function() {
		this.updatePagePadding( ( !!this.page ) ? this.page : ".ui-page-active" );
		if ( this.options.updatePagePadding ) {
			this._on( this.window, { "throttledresize": "updatePagePadding" } );
		}
	},

	_handlePageBeforeHide: function( e, ui ) {
		var o = this.options,
			thisFooter, thisHeader, nextFooter, nextHeader;

		if ( o.disablePageZoom ) {
			$.mobile.zoom.enable( true );
		}
		if ( o.updatePagePadding ) {
			this._off( this.window, "throttledresize" );
		}

	},

	_visible: true,

	// This will set the content element's top or bottom padding equal to the toolbar's height
	updatePagePadding: function( tbPage ) {
		var $el = this.element,
			header = ( this.role === "header" ),
			pos = parseFloat( $el.css( header ? "top" : "bottom" ) );

		// This behavior only applies to "fixed", not "fullscreen"
		if ( this.options.fullscreen ) { return; }

		// tbPage argument can be a Page object or an event, if coming from throttled resize.
		tbPage = ( tbPage && tbPage.type === undefined && tbPage ) ||
			this.page || $el.closest( ".ui-page" );
		tbPage = ( !!this.page ) ? this.page : ".ui-page-active";
		$( tbPage ).css( "padding-" + ( header ? "top" : "bottom" ), $el.outerHeight() + pos );
	},

	_useTransition: function( notransition ) {
		var $win = this.window,
			$el = this.element,
			scroll = $win.scrollTop(),
			elHeight = $el.height(),
			pHeight = ( !!this.page ) ? $el.closest( ".ui-page" ).height() :
				$( ".ui-page-active" ).height(),
			viewportHeight = $.mobile.getScreenHeight();

		return !notransition &&
			( this.options.transition && this.options.transition !== "none" &&
			(
				( this.role === "header" && !this.options.fullscreen && scroll > elHeight ) ||
				( this.role === "footer" && !this.options.fullscreen &&
					scroll + viewportHeight < pHeight - elHeight )
			) || this.options.fullscreen
			);
	},

	show: function( notransition ) {
		var self = this;

		if ( this._useTransition( notransition ) ) {
			this._animationInProgress = "show";
			this._removeClass( null, "out" );
			this._removeClass( "ui-toolbar-fixed-hidden" );
			this._addClass( null, "in" );
			this.element.animationComplete( function() {
				self._removeClass( null, "in" );
			} );
		} else {
			this._removeClass( "ui-toolbar-fixed-hidden" );
		}
		this._visible = true;
	},

	hide: function( notransition ) {
		var self = this,

			// if it's a slide transition, our new transitions need the reverse class as well to slide outward
			outClass = "out" + ( this.options.transition === "slide" ? " reverse" : "" );

		if ( this._useTransition( notransition ) ) {
			this._animationInProgress = "hide";
			this._addClass( null, outClass );
			this._removeClass( null, "in" );
			this.element.animationComplete( function() {
				self._addClass( "ui-toolbar-fixed-hidden" );
				self._removeClass( null, outClass );
			} );
		} else {
			this._addClass( "ui-toolbar-fixed-hidden" );
			this._removeClass( null, outClass );
		}
		this._visible = false;
	},

	toggle: function() {
		this[ this._visible ? "hide" : "show" ]();
	},

	_bindToggleHandlers: function() {
		this._attachToggleHandlersToPage( ( !!this.page ) ? this.page : $( ".ui-page" ) );
	},

	_attachToggleHandlersToPage: function( page ) {
		var self = this,
			o = self.options;

		// tap toggle
		page
			.bind( "vclick", function( e ) {
				if ( o.tapToggle && !$( e.target ).closest( o.tapToggleBlacklist ).length ) {
					self.toggle();
				}
			} );
	},

	_setRelative: function() {
		if ( this.options.position !== "fixed" ) {
			$( "[data-" + $.mobile.ns + "role='page']" ).css( { "position": "relative" } );
		}
	},

	_destroy: function() {
		var pageClasses, toolbarClasses, hasFixed, header, hasFullscreen,
			page = this.pagecontainer.pagecontainer( "getActivePage" );

		this._super();
		if ( this.options.position === "fixed" ) {
			hasFixed = $(  "body>.ui-" + this.role + "-fixed" )
						.add( page.find( ".ui-" + this.options.role + "-fixed" ) )
						.not( this.element ).length > 0;
			hasFullscreen = $(  "body>.ui-" + this.role + "-fixed" )
						.add( page.find( ".ui-" + this.options.role + "-fullscreen" ) )
						.not( this.element ).length > 0;
			toolbarClasses =  "ui-header-fixed ui-footer-fixed ui-header-fullscreen in out" +
				" ui-footer-fullscreen fade slidedown slideup ui-fixed-hidden";
			this._removeClass( toolbarClasses );
			if ( !hasFullscreen ) {
				pageClasses = "ui-page-" + this.role + "-fullscreen";
			}
			if ( !hasFixed ) {
				header = this.role === "header";
				pageClasses += " ui-page-" + this.role + "-fixed";
				page.css( "padding-" + ( header ? "top" : "bottom" ), "" );
			}
			this._removeClass( page, pageClasses );
		}
	}

} );
} );
