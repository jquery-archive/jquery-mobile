/*
 * Mobile navigation unit tests
 */
define( [ "jquery", "qunit" ], function( $, QUnit ) {

var home = $.mobile.path.parseUrl( location.pathname ).directory,
	homeWithSearch = home + location.search;

QUnit.module( "jquery.mobile.navigation.js", {
	setup: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
		$.testHelper.navReset( homeWithSearch );
	}
} );

QUnit.test( "path.get method is working properly", function( assert ) {
	window.location.hash = "foo";
	assert.deepEqual( $.mobile.path.get(), "foo", "get method returns location.hash minus hash character" );
	assert.deepEqual( $.mobile.path.get( "#foo/bar/baz.html" ), "foo/bar/", "get method with hash arg returns path with no filename or hash prefix" );
	assert.deepEqual( $.mobile.path.get( "#foo/bar/baz.html/" ), "foo/bar/baz.html/", "last segment of hash is retained if followed by a trailing slash" );
} );

QUnit.test( "path.isPath method is working properly", function( assert ) {
	assert.ok( !$.mobile.path.isPath( "bar" ), "anything without a slash is not a path" );
	assert.ok( $.mobile.path.isPath( "bar/" ), "anything with a slash is a path" );
	assert.ok( $.mobile.path.isPath( "/bar" ), "anything with a slash is a path" );
	assert.ok( $.mobile.path.isPath( "a/r" ), "anything with a slash is a path" );
	assert.ok( $.mobile.path.isPath( "/" ), "anything with a slash is a path" );
} );

QUnit.test( "path.set method is working properly", function( assert ) {
	$.mobile.navigate.history.ignoreNextHashChange = false;
	$.mobile.path.set( "foo" );
	assert.deepEqual( "foo", window.location.hash.replace( /^#/, "" ), "sets location.hash properly" );
} );

QUnit.test( "path.makeUrlAbsolute is working properly", function( assert ) {
	var mua = $.mobile.path.makeUrlAbsolute,
		p1 = "http://jqm.com/",
		p5 = "http://jqm.com/test.php";


	// Test URL conversion against an absolute URL to the site root.
	// directory tests
	assert.deepEqual( mua( "http://jqm.com/", p1 ), "http://jqm.com/", "absolute root - absolute root" );
	assert.deepEqual( mua( "//jqm.com/", p1 ), "http://jqm.com/", "protocol relative root - absolute root" );
	assert.deepEqual( mua( "/", p1 ), "http://jqm.com/", "site relative root - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/?foo=1&bar=2", p1 ), "http://jqm.com/?foo=1&bar=2", "absolute root with query - absolute root" );
	assert.deepEqual( mua( "//jqm.com/?foo=1&bar=2", p1 ), "http://jqm.com/?foo=1&bar=2", "protocol relative root with query - absolute root" );
	assert.deepEqual( mua( "/?foo=1&bar=2", p1 ), "http://jqm.com/?foo=1&bar=2", "site relative root with query - absolute root" );
	assert.deepEqual( mua( "?foo=1&bar=2", p1 ), "http://jqm.com/?foo=1&bar=2", "query relative - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/#spaz", p1 ), "http://jqm.com/#spaz", "absolute root with fragment - absolute root" );
	assert.deepEqual( mua( "//jqm.com/#spaz", p1 ), "http://jqm.com/#spaz", "protocol relative root with fragment - absolute root" );
	assert.deepEqual( mua( "/#spaz", p1 ), "http://jqm.com/#spaz", "site relative root with fragment - absolute root" );
	assert.deepEqual( mua( "#spaz", p1 ), "http://jqm.com/#spaz", "fragment relative - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/?foo=1&bar=2#spaz", p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "absolute root with query and fragment - absolute root" );
	assert.deepEqual( mua( "//jqm.com/?foo=1&bar=2#spaz", p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "protocol relative root with query and fragment - absolute root" );
	assert.deepEqual( mua( "/?foo=1&bar=2#spaz", p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "site relative root with query and fragment - absolute root" );
	assert.deepEqual( mua( "?foo=1&bar=2#spaz", p1 ), "http://jqm.com/?foo=1&bar=2#spaz", "query relative and fragment - absolute root" );

	// File tests
	assert.deepEqual( mua( "http://jqm.com/test.php", p1 ), "http://jqm.com/test.php", "absolute file at root - absolute root" );
	assert.deepEqual( mua( "//jqm.com/test.php", p1 ), "http://jqm.com/test.php", "protocol relative file at root - absolute root" );
	assert.deepEqual( mua( "/test.php", p1 ), "http://jqm.com/test.php", "site relative file at root - absolute root" );
	assert.deepEqual( mua( "test.php", p1 ), "http://jqm.com/test.php", "document relative file at root - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/test.php?foo=1&bar=2", p1 ), "http://jqm.com/test.php?foo=1&bar=2", "absolute file at root with query - absolute root" );
	assert.deepEqual( mua( "//jqm.com/test.php?foo=1&bar=2", p1 ), "http://jqm.com/test.php?foo=1&bar=2", "protocol relative file at root with query - absolute root" );
	assert.deepEqual( mua( "/test.php?foo=1&bar=2", p1 ), "http://jqm.com/test.php?foo=1&bar=2", "site relative file at root with query - absolute root" );
	assert.deepEqual( mua( "test.php?foo=1&bar=2", p1 ), "http://jqm.com/test.php?foo=1&bar=2", "document relative file at root with query - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/test.php#spaz", p1 ), "http://jqm.com/test.php#spaz", "absolute file at root with fragment - absolute root" );
	assert.deepEqual( mua( "//jqm.com/test.php#spaz", p1 ), "http://jqm.com/test.php#spaz", "protocol relative file at root with fragment - absolute root" );
	assert.deepEqual( mua( "/test.php#spaz", p1 ), "http://jqm.com/test.php#spaz", "site relative file at root with fragment - absolute root" );
	assert.deepEqual( mua( "test.php#spaz", p1 ), "http://jqm.com/test.php#spaz", "file at root with fragment - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/test.php?foo=1&bar=2#spaz", p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "absolute file at root with query and fragment - absolute root" );
	assert.deepEqual( mua( "//jqm.com/test.php?foo=1&bar=2#spaz", p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "protocol relative file at root with query and fragment - absolute root" );
	assert.deepEqual( mua( "/test.php?foo=1&bar=2#spaz", p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "site relative file at root with query and fragment - absolute root" );
	assert.deepEqual( mua( "test.php?foo=1&bar=2#spaz", p1 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "query relative file at root fragment - absolute root" );

	// Test URL conversion against an absolute URL to a file at the site root.

	assert.deepEqual( mua( "http://jqm.com/", p5 ), "http://jqm.com/", "absolute root - absolute root" );
	assert.deepEqual( mua( "//jqm.com/", p5 ), "http://jqm.com/", "protocol relative root - absolute root" );
	assert.deepEqual( mua( "/", p5 ), "http://jqm.com/", "site relative root - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/?foo=1&bar=2", p5 ), "http://jqm.com/?foo=1&bar=2", "absolute root with query - absolute root" );
	assert.deepEqual( mua( "//jqm.com/?foo=1&bar=2", p5 ), "http://jqm.com/?foo=1&bar=2", "protocol relative root with query - absolute root" );
	assert.deepEqual( mua( "/?foo=1&bar=2", p5 ), "http://jqm.com/?foo=1&bar=2", "site relative root with query - absolute root" );
	assert.deepEqual( mua( "?foo=1&bar=2", p5 ), "http://jqm.com/test.php?foo=1&bar=2", "query relative - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/#spaz", p5 ), "http://jqm.com/#spaz", "absolute root with fragment - absolute root" );
	assert.deepEqual( mua( "//jqm.com/#spaz", p5 ), "http://jqm.com/#spaz", "protocol relative root with fragment - absolute root" );
	assert.deepEqual( mua( "/#spaz", p5 ), "http://jqm.com/#spaz", "site relative root with fragment - absolute root" );
	assert.deepEqual( mua( "#spaz", p5 ), "http://jqm.com/test.php#spaz", "fragment relative - absolute root" );

	assert.deepEqual( mua( "http://jqm.com/?foo=1&bar=2#spaz", p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "absolute root with query and fragment - absolute root" );
	assert.deepEqual( mua( "//jqm.com/?foo=1&bar=2#spaz", p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "protocol relative root with query and fragment - absolute root" );
	assert.deepEqual( mua( "/?foo=1&bar=2#spaz", p5 ), "http://jqm.com/?foo=1&bar=2#spaz", "site relative root with query and fragment - absolute root" );
	assert.deepEqual( mua( "?foo=1&bar=2#spaz", p5 ), "http://jqm.com/test.php?foo=1&bar=2#spaz", "query relative and fragment - absolute root" );
} );

// https://github.com/jquery/jquery-mobile/issues/2362
QUnit.test( "ipv6 host support", function( assert ) {

	// http://www.ietf.org/rfc/rfc2732.txt ipv6 examples for tests
	// most definitely not comprehensive
	var ipv6One = "http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html",
		ipv6Two = "http://[1080:0:0:0:8:800:200C:417A]/index.html",
		ipv6Three = "http://[3ffe:2a00:100:7031::1]",
		ipv6Four = "http://[1080::8:800:200C:417A]/foo",
		ipv6Five = "http://[::192.9.5.5]/ipng",
		ipv6Six = "http://[::FFFF:129.144.52.38]:80/index.html",
		ipv6Seven = "http://[2010:836B:4179::836B:4179]",
		fromIssue = "http://[3fff:cafe:babe::]:443/foo";

	assert.deepEqual( $.mobile.path.parseUrl( ipv6One ).host, "[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6One ).hostname, "[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6Two ).host, "[1080:0:0:0:8:800:200C:417A]" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6Three ).host, "[3ffe:2a00:100:7031::1]" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6Four ).host, "[1080::8:800:200C:417A]" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6Five ).host, "[::192.9.5.5]" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6Six ).host, "[::FFFF:129.144.52.38]:80" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6Six ).hostname, "[::FFFF:129.144.52.38]" );
	assert.deepEqual( $.mobile.path.parseUrl( ipv6Seven ).host, "[2010:836B:4179::836B:4179]" );
	assert.deepEqual( $.mobile.path.parseUrl( fromIssue ).host, "[3fff:cafe:babe::]:443" );
	assert.deepEqual( $.mobile.path.parseUrl( fromIssue ).hostname, "[3fff:cafe:babe::]" );
} );

