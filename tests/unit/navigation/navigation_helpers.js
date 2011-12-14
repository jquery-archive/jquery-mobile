/*
 * mobile navigation unit tests
 */
(function($){
	var siteDirectory = location.pathname.replace(/[^/]+$/, "");

	module('jquery.mobile.navigation.js', {
		setup: function(){
			if ( location.hash ) {
				stop();
				$(document).one("pagechange", function() {
					start();
				} );
				location.hash = "";
			}
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

	test( "path.makeUrlAbsolute is working properly", function(){
		var mua = $.mobile.path.makeUrlAbsolute,
			p1 = "http://jqm.com/",
			p2 = "http://jqm.com/?foo=1&bar=2",
			p3 = "http://jqm.com/#spaz",
			p4 = "http://jqm.com/?foo=1&bar=2#spaz",

			p5 = "http://jqm.com/test.php",
			p6 = "http://jqm.com/test.php?foo=1&bar=2",
			p7 = "http://jqm.com/test.php#spaz",
			p8 = "http://jqm.com/test.php?foo=1&bar=2#spaz",

			p9 = "http://jqm.com/dir1/dir2/",
			p10 = "http://jqm.com/dir1/dir2/?foo=1&bar=2",
			p11 = "http://jqm.com/dir1/dir2/#spaz",
			p12 = "http://jqm.com/dir1/dir2/?foo=1&bar=2#spaz",

			p13 = "http://jqm.com/dir1/dir2/test.php",
			p14 = "http://jqm.com/dir1/dir2/test.php?foo=1&bar=2",
			p15 = "http://jqm.com/dir1/dir2/test.php#spaz",
			p16 = "http://jqm.com/dir1/dir2/test.php?foo=1&bar=2#spaz";

		// Test URL conversion against an absolute URL to the site root.
		// directory tests
		same( mua( "http://jqm.com/",                            p1 ), "http://jqm.com/", "absolute root - absolute root" );
		same( mua( "//jqm.com/",                                 p1 ), "http://jqm.com/", "protocol relative root - absolute root" );
		same( mua( "/",                                          p1 ), "http://jqm.com/", "site relative root - absolute root" );

		same( mua( "http://jqm.com/?foo=1&bar=2",                p1 ), "http://jqm.com/?foo=1&bar=2", "absolute root with query - absolute root" );
		same( mua( "//jqm.com/?foo=1&bar=2",                     p1 ), "http://jqm.com/?foo=1&bar=2", "protocol relative root with query - absolute root" );
		same( mua( "/?foo=1&bar=2",                              p1 ), "http://jqm.com/?foo=1&bar=2", "site relative root with query - absolute root" );
		same( mua( "?foo=1&bar=2",                               p1 ), "http://jqm.com/?foo=1&bar=2", "query relative - absolute root" );

		same( mua( "http://jqm.com/#spaz",                       p1 ), "http://jqm.com/#spaz", "absolute root with fragment - absolute root" );
		same( mua( "//jqm.com/#spaz",                            p1 ), "http://jqm.com/#spaz", "protocol relative root with fragment - absolute root" );
		same( mua( "/#spaz",                                     p1 ), "http://jqm.com/#spaz", "site relative root with fragment - absolute root" );
		same( mua( "#spaz",                                      p1 ), "http://jqm.com/#spaz", "fragment relative - absolute root" );

		same( mua( "http://jqm.com/?foo=1&bar=2#spaz",           p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "absolute root with query and fragment - absolute root" );
		same( mua( "//jqm.com/?foo=1&bar=2#spaz",                p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "protocol relative root with query and fragment - absolute root" );
		same( mua( "/?foo=1&bar=2#spaz",                         p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "site relative root with query and fragment - absolute root" );
		same( mua( "?foo=1&bar=2#spaz",                          p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "query relative and fragment - absolute root" );

		// file tests
		same( mua( "http://jqm.com/test.php",                    p1 ), "http://jqm.com/test.php", "absolute file at root - absolute root" );
		same( mua( "//jqm.com/test.php",                         p1 ), "http://jqm.com/test.php", "protocol relative file at root - absolute root" );
		same( mua( "/test.php",                                  p1 ), "http://jqm.com/test.php", "site relative file at root - absolute root" );
		same( mua( "test.php",                                   p1 ), "http://jqm.com/test.php", "document relative file at root - absolute root" );

		same( mua( "http://jqm.com/test.php?foo=1&bar=2",        p1 ), "http://jqm.com/test.php?foo=1&bar=2", "absolute file at root with query - absolute root" );
		same( mua( "//jqm.com/test.php?foo=1&bar=2",             p1 ), "http://jqm.com/test.php?foo=1&bar=2", "protocol relative file at root with query - absolute root" );
		same( mua( "/test.php?foo=1&bar=2",                      p1 ), "http://jqm.com/test.php?foo=1&bar=2", "site relative file at root with query - absolute root" );
		same( mua( "test.php?foo=1&bar=2",                       p1 ), "http://jqm.com/test.php?foo=1&bar=2", "document relative file at root with query - absolute root" );

		same( mua( "http://jqm.com/test.php#spaz",               p1 ), "http://jqm.com/test.php#spaz", "absolute file at root with fragment - absolute root" );
		same( mua( "//jqm.com/test.php#spaz",                    p1 ), "http://jqm.com/test.php#spaz", "protocol relative file at root with fragment - absolute root" );
		same( mua( "/test.php#spaz",                             p1 ), "http://jqm.com/test.php#spaz", "site relative file at root with fragment - absolute root" );
		same( mua( "test.php#spaz",                              p1 ), "http://jqm.com/test.php#spaz", "file at root with fragment - absolute root" );

		same( mua( "http://jqm.com/test.php?foo=1&bar=2#spaz",   p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "absolute file at root with query and fragment - absolute root" );
		same( mua( "//jqm.com/test.php?foo=1&bar=2#spaz",        p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "protocol relative file at root with query and fragment - absolute root" );
		same( mua( "/test.php?foo=1&bar=2#spaz",                 p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "site relative file at root with query and fragment - absolute root" );
		same( mua( "test.php?foo=1&bar=2#spaz",                  p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "query relative file at root fragment - absolute root" );

		// Test URL conversion against an absolute URL to a file at the site root.

		same( mua( "http://jqm.com/",                            p5 ), "http://jqm.com/", "absolute root - absolute root" );
		same( mua( "//jqm.com/",                                 p5 ), "http://jqm.com/", "protocol relative root - absolute root" );
		same( mua( "/",                                          p5 ), "http://jqm.com/", "site relative root - absolute root" );

		same( mua( "http://jqm.com/?foo=1&bar=2",                p5 ), "http://jqm.com/?foo=1&bar=2", "absolute root with query - absolute root" );
		same( mua( "//jqm.com/?foo=1&bar=2",                     p5 ), "http://jqm.com/?foo=1&bar=2", "protocol relative root with query - absolute root" );
		same( mua( "/?foo=1&bar=2",                              p5 ), "http://jqm.com/?foo=1&bar=2", "site relative root with query - absolute root" );
		same( mua( "?foo=1&bar=2",                               p5 ), "http://jqm.com/test.php?foo=1&bar=2", "query relative - absolute root" );

		same( mua( "http://jqm.com/#spaz",                       p5 ), "http://jqm.com/#spaz", "absolute root with fragment - absolute root" );
		same( mua( "//jqm.com/#spaz",                            p5 ), "http://jqm.com/#spaz", "protocol relative root with fragment - absolute root" );
		same( mua( "/#spaz",                                     p5 ), "http://jqm.com/#spaz", "site relative root with fragment - absolute root" );
		same( mua( "#spaz",                                      p5 ), "http://jqm.com/test.php#spaz", "fragment relative - absolute root" );

		same( mua( "http://jqm.com/?foo=1&bar=2#spaz",           p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "absolute root with query and fragment - absolute root" );
		same( mua( "//jqm.com/?foo=1&bar=2#spaz",                p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "protocol relative root with query and fragment - absolute root" );
		same( mua( "/?foo=1&bar=2#spaz",                         p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "site relative root with query and fragment - absolute root" );
		same( mua( "?foo=1&bar=2#spaz",                          p5 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "query relative and fragment - absolute root" );
	});

	// https://github.com/jquery/jquery-mobile/issues/2362
	test( "ipv6 host support", function(){
		// http://www.ietf.org/rfc/rfc2732.txt ipv6 examples for tests
		// most definitely not comprehensive
		var	ipv6_1 = "http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html",
			ipv6_2 = "http://[1080:0:0:0:8:800:200C:417A]/index.html",
			ipv6_3 = "http://[3ffe:2a00:100:7031::1]",
			ipv6_4 = "http://[1080::8:800:200C:417A]/foo",
			ipv6_5 = "http://[::192.9.5.5]/ipng",
			ipv6_6 = "http://[::FFFF:129.144.52.38]:80/index.html",
			ipv6_7 = "http://[2010:836B:4179::836B:4179]",
		  fromIssue = "http://[3fff:cafe:babe::]:443/foo";

		same( $.mobile.path.parseUrl(ipv6_1).host, "[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80");
		same( $.mobile.path.parseUrl(ipv6_1).hostname, "[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]");
		same( $.mobile.path.parseUrl(ipv6_2).host, "[1080:0:0:0:8:800:200C:417A]");
		same( $.mobile.path.parseUrl(ipv6_3).host, "[3ffe:2a00:100:7031::1]");
		same( $.mobile.path.parseUrl(ipv6_4).host, "[1080::8:800:200C:417A]");
		same( $.mobile.path.parseUrl(ipv6_5).host, "[::192.9.5.5]");
		same( $.mobile.path.parseUrl(ipv6_6).host, "[::FFFF:129.144.52.38]:80");
		same( $.mobile.path.parseUrl(ipv6_6).hostname, "[::FFFF:129.144.52.38]");
		same( $.mobile.path.parseUrl(ipv6_7).host, "[2010:836B:4179::836B:4179]");
		same( $.mobile.path.parseUrl(fromIssue).host, "[3fff:cafe:babe::]:443");
		same( $.mobile.path.parseUrl(fromIssue).hostname, "[3fff:cafe:babe::]");
	});

	test( "path.clean is working properly", function(){
		var localroot = location.protocol + "//" + location.host + location.pathname,
			remoteroot = "http://google.com/",
			fakepath = "#foo/bar/baz.html",
			pathWithParam = localroot + "bar?baz=" + localroot,
			localpath = localroot + fakepath,
			remotepath = remoteroot + fakepath;

		same( $.mobile.path.clean( localpath ), location.pathname + fakepath, "removes location protocol, host, and portfrom same-domain path");
		same( $.mobile.path.clean( remotepath ), remotepath, "does nothing to an external domain path");
		same( $.mobile.path.clean( pathWithParam ), location.pathname + "bar?baz=" + localroot, "doesn't remove params with localroot value");
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

	test( "path.isRelativeUrl is working properly", function(){
		same( $.mobile.path.isRelativeUrl("http://company.com/"), false, "absolute url is not relative" );
		same( $.mobile.path.isRelativeUrl("//company.com/"), true, "protocol relative url is relative" );
		same( $.mobile.path.isRelativeUrl("/"), true, "site relative url is relative" );

		same( $.mobile.path.isRelativeUrl("http://company.com/test.php"), false, "absolute url is not relative" );
		same( $.mobile.path.isRelativeUrl("//company.com/test.php"), true, "protocol relative url is relative" );
		same( $.mobile.path.isRelativeUrl("/test.php"), true, "site relative url is relative" );
		same( $.mobile.path.isRelativeUrl("test.php"), true, "document relative url is relative" );

		same( $.mobile.path.isRelativeUrl("http://company.com/dir1/dir2/test.php?foo=1&bar=2#frag"), false, "absolute url is not relative" );
		same( $.mobile.path.isRelativeUrl("//company.com/dir1/dir2/test.php?foo=1&bar=2#frag"), true, "protocol relative url is relative" );
		same( $.mobile.path.isRelativeUrl("/dir1/dir2/test.php?foo=1&bar=2#frag"), true, "site relative url is relative" );
		same( $.mobile.path.isRelativeUrl("dir1/dir2/test.php?foo=1&bar=2#frag"), true, "document relative path url is relative" );
		same( $.mobile.path.isRelativeUrl("test.php?foo=1&bar=2#frag"), true, "document relative file url is relative" );
		same( $.mobile.path.isRelativeUrl("?foo=1&bar=2#frag"), true, "query relative url is relative" );
		same( $.mobile.path.isRelativeUrl("#frag"), true, "fragments are relative" );
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

	test( "path.cleanHash", function(){
		same( $.mobile.path.cleanHash( "#anything/atall?akjfdjjf" ), "anything/atall", "removes query param");
		same( $.mobile.path.cleanHash( "#nothing/atall" ), "nothing/atall", "removes query param");
	});

	test( "path.isPermittedCrossDomainRequest", function() {
		var fileDocUrl = $.mobile.path.parseUrl( "file://foo" );

		$.mobile.allowCrossDomainPages = false;
		same( $.mobile.path.isPermittedCrossDomainRequest( "foo",  "bar"), false, "always false from the setting");


		$.mobile.allowCrossDomainPages = true;
		// test the two states of the file protocol logic
		same( $.mobile.path.isPermittedCrossDomainRequest( fileDocUrl,  "http://bar.com/foo"), true, "external url from file protocol succeeds");

		same( $.mobile.path.isPermittedCrossDomainRequest( fileDocUrl,  "file://foo"), false, "two file protocol urls fail");

	});
})(jQuery);