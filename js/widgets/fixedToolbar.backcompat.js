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
			"./fixedToolbar" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	return $.widget( "mobile.toolbar", $.mobile.toolbar, {

		options: {
			hideDuringFocus: "input, textarea, select"
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
						.closest( ".ui-header-fixed, .ui-footer-fixed" ).length ) {

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
		}

	} );

}
} );
