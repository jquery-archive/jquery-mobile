/*
 * Mobile slider unit tests
 */

define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
var onChangeCnt = 0;
window.onChangeCounter = function() {
	onChangeCnt++;
};

QUnit.module( "jquery.mobile.slider.js events", {
	setup: function() {

		// Force the value to be an increment of 10 when we aren't testing the rounding
		$( "#stepped" ).val( 20 );
	}
} );

var createEvent = function( name, target, x, y, key ) {
	var event = $.Event( name );
	event.target = target;
	event.pageX = x;
	event.pageY = y;
	event.keyCode = key;
	return event;
};

var keypressTest = function( assert, opts ) {
	var slider = $( opts.selector ),
		val = window.parseFloat( slider.val() ),
		handle = slider.siblings( ".ui-slider-track" ).find( ".ui-slider-handle" );

	assert.expect( opts.keyCodes.length );

	$.each( opts.keyCodes, function( i, elem ) {

		// Stub the keycode value and trigger the keypress
		handle.trigger( createEvent( "keydown", handle, 0, 0, elem ) );

		assert.deepEqual( val, window.parseFloat( slider.val(), 10 ),
			"new value is " + opts.increment + " different" );
	} );
};

QUnit.test( "slider should move right with up, right, and page up keypress", function( assert ) {
	keypressTest( assert, {
		selector: "#range-slider-up",
		keyCodes: [ "UP", "RIGHT", "PAGE_UP" ],
		increment: 1
	} );
} );

QUnit.test( "slider should move left with down, left, and page down keypress", function( assert ) {
	keypressTest( assert, {
		selector: "#range-slider-down",
		keyCodes: [ "DOWN", "LEFT", "PAGE_DOWN" ],
		increment: -1
	} );
} );

QUnit.test( "slider should move to range minimum on end keypress", function( assert ) {
	var selector = "#range-slider-end",
		initialVal = window.parseFloat( $( selector ).val(), 10 ),
		max = window.parseFloat( $( selector ).attr( "max" ), 10 );

	keypressTest( assert, {
		selector: selector,
		keyCodes: [ "END" ],
		increment: max - initialVal
	} );
} );

QUnit.test( "slider should move to range minimum on end keypress", function( assert ) {
	var selector = "#range-slider-home",
		initialVal = window.parseFloat( $( selector ).val(), 10 );

	keypressTest( assert, {
		selector: selector,
		keyCodes: [ "HOME" ],
		increment: 0 - initialVal
	} );
} );

QUnit.test( "slider should move positive by steps on keypress", function( assert ) {
	keypressTest( assert, {
		selector: "#stepped",
		keyCodes: [ "RIGHT" ],
		increment: 10
	} );
} );

QUnit.test( "slider should move negative by steps on keypress", function( assert ) {
	keypressTest( assert, {
		selector: "#stepped",
		keyCodes: [ "LEFT" ],
		increment: -10
	} );
} );

QUnit.test( "slider should validate input value on blur", function( assert ) {
	var slider = $( "#range-slider-up" );
	slider.focus();
	slider.val( 200 );
	assert.deepEqual( slider.val(), "200" );
	slider.blur();
	assert.deepEqual( slider.val(), slider.attr( "max" ) );
} );

QUnit.test( "slider should not validate input on keyup", function( assert ) {
	var slider = $( "#range-slider-up" );
	slider.focus();
	slider.val( 200 );
	assert.deepEqual( slider.val(), "200" );
	slider.keyup();
	assert.deepEqual( slider.val(), "200" );
} );

QUnit.test( "input type should degrade to number when slider is created", function( assert ) {
	assert.deepEqual( $( "#range-slider-up" ).attr( "type" ), "number" );
} );

QUnit.test( "onchange should not be called on create", function( assert ) {
	assert.equal( onChangeCnt, 0, "onChange should not have been called" );
} );

QUnit.test( "onchange should be called onchange", function( assert ) {
	onChangeCnt = 0;
	$( "#onchange" ).slider( "refresh", 50 );
	assert.equal( onChangeCnt, 1, "onChange should have been called once" );
} );

