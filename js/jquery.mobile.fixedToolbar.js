//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Behavior for "fixed" headers and footers
//>>label: Fixedtoolbar

define( [ "jquery", "jquery.mobile.widget", "jquery.mobile.navigation", "jquery.mobile.page", "jquery.mobile.page.sections" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {


	$.widget( "mobile.fixedtoolbar", $.mobile.widget, {
		options: {
			visibleOnPageShow: true,
			togglePageZoom: true,
			transition: "fade", //can be none, fade, slide (slide maps to slideup or slidedown)
			fullscreen: false,
			tapToggle: true,
			
			// Browser detection! Weeee, here we go...
			// Unfortunately, position:fixed is costly, not to mention probably impossible, to feature-detect accurately.
			// Some tests exist, but they currently return false results in critical devices and browsers, which could lead to a broken experience.
			// Testing fixed positioning is also pretty obtrusive to page load, requiring injected elements and scrolling the window
			// The following function serves to rule out some popular browsers with known fixed-positioning issues
			// This is a plugin option like any other, so feel free to improve or overwrite it
			supportBlacklist: function(){
				var ua = navigator.userAgent,
					platform = navigator.platform,
					// Rendering engine is Webkit, and capture major version
					wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
					wkversion = !!wkmatch && wkmatch[ 1 ],
					ffmatch = ua.match( /Fennec\/([0-9]+)/ ),
					ffversion = !!ffmatch && ffmatch[ 1 ],
					operammobilematch = ua.match( /Opera Mobile\/([0-9]+)/ ),
					omversion = !!operammobilematch && operammobilematch[ 1 ],
					
					w = window;

				if(
					// iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
					( ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ) && wkversion && wkversion < 534 )
					||
					// Opera Mini
					( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" )
					||
					( operammobilematch && omverson < 7458 )
					||
					//Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
					( ua.indexOf( "Android" ) > -1 && wkversion && wkversion < 533 )
					||
					// Firefox Mobile before 6.0 - 
					( ffversion && ffversion < 6 )
					||
					// WebOS less than 3
					( "palmGetResource" in window && wkversion && wkversion < 534 )
				){
					return true;
				}
				
				return false;
			},
			initSelector: ":jqmData(position='fixed')"
		},
		
		_create: function() {
			
			var self = this,
				o = self.options,
				$el = self.element,
				tbtype = $el.is( ".ui-header" ) ? "header" : "footer",
				$page = $el.closest(".ui-page");
			
			// Feature detecting support for 
			if( o.supportBlacklist() ){
				self.destroy();
				return;
			}
			
			$el.addClass( "ui-"+ tbtype +"-fixed" );
			
			// "fullscreen" overlay positioning
			// NOTE - this used to be only "data-fullscreen" on page element. Support both or deprecate page?
			if( $el.jqmData( "fullscreen" ) || $page.jqmData( "fullscreen" ) ){
				$el.addClass( "ui-"+ tbtype +"-fullscreen" );
				$page.addClass( "ui-page-" + tbtype + "-fullscreen" );
			}
			// If not fullscreen, add class to page to set top or bottom padding
			else{
				$page.addClass( "ui-page-" + tbtype + "-fixed" );
			}
			
			self._addTransitionClass();
			self._bindPageEvents();
			self._bindToggleHandlers();
		},
		
		_addTransitionClass: function(){
			var tclass = this.options.transition;
				
			if( tclass && tclass !== "none" ){
				// use appropriate slide for header or footer
				if( tclass === "slide" ){
					tclass = this.element.is( ".ui-header" ) ? "slidedown" : "slideup";
				}
				
				this.element.addClass( tclass );
			}
		},
		
		_bindPageEvents: function(){
			var self = this,
				o = self.options,
				$el = self.element;
			
			//page event bindings
			$el.closest( ".ui-page" )
				.bind( "pagebeforeshow", function(){
					if( o.togglePageZoom ){
						self.disablePageZoom();
					}
					if( o.visibleOnPageShow ){
						self.show();
					}
				} )
				.bind( "pagehide", function(){
					if( o.togglePageZoom ){
						self.restorePageZoom();
					}
				});
		},
		
		_visible: false, 
		
		show: function(){
			var hideClass = "ui-fixed-hidden",
				$el = this.element,
				scroll = $( window ).scrollTop(),
				elHeight = $el.height(),
				pHeight = $el.closest( ".ui-page" ).height(),
				viewportHeight = Math.min( screen.height, $( window ).height() ),
				tbtype = $el.is( ".ui-header" ) ? "header" : "footer";

				if( this.options.transition && this.options.transition !== "none" &&
					(
					( tbtype === "header" && !this.options.fullscreen && scroll > elHeight ) ||
					( tbtype === "footer" && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight )
					) || this.options.fullscreen ){
				$el
					.removeClass( "out " + hideClass )
					.addClass( "in" );
			}
			else {
				$el.removeClass( hideClass );
			}
			this._visible = true;
		},
		
		hide: function(){
			var hideClass = "ui-fixed-hidden",
				$el = this.element,
				scroll = $( window ).scrollTop(),
				elHeight = $el.height(),
				pHeight = $el.closest( ".ui-page" ).height(),
				viewportHeight = Math.min( screen.height, $( window ).height() ),
				tbtype = $el.is( ".ui-header" ) ? "header" : "footer";

				if( this.options.transition && this.options.transition !== "none" &&
					(
					( tbtype === "header" && !this.options.fullscreen && scroll > elHeight ) ||
					( tbtype === "footer" && !this.options.fullscreen && scroll + viewportHeight < pHeight - elHeight )
					) || this.options.fullscreen ){
				$el
					.removeClass( "in" )
					.addClass( "out" )
					.animationComplete( function(){
						$el.addClass( hideClass );
					});
			}
			else {
				this.element.addClass( hideClass );
			}
			this._visible = false;
		},
		
		toggle: function(){
			this[ this._visible ? "hide" : "show" ]();
		},
				
		_bindToggleHandlers: function(){
			var self = this,
				o = self.options,
				$el = self.element;
			
			// tap toggle
			$el.closest( ".ui-page" )
				.bind( "vclick", function( e ){
					if( o.tapToggle && $el.find( e.target ).length === 0 ){
						self.toggle();
					}
				});
		},
		
		destroy: function(){
			this.element.removeClass( "ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden" )
			this.element.closest( ".ui-page" ).removeClass( "ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen" );
		},
		
		// for caching reference to meta viewport elem
		_metaViewport: null,
		
		// on pageshow, does a meta viewport element exist in the head?
		_metaViewportPreexists: false,
		
		// used for storing value of meta viewport content at page show, for restoration on hide
		_metaViewportContent: "",
		
		// Fixed toolbars require page zoom to be disabled, otherwise usability issues crop up
		// This method is meant to disable zoom while a fixed-positioned toolbar page is visible
		disablePageZoom: function(){
			if( !this.options.togglePageZoom ){
				return;
			}
			var cont = "user-scalable=no";
			this._metaViewport = $( "meta[name='viewport']" );
			this._metaViewportPreexists = this._metaViewport.length;
			
			var currentContent = this._metaViewport.attr( "content" );
			
			// If scaling's already disabled, or another plugin is handling it on this page already
			if( currentContent.indexOf( cont ) > -1 ){
				return;
			}
			else {
				this._metaViewportContent = currentContent;
			}
			
			if( !this._metaViewportPreexists ){
				this._metaViewport = $( "<meta>", { "name": "viewport", "content": cont } ).prependTo( "head" );
			}
			else{
				this._metaViewport.attr( "content", this._metaViewportContent + ", " + cont );
			}
		},
		
		// restore the meta viewport tag to its original state, or remove it
		restorePageZoom: function(){
			if( !this.options.togglePageZoom ){
				return;
			}
			var cont = "user-scalable=no";
			if( this._metaViewport.attr( "content" ).indexOf( cont ) < 0 ){
				return;
			}
			
			if( this._metaViewportPreexists ){
				this._metaViewport.attr( "content", this._metaViewportContent );
			}
			else {
				this._metaViewport.remove();
			}
		}
		
	});
	
	//auto self-init widgets
	$( document ).bind( "pagecreate create", function( e ){
		$( $.mobile.fixedtoolbar.prototype.options.initSelector, e.target ).fixedtoolbar();
	});	

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
