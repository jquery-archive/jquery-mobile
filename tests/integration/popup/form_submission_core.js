define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Form submission from popup works", function( assert ) {
	var ready = assert.async();
	assert.expect( 4 );

	var eventNs = ".formSubmissionFromPopupWorks";

	$.testHelper.detailedEventCascade( [
		function() {
			$( "#open-popup-link" ).click();
		},
		{
			popupafteropen: { src: $( "#popup" ), event: "popupafteropen" + eventNs + "1" }
		},
		function( result ) {
			assert.deepEqual( result.popupafteropen.timedOut, false, "Popup did open" );
			$( "#popup button" ).click();
		},
		{
			submit: { src: $( document ), event: "submit" + eventNs + "2" },
			popupafterclose: { src: $( "#popup" ), event: "popupafterclose" + eventNs + "2" },
			pagecontainerchange: {
				src: $( ":mobile-pagecontainer" ),
				event: "pagecontainerchange" + eventNs + "3"
			}
		},
		function( result ) {
			assert.deepEqual( result.submit.timedOut, false, "Submit event was triggered" );
			assert.deepEqual( result.popupafterclose.timedOut, false, "Popup did close" );
			assert.deepEqual( result.pagecontainerchange.timedOut, false, "Page did change" );
			ready();
		}
	] );
} );

} );
