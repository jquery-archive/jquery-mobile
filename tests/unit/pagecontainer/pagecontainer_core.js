define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.test( "_find() can handle weird data-url attributes", function( assert ) {
	assert.deepEqual(
		$.mobile.pagecontainer.prototype._find.call( {
			_createFileUrl: $.mobile.pagecontainer.prototype._createFileUrl,
			_createDataUrl: $.mobile.pagecontainer.prototype._createDataUrl,
			_getInitialContent: $.mobile.pagecontainer.prototype._getInitialContent,
			element: $( "body" ),
			_getNs: $.mobile.pagecontainer.prototype._getNs

		}, "Raison d'être.html" )[ 0 ],
		$( ".weird-data-url" )[ 0 ],
		"Correct element is retrieved when the file name is weird" );
} );

( function() {
var triggerData,
	originalLoad = $.mobile.pagecontainer.prototype._triggerWithDeprecated;
QUnit.module( "load method", {
	setup: function() {
		$.mobile.pagecontainer.prototype._triggerWithDeprecated = function( eventName, data ) {
			triggerData = data;
			return {
				deprecatedEvent: {
					isDefaultPrevented: function() {
						return true;
					}
				},
				event: {
					isDefaultPrevented: true
				}
			};
		};
	},
	teardown: function() {
		triggerData = null;
		$.mobile.pagecontainer.prototype._triggerWithDeprecated = originalLoad;
	}
} );
QUnit.test( "load does not trigger an error when called withput a second param",
	function( assert ) {
	var pagecontainer = $( ":mobile-pagecontainer" );

	pagecontainer.pagecontainer( "load", "stuff.html" );
	assert.ok( "no error triggered when load method called without options" );
} );

QUnit.test( "Options 'reload' works",
	function( assert ) {
	var pagecontainer = $( ":mobile-pagecontainer" );

	pagecontainer.pagecontainer( "load", "stuff.html", {
		reload: true
	} );

	assert.strictEqual( triggerData.options.reload, true,
		"The value of option 'reload' is not affected by the value of option 'reloadPage'" );
} );

QUnit.module( "_handleDialog()" );

QUnit.test( "Recognize dialog via presence of the data key, not the ui-page-dialog class",
	function( assert ) {
	var getActiveHistoryCalled = false;

	assert.strictEqual( $.mobile.pagecontainer.prototype._handleDialog.call( {
		getActivePage: function() {
			return $( "<div class='ui-page-dialog'></div>" );
		},
		_getActiveHistory: function() {
			getActiveHistoryCalled = true;
			return {};
		},
		back: $.noop,
		forward: $.noop
	}, {}, {
		pageUrl: "xyzzy.html"
	} ), false, "page is recognized as page even when the ui-page-dialog class is present" );

	assert.strictEqual( getActiveHistoryCalled, false,
		"_getActiveHistory() should not have been called" );
} );

} )();

} );
