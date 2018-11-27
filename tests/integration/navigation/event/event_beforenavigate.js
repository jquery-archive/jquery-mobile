define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

$.testHelper.setPushState();

QUnit.test( "changes to the url trigger a beforenavigate", function( assert ) {
	var ready = assert.async();

	$.testHelper.detailedEventCascade( [
		function() {
			location.hash = "foo";
		},
		{
			beforenavigate: { src: $( window ), event: "beforenavigate.changesToUrlTrigger1" }
		},
		function( result ) {
			assert.deepEqual( result.beforenavigate.timedOut, false,
				"beforenavigate event was triggered" );
			ready();
		}
	] );
} );
} );
