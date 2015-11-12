asyncTest( "Popup with weird characters in its ID", function() {
var popup = $( "div#the-\\[\\'x\\'\\]-popup" ),
	openPopup = $( "#openPopup" );
eventNs = ".popupWithWeirdCharactersInItsId";

// It is part of the test that the following line not cause an exception
$( ".ui-page" ).enhanceWithin();

deepEqual( $( "div#the-\\[\\'x\\'\\]-popup-placeholder" ).length, 1,
	"Popup placeholder has correct ID" );

deepEqual( $( "#the-\\[\\'x\\'\\]-popup-screen.ui-popup-screen" ).length, 1,
	"Popup screen has correct ID" );

deepEqual( $( "#the-\\[\\'x\\'\\]-popup-popup.ui-popup-container" ).length, 1,
	"Popup container has correct ID" );

$.testHelper.detailedEventCascade( [
	function() {
		openPopup.click();
	},
	{
		popupafteropen: { src: popup, event: "popupafteropen" + eventNs + "1" }
	},
	function( result ) {
		deepEqual( result.popupafteropen.timedOut, false, "Popup did open" );
		deepEqual( openPopup.attr( "aria-haspopup" ), "true",
			"Link's 'aria-haspopup' attribute is true" );
		deepEqual( openPopup.attr( "aria-owns" ), "the-['x']-popup",
			"Link's 'aria-owns' attribute has the correct value" );
		deepEqual( openPopup.attr( "aria-expanded" ), "true",
			"Link's 'aria-expanded' attribute is true" );
		$.mobile.back();
	},
	{
		popupafterclose: { src: popup, event: "popupafterclose" + eventNs + "2" }
	},
	function( result ) {
		deepEqual( result.popupafterclose.timedOut, false, "Popup did close" );
		deepEqual( openPopup.attr( "aria-haspopup" ), "true",
			"Link's 'aria-haspopup' attribute is true" );
		deepEqual( openPopup.attr( "aria-owns" ), "the-['x']-popup",
			"Link's 'aria-owns' attribute has the correct value" );
		deepEqual( openPopup.attr( "aria-expanded" ), "false",
			"Link's 'aria-expanded' attribute is false" );
		start();
	}
] );
} );
