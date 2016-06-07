define( [ "qunit", "jquery" ], function( QUnit, $ ) {

$( "html" ).height( screen.height * 3 );

function scrollDown() {
	window.scrollTo( 0, screen.height );
}

function scrollUp() {
	window.scrollTo( 0, 0 );
}

QUnit.test( "Popup repositions when it receives a resize and it's offscreen", function( assert ) {
	var ready = assert.async();
	var eventNs = ".popupRepositionsUponResize";
	var popup = $( "#test-popup" );

	$.testHelper.detailedEventCascade( [
		function() {
			popup.popup( "open", { x: 0, y: 0 } );
		},
		{
			popupafteropen: { src: popup, event: "popupafteropen" + eventNs + "1" },

			// Wait for the ignore resize timeout to expire
			timeout: { length: 3000 }
		},
		function( result ) {
			assert.deepEqual( result.popupafteropen.timedOut, false, "Popup did open" );
			scrollDown();
			$( window ).trigger( "resize" );
		},
		{
			popupbeforeposition: { src: popup, event: "popupbeforeposition" + eventNs + "2" }
		},
		function( result ) {
			assert.deepEqual( result.popupbeforeposition.timedOut, false, "Popup did reposition" );
			popup.popup( "close" );
		},
		{
			popupafterclose: { src: popup, event: "popupafterclose" + eventNs + "3" }
		},
		function() {
			scrollUp();
			ready();
		}
	] );
} );

QUnit.test( "Popup does not react when it receives a resize and it's onscreen", function( assert ) {
	var ready = assert.async();
	var eventNs = ".popupRepositionsUponResize";
	var popup = $( "#test-popup" );

	$.testHelper.detailedEventCascade( [
		function() {
			scrollDown();
			popup.popup( "open", { x: 0, y: 0 } );
		},
		{
			popupafteropen: { src: popup, event: "popupafteropen" + eventNs + "1" },

			// Wait for the ignore resize timeout to expire
			timeout: { length: 3000 }
		},
		function( result ) {
			assert.deepEqual( result.popupafteropen.timedOut, false, "Popup did open" );
			$( window ).trigger( "resize" );
		},
		{
			popupbeforeposition: { src: popup, event: "popupbeforeposition" + eventNs + "2" }
		},
		function( result ) {
			assert.deepEqual( result.popupbeforeposition.timedOut, true, "Popup did not reposition" );
			popup.popup( "close" );
		},
		{
			popupafterclose: { src: popup, event: "popupafterclose" + eventNs + "3" }
		},
		function() {
			scrollUp();
			ready();
		}
	] );
} );

} );
