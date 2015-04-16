asyncTest( "Weird characters in selectmenu ID", function() {
var native, nonNativeSmallPopup;

// It is part of the test that the following line not cause an exception
$( ".ui-page" ).enhanceWithin();

native = $( "#the-select\\[\\'x\\'\\]-native" );
nonNativeSmallPopup = $( "#the-select\\[\\'x\\'\\]-non-native-small-listbox" );

deepEqual( native.parent().attr( "id" ), "the-select['x']-native-button",
	"Native select correctly assigns ID to generated anchor" );

deepEqual( nonNativeSmallPopup.length, 1, "Small non-native popup is present" );
deepEqual( nonNativeSmallPopup.is( ":mobile-popup" ), true,
	"Small non-native popup is popup widget" );
deepEqual( nonNativeSmallPopup.children( "ul" ).attr( "id" ),
	"the-select['x']-non-native-small-menu", "Small non-native list has correct ID" );

$.testHelper.pageSequence( [
	function() {
		$( "#the-select\\[\\'x\\'\\]-non-native-large-button" ).click();
	},
	function() {
		deepEqual( $.mobile.activePage.attr( "id" ), "the-select['x']-non-native-large-dialog",
			"The dialog generated for the large non-native selectmenu has the correct ID" );
		$.mobile.back();
	},
	start
] );
} );
