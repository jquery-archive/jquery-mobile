define( [ "qunit", "jquery" ], function( QUnit, $ ) {

var eventSequence,
	eventsList = [

		// Deprecated as of 1.4.x
		"pagebeforechange",
		"pagebeforeload",
		"pageload",
		"pageloadfailed",
		"pagebeforehide",
		"pagebeforeshow",
		"pagehide",
		"pageshow",
		"pagechange",

		// Valid as of 1.4.x
		"pagecontainerbeforechange",
		"pagecontainerbeforeload",
		"pagecontainerload",
		"pagecontainerloadfailed",
		"pagebeforecreate",
		"pagecreate",
		"pagecontainerbeforetransition",
		"pagecontainerbeforehide",
		"pagecontainerbeforeshow",
		"pagecontainerhide",
		"pagecontainershow",
		"pagecontainertransition",
		"pagecontainerchange"
	].join( " " ),
	dataItem = function( item ) {
		return ( item ?
			( item.jquery ?
				item.attr( "id" ) :
				$.type( item ) === "string" ?
					item :
					"unknown" ) :
			undefined );
	},
	recordEvent = function( event, data ) {
		eventSequence.push( {
			type: event.type,
			target: event.target.getAttribute( "id" ),
			data: {
				prevPage: data && dataItem( data.prevPage ),
				nextPage: data && dataItem( data.nextPage ),
				toPage: data && dataItem( data.toPage )
			}
		} );
	};

QUnit.module( "Page event sequence tests", {
	beforeEach: function() {
		eventSequence = [];

		$( document ).on( eventsList, recordEvent );
	},
	afterEach: function() {
		$( document ).off( eventsList, recordEvent );
	}
} );

function makeOtherPageUrl( filename ) {
	var path = $.mobile.path,
		parsedUrl = path.parseLocation();

	return path.getLocation( $.extend( parsedUrl, {
		filename: filename,
		pathname: parsedUrl.directory + filename,
		hash: "",
		search: ""
	} ) );
}

QUnit.test( "Event sequence during navigation to another page", function( assert ) {
	var ready = assert.async();
	assert.expect( 1 );

	var otherPageUrl = makeOtherPageUrl( "other-page.html" ),
		expectedEventSequence = [

			// Deprecated as of 1.4.0
			{ type: "pagebeforechange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Valid
			{ type: "pagecontainerbeforechange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforeload", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Valid
			{ type: "pagecontainerbeforeload", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Deprecated as of 1.4.0
			{ type: "pageload", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerload", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid - page widget events
			{ type: "pagebeforecreate", target: "other-page",
			data: { prevPage: undefined, nextPage: undefined, toPage: undefined } },
			{ type: "pagecreate", target: "other-page",
			data: { prevPage: undefined, nextPage: undefined, toPage: undefined } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforechange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerbeforechange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerbeforetransition", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforehide", target: "start-page",
			data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Valid, but nextPage is deprecated as of 1.4.0
			{ type: "pagecontainerbeforehide", target: "the-body",
			data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforeshow", target: "other-page",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerbeforeshow", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagehide", target: "start-page",
			data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Valid, but nextPage is deprecated as of 1.4.0
			{ type: "pagecontainerhide", target: "the-body",
			data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pageshow", target: "other-page",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainershow", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainertransition", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagechange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerchange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } }
		];

	$.testHelper.pageSequence( [
		function() {
			$( "#go-to-other-page" ).click();
		},
		function() {
			assert.deepEqual( eventSequence, expectedEventSequence, "Event sequence as expected" );
			$( ":mobile-pagecontainer" ).pagecontainer( "back" );
		},
		function() {
			ready();
		}
	] );
} );

QUnit.test( "Event sequence during page load failure", function( assert ) {
	var ready = assert.async();
	assert.expect( 1 );

	var otherPageUrl = makeOtherPageUrl( "page-does-not-exist.html" ),
		expectedEventSequence = [

			// Deprecated as of 1.4.0
			{ type: "pagebeforechange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Valid
			{ type: "pagecontainerbeforechange", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforeload", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Valid
			{ type: "pagecontainerbeforeload", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Deprecated as of 1.4.0
			{ type: "pageloadfailed", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Valid
			{ type: "pagecontainerloadfailed", target: "the-body",
			data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } }
		];

	$.testHelper.detailedEventCascade( [
		function() {
			$( "#go-to-nonexistent-page" ).click();
		},
		{
			pagecontainerloadfailed: {
				src: $( ":mobile-pagecontainer" ),
				event: "pagecontainerloadfailed.eventSequenceDuringPageLoadFailure1"
			}
		},
		function() {
			assert.deepEqual( eventSequence, expectedEventSequence, "Event sequence as expected" );
			ready();
		}
	] );
} );
QUnit.module( "load method" );
QUnit.test( "load does not trigger an error when called without a second param",
	function( assert ) {
		var otherPageUrl = makeOtherPageUrl( "other-page.html" ),
			pagecontainer = $( ":mobile-pagecontainer" );

		assert.throws( !pagecontainer.pagecontainer( "load", otherPageUrl ) );
	} );

} );
