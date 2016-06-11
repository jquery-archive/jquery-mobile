/*
 * Mobile support unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

$.testHelper.excludeFileProtocol( function() {
	var prependToFn = $.fn.prependTo,
		moduleName = "support";

	QUnit.module( moduleName, {
		teardown: function() {

			//NOTE undo any mocking
			$.fn.prependTo = prependToFn;
		}
	} );

	// NOTE following two tests have debatable value as they only
	//	  prevent property name changes and improper attribute checks
	QUnit.asyncTest( "detects functionality from basic affirmative properties and attributes", function( assert ) {

		// TODO expose properties for less brittle tests
		$.extend( window, {
			WebKitTransitionEvent: true
		} );

		window.history.pushState = function() {};
		window.history.replaceState = function() {};

		$.mobile.media = function() { return true; };

		$.testHelper.reloadModule( moduleName ).done( function() {
			assert.ok( $.support.cssTransitions, "css transitions are supported" );
			assert.ok( $.support.pushState, "push state is supported" );
			assert.ok( $.support.mediaquery, "media queries are supported" );
			QUnit.start();
		} );
	} );

	QUnit.asyncTest( "detects orientation change", function( assert ) {
		$.extend( window, {
			orientation: true,
			onorientationchange: true
		} );

		$.testHelper.reloadModule( "support/orientation" ).done( function() {
			assert.ok( $.support.orientation, "orientation is supported" );
			QUnit.start();
		} );
	} );

	QUnit.asyncTest( "detects touch", function( assert ) {
		document.ontouchend = true;

		$.testHelper.reloadModule( "support/touch" ).done( function() {
			assert.ok( $.mobile.support.touch, "touch is supported" );
			assert.ok( $.support.touch, "touch is supported" );
			QUnit.start();
		} );
	} );

	QUnit.asyncTest( "detects functionality from basic negative properties and attributes (where possible)", function( assert ) {
		delete window.orientation;

		$.testHelper.reloadModule( "support/orientation" ).done( function() {
			assert.ok( !$.support.orientation, "orientation is not supported" );
			QUnit.start();
		} );
	} );

	// NOTE mocks prependTo to simulate base href updates or lack thereof
	var mockBaseCheck = function( url ) {
		var prependToFn = $.fn.prependTo;

		$.fn.prependTo = function( selector ) {
			var result = prependToFn.call( this, selector );
			if ( this[ 0 ].href && this[ 0 ].href.indexOf( "testurl" ) !== -1 ) {
				result = [ { href: url } ];
			}
			return result;
		};
	};

	QUnit.asyncTest( "detects no dynamic base tag when new base element added and base href unchanged", function( assert ) {
		mockBaseCheck( "testurl" );
		$.testHelper.reloadModule( moduleName ).done( function() {
			assert.ok( !$.support.dynamicBaseTag );
			QUnit.start();
		} );
	} );

	QUnit.asyncTest( "jQM's IE browser check properly detects IE versions", function( assert ) {
		assert.expect( 1 );
		if ( !$.browser ) {
			assert.ok( true, "Cannot perform test because $.browser has been removed" );
			QUnit.start();
			return;
		}
		$.testHelper.reloadModule( moduleName ).done( function() {

			//Here we're just comparing our version to what the conditional compilation finds
			var ie = !!$.browser.msie, //Get a boolean
			version = parseInt( $.browser.version, 10 ),
			jqmdetectedver = $.mobile.browser.oldIE;

			if ( ie ) {
				assert.deepEqual( version, jqmdetectedver, "It's IE and the version is correct" );
			} else {
				assert.deepEqual( ie, jqmdetectedver, "It's not IE" );
			}
			QUnit.start();
		} );
	} );

	//TODO propExists testing, refactor propExists into mockable method
	//TODO scrollTop testing, refactor scrollTop logic into mockable method
} );

} );
