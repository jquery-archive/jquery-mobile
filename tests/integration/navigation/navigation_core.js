// Mobile navigation unit tests
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

$.testHelper.delayStart();

// TODO move siteDirectory over to the nav path helper
var changePageFn = $.mobile.pagecontainer.prototype.change,
	originalTitle = document.title,
	originalLinkBinding = $.mobile.linkBindingEnabled,
	siteDirectory = location.pathname.replace( /[^/]+$/, "" ),
	home = $.mobile.path.parseUrl( location.pathname ).directory,
	homeWithSearch = home + location.search;

var navigateTestRoot = function() {
	$.testHelper.openPage( "#" + location.pathname + location.search );
};

QUnit.test( "Absolute link with hash works", function( assert ) {
	var defaultIsPrevented,
		theLink = $( "#goToGoogle" ),
		theClickHandler = function( event ) {
			defaultIsPrevented = !!event.isDefaultPrevented();
			if ( event.target === theLink[ 0 ] ) {
				event.preventDefault();
			}
		};

	$.mobile.document.one( "click", theClickHandler );

	$( "#goToGoogle" ).click();

	$.mobile.document.off( "click", theClickHandler );

	assert.strictEqual( defaultIsPrevented, false,
		"Default is not prevented when clicking on external link with hash" );
} );

( function() {

	var goUrl, originalGo,
		navigatorPrototype = $.mobile.Navigator.prototype;

	QUnit.module( "Navigation encoding", {
		beforeEach: function() {
			goUrl = undefined;
			originalGo = navigatorPrototype.go;
			navigatorPrototype.go = function( url ) {
				goUrl = url;

				return originalGo.apply( this, arguments );
			};
		},
		afterEach: function() {
			navigatorPrototype.go = originalGo;
		}
	} );

	QUnit.test( "Going to a page requiring url encoding works", function( assert ) {
		var endingString = $( "#goToPercentPage" ).attr( "href" );
		var ready = assert.async();

		$.testHelper.pageSequence( [
			function() {
				$( "#goToPercentPage" ).click();
			},
			function() {
				assert.strictEqual( $.mobile.activePage.children( "#percentPageChild" ).length, 1,
					"Active page is the one loaded from the directory with a percent symbol" );

				assert.strictEqual(
					goUrl.lastIndexOf( endingString ),
					goUrl.length - endingString.length,
					"Location ends in '" + endingString + "'" );
				$.mobile.back();
			},
			ready
		] );
	} );

} )();

QUnit.module( "jquery.mobile.navigation.js", {
	beforeEach: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
		$.testHelper.navReset( homeWithSearch );
	},

	afterEach: function() {
		$.Event.prototype.which = undefined;
		$.mobile.linkBindingEnabled = originalLinkBinding;
		$.mobile.pagecontainer.prototype.change = changePageFn;
		document.title = originalTitle;
	}
} );

QUnit.test( "window.history.back() from external to internal page", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [

		// Open our test page
		function() {
			$.testHelper.openPage( "#active-state-page1" );
		},

		function() {
			assert.ok( $.mobile.activePage[ 0 ] === $( "#active-state-page1" )[ 0 ],
				"successful navigation to internal page." );

			$.testHelper.openPage( "#" + $.mobile.path.parseLocation().directory +
				"external.html" );
		},

		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "external-test",
				"successful navigation to external page." );
			window.history.back();
		},

		function() {
			assert.ok( $.mobile.activePage[ 0 ] === $( "#active-state-page1" )[ 0 ],
				"successful navigation back to internal page." );
			ready();
		}
	] );
} );

QUnit.test( "external empty page does not result in any contents", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "blank.html" );
		},

		function() {
			assert.strictEqual( $.mobile.activePage.contents().length, 0,
				"A blank page has no contents" );
			$.mobile.back();
		},

		function() {
			ready();
		}
	] );
} );

QUnit.test( "external page is removed from the DOM after pagehide", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "external.html" );
		},

		// Page is pulled and displayed in the dom
		function() {
			assert.strictEqual( $( "#external-test" ).length, 1 );
			window.history.back();
		},

		// External-test is *NOT* cached in the dom after transitioning away
		function() {
			assert.strictEqual( $( "#external-test" ).length, 0 );
			ready();
		}
	] );
} );

QUnit.test( "preventDefault on pageremove prevents external page from being removed",
	function( assert ) {
		var ready = assert.async();
		var preventRemoval = true,
			removeCallback = function( e ) {
				if ( preventRemoval ) {
					e.preventDefault();
				}
			};

		$( document ).bind( "pageremove", removeCallback );

		$.testHelper.pageSequence( [
			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change", "external.html" );
			},

			// Page is pulled and displayed in the dom
			function() {
				assert.strictEqual( $( "#external-test" ).length, 1 );
				window.history.back();
			},

			// External-test *IS* cached in the dom after transitioning away
			function() {
				assert.strictEqual( $( "#external-test" ).length, 1 );

				// Switch back to the page again!
				$( ".ui-pagecontainer" ).pagecontainer( "change", "external.html" );
			},

			// Page is still present and displayed in the dom
			function() {
				assert.strictEqual( $( "#external-test" ).length, 1 );

				// Now turn off our removal prevention.
				preventRemoval = false;

				window.history.back();
			},

			// External-test is *NOT* cached in the dom after transitioning away
			function() {
				assert.strictEqual( $( "#external-test" ).length, 0, "#external-test is gone" );
				$( document ).unbind( "pageremove", removeCallback );
				ready();
			}
		] );
	} );

