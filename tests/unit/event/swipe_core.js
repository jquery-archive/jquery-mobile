asyncTest( "Swipe does not trigger when motion is default-prevented", function() {
	var target = $( "#qunit" ),
		swipeTriggered = false,
		pointer = $.mobile.support.touch ?
			{ down: "touchstart", move: "touchmove", up: "touchend" } :
			{ down: "mousedown", move: "mousemove", up: "mouseup" };
		recordSwipe = function() {
			swipeTriggered = true;
		};

	target.one( "swipe", recordSwipe );

	$.testHelper.sequence([
		function() {
			target.trigger( $.extend( $.Event( pointer.down ), {
				originalEvent: {
					touches: false
				},
				pageX: 206,
				pageY: 190,
				clientX: 206,
				clientY: 190
			}));
		},
		function() {
			target.trigger( ( function( event ) {
					event.preventDefault();
					return event;
				} )( $.extend( $.Event( pointer.move ), {
					originalEvent: {
						touches: false
					},
					pageX: 206,
					pageY: 190,
					clientX: 206,
					clientY: 190
				})));
		},
		function() {
			target.trigger( ( function( event ) {
					event.preventDefault();
					return event;
				} )( $.extend( $.Event( pointer.move ), {
				originalEvent: {
					touches: false
				},
				pageX: 170,
				pageY: 190,
				clientX: 170,
				clientY: 190
			})));
		},
		function() {
			target.trigger( ( function( event ) {
					event.preventDefault();
					return event;
				} )( $.extend( $.Event( pointer.up ), {
				originalEvent: {
					touches: false
				},
				pageX: 170,
				pageY: 190,
				clientX: 170,
				clientY: 190
			})));
		},
		function() {
			deepEqual( swipeTriggered, false, "Swipe was not triggered" );
			target.off( "swipe", recordSwipe );
			start();
		}
	], 100 );
});
