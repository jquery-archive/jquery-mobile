(function($) {
	asyncTest( "nested pages hash key is always in the hash on default page with no id (replaceState) ", function(){
		$.testHelper.pageSequence([
			function(){
				// Click on the link of the third li element
				$('.ui-page-active li:eq(2) a:eq(0)').click();
			},

			function(){
				ok( location.hash.search($.mobile.subPageUrlKey) >= 0 );
				start();
			}
		]);
	});
})(jQuery);