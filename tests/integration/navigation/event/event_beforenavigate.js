$.testHelper.setPushState();

asyncTest( "changes to the url trigger a beforenavigate", function() {

	$.testHelper.detailedEventCascade([
		function() {
			location.hash = "foo";
		},
		{
			beforenavigate: { src: $( window ), event: "beforenavigate.changesToUrlTrigger1" }
		},
		function( result ) {
			deepEqual( result.beforenavigate.timedOut, false,
				"beforenavigate event was triggered" );
			start();
		}
	]);
});
