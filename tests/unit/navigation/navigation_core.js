/*
 * mobile navigation unit tests
 */
(function($){
	var changePageFn = $.mobile.changePage;
	module('jquery.mobile.navigation.js', {
		teardown: function(){
			$.mobile.changePage = changePageFn;
		}
	});

	test( "forms with data attribute ajax set to false will not call changePage", function(){
		var called = false;
		$.mobile.changePage = function(){
			called = true;
		};

		stop();
		$('#non-ajax-form').live('submit', function(event){
			ok(true, 'submit callbacks are fired');
			start();
			event.preventDefault();
		}).submit();

		ok(!called, "change page should not be called");
	});

	test( "forms with data attribute ajax not set or set to anything but false will call changepage", function(){
		var called = 0;
		$.mobile.changePage = function(){
			called += 1;
			if(called > 1){ start(); }
		};

		stop();
		$('#ajax-form, #rand-ajax-form').submit();

		same(called, 2, "change page should be called twice");
	});


	asyncTest( "anchors with no href attribute will do nothing when clicked", function(){
		var fired = false;

		$(window).bind("hashchange.temp", function(){
			fired = true;
		});

		$( "<a>test</a>" ).appendTo( $.mobile.pageContainer ).click();

		setTimeout(function(){
			start();
			same(fired, false, "hash shouldn't change after click");
			$(window).unbind("hashchange.temp");
		}, 500);
	});




	test( "path.get method is working properly", function(){
		window.location.hash = "foo"
		same($.mobile.path.get(), "foo", "get method returns location.hash minus hash character");
		same($.mobile.path.get( "#foo/bar/baz.html" ), "foo/bar/", "get method with hash arg returns path with no filename or hash prefix");
		same($.mobile.path.get( "#foo/bar/baz.html/" ), "foo/bar/baz.html/", "last segment of hash is retained if followed by a trailing slash");
	});

	test( "path.getFilePath method is working properly", function(){
		same($.mobile.path.getFilePath("foo.html" + "&" + $.mobile.subPageUrlKey ), "foo.html", "returns path without sub page key");
	});


	test( "path.set method is working properly", function(){
		$.mobile.urlHistory.ignoreNextHashChange = false;
		$.mobile.path.set("foo");
		same("foo", window.location.hash.replace(/^#/,""), "sets location.hash properly");
		location.hash = "";
	});

	test( "path.makeAbsolute is working properly", function(){
		$.mobile.urlHistory.ignoreNextHashChange = false;
		$.mobile.path.set("bar/");
		same( $.mobile.path.makeAbsolute("test.html"), "bar/test.html", "prefixes path with absolute base path from hash");
		location.hash = "";
	});

	test( "path.clean is working properly", function(){
		var localroot = location.href.split("/").slice(0, 3).join("/"),
			remoteroot = "http://google.com/",
			fakepath = "foo/bar/baz.html",
			localpath = localroot + fakepath,
			remotepath = remoteroot + fakepath;

		same( $.mobile.path.clean( localpath ), fakepath, "removes location protocol, host, port from same-domain path");
		same( $.mobile.path.clean( remotepath ), remotepath, "does nothing to an external domain path");
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
			start();
			ok( prop == stillListening, prop + " = false disables default hashchange event handler");
			location.hash = "";
			prop = true;
		}, 1000);
	}

	asyncTest( "ability to disable our hash change event listening internally", function(){
		testListening( $.mobile.urlHistory.ignoreNextHashChange );
	});

	asyncTest( "ability to disable our hash change event listening globally", function(){
		testListening( $.mobile.hashListeningEnabled );
	});

	asyncTest( "changepage will only run once when a new page is visited", function(){
		var called = 0;
		$.mobile.changePage = function(a,b,c,d,e){
			changePageFn( a,b,c,d,e );
			called ++;
		};

		$('#foo a').click();

		setTimeout(function(){
			start();
			ok(called == 1, "change page should be called once");
		}, 500);
	});

	asyncTest( "when loading a page where data-url is defined on a sub element set the hash with that url", function(){
		location.hash = "";
		$("#data-url a").click();

		setTimeout(function(){
			ok(location.hash.indexOf("#foo/") >= 0);
			start();
		}, 1000);
		stop();
	});

	asyncTest( "when loading a page where data-url is not defined on a sub element hash defaults to the url", function(){
		location.hash = "";
		$("#non-data-url a").click();

		setTimeout(function(){
			ok(location.hash.indexOf("#non-data-url.html") >= 0);
			start();
		}, 1000);
		stop();
	});
})(jQuery);
