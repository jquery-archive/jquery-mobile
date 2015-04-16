/*
 * mobile core unit tests
 */

( function( $ ) {
var libName = "core",
	scrollTimeout = 70, // TODO expose timing as an attribute
	scrollStartEnabledTimeout = 150;

module( libName, {
	setup: function() {
		$( "<div id='scroll-testing' " +
			"style='height: " + ( screen.height * 3 ) + "px'></div>" ).appendTo( "body" );
	},

	teardown: function() {
		$( "#scroll-testing" ).remove();
	}
} );

var scrollUp = function( pos ) {
	$( window ).scrollTop( screen.height );
	deepEqual( $( window ).scrollTop() > 0, true,
		"After setting scrollTop, it is " + $( window ).scrollTop() );
	$.mobile.silentScroll( pos );
};

asyncTest( "silent scroll scrolls the page to the top by default", function() {
	scrollUp();

	setTimeout( function() {
		deepEqual( $( window ).scrollTop(), $.mobile.defaultHomeScroll,
			"After parameterless silentScroll(), scrollTop is $.mobile.defaultHomescroll: " +
			$.mobile.defaultHomeScroll );
		start();
	}, scrollTimeout );
} );

asyncTest( "silent scroll scrolls the page to the passed y position", function() {
	var pos = 10;
	scrollUp( pos );

	setTimeout( function() {
		deepEqual( $( window ).scrollTop(), pos );
		start();
	}, scrollTimeout );
} );

asyncTest( "scrolling marks scrollstart as disabled for 150 ms", function() {
	$.event.special.scrollstart.enabled = true;
	scrollUp();
	ok( !$.event.special.scrollstart.enabled );

	setTimeout( function() {
		ok( $.event.special.scrollstart.enabled );
		start();
	}, scrollStartEnabledTimeout );
} );

//TODO test that silentScroll is called on window load
} )( jQuery );
