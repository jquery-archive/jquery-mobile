/*
 * Mobile core unit tests
 */

( function( QUnit, $ ) {
var libName = "core",
	scrollTimeout = 70, // TODO expose timing as an attribute
	scrollStartEnabledTimeout = 150;

QUnit.module( libName, {
	setup: function() {
		$( "<div id='scroll-testing' " +
			"style='height: " + ( screen.height * 3 ) + "px'></div>" ).appendTo( "body" );
	},

	teardown: function() {
		$( "#scroll-testing" ).remove();
	}
} );

function scrollUp( assert, pos ) {
	$( window ).scrollTop( screen.height );
	assert.deepEqual( $( window ).scrollTop() > 0, true,
		"After setting scrollTop, it is " + $( window ).scrollTop() );
	$.mobile.silentScroll( pos );
}

QUnit.asyncTest( "silent scroll scrolls the page to the top by default", function( assert ) {
	scrollUp( assert );

	setTimeout( function() {
		assert.deepEqual( $( window ).scrollTop(), $.mobile.defaultHomeScroll,
			"After parameterless silentScroll(), scrollTop is $.mobile.defaultHomescroll: " +
			$.mobile.defaultHomeScroll );
		QUnit.start();
	}, scrollTimeout );
} );

QUnit.asyncTest( "silent scroll scrolls the page to the passed y position", function( assert ) {
	var pos = 10;
	scrollUp( assert, pos );

	setTimeout( function() {
		assert.deepEqual( $( window ).scrollTop(), pos );
		QUnit.start();
	}, scrollTimeout );
} );

QUnit.asyncTest( "scrolling marks scrollstart as disabled for 150 ms", function( assert ) {
	$.event.special.scrollstart.enabled = true;
	scrollUp( assert );
	assert.ok( !$.event.special.scrollstart.enabled );

	setTimeout( function() {
		assert.ok( $.event.special.scrollstart.enabled );
		QUnit.start();
	}, scrollStartEnabledTimeout );
} );

//TODO test that silentScroll is called on window load
} )( QUnit, jQuery );
