/*
 * Mobile textinput unit tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "jquery.mobile.forms.textinput.js" );

// NOTE this test isn't run because the event data isn't easily accessible
// and with the advent of the widget _on method we are actually testing the
// widget from UI which has it's own test suite for these sorts of things
// ie, don't test your dependencies / framework
if ( $.testHelper.versionTest( $.fn.jquery, function( l, r ) {
			return ( l < r );
		}, "1.8" ) ) {
	QUnit.test( "input is cleaned up on destroy", function( assert ) {
		var input = $( "#destroycorrectly" ),
			win = $( window ),
			loadLen;

		loadLen = win.data( "events" ).load.length;

		input.remove();

		assert.equal( win.data( "events" ).load.length, ( loadLen - 1 ),
			"window load event was not removed" );
	} );
}

QUnit.test( "focus/blur adds resp. removes focus class", function( assert ) {
	var input = $( "#focus-class-test-for-input" ),
		textarea = $( "#focus-class-test-for-textarea" ),
		testFocusBlur = function( widget ) {
			widget.blur();
			assert.lacksClasses( widget.textinput( "widget" )[ 0 ], "ui-focus",
				widget.attr( "id" ) + ": focus class is absent when the widget is blurred." );
			widget.focus();
			assert.hasClasses( widget.textinput( "widget" )[ 0 ], "ui-focus",
				widget.attr( "id" ) + ": focus class is present when the widget is focused." );
		};

	testFocusBlur( input );
	testFocusBlur( textarea );
} );

QUnit.test( "inputs without type specified are enhanced", function( assert ) {
	assert.hasClasses( $( "#typeless-input" ).parent()[ 0 ], "ui-textinput-text",
		"Input is enhanced" );
} );

// Not testing the positive case here since's it's obviously tested elsewhere
QUnit.test( "textarea in the keepNative set shouldn't be enhanced", function( assert ) {
	assert.lacksClasses( $( "textarea.should-be-native" )[ 0 ], "ui-textinput-text",
		"Class ui-textinput-text not present" );
} );

QUnit.asyncTest( "textarea should autogrow on document ready", function( assert ) {
	var test = $( "#init-autogrow" );

	setTimeout( function() {
		assert.ok( $( "#reference-autogrow" )[ 0 ].clientHeight < test[ 0 ].clientHeight,
			"the height is greater than the reference text area with no content" );
		assert.ok( test[ 0 ].clientHeight > 100,
			"autogrow text area's height is greater than any style padding" );
		QUnit.start();
	}, 400 );
} );

QUnit.asyncTest( "textarea should autogrow when text is added via the keyboard",
	function( assert ) {
	var test = $( "#keyup-autogrow" ),
		originalHeight = test[ 0 ].clientHeight;

	test.keyup( function() {
		setTimeout( function() {
			assert.ok( test[ 0 ].clientHeight > originalHeight,
				"the height is greater than original with no content" );
			assert.ok( test[ 0 ].clientHeight > 100,
				"autogrow text area's height is greater any style/padding" );
			QUnit.start();
		}, 400 );
	} );

	test.val( "foo\n\n\n\n\n\n\n\n\n\n\n\n\n\n" ).trigger( "keyup" );
} );

QUnit.asyncTest( "text area should auto grow when the parent page is loaded via ajax",
	function( assert ) {
	$.testHelper.pageSequence( [
		function() {
			$( "#external" ).click();
		},

		function() {
			setTimeout( function() {
				assert.ok( $.mobile.activePage.find( "textarea" )[ 0 ].clientHeight > 100,
					"text area's height has grown" );
				window.history.back();
			}, 1000 );
		},

		function() {
			QUnit.start();
		}
	] );
} );

// NOTE init binding to alter the setting is in settings.js
QUnit.test( "'clear text' button for search inputs should use configured text",
	function( assert ) {
	assert.strictEqual( $( "#search-input" )
		.closest( ".ui-textinput-search" )
			.find( ".ui-textinput-clear-button" )
				.attr( "title" ), "custom value" );
} );

QUnit.test( "data-clear-btn adds clear button to text inputs", function( assert ) {
	assert.ok( $( "#text-input-clear-btn" ).next()
		.is( "a[tabindex='-1'][aria-hidden='true']" ),
		"correctly marked up clear button is present" );
	assert.hasClasses( $( "#text-input-clear-btn" ).next()[ 0 ],
		"ui-textinput-clear-button", "clear button has class ui-textinput-clear-button" );
} );

QUnit.test( "data-clear-btn does not add clear button to textarea", function( assert ) {
	assert.lacksClasses( $( "#textarea-clear-btn" ).next()[ 0 ],
		"ui-textinput-clear-button",
		"data-clear-btn does not add clear button to textarea" );
} );

QUnit.test( "data-clear-btn does not add clear button to textarea", function( assert ) {
	assert.deepEqual( $( "#textarea-clear-btn" ).children( "a" ).length, 0,
		"No anchors have been inserted as children of the data-clear-btn textarea element" );
} );

QUnit.test( "data-clear-btn does not add clear button to slider input", function( assert ) {
	assert.lacksClasses( $( "#slider-input" ).next(), "ui-textinput-clear-button",
		"data-clear-btn does not add clear button to slider input" );
} );

QUnit.test( "data-clear-btn does not add clear button to slider input", function( assert ) {
	assert.deepEqual( $( "#slider-input" ).children( "a" ).length, 0,
		"No anchors have been inserted as children of the data-clear-btn input element" );
} );

QUnit.test( "data-clear-btn does not add native clear button to input button (IE10)",
	function( assert ) {

	// Get an input element, initial height, and reserve d for height difference
	var e = $( "input[data-clear-btn='true']" ),
		h = e.height(), d;

	e.addClass( "msClear" );
	e.val( "some text" ).focus();

	// Avoid syntax errors
	try {
		document.styleSheets[ 0 ].addRule( ".msClear::-ms-clear", "height: 100px" );
	} catch ( o ) {
		assert.ok( true, "browser does not have the native feature for a test" );
		return true;
	}

	// If the pseudo-element exists, our height should be much larger
	d = e.height() > h;

	assert.ok( !d, "native clear button is still visible" );
} );

QUnit.test( "clearBtn option works at runtime", function( assert ) {
	var input = $( "#test-clear-btn-option" );

	assert.deepEqual( input.siblings( "a" ).length, 0,
		"input initially has no clear button" );
	assert.lacksClasses( input.parent()[ 0 ], "ui-textinput-has-clear-button",
		"wrapper does not initially have class 'ui-textinput-has-clear-button'" );

	input.textinput( "option", "clearBtn", true );

	assert.deepEqual( input.siblings( "a" ).length, 1,
		"turning on clearBtn option causes an anchor to be added" );
	assert.hasClasses( input.parent()[ 0 ], "ui-textinput-has-clear-button",
		"turning on clearBtn option causes 'ui-textinput-has-clear-button' to be " +
		"added to wrapper" );

	input.textinput( "option", "clearBtn", false );

	assert.deepEqual( input.siblings( "a" ).length, 0,
		"turning off clearBtn removes clear button anchor" );
	assert.lacksClasses( input.parent()[ 0 ], "ui-textinput-has-clear-button",
		"turning off clearBtn removes wrapper class 'ui-textinput-has-clear-button'" );
} );

QUnit.test( "cannot inject script via clearBtnText option", function( assert ) {
	assert.deepEqual( !!$.clearBtnTextScriptInjected, false,
		"no script was injected via clearBtnText option" );
} );

QUnit.test( "textinput is destroyed correctly", function( assert ) {
	var originalDOM = $( "#destroy-test-container" ).clone(),
		entry = $( "#destroy-test" );

	entry.textinput().textinput( "destroy" );

	assert.deepEqual( $.testHelper.domEqual( originalDOM, $( "#destroy-test-container" ) ), true,
		"Original DOM is restored after textinput destruction" );
} );

QUnit.test( "textinput is disabled/enabled correctly", function( assert ) {
	var textinput = $( "#disable-test" );

	assert.lacksClasses( textinput.parent()[ 0 ], "ui-state-disabled",
		"Initially the ui-state-disabled class is absent" );
	assert.deepEqual( textinput.prop( "disabled" ), false,
		"Initially the 'disabled' prop is false" );

	textinput.textinput( "option", "disabled", true );

	assert.hasClasses( textinput.parent()[ 0 ], "ui-state-disabled",
		"After disabling, the ui-state-disabled class is present" );
	assert.deepEqual( textinput.prop( "disabled" ), true,
		"After disabling, the 'disabled' prop is true" );
} );

QUnit.test( "textinput is disabled correctly by default", function( assert ) {
	var textinput = $( "#disable-test-default" );

	assert.hasClasses( textinput.parent()[ 0 ], "ui-state-disabled",
		"After disabling, the ui-state-disabled class is present" );
	assert.deepEqual( textinput.prop( "disabled" ), true,
		"After disabling, the 'disabled' prop is true" );
} );

} );
