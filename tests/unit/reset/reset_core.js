/*
 * mobile popup unit tests
 */
(function($){

asyncTest( "Form resets correctly", function() {

	// Grab values from native inputs
	function grabNativeValues( widgets ) {
		var arrays = [ "vcheckbox", "hcheckbox", "vradio", "hradio" ],
			ret = {
				vcheckbox: [],
				hcheckbox: [],
				vradio: [],
				hradio: [],
				selectTest: widgets.selectTest.val(),
				range: widgets.range.val()
			};

		for ( arIdx in arrays ) {
			for (idx in widgets[ arrays[ arIdx ] ] ) {
				ret[ arrays[ arIdx ] ].push( widgets[ arrays[ arIdx ] ][ idx ].is( ":checked" ) );
			}
		}

		return ret;
	}

	function verifyRange( prefix, el, value ) {
		var id = el.attr( "id" ),
			slider = el.next(),
			buttonStyle = slider.children().attr( "style" ).split( ";" ),
			styleItem, style = {};

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

		ok( slider.hasClass( "ui-slider-track" ), prefix + id + "'s immediate succeeding sibling has class ui-slider-track" );
		// This assumes an input range of 0-100
		ok( style.left === value + "%", prefix + id + "'s button is located appropriately" );
	}

	function verifySelect( prefix, el, value ) {
		var id = el.attr( "id" ),
			button = el.parent(),
			wrapper = button.parent(),
			textEl = button.children().eq( 0 ).children().eq( 0 ),
			anonySpan = textEl.children();

		ok( button.length === 1, prefix + id + " has a parent" );
		ok( wrapper.length === 1, prefix + id + " has a wrapper" );
		ok( wrapper.hasClass( "ui-select" ), prefix + id + "'s wrapper has class ui-select" );
		ok( textEl.length === 1, prefix + id + "'s text element is present" );
		ok( textEl.hasClass( "ui-btn-text" ), prefix + id + "'s text element has class ui-btn-text" );
		ok( anonySpan.length === 1, prefix + id + "'s text element contains a single span element" );
		ok( anonySpan.text() === el.children("[value='" + el.val() + "']").text(), prefix + id + "'s text is identical to the text inside the selected <option> element" );
	}

	function verifyCheckboxRadio( prefix, el, isRadio, isHoriz, value ) {
		var id = el.attr( "id" ),
			label = el.parent().children( "label" ),
			ctype = ( isRadio ? "radio" : "checkbox" ),
			iconEl = label.children().eq( 0 ).children().eq( 1 ),
			iconVisible = iconEl.is( ":visible" ),
			iconValue = ( ctype + "-" + ( value ? "on" : "off" ) );

		ok( label.is( "label[for='" + id + "']" ), prefix + id + "'s label is a label for it" );
		ok( label.parent().is( ".ui-" + ctype ), prefix + id + "'s parent's label is a div with the correct class" );
		ok( label.attr( "data-" + ( $.mobile.ns || "" ) + "icon" ) === iconValue, prefix + id + " has the correct data-icon attribute value" );
		ok( iconEl.length === 1, prefix + id + " has exactly one icon element in the right spot" );
		ok( iconEl.hasClass( "ui-icon-" + iconValue ), prefix + id + "'s icon has the right icon class" );
		ok( iconVisible === ( !isHoriz ), prefix + id + "'s icon is visible exactly when it's not part of a horizontal controlgroup" );
		ok( label.hasClass( "ui-btn-active" ) === ( isHoriz && value ), prefix + id + "'s label has class ui-btn-active exactly when it's set and part of a horizontal controlgroup" );
	}

	// Verify that the enhanced widgets reflect the expected values - the helpers
	// make assumptions about where the enhanced widget is wrt. the native widget
	// and will cause a test failure if that relationship changes.
	function verifyValues( prefix, widgets, values ) {
		for ( idx in values.vcheckbox ) {
			verifyCheckboxRadio( prefix, widgets.vcheckbox[ idx ], false, false, values.vcheckbox[ idx ] );
		}
		for ( idx in values.hcheckbox ) {
			verifyCheckboxRadio( prefix, widgets.hcheckbox[ idx ], false, true, values.hcheckbox[ idx ] );
		}
		for ( idx in values.vradio ) {
			verifyCheckboxRadio( prefix, widgets.vradio[ idx ], true, false, values.vradio[ idx ] );
		}
		for ( idx in values.hradio ) {
			verifyCheckboxRadio( prefix, widgets.hradio[ idx ], true, true, values.hradio[ idx ] );
		}

		verifySelect( prefix, widgets.selectTest, values.selectTest );
		verifyRange( prefix, widgets.range, values.range );
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
				range: $( "#testRange", page )
			},
			checkboxKeys = [ "vcheckbox", "hcheckbox" ],
			defaults = grabNativeValues( widgets );

		// Make sure the widgets actually reflect the defaults
		verifyValues( "Initially: ", widgets, defaults );

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

		// Verify values after modification
		verifyValues( "After modification: ", widgets, grabNativeValues( widgets ) );

		widgets.reset.click();

		setTimeout( function() {
			verifyValues( "After reset: ", widgets, defaults );
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
		};

	$( document ).bind( "pageshow", function( e ) {
		if ( e.target.id === "testPage" ) {
			setTimeout( function() {
				runTest( e.target, function() {
					testComplete = true;
					setTimeout( function() { $( "#goToStartPage" ).click(); } );
				});
			});
		} else if ( e.target.id === "startPage" ) {
			if ( wentToTestPage ) {
				if ( testComplete ) {
					start();
				}
			} else {
				setTimeout( maybeGoToTestPage );
			}
		}
	});

	setTimeout( maybeGoToTestPage );
});

})( jQuery );
