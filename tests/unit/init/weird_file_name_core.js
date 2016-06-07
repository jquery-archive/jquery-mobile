define( [ "qunit", "jquery" ], function( QUnit, $ ) {

$( document ).on( "mobileinit", function() {
	var origParseLocation = $.mobile.path.parseLocation,
		origInitializePage = $.mobile.initializePage;

	// Overwrite parseLocation with a version that always urlencodes the name of the tests file
	$.mobile.path.parseLocation = function() {
		var parsedLocation = origParseLocation.apply( this, arguments ),
			returnValue = {};

		// Make sure the location bits appear urlEncoded
		$.each( parsedLocation, function( key, value ) {
			returnValue[ key ] =
				value.replace( /weird file name-tests/g, "weird%20file%20name-tests" );
		} );

		return returnValue;
	};

	// Overwrite initializePage with a version that restores both itself and parseLocation after
	// one call to itself
	$.mobile.initializePage = function() {

		$.mobile.intializePage = origInitializePage;
		$.mobile.path.parseLocation = origParseLocation;

		return origInitializePage.apply( this, arguments );
	};
} );

QUnit.test( "data-url for initial page is urldecoded", function( assert ) {
	assert.deepEqual(
		!!$( ":mobile-page" )
			.attr( "data-" + $.mobile.ns + "url" )
			.match( /weird%20file%20name/ ),
		false,
		"Value of 'data-url' attribute is not urlencoded" );
} );

} );
