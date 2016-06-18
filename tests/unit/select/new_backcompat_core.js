define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Style options", {
	setup: function() {
		$.mobile.ns = "nstest-";
		$.enhance._installWidget();
	}
} );

function toggleClass( classValue, singleClass, turnItOn ) {
	var currentIndex,
		classesArray = classValue.match( /\S+/g );

	currentIndex = $.inArray( singleClass, classesArray );

	// The value is already in the array and we're asked to add it
	if ( currentIndex >= 0 && turnItOn ) {
		return classValue;
	}

	// The value is not in the array and we're asked to remove it
	if ( currentIndex < 0 && !turnItOn ) {
		return classValue;
	}

	// Otherwise the array definitely needs to be modified
	if ( turnItOn ) {
		classesArray.push( singleClass );
	} else {
		classesArray.splice( currentIndex, 1 );
	}

	return classesArray.join( " " );
}

// Make sure that modifying the classes option key updates the relevant style option
function testClassToStyleOption( assert, optionName, initialMode, initialValue, className ) {
	var selector = "#" + optionName + "-" + initialMode + "-classes",
		menu = $( selector ).selectmenu();

	// Make sure the initial state is correct
	assert.strictEqual( menu.selectmenu( "option", optionName ), initialValue,
		"Initial option value is correct" );

	// Toggle the class in the classes key value and make sure the new state is correct
	menu.selectmenu( "option", "classes.ui-selectmenu-button",
		toggleClass( menu.selectmenu( "option", "classes.ui-selectmenu-button" ),
			className, !initialValue ) );
	assert.strictEqual( menu.selectmenu( "option", optionName ), !initialValue,
		"After " + ( ( !initialValue ) ? "adding" : "removing" ) + " class " + className +
			" option '" + optionName + "' has the correct value" );
}

// Make sure that modifying a style option updates the relevant classes
function testStyleOptionToClass( assert, optionName, initialMode, initialValue, className ) {
	var selector = "#" + optionName + "-" + initialMode,
		menu = $( selector ).selectmenu(),
		button = $( selector + "-button" );

	// Make sure the initial state is correct
	assert[ initialValue ? "hasClasses" : "lacksClasses" ]( button, className,
		"Initially class " + className + " is " +
			( initialValue ? "present" : "absent" ) );

	// Toggle the option value and make sure the new state is correct
	menu.selectmenu( "option", optionName, !initialValue );
	assert[ !initialValue ? "hasClasses" : "lacksClasses" ]( button, className,
		"After setting '" + optionName + "' to " + ( !initialValue ) +
			" class " + className + " is " + ( ( !initialValue ) ? "present" : "absent" ) );
}

// Define style option tests
function defineStyleOptionTests( optionName, initialValue, className ) {

	// One test for an initially unset option
	QUnit.test( "Option '" + optionName + "' on initially unset select menu", function( assert ) {
		testStyleOptionToClass( assert, optionName, "implicit", initialValue, className );
		testClassToStyleOption( assert, optionName, "implicit", initialValue, className );
	} );

	// Another test for an option explicitly set in the markup
	QUnit.test( "Option '" + optionName + "' on initially set select menu", function( assert ) {
		testStyleOptionToClass( assert, optionName, "explicit", !initialValue, className );
		testClassToStyleOption( assert, optionName, "explicit", !initialValue, className );
	} );
}

defineStyleOptionTests( "corners", true, "ui-corner-all" );
defineStyleOptionTests( "shadow", true, "ui-shadow" );
defineStyleOptionTests( "mini", false, "ui-mini" );
defineStyleOptionTests( "inline", false, "ui-button-inline" );

} );
