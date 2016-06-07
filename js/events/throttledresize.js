/*!
 * jQuery Mobile Throttled Resize @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Throttled Resize
//>>group: Events
//>>description: Fires a resize event with a slight delay to prevent excessive callback invocation
//>>docs: http://api.jquerymobile.com/throttledresize/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var throttle = 250,
	lastCall = 0,
	heldCall,
	curr,
	diff,
	handler = function() {
		curr = ( new Date() ).getTime();
		diff = curr - lastCall;

		if ( diff >= throttle ) {

			lastCall = curr;
			$( this ).trigger( "throttledresize" );

		} else {

			if ( heldCall ) {
				clearTimeout( heldCall );
			}

			// Promise a held call will still execute
			heldCall = setTimeout( handler, throttle - diff );
		}
	};

// throttled resize event
$.event.special.throttledresize = {
	setup: function() {
		$( this ).bind( "resize", handler );
	},
	teardown: function() {
		$( this ).unbind( "resize", handler );
	}
};

return $.event.special.throttledresize;
} );
