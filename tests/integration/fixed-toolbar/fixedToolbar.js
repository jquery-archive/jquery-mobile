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

asyncTest( "Fixed header and footer transition classes are applied correctly", function() {
	expect( 5 );

	$.testHelper.sequence( [
		function() {
			$( '#classes-test-b, #classes-test-g, #classes-test-e,#classes-test-h,#classes-test-i,#classes-test-j, #classes-test-k' ).toolbar( "hide" );
			scrollDown();
		},

		function() {
			//show first
			$( '#classes-test-b, #classes-test-g, #classes-test-e,#classes-test-h,#classes-test-i,#classes-test-j, #classes-test-k' ).toolbar( "show" );
		},

		function() {
			ok( $( '#classes-test-g' ).hasClass( 'slidedown' ), 'The slidedown class should be applied by default' );
			ok( !$( '#classes-test-h' ).hasClass( 'slidedown' ), 'The slidedown class should not be applied when the header has a data-transition of "none"' );

			ok( !$( '#classes-test-h' ).hasClass( 'in' ), 'The "in" class should not be applied when the header has a data-transition of "none"' );
			ok( $( '#classes-test-i' ).hasClass( 'slidedown' ), 'The "slidedown" class should  be applied when the header has a data-transition of "slide"' );
			ok( $( '#classes-test-j' ).hasClass( 'slideup' ), 'The "slideup" class should  be applied when the footer has a data-transition of "slide"' );

		},

		function() {
			scrollUp();
			start();
		}
	], 1000 );

} );


asyncTest( "The hide method is working properly", function() {

	expect( 2 );

	$.testHelper.sequence( [
		function() {
			$( '#classes-test-g' ).toolbar( "show" );
			scrollDown();
		},

		function() {
			$( '#classes-test-g' ).toolbar( "hide" );

			ok( $( '#classes-test-g' ).hasClass( 'out' ), 'The out class should be applied when hide is called' );
		},

		function() {
			ok( $( '#classes-test-g' ).hasClass( 'ui-fixed-hidden' ), 'The toolbar has the ui-fixed-hidden class applied after hide' );
			$( '#classes-test-g' ).toolbar( "show" );

		},

		function() {
			scrollUp();
			start();
		}

	], 700 );
} );

asyncTest( "The show method is working properly", function() {

	expect( 2 );

	$.testHelper.sequence( [
		function() {
			scrollDown();
		},

		function() {
			$( '#classes-test-g' ).toolbar( "hide" );
		},

		function() {
			$( '#classes-test-g' ).toolbar( "show" );

			ok( $( '#classes-test-g' ).hasClass( 'in' ), 'The in class should be applied when show is called' );
		},

		function() {
			ok( !$( '#classes-test-g' ).hasClass( 'ui-fixed-hidden' ), 'The toolbar does not have the ui-fixed-hidden class applied after show' );

		},

		function() {
			scrollUp();
			start();
		}
	], 700 );
} );

asyncTest( "The toggle method is working properly", function() {

	expect( 3 );

	$.testHelper.sequence( [
		function() {
			scrollDown();
		},

		function() {
			$( '#classes-test-g' ).toolbar( "show" );
		},

		function() {
			ok( !$( '#classes-test-g' ).hasClass( 'ui-fixed-hidden' ), 'The toolbar does not have the ui-fixed-hidden class' );
		},

		function() {
			$( '#classes-test-g' ).toolbar( "toggle" );
		},

		function() {
			ok( $( '#classes-test-g' ).hasClass( 'ui-fixed-hidden' ), 'The toolbar does have the ui-fixed-hidden class' );
		},

		function() {
			$( '#classes-test-g' ).toolbar( "toggle" );
		},

		function() {
			ok( !$( '#classes-test-g' ).hasClass( 'ui-fixed-hidden' ), 'The toolbar does not have the ui-fixed-hidden class' );

		},

		function() {
			scrollUp();
			start();
		}

	], 500 );
} );

