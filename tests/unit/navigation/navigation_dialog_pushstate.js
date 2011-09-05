(function($) {
	asyncTest( "dialog ui-state should be part of the hash", function(){
		$.testHelper.sequence([
			function() {
				// open the test page
				$.mobile.activePage.find( "a" ).click();
			},

			function() {
				// verify that the hash contains the dialogHashKey
				ok( location.hash.search($.mobile.dialogHashKey) >= 0 );
				start();
			}
		]);
	});
})(jQuery);