QUnit.test( "external page is cached in the DOM after pagehide", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "cached-external.html" );
		},

		// Page is pulled and displayed in the dom
		function() {
			assert.strictEqual( $( "#external-test-cached" ).length, 1 );
			window.history.back();
		},

		// External test page is cached in the dom after transitioning away
		function() {
			assert.strictEqual( $( "#external-test-cached" ).length, 1 );
			ready();
		}
	] );
} );

QUnit.test( "external page is cached after pagehide when option is set globally",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.mobile.page.prototype.options.domCache = true;
				$( ".ui-pagecontainer" ).pagecontainer( "change", "external.html" );
			},

			// Page is pulled and displayed in the dom
			function() {
				assert.strictEqual( $( "#external-test" ).length, 1 );
				window.history.back();
			},

			// External test page is cached in the dom after transitioning away
			function() {
				assert.strictEqual( $( "#external-test" ).length, 1 );
				$.mobile.page.prototype.options.domCache = false;
				$( "#external-test" ).remove();
				ready();
			} ] );
	} );

QUnit.test( "page last scroll distance is remembered when navigating to/from pages",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$( "body" ).height( $( window ).height() + 500 );
				$( ".ui-pagecontainer" ).pagecontainer( "change", "external.html" );
			},

			function() {

				// Wait for the initial scroll to 0
				setTimeout( function() {
					window.scrollTo( 0, 300 );
					assert.strictEqual( $( window ).scrollTop(), 300,
						"scrollTop is 300 after setting it" );
				}, 300 );

				// Wait for the scrollstop to fire and for the scroll to be recorded 100 ms
				// afterward (see changes made to handle hash scrolling in some browsers)
				setTimeout( navigateTestRoot, 500 );
			},

			function() {
				history.back();
			},

			function() {

				// Give the silentScroll function some time to kick in.
				setTimeout( function() {
					assert.strictEqual( $( window ).scrollTop(), 300,
						"scrollTop is 300 after returning to the page" );
					$( "body" ).height( "" );
					ready();
				}, 300 );
			}
		] );
	} );

QUnit.test( "forms with data attribute ajax set to false will not call change()",
	function( assert ) {
		var ready = assert.async();
		var called = false;
		var newChangePage = function() {
			called = true;
		};

		$.testHelper.sequence( [

			// Avoid initial page load triggering change() early
			function() {
				$.mobile.pagecontainer.prototype.change = newChangePage;

				$( "#non-ajax-form" ).one( "submit", function( event ) {
					assert.ok( true, "submit callbacks are fired" );
					event.preventDefault();
				} ).submit();
			},

			function() {
				assert.ok( !called, "change page should not be called" );
				ready();
			} ], 1000 );
	} );

QUnit.test(
	"forms with data-ajax attribute absent/set or set to anything but false will call change()",
	function( assert ) {
		var ready = assert.async();
		var called = 0,
			newChangePage = function() {
				called++;
			};

		$.testHelper.sequence( [

			// Avoid initial page load triggering change() early
			function() {
				$.mobile.pagecontainer.prototype.change = newChangePage;
				$( "#ajax-form, #rand-ajax-form" ).submit();
			},

			function() {
				assert.ok( called >= 2, "change page should be called at least twice" );
				ready();
			} ], 300 );
	} );

QUnit.test( "anchors with no href attribute will do nothing when clicked",
	function( assert ) {
		var ready = assert.async();
		var fired = false;

		$( window ).bind( "hashchange.temp", function() {
			fired = true;
		} );

		$( "<a>test</a>" ).appendTo( $.mobile.firstPage ).click();

		setTimeout( function() {
			assert.strictEqual( fired, false, "hash shouldn't change after click" );
			$( window ).unbind( "hashchange.temp" );
			ready();
		}, 500 );
	} );

QUnit.test( "urlHistory is working properly", function( assert ) {

	// UrlHistory
	assert.strictEqual( $.type( $.mobile.navigate.history.stack ), "array",
		"urlHistory.stack is an array" );

	// Preload the stack
	$.mobile.navigate.history.stack[ 0 ] = { url: "foo", transition: "bar" };
	$.mobile.navigate.history.stack[ 1 ] = { url: "baz", transition: "shizam" };
	$.mobile.navigate.history.stack[ 2 ] = { url: "shizoo", transition: "shizaah" };

	// Active index
	assert.strictEqual( $.mobile.navigate.history.activeIndex, 0, "urlHistory.activeIndex is 0" );

	// GetActive
	assert.strictEqual( $.type( $.mobile.navigate.history.getActive() ), "object",
		"active item is an object" );
	assert.strictEqual( $.mobile.navigate.history.getActive().url, "foo",
		"active item has url foo" );
	assert.strictEqual( $.mobile.navigate.history.getActive().transition, "bar",
		"active item has transition bar" );

	// Get prev / next
	assert.strictEqual( $.mobile.navigate.history.getPrev(), undefined,
		"urlHistory.getPrev() is undefined when active index is 0" );
	$.mobile.navigate.history.activeIndex = 1;
	assert.strictEqual( $.mobile.navigate.history.getPrev().url, "foo",
		"urlHistory.getPrev() has url foo when active index is 1" );
	$.mobile.navigate.history.activeIndex = 0;
	assert.strictEqual( $.mobile.navigate.history.getNext().url, "baz",
		"urlHistory.getNext() has url baz when active index is 0" );

	// Add new
	$.mobile.navigate.history.activeIndex = 2;
	$.mobile.navigate.history.add( "test" );
	assert.strictEqual( $.mobile.navigate.history.stack.length, 4,
		"urlHistory.addNew() adds an item after the active index" );
	assert.strictEqual( $.mobile.navigate.history.activeIndex, 3,
		"urlHistory.addNew() moves the activeIndex to the newly added item" );

	// ClearForward
	$.mobile.navigate.history.activeIndex = 0;
	$.mobile.navigate.history.clearForward();
	assert.strictEqual( $.mobile.navigate.history.stack.length, 1,
		"urlHistory.clearForward() clears the url stack after the active index" );
} );

