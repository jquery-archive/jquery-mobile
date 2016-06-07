/*
 * Content Widget Tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

// TODO !! reset the prototype after every test

var mockEvent,
	proto,
	reset = $.mobile.pagecontainer.prototype;

QUnit.module( "Content Widget _filterNavigateEvents", {
	setup: function() {
		mockEvent = $.Event( "mock" );
		mockEvent.originalEvent = $.Event( "hashchange" );
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	},
	teardown: function() {
	}
} );

QUnit.test( "rejects navigate events where the original event's default is prevented",
	function( assert ) {
	assert.expect( 1 );

	mockEvent.originalEvent.isDefaultPrevented = function() {
		assert.ok( true, "request for default status" );
		return true;
	};

	proto._handleNavigate = function() {
		throw "should not be called when the original event's default is prevented";
	};

	proto._filterNavigateEvents( mockEvent, {} );
} );

QUnit.test( "uses the hash in the state when the original event is a hashchange",
	function( assert ) {
	assert.expect( 2 );

	proto._handleNavigate = function( url, state ) {
		assert.equal( url, "foo", "the url is the hash stored in the state" );
		assert.equal( state.hash, url, "hash stored in the state is used as the url" );
	};

	proto._filterNavigateEvents( mockEvent, { state: { hash: "foo" } } );
} );

QUnit.test( "uses the url in the state when the original event is NOT a hashchange",
	function( assert ) {
	assert.expect( 2 );

	mockEvent.originalEvent = $.Event( "other" );

	proto._handleNavigate = function( url, state ) {
		assert.equal( url, "bar", "the url is the url stored in the state: " + url );
		assert.equal( state.url, url, "url stored in the state is used as the url: " + state.url );
	};

	proto._filterNavigateEvents( mockEvent, { state: { url: "bar" } } );
} );

QUnit.test( "uses the current hash when no url or hash is present",
	function( assert ) {
	assert.expect( 1 );

	proto._handleNavigate = function( url ) {
		assert.equal( url, "baz", "the url is the hash stored in the state" );
	};

	proto._getHash = function() {
		return "baz";
	};

	proto._filterNavigateEvents( mockEvent, { state: {} } );
} );

QUnit.test( "uses the current url when no hash is present", function( assert ) {
	assert.expect( 1 );

	proto._handleNavigate = function( url ) {
		assert.equal( url, location.href, "the url is the hash stored in the state" );
	};

	proto._getHash = function() {
		return "";
	};

	proto._filterNavigateEvents( mockEvent, { state: {} } );
} );

QUnit.module( "Content Widget _handleDialog", {
	setup: function() {
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	}
} );

QUnit.test( "continues backward when the active content isn't a dialog", function( assert ) {
	assert.expect( 2 );

	proto.getActivePage = function() {
		return $( "<div>" );
	};

	proto.back = function() {
		assert.ok( true, "back called" );
	};

	assert.ok( !proto._handleDialog( {}, { direction: "back" } ),
		"returns false to prevent action" );
} );

QUnit.test( "continues forward when the active content isn't a dialog", function( assert ) {
	assert.expect( 2 );

	proto.getActivePage = function() {
		return $( "<div>" );
	};

	proto.forward = function() {
		assert.ok( true, "forward called" );
	};

	assert.ok( !proto._handleDialog( {}, { direction: "forward" } ),
		"returns false to prevent action" );
} );

QUnit.test( "extends changePageOptions when current content is a dialog", function( assert ) {
	var opts = {};

	proto.getActivePage = function() {
		return $( "<div>" ).data( "mobile-dialog", true );
	};

	proto._getHistory = function() {
		return {
			length: 3,
			activeIndex: 1,
			lastIndex: 2,
			stack: [
				{
					role: "page",
					transition: "none"
				},
				{
					role: "foo",
					transition: "flip"
				},
				{
					role: "page",
					transition: "bar"
				}
			],
			getLast: function() {
				return this.stack[ this.lastIndex ];
			},
			getActive: function() {
				return this.stack[ this.activeIndex ];
			}
		};
	};

	assert.deepEqual( opts.role, undefined, "Initially, role is undefined" );
	assert.deepEqual( opts.transition, undefined, "Initially, transition is undefined" );
	assert.deepEqual( opts.reverse, undefined, "Initially, reverse is undefined" );

	// The pageUrl is returned for use as the target url when the active content is a dialog
	assert.deepEqual( proto._handleDialog( opts, { direction: "back", pageUrl: "baz" } ), "baz",
		"pageUrl is returned" );

	assert.deepEqual( opts.role, "foo", "Afterwards, role is 'foo'" );
	assert.deepEqual( opts.transition, "bar", "Afterwards, transition is 'bar'" );
	assert.deepEqual( opts.reverse, true, "Afterwards, reverse is true" );
} );

var base = "http://example.com/";

QUnit.module( "Content Widget _handleDestination", {
	setup: function() {
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );

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
} );

QUnit.test( "skips manipulation and returns the initial content if two is falsey",
	function( assert ) {
	proto._getInitialContent = function() {
		return "initial content";
	};

	assert.equal( "initial content", proto._handleDestination( "" ), "avoids manip" );
} );

QUnit.test( "returns an absolute url when the argument is just a hash",
	function( assert ) {
	assert.equal( base + "#foo", proto._handleDestination( "#foo" ) );
} );

QUnit.test( "returns the hashless value when the argument is a path",
	function( assert ) {
	assert.equal( "foo/bar", proto._handleDestination( "#foo/bar" ) );
} );

QUnit.module( "Content Widget _recordScroll", {
	setup: function() {
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	}
} );

QUnit.test( "does not record scroll position when disabled", function( assert ) {
	assert.expect( 0 );

	proto._getActiveHistory = function() {
		assert.ok( false, "_getActiveHistory should never be called" );
	};

	proto._disableRecordScroll();
	proto._recordScroll();
} );

QUnit.test( "prefers last scroll when it's larger than the minimum scroll",
	function( assert ) {
	assert.expect( 1 );

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

	assert.equal( active.lastScroll, 100, "should be equal to _getScroll value" );
} );

QUnit.test( "prefers default scroll when current scroll < default scroll",
	function( assert ) {
	assert.expect( 1 );

	var active = {};

	proto._getActiveHistory = function() {
		return active;
	};

	// Current scroll
	proto._getScroll = function() {
		return 0;
	};

	// Default scroll
	proto._getDefaultScroll = function() {
		return 1;
	};

	proto._enableRecordScroll();
	proto._recordScroll();

	assert.equal( active.lastScroll, 1, "should be equal to _getScroll value" );
} );

QUnit.module( "Content Widget _find", {
	setup: function() {
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );

		proto._getNs = function() {
			return "foo-";
		};
	}
} );

QUnit.test( "returns the page container child matching the dataUrl first",
	function( assert ) {
	this.element = $( "<div><div data-foo-url='bar'></div></div>" );

	assert.equal(
		proto._find( "bar" )[ 0 ],
		proto.element.children()[ 0 ],
		"returns the first child of the page container"
	);
} );

QUnit.test( "returns the child with the dataUrl id and corrects the data-url attr",
	function( assert ) {
	var result;

	proto.element = $( "<div><div id='bar'></div></div>" );

	assert.equal( proto.element.children().first().attr( "data-foo-url" ), undefined );

	result = proto._find( "bar" ),

	assert.equal(
		result[ 0 ],
		proto.element.children()[ 0 ],
		"returns the first child of the page container"
	);

	assert.equal( result.attr( "data-foo-url" ), "bar" );
} );

QUnit.test( "returns the first page when nothing matches", function( assert ) {
	proto._getInitialContent = function() {
		return $( "<div><div id='initial'></div></div>" ).children().first();
	};

	// Using location.href as the fileUrl param ensures that path.isFirstPageUrl returns true
	assert.ok( proto._find( location.href ).is( "#initial" ), "matches the first page" );
} );

QUnit.module( "Content Widget _parse", {
	setup: function() {
		$.mobile.ns = "foo-";
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	}
} );

// TODO test that scripts are run when included in the HTML

QUnit.test( "returns first page with data role page", function( assert ) {
	var html;

	html = "<div data-foo-role='page' id='first'></div>" +
		"<div data-foo-role='dialog' id='second'></div>";
	assert.equal( proto._parse( html ).attr( "id" ), "first" );
} );

QUnit.test( "returns first page with data role dialog", function( assert ) {
	var html, page;

	html = "<div data-foo-role='dialog' id='first'></div>" +
		"<div data-foo-role='page' id='second'></div>";

	page = proto._parse( html );

	assert.equal( page.attr( "id" ), "first" );
	assert.equal( page.attr( "data-foo-role" ), "dialog" );
} );

QUnit.test( "returns the body of the html wrapped in a page when no page exists",
	function( assert ) {
	var html, page;

	html = "<body>foo</body>";

	page = proto._parse( html );

	assert.equal( page.attr( "data-foo-role" ), "page" );
	assert.equal( page.text(), "foo" );
} );

QUnit.module( "Content Widget _setLoadedTitle", {
	setup: function() {
		$.mobile.ns = "foo-";
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	}
} );

QUnit.test( "does nothing where the title is already defined for the page",
	function( assert ) {
	var html, page, pageHtml;

	pageHtml = "<div data-foo-role='page' data-foo-title='bar'></div>";
	page = $( pageHtml );
	html = "<title>baz</title>" + pageHtml;

	proto._setLoadedTitle( page, html );

	assert.equal( page.jqmData( "title" ), "bar" );
} );

QUnit.test( "adds the title to the page from the html", function( assert ) {
	var html, page, pageHtml;

	pageHtml = "<div data-foo-role='page'></div>";
	page = $( pageHtml );
	html = "<title>baz</title>" + pageHtml;

	proto._setLoadedTitle( page, html );

	assert.equal( page.jqmData( "title" ), "baz" );
} );

QUnit.test( "prevents injection", function( assert ) {
	var html, page, pageHtml;

	pageHtml = "<div data-foo-role='page'></div>";
	page = $( pageHtml );
	html = "<title><script>foo</script></title>";

	proto._setLoadedTitle( page, html );

	assert.equal( page.jqmData( "title" ), undefined );
} );

QUnit.module( "Content Widget _triggerWithDeprecated", {
	setup: function() {
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	}
} );

QUnit.test( "triggers both content* and page* events and includes data",
	function( assert ) {
	assert.expect( 4 );

	proto.element.bind( "pagefoo", function( event, data ) {
		assert.ok( true, "page event trigger" );
		assert.equal( data.bar, "baz", "data is passed through" );
	} );

	proto.element.bind( "pagecontainerfoo", function( event, data ) {
		assert.ok( true, "content event trigger" );
		assert.equal( data.bar, "baz", "data is passed through" );
	} );

	proto._triggerWithDeprecated( "foo", { bar: "baz" } );
} );

QUnit.module( "Content Widget _include", {
	setup: function() {
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	}
} );

QUnit.test( "include appends to the element", function( assert ) {
	var page = $( "<div>" );

	page.page = $.noop;
	proto.element = $( "<div>" );

	assert.equal( proto.element.children().length, 0, "no children" );
	proto._include( page, {} );
	assert.equal( proto.element.children().length, 1, "one child" );
} );

QUnit.test( "invokes the page method on the element with a role", function( assert ) {
	assert.expect( 1 );
	var page = $( "<div>" );

	page.page = function( opts ) {
		if ( opts.role ) {
			assert.equal( opts.role, "foo" );
		}
	};

	proto._include( page, { role: "foo" } );
} );

QUnit.module( "Content Widget _loadUrl", {
	setup: function() {
		proto = reset;
		proto.element = $( "<div>" );
		reset = $.extend( {}, proto );
	}
} );

QUnit.test( "should call the transition method on success", function( assert ) {
	assert.expect( 3 );

	proto.load = function( to, settings ) {
		assert.ok( true, "load called" );

		// Resolve with a url, options, and new content
		settings.deferred.resolve( "foo", {}, $( "<div id='newcontent'>" ) );
	};

	proto.transition = function( content ) {
		assert.ok( content.is( "#newcontent" ), "new content is passed through" );
		assert.ok( true, "change called" );
	};

	proto._loadUrl( "foo", {}, {} );
} );

QUnit.test( "should trigger pagecontainerchangefailed on failure", function( assert ) {
	assert.expect( 2 );

	proto.load = function( to, settings ) {
		assert.ok( true, "load called" );

		// Reject with a url, options, and new content
		settings.deferred.reject( "foo", {} );
	};

	proto.element.bind( "pagecontainerchangefailed", function() {
		assert.ok( true, "pagecontainerchangefailed was triggered" );
	} );

	proto._loadUrl( "foo", {}, {} );
} );

QUnit.test( "should release page transition lock on failure", function( assert ) {
	assert.expect( 2 );

	proto._releaseTransitionLock = function() {
		assert.ok( true, "release lock called" );
	};

	proto.load = function( to, settings ) {
		assert.ok( true, "load called" );

		// Reject with a url, options, and new content
		settings.deferred.reject( "foo", {} );
	};

	proto._loadUrl( "foo", {}, {} );
} );

QUnit.test( "should remove active link class on failure", function( assert ) {
	assert.expect( 2 );

	proto._removeActiveLinkClass = function() {
		assert.ok( true, "remove active link called" );
	};

	proto.load = function( to, settings ) {
		assert.ok( true, "load called" );

		// Reject with a url, options, and new content
		settings.deferred.reject( "foo", {} );
	};

	proto._loadUrl( "foo", {}, {} );
} );

QUnit.test( "_find() does not throw upon encountering a weird file name", function( assert ) {
	var errorThrown,
		proto = $.mobile.pagecontainer.prototype;

	try {
		proto._find.call( {
			_getNs: proto._getNs,
			_createFileUrl: proto._createFileUrl,
			_createDataUrl: proto._createDataUrl,
			_getInitialContent: function() {
				return $( "<div>" );
			},
			element: $( "<body>" )
		}, "http://localhost/Raison d'être.html" );
	} catch ( error ) {
		errorThrown = error;
	}

	assert.deepEqual( errorThrown, undefined, "Error was not thrown" );
} );

} );
