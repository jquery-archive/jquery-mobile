( function( QUnit, $ ) {

var libName = "jquery.mobile.events.js",
	components = [ "events/touch.js", "events/throttledresize.js", "events/scroll.js",
		"events/orientationchange.js" ],
	absFn = Math.abs,
	originalEventFn = $.Event.prototype.originalEvent,
	preventDefaultFn = $.Event.prototype.preventDefault,
	events = ( "touchstart touchmove touchend tap taphold " +
	"swipe swipeleft swiperight scrollstart scrollstop orientationchange" ).split( " " );

QUnit.module( libName, {
	setup: function() {

		// Ensure bindings are removed
		$.each( events.concat( "vmouseup vmousedown".split( " " ) ), function() {
			$( "#qunit-fixture" ).unbind();
		} );

		// Make sure the event objects respond to touches to simulate
		// the collections existence in non touch enabled test browsers
		$.Event.prototype.touches = [ { pageX: 1, pageY: 1 } ];

		$( "body" ).unbind( "throttledresize" );
	},
	teardown: function() {

		// NOTE unmock
		Math.abs = absFn;
		$.Event.prototype.originalEvent = originalEventFn;
		$.Event.prototype.preventDefault = preventDefaultFn;
	}
} );

$.testHelper.excludeFileProtocol( function() {
	QUnit.test( "new events defined on the jquery object", function( assert ) {
		$.each( events, function( i, name ) {
			delete $.fn[ name ];
			assert.deepEqual( $.fn[ name ], undefined, "After deleting it, $.fn[ '" + name + "' ] is indeed undefined" );
		} );

		$.each( components, function( index, value ) {
			$.testHelper.reloadModule( value );
		} );

		$.each( events, function( i, name ) {
			assert.ok( $.fn[ name ] !== undefined, name + " should NOT be undefined" );
		} );
	} );
} );

} )( window.QUnit, window.jQuery );