// Url listening
function testListening( assert, prop ) {
	var stillListening = false;
	var ready = assert.async();
	$( document ).bind( "pagebeforehide", function() {
		stillListening = true;
	} );
	location.hash = "foozball";
	setTimeout( function() {
		assert.ok( prop === stillListening,
			prop + " = false disables default hashchange event handler" );
		location.hash = "";
		prop = true;
		ready();
	}, 1000 );
}

QUnit.test( "ability to disable our hash change event listening internally",
	function( assert ) {
		testListening( assert, !$.mobile.navigate.history.ignoreNextHashChange );
	} );

QUnit.test( "ability to disable our hash change event listening globally",
	function( assert ) {
		testListening( assert, $.mobile.hashListeningEnabled );
	} );

var testDataUrlHash = function( assert, linkSelector, matches ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			window.location.hash = "";
		},
		function() {
			$( linkSelector ).click();
		},
		function() {
			$.testHelper.assertUrlLocation( assert,
				$.extend( matches, {
					report: "url or hash should match"
				} )
			);

			ready();
		}
	] );
};

QUnit.test(
	"when loading a page where data-url is not defined on a subelement hash defaults to the url",
	function( assert ) {
		testDataUrlHash( assert, "#non-data-url a", {
			hashOrPush: siteDirectory + "data-url-tests/non-data-url.html"
		} );
	} );

QUnit.test( "data url works for nested paths", function( assert ) {
	var url = "foo/bar.html";
	testDataUrlHash( assert, "#nested-data-url a", { hashOrPush: home + url } );
} );

QUnit.test( "data url works for single quoted paths and roles", function( assert ) {
	var url = "foo/bar/single.html";
	testDataUrlHash( assert, "#single-quotes-data-url a", { hashOrPush: home + url } );
} );

QUnit.test( "data url works when role and url are reversed on the page element",
	function( assert ) {
		var url = "foo/bar/reverse.html";
		testDataUrlHash( assert, "#reverse-attr-data-url a", { hashOrPush: home + url } );
	} );

QUnit.test(
	"last entry chosen amongst multiple identical url history stack entries on hash change",
	function( assert ) {
		var ready = assert.async();
		var stackLength = $.mobile.navigate.history.stack.length;

		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#dup-history-first" );
			},
			function() {
				$( "#dup-history-first a" ).click();
			},
			function() {
				$( "#dup-history-second a:first" ).click();
			},
			function() {
				$( "#dup-history-first a" ).click();
			},
			function() {
				$( "#dup-history-second a:last" ).click();
			},
			function() {
				$( "#dup-history-dialog a:contains('Close')" ).click();
			},

			function() {

				// It should be the third page after whatever is in the stack to start with
				// [wherever this test starts] -> #dup-history-first -> #dup-history-second ->
				// #dup-history-first -> #dup-history-second -> dialog --close/back button-->
				// [first #dup-history-second-entry]
				assert.strictEqual( $.mobile.navigate.history.activeIndex, 3 + stackLength,
					"should be the fourth page in the stack" );
				ready();
			} ] );
	} );

QUnit.test(
	"going back from a page entered from a dialog skips past the dialog to the prev page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Setup
			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change", "#skip-dialog-first" );
			},

			// Transition to the dialog
			function() {
				$( "#skip-dialog-first a" ).click();
			},

			// Transition to the second page
			function() {
				$( "#skip-dialog a" ).click();
			},

			// Transition past the dialog via data-rel=back link on the second page
			function() {
				$( "#skip-dialog-second a" ).click();
			},

			// Make sure we're at the first page and not the dialog
			function() {
				$.testHelper.assertUrlLocation( assert, {
					hash: "skip-dialog-first",
					push: homeWithSearch + "#skip-dialog-first",
					report: "should be the first page in the sequence"
				} );

				ready();
			}
		] );
	} );

QUnit.test( "going forward from a page entered from a dialog skips the dialog and goes to " +
	"the next page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Setup
			function() {
				$.testHelper.openPage( "#skip-dialog-first" );
			},

			// Transition to the dialog
			function() {
				$( "#skip-dialog-first a" ).click();
			},

			// Transition to the second page
			function() {
				$( "#skip-dialog a" ).click();
			},

			// Transition to back past the dialog
			function() {
				window.history.back();
			},

			// Transition to the second page past the dialog through history
			function() {
				window.history.forward();
			},

			// Make sure we're on the second page and not the dialog
			function() {
				$.testHelper.assertUrlLocation( assert, {
					hash: "skip-dialog-second",
					push: homeWithSearch + "#skip-dialog-second",
					report: "should be the second page after the dialog"
				} );

				ready();
			} ] );
	} );

