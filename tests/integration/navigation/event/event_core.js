$.testHelper.setPushState();

define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.module( "navigate", {
	beforeEach: function() {
		location.hash = "";
	},

	afterEach: function() {
		$( window ).unbind( "navigate" );
	}
} );

QUnit.test( "changes to the url trigger a navigate", function( assert ) {
	var ready = assert.async();
	$( window ).one( "navigate", function() {
		assert.ok( true, "navigate called" );
		ready();
	} );

	location.hash = "foo";
} );

QUnit.test( "traversing history back fires a navigate", function( assert ) {
	var ready = assert.async();
	assert.expect( 2 );

	$( window ).one( "navigate", function() {
		assert.ok( true, "navigate called on hash change" );

		$( window ).one( "navigate", function() {
			assert.ok( true, "navigate called on back button" );

			ready();
		} );

		window.history.back();
	} );

	location.hash = "foo";
} );

QUnit.test( "navigation events are marked", function( assert ) {
	var ready = assert.async();
	$( window ).one( "navigate", function( event ) {
		assert.equal( event.originalEvent.type, $.support.pushState ? "popstate" : "hashchange", "tagged as popstate" );
		ready();
	} );

	location.hash = "foo";
} );

QUnit.test( "navigation events can be disabled with prevent default on beforenavigate", function( assert ) {
	var ready = assert.async();

	// Failure in this test would be 3 test assertions
	assert.expect( 2 );

	$( window ).one( "beforenavigate", function( e ) {
		assert.ok( true, "beforenavigate fired" );
		e.preventDefault();
	} );

	$( window ).one( "navigate", function() {
		assert.ok( true, "navigate fired" );
		ready();
	} );

	// Fire a navigate that will be prevented
	location.hash = "foo";

	// Fire another to absorb the navigate binding
	location.hash = "bar";
} );

QUnit.test( "beforenavigate should carry the original navigation function", function( assert ) {
	var ready = assert.async();

	$( window ).one( "beforenavigate", function( event ) {
		var type = event.originalEvent.type;

		if ( $.support.pushState ) {
			assert.equal( type, "popstate", "the original event type is popstate" );
		} else {
			assert.equal( type, "hashchange", "the original event type is hashchange" );
		}

		ready();
	} );

	location.hash = "beforenavigate";
} );

if ( $.support.pushState ) {
	QUnit.test( "popstate navigation events contain pushed state", function( assert ) {
		var ready = assert.async();
		$.testHelper.eventTarget = $( window );

		$.testHelper.eventSequence( "navigate", [
			function() {
				window.history.replaceState( { foo: "bar" }, document.title, location.href.replace( /#.*/, "" ) + "#foo" );
				location.hash = "#foo2";
			},

			function() {
				window.history.back();
			},

			function( timedOut, data ) {
				assert.equal( data.state.foo, "bar", "state provided properly" );
				ready();
			}
		] );
	} );

	// Relies on having the early popstate handler defined in early_popstate_handler.js
	QUnit.test( "Default-prevented popstate does not trigger a navigate event",
		function( assert ) {
			var ready = assert.async();
			var eventNs = ".defaultPreventedPopstate";

			assert.expect( 2 );

			$.testHelper.detailedEventCascade( [
				function() {
					window.history.replaceState( { foo: "bar" }, document.title,
						location.href.replace( /#.*/, "" ) + "#foo" );
					location.hash = "#foo2";
				},
				{
					navigate: { src: $( window ), event: "navigate" + eventNs + "1" }
				},
				function( result ) {
					assert.deepEqual( result.navigate.timedOut, false,
						"Received navigate event going forward" );
					window.preventDefaultForNextPopstate = true;
					window.history.back();
				},
				{
					navigate: { src: $( window ), event: "navigate" + eventNs + "2" }
				},
				function( result ) {
					assert.deepEqual( result.navigate.timedOut, true,
						"Received no navigate event from a default-prevented popstate" );
					delete window.preventDefaultForNextPopstate;
					ready();
				}
			] );
		} );

} else {
	QUnit.test( "hashchange navigation provides for data added in a later binding", function( assert ) {
		var ready = assert.async();
		$( window ).one( "beforenavigate", function( event ) {
			event.originalEvent.hashchangeState = { foo: "bar" };
		} );

		$( window ).one( "navigate", function( event, data ) {
			assert.equal( event.originalEvent.type, "hashchange", "event triggered by a hashchange" );
			assert.equal( data.state.foo, "bar", "state provided properly" );
			ready();
		} );

		location.hash = "#foo2";
	} );
}
} );
