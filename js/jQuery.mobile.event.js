// add new event shortcuts
$.each( "touchstart touchmove touchend orientationchange tap taphold swipe swipeleft swiperight scrollstart scrollstop".split( " " ), function( i, name ) {
	$.fn[ name ] = function( fn ) {
		return fn ? this.bind( name, fn ) : this.trigger( name );
	};
	$.attrFn[ name ] = true;
});

var supportTouch = $.support.touch,
	scrollEvent = supportTouch ? "touchmove" : "scroll",
	touchStartEvent = supportTouch ? "touchstart" : "mousedown",
	touchStopEvent = supportTouch ? "touchend" : "mouseup",
	touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

// also handles scrollstop
$.event.special.scrollstart = {
	enabled: true,
	
	setup: function() {
		var thisObject = this,
			$this = $( thisObject ),
			timer;
		
		function trigger( event, scrolling ) {
			$this.data( "ui-scrolling", scrolling );
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
			
			if ( !$this.data( "ui-scrolling" ) ) {
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
			$this = $( thisObject ),
			originalType,
			touching,
			held,
			moved,
			timer;
		
		$this
			.bind( touchStartEvent, function( event ) {
				held = false;
				moved = false;
				touching = true;
				
				timer = setTimeout(function() {
					if ( touching && !moved ) {
						held = true;
						originalType = event.type;
						event.type = "taphold";
						$.event.handle.call( thisObject, event );
						event.type = originalType;
					}
				}, 300 );
				
			})
			.bind( touchMoveEvent, function() {
				moved = true;
			})
			.bind( touchStopEvent, function( event ) {
				clearTimeout( timer );
				touching = false;
				
				if ( !held && !moved ) {
					originalType = event.type;
					event.type = "tap";
					$.event.handle.call( thisObject, event );
					event.type = originalType;
				}
			});
	}
};

// also handles swipeleft, swiperight
$.event.special.swipe = {
	setup: function() {
		var thisObject = this,
			$this = $( thisObject ),
			start,
			stop;
		
		$this
			.bind( touchStartEvent, function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] :
						event;
				start = {
					time: (new Date).getTime(),
					coords: [ data.pageX, data.pageY ],
					origin: $( event.target )
				};
			})
			.bind( touchMoveEvent, function( event ) {
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
			})
			.bind( touchStopEvent, function( event ) {
				if ( start && stop ) {
					if ( stop.time - start.time < 1000 && 
							Math.abs( start.coords[0] - stop.coords[0]) > 180 &&
							Math.abs( start.coords[1] - stop.coords[1]) < 80 ) {
						start.origin
							.trigger( "swipe" )
							.trigger( start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight" );
					}
				}
				start = stop = undefined;
			});
	}
};