QUnit.test(
	"going back from a stale dialog history entry does not cause the base tag to be reset",
	function( assert ) {
		var ready = assert.async();
		var baseHRef;

		assert.expect( 1 );

		$.testHelper.pageSequence( [

			// Setup
			function() {
				$.testHelper.openPage( "#dialog-base-tag-test-page" );
			},

			// Go to page that launches dialog
			function() {
				$( "#dialog-base-tag-test-page a" ).click();
			},

			// Record the base href and launch the dialog
			function() {
				baseHRef = $( "base" ).attr( "href" );
				$( "a#go-to-dialog" ).click();
			},

			// Close the dialog - this assumes a close button link will be added to the dialog as
			// part of the enhancement process
			function() {
				$( "#dialog-base-tag-test a" ).click();
			},

			function() {

				// $.testHelper.pageSequence cannot be used here because no page changes occur
				$.testHelper.sequence( [

					// Go forward to reach the now-stale dialogHashKey history entry
					function() {
						window.history.forward();
					},

					// Go back
					function() {
						window.history.back();
					},

					// Make sure the base href is unchanged from the recorded value, and back up to
					// the start page
					function() {
						assert.strictEqual( $( "base" ).attr( "href" ), baseHRef,
							"href of base tag is unchanged" );

						// Return to start page
						$.testHelper.pageSequence( [

							// Go back to the setup page
							function() {
								window.history.back();
							},

							// Go back to the start page
							function() {
								window.history.back();
							},

							// Conclude the test
							function() {
								ready();
							}
						] );
					}
				], 2000 );
			}
		] );
	} );

QUnit.test( "opening a dialog, closing it, moving forward, and opening it again, does not " +
	"result in a dialog that needs to be closed twice",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Setup
			function() {
				$.testHelper.openPage( "#dialog-double-hash-test" );
			},

			// Transition to the dialog
			function() {
				$( "#dialog-double-hash-test a" ).click();
			},

			// Close the dialog
			function() {
				$( "#dialog-double-hash-test-dialog a" ).click();
			},

			// Go forward
			function() {
				window.history.forward();
			},

			// Transition to the dialog
			function() {
				$( "#dialog-double-hash-test a" ).click();
			},

			// Close the dialog
			function() {
				$( "#dialog-double-hash-test-dialog a" ).click();
			},

			// Make sure the dialog is closed
			function() {
				setTimeout( function() {
					assert.deepEqual( $( "#dialog-double-hash-test" )[ 0 ],
						$.mobile.activePage[ 0 ], "should be back to the test page" );
					ready();
				}, 800 );
			}
		] );
	} );

QUnit.test( "going back from a dialog triggered from a dialog should result in the first " +
	"dialog",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#nested-dialog-page" );
			},

			// Transition to the dialog
			function() {
				$( "#nested-dialog-page a" ).click();
			},

			// Transition to the second dialog
			function() {
				$( "#nested-dialog-first a" ).click();
			},

			// Transition to back to the first dialog
			function() {
				window.history.back();
			},

			// Make sure we're on first dialog
			function() {
				assert.deepEqual( $( ".ui-page-active" )[ 0 ], $( "#nested-dialog-first" )[ 0 ],
					"should be the first dialog" );
				ready();
			} ] );
	} );

QUnit.test( "loading a relative file path after an embedded page works", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [

		// Transition second page
		function() {
			$.testHelper.openPage( "#relative-after-embedded-page-first" );
		},

		// Transition second page
		function() {
			$( "#relative-after-embedded-page-first a" ).click();
		},

		// Transition to the relative ajax loaded page
		function() {
			$( "#relative-after-embedded-page-second a" ).click();
		},

		// Make sure the page was loaded properly via ajax
		function() {

			// Data attribute intentionally left without namespace
			assert.strictEqual( $( ".ui-page-active" ).data( "other" ), "for testing",
				"should be relative ajax loaded page" );
			ready();
		} ] );
} );

QUnit.test( "Page title updates properly when clicking back to previous page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#relative-after-embedded-page-first" );
			},

			function() {
				window.history.back();
			},

			function() {
				assert.strictEqual( document.title, "jQuery Mobile Navigation Test Suite" );
				ready();
			}
		] );
	} );

QUnit.test( "Page title updates properly when clicking a link back to first page",
	function( assert ) {
		var ready = assert.async();
		var title = document.title;

		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#ajax-title-page" );
			},

			function() {
				$( "#titletest1" ).click();
			},

			function() {
				assert.strictEqual( document.title, "Title Tag" );
				$.mobile.activePage.find( "#title-check-link" ).click();
			},

			function() {
				assert.strictEqual( document.title, title );
				ready();
			}
		] );
	} );

QUnit.test( "Page title updates properly from title tag when loading an external page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#ajax-title-page" );
			},

			function() {
				$( "#titletest1" ).click();
			},

			function() {
				assert.strictEqual( document.title, "Title Tag" );
				ready();
			}
		] );
	} );

