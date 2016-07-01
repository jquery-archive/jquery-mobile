/*
 * Mobile Fixed Toolbar unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
$( "html" ).height( screen.height * 3 );

function scrollDown() {
	window.scrollTo( 0, screen.height );
}

function scrollUp() {
	window.scrollTo( 0, 0 );
}

QUnit.module( "toolbar", { beforeEach: function( assert ) {
		var startTimeout;

		// Swallow the inital page change
		var ready = assert.async();
		$( document ).one( "pagechange", function() {
			clearTimeout( startTimeout );
		} );

		startTimeout = setTimeout( ready, 1000 );
} } );

QUnit.test( "Fixed header and footer transition classes are applied correctly", function( assert ) {
	var ready = assert.async();
	assert.expect( 5 );
	var selectors = "#classes-test-b, #classes-test-g, #classes-test-e," +
		"#classes-test-h,#classes-test-i,#classes-test-j, #classes-test-k";

	$.testHelper.sequence( [
		function() {
			$( selectors ).toolbar( "hide" );
			scrollDown();
		},

		function() {

			// Show first
			$( selectors ).toolbar( "show" );
		},

		function() {
			assert.hasClasses( $( "#classes-test-g" ), "slidedown" );
			assert.lacksClasses( $( "#classes-test-h" ), "slidedown" );
			assert.lacksClasses( $( "#classes-test-h" ), "in" );
			assert.hasClasses( $( "#classes-test-i" ), "slidedown" );
			assert.hasClasses( $( "#classes-test-j" ), "slideup" );

		},

		function() {
			scrollUp();
			ready();
		}
	], 1000 );
} );

QUnit.test( "The hide method is working properly", function( assert ) {
	var ready = assert.async();

	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			$( "#classes-test-g" ).toolbar( "show" );
			scrollDown();
		},

		function() {
			$( "#classes-test-g" ).toolbar( "hide" );
			assert.hasClasses( $( "#classes-test-g" ), "out" );
		},

		function() {
			assert.hasClasses( $( "#classes-test-g" ), "ui-toolbar-fixed-hidden",
				"The toolbar has the ui-toolbar-fixed-hidden class applied after hide" );
			$( "#classes-test-g" ).toolbar( "show" );

		},

		function() {
			scrollUp();
			ready();
		}

	], 700 );
} );

QUnit.test( "The show method is working properly", function( assert ) {
	var ready = assert.async();

	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			scrollDown();
		},

		function() {
			$( "#classes-test-g" ).toolbar( "hide" );
		},

		function() {
			$( "#classes-test-g" ).toolbar( "show" );

			assert.hasClasses( $( "#classes-test-g" ), "in" );
		},

		function() {
			assert.lacksClasses( $( "#classes-test-g" ), "ui-toolbar-fixed-hidden",
				"The toolbar does not have the ui-toolbar-fixed-hidden class applied after show" );

		},

		function() {
			scrollUp();
			ready();
		}
	], 700 );
} );

QUnit.test( "The toggle method is working properly", function( assert ) {
	var ready = assert.async();

	assert.expect( 3 );

	$.testHelper.sequence( [
		function() {
			scrollDown();
		},

		function() {
			$( "#classes-test-g" ).toolbar( "show" );
		},

		function() {
			assert.lacksClasses( $( "#classes-test-g" ), "ui-toolbar-fixed-hidden",
				"The toolbar does not have the ui-toolbar-fixed-hidden class" );
		},

		function() {
			$( "#classes-test-g" ).toolbar( "toggle" );
		},

		function() {
			assert.hasClasses( $( "#classes-test-g" ), "ui-toolbar-fixed-hidden",
				"The toolbar does have the ui-toolbar-fixed-hidden class" );
		},

		function() {
			$( "#classes-test-g" ).toolbar( "toggle" );
		},

		function() {
			assert.lacksClasses( $( "#classes-test-g" ), "ui-toolbar-fixed-hidden",
				"The toolbar does not have the ui-toolbar-fixed-hidden class" );
		},

		function() {
			scrollUp();
			ready();
		}

	], 500 );
} );

QUnit.test( "Fullscreen toolbars add classes to page", function( assert ) {
	var ready = assert.async();
	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#fullscreen-test-a" );
		},

		function() {
			assert.hasClasses( $( "#classes-test-l" ).closest( ".ui-page" ),
				"ui-toolbar-page-header-fullscreen",
				"Parent page of a fullscreen header has class ui-page-header-fullscreen" );
			assert.hasClasses( $( "#classes-test-m" ).closest( ".ui-page" ),
				"ui-toolbar-page-footer-fullscreen",
				"Parent page of a fullscreen footer has class ui-page-header-fullscreen" );
		},

		function() {
			scrollUp();
			ready();
		}
	], 500 );
} );

var asyncTestFooterAndHeader = function( assert, pageSelector, visible ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", pageSelector );
		},

		function() {
			var $footer = $.mobile.activePage.find( ".ui-toolbar-footer" ),
				$header = $.mobile.activePage.find( ".ui-toolbar-header" ),
				hiddenStr = visible ? "hidden" : "visible";

			assert.equal( $footer.length, 1, "there should be one footer" );
			assert.equal( $header.length, 1, "there should be one header" );

			assert.equal( !$footer.hasClass( "ui-toolbar-fixed-hidden" ), visible,
				"the footer should be " + hiddenStr );
			assert.equal( !$header.hasClass( "ui-toolbar-fixed-hidden" ), visible,
				"the header should be " + hiddenStr );

			$( ".ui-pagecontainer" ).pagecontainer( "change", "#default" );
		},

		ready
	] );
};

QUnit.test( "data-visible-on-page-show hides toolbars when false", function( assert ) {
	asyncTestFooterAndHeader( assert, "#page-show-visible-false", false );
} );

QUnit.test( "data-visible-on-page-show shows toolbars when explicitly true", function( assert ) {
	asyncTestFooterAndHeader( assert, "#page-show-visible-true", true );
} );

QUnit.test( "data-visible-on-page-show shows toolbars when undefined", function( assert ) {
	asyncTestFooterAndHeader( assert, "#page-show-visible-undefined", true );
} );

QUnit.test( "page-retains-fixed-header-on-popup-remove", function( assert ) {
	var ready = assert.async();
	assert.expect( 1 );

	var page = $( "#page-retains-fixed-header-on-popup-removed" ).page();

	$.testHelper.pageSequence( [
		function() {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", page );
		},

		function() {
			var popup;

			popup = $( "<div data-nstest-role='popup' />" )
				.append( "<div data-nstest-role='toolbar' data-nstest-type='header' />" )
				.append( "<h1>Dynamic Popup</h1>" );

			page.append( popup );

			popup.popup( { positionTo: "window" } ).enhanceWithin();

			popup.on( "popupafterclose", function() {
				popup.remove();
				assert.hasClasses( $( ":mobile-pagecontainer" ).pagecontainer( "getActivePage" ),
					"ui-toolbar-page-header-fixed",
					"page should retain the fixed header after popup is removed" );
				ready();
			} );

			popup.popup( "open" ).popup( "close" );
		},

		function() {

			$( ".ui-pagecontainer" ).pagecontainer( "change", "#default" );

		}
	] );
} );

QUnit.test( "destroy preserves original markup", function( assert ) {
	assert.expect( 1 );
	var ready = assert.async();

	$.testHelper.pageSequence( [
		function() {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page-destroy-test" );
		},
		function() {
			var unEnhanced = $( "#testDestroyFixedFullscreen" ).clone(),
				destroyed = $( "#testDestroyFixedFullscreen" ).toolbar().toolbar( "destroy" );

			assert.ok( $.testHelper.domEqual( destroyed, unEnhanced ),
				"unEnhanced equals destroyed" );
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
		},
		ready
	] );
} );

QUnit.test( "destroy removes classes from correct page ", function( assert ) {
	var ready = assert.async();
	assert.expect( 3 );

	$.testHelper.pageSequence( [
		function() {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page-destroy-test-page-1" );

		},
		function() {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page-destroy-test-page-2" );
		},
		function() {
			var first = $( "#page-destroy-test-page-1" ),
				second = $( "#page-destroy-test-page-2" );

			assert.hasClasses( first, "ui-toolbar-page-header-fixed",
				"ui-toolbar-page-header-fixed class exists on first page before destroy" );

			$( "#headerOnFirstPage" ).toolbar( "destroy" );

			assert.lacksClasses( first, "ui-toolbar-page-header-fixed",
				"ui-toolbar-page-header-fixed class is removed from first page" );
			assert.hasClasses( second, "ui-toolbar-page-header-fixed",
				"ui-toolbar-page-header-fixed class is not removed from second page" );

			ready();
		},
		function() {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
		}
	] );
} );

// It is insufficient to check the final assortment of classes when ascertaining that the stale
// .animationComplete() handler does not do anything, because in the show/hide case the
// final assortment of classes happens to be correct. Thus, we must intercept calls to
// .addClass() and .removeClass() and make sure that only calls associated with non-stale
// .animationComplete() handlers take place.
//
// Create a scope for holding variables for this module
( function() {

	var callSequence, recordCalls, toolbar, testPageClone, testPage,
		originalAddClass = $.fn.addClass,
		originalRemoveClass = $.fn.removeClass;

	QUnit.module( "stale animation is ignored", {
		beforeEach: function() {
			if ( !testPage ) {
				testPage = $( "#stale-animation-test-page" ).remove();
			}

			recordCalls = false;
			callSequence = [];
			testPageClone = testPage.clone();
			toolbar = testPageClone.appendTo( "body" ).children( "#stale-animation-test" );

			scrollUp();

			$.fn.addClass = function() {
				if ( this.length && this[ 0 ] === toolbar[ 0 ] && recordCalls ) {
					callSequence.push( {
						addClass: Array.prototype.slice.call( arguments )
					} );
				}
				return originalAddClass.apply( this, arguments );
			};
			$.fn.removeClass = function() {
				if ( this.length && this[ 0 ] === toolbar[ 0 ] && recordCalls ) {
					callSequence.push( {
						removeClass: Array.prototype.slice.call( arguments )
					} );
				}
				return originalRemoveClass.apply( this, arguments );
			};
		},
		afterEach: function() {
			testPageClone.remove();
			$.fn.addClass = originalAddClass;
			$.fn.removeClass = originalRemoveClass;
			scrollUp();
		}
	} );

	QUnit.test( "hide() followed by show(): stale animationComplete() handler is ignored",
		function( assert ) {
			var expectedCallSequence = [

				// These are called synchronously from hide
				{ addClass: [ "out" ] },
				{ addClass: [ "reverse" ] },
				{ removeClass: [ "in" ] },

				// These are called synchronously from show
				{ removeClass: [ "out" ] },
				{ removeClass: [ "ui-toolbar-fixed-hidden" ] },
				{ addClass: [ "in" ] },

				// This is called asynchronously from show()'s animationComplete handler
				{ removeClass: [ "in" ] }
			];

			assert.expect( 1 );
			var ready = assert.async();

			$.testHelper.pageSequence( [
				function() {
					$( ":mobile-pagecontainer" )
						.pagecontainer( "change", "#stale-animation-test-page" );
				},
				function() {
					scrollDown();
					recordCalls = true;
					toolbar.toolbar( "hide" );
					toolbar.toolbar( "show" );

					// Give the animations some time
					setTimeout( function() {
						recordCalls = false;
						assert.deepEqual( callSequence, expectedCallSequence,
							"Calls to addClass() and removeClass() made by stale " +
							"animationComplete() handler are not present" );

						// Conclude test after having gone back to the main page
						$.testHelper.pageSequence( [ function() {
							$.mobile.back();
						}, ready ] );
					}, 2000 );
				}
			] );
		} );

	QUnit.test( "show() followed by hide(): stale animationComplete() handler is ignored",
		function( assert ) {
			var expectedCallSequence = [

				// These are called synchronously from show
				{ removeClass: [ "out" ] },
				{ removeClass: [ "ui-toolbar-fixed-hidden" ] },
				{ addClass: [ "in" ] },

				// These are called synchronously from hide
				{ addClass: [ "out" ] },
				{ addClass: [ "reverse" ] },
				{ removeClass: [ "in" ] },

				// These are called asynchronously from hide()'s animationComplete handler
				{ addClass: [ "ui-toolbar-fixed-hidden" ] },
				{ removeClass: [ "out" ] },
				{ removeClass: [ "reverse" ] }
			];

			assert.expect( 1 );
			var ready = assert.async();

			$.testHelper.pageSequence( [
				function() {
					$( ":mobile-pagecontainer" )
						.pagecontainer( "change", "#stale-animation-test-page" );
				},
				function() {
					toolbar.toolbar( "hide" );

					scrollDown();
					recordCalls = true;
					toolbar.toolbar( "show" );
					toolbar.toolbar( "hide" );

					// Give the animations some time
					setTimeout( function() {
						recordCalls = false;
						assert.deepEqual( callSequence, expectedCallSequence,
							"Calls to addClass() and removeClass() made by stale " +
							"animationComplete() handler are not present" );

						// Conclude test after having gone back to the main page
						$.testHelper.pageSequence( [ function() {
							$.mobile.back();
						}, ready ] );
					}, 2000 );
				}
			] );
		} );

} )();
} );
