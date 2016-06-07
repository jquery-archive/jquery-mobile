define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Unbinding swipeleft leaves swiperight handler alone", function( assert ) {
var dummy = function() {},
	swipeLength = function() {
		var swipe = $._data( document, "events" ).swipe;

		return swipe ? swipe.length : 0;
	},
	initialSwipeLength = swipeLength();

$( document ).on( "swipeleft swiperight", ".ui-page", dummy );

assert.deepEqual( swipeLength(), initialSwipeLength + 2,
	"Two swipe handlers are present after attaching swipeleft and swiperight" );

$( document ).off( "swipeleft", ".ui-page", dummy );

assert.deepEqual( swipeLength(), initialSwipeLength + 1,
	"One swipe handler is present after detaching swipeleft" );

$( document ).on( "swipeleft", ".ui-page", dummy );

assert.deepEqual( swipeLength(), initialSwipeLength + 2,
	"Two swipe handlers are present after reattaching swipeleft" );

$( document ).off( "swiperight", ".ui-page", dummy );

assert.deepEqual( swipeLength(), initialSwipeLength + 1,
	"One swipe handler is present after detaching swiperight" );

$( document ).on( "swiperight", ".ui-page", dummy );

assert.deepEqual( swipeLength(), initialSwipeLength + 2,
	"Two swipe handlers are present after reattaching swiperight" );

$( document ).off( "swipeleft swiperight", ".ui-page", dummy );

assert.deepEqual( swipeLength(), initialSwipeLength,
	"No swipe handlers are present after detaching both swipeleft and swiperight" );
} );

} );