QUnit.test( "Page title updates properly from data-title attr  when loading an external page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#ajax-title-page" );
			},

			function() {
				$( "#titletest2" ).click();
			},

			function() {
				assert.strictEqual( document.title, "Title Attr" );
				ready();
			}
		] );
	} );

QUnit.test( "Page title updates properly from heading text in header when loading an " +
	"external page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#ajax-title-page" );
			},

			function() {
				$( "#titletest3" ).click();
			},

			function() {
				assert.strictEqual( document.title, "Title Heading" );
				ready();
			}
		] );
	} );

QUnit.test( "Page links to the current active page result in the same active page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#self-link" );
			},

			function() {
				$( "a[href='#self-link']" ).click();
			},

			function() {
				assert.deepEqual( $.mobile.activePage[ 0 ], $( "#self-link" )[ 0 ],
					"self-link page is still the active page" );
				ready();
			}
		] );
	} );

QUnit.test(
	"links on subdirectory pages with query params append the params and load the page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#data-url-tests/non-data-url.html" );
			},

			function() {
				$( "#query-param-anchor" ).click();
			},

			function() {
				$.testHelper.assertUrlLocation( assert, {

					// TODO note there's no guarantee that the query params will remain in this
					// order we should fix the comparison to take a callback and do something more
					// complex
					hashOrPush: home + "data-url-tests/non-data-url.html?foo=bar",
					report: "the hash or url has query params"
				} );

				assert.ok( $( ".ui-page-active" ).jqmData( "url" ).indexOf( "?foo=bar" ) > -1,
					"the query params are in the data url" );
				ready();
			}
		] );
	} );

QUnit.test( "identical query param link doesn't add additional set of query params",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#data-url-tests/non-data-url.html" );
			},

			function() {
				$( "#query-param-anchor" ).click();
			},

			function() {
				$.testHelper.assertUrlLocation( assert, {

					// TODO note there's no guarantee that the query params will remain in this
					//	  order we should fix the comparison to take a callback and do something
					//	  more complex
					hashOrPush: home + "data-url-tests/non-data-url.html?foo=bar",
					report: "the hash or url has query params"
				} );

				$( "#query-param-anchor" ).click();
			},

			function() {
				$.testHelper.assertUrlLocation( assert, {

					// TODO note there's no guarantee that the query params will remain in this
					//	  order we should fix the comparison to take a callback and do something
					//	  more complex
					hashOrPush: home + "data-url-tests/non-data-url.html?foo=bar",
					report: "the hash or url still has query params"
				} );

				ready();
			}
		] );
	} );

// Special handling inside navigation because query params must be applied to the hash
// or absolute reference and dialogs apply extra information int the hash that must be removed
QUnit.test( "query param link from a dialog to itself should be a not add another dialog",
	function( assert ) {
		var ready = assert.async();
		var firstDialogLoc;

		$.testHelper.pageSequence( [

			// Open our test page
			function() {
				$.testHelper.openPage( "#dialog-param-link" );
			},

			// Navigate to the subdirectory page with the query link
			function() {
				$( "#dialog-param-link a" ).click();
			},

			// Navigate to the query param self reference link
			function() {
				$( "#dialog-param-link-page a" ).click();
			},

			// Attempt to navigate to the same link
			function() {

				// Store the current hash for comparison (with one dialog hash key)
				firstDialogLoc = location.hash || location.href;
				$( "#dialog-param-link-page a" ).click();
			},

			function() {
				assert.strictEqual( location.hash || location.href, firstDialogLoc,
					"additional dialog hash key not added" );
				ready();
			}
		] );
	} );

QUnit.test( "query data passed as a string to change() is appended to URL",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Open our test page
			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change",
					"form-tests/changepage-data.html",
					{
						data: "foo=1&bar=2"
					}
				);
			},

			function() {
				$.testHelper.assertUrlLocation( assert, {
					hashOrPush: home + "form-tests/changepage-data.html?foo=1&bar=2",
					report: "the hash or url still has query params"
				} );

				ready();
			}
		] );
	} );

QUnit.test( "query data passed as an object to change() is appended to URL",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Open our test page
			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change",
					"form-tests/changepage-data.html", {
					data: {
						foo: 3,
						bar: 4
					}
				} );
			},

			function() {
				$.testHelper.assertUrlLocation( assert, {
					hashOrPush: home + "form-tests/changepage-data.html?foo=3&bar=4",
					report: "the hash or url still has query params"
				} );

				ready();
			}
		] );
	} );

QUnit.test( "refresh of a dialog url should not duplicate page", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [

		// Open our test page
		function() {
			assert.strictEqual( $( ".foo-class" ).length, 1,
				"should only have one instance of foo-class in the document" );
			location.hash = "#foo&ui-state=dialog";
		},

		function() {
			$.testHelper.assertUrlLocation( assert, {
				hash: "foo&ui-state=dialog",
				push: homeWithSearch + "#foo&ui-state=dialog",
				report: "hash should match what was loaded"
			} );

			assert.strictEqual( $( ".foo-class" ).length, 1,
				"should only have one instance of foo-class in the document" );
			ready();
		}
	] );
} );

