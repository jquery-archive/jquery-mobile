/*
 * Content Widget Tests
 */
(function($){
	// TODO !! reset the prototype after every test

	var mockEvent, proto = $.mobile.pagecontainer.prototype, reset = $.extend( {}, proto );

	proto.element = $( "<div>" );

	module("Content Widget _filterNavigateEvents", {
		setup: function() {
			mockEvent = $.Event( "mock" );
			mockEvent.originalEvent = $.Event( "hashchange" );
		}
	});

	test( "rejects navigate events where the original event's default is prevented", function(){
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
			proto = $.mobile.pagecontainer.prototype;
		}
	});

	test( "continues backward when the active content isn't a dialog", function() {
		expect( 2 );

		proto.getActivePage = function() {
			return $( "<div>" );
		};

		proto.back = function(){
			ok( true, "back called" );
		};

		ok( !proto._handleDialog( {}, {direction: "back"} ), "returns false to prevent action" );
	});

	test( "continues forward when the active content isn't a dialog", function() {
		expect( 2 );

		proto.getActivePage = function() {
			return $( "<div>" );
		};

		proto.forward = function(){
			ok( true, "forward called" );
		};

		ok( !proto._handleDialog( {}, {direction: "forward"} ), "returns false to prevent action" );
	});

	test( "extends changePageOptions when current content is a dialog", function() {
		var result, opts = {};

		proto.getActivePage = function() {
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
			proto = $.mobile.pagecontainer.prototype;
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

	module( "Content Widget _find", {
		setup: function() {
			proto._getNs = function() {
				return "foo-";
			};

			proto.element = $( "<div>" );
		}
	});

	test( "returns the page container child matching the dataUrl first", function() {
		this.element = $( "<div><div data-foo-url='bar'></div></div>" );

		equal(
			proto._find( "bar" )[0],
			proto.element.children()[0],
			"returns the first child of the page container"
		);
	});

	test( "returns the child with the dataUrl id and corrects the data-url attr", function() {
		var result;

		proto.element = $( "<div><div id='bar'></div></div>" );

		equal( proto.element.children().first().attr( "data-foo-url" ), undefined );

		result = proto._find( "bar" ),

		equal(
			result[0],
			proto.element.children()[0],
			"returns the first child of the page container"
		);

		equal( result.attr( "data-foo-url"), "bar" );
	});

	test( "returns the first page when nothing matches", function() {
		proto._getInitialContent = function() {
			return $( "<div><div id='initial'></div></div>" ).children().first();
		};

		// using location.href as the fileUrl param ensures that path.isFirstPageUrl returns true
		ok( proto._find(location.href).is("#initial"), "matches the first page" );
	});

	module( "Content Widget _parse", {
		setup: function() {
			$.mobile.ns = "foo-";
		}
	});

	// TODO test that scripts are run when included in the HTML

	test( "returns first page with data role page", function() {
		var html;

		html = "<div data-foo-role='page' id='first'></div>" +
			"<div data-foo-role='dialog' id='second'></div>";
		equal( proto._parse( html ).attr("id"), "first" );
	});

	test( "returns first page with data role dialog", function() {
		var html, page;

		html = "<div data-foo-role='dialog' id='first'></div>" +
			"<div data-foo-role='page' id='second'></div>";

		page = proto._parse( html );

		equal( page.attr("id"), "first" );
		equal( page.attr( "data-foo-role" ), "dialog" );
	});

	test( "returns the body of the html wrapped in a page when no page exists", function() {
		var html, page;

		html = "<body>foo</body>";

		page = proto._parse( html );

		equal( page.attr("data-foo-role"), "page" );
		equal( page.text(), "foo" );
	});

	module( "Content Widget _setLoadedTitle", {
		setup: function() {
			$.mobile.ns = "foo-";
		}
	});

	test( "does nothing where the title is already defined for the page", function() {
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

	module( "Content Widget _triggerWithDeprecated" );

	test( "triggers both content* and page* events and includes data", function() {
		expect( 4 );

		proto.element.bind( "pagefoo", function( event, data ) {
			ok( true, "page event trigger" );
			equal( data.bar, "baz", "data is passed through" );
		});

		proto.element.bind( "pagecontainerfoo", function( event, data ) {
			ok( true, "content event trigger" );
			equal( data.bar, "baz", "data is passed through" );
		});

		proto._triggerWithDeprecated( "foo", { bar: "baz" } );
	});

	module( "Content Widget _include" );

	test( "include appends to the element", function() {
		var page = $( "<div>" );

		page.page = $.noop;
		proto.element = $( "<div>" );

		equal( proto.element.children().length, 0, "no children" );
		proto._include( page, {} );
		equal( proto.element.children().length, 1, "one child" );
	});

	test( "invokes the page method on the element with a role", function() {
		expect( 1 );
		var page = $( "<div>" );

		page.page = function( opts ){
			if( opts.role ){
				equal( opts.role, "foo" );
			}
		};

		proto._include( page, {role: "foo"} );
	});

	module( "Content Widget _loadUrl", {
		setup: function() {
			proto = reset;
			proto.element = $( "<div>" );
			reset = $.extend( {}, proto );
		}
	});

	test( "should call the transition method on success", function() {
		expect( 3 );

		proto.load = function( to, settings ) {
			ok( true, "load called" );

			// resolve with a url, options, and new content
			settings.deferred.resolve( "foo", {}, $( "<div id='newcontent'>" ) );
		};

		proto.transition = function( content ) {
			ok( content.is( "#newcontent" ), "new content is passed through" );
			ok( true, "change called" );
		};

		proto._loadUrl( "foo", {}, {} );
	});

	test( "should trigger pagecontainerchangefailed on failure", function() {
		expect( 2 );

		proto.load = function( to, settings ) {
			ok( true, "load called" );

			// reject with a url, options, and new content
			settings.deferred.reject( "foo", {} );
		};

		proto.element.bind( "pagecontainerchangefailed", function() {
			ok( true, "pagecontainerchangefailed was triggered" );
		});

		proto._loadUrl( "foo", {}, {} );
	});

	test( "should release page transition lock on failure", function() {
		expect( 2 );

		proto._releaseTransitionLock = function() {
			ok( true, "release lock called" );
		};

		proto.load = function( to, settings ) {
			ok( true, "load called" );

			// reject with a url, options, and new content
			settings.deferred.reject( "foo", {} );
		};

		proto._loadUrl( "foo", {}, {} );
	});

	test( "should remove active link class on failure", function() {
		expect( 2 );

		proto._removeActiveLinkClass = function() {
			ok( true, "remove active link called" );
		};

		proto.load = function( to, settings ) {
			ok( true, "load called" );

			// reject with a url, options, and new content
			settings.deferred.reject( "foo", {} );
		};

		proto._loadUrl( "foo", {}, {} );
	});
})(jQuery);
