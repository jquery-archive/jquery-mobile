/*
 * Mobile flipswitch unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

var testFocusTransfer = function( assert, element ) {
	assert.expect( 1 );
	var ready = assert.async();

	$.testHelper.detailedEventCascade( [
		function() {
			element.focus();
		},
		{
			focus: {
				src: element.siblings( "span" ),
				event: "focus.TransfersFocus1"
			}
		},
		function( result ) {
			assert.deepEqual( result.focus.timedOut, false,
				"'on' button received focus event" );
			ready();
		}
	] );
};

QUnit.test( "select based flipswitch transfers focus to 'on' button",
	function( assert ) {
		testFocusTransfer( assert, $( "#flip-select" ) );
	} );

QUnit.test( "checkbox based flipswitch transfers focus to 'on' button",
	function( assert ) {
		testFocusTransfer( assert, $( "#flip-checkbox" ) );
	} );

QUnit.test( "Default is prevented on label click, but click is sent to element", function( assert ) {
	var ready = assert.async();
	var eventNs = ".preventDefaultAndPropagateClick",
		label = $( "label[for='test-select-label']" ),
		select = $( "#test-select-label" );

	$.testHelper.detailedEventCascade( [
		function() {
			var event = $.Event( "click" );

			label.trigger( event );
			assert.deepEqual( event.isDefaultPrevented(), true, "Click-on-label default prevented" );
		},
		{
			click: { src: select, event: "click" + eventNs + "1" }
		},
		function( result ) {
			assert.deepEqual( result.click.timedOut, false, "Select received a click" );
			ready();
		}
	] );
} );
} );
