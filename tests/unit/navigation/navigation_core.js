/*
 * mobile navigation unit tests
 */
(function($){
	var changePageFn = $.mobile.changePage,
			originalTitle = document.title;
	module('jquery.mobile.navigation.js', {
		setup: function(){
			$.mobile.urlHistory.stack = [];
			$.mobile.urlHistory.activeIndex = 0;
			$.mobile.changePage = changePageFn;
			document.title = originalTitle;
			location.hash = "";
		}
	});

	asyncTest( "changepage will only run once when a new page is visited", function(){
		var called = 0,
				newChangePage = function(a,b,c,d,e){
					changePageFn( a,b,c,d,e );
					called ++;
				};

		$.testHelper.sequence([
			// avoid initial page load triggering changePage early
			function(){
				$.mobile.changePage = newChangePage;
				$('#foo a').click();
			},

			function(){
				ok(called == 1, "change page should be called once");
				start();
			}], 500);
	});

	asyncTest( "forms with data attribute ajax set to false will not call changePage", function(){
		var called = false,
				newChangePage = function(){
					called = truue;
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
			}], 500);
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

	test( "path.get method is working properly", function(){
		window.location.hash = "foo";
		same($.mobile.path.get(), "foo", "get method returns location.hash minus hash character");
		same($.mobile.path.get( "#foo/bar/baz.html" ), "foo/bar/", "get method with hash arg returns path with no filename or hash prefix");
		same($.mobile.path.get( "#foo/bar/baz.html/" ), "foo/bar/baz.html/", "last segment of hash is retained if followed by a trailing slash");
	});

	test( "path.isPath method is working properly", function(){
		ok(!$.mobile.path.isPath('bar'), "anything without a slash is not a path");
		ok($.mobile.path.isPath('bar/'), "anything with a slash is a path");
		ok($.mobile.path.isPath('/bar'), "anything with a slash is a path");
		ok($.mobile.path.isPath('a/r'), "anything with a slash is a path");
		ok($.mobile.path.isPath('/'), "anything with a slash is a path");
	});

	test( "path.getFilePath method is working properly", function(){
		same($.mobile.path.getFilePath("foo.html" + "&" + $.mobile.subPageUrlKey ), "foo.html", "returns path without sub page key");
	});


	test( "path.set method is working properly", function(){
		$.mobile.urlHistory.ignoreNextHashChange = false;
		$.mobile.path.set("foo");
		same("foo", window.location.hash.replace(/^#/,""), "sets location.hash properly");
	});

	test( "path.makeAbsolute is working properly", function(){
		$.mobile.urlHistory.ignoreNextHashChange = false;
		$.mobile.path.set("bar/");
		same( $.mobile.path.makeAbsolute("test.html"), "bar/test.html", "prefixes path with absolute base path from hash");
		$.mobile.path.set("bar");
		same( $.mobile.path.makeAbsolute("test.html"), "test.html", "returns the relative path unaltered for non path hash");
	});

	test( "path.clean is working properly", function(){
		var localroot = location.protocol + "//" + location.host + location.pathname,
			remoteroot = "http://google.com/",
			fakepath = "#foo/bar/baz.html",
			pathWithParam = localroot + "/bar?baz=" + localroot,
			localpath = localroot + fakepath,
			remotepath = remoteroot + fakepath;

		same( $.mobile.path.clean( localpath ), fakepath, "removes location protocol, host, port, pathname from same-domain path");
		same( $.mobile.path.clean( remotepath ), remotepath, "does nothing to an external domain path");
		same( $.mobile.path.clean( pathWithParam ), "/bar?baz=" + localroot, "doesn't remove params with localroot value");
	});

	test( "path.stripHash is working properly", function(){
		same( $.mobile.path.stripHash( "#bar" ), "bar", "returns a hash without the # prefix");
	});

	test( "path.hasProtocol is working properly", function(){
		same( $.mobile.path.hasProtocol( "tel:5559999" ), true, "value in tel protocol format has protocol" );
		same( $.mobile.path.hasProtocol( location.href ), true, "location href has protocol" );
		same( $.mobile.path.hasProtocol( "foo/bar/baz.html" ), false, "simple directory path has no protocol" );
		same( $.mobile.path.hasProtocol( "file://foo/bar/baz.html" ), true, "simple directory path with file:// has protocol" );
	});

	test( "path.isRelative is working properly", function(){
		same( $.mobile.path.isRelative("#foo/bar"), false, "path starting with a # is not relative" );
		same( $.mobile.path.isRelative("/foo/bar"), false, "path starting with a / is not relative" );
		same( $.mobile.path.isRelative("http://example.com/foo"), false, "full url path is not relative" );
		same( $.mobile.path.isRelative("foo/bar.html"), true, "simple path is relative" );
	});

	test( "path.isExternal is working properly", function(){
		same( $.mobile.path.isExternal( location.href ), false, "same domain is not external" );
		same( $.mobile.path.isExternal( "http://example.com" ), true, "example.com is external" );
		same($.mobile.path.isExternal("mailto:"), true, "mailto protocol");
		same($.mobile.path.isExternal("http://foo.com"), true, "http protocol");
		same($.mobile.path.isExternal("http://www.foo.com"), true, "http protocol with www");
		same($.mobile.path.isExternal("tel:16178675309"), true, "tel protocol");
		same($.mobile.path.isExternal("foo.html"), false, "filename");
		same($.mobile.path.isExternal("foo/foo/foo.html"), false, "file path");
		same($.mobile.path.isExternal("../../index.html"), false, "relative parent path");
		same($.mobile.path.isExternal("/foo"), false, "root-relative path");
		same($.mobile.path.isExternal("foo"), false, "simple string");
		same($.mobile.path.isExternal("#foo"), false, "local id reference");
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
		prop = false;
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
		testListening( $.mobile.urlHistory.ignoreNextHashChange );
	});

	asyncTest( "ability to disable our hash change event listening globally", function(){
		testListening( $.mobile.hashListeningEnabled );
	});

	var testDataUrlHash = function(linkSelector, hashRegex){
		window.location.hash = "";
		$(linkSelector).click();

		setTimeout(function(){
			ok(hashRegex.test(location.hash), "should match the regex");
			start();
		}, 600);
		stop();
	};

	test( "when loading a page where data-url is not defined on a sub element hash defaults to the url", function(){
		testDataUrlHash("#non-data-url a", /^#data-url-tests\/non-data-url.html$/);
	});

	test( "data url works for nested paths", function(){
		testDataUrlHash("#nested-data-url a", /^#foo\/bar.html$/);
	});

	test( "data url works for single quoted paths and roles", function(){
		testDataUrlHash("#single-quotes-data-url a", /^#foo\/bar\/single.html$/);
	});

	test( "data url works when role and url are reversed on the page element", function(){
		testDataUrlHash("#reverse-attr-data-url a", /^#foo\/bar\/reverse.html$/);
	});

	asyncTest( "last entry choosen amongst multiple identical url history stack entries on hash change", function(){
		$.testHelper.openPage("#dup-history-first");

		$.testHelper.sequence([
			function(){ $("#dup-history-first a").click(); },
			function(){ $("#dup-history-second a:first").click(); },
			function(){ $("#dup-history-first a").click(); },
			function(){ $("#dup-history-second a:last").click(); },
			function(){ $("#dup-history-dialog :jqmData(rel=back)").click(); },
			function(){

				// fourth page (third index) in the stack to account for first page being hash manipulation,
				// the third page is dup-history-second which has two entries in history
				// the test is to make sure the index isn't 1 in this case, or the first entry for dup-history-second
				same($.mobile.urlHistory.activeIndex, 3, "should be the third page in the stack");
				start();
			}], 1000);
	});

	asyncTest( "going back from a page entered from a dialog skips the dialog and goes to the previous page", function(){
		$.testHelper.openPage("#skip-dialog-first");

		$.testHelper.sequence([
			// transition to the dialog
			function(){ $("#skip-dialog-first a").click(); },

			// transition to the second page
			function(){ $("#skip-dialog a").click(); },

			// transition past the dialog via data-rel=back link on the second page
			function(){ $("#skip-dialog-second a").click(); },

			// make sure we're at the first page and not the dialog
			function(){
				same(location.hash, "#skip-dialog-first", "should be the first page in the sequence");
				start();
			}], 1000);
	});

	asyncTest( "going forward from a page entered from a dialog skips the dialog and goes to the next page", function(){
		$.testHelper.openPage("#skip-dialog-first");

		$.testHelper.sequence([
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
				same(location.hash, "#skip-dialog-second", "should be the second page after the dialog");
				start();
			}], 1000);
	});


	asyncTest( "going back from a dialog triggered from a dialog should result in the first dialog ", function(){
		$.testHelper.openPage("#nested-dialog-page");

		$.testHelper.sequence([
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
			}], 1000);
	});

	asyncTest( "loading a relative file path after an embeded page works", function(){
		$.testHelper.openPage("#relative-after-embeded-page-first");

		$.testHelper.sequence([
			// transition second page
			function(){ $("#relative-after-embeded-page-first a").click(); },

			// transition to the relative ajax loaded page
			function(){ $("#relative-after-embeded-page-second a").click(); },

			// make sure the page was loaded properly via ajax
			function(){
				// data attribute intentionally left without namespace
				same($(".ui-page-active").data("other"), "for testing", "should be relative ajax loaded page");
				start();
			}], 1000);
	});

	asyncTest( "Page title updates properly when clicking back to previous page", function(){
		$.testHelper.openPage("#relative-after-embeded-page-first");

		$.testHelper.sequence([
			function(){
				window.history.back();
			},

			function(){
				same(document.title, "jQuery Mobile Navigation Test Suite");
				start();
			}
		], 500);
	});

	asyncTest( "Page title updates properly from title tag when loading an external page", function(){
		$.testHelper.openPage("#ajax-title-page");

		$.testHelper.sequence([
			function(){
				$("#titletest1").click();
			},

			function(){
				same(document.title, "Title Tag");
				start();
			}
		], 500);
	});

	asyncTest( "Page title updates properly from data-title attr  when loading an external page", function(){
		$.testHelper.openPage("#ajax-title-page");
		$.testHelper.sequence([
			function(){
				$("#titletest2").click();
			},

			function(){
				same(document.title, "Title Attr");
				start();
			}
		], 500);
	});

	asyncTest( "Page title updates properly from heading text in header when loading an external page", function(){
		$.testHelper.openPage("#ajax-title-page");
		$.testHelper.sequence([
			function(){
				$("#titletest3").click();
			},

			function(){
				same(document.title, "Title Heading");
				start();
			}
		], 500);
	});
})(jQuery);