QUnit.test( "internal form with no action submits to document URL", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [

		// Open our test page
		function() {
			$.testHelper.openPage( "#internal-no-action-form-page" );
		},

		function() {
			$( "#internal-no-action-form-page form" ).eq( 0 ).submit();
		},

		function() {
			$.testHelper.assertUrlLocation( assert, {
				hashOrPush: home + "?foo=1&bar=2",
				report: "hash should match what was loaded"
			} );

			ready();
		}
	] );
} );

QUnit.test( "external page containing form with no action submits to page URL",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Open our test page
			function() {
				$.testHelper.openPage( "#internal-no-action-form-page" );
			},

			function() {
				$( "#internal-no-action-form-page a" ).eq( 0 ).click();
			},

			function() {
				$( "#external-form-no-action-page form" ).eq( 0 ).submit();
			},

			function() {
				$.testHelper.assertUrlLocation( assert, {
					hashOrPush: home + "form-tests/form-no-action.html?foo=1&bar=2",
					report: "hash should match page url and not document url"
				} );

				ready();
			}
		] );
	} );

QUnit.test( "handling of active button state when navigating", 1, function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [

		// Open our test page
		function() {
			$.testHelper.openPage( "#active-state-page1" );
		},

		function() {
			$( "#active-state-page1 a" ).eq( 0 ).click();
		},

		function() {
			$( "#active-state-page2 a" ).eq( 0 ).click();
		},

		function() {
			assert.lacksClasses( $( "#active-state-page1 a" ), "ui-button-active",
				"No button should not have class ui-button-active" );
			ready();
		}
	] );
} );

// Issue 2444 https://github.com/jquery/jquery-mobile/issues/2444 results from preventing spurious
// hash changes
QUnit.test( "dialog should return to its parent page when opened and closed multiple times",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Open our test page
			function() {
				$.testHelper.openPage( "#default-trans-dialog" );
			},

			function() {
				$.mobile.activePage.find( "a" ).click();
			},

			function() {
				window.history.back();
			},

			function() {
				assert.deepEqual( $.mobile.activePage[ 0 ], $( "#default-trans-dialog" )[ 0 ] );
				$.mobile.activePage.find( "a" ).click();
			},

			function() {
				window.history.back();
			},

			function() {
				assert.deepEqual( $.mobile.activePage[ 0 ], $( "#default-trans-dialog" )[ 0 ] );
				ready();
			}
		] );
	} );

QUnit.test( "clicks with middle mouse button are ignored", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$.testHelper.openPage( "#odd-clicks-page" );
		},

		function() {
			$( "#right-or-middle-click" ).click();
		},

		// Make sure the page is opening first without the mocked button click value only necessary
		// to prevent issues with test specific fixtures
		function() {
			assert.deepEqual( $.mobile.activePage[ 0 ], $( "#odd-clicks-page-dest" )[ 0 ] );
			$.testHelper.openPage( "#odd-clicks-page" );

			// Mock the which value to simulate a middle click
			$.Event.prototype.which = 2;
		},

		function() {
			$( "#right-or-middle-click" ).click();
		},

		function( timeout ) {
			assert.ok( timeout, "page event handler timed out due to ignored click" );
			assert.ok( $.mobile.activePage[ 0 ] !== $( "#odd-clicks-page-dest" )[ 0 ],
				"pages are not the same" );
			ready();
		}
	] );
} );

QUnit.test( "disabling link binding disables nav via links and highlighting",
	function( assert ) {
		var ready = assert.async();
		$.mobile.linkBindingEnabled = false;

		$.testHelper.pageSequence( [
			function() {
				$.testHelper.openPage( "#bar" );
			},

			function() {
				$.mobile.activePage.find( "a" ).click();
			},

			function( timeout ) {
				assert.lacksClasses( $.mobile.activePage.find( "a" ), "ui-button-active",
					"vlick handler doesn't add the activebutton class" );
				assert.ok( timeout, "no page change was fired" );
				ready();
			}
		] );
	} );

QUnit.test( "handling of button active state when back-button-navigating", 2,
	function( assert ) {
		var ready = assert.async();

		$.testHelper.pageSequence( [

			// Open our test page
			function() {
				$.testHelper.openPage( "#active-state-page1" );
			},

			function() {
				$( "#active-state-page1 a" ).eq( 0 ).click();
			},

			function() {
				$( "#active-state-page2 a" ).eq( 1 ).click();
			},

			function() {
				$( "#active-state-page1 a" ).eq( 0 ).click();
			},

			function() {
				$( "#active-state-page2 a" ).each( function() {
					assert.lacksClasses( this, "ui-button-active",
						"No button should have class ui-button-active" );
				} );
				ready();
			}
		] );
	} );

QUnit.test( "can navigate to dynamically injected page with dynamically injected link",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Open our test page
			function() {
				$.testHelper.openPage( "#inject-links-page" );
			},

			function() {
				var $ilpage = $( "#inject-links-page" ),
					$link = $( "<a href='#injected-test-page'>injected-test-page link</a>" );

				// Make sure we actually navigated to the expected page.
				assert.ok( $.mobile.activePage[ 0 ] === $ilpage[ 0 ],
					"navigated successfully to #inject-links-page" );

				// Now dynamically insert a page.
				$ilpage.parent()
					.append( "<div data-role='page' id='injected-test-page'>testing...</div>" );

				// Now inject a link to this page dynamically and attempt to navigate
				// to the page we just inserted.
				$link.appendTo( $ilpage ).click();
			},

			function() {

				// Make sure we actually navigated to the expected page.
				assert.ok( $.mobile.activePage[ 0 ] === $( "#injected-test-page" )[ 0 ],
					"navigated successfully to #injected-test-page" );

				ready();
			}
		] );
	} );

