define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Weird characters in selectmenu ID", function( assert ) {
var nativeHandle, nonNativeSmallPopup;

// It is part of the test that the following line not cause an exception
$( ".ui-page" ).enhanceWithin();
var ready = assert.async();

nativeHandle = $( "#the-select\\[\\'x\\'\\]-native" );
nonNativeSmallPopup = $( "#the-select\\[\\'x\\'\\]-non-native-small-listbox" );

assert.deepEqual( nativeHandle.parent().attr( "id" ), "the-select['x']-native-button",
	"Native select correctly assigns ID to generated anchor" );

assert.deepEqual( nonNativeSmallPopup.length, 1, "Small non-native popup is present" );
assert.deepEqual( nonNativeSmallPopup.is( ":mobile-popup" ), true,
	"Small non-native popup is popup widget" );
assert.deepEqual( nonNativeSmallPopup.children( "ul" ).attr( "id" ),
	"the-select['x']-non-native-small-menu", "Small non-native list has correct ID" );

$.testHelper.pageSequence( [
	function() {
		$( "#the-select\\[\\'x\\'\\]-non-native-large-button" ).click();
	},
	function() {
		assert.deepEqual( $.mobile.activePage.attr( "id" ), "the-select['x']-non-native-large-dialog",
			"The dialog generated for the large non-native selectmenu has the correct ID" );
		$.mobile.back();
	},
	ready
] );
} );
} );
