/*
 * Mobile core unit tests
 */

define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
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

QUnit.module( "Silent scroll tests", {
	afterEach: function() {
		$.mobile.window.scrollTop( 0 );
	}
} );

QUnit.test( "scrolling marks scrollstart as disabled for 150 ms", function( assert ) {
	$.event.special.scrollstart.enabled = true;
	var done = assert.async();

	$.mobile.silentScroll( 100 );

	assert.ok( !$.event.special.scrollstart.enabled );

	window.setTimeout( function() {
		assert.ok( $.event.special.scrollstart.enabled );
		done();
	}, scrollStartEnabledTimeout );
} );



QUnit.test( "Silent scroll works when scrollTop is zero", function( assert ) {
	assert.expect( 4 );
	var done = assert.async();
	var done2 = assert.async();

	$.mobile.window.scrollTop( 0 );
	assert.equal( $.mobile.window.scrollTop(), 0, "At start, scroll is reset to 0" );

	$.mobile.document.on( "silentscroll", function( e, data ) {
		assert.equal( data.x, 0, "X coordinate of event should be 0" );
		assert.equal( data.y, 100, "Y coordinate of event should be 100" );
		done();
	} );

	$.mobile.silentScroll( 100 );

	window.setTimeout( function() {
		assert.equal( $.mobile.window.scrollTop(), 100, "It should work after scrollTimeout" );
		done2();
	}, scrollTimeout );

} );

QUnit.test( "Silent scroll doesn't occur when scrollTop is not zero",
	function( assert ) {
		assert.expect( 2 );
		var done = assert.async();

		$.mobile.window.scrollTop( 150 );
		assert.equal( $.mobile.window.scrollTop(), 150, "At start, scroll is reset to 150" );
		$.mobile.silentScroll( 0 );

		window.setTimeout( function() {
			assert.equal( $.mobile.window.scrollTop(), 150,
			"It should not scroll if user has already scrolled" );
			done();
		}, 2000 );
} );


//TODO test that silentScroll is called on window load
} );
