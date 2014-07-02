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

test( "A dialog is recognized via presence of the data key, not the ui-dialog class", function() {
	var getActiveHistoryCalled = false;

	deepEqual( $.mobile.pagecontainer.prototype._handleDialog.call({
			getActivePage: function() {
				return $( "<div class='ui-dialog'></div>" );
			},
			_getActiveHistory: function() {
				getActiveHistoryCalled = true;
				return {};
			},
			back: $.noop,
			forward: $.noop,
		}, {}, {
			pageUrl: "xyzzy.html"
		}), false, "page is recognized as page even when the ui-dialog class is present" );

	deepEqual( getActiveHistoryCalled, false, "_getActiveHistory() should not have been called" );
});

})();