asyncTest( "Fullscreen toolbars add classes to page", function() {
	expect( 2 );

	$.testHelper.sequence( [
		function() {
			$.mobile.changePage( "#fullscreen-test-a" );
		},

		function() {
			ok( $( '#classes-test-l' ).closest( ".ui-page" ).hasClass( "ui-page-header-fullscreen" ), "Parent page of a fullscreen header has class ui-page-header-fullscreen" );
			ok( $( '#classes-test-m' ).closest( ".ui-page" ).hasClass( "ui-page-footer-fullscreen" ), "Parent page of a fullscreen footer has class ui-page-header-fullscreen" );
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

	var nextpageheader = $( "#persist-test-b .ui-header-fixed" ),
		nextpagefooter = $( "#persist-test-b .ui-footer-fixed" );


	$.testHelper.pageSequence( [
		function() {
			ok( nextpageheader.length && nextpagefooter.length, "next page has fixed header and fixed footer" );
			$.mobile.changePage( "#persist-test-a" );
		},

		function() {
			$( "#persist-test-b" )
				.one( "pagebeforeshow", function() {
					ok( nextpageheader.parent( ".ui-mobile-viewport" ).length, "fixed header and footer are now a child of page container" );
				} );

			$.mobile.changePage( "#persist-test-b" );
		},

		function() {
			ok( nextpageheader.parent( ".ui-page" ).length, "fixed header and footer are now a child of page again" );
			$.mobile.changePage( "#default" );
		},

		start
	] );
} );

asyncTest( "The persistent headers should work without a footer", function() {

	expect( 3 );

	$( "#persist-test-c, #persist-test-d" ).page();

	var nextpageheader = $( "#persist-test-d .ui-header-fixed" );

	$.testHelper.pageSequence( [
		function() {
			ok( nextpageheader.length, "next page has fixed header and fixed footer" );
			$.mobile.changePage( "#persist-test-c" );
		},

		function() {
			$( "#persist-test-d" )
				.one( "pagebeforeshow", function() {
					deepEqual( nextpageheader.parent()[ 0 ], $.mobile.pageContainer[ 0 ], "fixed header is now a child of page container" );
				} );

			$.mobile.changePage( "#persist-test-d" );
		},

		function() {
			deepEqual( nextpageheader.parent()[ 0 ], $.mobile.activePage[ 0 ], "fixed header is now a child of page again" );
			$.mobile.changePage( "#default" );
		},

		start
	] );
} );

asyncTest( "The persistent footers should work without a header", function() {

	expect( 3 );

	$( "#persist-test-e, #persist-test-f" ).page();

	var nextpagefooter = $( "#persist-test-f .ui-footer-fixed" );

	$.testHelper.pageSequence( [
		function() {
			ok( nextpagefooter.length, "next page has fixed footer and fixed footer" );
			$.mobile.changePage( "#persist-test-e" );
		},

		function() {
			$( "#persist-test-f" )
				.one( "pagebeforeshow", function() {
					deepEqual( nextpagefooter.parent()[ 0 ], $.mobile.pageContainer[ 0 ], "fixed footer is now a child of page container" );
				} );

			$.mobile.changePage( "#persist-test-f" );
		},

		function() {
			deepEqual( nextpagefooter.parent()[ 0 ], $.mobile.activePage[ 0 ], "fixed footer is now a child of page again" );
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
			var $footer = $.mobile.activePage.find( ".ui-footer" ),
				$header = $.mobile.activePage.find( ".ui-header" ),
				hiddenStr = visible ? "hidden" : "visible";

			equal( $footer.length, 1, "there should be one footer" );
			equal( $header.length, 1, "there should be one header" );

			equal( !$footer.hasClass( "ui-fixed-hidden" ), visible, "the footer should be " + hiddenStr );
			equal( !$header.hasClass( "ui-fixed-hidden" ), visible, "the header should be " + hiddenStr );

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

asyncTest( "page-retains-fixed-header-on-popup-remove", function() {
	expect( 1 );

	var page = $( "#page-retains-fixed-header-on-popup-removed" ).page();

	$.testHelper.pageSequence( [
		function() {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", page );
		},

		function() {
			var popup;

			popup = $( "<div data-nstest-role='popup' />" )
				.append( "<div data-nstest-role='header' />" )
				.append( "<h1>Dynamic Popup</h1>" );

			page.append( popup );

			popup.popup( { positionTo: "window" } ).enhanceWithin();

			popup.on( "popupafterclose", function() {
				popup.remove();
				ok( $( ":mobile-pagecontainer" ).pagecontainer( "getActivePage" )
					.hasClass( "ui-page-header-fixed" ),
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

asyncTest( "destroy removes classes from correct page ", function() {
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

			ok( first.hasClass( "ui-page-header-fixed" ) === true, "ui-page-header-fixed class exists on first page before destroy" );

			var firstHeader = $( "#headerOnFirstPage" ).toolbar( "destroy" );

			ok( first.hasClass( "ui-page-header-fixed" ) === false, "ui-page-header-fixed class is removed from first page" );
			ok( second.hasClass( "ui-page-header-fixed" ) === true, "ui-page-header-fixed class is not removed from second page" );

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

	var callSequence, recordCalls, toolbar, testPageClone,
		originalAddClass = $.fn.addClass,
		originalRemoveClass = $.fn.removeClass,
		testPage = $( "#stale-animation-test-page" ).remove();

	module( "stale animation is ignored", {
		setup: function() {
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
				{ addClass: [ "out reverse" ] },
				{ removeClass: [ "in" ] },

				// These are called synchronously from show
				{ removeClass: [ "out ui-fixed-hidden" ] },
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
						console.log( "hide/show: " + toolbar.attr( "class" ) );

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
				{ removeClass: [ "out ui-fixed-hidden" ] },
				{ addClass: [ "in" ] },

				// These are called synchronously from hide
				{ addClass: [ "out reverse" ] },
				{ removeClass: [ "in" ] },

				// These are called asynchronously from hide()'s animationComplete handler
				{ addClass: [ "ui-fixed-hidden" ] },
				{ removeClass: [ "out reverse" ] },
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
						console.log( "show/hide: " + toolbar.attr( "class" ) );

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