QUnit.test( "path.clean is working properly", function( assert ) {
	var localroot = location.protocol + "//" + location.host + location.pathname,
		remoteroot = "http://google.com/",
		fakepath = "#foo/bar/baz.html",
		pathWithParam = localroot + "bar?baz=" + localroot,
		localpath = localroot + fakepath,
		remotepath = remoteroot + fakepath;

	assert.deepEqual( $.mobile.path.clean( localpath ), location.pathname + fakepath, "removes location protocol, host, and portfrom same-domain path" );
	assert.deepEqual( $.mobile.path.clean( remotepath ), remotepath, "does nothing to an external domain path" );
	assert.deepEqual( $.mobile.path.clean( pathWithParam ), location.pathname + "bar?baz=" + localroot, "doesn't remove params with localroot value" );
} );

QUnit.test( "path.stripHash is working properly", function( assert ) {
	assert.deepEqual( $.mobile.path.stripHash( "#bar" ), "bar", "returns a hash without the # prefix" );
} );

QUnit.test( "path.hasProtocol is working properly", function( assert ) {
	assert.deepEqual( $.mobile.path.hasProtocol( "tel:5559999" ), true, "value in tel protocol format has protocol" );
	assert.deepEqual( $.mobile.path.hasProtocol( location.href ), true, "location href has protocol" );
	assert.deepEqual( $.mobile.path.hasProtocol( "foo/bar/baz.html" ), false, "simple directory path has no protocol" );
	assert.deepEqual( $.mobile.path.hasProtocol( "file://foo/bar/baz.html" ), true, "simple directory path with file:// has protocol" );
} );

