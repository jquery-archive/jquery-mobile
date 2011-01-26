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
	
	
	
	test( "path.get method is working properly", function(){
		same($.mobile.path.get(), window.location.hash, "get method returns location.hash");
		same($.mobile.path.get( "#foo/bar/baz.html" ), "foo/bar/", "get method with hash arg returns path with no filename or hash prefix");
		same($.mobile.path.get( "#foo/bar/baz.html/" ), "foo/bar/baz.html/", "last segment of hash is retained if followed by a trailing slash");
	});
	
	test( "path.getFilePath method is working properly", function(){
		same($.mobile.path.getFilePath("foo.html" + "&" + $.mobile.subPageUrlKey ), "foo.html", "returns path without sub page key");
	});
	
	
	test( "path.set method is working properly", function(){
		$.mobile.urlHistory.listeningEnabled = false;
		$.mobile.path.set("foo");
		same("foo", window.location.hash.replace(/^#/,""), "sets location.hash properly");
		location.hash = "";
	});
	
	test( "path.makeAbsolute is working properly", function(){
		$.mobile.urlHistory.listeningEnabled = false;
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
	
})(jQuery);