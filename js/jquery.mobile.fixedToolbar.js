/*
* "fixedtoolbar"  plugin - behavior for "fixed" headers and footers
*/

(function( $, undefined ) {

	$.widget( "mobile.fixedtoolbar", $.mobile.widget, {
		options: {
			visibleOnPageShow: true,
			togglePageZoom: true,
			transition: "fade", //can be false, fade, slide (slide maps to vertical slides)
			fullscreen: false,
			tapToggle: true,
			scrollToggle: false,
			
			// Browser detection! Weeee, here we go...
			// Unfortunately, position:fixed is costly, not to mention probably impossible, to feature-detect accurately.
			// Some tests exist, but they currently return false results in critical devices and browsers, 
			// which could lead to a broken experience.
			// Testing is also pretty obtrusive to page load here, requiring injected elements and scrolling the window
			// For that reason, the following function serves to rule out some browsers with known issues
			// This is a plugin option like any other, so feel free to improve or overwrite it
			supportBlacklist: function(){
				var blacklisted = false,
					ua = navigator.userAgent,
					platform = navigator.platform,
					w = window;
				
				// iOS 4.3 and older 
				if(
					// Platform is iPhone/Pad/Touch
					( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ) &&
					// Rendering engine is Webkit
					ua.match( /(AppleWebKit)\/([0-9\.]+) / ) && 
					// Webkit version is less than 534 (ios5)
					RegExp.$1 && ( RegExp.$2 && RegExp.$2.split( "." )[0] < 534 )
				){
						blacklisted = true;
				}
				
				// Opera Mini
				if( operamini = w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ){
					blacklisted = true;
				}
				
				//Android lte 2.1
				/*
				if( ... ){
					blacklisted = true;
				}
				*/
				
				return blacklisted;
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
				$el.addClass( "ui-" + tbtype + "-fullscreen" );
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
				
			if( tclass ){
				// use appropriate slide for header or footer
				if( tclass === "slide" ){
					tclass = this.element.is( ".ui-header" ) ? "slidedown" : "slideup";
				}
				
				this.element.addClass( tclass );
			}
		},
		
		/* Note: this is all that's needed to make iOS 4.3 and Android 2.1 fix their positioning mistakes after scrolling
		 it won't fully patch a "fixed effect", but rather just repositions after scrollstop
		
		_fixFixedSupport: function(){
			var $el = this.element,
				tbtype = $el.is( ".ui-header" ) ? "header" : "footer";

			$( window )
				.bind( "scrollstop", function(){
					// TODO: check if toolbars are not positioned correctly on screen, then proceed
					if( tbtype === "header" ){
						$el.css( "top", $( window ).scrollTop() );
					}
					else {
						$el.css( "bottom", -$( window ).scrollTop() );
					}
				})
		},
		*/
		
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
			var hideClass = "ui-fixed-hidden";
			if(  this.options.transition ){
				this.element
					.removeClass( "out " + hideClass )
					.addClass( "in" );
			}
			else {
				this.element.removeClass( hideClass );
			}
			this._visible = true;
		},
		
		hide: function(){
			var hideClass = "ui-fixed-hidden";
			if(  this.options.transition ){
				this.element
					.removeClass( "in" )
					.addClass( "out" )
					.animationComplete(function(){
						$(this).addClass( hideClass );
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
		
		_visibleBeforeScroll: null,
		
		_bindToggleHandlers: function(){
			var self = this,
				o = self.options,
				$el = self.element;
			
			// tap toggle
			$el.closest( ".ui-page" )
				.bind( "vclick", function(){
					if( o.tapToggle ){
						self.toggle();
					}
				});
			
			// scroll toggle
			$( window )
				.bind( "scrollstart", function(){
					if( o.scrollToggle && self.visible ){
						self.hide();
					}
				})
				.bind( "scrollstop", function(){
					if( o.scrollToggle && self._visibleBeforeScroll ){
						self.hide();
					}
				});
		},
		
		destroy: function(){
			this.element.removeClass( "ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden" )
			this.element.closest( ".ui-page" ).removeClass( "ui-page-header-fixed ui-page-footer-fixed" );
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