QUnit.test( "path.isRelativeUrl is working properly", function( assert ) {
	assert.deepEqual( $.mobile.path.isRelativeUrl( "http://company.com/" ), false, "absolute url is not relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "//company.com/" ), true, "protocol relative url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "/" ), true, "site relative url is relative" );

	assert.deepEqual( $.mobile.path.isRelativeUrl( "http://company.com/test.php" ), false, "absolute url is not relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "//company.com/test.php" ), true, "protocol relative url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "/test.php" ), true, "site relative url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "test.php" ), true, "document relative url is relative" );

	assert.deepEqual( $.mobile.path.isRelativeUrl( "http://company.com/dir1/dir2/test.php?foo=1&bar=2#frag" ), false, "absolute url is not relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "//company.com/dir1/dir2/test.php?foo=1&bar=2#frag" ), true, "protocol relative url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "/dir1/dir2/test.php?foo=1&bar=2#frag" ), true, "site relative url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "dir1/dir2/test.php?foo=1&bar=2#frag" ), true, "document relative path url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "test.php?foo=1&bar=2#frag" ), true, "document relative file url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "?foo=1&bar=2#frag" ), true, "query relative url is relative" );
	assert.deepEqual( $.mobile.path.isRelativeUrl( "#frag" ), true, "fragments are relative" );
} );

QUnit.test( "path.isExternal is working properly", function( assert ) {
	assert.deepEqual( $.mobile.path.isExternal( location.href ), false, "same domain is not external" );
	assert.deepEqual( $.mobile.path.isExternal( "http://example.com" ), true, "example.com is external" );
	assert.deepEqual( $.mobile.path.isExternal( "mailto:" ), true, "mailto protocol" );
	assert.deepEqual( $.mobile.path.isExternal( "http://foo.com" ), true, "http protocol" );
	assert.deepEqual( $.mobile.path.isExternal( "http://www.foo.com" ), true, "http protocol with www" );
	assert.deepEqual( $.mobile.path.isExternal( "tel:16178675309" ), true, "tel protocol" );
	assert.deepEqual( $.mobile.path.isExternal( "foo.html" ), false, "filename" );
	assert.deepEqual( $.mobile.path.isExternal( "foo/foo/foo.html" ), false, "file path" );
	assert.deepEqual( $.mobile.path.isExternal( "../../index.html" ), false, "relative parent path" );
	assert.deepEqual( $.mobile.path.isExternal( "/foo" ), false, "root-relative path" );
	assert.deepEqual( $.mobile.path.isExternal( "foo" ), false, "simple string" );
	assert.deepEqual( $.mobile.path.isExternal( "#foo" ), false, "local id reference" );
} );

QUnit.test( "path.cleanHash", function( assert ) {
	assert.deepEqual( $.mobile.path.cleanHash( "#anything/atall?akjfdjjf" ), "anything/atall", "removes query param" );
	assert.deepEqual( $.mobile.path.cleanHash( "#nothing/atall" ), "nothing/atall", "removes query param" );
} );

QUnit.test( "path.isHashValid", function( assert ) {
	assert.deepEqual( $.mobile.path.isHashValid( "#id" ), true, "Valid hash" );
	assert.deepEqual( $.mobile.path.isHashValid( "#" ), false, "Empty hash" );
	assert.deepEqual( $.mobile.path.isHashValid( "#id#" ), false, "Hash with more than one #" );
	assert.deepEqual( $.mobile.path.isHashValid( "id" ), false, "Hash without #" );
	assert.deepEqual( $.mobile.path.isHashValid( "i#d" ), false, "Hash with # in the wrong spot" );
} );

QUnit.test( "path.isPermittedCrossDomainRequest", function( assert ) {
	var fileDocUrl = $.mobile.path.parseUrl( "file://foo" );

	$.mobile.allowCrossDomainPages = false;
	assert.deepEqual( $.mobile.path.isPermittedCrossDomainRequest( "foo", "bar" ), false, "always false from the setting" );

	$.mobile.allowCrossDomainPages = true;

	// Test the two states of the file protocol logic
	assert.deepEqual( $.mobile.path.isPermittedCrossDomainRequest( fileDocUrl, "http://bar.com/foo" ), true, "external url from file protocol succeeds" );

	assert.deepEqual( $.mobile.path.isPermittedCrossDomainRequest( fileDocUrl, "file://foo" ), false, "two file protocol urls fail" );

} );

QUnit.test( "path.getLocation works properly", function( assert ) {
	assert.equal( $.mobile.path.getLocation( "http://example.com/" ), "http://example.com/" );
	assert.equal( $.mobile.path.getLocation( "http://foo@example.com/" ), "http://example.com/" );
	assert.equal( $.mobile.path.getLocation( "http://foo:bar@example.com/" ), "http://example.com/" );
	assert.equal( $.mobile.path.getLocation( "http://<foo<:bar@example.com/" ), "http://example.com/" );
	assert.equal( $.mobile.path.getLocation( "x-wmapp0:www/index.html" ), "x-wmapp0:/www/index.html" );
	assert.equal( $.mobile.path.getLocation( "qrc:/index.html" ), "qrc:/index.html" );

	var allUriParts = "http://jblas:password@mycompany.com:8080/mail/inbox?msg=1234&type=unread#msg-content";

	assert.equal( $.mobile.path.getLocation( allUriParts ), allUriParts.replace( "jblas:password@", "" ) );
} );

QUnit.test( "calling mobile back uses phonegap's navigator object when present", function( assert ) {
	var previous = $.mobile.phonegapNavigationEnabled;

	assert.expect( 1 );

	$.mobile.phonegapNavigationEnabled = true;
	window.navigator = window.navigator || {};

	window.navigator.app = {
		backHistory: function() {
			assert.ok( true, "history back called" );
		}
	};

	$.mobile.back();
	$.mobile.phonegapNavigationEnabled = previous;
} );

QUnit.test( "make sure squash is working properly", function( assert ) {
	var squash = $.proxy( $.mobile.path.squash, $.mobile.path );

	assert.equal( squash( "#foo/bar.html", "http://example.com/" ), "http://example.com/foo/bar.html", "relative path hash" );
	assert.equal( squash( "foo/bar.html", "http://example.com/" ), "http://example.com/foo/bar.html", "document relative path" );
	assert.equal( squash( "#foo/bar.html", "http://example.com/bing/" ), "http://example.com/bing/foo/bar.html", "relative path hash applied to subdir" );
	assert.equal( squash( "foo/bar.html", "http://example.com/bing/" ), "http://example.com/bing/foo/bar.html", "relative path applied to subdir" );

	assert.equal( squash( "#foo/bar.html", "http://example.com/bing.html" ), "http://example.com/foo/bar.html", "relative path hash applied to subdocument" );
	assert.equal( squash( "foo/bar.html", "http://example.com/bing.html" ), "http://example.com/foo/bar.html", "relative path applied to subdocument" );

	assert.equal( squash( "http://example.com/#foo/bar.html", "http://example.com/" ), "http://example.com/foo/bar.html", "relative path hash on full url" );
	assert.equal( squash( "http://example.com/#foo/bar.html", "http://example.com/bing/" ), "http://example.com/bing/foo/bar.html", "relative path hash on full url applied to subdir" );

	assert.equal( squash( "http://example.com/#foo/bar.html", "http://example.com/bing.html" ), "http://example.com/foo/bar.html", "relative path hash on full url applied to subdocument" );

	assert.equal( squash( "#foo/bar.html&ui-state=foo", "http://example.com/" ), "http://example.com/foo/bar.html#&ui-state=foo", "relative path hash on full url" );
	assert.equal( squash( "foo/bar.html#&ui-state=foo", "http://example.com/" ), "http://example.com/foo/bar.html#&ui-state=foo", "relative path hash on full url" );

	assert.equal( squash( "#foo&ui-state=foo", "http://example.com/" ), "http://example.com/#foo&ui-state=foo", "ui-state keys attached to simple string hashes are preserved" );

	assert.equal( squash( "#/foo/bar/?foo=bar&baz=bak", "http://example.com/" ), "http://example.com/foo/bar/?foo=bar&baz=bak", "ui-state keys attached to simple string hashes are preserved" );

	assert.equal( squash( "#foo", "http://example.com/?foo=bar&baz=bak" ), "http://example.com/?foo=bar&baz=bak#foo", "ui-state keys attached to simple string hashes are preserved" );

} );

QUnit.test( "isSameDomain() compares domains case-insensitively", function( assert ) {
	assert.deepEqual(
		$.mobile.path.isSameDomain(
			"http://example.com/path/to/filename.html",
			"http://EXAmPLE.cOm/path/to/filename.html" ),
		true,
		"Domain comparison was case-insensitive" );
} );

( function() {

	var originalDocumentUrl,
		path = $.mobile.path;

	QUnit.module( "$.mobile.path.isExternal()", {
		setup: function() {
			originalDocumentUrl = path.documentUrl;
			path.documentUrl = path.parseUrl( "http://example.com/path/to/filename.html" );
		},
		teardown: function() {
			path.documentUrl = originalDocumentUrl;
		}
	} );

	QUnit.test( "$.mobile.path.isExternal() compares domains case-insensitively", function( assert ) {
		assert.deepEqual( path.isExternal( "http://EXAmPLE.CoM/path/to/other-filename.html" ), false,
			"Domain comparison was case-insensitive" );
	} );
} )();

} );
