/*!
 * jQuery Mobile Zoom @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Zoom Handling
//>>group: Utilities
//>>description: Utility methods for enabling and disabling user scaling (pinch zoom)

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./core" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var meta = $( "meta[name=viewport]" ),
	initialContent = meta.attr( "content" ),
	disabledZoom = initialContent + ",maximum-scale=1, user-scalable=no",
	enabledZoom = initialContent + ",maximum-scale=10, user-scalable=yes",
	disabledInitially = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test( initialContent );

$.mobile.zoom = $.extend( {}, {
	enabled: !disabledInitially,
	locked: false,
	disable: function( lock ) {
		if ( !disabledInitially && !$.mobile.zoom.locked ) {
			meta.attr( "content", disabledZoom );
			$.mobile.zoom.enabled = false;
			$.mobile.zoom.locked = lock || false;
		}
	},
	enable: function( unlock ) {
		if ( !disabledInitially && ( !$.mobile.zoom.locked || unlock === true ) ) {
			meta.attr( "content", enabledZoom );
			$.mobile.zoom.enabled = true;
			$.mobile.zoom.locked = false;
		}
	},
	restore: function() {
		if ( !disabledInitially ) {
			meta.attr( "content", initialContent );
			$.mobile.zoom.enabled = true;
		}
	}
} );

return $.mobile.zoom;
} );
