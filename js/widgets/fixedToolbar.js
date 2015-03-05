//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Behavior for "fixed" headers and footers - be sure to also include the item 'Browser specific workarounds for "fixed" headers and footers' when supporting Android 2.x or iOS 5
//>>label: Toolbars: Fixed
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../widget", "../core", "../animationComplete", "../navigation", "./page","./toolbar","../zoom" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	$.widget( "mobile.toolbar", $.mobile.toolbar, {
		options: {
			position:null,
			visibleOnPageShow: true,
			disablePageZoom: true,
			transition: "slide", //can be none, fade, slide (slide maps to slideup or slidedown)
			fullscreen: false,
			tapToggle: true,
			tapToggleBlacklist: "a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-flipswitch, .ui-popup, .ui-panel, .ui-panel-dismiss-open",
			hideDuringFocus: "input, textarea, select",
			updatePagePadding: true,
			trackPersistentToolbars: true,

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
			this._addClass( "ui-toolbar-"+ this.role +"-fixed" );
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
				var currentPage = ( !!this.page ) ? 
					this.page : 
					( $(".ui-page-active").length > 0 ) ? 
					$(".ui-page-active") : 
					$(".ui-page").eq(0);

				if ( o.fullscreen !== undefined) {
					if ( o.fullscreen ) {
						this._addClass( "ui-toolbar-"+ this.role +"-fullscreen" );
						this._addClass( currentPage,  "ui-page-" + this.role + "-fullscreen" );
					}
					// If not fullscreen, add class to page to set top or bottom padding
					else {
						this._removeClass( "ui-toolbar-"+ this.role +"-fullscreen" );
						this._removeClass( currentPage, "ui-page-" + this.role + "-fullscreen" );
						this._addClass( currentPage, "ui-page-" + this.role + "-fixed" );
					}
				}
			}
			this._super(o);
		},

		_addTransitionClass: function() {
			var transitionClass = this.options.transition;

			if ( transitionClass && transitionClass !== "none" ) {
				// use appropriate slide for header or footer
				if ( transitionClass === "slide" ) {
					transitionClass = this.element.hasClass( "ui-toolbar-header" ) ? 
					"slidedown" : 
					"slideup";
				}

				this._addClass( null, transitionClass );
			}
		},

		_bindPageEvents: function() {
			var page = ( !!this.page )? this.element.closest( ".ui-page" ): this.document;
			//page event bindings
			// Fixed toolbars require page zoom to be disabled, otherwise usability issues crop up
			// This method is meant to disable zoom while a fixed-positioned toolbar page is visible
			this._on( page , {
				"pagebeforeshow": "_handlePageBeforeShow",
				"webkitAnimationStart":"_handleAnimationStart",
				"animationstart":"_handleAnimationStart",
				"updatelayout": "_handleAnimationStart",
				"pageshow": "_handlePageShow",
				"pagebeforehide": "_handlePageBeforeHide"
			});
		},

		_handlePageBeforeShow: function( ) {
			if ( this.options.disablePageZoom ) {
				$.mobile.zoom.disable( true );
			}
			if ( !this.options.visibleOnPageShow ) {
				this.hide( true );
			}
		},

		_handleAnimationStart: function() {
			if ( this.options.updatePagePadding ) {
				this.updatePagePadding( ( !!this.page )? this.page: ".ui-page-active" );
			}
		},

		_handlePageShow: function() {
			this.updatePagePadding( ( !!this.page )? this.page: ".ui-page-active" );
			if ( this.options.updatePagePadding ) {
				this._on( this.window, { "throttledresize": "updatePagePadding" } );
			}
		},

		_handlePageBeforeHide: function() {
			if ( this.options.disablePageZoom ) {
				$.mobile.zoom.enable( true );
			}
			if ( this.options.updatePagePadding ) {
				this._off( this.window, "throttledresize" );
			}
		},

		_visible: true,

		// This will set the content element's top or bottom padding equal to the toolbar's height
		updatePagePadding: function( tbPage ) {
			var $el = this.element,
				header = ( this.role ==="header" ),
				pos = parseFloat( $el.css( header ? "top" : "bottom" ) );

			// This behavior only applies to "fixed", not "fullscreen"
			if ( this.options.fullscreen ) { return; }
			// tbPage argument can be a Page object or an event, if coming from throttled resize.
			tbPage = ( tbPage && tbPage.type === undefined && tbPage ) || this.page || $el.closest( ".ui-page" );
			tbPage = ( !!this.page )? this.page: ".ui-page-active";
			$( tbPage ).css( "padding-" + ( header ? "top" : "bottom" ), $el.outerHeight() + pos );
		},

		_useTransition: function( notransition ) {
			var $win = this.window,
				$el = this.element,
				scroll = $win.scrollTop(),
				elHeight = $el.height(),
				pHeight = ( !!this.page )? $el.closest( ".ui-page" ).height():$(".ui-page-active").height(),
				viewportHeight = $.mobile.getScreenHeight();

			return !notransition &&
				( this.options.transition && this.options.transition !== "none" &&
				(
					( this.role === "header" && !this.options.fullscreen && scroll > elHeight ) ||
					( this.role === "footer" && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight )
				) || this.options.fullscreen
				);
		},

		show: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element;

			if ( this._useTransition( notransition ) ) {
				this._removeClass( null, "out " + hideClass );
				this._addClass( null, "in" );
				$el.animationComplete( function () {
					this._removeClass( null, "in" );
				} );
			}
			else {
				this._removeClass( hideClass );
			}
			this._visible = true;
		},

		hide: function( notransition ) {
			var hideClass = "ui-fixed-hidden",
				$el = this.element,
				// if it's a slide transition, our new transitions need the reverse class as well to slide outward
				outclass = "out" + ( this.options.transition === "slide" ? " reverse" : "" );

			if ( this._useTransition( notransition ) ) {
				this._addClass( null, outclass );
				this._removeClass( null, "in" );
				$el.animationComplete(function() {
					this._addClass( hideClass );
					this._removeClass( outclass );
				});
			}
			else {
				this._addClass( hideClass );
				this._removeClass( outclass );
			}
			this._visible = false;
		},

		toggle: function() {
			this[ this._visible ? "hide" : "show" ]();
		},

		_bindToggleHandlers: function() {
			var self = this,
				o = self.options,
				delayShow, delayHide,
				isVisible = true,
				page = ( !!this.page )? this.page: $(".ui-page");

			// tap toggle
			page
				.bind( "vclick", function( e ) {
					if ( o.tapToggle && !$( e.target ).closest( o.tapToggleBlacklist ).length ) {
						self.toggle();
					}
				})
				.bind( "focusin focusout", function( e ) {
					//this hides the toolbars on a keyboard pop to give more screen room and prevent ios bug which
					//positions fixed toolbars in the middle of the screen on pop if the input is near the top or
					//bottom of the screen addresses issues #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					//and issue #4113 Header and footer change their position after keyboard popup - iOS
					//and issue #4410 Footer navbar moves up when clicking on a textbox in an Android environment
					if ( screen.width < 1025 && $( e.target ).is( o.hideDuringFocus ) && !$( e.target ).closest( ".ui-header-fixed, .ui-footer-fixed" ).length ) {
						//Fix for issue #4724 Moving through form in Mobile Safari with "Next" and "Previous" system
						//controls causes fixed position, tap-toggle false Header to reveal itself
						// isVisible instead of self._visible because the focusin and focusout events fire twice at the same time
						// Also use a delay for hiding the toolbars because on Android native browser focusin is direclty followed
						// by a focusout when a native selects opens and the other way around when it closes.
						if ( e.type === "focusout" && !isVisible ) {
							isVisible = true;
							//wait for the stack to unwind and see if we have jumped to another input
							clearTimeout( delayHide );
							delayShow = setTimeout( function() {
								self.show();
							}, 0 );
						} else if ( e.type === "focusin" && !!isVisible ) {
							//if we have jumped to another input clear the time out to cancel the show.
							clearTimeout( delayShow );
							isVisible = false;
							delayHide = setTimeout( function() {
								self.hide();
							}, 0 );
						}
					}
				});
		},

		_setRelative: function() {
			if( this.options.position !== "fixed" ){
				$( "[data-"+ $.mobile.ns + "role='page']" ).css({ "position": "relative" });
			}
		},

		_destroy: function() {
			var hasFixed, header,
				page = this.pagecontainer.pagecontainer( "getActivePage" );

			this._super();
			if ( this.options.position === "fixed" ) {
				hasFixed = $(  "body>.ui-" + this.role + "-fixed" )
							.add( page.find( ".ui-" + this.options.role + "-fixed" ) )
							.not( this.element ).length > 0;

				if ( !hasFixed ) {
					header = this.role === "header";
					page.css( "padding-" + ( header ? "top" : "bottom" ), "" );
				}
			}
		}

	});
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
