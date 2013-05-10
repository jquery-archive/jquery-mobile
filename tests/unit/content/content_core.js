/*
 * Content Widget Tests
 */
(function($){
	// TODO !! reset the prototype after every test

	var mockEvent, proto = $.mobile.content.prototype;

	module("Content Widget _filterNavigateEvents", {
		setup: function() {
			mockEvent = $.Event( "mock" );
			mockEvent.originalEvent = $.Event( "hashchange" );
		}
	});

	test( "rejects navigate events where the origina event's default is prevented", function(){
		expect( 1 );

		mockEvent.originalEvent.isDefaultPrevented = function() {
			ok( true, "request for default status" );
			return true;
		};

		proto._handleNavigate = function() {
			throw "should not be called when the original event's default is prevented";
		};

		proto._filterNavigateEvents( mockEvent, {} );
	});

	test( "uses the hash in the state when the original event is a hashchange", function() {
		expect( 2 );

		proto._handleNavigate = function( url, state ) {
			equal( url, "foo", "the url is the hash stored in the state" );
			equal( state.hash, url, "hash stored in the state is used as the url" );
		};

		proto._filterNavigateEvents( mockEvent, { state: { hash: "foo" }} );
	});

	test( "uses the url in the state when the original event is NOT a hashchange", function() {
		expect( 2 );

		mockEvent.originalEvent = $.Event( "other" );

		proto._handleNavigate = function( url, state ) {
			equal( url, "bar", "the url is the url stored in the state: " + url );
			equal( state.url, url, "url stored in the state is used as the url: " + state.url );
		};

		proto._filterNavigateEvents( mockEvent, { state: { url: "bar" }} );
	});

	test( "uses the current hash when no url or hash is present", function() {
		expect( 1 );

		proto._handleNavigate = function( url, state ) {
			equal( url, "baz", "the url is the hash stored in the state" );
		};

		proto._getHash = function() {
			return "baz";
		};

		proto._filterNavigateEvents( mockEvent, { state: {}} );
	});

	test( "uses the current url when no hash is present", function() {
		expect( 1 );

		proto._handleNavigate = function( url, state ) {
			equal( url, location.href, "the url is the hash stored in the state" );
		};

		proto._getHash = function() {
			return "";
		};

		proto._filterNavigateEvents( mockEvent, { state: {}} );
	});

	module("Content Widget _handleDialog", {
		setup: function() {
			proto = $.mobile.content.prototype;
		}
	});

	test( "continues backward when the active content isn't a dialog", function() {
		expect( 2 );

		proto._getActiveContent = function() {
			return $( "<div>" );
		};

		proto._back = function(){
			ok( true, "back called" );
		};

		ok( !proto._handleDialog( {}, {direction: "back"} ), "returns false to prevent action" );
	});

	test( "continues forward when the active content isn't a dialog", function() {
		expect( 2 );

		proto._getActiveContent = function() {
			return $( "<div>" );
		};

		proto._forward = function(){
			ok( true, "forward called" );
		};

		ok( !proto._handleDialog( {}, {direction: "forward"} ), "returns false to prevent action" );
	});

	test( "extends changePageOptions when current content is a dialog", function() {
		var result, opts = {};

		proto._getActiveContent = function() {
			return $( "<div>", {"class": "ui-dialog"} );
		};

		proto._getActiveHistory = function() {
			return {
				role: "foo",
				transition: "bar"
			};
		};

		equal( opts.role, undefined );
		equal( opts.transition, undefined );
		equal( opts.reverse, undefined );

		// the pageUrl is returned for use as the target url when the active content is a dialog
		equal( proto._handleDialog( opts, {direction: "back", pageUrl: "baz" } ), "baz" );

		equal( opts.role, "foo" );
		equal( opts.transition, "bar" );
		equal( opts.reverse, true );
	});

	var base = "http://example.com/";

	module("Content Widget _handleDestination", {
		setup: function() {
			proto = $.mobile.content.prototype;
			proto._getHistory = function() {
				return {
					initialDst: "foo",
					stack: []
				};
			};

			proto._getDocumentBase = function() {
				return base;
			};
		}
	});

	test( "skips manipulation and returns the initial content if two is falsey", function() {
		proto._getInitialContent = function() {
			return "initial content";
		};

		equal( "initial content", proto._handleDestination( "" ), "avoids manip" );
	});

	test( "returns an absolute url when the argument is just a hash", function() {
		equal( base + "#foo", proto._handleDestination( "#foo" ) );
	});

	test( "returns the hashless value when the argument is a path", function() {
		equal( "foo/bar", proto._handleDestination( "#foo/bar" ) );
	});

	test( "returns initial content when the url is base plus initial destination", function() {
		var initialContent = $( "<div>" );

		proto._getHistory = function() {
			return {
				initialDst: "foo",
				stack: [ {url: "will not be equal to initial destination"} ]
			};
		};

		proto._getInitialContent = function() {
			return initialContent;
		};

		equal( initialContent, proto._handleDestination(base + "#" + proto._getHistory().initialDst) );
	});

	module( "Content Widget _recordScroll" );

	test( "does not record scroll position when disabled", function() {
		expect( 0 );

		proto._getActiveHistory = function() {
			ok( false, "_getActiveHistory should never be called" );
		};

		proto._disableRecordScroll();
		proto._recordScroll();
	});

	test( "prefers last scroll when it's larger than the minimum scroll", function() {
		expect( 1 );

		var active = {};

		proto._getActiveHistory = function() {
			return active;
		};

		proto._getMinScroll = function() {
			return 50;
		};

		proto._getScroll = function() {
			return 100;
		};

		proto._enableRecordScroll();
		proto._recordScroll();

		equal( active.lastScroll, 100, "should be equal to _getScroll value" );
	});

	test( "prefers default scroll when current scroll < default scroll", function() {
		expect( 1 );

		var active = {};

		proto._getActiveHistory = function() {
			return active;
		};

		// min scroll
		proto._getMinScroll = function() {
			return 50;
		};

		// current scroll
		proto._getScroll = function() {
			return 25;
		};

		// default scroll
		proto._getDefaultScroll = function() {
			return 1;
		};

		proto._enableRecordScroll();
		proto._recordScroll();

		equal( active.lastScroll, 1, "should be equal to _getScroll value" );
	});

	module( "Content Widget _findExistingPage", {
		setup: function() {
			proto._getNs = function() {
				return "foo-";
			};
		}
	});

	test( "returns the page container child matching the dataUrl first", function() {
		var settings = {
			pageContainer: $( "<div><div data-foo-url='bar'></div></div>" )
		};

		equal(
			proto._findExistingPage( settings, "bar" )[0],
			settings.pageContainer.children()[0],
			"returns the first child of the page container"
		);
	});

	test( "returns the child with the dataUrl id and corrects the data-url attr", function() {
		var result, settings = {
			pageContainer: $( "<div><div id='bar'></div></div>" )
		};

		equal( settings.pageContainer.children().first().attr( "data-foo-url" ), undefined );

		result = proto._findExistingPage( settings, "bar" ),

		equal(
			result[0],
			settings.pageContainer.children()[0],
			"returns the first child of the page container"
		);

		equal( result.attr( "data-foo-url"), "bar" );
	});

	test( "returns the child with the dataUrl id and corrects the data-url attr", function() {
		var settings = {
			pageContainer: $( "<div></div>" )
		};

		proto._getInitialContent = function() {
			return $( "<div><div id='initial'></div></div>" ).children().first();
		};

		// using location.href as the fileUrl param ensures that path.isFirstPageUrl returns true
		ok( proto._findExistingPage(settings, "bar", location.href ).is("#initial") );
	});

	module( "Content Widget _findLoaded", {
		setup: function() {
			$.mobile.ns = "foo-";
		}
	});

	// TODO test that scripts are run when included in the HTML

	test( "returns first page with data role page", function() {
		var html;

		html = "<div data-foo-role='page' id='first'></div>" +
			"<div data-foo-role='dialog' id='second'></div>";
		equal( proto._findLoaded( html ).attr("id"), "first" );
	});

	test( "returns first page with data role dialog", function() {
		var html, page;

		html = "<div data-foo-role='dialog' id='first'></div>" +
			"<div data-foo-role='page' id='second'></div>";

		page = proto._findLoaded( html );

		equal( page.attr("id"), "first" );
		equal( page.attr( "data-foo-role" ), "dialog" );
	});

	test( "returns the body of the html wrapped in a page when no page exists", function() {
		var html, page;

		html = "<body>foo</body>";

		page = proto._findLoaded( html );

		equal( page.attr("data-foo-role"), "page" );
		equal( page.text(), "foo" );
	});

	module( "Content Widget _setLoadedTitle", {
		setup: function() {
			$.mobile.ns = "foo-";
		}
	});

	test( "does nothing where the title is alread defined for the page", function() {
		var html, page, pageHtml;

		pageHtml = "<div data-foo-role='page' data-foo-title='bar'></div>";
		page = $( pageHtml );
		html = "<title>baz</title>" + pageHtml;

		proto._setLoadedTitle( page, html );

		equal( page.jqmData("title"), "bar" );
	});

	test( "adds the title to the page from the html", function() {
		var html, page, pageHtml;

		pageHtml = "<div data-foo-role='page'></div>";
		page = $( pageHtml );
		html = "<title>baz</title>" + pageHtml;

		proto._setLoadedTitle( page, html );

		equal( page.jqmData("title"), "baz" );
	});

	test( "prevents injection", function() {
		var html, page, pageHtml;

		pageHtml = "<div data-foo-role='page'></div>";
		page = $( pageHtml );
		html = "<title><script>foo</script></title>";

		proto._setLoadedTitle( page, html );

		equal( page.jqmData("title"), undefined );
	});
})(jQuery);
