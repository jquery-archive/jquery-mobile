/*
 * mobile flipswitch unit tests
 */
( function( $ ) {

var testFocusTransfer = function( element ) {
	expect( 1 );
	$.testHelper.detailedEventCascade( [
		function() {
			element.focus();
		},
		{
			focus: {
				src: element.siblings( "a" ),
				event: "focus.TransfersFocus1"
			}
		},
		function( result ) {
			deepEqual( result.focus.timedOut, false,
				"'on' button received focus event" );
			start();
		}
	] );
};

asyncTest( "select based flipswitch transfers focus to 'on' button",
	function() {
		testFocusTransfer( $( "#flip-select" ) );
	} );

asyncTest( "checkbox based flipswitch transfers focus to 'on' button",
	function() {
		testFocusTransfer( $( "#flip-checkbox" ) );
	} );

asyncTest( "Default is prevented on label click, but click is sent to element", function() {
	var eventNs = ".preventDefaultAndPropagateClick",
		label = $( "label[for='test-select-label']" ),
		select = $( "#test-select-label" );

	$.testHelper.detailedEventCascade( [
		function() {
			var event = $.Event( "click" );

			label.trigger( event );
			deepEqual( event.isDefaultPrevented(), true, "Click-on-label default prevented" );
		},
		{
			click: { src: select, event: "click" + eventNs + "1" }
		},
		function( result ) {
			deepEqual( result.click.timedOut, false, "Select received a click" );
			start();
		}
	] );
} );
} )( jQuery );