QUnit.test( "application url with dialogHashKey loads first application page",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [

			// Open our test page
			function() {

				// Navigate to any page except the first page of the application.
				$.testHelper.openPage( "#foo" );
			},

			function() {
				assert.ok( $.mobile.activePage[ 0 ] === $( "#foo" )[ 0 ],
					"navigated successfully to #foo" );

				// Now navigate to an hash that contains just a dialogHashKey.
				$( ".ui-pagecontainer" ).pagecontainer( "change", "#" + $.mobile.dialogHashKey );
			},

			function() {

				// Make sure we actually navigated to the first page.
				assert.ok( $.mobile.activePage[ 0 ] === $.mobile.firstPage[ 0 ],
					"navigated successfully to first-page" );

				// Now make sure opening the page didn't result in page duplication.
				assert.hasClasses( $.mobile.firstPage, "first-page",
					"first page has expected class" );
				assert.strictEqual( $( ".first-page" ).length, 1,
					"first page was not duplicated" );

				ready();
			}
		] );
	} );

QUnit.test( "navigate to non-existent internal page throws pagechangefailed",
	function( assert ) {
		var ready = assert.async();
		var pagechangefailed = false,
			pageChangeFailedCB = function() {
				pagechangefailed = true;
		};

		$( document ).bind( "pagechangefailed", pageChangeFailedCB );

		$.testHelper.pageSequence( [

			// Open our test page
			function() {

				// Make sure there's only one copy of the first-page in the DOM to begin with.
				assert.hasClasses( $.mobile.firstPage, "first-page",
					"first page has expected class" );
				assert.strictEqual( $( ".first-page" ).length, 1,
					"first page was not duplicated" );

				// Navigate to any page except the first page of the application.
				$.testHelper.openPage( "#foo" );
			},

			function() {
				var $foo = $( "#foo" );
				assert.deepEqual( $.mobile.activePage[ 0 ], $foo[ 0 ],
					"navigated successfully to #foo" );
				assert.strictEqual( pagechangefailed, false, "no page change failures" );

				// Now navigate to a non-existent page.
				$foo.find( "#bad-internal-page-link" ).click();
			},

			function() {

				// Make sure a pagechangefailed event was triggered.
				assert.strictEqual( pagechangefailed, true, "pagechangefailed dispatched" );

				// Make sure we didn't navigate away from #foo.
				assert.ok( $.mobile.activePage[ 0 ] === $( "#foo" )[ 0 ],
					"did not navigate away from #foo" );

				// Now make sure opening the page didn't result in page duplication.
				assert.strictEqual( $( ".first-page" ).length, 1,
					"first page was not duplicated" );

				$( document ).unbind( "pagechangefailed", pageChangeFailedCB );

				ready();
			}
		] );
	} );

QUnit.test( "prefetched links with data rel dialog result in a dialog", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [

		// Open our test page
		function() {

			// Navigate to any page except the first page of the application.
			$.testHelper.openPage( "#prefetched-dialog-page" );
		},

		function() {
			$( "#prefetched-dialog-link" ).click();
		},

		function() {
			assert.hasClasses( $.mobile.activePage, "ui-page-dialog",
				"prefetched page is rendered as a dialog" );
			ready();
		}
	] );
} );

QUnit.test( "first page gets reloaded if pruned from the DOM", function( assert ) {
	var ready = assert.async();
	var hideCallbackTriggered = false;

	function hideCallback( e ) {
		var page = e.target;
		assert.ok( ( page === $.mobile.firstPage[ 0 ] ),
			"hide called with prevPage set to firstPage" );
		if ( page === $.mobile.firstPage[ 0 ] ) {
			$( page ).remove();
		}
		hideCallbackTriggered = true;
	}

	$( document ).bind( "pagehide", hideCallback );

	$.testHelper.pageSequence( [
		function() {

			// Make sure the first page is actually in the DOM.
			assert.ok( $.mobile.firstPage.parent().length !== 0,
				"first page is currently in the DOM" );

			// Make sure the first page is the active page.
			assert.ok( $.mobile.activePage[ 0 ] === $.mobile.firstPage[ 0 ],
				"first page is the active page" );

			// Now make sure the first page has an id that we can use to reload it.
			assert.ok( $.mobile.firstPage[ 0 ].id, "first page has an id" );

			// Make sure there is only one first page in the DOM.
			assert.strictEqual( $( ".first-page" ).length, 1,
				"only one instance of the first page in the DOM" );

			// Navigate to any page except the first page of the application.
			$.testHelper.openPage( "#foo" );
		},

		function() {

			// Make sure the active page is #foo.
			assert.ok( $.mobile.activePage[ 0 ] === $( "#foo" )[ 0 ],
				"navigated successfully to #foo" );

			// Make sure our hide callback was triggered.
			assert.ok( hideCallbackTriggered, "hide callback was triggered" );

			// Make sure the first page was actually pruned from the document.
			assert.ok( $.mobile.firstPage.parent().length === 0,
				"first page was pruned from the DOM" );
			assert.strictEqual( $( ".first-page" ).length, 0,
				"no instance of the first page in the DOM" );

			// Remove our hideCallback.
			$( document ).unbind( "pagehide", hideCallback );

			// Navigate back to the first page!
			$.testHelper.openPage( "#" + $.mobile.firstPage[ 0 ].id );
		},

		function() {
			var firstPage = $( ".first-page" );

			// We should only have one first page in the document at any time!
			assert.strictEqual( firstPage.length, 1,
				"single instance of first page recreated in the DOM" );

			// Make sure the first page in the DOM is actually a different DOM element than the
			// original one we started with.
			assert.ok( $.mobile.firstPage[ 0 ] !== firstPage[ 0 ],
				"first page is a new DOM element" );

			// Make sure we actually navigated to the new first page.
			assert.ok( $.mobile.activePage[ 0 ] === firstPage[ 0 ],
				"navigated successfully to new first-page" );

			// Reset the $.mobile.firstPage	for subsequent tests.
			// XXX: Should we just get rid of the new one and restore the old?
			$.mobile.firstPage = $.mobile.activePage;

			ready();
		}
	] );
} );