QUnit.test( "slider controls will create when inside a container that receives a 'create' event",
	function( assert ) {
		assert.ok(
			!$( "#enhancetest" ).appendTo( ".ui-page-active" ).find( ".ui-slider-track" ).length,
			"did not have enhancements applied" );
		assert.ok( $( "#enhancetest" ).enhance().find( ".ui-slider-track" ).length,
			"enhancements applied" );
} );

QUnit.asyncTest( "drag should start only when clicked with left button", function( assert ) {
	assert.expect( 5 );

	var control = $( "#mousedown-which-events" ),
		widget = control.data( "mobile-slider" ),
		slider = widget.slider,
		handle = widget.handle,
		eventNs = ".dragShouldStartOnlyWhenClickedWithLeftButton",
		event;

	$.testHelper.detailedEventCascade( [
		function() {
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = 0;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "0" }
		},
		function( result ) {
			assert.deepEqual( result.slidestart.timedOut, false,
				"slider did emit 'slidestart' event upon 0 button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = 1;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "1" }
		},
		function( result ) {
			assert.deepEqual( result.slidestart.timedOut, false,
				"slider did emit 'slidestart' event upon left button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = undefined;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "1" }
		},
		function( result ) {
			assert.deepEqual( result.slidestart.timedOut, false,
				"slider did emit 'slidestart' event upon undefined button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = 2;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "2" }
		},
		function( result ) {
			assert.deepEqual( result.slidestart.timedOut, true,
				"slider did not emit 'slidestart' event upon middle button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = 3;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "3" }
		},
		function( result ) {
			assert.deepEqual( result.slidestart.timedOut, true,
				"slider did not emit 'slidestart' event upon right button press" );
			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "moving the slider triggers 'slidestart' and 'slidestop' events",
	function( assert ) {
		var control = $( "#start-stop-events" ),
			widget = control.data( "mobile-slider" ),
			slider = widget.slider;

		$.testHelper.eventCascade( [
			function() {

				// Trigger the slider grab event
				slider.trigger( "mousedown" );
			},

			"slidestart", function( timeout ) {
				assert.ok( !timeout, "slidestart fired" );
				slider.trigger( "mouseup" );
			},

			"slidestop", function( timeout ) {
				assert.ok( !timeout, "slidestop fired" );
				QUnit.start();
			}
		], 500 );
} );

QUnit.test( "mouse move only triggers the change event when the value changes", function( assert ) {
	var control = $( "#slider-change-event" ),
		widget = control.data( "mobile-slider" ),
		slider = widget.slider,
		handle = widget.handle,
		changeCount = 0,
		actualChanges = 0,
		currentValue = control.val(),
		changeFunc = function() {
			++changeCount;
			if ( control.val() !== currentValue ) {
				++actualChanges;
			}
		},
		offset = handle.offset();

	control.bind( "change", changeFunc );

	slider.trigger( createEvent( "mousedown", handle[ 0 ], offset.left + 10, offset.top + 10 ) );
	slider.trigger( createEvent( "mouseup", handle[ 0 ], offset.left + 10, offset.top + 10 ) );

	control.unbind( "change", changeFunc );

	assert.strictEqual( actualChanges, changeCount, "change events match actual changes in value" );
} );

// NOTE this test isn't run because the event data isn't easily accessible
// and with the advent of the widget _on method we are actually testing the
// widget from UI which has it's own test suite for these sorts of things
// ie, don't test your dependencies / framework
if ( $.testHelper.versionTest( $.fn.jquery, function( l, r ) {
			return ( l < r );
		}, "1.8" ) ) {
	QUnit.test( "slider should detach event", function( assert ) {
		var slider = $( "#remove-events-slider" ),
			doc = $( document ),
			vmouseupLength,
			vmousemoveLength;

		function getDocumentEventsLength( name ) {
			return ( doc.data( "events" )[ name ] || [] ).length;
		}

		vmouseupLength = getDocumentEventsLength( "vmouseup" );
		vmousemoveLength = getDocumentEventsLength( "vmousemove" );

		slider.remove();

		assert.equal( getDocumentEventsLength( "vmouseup" ), ( vmouseupLength - 1 ),
			"vmouseup event was removed" );
		assert.equal( getDocumentEventsLength( "vmousemove" ), ( vmousemoveLength - 1 ),
			"vmousemove event was removed" );
	} );
}
} );
