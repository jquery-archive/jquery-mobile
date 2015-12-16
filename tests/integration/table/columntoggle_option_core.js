// These tests run on both prerendered and non-prerendered tables
$.mobile.ns ="nstest-";

module( "Columntoggle options" );

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

function testClasses( table, element, prefix, startClass, optionName, newValue, endClass ) {
	var swatchClasses;

	swatchClasses = getSwatchClasses( element, prefix );
	deepEqual( swatchClasses.length, startClass ? 1 : 0,
		"Element has " + ( startClass ? "one" : "no" ) + " swatch class at first" );
	if ( startClass ) {
		deepEqual( swatchClasses[ 0 ], startClass,
			"Element initial swatch class is '" + startClass + "'" );
	}

	table.table( "option", optionName, newValue );

	swatchClasses = getSwatchClasses( element, prefix );
	deepEqual( swatchClasses.length, endClass ? 1 : 0,
		"Element has " + ( endClass ? "one" : "no" ) + " swatch after setting '" +
			optionName + "' to '" + newValue + "'" );
	if ( endClass ) {
		deepEqual( swatchClasses[ 0 ], endClass,
			"Element swatch class after setting option is '" + endClass + "'" );
	}
}

test( "Default columnButtonTheme", function() {
	testClasses(
		$( "#columntoggle-option-test-blank" ),
		$( "#columntoggle-option-test-blank-button" )[ 0 ],
		"ui-button-", "", "columnButtonTheme", "b", "ui-button-b" );
});

test( "Explicit columnButtonTheme", function() {
	testClasses(
		$( "#columntoggle-option-test-explicit" ),
		$( "#columntoggle-option-test-explicit-button" )[ 0 ],
		"ui-button-", "ui-button-b", "columnButtonTheme", "a", "ui-button-a" );
});

test( "Default columnPopupTheme", function() {
	var popup = $( "#columntoggle-option-test-blank-popup" );

	deepEqual( popup.popup( "option", "theme" ), "inherit",
		"Popup has no theme assigned initially" );

	testClasses(
		$( "#columntoggle-option-test-blank" ),
		popup[ 0 ],
		"ui-body-", "ui-body-inherit", "columnPopupTheme", "b", "ui-body-b" );

	deepEqual( popup.popup( "option", "theme" ), "b",
		"Popup has theme 'b' assigned in the end" );
});

test( "Explicit columnPopupTheme", function() {
	var popup = $( "#columntoggle-option-test-explicit-popup" );

	deepEqual( popup.popup( "option", "theme" ), "b",
		"Popup has swatch 'b' assigned initially" );

	testClasses(
		$( "#columntoggle-option-test-explicit" ),
		popup[ 0 ],
		"ui-body-", "ui-body-b", "columnPopupTheme", "a", "ui-body-a" );

	deepEqual( popup.popup( "option", "theme" ), "a",
		"Popup has theme 'a' assigned in the end" );
});

test( "Explicitly assigned columnButtonText", function() {
	$( "#columntoggle-option-test-explicit" ).table( "option", "columnButtonText", "xyzzy" );

	deepEqual( $( "#columntoggle-option-test-explicit-button" ).text(), "xyzzy",
		"Button text assigned via option is propagated to the button" );
});

function isMenuButton( element, tableId ) {
	return element.is( "a#" + tableId + "-button[href='#" + tableId + "-popup']" );
}

test( "Default columnButton", function() {
	deepEqual(
		isMenuButton( $( "#columntoggle-option-test-blank" ).prev(),
			"columntoggle-option-test-blank" ),
		true,
		"By default the table is preceded by a button that opens the column selection popup" );
});

function testColumnButtonOption( prefix, tableId, shouldBeThere ) {
	var table = $( "#" + tableId ),
		button = table.prev();

	deepEqual( isMenuButton( table.prev(), tableId ), shouldBeThere,
		prefix + "Button is initially present" );

	table.table( "option", "columnButton", false );

	deepEqual( isMenuButton( table.prev(), tableId ), false,
		prefix + "Button is absent when 'columnButton' option is off" );

	table.table( "option", "columnButton", true );

	deepEqual( isMenuButton( table.prev(), tableId ), shouldBeThere,
		prefix + "Button is present when 'columnButton' option is turned back on" );

	deepEqual( table.prev()[ 0 ], button[ 0 ], prefix + "Button is reused" );
}

test( "Toggling option columnButton works", function() {
	testColumnButtonOption( "", "columntoggle-toggle-button", true );
});

test( "Toggling option columnButton when initially false works", function() {
	var tableId = "columntoggle-toggle-button-initially-absent",
		table = $( "#" + tableId );

	deepEqual( isMenuButton( table.prev(), tableId ), false,
		"Initially, no button precedes the table" );

	table.table( "option", "columnButton", true );

	deepEqual( isMenuButton( table.prev(), tableId ), true,
		"Button is present after option is turned on" );
});

test( "Toggling option columnUi works", function() {
	var tableId = "columntoggle-toggle-ui",
		table = $( "#" + tableId ),
		testUIPresence = function( prefix, shouldBeThere ) {
			var negation = shouldBeThere ? "" : "not ",
				inputs = $( "#" + tableId + "-popup" ).find( "input" );

			deepEqual( isMenuButton( table.prev(), tableId ), shouldBeThere,
				prefix + "Button is " + negation + "present" );
			deepEqual( $( "#" + tableId + "-popup" ).length, ( shouldBeThere ? 1 : 0 ),
				prefix + "Popup is " + negation + "present" );
			if ( shouldBeThere ) {
				deepEqual( !!$( "#" + tableId + "-popup" ).data( "mobile-popup" ), shouldBeThere,
					prefix + "Popup is popup widget" );
			}
			deepEqual(
				table
					.find( "thead > tr" )
						.children( shouldBeThere ? "[data-" + $.mobile.ns + "priority]" : "*" )
							.is( function() {
								var data = $( this ).jqmData( "input" );

								return shouldBeThere ?
									!( data && inputs.index( data[ 0 ] ) >= 0 ):
									!!data;
							}),
				false,
				prefix + "Data " + negation + "present at header key 'input'" +
					( shouldBeThere ? " and it refers to an input in the popup" : "" ) );

			testColumnButtonOption( "While UI is " + negation + "present: ", tableId,
				shouldBeThere );
		};

	testUIPresence( "By default: ", true );

	table.table( "option", "columnUi", false );

	testUIPresence( "After turning off option: ", false );

	table.table( "option", "columnUi", true );

	testUIPresence( "After turning option back on: ", true );
});
