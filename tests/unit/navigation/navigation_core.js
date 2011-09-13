/*
 * mobile navigation unit tests
 */
(function($){
	// TODO move siteDirectory over to the nav path helper
	var changePageFn = $.mobile.changePage,
		originalTitle = document.title,
		siteDirectory = location.pathname.replace( /[^/]+$/, "" ),
		home = $.mobile.path.parseUrl(location.pathname).directory,
		navigateTestRoot = function(){
			$.testHelper.openPage( "#" + location.pathname );
		};

	module('jquery.mobile.navigation.js', {
		setup: function(){
			$.mobile.changePage = changePageFn;
			document.title = originalTitle;

			var pageReset = function( hash ) {
				hash = hash || "";

				stop();

				$(document).one( "changepage", function() {
					start();
				});

				location.hash = "#" + hash;
			};

			// force the page reset for hash based tests
			if ( location.hash && !$.support.pushState ) {
				pageReset();
			}

			// force the page reset for all pushstate tests
			if ( $.support.pushState ) {
				pageReset( home );
			}

			$.mobile.urlHistory.stack = [];
			$.mobile.urlHistory.activeIndex = 0;
		}
	});

	asyncTest( "window.history.back() from external to internal page", function(){

		$.testHelper.pageSequence([

			// open our test page
			function(){
				$.testHelper.openPage("#active-state-page1");
			},

			function(){
				ok( $.mobile.activePage[0] === $( "#active-state-page1" )[ 0 ], "successful navigation to internal page." );

				//location.hash = siteDirectory + "external.html";
				$.mobile.changePage("external.html");
			},

			function(){
				ok( $.mobile.activePage[0] !== $( "#active-state-page1" )[ 0 ], "successful navigation to external page." );

				window.history.back();
			},

			function(){
				ok( $.mobile.activePage[0] === $( "#active-state-page1" )[ 0 ], "successful navigation back to internal page." );

				start();
			}
		]);
	});

	asyncTest( "external page is removed from the DOM after pagehide", function(){
		$.testHelper.pageSequence([
			navigateTestRoot,

			function(){
				$.mobile.changePage( "external.html" );
			},

			// page is pulled and displayed in the dom
			function(){
				same( $( "#external-test" ).length, 1 );
				window.history.back();
			},

			// external-test is *NOT* cached in the dom after transitioning away
			function(){
				same( $( "#external-test" ).length, 0 );
				start();
			}
		]);
	});

	asyncTest( "external page is cached in the DOM after pagehide", function(){
		$.testHelper.pageSequence([
			navigateTestRoot,

			function(){
				$.mobile.changePage( "cached-external.html" );
			},

			// page is pulled and displayed in the dom
			function(){
				same( $( "#external-test-cached" ).length, 1 );
				window.history.back();
			},

			// external test page is cached in the dom after transitioning away
			function(){
				same( $( "#external-test-cached" ).length, 1 );
				start();
			}
		]);
	});

	asyncTest( "external page is cached in the DOM after pagehide when option is set globally", function(){
		$.testHelper.pageSequence([
			navigateTestRoot,

			function(){
				$.mobile.page.prototype.options.domCache = true;
				$.mobile.changePage( "external.html" );
			},

			// page is pulled and displayed in the dom
			function(){
				same( $( "#external-test" ).length, 1 );
				window.history.back();
			},

			// external test page is cached in the dom after transitioning away
			function(){
				same( $( "#external-test" ).length, 1 );
				$.mobile.page.prototype.options.domCache = false;
				$( "#external-test" ).remove();
				start();
			}]);
	});
	
	asyncTest( "page last scroll distance is remembered while navigating to and from pages", function(){
		$.testHelper.pageSequence([
			navigateTestRoot,
			
			function(){
				$( "body" ).height( $( window ).height() + 500 );
				$.mobile.changePage( "external.html" );
			},
			
			function(){
				window.scrollTo( 0, 300 );
				same( $(window).scrollTop(), 300, "scrollTop is 300" );
				navigateTestRoot();
			},
			
			function(){
				window.history.back();
			},
			
			function(){
				// Give the silentScroll function some time to kick in.
				setTimeout(function() {
					same( $(window).scrollTop(), 300, "scrollTop is 300" );
					$( "body" ).height( "" );
					start();
				}, 100 );
			}
			
		]);	
		
	});

	asyncTest( "forms with data attribute ajax set to false will not call changePage", function(){
		var called = false;
		var newChangePage = function(){
			called = true;
		};

		$.testHelper.sequence([
			// avoid initial page load triggering changePage early
			function(){
				$.mobile.changePage = newChangePage;

 				$('#non-ajax-form').one('submit', function(event){
					ok(true, 'submit callbacks are fired');
					event.preventDefault();
				}).submit();
			},

			function(){
				ok(!called, "change page should not be called");
				start();
			}], 1000);
	});

	asyncTest( "forms with data attribute ajax not set or set to anything but false will call changepage", function(){
		var called = 0,
				newChangePage = function(){
					called++;
				};

		$.testHelper.sequence([
			// avoid initial page load triggering changePage early
			function(){
				$.mobile.changePage = newChangePage;
				$('#ajax-form, #rand-ajax-form').submit();
			},

			function(){
				ok(called >= 2, "change page should be called at least twice");
				start();
			}], 300);
	});


	asyncTest( "anchors with no href attribute will do nothing when clicked", function(){
		var fired = false;

		$(window).bind("hashchange.temp", function(){
			fired = true;
		});

		$( "<a>test</a>" ).appendTo( $.mobile.firstPage ).click();

		setTimeout(function(){
			same(fired, false, "hash shouldn't change after click");
			$(window).unbind("hashchange.temp");
			start();
		}, 500);
	});

	test( "urlHistory is working properly", function(){

		//urlHistory
		same( $.type( $.mobile.urlHistory.stack ), "array", "urlHistory.stack is an array" );

		//preload the stack
		$.mobile.urlHistory.stack[0] = { url: "foo", transition: "bar" };
		$.mobile.urlHistory.stack[1] = { url: "baz", transition: "shizam" };
		$.mobile.urlHistory.stack[2] = { url: "shizoo", transition: "shizaah" };

		//active index
		same( $.mobile.urlHistory.activeIndex , 0, "urlHistory.activeIndex is 0" );

		//getActive
		same( $.type( $.mobile.urlHistory.getActive() ) , "object", "active item is an object" );
		same( $.mobile.urlHistory.getActive().url , "foo", "active item has url foo" );
		same( $.mobile.urlHistory.getActive().transition , "bar", "active item has transition bar" );

		//get prev / next
		same( $.mobile.urlHistory.getPrev(), undefined, "urlHistory.getPrev() is undefined when active index is 0" );
		$.mobile.urlHistory.activeIndex = 1;
		same( $.mobile.urlHistory.getPrev().url, "foo", "urlHistory.getPrev() has url foo when active index is 1" );
		$.mobile.urlHistory.activeIndex = 0;
		same( $.mobile.urlHistory.getNext().url, "baz", "urlHistory.getNext() has url baz when active index is 0" );

		//add new
		$.mobile.urlHistory.activeIndex = 2;
		$.mobile.urlHistory.addNew("test");
		same( $.mobile.urlHistory.stack.length, 4, "urlHistory.addNew() adds an item after the active index" );
		same( $.mobile.urlHistory.activeIndex, 3, "urlHistory.addNew() moves the activeIndex to the newly added item" );

		//clearForward
		$.mobile.urlHistory.activeIndex = 0;
		$.mobile.urlHistory.clearForward();
		same( $.mobile.urlHistory.stack.length, 1, "urlHistory.clearForward() clears the url stack after the active index" );
	});

	//url listening
	function testListening( prop ){
		var stillListening = false;
		$(document).bind("pagebeforehide", function(){
			stillListening = true;
		});
		location.hash = "foozball";
		setTimeout(function(){
			ok( prop == stillListening, prop + " = false disables default hashchange event handler");
			location.hash = "";
			prop = true;
			start();
		}, 1000);
	}

	asyncTest( "ability to disable our hash change event listening internally", function(){
		testListening( ! $.mobile.urlHistory.ignoreNextHashChange );
	});

	asyncTest( "ability to disable our hash change event listening globally", function(){
		testListening( $.mobile.hashListeningEnabled );
	});

	var testDataUrlHash = function( linkSelector, matches ) {
		$.testHelper.pageSequence([
			function(){ window.location.hash = ""; },
			function(){ $(linkSelector).click(); },
			function(){
				$.testHelper.assertUrlLocation(
					$.extend(matches, {
						report: "url or hash should match"
					})
				);

				start();
			}
		]);

		stop();
	};

	test( "when loading a page where data-url is not defined on a sub element hash defaults to the url", function(){
		testDataUrlHash( "#non-data-url a", {hashOrPush: siteDirectory + "data-url-tests/non-data-url.html"} );
	});

	test( "data url works for nested paths", function(){
		var url = "foo/bar.html";
		testDataUrlHash( "#nested-data-url a", {hash: url, push: home + url} );
	});

	test( "data url works for single quoted paths and roles", function(){
		var url = "foo/bar/single.html";
		testDataUrlHash( "#single-quotes-data-url a", {hash: url, push: home + url} );
	});

	test( "data url works when role and url are reversed on the page element", function(){
		var url = "foo/bar/reverse.html";
		testDataUrlHash( "#reverse-attr-data-url a", {hash: url, push: home + url} );
	});

	asyncTest( "last entry choosen amongst multiple identical url history stack entries on hash change", function(){
		// make sure the stack is clear after initial page load an any other delayed page loads
		// TODO better browser state management
		$.mobile.urlHistory.stack = [];
		$.mobile.urlHistory.activeIndex = 0;

		$.testHelper.pageSequence([
			function(){ $.testHelper.openPage("#dup-history-first"); },
			function(){ $("#dup-history-first a").click(); },
			function(){ $("#dup-history-second a:first").click(); },
			function(){ $("#dup-history-first a").click(); },
			function(){ $("#dup-history-second a:last").click(); },
			function(){ $("#dup-history-dialog :jqmData(rel=back)").click(); },
			function(){

				// fourth page (third index) in the stack to account for first page being hash manipulation,
				// the third page is dup-history-second which has two entries in history
				// the test is to make sure the index isn't 1 in this case, or the first entry for dup-history-second
				same($.mobile.urlHistory.activeIndex, 3, "should be the fourth page in the stack");
				start();
			}]);
	});

	asyncTest( "going back from a page entered from a dialog skips the dialog and goes to the previous page", function(){
		$.testHelper.pageSequence([
			// setup
			function(){ $.testHelper.openPage("#skip-dialog-first"); },

			// transition to the dialog
			function(){ $("#skip-dialog-first a").click(); },

			// transition to the second page
			function(){ $("#skip-dialog a").click(); },

			// transition past the dialog via data-rel=back link on the second page
			function(){ $("#skip-dialog-second a").click(); },

			// make sure we're at the first page and not the dialog
			function(){
				$.testHelper.assertUrlLocation({
					hash: "skip-dialog-first",
					push: home + "#skip-dialog-first",
					report: "should be the first page in the sequence"
				});

				start();
			}]);
	});

	asyncTest( "going forward from a page entered from a dialog skips the dialog and goes to the next page", function(){
		$.testHelper.pageSequence([
			// setup
			function(){ $.testHelper.openPage("#skip-dialog-first"); },

			// transition to the dialog
			function(){ $("#skip-dialog-first a").click(); },

			// transition to the second page
			function(){ $("#skip-dialog a").click(); },

			// transition to back past the dialog
			function(){ window.history.back(); },

			// transition to the second page past the dialog through history
			function(){ window.history.forward(); },

			// make sure we're on the second page and not the dialog
			function(){
				$.testHelper.assertUrlLocation({
					hash: "skip-dialog-second",
					push: home + "#skip-dialog-second",
					report: "should be the second page after the dialog"
				});

				start();
			}]);
	});

	asyncTest( "going back from a dialog triggered from a dialog should result in the first dialog ", function(){
		$.testHelper.pageSequence([
			// setup
			function(){ $.testHelper.openPage("#nested-dialog-page"); },

			// transition to the dialog
			function(){ $("#nested-dialog-page a").click(); },

			// transition to the second dialog
			function(){ $("#nested-dialog-first a").click(); },

			// transition to back to the first dialog
			function(){ window.history.back(); },

			// make sure we're on first dialog
			function(){
				same($(".ui-page-active")[0], $("#nested-dialog-first")[0], "should be the first dialog");
				start();
			}]);
	});

	asyncTest( "loading a relative file path after an embeded page works", function(){
		$.testHelper.pageSequence([
			// transition second page
			function(){ $.testHelper.openPage("#relative-after-embeded-page-first"); },

			// transition second page
			function(){ $("#relative-after-embeded-page-first a").click(); },

			// transition to the relative ajax loaded page
			function(){ $("#relative-after-embeded-page-second a").click(); },

			// make sure the page was loaded properly via ajax
			function(){
				// data attribute intentionally left without namespace
				same($(".ui-page-active").data("other"), "for testing", "should be relative ajax loaded page");
				start();
			}]);
	});

	asyncTest( "Page title updates properly when clicking back to previous page", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#relative-after-embeded-page-first");
			},

			function(){
				window.history.back();
			},

			function(){
				same(document.title, "jQuery Mobile Navigation Test Suite");
				start();
			}
		]);
	});

	asyncTest( "Page title updates properly from title tag when loading an external page", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#ajax-title-page");
			},

			function(){
				$("#titletest1").click();
			},

			function(){
				same(document.title, "Title Tag");
				start();
			}
		]);
	});

	asyncTest( "Page title updates properly from data-title attr  when loading an external page", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#ajax-title-page");
			},

			function(){
				$("#titletest2").click();
			},

			function(){
				same(document.title, "Title Attr");
				start();
			}
		]);
	});

	asyncTest( "Page title updates properly from heading text in header when loading an external page", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#ajax-title-page");
			},

			function(){
				$("#titletest3").click();
			},

			function(){
				same(document.title, "Title Heading");
				start();
			}
		]);
	});

	asyncTest( "Page links to the current active page result in the same active page", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#self-link");
			},

			function(){
				$("a[href='#self-link']").click();
			},

			function(){
				same($.mobile.activePage[0], $("#self-link")[0], "self-link page is still the active page" );
				start();
			}
		]);
	});

	asyncTest( "links on subdirectory pages with query params append the params and load the page", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#data-url-tests/non-data-url.html");
			},

			function(){
				$("#query-param-anchor").click();
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: home + "data-url-tests/non-data-url.html?foo=bar",
					report: "the hash or url has query params"
				});

				ok($(".ui-page-active").jqmData("url").indexOf("?foo=bar") > -1, "the query params are in the data url");
				start();
			}
		]);
	});

	asyncTest( "identical query param link doesn't add additional set of query params", function(){
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#data-url-tests/non-data-url.html");
			},

			function(){
				$("#query-param-anchor").click();
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: home + "data-url-tests/non-data-url.html?foo=bar",
					report: "the hash or url has query params"
				});

				$("#query-param-anchor").click();
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: home + "data-url-tests/non-data-url.html?foo=bar",
					report: "the hash or url still has query params"
				});

				start();
			}
		]);
	});

	// Special handling inside navigation because query params must be applied to the hash
	// or absolute reference and dialogs apply extra information int the hash that must be removed
	asyncTest( "query param link from a dialog to itself should be a not add another dialog", function(){
		var firstDialogLoc;

		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.testHelper.openPage("#dialog-param-link");
			},

			// navigate to the subdirectory page with the query link
			function(){
				$("#dialog-param-link a").click();
			},

			// navigate to the query param self reference link
			function(){
				$("#dialog-param-link-page a").click();
			},

			// attempt to navigate to the same link
			function(){
				// store the current hash for comparison (with one dialog hash key)
				firstDialogLoc = location.hash || location.href;
				$("#dialog-param-link-page a").click();
			},

			function(){
				same(location.hash || location.href, firstDialogLoc, "additional dialog hash key not added");
				start();
			}
		]);
	});

 	asyncTest( "query data passed as string to changePage is appended to URL", function(){
		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.mobile.changePage( "form-tests/changepage-data.html", {
					data: "foo=1&bar=2"
				} );
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: home + "form-tests/changepage-data.html?foo=1&bar=2",
					report: "the hash or url still has query params"
				});

				start();
			}
		]);
	});

	asyncTest( "query data passed as object to changePage is appended to URL", function(){
		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.mobile.changePage( "form-tests/changepage-data.html", {
					data: {
						foo: 3,
						bar: 4
					}
				} );
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: home + "form-tests/changepage-data.html?foo=3&bar=4",
					report: "the hash or url still has query params"
				});

				start();
			}
		]);
	});

	asyncTest( "refresh of a dialog url should not duplicate page", function(){
		$.testHelper.pageSequence([
			// open our test page
			function(){
				same($(".foo-class").length, 1, "should only have one instance of foo-class in the document");
				location.hash = "#foo&ui-state=dialog";
			},

			function(){
				$.testHelper.assertUrlLocation({
					hash: "foo&ui-state=dialog",
					push: home + "#foo&ui-state=dialog",
					report: "hash should match what was loaded"
				});

				same( $(".foo-class").length, 1, "should only have one instance of foo-class in the document" );
				start();
			}
		]);
	});

	asyncTest( "internal form with no action submits to document URL", function(){
		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.testHelper.openPage("#internal-no-action-form-page");
			},

			function(){
				$("#internal-no-action-form-page form").eq(0).submit();
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: home + "?foo=1&bar=2",
					report: "hash should match what was loaded"
				});

				start();
			}
		]);
	});

	asyncTest( "external page containing form with no action submits to page URL", function(){
		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.testHelper.openPage("#internal-no-action-form-page");
			},

			function(){
				$("#internal-no-action-form-page a").eq(0).click();
			},

			function(){
				$("#external-form-no-action-page form").eq(0).submit();
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: home + "form-tests/form-no-action.html?foo=1&bar=2",
					report: "hash should match page url and not document url"
				});

				start();
			}
		]);
	});

	asyncTest( "handling of active button state when navigating", 1, function(){

		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.testHelper.openPage("#active-state-page1");
			},

			function(){
				$("#active-state-page1 a").eq(0).click();
			},

			function(){
				$("#active-state-page2 a").eq(0).click();
			},

			function(){
				ok(!$("#active-state-page1 a").hasClass( $.mobile.activeBtnClass ), "No button should not have class " + $.mobile.activeBtnClass );
				start();
			}
		]);
	});

	asyncTest( "handling of button active state when navigating by clicking back button", 1, function(){

		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.testHelper.openPage("#active-state-page1");
			},

			function(){
				$("#active-state-page1 a").eq(0).click();
			},

			function(){
				$("#active-state-page2 a").eq(1).click();
			},

			function(){
				$("#active-state-page1 a").eq(0).click();
			},

			function(){
				ok(!$("#active-state-page2 a").hasClass( $.mobile.activeBtnClass ), "No button should not have class " + $.mobile.activeBtnClass );
				start();
			}
		]);
	});
})(jQuery);
