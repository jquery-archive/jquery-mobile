/*!
 * jQuery Mobile Orientation Change Event @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Orientation Change
//>>group: Events
//>>description: Provides a wrapper around the inconsistent browser implementations of orientationchange
//>>docs: http://api.jquerymobile.com/orientationchange/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../support/orientation",
			"./throttledresize" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var win = $( window ),
	event_name = "orientationchange",
	get_orientation,
	last_orientation,
	initial_orientation_is_landscape,
	initial_orientation_is_default,
	portrait_map = { "0": true, "180": true },
	ww, wh, landscape_threshold;

// It seems that some device/browser vendors use window.orientation values 0 and 180 to
// denote the "default" orientation. For iOS devices, and most other smart-phones tested,
// the default orientation is always "portrait", but in some Android and RIM based tablets,
// the default orientation is "landscape". The following code attempts to use the window
// dimensions to figure out what the current orientation is, and then makes adjustments
// to the to the portrait_map if necessary, so that we can properly decode the
// window.orientation value whenever get_orientation() is called.
//
// Note that we used to use a media query to figure out what the orientation the browser
// thinks it is in:
//
//     initial_orientation_is_landscape = $.mobile.media("all and (orientation: landscape)");
//
// but there was an iPhone/iPod Touch bug beginning with iOS 4.2, up through iOS 5.1,
// where the browser *ALWAYS* applied the landscape media query. This bug does not
// happen on iPad.

if ( $.support.orientation ) {

	// Check the window width and height to figure out what the current orientation
	// of the device is at this moment. Note that we've initialized the portrait map
	// values to 0 and 180, *AND* we purposely check for landscape so that if we guess
	// wrong, , we default to the assumption that portrait is the default orientation.
	// We use a threshold check below because on some platforms like iOS, the iPhone
	// form-factor can report a larger width than height if the user turns on the
	// developer console. The actual threshold value is somewhat arbitrary, we just
	// need to make sure it is large enough to exclude the developer console case.

	ww = window.innerWidth || win.width();
	wh = window.innerHeight || win.height();
	landscape_threshold = 50;

	initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;

	// Now check to see if the current window.orientation is 0 or 180.
	initial_orientation_is_default = portrait_map[ window.orientation ];

	// If the initial orientation is landscape, but window.orientation reports 0 or 180, *OR*
	// if the initial orientation is portrait, but window.orientation reports 90 or -90, we
	// need to flip our portrait_map values because landscape is the default orientation for
	// this device/browser.
	if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
		portrait_map = { "-90": true, "90": true };
	}
}

// If the event is not supported natively, this handler will be bound to
// the window resize event to simulate the orientationchange event.
function handler() {
	// Get the current orientation.
	var orientation = get_orientation();

	if ( orientation !== last_orientation ) {
		// The orientation has changed, so trigger the orientationchange event.
		last_orientation = orientation;
		win.trigger( event_name );
	}
}

$.event.special.orientationchange = $.extend( {}, $.event.special.orientationchange, {
	setup: function() {
		// If the event is supported natively, return false so that jQuery
		// will bind to the event using DOM methods.
		if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
			return false;
		}

		// Get the current orientation to avoid initial double-triggering.
		last_orientation = get_orientation();

		// Because the orientationchange event doesn't exist, simulate the
		// event by testing window dimensions on resize.
		win.bind( "throttledresize", handler );
	},
	teardown: function() {
		// If the event is not supported natively, return false so that
		// jQuery will unbind the event using DOM methods.
		if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
			return false;
		}

		// Because the orientationchange event doesn't exist, unbind the
		// resize event handler.
		win.unbind( "throttledresize", handler );
	},
	add: function( handleObj ) {
		// Save a reference to the bound event handler.
		var old_handler = handleObj.handler;

		handleObj.handler = function( event ) {
			// Modify event object, adding the .orientation property.
			event.orientation = get_orientation();

			// Call the originally-bound event handler and return its result.
			return old_handler.apply( this, arguments );
		};
	}
} );

// Get the current page orientation. This method is exposed publicly, should it
// be needed, as jQuery.event.special.orientationchange.orientation()
$.event.special.orientationchange.orientation = get_orientation = function() {
	var isPortrait = true,
		elem = document.documentElement;

	// prefer window orientation to the calculation based on screensize as
	// the actual screen resize takes place before or after the orientation change event
	// has been fired depending on implementation (eg android 2.3 is before, iphone after).
	// More testing is required to determine if a more reliable method of determining the new screensize
	// is possible when orientationchange is fired. (eg, use media queries + element + opacity)
	if ( $.support.orientation ) {
		// if the window orientation registers as 0 or 180 degrees report
		// portrait, otherwise landscape
		isPortrait = portrait_map[ window.orientation ];
	} else {
		isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
	}

	return isPortrait ? "portrait" : "landscape";
};

$.fn[ event_name ] = function( fn ) {
	return fn ? this.bind( event_name, fn ) : this.trigger( event_name );
};

// jQuery < 1.8
if ( $.attrFn ) {
	$.attrFn[ event_name ] = true;
}

return $.event.special;
} );
