/*!
 * jQuery Mobile Fixed Toolbar Workarounds @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Toolbars: Fixed: Workarounds
//>>group: Widgets
//>>description: Browser specific workarounds for "fixed" headers and footers
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar-fixed/
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"../core",
			"../navigation",
			"./page",
			"../zoom",
			"./fixedToolbar" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.toolbar", $.mobile.toolbar, {

	_makeFixed: function() {
		this._super();
		this._workarounds();
	},

	//check the browser and version and run needed workarounds
	_workarounds: function() {
		var ua = navigator.userAgent,
			platform = navigator.platform,

			// Rendering engine is Webkit, and capture major version
			wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
			wkversion = !!wkmatch && wkmatch[ 1 ],
			os = null,
			self = this;

		//set the os we are working in if it dosent match one with workarounds return
		if ( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1 ||
				platform.indexOf( "iPod" ) > -1 ) {
			os = "ios";
		} else if ( ua.indexOf( "Android" ) > -1 ) {
			os = "android";
		} else {
			return;
		}

		//check os version if it dosent match one with workarounds return
		if ( os === "ios" ) {

			//iOS  workarounds
			self._bindScrollWorkaround();
		} else if ( os === "android" && wkversion && wkversion < 534 ) {

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
			header = $el.hasClass( "ui-header" ),
			offset = Math.abs( $el.offset().top - this.window.scrollTop() );
		if ( !header ) {
			offset = Math.round( offset - this.window.height() + $el.outerHeight() ) - 60;
		}
		return offset;
	},

	//bind events for _triggerRedraw() function
	_bindScrollWorkaround: function() {
		var self = this;

		//bind to scrollstop and check if the toolbars are correctly positioned
		this._on( this.window, { scrollstop: function() {
				var viewportOffset = self._viewportOffset();

				//check if the header is visible and if its in the right place
				if ( viewportOffset > 2 && self._visible ) {
					self._triggerRedraw();
				}
		} } );
	},

	// This addresses issue #4250 Persistent footer instability in v1.1 with long select lists
	// in Android 2.3.3 and issue #3748 Android 2.x: Page transitions broken when fixed toolbars
	// used the absolutely positioned thumbnail in a list view causes problems with fixed position
	// buttons above in a nav bar setting the li's to -webkit-transform:translate3d(0,0,0); solves
	// this problem to avoide potential issues in other platforms we scope this with the class
	// ui-android-2x-fix
	_bindListThumbWorkaround: function() {
		var pageActive = $( ".ui-page-active" ),
			currentPage = !!this.page ? this.page : pageActive.length ?
			pageActive : $( ".ui-page" ).eq( 0 );
		this._addClass( currentPage, "ui-toolbar-android-2x-fix" );
	},

	// This addresses issues #4337 Fixed header problem after scrolling content on iOS and Android
	// and device bugs project issue #1 Form elements can lose click hit area in
	// position: fixed containers. This also addresses not on fixed toolbars page in docs
	// adding 1px of padding to the bottom then removing it causes a "redraw"
	// which positions the toolbars correctly (they will always be visually correct)
	_triggerRedraw: function() {
		var paddingBottom = parseFloat( $( ".ui-page-active" ).css( "padding-bottom" ) );

		//trigger page redraw to fix incorrectly positioned fixed elements
		$( ".ui-page-active" ).css( "padding-bottom", ( paddingBottom + 1 ) + "px" );

		//if the padding is reset with out a timeout the reposition will not occure.
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

} );
