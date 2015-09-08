/*
 * Mobile popup unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.test( "Form resets correctly", function( assert ) {
	var ready = assert.async(),
		arIdx, idx;

	// Grab values from native inputs
	function grabNativeValues( widgets ) {
		var arrays = [ "vcheckbox", "hcheckbox", "vradio", "hradio" ],
			ret = {
				vcheckbox: [],
				hcheckbox: [],
				vradio: [],
				hradio: [],
				selectTest: widgets.selectTest.val(),
				range: widgets.range.val(),
				checkboxFlipswitch: widgets.checkboxFlipswitch.prop( "checked" ),
				selectFlipswitch: widgets.selectFlipswitch[ 0 ].selectedIndex
			};

		for ( arIdx in arrays ) {
			for ( idx in widgets[ arrays[ arIdx ] ] ) {
				ret[ arrays[ arIdx ] ].push( widgets[ arrays[ arIdx ] ][ idx ].is( ":checked" ) );
			}
		}

		return ret;
	}

	function verifyRange( assert, prefix, el, value ) {
		var id = el.attr( "id" ),
			slider = el.next(),
			buttonStyle = slider.children().attr( "style" ).split( ";" ),
			styleItem, idx, idx1,
			style = {};

		// Reconstruct the inline style of the object. The result will be stored in the variable "style"
		for ( idx in buttonStyle ) {
			styleItem = buttonStyle[ idx ].split( ":" );
			if ( styleItem.length === 2 ) {
				for ( idx1 in styleItem ) {
					styleItem[ idx1 ] = styleItem[ idx1 ].trim();
				}
				style[ styleItem[ 0 ] ] = styleItem[ 1 ];
			}
		}

		assert.ok( slider.hasClass( "ui-slider-track" ), prefix + id + "'s immediate succeeding sibling has class ui-slider-track" );

		// This assumes an input range of 0-100
		assert.ok( style.left === value + "%", prefix + id + "'s button is located appropriately" );
	}

	function verifySelect( assert, prefix, el ) {
		var id = el.attr( "id" ),
			button = el.parent(),
			wrapper = button.parent(),
			anonySpan = button.children( ".ui-selectmenu-button-text" );

		assert.ok( button.length === 1, prefix + id + " has a parent" );
		assert.ok( wrapper.length === 1, prefix + id + " has a wrapper" );
		assert.ok( wrapper.hasClass( "ui-selectmenu" ), prefix + id +
			"'s wrapper has class ui-selectmenu" );
		assert.ok( anonySpan.length === 1, prefix + id +
			"'s wrapper contains a single span element as its last child" );
		assert.strictEqual( anonySpan.text(), el.children( "[value='" + el.val() + "']" ).text(),
			prefix + id + "'s text is identical to the selected <option> element's text" );
	}

	function verifyFlipswitch( assert, prefix, el, value ) {
		var id = el.attr( "id" );

		assert.deepEqual( el.parent().hasClass( "ui-flipswitch-active" ), !!value, prefix + "class 'ui-flipswitch-active' presence/absence on parent of " + id + " is correct" );
	}

	// Verify that the enhanced widgets reflect the expected values - the helpers
	// make assumptions about where the enhanced widget is wrt. the native widget
	// and will cause a test failure if that relationship changes.
	function verifyValues( assert, prefix, widgets, values ) {
		verifySelect( assert, prefix, widgets.selectTest, values.selectTest );
		verifyRange( assert, prefix, widgets.range, values.range );

		verifyFlipswitch( assert, prefix, widgets.checkboxFlipswitch, values.checkboxFlipswitch );
		verifyFlipswitch( assert, prefix, widgets.selectFlipswitch, values.selectFlipswitch );
	}

	function runTest( page, doneCb ) {

		// First, record default values
		var widgets = {
				reset: $( "#reset" ),
				vcheckbox: [
					$( "#testVCheckbox1", page ),
					$( "#testVCheckbox4", page )
				],
				hcheckbox: [
					$( "#testHCheckbox1", page ),
					$( "#testHCheckbox4", page )
				],
				vradio: [
					$( "#testVRadio1", page ),
					$( "#testVRadio4", page )
				],
				hradio: [
					$( "#testHRadio1", page ),
					$( "#testHRadio4", page )
				],
				selectTest: $( "#selectTest", page ),
				range: $( "#testRange", page ),
				checkboxFlipswitch: $( "#checkbox-based-flipswitch" ),
				selectFlipswitch: $( "#select-based-flipswitch" )
			},
			checkboxKeys = [ "vcheckbox", "hcheckbox" ],
			defaults = grabNativeValues( widgets ), keyIdx, wIdx;

		// Make sure the widgets actually reflect the defaults
		verifyValues( assert, "Initially: ", widgets, defaults );

		// Change values:
		// Invert checkboxes
		for ( keyIdx in checkboxKeys ) {
			for ( wIdx in widgets[ checkboxKeys[ keyIdx ] ] ) {
				widgets[ checkboxKeys[ keyIdx ] ][ wIdx ].prop( "checked", !widgets[ checkboxKeys[ keyIdx ] ][ wIdx ].is( ":checked" ) ).checkboxradio( "refresh" );
			}
		}

		// Pick other values for radios
		widgets.vradio[ 0 ].prop( "checked", true ).checkboxradio( "refresh" );
		widgets.hradio[ 1 ].prop( "checked", true ).checkboxradio( "refresh" );

		// Modify select
		widgets.selectTest.val( "option2" ).selectmenu( "refresh" );

		// Modify slider
		widgets.range.val( 19 ).slider( "refresh" );

		// Modify flipswitches
		widgets.checkboxFlipswitch.prop( "checked", !widgets.checkboxFlipswitch.prop( "checked" ) ).flipswitch( "refresh" );
		widgets.selectFlipswitch[ 0 ].selectedIndex = ( widgets.selectFlipswitch[ 0 ].selectedIndex === 0 ? 1 : 0 );
		widgets.selectFlipswitch.flipswitch( "refresh" );

		// Verify values after modification
		verifyValues( assert, "After modification: ", widgets, grabNativeValues( widgets ) );

		widgets.reset.click();

		setTimeout( function() {
			verifyValues( assert, "After reset: ", widgets, defaults );
			doneCb();
		}, 2000 );
	}

	var testComplete = false,
		wentToTestPage = false,
		maybeGoToTestPage = function() {
			if ( !wentToTestPage ) {
				wentToTestPage = true;
				$( "#goToTestPage" ).click();
			}
		},
		handlePageShow = function( e ) {
			if ( e.target.id === "testPage" ) {
				setTimeout( function() {
					runTest( e.target, function() {
						testComplete = true;
						setTimeout( function() {
							$( "#goToStartPage" ).click();
						} );
					} );
				} );
			} else if ( e.target.id === "startPage" ) {
				if ( wentToTestPage ) {
					if ( testComplete ) {
						$( document ).unbind( "pageshow", handlePageShow );
						ready();
					}
				} else {
					setTimeout( maybeGoToTestPage );
				}
			}
	};

	$( document ).bind( "pageshow", handlePageShow );

	setTimeout( maybeGoToTestPage );
} );

QUnit.test( "form action is honored", function( assert ) {

	var ready = assert.async();
	assert.expect( 1 );

	$.testHelper.pageSequence( [
		function() {
			$( "#default-submit" ).click();
		},

		function() {
			assert.deepEqual( $.mobile.activePage.attr( "id" ), "landing1", "Clicking the default submit button lands you on landing1.html" );
			$.mobile.back();
		},

		ready
	] );
} );

QUnit.test( "button's formaction attribute is honored", function( assert ) {

	assert.expect( 1 );
	var ready = assert.async();

	$.testHelper.pageSequence( [
		function() {
			$( "#formaction-submit" ).click();
		},

		function() {
			assert.deepEqual( $.mobile.activePage.attr( "id" ), "landing2", "Clicking the default submit button lands you on landing2.html" );
			$.mobile.back();
		},

		ready
	] );
} );

} );
