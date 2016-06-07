define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.asyncTest( "Swipe does not trigger when motion is default-prevented", function( assert ) {
	var target = $( "#qunit" ),
		swipeTriggered = false,
		pointer = $.mobile.support.touch ?
			{ down: "touchstart", move: "touchmove", up: "touchend" } :
			{ down: "mousedown", move: "mousemove", up: "mouseup" };
	var recordSwipe = function() {
			swipeTriggered = true;
	};

	target.one( "swipe", recordSwipe );

	$.testHelper.sequence( [
		function() {
			target.trigger( $.extend( $.Event( pointer.down ), {
				originalEvent: {
					preventDefault: $.noop,
					touches: false
				},
				pageX: 206,
				pageY: 190,
				clientX: 206,
				clientY: 190
			} ) );
		},
		function() {
			target.trigger( ( function( event ) {
					event.preventDefault();
					return event;
				} )( $.extend( $.Event( pointer.move ), {
					originalEvent: {
						preventDefault: $.noop,
						touches: false
					},
					pageX: 206,
					pageY: 190,
					clientX: 206,
					clientY: 190
				} ) ) );
		},
		function() {
			target.trigger( ( function( event ) {
					event.preventDefault();
					return event;
				} )( $.extend( $.Event( pointer.move ), {
				originalEvent: {
					preventDefault: $.noop,
					touches: false
				},
				pageX: 170,
				pageY: 190,
				clientX: 170,
				clientY: 190
			} ) ) );
		},
		function() {
			target.trigger( ( function( event ) {
					event.preventDefault();
					return event;
				} )( $.extend( $.Event( pointer.up ), {
				originalEvent: {
					preventDefault: $.noop,
					touches: false
				},
				pageX: 170,
				pageY: 190,
				clientX: 170,
				clientY: 190
			} ) ) );
		},
		function() {
			assert.deepEqual( swipeTriggered, false, "Swipe was not triggered" );
			target.off( "swipe", recordSwipe );
			QUnit.start();
		}
	], 100 );
} );

} );
