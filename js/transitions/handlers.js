/*!
 * jQuery Mobile Transition Handlers @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Transition Handlers
//>>group: Transitions
//>>description: Animated page change handlers for integrating with Navigation
//>>demos: http://demos.jquerymobile.com/@VERSION/transitions/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../core",
			"./serial",
			"./concurrent" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

// generate the handlers from the above
var defaultGetMaxScrollForTransition = function() {
	return $( window ).height() * 3;
};

//transition handler dictionary for 3rd party transitions
$.mobile.transitionHandlers = {
	"sequential": $.mobile.SerialTransition,
	"simultaneous": $.mobile.ConcurrentTransition
};

// Make our transition handler the public default.
$.mobile.defaultTransitionHandler = $.mobile.transitionHandlers.sequential;

$.mobile.transitionFallbacks = {};

// If transition is defined, check if css 3D transforms are supported, and if not, if a fallback is specified
$.mobile._maybeDegradeTransition = function( transition ) {
	if ( transition && !$.support.cssTransform3d && $.mobile.transitionFallbacks[ transition ] ) {
		transition = $.mobile.transitionFallbacks[ transition ];
	}

	return transition;
};

// Set the getMaxScrollForTransition to default if no implementation was set by user
$.mobile.getMaxScrollForTransition = $.mobile.getMaxScrollForTransition || defaultGetMaxScrollForTransition;

return $.mobile.transitionHandlers;
} );
