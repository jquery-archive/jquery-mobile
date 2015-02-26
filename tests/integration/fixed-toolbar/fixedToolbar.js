/*
 * mobile Fixed Toolbar unit tests
 */
( function( $ ) {
$( "html" ).height( screen.height * 3 );

function scrollDown() {
	window.scrollTo( 0, screen.height );
}

function scrollUp() {
	window.scrollTo( 0, 0 );
}

module( "toolbar", { setup: function() {
		var startTimeout;

		// swallow the inital page change
		stop();
		$( document ).one( "pagechange", function() {
			clearTimeout( startTimeout );
		} );

		startTimeout = setTimeout( start, 1000 );
} } );

asyncTest( "Fixed header and footer transition classes are applied correctly", function( assert ) {
	expect( 5 );
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
			start();
		}
	], 1000 );

} );

asyncTest( "The hide method is working properly", function( assert ) {

	expect( 2 );

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
			start();
		}

	], 700 );
} );

asyncTest( "The show method is working properly", function( assert ) {

	expect( 2 );

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
			start();
		}
	], 700 );
} );

asyncTest( "The toggle method is working properly", function( assert ) {

	expect( 3 );

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
			start();
		}

	], 500 );
} );

asyncTest( "Fullscreen toolbars add classes to page", function( assert ) {
	expect( 2 );

	$.testHelper.sequence( [
		function() {
			$.mobile.changePage( "#fullscreen-test-a" );
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
			start();
		}
	], 500 );
} );

asyncTest( "The persistent headers and footers are working properly", function() {

	expect( 3 );

	$( "#persist-test-b, #persist-test-a" ).page();

	var nextpageheader = $( "#persist-test-b .ui-toolbar-header-fixed" ),
		nextpagefooter = $( "#persist-test-b .ui-toolbar-footer-fixed" );

	$.testHelper.pageSequence( [
		function() {
			ok( nextpageheader.length && nextpagefooter.length,
				"next page has fixed header and fixed footer" );
			$.mobile.changePage( "#persist-test-a" );
		},

		function() {
			$( "#persist-test-b" )
				.one( "pagebeforeshow", function() {
					ok( nextpageheader.parent().parent( ".ui-mobile-viewport" ).length,
						"fixed header and footer are now a child of page container" );
				} );

			$.mobile.changePage( "#persist-test-b" );
		},

		function() {
			ok( nextpageheader.parent( ".ui-page" ).length,
				"fixed header and footer are now a child of page again" );
			$.mobile.changePage( "#default" );
		},

		start
	] );
} );

asyncTest( "The persistent headers should work without a footer", function() {

	expect( 3 );

	$( "#persist-test-c, #persist-test-d" ).page();

	var nextpageheader = $( "#persist-test-d .ui-toolbar-header-fixed" );

	$.testHelper.pageSequence( [
		function() {
			ok( nextpageheader.length, "next page has fixed header and fixed footer" );
			$.mobile.changePage( "#persist-test-c" );
		},

		function() {
			$( "#persist-test-d" )
				.one( "pagebeforeshow", function() {
					deepEqual( nextpageheader.parent().parent()[ 0 ], $.mobile.pageContainer[ 0 ],
						"fixed header is now a child of page container" );
				} );

			$.mobile.changePage( "#persist-test-d" );
		},

		function() {
			deepEqual( nextpageheader.parent()[ 0 ], $.mobile.activePage[ 0 ],
				"fixed header is now a child of page again" );
			$.mobile.changePage( "#default" );
		},

		start
	] );
} );

