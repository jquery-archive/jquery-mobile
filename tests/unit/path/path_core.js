/*
 * mobile navigation unit tests
 */
(function($){
	var siteDirectory = location.pathname.replace(/[^/]+$/, ""),
		home = $.mobile.path.parseUrl(location.pathname).directory,
		homeWithSearch = home + location.search;

	module('jquery.mobile.navigation.js', {
		setup: function(){
			$.mobile.navigate.history.stack = [];
			$.mobile.navigate.history.activeIndex = 0;
			$.testHelper.navReset( homeWithSearch );
		}
	});

	test( "path.get method is working properly", function(){
		window.location.hash = "foo";
		deepEqual($.mobile.path.get(), "foo", "get method returns location.hash minus hash character");
		deepEqual($.mobile.path.get( "#foo/bar/baz.html" ), "foo/bar/", "get method with hash arg returns path with no filename or hash prefix");
		deepEqual($.mobile.path.get( "#foo/bar/baz.html/" ), "foo/bar/baz.html/", "last segment of hash is retained if followed by a trailing slash");
	});

	test( "path.isPath method is working properly", function(){
		ok(!$.mobile.path.isPath('bar'), "anything without a slash is not a path");
		ok($.mobile.path.isPath('bar/'), "anything with a slash is a path");
		ok($.mobile.path.isPath('/bar'), "anything with a slash is a path");
		ok($.mobile.path.isPath('a/r'), "anything with a slash is a path");
		ok($.mobile.path.isPath('/'), "anything with a slash is a path");
	});

	test( "path.getFilePath method is working properly", function(){
		deepEqual($.mobile.path.getFilePath("foo.html" + "&" + $.mobile.subPageUrlKey ), "foo.html", "returns path without sub page key");
	});

	test( "path.set method is working properly", function(){
		$.mobile.urlHistory.ignoreNextHashChange = false;
		$.mobile.path.set("foo");
		deepEqual("foo", window.location.hash.replace(/^#/,""), "sets location.hash properly");
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
		deepEqual( mua( "http://jqm.com/",                            p1 ), "http://jqm.com/", "absolute root - absolute root" );
		deepEqual( mua( "//jqm.com/",                                 p1 ), "http://jqm.com/", "protocol relative root - absolute root" );
		deepEqual( mua( "/",                                          p1 ), "http://jqm.com/", "site relative root - absolute root" );

		deepEqual( mua( "http://jqm.com/?foo=1&bar=2",                p1 ), "http://jqm.com/?foo=1&bar=2", "absolute root with query - absolute root" );
		deepEqual( mua( "//jqm.com/?foo=1&bar=2",                     p1 ), "http://jqm.com/?foo=1&bar=2", "protocol relative root with query - absolute root" );
		deepEqual( mua( "/?foo=1&bar=2",                              p1 ), "http://jqm.com/?foo=1&bar=2", "site relative root with query - absolute root" );
		deepEqual( mua( "?foo=1&bar=2",                               p1 ), "http://jqm.com/?foo=1&bar=2", "query relative - absolute root" );

		deepEqual( mua( "http://jqm.com/#spaz",                       p1 ), "http://jqm.com/#spaz", "absolute root with fragment - absolute root" );
		deepEqual( mua( "//jqm.com/#spaz",                            p1 ), "http://jqm.com/#spaz", "protocol relative root with fragment - absolute root" );
		deepEqual( mua( "/#spaz",                                     p1 ), "http://jqm.com/#spaz", "site relative root with fragment - absolute root" );
		deepEqual( mua( "#spaz",                                      p1 ), "http://jqm.com/#spaz", "fragment relative - absolute root" );

		deepEqual( mua( "http://jqm.com/?foo=1&bar=2#spaz",           p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "absolute root with query and fragment - absolute root" );
		deepEqual( mua( "//jqm.com/?foo=1&bar=2#spaz",                p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "protocol relative root with query and fragment - absolute root" );
		deepEqual( mua( "/?foo=1&bar=2#spaz",                         p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "site relative root with query and fragment - absolute root" );
		deepEqual( mua( "?foo=1&bar=2#spaz",                          p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "query relative and fragment - absolute root" );

		// file tests
		deepEqual( mua( "http://jqm.com/test.php",                    p1 ), "http://jqm.com/test.php", "absolute file at root - absolute root" );
		deepEqual( mua( "//jqm.com/test.php",                         p1 ), "http://jqm.com/test.php", "protocol relative file at root - absolute root" );
		deepEqual( mua( "/test.php",                                  p1 ), "http://jqm.com/test.php", "site relative file at root - absolute root" );
		deepEqual( mua( "test.php",                                   p1 ), "http://jqm.com/test.php", "document relative file at root - absolute root" );

		deepEqual( mua( "http://jqm.com/test.php?foo=1&bar=2",        p1 ), "http://jqm.com/test.php?foo=1&bar=2", "absolute file at root with query - absolute root" );
		deepEqual( mua( "//jqm.com/test.php?foo=1&bar=2",             p1 ), "http://jqm.com/test.php?foo=1&bar=2", "protocol relative file at root with query - absolute root" );
		deepEqual( mua( "/test.php?foo=1&bar=2",                      p1 ), "http://jqm.com/test.php?foo=1&bar=2", "site relative file at root with query - absolute root" );
		deepEqual( mua( "test.php?foo=1&bar=2",                       p1 ), "http://jqm.com/test.php?foo=1&bar=2", "document relative file at root with query - absolute root" );

		deepEqual( mua( "http://jqm.com/test.php#spaz",               p1 ), "http://jqm.com/test.php#spaz", "absolute file at root with fragment - absolute root" );
		deepEqual( mua( "//jqm.com/test.php#spaz",                    p1 ), "http://jqm.com/test.php#spaz", "protocol relative file at root with fragment - absolute root" );
		deepEqual( mua( "/test.php#spaz",                             p1 ), "http://jqm.com/test.php#spaz", "site relative file at root with fragment - absolute root" );
		deepEqual( mua( "test.php#spaz",                              p1 ), "http://jqm.com/test.php#spaz", "file at root with fragment - absolute root" );

		deepEqual( mua( "http://jqm.com/test.php?foo=1&bar=2#spaz",   p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "absolute file at root with query and fragment - absolute root" );
		deepEqual( mua( "//jqm.com/test.php?foo=1&bar=2#spaz",        p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "protocol relative file at root with query and fragment - absolute root" );
		deepEqual( mua( "/test.php?foo=1&bar=2#spaz",                 p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "site relative file at root with query and fragment - absolute root" );
		deepEqual( mua( "test.php?foo=1&bar=2#spaz",                  p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "query relative file at root fragment - absolute root" );

		// Test URL conversion against an absolute URL to a file at the site root.

		deepEqual( mua( "http://jqm.com/",                            p5 ), "http://jqm.com/", "absolute root - absolute root" );
		deepEqual( mua( "//jqm.com/",                                 p5 ), "http://jqm.com/", "protocol relative root - absolute root" );
		deepEqual( mua( "/",                                          p5 ), "http://jqm.com/", "site relative root - absolute root" );

		deepEqual( mua( "http://jqm.com/?foo=1&bar=2",                p5 ), "http://jqm.com/?foo=1&bar=2", "absolute root with query - absolute root" );
		deepEqual( mua( "//jqm.com/?foo=1&bar=2",                     p5 ), "http://jqm.com/?foo=1&bar=2", "protocol relative root with query - absolute root" );
		deepEqual( mua( "/?foo=1&bar=2",                              p5 ), "http://jqm.com/?foo=1&bar=2", "site relative root with query - absolute root" );
		deepEqual( mua( "?foo=1&bar=2",                               p5 ), "http://jqm.com/test.php?foo=1&bar=2", "query relative - absolute root" );

		deepEqual( mua( "http://jqm.com/#spaz",                       p5 ), "http://jqm.com/#spaz", "absolute root with fragment - absolute root" );
		deepEqual( mua( "//jqm.com/#spaz",                            p5 ), "http://jqm.com/#spaz", "protocol relative root with fragment - absolute root" );
		deepEqual( mua( "/#spaz",                                     p5 ), "http://jqm.com/#spaz", "site relative root with fragment - absolute root" );
		deepEqual( mua( "#spaz",                                      p5 ), "http://jqm.com/test.php#spaz", "fragment relative - absolute root" );

		deepEqual( mua( "http://jqm.com/?foo=1&bar=2#spaz",           p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "absolute root with query and fragment - absolute root" );
		deepEqual( mua( "//jqm.com/?foo=1&bar=2#spaz",                p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "protocol relative root with query and fragment - absolute root" );
		deepEqual( mua( "/?foo=1&bar=2#spaz",                         p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "site relative root with query and fragment - absolute root" );
		deepEqual( mua( "?foo=1&bar=2#spaz",                          p5 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "query relative and fragment - absolute root" );
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

		deepEqual( $.mobile.path.parseUrl(ipv6_1).host, "[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80");
		deepEqual( $.mobile.path.parseUrl(ipv6_1).hostname, "[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]");
		deepEqual( $.mobile.path.parseUrl(ipv6_2).host, "[1080:0:0:0:8:800:200C:417A]");
		deepEqual( $.mobile.path.parseUrl(ipv6_3).host, "[3ffe:2a00:100:7031::1]");
		deepEqual( $.mobile.path.parseUrl(ipv6_4).host, "[1080::8:800:200C:417A]");
		deepEqual( $.mobile.path.parseUrl(ipv6_5).host, "[::192.9.5.5]");
		deepEqual( $.mobile.path.parseUrl(ipv6_6).host, "[::FFFF:129.144.52.38]:80");
		deepEqual( $.mobile.path.parseUrl(ipv6_6).hostname, "[::FFFF:129.144.52.38]");
		deepEqual( $.mobile.path.parseUrl(ipv6_7).host, "[2010:836B:4179::836B:4179]");
		deepEqual( $.mobile.path.parseUrl(fromIssue).host, "[3fff:cafe:babe::]:443");
		deepEqual( $.mobile.path.parseUrl(fromIssue).hostname, "[3fff:cafe:babe::]");
	});

	test( "path.clean is working properly", function(){
		var localroot = location.protocol + "//" + location.host + location.pathname,
			remoteroot = "http://google.com/",
			fakepath = "#foo/bar/baz.html",
			pathWithParam = localroot + "bar?baz=" + localroot,
			localpath = localroot + fakepath,
			remotepath = remoteroot + fakepath;

		deepEqual( $.mobile.path.clean( localpath ), location.pathname + fakepath, "removes location protocol, host, and portfrom same-domain path");
		deepEqual( $.mobile.path.clean( remotepath ), remotepath, "does nothing to an external domain path");
		deepEqual( $.mobile.path.clean( pathWithParam ), location.pathname + "bar?baz=" + localroot, "doesn't remove params with localroot value");
	});

	test( "path.stripHash is working properly", function(){
		deepEqual( $.mobile.path.stripHash( "#bar" ), "bar", "returns a hash without the # prefix");
	});

	test( "path.hasProtocol is working properly", function(){
		deepEqual( $.mobile.path.hasProtocol( "tel:5559999" ), true, "value in tel protocol format has protocol" );
		deepEqual( $.mobile.path.hasProtocol( location.href ), true, "location href has protocol" );
		deepEqual( $.mobile.path.hasProtocol( "foo/bar/baz.html" ), false, "simple directory path has no protocol" );
		deepEqual( $.mobile.path.hasProtocol( "file://foo/bar/baz.html" ), true, "simple directory path with file:// has protocol" );
	});

	test( "path.isRelativeUrl is working properly", function(){
		deepEqual( $.mobile.path.isRelativeUrl("http://company.com/"), false, "absolute url is not relative" );
		deepEqual( $.mobile.path.isRelativeUrl("//company.com/"), true, "protocol relative url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("/"), true, "site relative url is relative" );

		deepEqual( $.mobile.path.isRelativeUrl("http://company.com/test.php"), false, "absolute url is not relative" );
		deepEqual( $.mobile.path.isRelativeUrl("//company.com/test.php"), true, "protocol relative url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("/test.php"), true, "site relative url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("test.php"), true, "document relative url is relative" );

		deepEqual( $.mobile.path.isRelativeUrl("http://company.com/dir1/dir2/test.php?foo=1&bar=2#frag"), false, "absolute url is not relative" );
		deepEqual( $.mobile.path.isRelativeUrl("//company.com/dir1/dir2/test.php?foo=1&bar=2#frag"), true, "protocol relative url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("/dir1/dir2/test.php?foo=1&bar=2#frag"), true, "site relative url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("dir1/dir2/test.php?foo=1&bar=2#frag"), true, "document relative path url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("test.php?foo=1&bar=2#frag"), true, "document relative file url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("?foo=1&bar=2#frag"), true, "query relative url is relative" );
		deepEqual( $.mobile.path.isRelativeUrl("#frag"), true, "fragments are relative" );
	});

	test( "path.isExternal is working properly", function(){
		deepEqual( $.mobile.path.isExternal( location.href ), false, "same domain is not external" );
		deepEqual( $.mobile.path.isExternal( "http://example.com" ), true, "example.com is external" );
		deepEqual($.mobile.path.isExternal("mailto:"), true, "mailto protocol");
		deepEqual($.mobile.path.isExternal("http://foo.com"), true, "http protocol");
		deepEqual($.mobile.path.isExternal("http://www.foo.com"), true, "http protocol with www");
		deepEqual($.mobile.path.isExternal("tel:16178675309"), true, "tel protocol");
		deepEqual($.mobile.path.isExternal("foo.html"), false, "filename");
		deepEqual($.mobile.path.isExternal("foo/foo/foo.html"), false, "file path");
		deepEqual($.mobile.path.isExternal("../../index.html"), false, "relative parent path");
		deepEqual($.mobile.path.isExternal("/foo"), false, "root-relative path");
		deepEqual($.mobile.path.isExternal("foo"), false, "simple string");
		deepEqual($.mobile.path.isExternal("#foo"), false, "local id reference");
	});

	test( "path.cleanHash", function(){
		deepEqual( $.mobile.path.cleanHash( "#anything/atall?akjfdjjf" ), "anything/atall", "removes query param");
		deepEqual( $.mobile.path.cleanHash( "#nothing/atall" ), "nothing/atall", "removes query param");
	});

	test( "path.isHashValid", function(){
        deepEqual( $.mobile.path.isHashValid( "#id" ), true, "Valid hash");
        deepEqual( $.mobile.path.isHashValid( "#" ), false, "Empty hash");
        deepEqual( $.mobile.path.isHashValid( "#id#" ), false, "Hash with more than one #");
        deepEqual( $.mobile.path.isHashValid( "id" ), false, "Hash without #");
        deepEqual( $.mobile.path.isHashValid( "i#d" ), false, "Hash with # in the wrong spot");
	});

	test( "path.isPermittedCrossDomainRequest", function() {
		var fileDocUrl = $.mobile.path.parseUrl( "file://foo" );

		$.mobile.allowCrossDomainPages = false;
		deepEqual( $.mobile.path.isPermittedCrossDomainRequest( "foo",  "bar"), false, "always false from the setting");


		$.mobile.allowCrossDomainPages = true;
		// test the two states of the file protocol logic
		deepEqual( $.mobile.path.isPermittedCrossDomainRequest( fileDocUrl,  "http://bar.com/foo"), true, "external url from file protocol succeeds");

		deepEqual( $.mobile.path.isPermittedCrossDomainRequest( fileDocUrl,  "file://foo"), false, "two file protocol urls fail");

	});

	test( "path.getLocation works properly", function() {
		equal( $.mobile.path.getLocation("http://example.com/"), "http://example.com/" );
		equal( $.mobile.path.getLocation("http://foo@example.com"), "http://example.com" );
		equal( $.mobile.path.getLocation("http://foo:bar@example.com"), "http://example.com" );
		equal( $.mobile.path.getLocation("http://<foo<:bar@example.com"), "http://example.com" );

		var allUriParts = "http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content";

		equal( $.mobile.path.getLocation( allUriParts ), allUriParts.replace( "jblas:password@", "") );
	});

	test( "calling mobile back uses phonegap's navigator object when present", function() {
		var previous = $.mobile.phonegapNavigationEnabled;

		expect( 1 );

		$.mobile.phonegapNavigationEnabled = true;
		window.navigator = window.navigator || {};

		window.navigator.app = {
			backHistory: function() {
				ok( true, "history back called" );
			}
		};

		$.mobile.back();
		$.mobile.phonegapNavigationEnabled = previous;
	});

	test( "make sure squash is working properly", function() {
		var squash = $.proxy( $.mobile.path.squash, $.mobile.path );

		equal( squash("#foo/bar.html", "http://example.com/"), "http://example.com/foo/bar.html", "relative path hash" );
		equal( squash("foo/bar.html", "http://example.com/"), "http://example.com/foo/bar.html", "document relative path" );
		equal( squash("#foo/bar.html", "http://example.com/bing/"), "http://example.com/bing/foo/bar.html", "relative path hash applied to subdir" );
		equal( squash("foo/bar.html", "http://example.com/bing/"), "http://example.com/bing/foo/bar.html", "relative path applied to subdir" );

		equal( squash("#foo/bar.html", "http://example.com/bing.html"), "http://example.com/foo/bar.html", "relative path hash applied to subdocument" );
		equal( squash("foo/bar.html", "http://example.com/bing.html"), "http://example.com/foo/bar.html", "relative path applied to subdocument" );


		equal( squash("http://example.com/#foo/bar.html", "http://example.com/"), "http://example.com/foo/bar.html", "relative path hash on full url" );
		equal( squash("http://example.com/#foo/bar.html", "http://example.com/bing/"), "http://example.com/bing/foo/bar.html", "relative path hash on full url applied to subdir" );

		equal( squash("http://example.com/#foo/bar.html", "http://example.com/bing.html"), "http://example.com/foo/bar.html", "relative path hash on full url applied to subdocument" );

		equal( squash("#foo/bar.html&ui-state=foo", "http://example.com/"), "http://example.com/foo/bar.html#&ui-state=foo", "relative path hash on full url" );
		equal( squash("foo/bar.html#&ui-state=foo", "http://example.com/"), "http://example.com/foo/bar.html#&ui-state=foo", "relative path hash on full url" );

		equal( squash("#foo&ui-state=foo", "http://example.com/"), "http://example.com/#foo&ui-state=foo", "ui-state keys attached to simple string hashes are preserved" );

		equal( squash("#/foo/bar/?foo=bar&baz=bak", "http://example.com/"), "http://example.com/foo/bar/?foo=bar&baz=bak", "ui-state keys attached to simple string hashes are preserved" );

		equal( squash("#foo", "http://example.com/?foo=bar&baz=bak"), "http://example.com/?foo=bar&baz=bak#foo", "ui-state keys attached to simple string hashes are preserved" );

	});
})(jQuery);
