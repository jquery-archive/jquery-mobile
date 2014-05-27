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

test( "Default columnBtnTheme", function() {
	testClasses(
		$( "#columntoggle-option-test-blank" ),
		$( "#columntoggle-option-test-blank-button" )[ 0 ],
		"ui-btn-", "", "columnBtnTheme", "b", "ui-btn-b" );
});

test( "Explicit columnBtnTheme", function() {
	testClasses(
		$( "#columntoggle-option-test-explicit" ),
		$( "#columntoggle-option-test-explicit-button" )[ 0 ],
		"ui-btn-", "ui-btn-b", "columnBtnTheme", "a", "ui-btn-a" );
});

test( "Default columnPopupTheme", function() {
	var popup = $( "#columntoggle-option-test-blank-popup" );

	deepEqual( popup.popup( "option", "theme" ), null,
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

test( "Explicitly assigned columnBtnText", function() {
	$( "#columntoggle-option-test-explicit" ).table( "option", "columnBtnText", "xyzzy" );

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

test( "Toggling option columnButton works", function() {
	var tableId = "columntoggle-toggle-button",
		table = $( "#" + tableId ),
		button = table.prev();

	deepEqual( isMenuButton( table.prev(), tableId ), true, "Button is present by default" );

	table.table( "option", "columnButton", false );

	deepEqual( isMenuButton( table.prev(), tableId ), false,
		"Button is absent when 'columnButton' option is off" );

	table.table( "option", "columnButton", true );

	deepEqual( isMenuButton( table.prev(), tableId ), true,
		"Button is present when 'columnButton' option is turned back on" );

	deepEqual( table.prev()[ 0 ], button[ 0 ], "Button is reused" );
});