asyncTest( "The persistent footers should work without a header", function() {

	expect( 3 );

	$( "#persist-test-e, #persist-test-f" ).page();

	var nextpagefooter = $( "#persist-test-f .ui-toolbar-footer-fixed" );

	$.testHelper.pageSequence( [
		function() {
			ok( nextpagefooter.length, "next page has fixed footer and fixed footer" );
			$.mobile.changePage( "#persist-test-e" );
		},

		function() {
			$( "#persist-test-f" )
				.one( "pagebeforeshow", function() {
					deepEqual( nextpagefooter.parent().parent()[ 0 ], $.mobile.pageContainer[ 0 ],
						"fixed footer is now a child of page container" );
				} );

			$.mobile.changePage( "#persist-test-f" );
		},

		function() {
			deepEqual( nextpagefooter.parent()[ 0 ], $.mobile.activePage[ 0 ],
				"fixed footer is now a child of page again" );
			$.mobile.changePage( "#default" );
		},

		start
	] );
} );

var asyncTestFooterAndHeader = function( pageSelector, visible ) {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( pageSelector );
		},

		function() {
			var $footer = $.mobile.activePage.find( ".ui-toolbar-footer" ),
				$header = $.mobile.activePage.find( ".ui-toolbar-header" ),
				hiddenStr = visible ? "hidden" : "visible";

			equal( $footer.length, 1, "there should be one footer" );
			equal( $header.length, 1, "there should be one header" );

			equal( !$footer.hasClass( "ui-toolbar-fixed-hidden" ), visible,
				"the footer should be " + hiddenStr );
			equal( !$header.hasClass( "ui-toolbar-fixed-hidden" ), visible,
				"the header should be " + hiddenStr );

			$.mobile.changePage( "#default" );
		},

		start
	] );
};

asyncTest( "data-visible-on-page-show hides toolbars when false", function() {
	asyncTestFooterAndHeader( "#page-show-visible-false", false );
} );

asyncTest( "data-visible-on-page-show shows toolbars when explicitly true", function() {
	asyncTestFooterAndHeader( "#page-show-visible-true", true );
} );

asyncTest( "data-visible-on-page-show shows toolbars when undefined", function() {
	asyncTestFooterAndHeader( "#page-show-visible-undefined", true );
} );

asyncTest( "page-retains-fixed-header-on-popup-remove", function( assert ) {
	expect( 1 );

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
				start();
			} );

			popup.popup( "open" ).popup( "close" );
		},

		function() {

			$.mobile.pageContainer.change( "#default" );

		}
	] );
} );

asyncTest( "destroy preserves original markup", function() {
	expect( 1 );

	$.testHelper.pageSequence( [
		function() {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#page-destroy-test" );
		},
		function() {
			var unEnhanced = $( "#testDestroyFixedFullscreen" ).clone(),
				destroyed = $( "#testDestroyFixedFullscreen" ).toolbar().toolbar( "destroy" );

			ok( $.testHelper.domEqual( destroyed, unEnhanced ),
				"unEnhanced equals destroyed" );
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
		},
		start
	] );
} );

asyncTest( "destroy removes classes from correct page ", function( assert ) {
	expect( 3 );

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

			start();
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

	module( "stale animation is ignored", {
		setup: function() {
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
		teardown: function() {
			testPageClone.remove();
			$.fn.addClass = originalAddClass;
			$.fn.removeClass = originalRemoveClass;
			scrollUp();
		}
	} );

	asyncTest( "hide() followed by show(): stale animationComplete() handler is ignored",
		function() {
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

			expect( 1 );

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
						deepEqual( callSequence, expectedCallSequence,
							"Calls to addClass() and removeClass() made by stale " +
							"animationComplete() handler are not present" );

						// Conclude test after having gone back to the main page
						$.testHelper.pageSequence( [ function() {
							$.mobile.back();
						}, start ] );
					}, 2000 );
				}
			] );
		} );

	asyncTest( "show() followed by hide(): stale animationComplete() handler is ignored",
		function() {
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

			expect( 1 );

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
						deepEqual( callSequence, expectedCallSequence,
							"Calls to addClass() and removeClass() made by stale " +
							"animationComplete() handler are not present" );

						// Conclude test after having gone back to the main page
						$.testHelper.pageSequence( [ function() {
							$.mobile.back();
						}, start ] );
					}, 2000 );
				}
			] );
		} );

} )();
} )( jQuery );
