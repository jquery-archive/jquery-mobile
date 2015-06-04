/*
 * mobile slider unit tests
 */

( function( $ ) {
var onChangeCnt = 0;
window.onChangeCounter = function() {
	onChangeCnt++;
};

module( 'jquery.mobile.slider.js events', {
	setup: function() {
		// force the value to be an increment of 10 when we aren't testing the rounding
		$( "#stepped" ).val( 20 );
	}
} );

var keypressTest = function( opts ) {
	var slider = $( opts.selector ),
		val = window.parseFloat( slider.val() ),
		handle = slider.siblings( '.ui-slider-track' ).find( '.ui-slider-handle' );

	expect( opts.keyCodes.length );

	$.each( opts.keyCodes, function( i, elem ) {

		// stub the keycode value and trigger the keypress
		$.Event.prototype.keyCode = $.mobile.keyCode[ elem ];
		handle.trigger( 'keydown' );

		val += opts.increment;
		deepEqual( val, window.parseFloat( slider.val(), 10 ), "new value is " + opts.increment + " different" );
	} );
};

test( "slider should move right with up, right, and page up keypress", function() {
	keypressTest( {
		selector: '#range-slider-up',
		keyCodes: [ 'UP', 'RIGHT', 'PAGE_UP' ],
		increment: 1
	} );
} );

test( "slider should move left with down, left, and page down keypress", function() {
	keypressTest( {
		selector: '#range-slider-down',
		keyCodes: [ 'DOWN', 'LEFT', 'PAGE_DOWN' ],
		increment: -1
	} );
} );

test( "slider should move to range minimum on end keypress", function() {
	var selector = "#range-slider-end",
		initialVal = window.parseFloat( $( selector ).val(), 10 ),
		max = window.parseFloat( $( selector ).attr( 'max' ), 10 );

	keypressTest( {
		selector: selector,
		keyCodes: [ 'END' ],
		increment: max - initialVal
	} );
} );

test( "slider should move to range minimum on end keypress", function() {
	var selector = "#range-slider-home",
		initialVal = window.parseFloat( $( selector ).val(), 10 );

	keypressTest( {
		selector: selector,
		keyCodes: [ 'HOME' ],
		increment: 0 - initialVal
	} );
} );

test( "slider should move positive by steps on keypress", function() {
	keypressTest( {
		selector: "#stepped",
		keyCodes: [ 'RIGHT' ],
		increment: 10
	} );
} );

test( "slider should move negative by steps on keypress", function() {
	keypressTest( {
		selector: "#stepped",
		keyCodes: [ 'LEFT' ],
		increment: -10
	} );
} );

test( "slider should validate input value on blur", function() {
	var slider = $( "#range-slider-up" );
	slider.focus();
	slider.val( 200 );
	deepEqual( slider.val(), "200" );
	slider.blur();
	deepEqual( slider.val(), slider.attr( 'max' ) );
} );

test( "slider should not validate input on keyup", function() {
	var slider = $( "#range-slider-up" );
	slider.focus();
	slider.val( 200 );
	deepEqual( slider.val(), "200" );
	slider.keyup();
	deepEqual( slider.val(), "200" );
} );

test( "input type should degrade to number when slider is created", function() {
	deepEqual( $( "#range-slider-up" ).attr( "type" ), "number" );
} );

test( "onchange should not be called on create", function() {
	equal( onChangeCnt, 0, "onChange should not have been called" );
} );

test( "onchange should be called onchange", function() {
	onChangeCnt = 0;
	$( "#onchange" ).slider( "refresh", 50 );
	equal( onChangeCnt, 1, "onChange should have been called once" );
} );

test( "slider controls will create when inside a container that receives a 'create' event", function() {
	ok( !$( "#enhancetest" ).appendTo( ".ui-page-active" ).find( ".ui-slider-track" ).length, "did not have enhancements applied" );
	ok( $( "#enhancetest" ).enhance().find( ".ui-slider-track" ).length, "enhancements applied" );
} );

var createEvent = function( name, target, x, y ) {
	var event = $.Event( name );
	event.target = target;
	event.pageX = x;
	event.pageY = y;
	return event;
};

var assertLeftCSS = function( obj, opts ) {
	var integerLeft, compare, css, threshold;

	css = obj.css( 'left' );
	threshold = opts.pxThreshold || 0;

	if ( css.indexOf( "px" ) > -1 ) {
		// parse the actual pixel value returned by the left css value
		// and the pixels passed in for comparison
		integerLeft = Math.round( parseFloat( css.replace( "px", "" ) ) ),
		compare = parseInt( opts.pixels.replace( "px", "" ), 10 );

		// check that the pixel value provided is within a given threshold; default is 0px
		ok( compare >= integerLeft - threshold && compare <= integerLeft + threshold, opts.message );
	} else {
		equal( css, opts.percent, opts.message );
	}
};

asyncTest( "drag should start only when clicked with left button", function() {
	expect( 5 );

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
			deepEqual( result.slidestart.timedOut, false, "slider did emit 'slidestart' event upon 0 button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = 1;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "1" }
		},
		function( result ) {
			deepEqual( result.slidestart.timedOut, false, "slider did emit 'slidestart' event upon left button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = undefined;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "1" }
		},
		function( result ) {
			deepEqual( result.slidestart.timedOut, false, "slider did emit 'slidestart' event upon undefined button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = 2;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "2" }
		},
		function( result ) {
			deepEqual( result.slidestart.timedOut, true, "slider did not emit 'slidestart' event upon middle button press" );
			event = $.Event( "mousedown", { target: handle[ 0 ] } );
			event.which = 3;
			slider.trigger( event );
		},
		{
			slidestart: { src: control, event: "slidestart" + eventNs + "3" }
		},
		function( result ) {
			deepEqual( result.slidestart.timedOut, true, "slider did not emit 'slidestart' event upon right button press" );
			start();
		}
	] );
} );

asyncTest( "moving the slider triggers 'slidestart' and 'slidestop' events", function() {
	var control = $( "#start-stop-events" ),
		widget = control.data( "mobile-slider" ),
		slider = widget.slider;

	$.testHelper.eventCascade( [
		function() {
			// trigger the slider grab event
			slider.trigger( "mousedown" );
		},

		"slidestart", function( timeout ) {
			ok( !timeout, "slidestart fired" );
			slider.trigger( "mouseup" );
		},

		"slidestop", function( timeout ) {
			ok( !timeout, "slidestop fired" );
			start();
		}
	], 500 );
} );

test( "mouse move only triggers the change event when the value changes", function() {
	var control = $( "#slider-change-event" ),
		widget = control.data( "mobile-slider" ),
		slider = widget.slider,
		handle = widget.handle,
		changeCount = 0,
		actualChanges = 0,
		changeFunc = function( e ) {
			++changeCount;
			if ( control.val() !== currentValue ) {
				++actualChanges;
			}
		},
		offset = handle.offset(),
		currentValue = control.val();

	control.bind( "change", changeFunc );

	slider.trigger( createEvent( "mousedown", handle[ 0 ], offset.left + 10, offset.top + 10 ) );
	slider.trigger( createEvent( "mouseup", handle[ 0 ], offset.left + 10, offset.top + 10 ) );

	control.unbind( "change", changeFunc );

	strictEqual( actualChanges, changeCount, "change events match actual changes in value" );
} );

// NOTE this test isn't run because the event data isn't easily accessible
// and with the advent of the widget _on method we are actually testing the
// widget from UI which has it's own test suite for these sorts of things
// ie, don't test your dependencies / framework
if ( $.testHelper.versionTest( $.fn.jquery, function( l, r ) {
			return ( l < r );
		}, "1.8" ) ) {
	test( "slider should detach event", function() {
		var slider = $( "#remove-events-slider" ),
			doc = $( document ),
			vmouseupLength,
			vmousemoveLength;

		function getDocumentEventsLength( name ) {
			return ( doc.data( 'events' )[ name ] || [] ).length;
		}

		vmouseupLength = getDocumentEventsLength( "vmouseup" );
		vmousemoveLength = getDocumentEventsLength( "vmousemove" );

		slider.remove();

		equal( getDocumentEventsLength( "vmouseup" ), ( vmouseupLength - 1 ), 'vmouseup event was removed' );
		equal( getDocumentEventsLength( "vmousemove" ), ( vmousemoveLength - 1 ), 'vmousemove event was removed' );
	} );
}
} )( jQuery );
