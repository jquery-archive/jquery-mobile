/*
 * mobile navigation unit tests
 */
(function($){
	module('jquery.mobile.navigation.js', {
		setup: function(){
			location.hash = "";
		}
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

		$.mobile.path.set("bar/bing/bang");
		same( $.mobile.path.makeAbsolute("?foo=bar&bak=baz"), "bar/bing/bang?foo=bar&bak=baz", "appends query string paths to current path");

		$.mobile.path.set("");
		same( $.mobile.path.makeAbsolute("?foo=bar&bak=baz"), "/tests/unit/navigation/?foo=bar&bak=baz", "uses pathname for empty hash");

		$.mobile.path.set("bar");
		same( $.mobile.path.makeAbsolute("?foo=bar&bak=baz"), "/tests/unit/navigation/?foo=bar&bak=baz", "uses pathname for embedded pages");

		$.mobile.path.set("bar/bing?foo=bar");
		same( $.mobile.path.makeAbsolute("?foo=bar&bak=baz"), "bar/bing?foo=bar&bak=baz", "prevents addition of many sets of query params");
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

	test( "path.isQuery is working properly", function(){
		ok( $.mobile.path.isQuery( "?foo=bar" ), "string prefixed with ?");
		ok( !$.mobile.path.isQuery( "anything else" ), "string not prefixed with ?");
	});

	test( "path.cleanHash", function(){
		same( $.mobile.path.cleanHash( "#anything/atall?akjfdjjf" ), "anything/atall", "removes query param");
		same( $.mobile.path.cleanHash( "#nothing/atall" ), "nothing/atall", "removes query param");
	});
})(jQuery);