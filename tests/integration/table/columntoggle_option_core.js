define( [ "qunit", "jquery" ], function( QUnit, $ ) {

// These tests run on both prerendered and non-prerendered tables
$.mobile.ns = "nstest-";

QUnit.module( "Columntoggle options" );

function getSwatchClasses( element, prefix ) {
	var index,
		list = element.className.split( " " ),
		resultList = [],
		regex = new RegExp( "^" + prefix + "([a-z]|inherit)$" );

	for ( index in list ) {
		if ( list[ index ].match( regex ) ) {
			resultList.push( list[ index ] );
		}
	}

	return resultList;
}

function testClasses( assert, table, element, prefix, startClass, optionName, newValue, endClass ) {
	var swatchClasses;

	swatchClasses = getSwatchClasses( element, prefix );
	assert.deepEqual( swatchClasses.length, startClass ? 1 : 0,
		"Element has " + ( startClass ? "one" : "no" ) + " swatch class at first" );
	if ( startClass ) {
		assert.deepEqual( swatchClasses[ 0 ], startClass,
			"Element initial swatch class is '" + startClass + "'" );
	}

	table.table( "option", optionName, newValue );

	swatchClasses = getSwatchClasses( element, prefix );
	assert.deepEqual( swatchClasses.length, endClass ? 1 : 0,
		"Element has " + ( endClass ? "one" : "no" ) + " swatch after setting '" +
			optionName + "' to '" + newValue + "'" );
	if ( endClass ) {
		assert.deepEqual( swatchClasses[ 0 ], endClass,
			"Element swatch class after setting option is '" + endClass + "'" );
	}
}

QUnit.test( "Default columnButtonTheme", function( assert ) {
	testClasses( assert,
		$( "#columntoggle-option-test-blank" ),
		$( "#columntoggle-option-test-blank-button" )[ 0 ],
		"ui-button-", "ui-button-inherit", "columnButtonTheme", "b", "ui-button-b" );
} );

QUnit.test( "Explicit columnButtonTheme", function( assert ) {
	testClasses( assert,
		$( "#columntoggle-option-test-explicit" ),
		$( "#columntoggle-option-test-explicit-button" )[ 0 ],
		"ui-button-", "ui-button-b", "columnButtonTheme", "a", "ui-button-a" );
} );

QUnit.test( "Default columnPopupTheme", function( assert ) {
	var popup = $( "#columntoggle-option-test-blank-popup" );

	assert.deepEqual( popup.popup( "option", "theme" ), "inherit",
		"Popup has no theme assigned initially" );

	testClasses( assert,
		$( "#columntoggle-option-test-blank" ),
		popup[ 0 ],
		"ui-body-", "ui-body-inherit", "columnPopupTheme", "b", "ui-body-b" );

	assert.deepEqual( popup.popup( "option", "theme" ), "b",
		"Popup has theme 'b' assigned in the end" );
} );

QUnit.test( "Explicit columnPopupTheme", function( assert ) {
	var popup = $( "#columntoggle-option-test-explicit-popup" );

	assert.deepEqual( popup.popup( "option", "theme" ), "b",
		"Popup has swatch 'b' assigned initially" );

	testClasses( assert,
		$( "#columntoggle-option-test-explicit" ),
		popup[ 0 ],
		"ui-body-", "ui-body-b", "columnPopupTheme", "a", "ui-body-a" );

	assert.deepEqual( popup.popup( "option", "theme" ), "a",
		"Popup has theme 'a' assigned in the end" );
} );

QUnit.test( "Explicitly assigned columnButtonText", function( assert ) {
	$( "#columntoggle-option-test-explicit" ).table( "option", "columnButtonText", "xyzzy" );

	assert.deepEqual( $( "#columntoggle-option-test-explicit-button" ).text(), "xyzzy",
		"Button text assigned via option is propagated to the button" );
} );

function isMenuButton( element, tableId ) {
	return element.is( "a#" + tableId + "-button[href='#" + tableId + "-popup']" );
}

QUnit.test( "Default columnButton", function( assert ) {
	assert.deepEqual(
		isMenuButton( $( "#columntoggle-option-test-blank" ).prev(),
			"columntoggle-option-test-blank" ),
		true,
		"By default the table is preceded by a button that opens the column selection popup" );
} );

function testColumnButtonOption( assert, prefix, tableId, shouldBeThere ) {
	var table = $( "#" + tableId ),
		button = table.prev();

	assert.deepEqual( isMenuButton( table.prev(), tableId ), shouldBeThere,
		prefix + "Button is initially present" );

	table.table( "option", "columnButton", false );

	assert.deepEqual( isMenuButton( table.prev(), tableId ), false,
		prefix + "Button is absent when 'columnButton' option is off" );

	table.table( "option", "columnButton", true );

	assert.deepEqual( isMenuButton( table.prev(), tableId ), shouldBeThere,
		prefix + "Button is present when 'columnButton' option is turned back on" );

	assert.deepEqual( table.prev()[ 0 ], button[ 0 ], prefix + "Button is reused" );
}

QUnit.test( "Toggling option columnButton works", function( assert ) {
	testColumnButtonOption( assert, "", "columntoggle-toggle-button", true );
} );

QUnit.test( "Toggling option columnButton when initially false works", function( assert ) {
	var tableId = "columntoggle-toggle-button-initially-absent",
		table = $( "#" + tableId );

	assert.deepEqual( isMenuButton( table.prev(), tableId ), false,
		"Initially, no button precedes the table" );

	table.table( "option", "columnButton", true );

	assert.deepEqual( isMenuButton( table.prev(), tableId ), true,
		"Button is present after option is turned on" );
} );

QUnit.test( "Toggling option columnUi works", function( assert ) {
	var tableId = "columntoggle-toggle-ui",
		table = $( "#" + tableId ),
		testUIPresence = function( prefix, shouldBeThere ) {
			var negation = shouldBeThere ? "" : "not ",
				inputs = $( "#" + tableId + "-popup" ).find( "input" );

			assert.deepEqual( isMenuButton( table.prev(), tableId ), shouldBeThere,
				prefix + "Button is " + negation + "present" );
			assert.deepEqual( $( "#" + tableId + "-popup" ).length, ( shouldBeThere ? 1 : 0 ),
				prefix + "Popup is " + negation + "present" );
			if ( shouldBeThere ) {
				assert.deepEqual( !!$( "#" + tableId + "-popup" ).data( "mobile-popup" ), shouldBeThere,
					prefix + "Popup is popup widget" );
			}
			assert.deepEqual(
				table
					.find( "thead > tr" )
						.children( shouldBeThere ? "[data-" + $.mobile.ns + "priority]" : "*" )
							.is( function() {
								var data = $( this ).jqmData( "input" );

								return shouldBeThere ?
									!( data && inputs.index( data[ 0 ] ) >= 0 ) :
									!!data;
							} ),
				false,
				prefix + "Data " + negation + "present at header key 'input'" +
					( shouldBeThere ? " and it refers to an input in the popup" : "" ) );

			testColumnButtonOption( assert, "While UI is " + negation + "present: ", tableId,
				shouldBeThere );
		};

	testUIPresence( "By default: ", true );

	table.table( "option", "columnUi", false );

	testUIPresence( "After turning off option: ", false );

	table.table( "option", "columnUi", true );

	testUIPresence( "After turning option back on: ", true );
} );
} );
