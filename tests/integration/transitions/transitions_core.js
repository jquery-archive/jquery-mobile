/*
 * Mobile navigation unit tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

var transitioning = "ui-mobile-viewport-transitioning",
	animationCompleteFn = $.fn.animationComplete,
	defaultMaxTrans = $.mobile.maxTransitionWidth,

	// TODO centralize class names?
	transitionTypes = "in out fade slide flip reverse pop",

	isTransitioning = function( page ) {
		return $.grep( transitionTypes.split( " " ), function( className ) {
				return page.hasClass( className );
			} ).length > 0;
	},

	isTransitioningIn = function( page ) {
		return page.hasClass( "in" ) && isTransitioning( page );
	},

	disableMaxTransWidth = function() {
		$.mobile.maxTransitionWidth = false;
	},

	enableMaxTransWidth = function() {
		$.mobile.maxTransitionWidth = defaultMaxTrans;
	},

	// AnimationComplete callback queue
	fromQueue = [],
	toQueue = [],

	resetQueues = function() {
		fromQueue = [];
		toQueue = [];
	},

	onToComplete = function( f ) {
		toQueue.push( f );
	},

	// Wipe all urls
	clearUrlHistory = function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
	};

QUnit.module( "jquery.mobile.navigation.js", {
	beforeEach: function( assert ) {

		// Disable this option so we can test transitions regardless of window width
		disableMaxTransWidth();

		// Stub to allow callback before function is returned to transition handler
		$.fn.animationComplete = function( callback ) {
			animationCompleteFn.call( this, function() {
				var queue = $( this ).is( ".out" ) ? fromQueue : toQueue;
				for ( var i = 0, il = queue.length; i < il; i++ ) {
					queue.pop()( this );
				}
				callback();
			} );

			return this;
		};

		resetQueues();
		clearUrlHistory();

		if ( location.hash !== "#harmless-default-page" ) {
			var ready = assert.async();

			$( document ).one( "pagechange", function() {
				ready();
			} );

			location.hash = "#harmless-default-page";
		}
	},

	afterEach: function() {

		// Unmock animation complete
		$.fn.animationComplete = animationCompleteFn;
		enableMaxTransWidth();
	}
} );

/*
NOTES:
Our default transition handler now has either one or two animationComplete calls - two if there are two pages in play (from and to)
To is required, so each async function must call start() onToComplete, not onFromComplete.
*/
QUnit.test( "change() applies perspective class to mobile viewport for flip", function( assert ) {
	var ready = assert.async();
	assert.expect( 1 );

	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#foo" );
		},

		function() {
			onToComplete( function() {
				assert.ok( $( "body" ).hasClass( "viewport-flip" ) || $( "body" ).hasClass( "viewport-fade" ), "has viewport-flip or viewport-fade" );
				ready();
			} );

			$( "#foo > a" ).first().click();
		}
	] );
} );

QUnit.test( "change() applies transition class to mobile viewport for default transition", function( assert ) {
	var ready = assert.async();
	assert.expect( 1 );
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#baz" );
		},

		function() {
			onToComplete( function() {
				assert.ok( $( "body" ).hasClass( transitioning ), "has transitioning class" );
				ready();
			} );

			$( "#baz > a" ).click();
		}
	] );
} );

QUnit.test( "explicit transition preferred for page navigation reversal (ie back)", function( assert ) {
	var ready = assert.async();
	assert.expect( 1 );

	onToComplete( function() {
		$( "#flip-trans > a" ).click();
		onToComplete( function() {
			$( "#fade-trans > a" ).click();
			onToComplete( function() {
				assert.ok( $( "#flip-trans" ).hasClass( "fade" ), "has fade class" );
				ready();
			} );
		} );
	} );

	$( "#fade-trans > a" ).click();
} );

QUnit.test( "default transition is fade", function( assert ) {
	var ready = assert.async();
	onToComplete( function() {
		assert.ok( $( "#no-trans" ).hasClass( "fade" ), "has fade class" );
		ready();
	} );

	$( "#default-trans > a" ).click();
} );

QUnit.test( "change() queues requests", function( assert ) {
	var ready = assert.async();
	assert.expect( 4 );
	var firstPage = $( "#foo" ),
		secondPage = $( "#bar" );

	$( ".ui-pagecontainer" ).pagecontainer( "change", firstPage );
	$( ".ui-pagecontainer" ).pagecontainer( "change", secondPage );

	onToComplete( function() {
		assert.ok( isTransitioningIn( firstPage ), "first page begins transition" );
		assert.ok( !isTransitioningIn( secondPage ), "second page doesn't transition yet" );
		onToComplete( function() {
			assert.ok( !isTransitioningIn( firstPage ), "first page transition should be complete" );
			assert.ok( isTransitioningIn( secondPage ), "second page should begin transitioning" );
			ready();

		} );
	} );
} );

QUnit.test( "animationComplete return value", function( assert ) {
	$.fn.animationComplete = animationCompleteFn;
	assert.equal( $( "#foo" ).animationComplete( function() {} )[ 0 ], $( "#foo" )[ 0 ] );
} );

// Reusable function for a few tests below
function testTransitionMaxWidth( assert, val, expected ) {
	assert.expect( 1 );
	var ready = assert.async();

	$.mobile.maxTransitionWidth = val;

	var transitionOccurred = false;

	onToComplete( function() {
		transitionOccurred = true;
	} );


	return setTimeout( function() {
		assert.ok( transitionOccurred === expected, ( expected ? "" : "no " ) + "transition occurred" );
		ready();
	}, 5000 );
}

QUnit.test( "maxTransitionWidth property disables transitions when value is less than browser width", function( assert ) {
	testTransitionMaxWidth( assert, $( window ).width() - 1, false );
} );

QUnit.test( "maxTransitionWidth property disables transitions when value is false", function( assert ) {
	testTransitionMaxWidth( assert, false, false );
} );
} );
