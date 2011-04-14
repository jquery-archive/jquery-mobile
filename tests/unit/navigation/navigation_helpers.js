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
		same($.mobile.path.get(), "", "get method for location.hash #foo returns empty string");
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
		same( $.mobile.path.makeAbsolute("?foo=bar&bak=baz"), location.pathname + "?foo=bar&bak=baz", "uses pathname for empty hash");

		$.mobile.path.set("bar");
		same( $.mobile.path.makeAbsolute("?foo=bar&bak=baz"), location.pathname + "?foo=bar&bak=baz", "uses pathname for embedded pages");

		$.mobile.path.set("bar/bing?foo=bar");
		same( $.mobile.path.makeAbsolute("?foo=bar&bak=baz"), "bar/bing?foo=bar&bak=baz", "prevents addition of many sets of query params");
	});

	test( "path.clean is working properly", function(){

		$.testHelper.openPage("#data-url-tests/data-url.html");

		var localroot = location.protocol + "//" + location.host + location.pathname,
			remoteroot = "http://google.com/",
			fakepath = "#foo/bar/baz.html",
			pathWithParam = localroot + "bar?baz=" + localroot,
			localpath = localroot + fakepath,
			remotepath = remoteroot + fakepath,
			relpath1 = "../foo.html",
			relpath2 = "../foo/bar.html",
			relpath3 = "../../foo/bar.html",
			abspath1 = "/foo/bar.html",
			abspath2 = location.pathname + "foo/bar.html",
			hrelpath1 = "#foo.html",
			hrelpath2 = "#foo/bar.html",
			hrelpath3 = "#../../foo/bar.html",
			hrootpath1 = "#/foo.html",
			hrootpath2 = "#/foo/bar.html",
			hrootpath3 = "#/../../foo/bar.html",
			hashedrel1 = "../foo/#bar.html",
			hashedrel2 = "../#foo/bar.html",
			hashedabs1 = "/foo/#bar.html",
			hashedabs2 = location.pathname + "#foo/bar.html",
			indexpath = "#foo/index.chm",
			indexparampath = "#foo/index.chm?foo=" + localroot,
			segments = location.pathname.split("/"),
			uppath = "#",
			i;

		// pathname ends and begins with slash, so first and last elements are empty
		for (i=0; i<segments.length-2; i++) {
			uppath += "../"
		}
		// We are in a subdirectory, so one more ..
		uppath += "foo/bar.html";

		same( $.mobile.path.clean( localpath ), fakepath,
			"removes location protocol, host, port, pathname from same-domain path");
		same( $.mobile.path.clean( pathWithParam ), "#bar?baz=" + localroot,
			"doesn't remove params with localroot value");
		// relative
		same( $.mobile.path.clean( relpath1 ), "#foo.html",
			".. removed from current path, no dirs left");
		same( $.mobile.path.clean( relpath2 ), "#foo/bar.html",
			".. removed from current path, one dir left");
		same( $.mobile.path.clean( relpath3 ), "#../foo/bar.html",
			".. removed from current path, one .. still left");
		// hash-relative
		same( $.mobile.path.clean( hrelpath1 ), "#foo.html", 
			"hash-relative path stays the same 1");
		same( $.mobile.path.clean( hrelpath2 ), "#foo/bar.html",
			"hash-relative path stays the same 2");
		same( $.mobile.path.clean( hrelpath3 ), "#../../foo/bar.html",
			"hash-relative path stays the same 3");
		// hash-root
		same( $.mobile.path.clean( hrootpath1 ), "#foo.html",
			"hash-absolute path stays the same minus leading slash 1");
		same( $.mobile.path.clean( hrootpath2 ), "#foo/bar.html",
			"hash-absolute path stays the same minus leading slash 2");
		same( $.mobile.path.clean( hrootpath3 ), "#../../foo/bar.html",
			"hash-absolute path stays the same minus leading slash 3");
		// absolute
		same( $.mobile.path.clean( abspath1 ), uppath,
			"absolute path above localroot");
		same( $.mobile.path.clean( abspath2 ), "#foo/bar.html",
			"absolute path below localroot");
		// hashed relative
		same( $.mobile.path.clean( hashedrel1 ),
			location.protocol + "//" + location.host + location.pathname + "foo/#bar.html",
			"hashed relative, different path: returns full url");
		same( $.mobile.path.clean( hashedrel2 ), "#foo/bar.html",
 			"hashed relative, same path: returns hash-relative path");
		// hashed absolute
		same( $.mobile.path.clean( hashedabs1 ),
			location.protocol + "//" + location.host + "/foo/#bar.html",
			"hashed absolute, different path: return full url");
		same( $.mobile.path.clean( hashedabs2 ), "#foo/bar.html",
			"hashed absolute, same path: returns hash-relative path");		
		// hashed host-absolute
		same( $.mobile.path.clean( location.protocol + "//" + location.host + hashedabs1 ),
			location.protocol + "//" + location.host + "/foo/#bar.html",
			"hashed host-absolute, different path: return full url");
		same( $.mobile.path.clean( location.protocol + "//" + location.host + hashedabs2 ),
			"#foo/bar.html",
			"hashed host-absolute, same path: return hash-relative path");
		same( $.mobile.path.clean( remotepath ), remotepath,
			"Hashed host-absolute, different host: return full url");
		// with index.* at the end
		same( $.mobile.path.clean( indexpath ), "#foo/",
			"Remove index.* from path");
		same( $.mobile.path.clean( indexparampath ), "#foo/?foo=" + localroot,
			"Remove index.* from path but preserve parameters");

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
