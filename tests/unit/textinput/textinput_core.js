/*
 * mobile textinput unit tests
 */
( function( $ ) {
module( "jquery.mobile.forms.textinput.js" );

// NOTE this test isn't run because the event data isn't easily accessible
// and with the advent of the widget _on method we are actually testing the
// widget from UI which has it's own test suite for these sorts of things
// ie, don't test your dependencies / framework
if ( $.testHelper.versionTest( $.fn.jquery, function( l, r ) {
			return ( l < r );
		}, "1.8" ) ) {
	test( "input is cleaned up on destroy", function() {
		var input = $( "#destroycorrectly" ),
			win = $( window ),
			loadLen;

		loadLen = win.data( "events" ).load.length;

		input.remove();

		equal( win.data( "events" ).load.length, ( loadLen - 1 ), "window load event was not removed" );
	} );
}

test( "focus/blur adds resp. removes focus class", function() {
	var input = $( "#focus-class-test-for-input" ),
		textarea = $( "#focus-class-test-for-textarea" ),
		testFocusBlur = function( widget ) {
			widget.blur();
			deepEqual( widget.textinput( "widget" ).hasClass( $.mobile.focusClass ), false, widget.attr( "id" ) + ": focus class is absent when the widget is blurred." );
			widget.focus();
			deepEqual( widget.textinput( "widget" ).hasClass( $.mobile.focusClass ), true, widget.attr( "id" ) + ": focus class is present when the widget is focused." );
		};

	testFocusBlur( input );
	testFocusBlur( textarea );
} );

test( "inputs without type specified are enhanced", function() {
	ok( $( "#typeless-input" ).parent().hasClass( "ui-input-text" ) );
} );

$.mobile.page.prototype.options.keepNative = "textarea.should-be-native";

// not testing the positive case here since's it's obviously tested elsewhere
test( "textarea in the keepNative set shouldn't be enhanced", function() {
	ok( !$( "textarea.should-be-native" ).is( "ui-input-text" ) );
} );

asyncTest( "textarea should autogrow on document ready", function() {
	var test = $( "#init-autogrow" );

	setTimeout( function() {
		ok( $( "#reference-autogrow" )[ 0 ].clientHeight < test[ 0 ].clientHeight, "the height is greater than the reference text area with no content" );
		ok( test[ 0 ].clientHeight > 100, "autogrow text area's height is greater than any style padding" );
		start();
	}, 400 );
} );

asyncTest( "textarea should autogrow when text is added via the keyboard", function() {
	var test = $( "#keyup-autogrow" ),
		originalHeight = test[ 0 ].clientHeight;

	test.keyup( function() {
		setTimeout( function() {
			ok( test[ 0 ].clientHeight > originalHeight, "the height is greater than original with no content" );
			ok( test[ 0 ].clientHeight > 100, "autogrow text area's height is greater any style/padding" );
			start();
		}, 400 );
	} );

	test.val( "foo\n\n\n\n\n\n\n\n\n\n\n\n\n\n" ).trigger( "keyup" );
} );

asyncTest( "text area should auto grow when the parent page is loaded via ajax", function() {
	$.testHelper.pageSequence( [
		function() {
			$( "#external" ).click();
		},

		function() {
			setTimeout( function() {
				ok( $.mobile.activePage.find( "textarea" )[ 0 ].clientHeight > 100, "text area's height has grown" );
				window.history.back();
			}, 1000 );
		},

		function() {
			start();
		}
	] );
} );

// NOTE init binding to alter the setting is in settings.js
test( "'clear text' button for search inputs should use configured text", function() {
	strictEqual( $( "#search-input" ).closest( ".ui-input-search" ).find( ".ui-input-clear" ).attr( "title" ), "custom value" );
} );

test( "data-clear-button adds clear button to text inputs", function() {
	ok( $( '#text-input-clear-button' ).next()
		.is( 'a.ui-input-clear[tabindex="-1"][aria-hidden="true"]' ),
		"correctly marked up clear button is present" );
} );

test( "data-clear-button does not add clear button to textarea", function() {
	ok( !$( "#textarea-clear-button" ).next().is( "a.ui-input-clear" ), "data-clear-button does not add clear button to textarea" );
} );

test( "data-clear-button does not add clear button to textarea", function() {
	deepEqual( $( "#textarea-clear-button" ).children( "a" ).length, 0,
		"No anchors have been inserted as children of the data-clear-button textarea element" );
} );

test( "data-clear-button does not add clear button to slider input", function() {
	ok( !$( "#slider-input" ).next().is( "a.ui-input-clear" ),
		"data-clear-button does not add clear button to slider input" );
} );

test( "data-clear-button does not add clear button to slider input", function() {
	deepEqual( $( "#slider-input" ).children( "a" ).length, 0,
		"No anchors have been inserted as children of the data-clear-button input element" );
} );

test( "data-clear-button does not add native clear button to input button (IE10)", function() {
	// Get an input element, initial height, and reserve d for height difference
	var e = $( "input[data-clear-button='true']" ),
		h = e.height(), d;

	e.addClass( "msClear" );
	e.val( "some text" ).focus();
	// Avoid syntax errors
	try {
		document.styleSheets[ 0 ].addRule( ".msClear::-ms-clear", "height: 100px" );
	} catch ( o ) {
		ok( true, "browser does not have the native feature for a test" );
		return true;
	}

	// If the pseudo-element exists, our height should be much larger
	d = e.height() > h;

	ok( !d, "native clear button is still visible" );
} );

test( "clearBtn option works at runtime", function() {
	var input = $( "#test-clear-button-option" );

	deepEqual( input.siblings( "a" ).length, 0,
		"input initially has no clear button" );
	deepEqual( input.parent().hasClass( "ui-input-has-clear" ), false,
		"wrapper does not initially have class 'ui-input-has-clear'" );

	input.textinput( "option", "clearBtn", true );

	deepEqual( input.siblings( "a" ).length, 1,
		"turning on clearBtn option causes an anchor to be added" );
	deepEqual( input.parent().hasClass( "ui-input-has-clear" ), true,
		"turning on clearBtn option causes 'ui-input-has-clear' to be " +
		"added to wrapper" );

	input.textinput( "option", "clearBtn", false );

	deepEqual( input.siblings( "a" ).length, 0,
		"turning off clearBtn removes clear button anchor" );
	deepEqual( input.parent().hasClass( "ui-input-has-clear" ), false,
		"turning off clearBtn removes wrapper class 'ui-input-has-clear'" );
} );

test( "cannot inject script via clearBtnText option", function() {
	deepEqual( !!$.clearBtnTextScriptInjected, false,
		"no script was injected via clearBtnText option" );
} );

test( "textinput is destroyed correctly", function() {
	var originalDOM = $( "#destroy-test-container" ).clone(),
		entry = $( "#destroy-test" );

	entry.textinput().textinput( "destroy" );

	deepEqual( $.testHelper.domEqual( originalDOM, $( "#destroy-test-container" ) ), true,
		"Original DOM is restored after textinput destruction" );
} );

} )( jQuery );
