asyncTest( "Option enhanceWithin", function() {
	$.testHelper.pageSequence([
		function() {
			$( "#open-enhance-within" ).click();
		},
		function() {
			deepEqual( !!$( "#enhance-within-header" ).toolbar( "instance" ), true,
				"Page with option enhanceWithin contains a toolbar widget" );
			$.mobile.back();
		},
		function() {
			$( "#open-no-enhance-within" ).click();
		},
		function() {
			deepEqual( !!$( "#no-enhance-within-header" ).toolbar( "instance" ), false,
				"Page with option enhanceWithin turned off contains no toolbar widget" );
			$.mobile.back();
		},
		start
	]);
});