QUnit.test( "clicks are ignored where data-ajax='false' parents exist", function( assert ) {
	var ready = assert.async();
	var $disabledByParent = $( "#unhijacked-link-by-parent" ),
		$disabledByAttr = $( "#unhijacked-link-by-attr" );

	$.mobile.ignoreContentEnabled = true;

	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#link-hijacking-test" );
		},

		function() {
			$( "#hijacked-link" ).trigger( "click" );
		},

		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "link-hijacking-destination",
				"nav works for links to hijacking destination" );
			window.history.back();
		},

		function() {
			$disabledByParent.trigger( "click" );
		},

		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "link-hijacking-test",
				"click should be ignored keeping the active mobile page the same as before" );
		},

		function() {
			$disabledByAttr.trigger( "click" );
		},

		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "link-hijacking-test",
				"click should be ignored keeping the active mobile page the same as before" );

			$.mobile.ignoreContentEnabled = false;
			ready();
		}
	] );
} );

QUnit.test( "vclicks are ignored where data-ajax='false' parents exist", function( assert ) {
	var ready = assert.async();
	var disabledByParent = $( "#unhijacked-link-by-parent" ),
		disabledByAttr = $( "#unhijacked-link-by-attr" ),
		hijacked = $( "#hijacked-link" );

	$.mobile.ignoreContentEnabled = true;

	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#link-hijacking-test" );
		},

		function() {

			// Force the active button class
			hijacked.addClass( "ui-button-active" );
			hijacked.trigger( "vclick" );
			assert.hasClasses( hijacked, "ui-button-active",
				"active button class is added to the link per normal" );

			disabledByParent.trigger( "vclick" );
			assert.lacksClasses( disabledByParent, "ui-button-active",
				"active button class is never added to the link" );

			disabledByAttr.trigger( "vclick" );
			assert.lacksClasses( disabledByAttr, "ui-button-active",
				"active button class is never added to the link" );

			$.mobile.ignoreContentEnabled = false;
			ready();
		}
	] );
} );

QUnit.test( "data-urls with parens work properly (avoid jqmData regex)", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change",
				"data-url-tests/parentheses.html?foo=(bar)" );
		},

		function() {
			window.history.back();
		},

		function( timedOut ) {
			assert.ok( !timedOut, "the call to back didn't time out" );
			window.history.forward();
		},

		function() {
			assert.equal( $.trim( $.mobile.activePage.text() ), "Parens!", "the page loaded" );
			ready();
		}
	] );
} );

QUnit.test( "loading an embedded page with query params works", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#bar?baz=bak", { dataUrl: false } );
		},

		function() {
			assert.ok( location.hash.indexOf( "bar?baz=bak" ) >= -1,
				"the hash is targeted at the page to be loaded" );
			assert.ok( $.mobile.activePage.attr( "id" ), "bar", "the correct page is loaded" );
			ready();
		}
	] );
} );

QUnit.test( "external page is accessed correctly even if it has a space in the url",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change", " external.html" );
			},
			function() {
				assert.equal( $.mobile.activePage.attr( "id" ), "external-test",
					"the correct page is loaded" );
				ready();
			}

		] );
	} );

var absHomeUrl = $.mobile.path.parseLocation().hrefNoHash,
	homeDomain = $.mobile.path.parseLocation().domain;

QUnit.test( "page load events are providided with the absolute url for the content",
	function( assert ) {
		var ready = assert.async();
		var requestPath;

		assert.expect( 3 );

		$( document ).one( "pagebeforechange", function( event, data ) {
			assert.equal( data.absUrl, absHomeUrl + "#bar" );
		} );

		$( document ).one( "pagechange", function( event, data ) {
			assert.equal( data.absUrl, absHomeUrl + "#bar" );
		} );

		$( ".ui-pagecontainer" ).pagecontainer( "change", "#bar" );

		requestPath = "/theres/no/way/this/page/exists.html";

		$( document ).one( "pagechangefailed", function( event, data ) {
			assert.equal( data.absUrl, homeDomain + requestPath );
			ready();
		} );

		$( ".ui-pagecontainer" ).pagecontainer( "change", requestPath );
	} );

} );
