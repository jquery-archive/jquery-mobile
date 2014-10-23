test( "_find() can handle weird data-url attributes", function() {
	deepEqual(
		$.mobile.pagecontainer.prototype._find.call({
			_createFileUrl: $.mobile.pagecontainer.prototype._createFileUrl,
			_createDataUrl: $.mobile.pagecontainer.prototype._createDataUrl,
			_getInitialContent: $.mobile.pagecontainer.prototype._getInitialContent,
			element: $( "body" ),
			_getNs: $.mobile.pagecontainer.prototype._getNs,

		}, "Raison d'être.html" )[ 0 ],
		$( ".weird-data-url" )[ 0 ],
		"Correct element is retrieved when the file name is weird" );
});

( function() {
var originalLoad = $.mobile.pagecontainer.prototype._triggerWithDeprecated
module( "load method", {
	setup: function(){
		$.mobile.pagecontainer.prototype._triggerWithDeprecated = function(){
			return {
				deprecatedEvent: {
					isDefaultPrevented: function() {
						return true;
					}
				},
				event: {
					isDefaultPrevented: true
				}
			}
		}
	},
	teardown: function(){
		$.mobile.pagecontainer.prototype._triggerWithDeprecated = originalLoad;
	}
});
test( "load does not trigger an error when called withput a second param", function(){
	var pagecontainer = $( ":mobile-pagecontainer" );

	pagecontainer.pagecontainer( "load", "stuff.html" );
	ok( "no error triggered when load method called without options" );
});

module( "_handleDialog()" );

test( "Recognize dialog via presence of the data key, not the ui-page-dialog class", function() {
	var getActiveHistoryCalled = false;

	deepEqual( $.mobile.pagecontainer.prototype._handleDialog.call({
			getActivePage: function() {
				return $( "<div class='ui-page-dialog'></div>" );
			},
			_getActiveHistory: function() {
				getActiveHistoryCalled = true;
				return {};
			},
			back: $.noop,
			forward: $.noop,
		}, {}, {
			pageUrl: "xyzzy.html"
		}), false, "page is recognized as page even when the ui-page-dialog class is present" );

	deepEqual( getActiveHistoryCalled, false, "_getActiveHistory() should not have been called" );
});

})();
