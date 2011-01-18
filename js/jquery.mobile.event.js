/*
* jQuery Mobile Framework : events
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

// add new event shortcuts
$.each( "touchstart touchmove touchend orientationchange tap taphold swipe swipeleft swiperight scrollstart scrollstop".split( " " ), function( i, name ) {
	$.fn[ name ] = function( fn ) {
		return fn ? this.bind( name, fn ) : this.trigger( name );
	};
	$.attrFn[ name ] = true;
});

var supportTouch = $.support.touch,
	scrollEvent = "touchmove scroll",
	touchStartEvent = supportTouch ? "touchstart" : "mousedown",
	touchStopEvent = supportTouch ? "touchend" : "mouseup",
	touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

// also handles scrollstop
$.event.special.scrollstart = {
	enabled: true,
	
	setup: function() {
		var thisObject = this,
			$this = $( thisObject ),
			scrolling,
			timer;
		
		function trigger( event, state ) {
			scrolling = state;
			var originalType = event.type;
			event.type = scrolling ? "scrollstart" : "scrollstop";
			$.event.handle.call( thisObject, event );
			event.type = originalType;
		}
		
		// iPhone triggers scroll after a small delay; use touchmove instead
		$this.bind( scrollEvent, function( event ) {
			if ( !$.event.special.scrollstart.enabled ) {
				return;
			}
			
			if ( !scrolling ) {
				trigger( event, true );
			}
			
			clearTimeout( timer );
			timer = setTimeout(function() {
				trigger( event, false );
			}, 50 );
		});
	}
};

// also handles taphold
$.event.special.tap = {
	setup: function() {
		var thisObject = this,
			$this = $( thisObject );
		
		$this
			.bind( touchStartEvent, function( event ) {
				if ( event.which && event.which !== 1 ) {
					return;
				}
				
				var moved = false,
					touching = true,
					origPos = [ event.pageX, event.pageY ],
					originalType,
					timer;
				
				function moveHandler() {
					if ((Math.abs(origPos[0] - event.pageX) > 10) ||
					    (Math.abs(origPos[1] - event.pageY) > 10)) {
					    moved = true;
					}
				}
				
				timer = setTimeout(function() {
					if ( touching && !moved ) {
						originalType = event.type;
						event.type = "taphold";
						$.event.handle.call( thisObject, event );
						event.type = originalType;
					}
				}, 750 );
				
				$this
					.one( touchMoveEvent, moveHandler)
					.one( touchStopEvent, function( event ) {
						$this.unbind( touchMoveEvent, moveHandler );
						clearTimeout( timer );
						touching = false;
						
						if ( !moved ) {
							originalType = event.type;
							event.type = "tap";
							$.event.handle.call( thisObject, event );
							event.type = originalType;
						}
					});
			});
	}
};

// also handles swipeleft, swiperight
$.event.special.swipe = {
	setup: function() {
		var thisObject = this,
			$this = $( thisObject );
		
		$this
			.bind( touchStartEvent, function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] :
						event,
					start = {
						time: (new Date).getTime(),
						coords: [ data.pageX, data.pageY ],
						origin: $( event.target )
					},
					stop;
				
				function moveHandler( event ) {
					if ( !start ) {
						return;
					}
					
					var data = event.originalEvent.touches ?
							event.originalEvent.touches[ 0 ] :
							event;
					stop = {
							time: (new Date).getTime(),
							coords: [ data.pageX, data.pageY ]
					};
					
					// prevent scrolling
					if ( Math.abs( start.coords[0] - stop.coords[0] ) > 10 ) {
						event.preventDefault();
					}
				}
				
				$this
					.bind( touchMoveEvent, moveHandler )
					.one( touchStopEvent, function( event ) {
						$this.unbind( touchMoveEvent, moveHandler );
						if ( start && stop ) {
							if ( stop.time - start.time < 1000 && 
									Math.abs( start.coords[0] - stop.coords[0]) > 30 &&
									Math.abs( start.coords[1] - stop.coords[1]) < 75 ) {
								start.origin
								.trigger( "swipe" )
								.trigger( start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight" );
							}
						}
						start = stop = undefined;
					});
			});
	}
};

(function($){
	// "Cowboy" Ben Alman
	
	var win = $(window),
		special_event,
		get_orientation,
		last_orientation;
	
	$.event.special.orientationchange = special_event = {
		setup: function(){
			// If the event is supported natively, return false so that jQuery
			// will bind to the event using DOM methods.
			if ( $.support.orientation ) { return false; }
			
			// Because the orientationchange event doesn't exist, simulate the
			// event by testing window dimensions on resize.
			win.bind( "resize", simulateOrientationChange);
		},
		teardown: function(){
			// If the event is not supported natively, return false so that
			// jQuery will unbind the event using DOM methods.
			if ( $.support.orientation ) { return false; }
			
			// Because the orientationchange event doesn't exist, unbind the
			// resize event handler.
			win.unbind( "resize", simulateOrientationChange);
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
	};
	
	// If the event is not supported natively, this handler will be bound to
	// the window resize event to simulate the orientationchange event.
	function simulateOrientationChange(event) {
		// Get the current orientation.
		event.orientation = get_orientation();
		
		if (event.orientation !== last_orientation) {
			// The orientation has changed, so trigger the orientationchange event.
			last_orientation = event.orientation;
			win.trigger( "orientationchange" );
		}
	};
	
	// Get the current page orientation. This method is exposed publicly, should it
	// be needed, as jQuery.event.special.orientationchange.orientation()
	special_event.orientation = orientationByRatio = function() {
		var ratio       = win.width() / win.height();
		var orientation = (ratio < 1.1 ? 'portrait' : 'landscape');

		return orientation;
	};

	/*************************************************************************
	 * Setup orientation support based upon whether it is natively supported.
	 *
	 */
	if ( $.support.orientation )    setupNative();
	else                            setupNonNative();


	/** @brief If we do NOT have native orientation support, then we will use
	 *         the window resize event to determine a textual orientation value
	 *         based upon the window's width/height ratio.
	 */
	function setupNonNative()
	{
		get_orientation = orientationByRatio;

		$(document).ready(function() {
			// Force an initial orientation change
			simulateOrientationChange( $.Event('orientationchange') );
		});
	}

	/** @brief If we have native orientation support, then we need to map
	 *         between device-specific orientation values (in degrees) to a
	 *         more easily used textual value (e.g. 'portrait', 'landscape').
	 *
	 *  We toggle between 0 and 90 based upon the reported window.orientation
	 *  angle.
	 *
	 *  The mapping is based upon an initial, baseline measure of the window
	 *  ratio compared to the reported orientation.
	 *
	 *  Note: In the presence of native orientation support, we cannot just
	 *        blindly use a ratio-based orientation measure since, on such
	 *        devices, the 'orientationchange' event is typically fired BEFORE
	 *        the window size is updated.
	 */
	function setupNative()
	{
		/* Used to correlate native orientation values (e.g. 0, 90)
		 * with size ratio derived values (e.g. 'portrait', 'landscape').
		 *
		 * We don't want to hardcode to allow device independence.
		 */
		var orientationMap	  = {
			/*
			0:  'portrait',
			90: 'landscape'
			// */
		};

		/** @brief  Given an angle in degrees, convert the value to radians.
		 *  @param  deg     The angle in degrees.
		 *
		 *  @return The angle in radians.
		 */
		function deg2rad(deg) { return deg * (Math.PI / 180); }

		/** @brief  Given an angle in degrees, round it to the nearest of
		 *          0 or 90.
		 *  @param  deg     The angle in degrees.
		 *
		 *  @return 0 or 90
		 */
		function nearest90(deg)
		{
			return Math.abs(Math.round(Math.sin(deg2rad(deg)))) * 90;
		}

		/** @brief  Given an angle in degrees, return it's opposite - 90 or 0.
		 *  @param  deg     The angle in degrees.
		 *
		 *  @return 90 or 0
		 */
		function opposite90(deg)
		{
			return nearest90( deg + 90 );
		}

		/** @brief  Return a simple orientation string based upon the current
		 *          window orientation value and a baseline ratio measure.
		 *
		 *  As stated above, we cannot just blindly use a ratio-based
		 *  orientation measure since the 'orientationchange' event is
		 *  typically fired BEFORE the window size is updated.
		 *
		 *  To handle this, we use a map to translate between
		 *  window.orientation values, measured in degrees, and a textual
		 *  representaiton of the orientation (e.g. 'portrait', 'landscape')
		 */
		get_orientation = function orientation() {
			var orientation = orientationMap[window.orientation];

			if (orientation !== undefined) {
				// We've already mapped this orientation.
				return orientation;
			}

			/* There is not yet a mapping for the current orientation.
			 *
			 * Is the 90-degree OPPOSITE orientation known?
			 */
			var opposite = opposite90(window.orientation);

			if (orientationMap[opposite] !== undefined) {
				/* We know the 90-degree OPPOSITE, so simply define the new
				 * orientation as the opposite.
				 */
				orientation = (orientationMap[opposite] === 'landscape'
								? 'portrait'
								: 'landscape');
			} else {
				/* We haven't been able to identify the orientation yet, so
				 * fallback to the ratio of the current window.
				 *
				 * Note: For devices with native orientation support, we will
				 *       likely fall to here on the first orientation-related
				 *       event, which we fire below as soon as the DOM is ready
				 *       (guaranteeing that the window sizes will be correct).
				 *       We then use this initial ratio-based value as a
				 *       baseline to identify other orientations.
				 */
				orientation = orientationByRatio();
			}

			orientationMap[window.orientation] = orientation;

			return orientation;
		};

		$(document).ready(function() {
			// Force an initial orientation change
			win.trigger('orientationchange');
		});
	}

}(jQuery));

$.each({
	scrollstop: "scrollstart",
	taphold: "tap",
	swipeleft: "swipe",
	swiperight: "swipe"
}, function( event, sourceEvent ) {
	$.event.special[ event ] = {
		setup: function() {
			$( this ).bind( sourceEvent, $.noop );
		}
	};
});

})( jQuery );
