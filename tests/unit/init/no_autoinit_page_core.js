( function( QUnit, $ ) {

QUnit.asyncTest( "resetActivePageHeight() will be called when page is initialized late", function( assert ) {
var resetActivePageHeightCallCount = 0;

$( document ).on( "mobileinit", function() {
	$.mobile.autoInitializePage = false;

	$.mobile.resetActivePageHeight = ( function( original ) {
		return function resetActivePageHeight() {
			resetActivePageHeightCallCount++;
			return original.apply( this, arguments );
		};
	} )( $.mobile.resetActivePageHeight );
} );

require( [ "jquery", "./init" ], function() {
	setTimeout( function() {
		$.mobile.initializePage();

		assert.deepEqual( resetActivePageHeightCallCount, 1,
			"$.mobile.resetActivePageHeight() was called from delayed initializePage()" );
		QUnit.start();
	}, 5000 );
} );
} );

} )( QUnit, jQuery );
