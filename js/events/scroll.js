/*!
 * jQuery Mobile Scroll Events @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Scroll
//>>group: Events
//>>description: Scroll events including: scrollstart, scrollstop

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var scrollEvent = "touchmove scroll";

// setup new event shortcuts
$.each( [ "scrollstart", "scrollstop" ], function( i, name ) {

	$.fn[ name ] = function( fn ) {
		return fn ? this.bind( name, fn ) : this.trigger( name );
	};

	// jQuery < 1.8
	if ( $.attrFn ) {
		$.attrFn[ name ] = true;
	}
} );

// also handles scrollstop
$.event.special.scrollstart = {

	enabled: true,
	setup: function() {

		var thisObject = this,
			$this = $( thisObject ),
			scrolling,
			timer;

		function trigger( event, state ) {
			var originalEventType = event.type;

			scrolling = state;

			event.type = scrolling ? "scrollstart" : "scrollstop";
			$.event.dispatch.call( thisObject, event );
			event.type = originalEventType;
		}

		var scrollStartHandler = $.event.special.scrollstart.handler = function ( event ) {

			if ( !$.event.special.scrollstart.enabled ) {
				return;
			}

			if ( !scrolling ) {
				trigger( event, true );
			}

			clearTimeout( timer );
			timer = setTimeout( function() {
				trigger( event, false );
			}, 50 );
		};

		// iPhone triggers scroll after a small delay; use touchmove instead
		$this.on( scrollEvent, scrollStartHandler );
	},
	teardown: function() {
		$( this ).off( scrollEvent, $.event.special.scrollstart.handler );
	}
};

$.each( {
	scrollstop: "scrollstart"
}, function( event, sourceEvent ) {

	$.event.special[ event ] = {
		setup: function() {
			$( this ).bind( sourceEvent, $.noop );
		},
		teardown: function() {
			$( this ).unbind( sourceEvent );
		}
	};
} );

return $.event.special;
} );
