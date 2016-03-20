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
//>>description: Behavior for "fixed" headers and footers - be sure to also include the
//>> item 'Browser specific workarounds for "fixed" headers and footers' when supporting
//>> Android 2.x
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar-fixed/
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./fixedToolbar" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	return $.widget( "mobile.toolbar", $.mobile.toolbar, {

		options: {
			hideDuringFocus: "input, textarea, select",
			tapToggle: true,
			supportBlacklist: function() {
				return $.noop;
			}
		},

		_hideDuringFocusData: {
			delayShow: 0,
			delayHide: 0,
			isVisible: true
		},

		_handlePageFocusinFocusout: function( event ) {
			var data = this._hideDuringFocusData;

			// This hides the toolbars on a keyboard pop to give more screen room and prevent
			// ios bug which positions fixed toolbars in the middle of the screen on pop if the
			// input is near the top or bottom of the screen addresses issues #4410 Footer
			// navbar moves up when clicking on a textbox in an Android environment and issue
			// #4113 Header and footer change their position after keyboard popup - iOS and
			// issue #4410 Footer navbar moves up when clicking on a textbox in an Android
			// environment
			if ( this.options.hideDuringFocus && screen.width < 1025 &&
					$( event.target ).is( this.options.hideDuringFocus ) &&
					!$( event.target )
						.closest( ".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed" ).length ) {

				// Fix for issue #4724 Moving through form in Mobile Safari with "Next" and
				// "Previous" system controls causes fixed position, tap-toggle false Header to
				// reveal itself isVisible instead of self._visible because the focusin and
				// focusout events fire twice at the same time Also use a delay for hiding the
				// toolbars because on Android native browser focusin is direclty followed by a
				// focusout when a native selects opens and the other way around when it closes.
				if ( event.type === "focusout" && !data.isVisible ) {
					data.isVisible = true;

					// Wait for the stack to unwind and see if we have jumped to another input
					clearTimeout( data.delayHide );
					data.delayShow = this._delay( "show", 0 );
				} else if ( event.type === "focusin" && !!data.isVisible ) {

					// If we have jumped to another input clear the time out to cancel the show
					clearTimeout( data.delayShow );
						data.isVisible = false;
						data.delayHide = this._delay( "hide", 0 );
				}
			}
		},

		_attachToggleHandlersToPage: function( page ) {
			this._on( page, {
				focusin: "_handlePageFocusinFocusout",
				focusout: "_handlePageFocusinFocusout"
			} );
			return this._superApply( arguments );
		},

		_makeFixed: function() {
			this._super();
			this._workarounds();
		},

		//Check the browser and version and run needed workarounds
		_workarounds: function() {
			var ua = navigator.userAgent,

				// Rendering engine is Webkit, and capture major version
				wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
				wkversion = !!wkmatch && wkmatch[ 1 ],
				os = null,
				self = this;

			if ( ua.indexOf( "Android" ) > -1 ) {
				os = "android";
			} else {
				return;
			}

			if ( os === "android" && wkversion && wkversion < 534 ) {

				//Android 2.3 run all Android 2.3 workaround
				self._bindScrollWorkaround();
				self._bindListThumbWorkaround();
			} else {
				return;
			}
		},

		//Utility class for checking header and footer positions relative to viewport
		_viewportOffset: function() {
			var $el = this.element,
				header = $el.hasClass( "ui-toolbar-header" ),
				offset = Math.abs( $el.offset().top - this.window.scrollTop() );
			if ( !header ) {
				offset = Math.round( offset - this.window.height() + $el.outerHeight() ) - 60;
			}
			return offset;
		},

		//Bind events for _triggerRedraw() function
		_bindScrollWorkaround: function() {
			var self = this;

			//Bind to scrollstop and check if the toolbars are correctly positioned
			this._on( this.window, { scrollstop: function() {
					var viewportOffset = self._viewportOffset();

					//Check if the header is visible and if its in the right place
					if ( viewportOffset > 2 && self._visible ) {
						self._triggerRedraw();
					}
			} } );
		},

		// This addresses issue #4250 Persistent footer instability in v1.1 with long select lists
		// in Android 2.3.3 and issue #3748 Android 2.x: Page transitions broken when fixed toolbars
		// used the absolutely positioned thumbnail in a list view causes problems with fixed
		// position buttons above in a nav bar setting the li's to
		// -webkit-transform:translate3d(0,0,0); solves this problem to avoid potential issues in
		// other platforms we scope this with the class ui-android-2x-fix
		_bindListThumbWorkaround: function() {
			var pageActive = $( ".ui-page-active" ),
				currentPage = !!this.page ? this.page : pageActive.length ?
				pageActive : $( ".ui-page" ).eq( 0 );
			this._addClass( currentPage, "ui-toolbar-android-2x-fix" );
		},

		// Addresses issues #4337 Fixed header problem after scrolling content on iOS and Android
		// and device bugs project issue #1 Form elements can lose click hit area in
		// position: fixed containers. This also addresses not on fixed toolbars page in docs
		// adding 1px of padding to the bottom then removing it causes a "redraw"
		// which positions the toolbars correctly (they will always be visually correct)
		_triggerRedraw: function() {
			var paddingBottom = parseFloat( $( ".ui-page-active" ).css( "padding-bottom" ) );

			//Trigger page redraw to fix incorrectly positioned fixed elements
			$( ".ui-page-active" ).css( "padding-bottom", ( paddingBottom + 1 ) + "px" );

			//If the padding is reset with out a timeout the reposition will not occure.
			//this is independent of JQM the browser seems to need the time to react.
			setTimeout( function() {
				$( ".ui-page-active" ).css( "padding-bottom", paddingBottom + "px" );
			}, 0 );
		},

		destroy: function() {
			this._super();
			var pageActive = $( ".ui-page-active" ),
				currentPage = !!this.page ? this.page : pageActive.length ?
				pageActive : $( ".ui-page" ).eq( 0 );

			//Remove the class we added to the page previously in android 2.x
			this._removeClass( currentPage, "ui-toolbar-android-2x-fix" );
		}

	} );

}
} );
