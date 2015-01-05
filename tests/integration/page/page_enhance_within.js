asyncTest( "Option enhance", function() {
	$.testHelper.pageSequence([
		function() {
			$( "#open-enhance" ).click();
		},
		function() {
			deepEqual( !!$( "#enhance-header" ).toolbar( "instance" ), true,
				"Page with option enhance contains a toolbar widget" );
			$.mobile.back();
		},
		function() {
			$( "#open-no-enhance" ).click();
		},
		function() {
			deepEqual( !!$( "#no-enhance-header" ).toolbar( "instance" ), false,
				"Page with option enhance turned off contains no toolbar widget" );
			$.mobile.back();
		},
		start
	]);
});
