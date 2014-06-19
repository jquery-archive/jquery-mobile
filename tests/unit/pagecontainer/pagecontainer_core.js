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

})();
