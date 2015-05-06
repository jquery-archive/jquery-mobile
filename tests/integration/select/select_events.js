/*
 * mobile select unit tests
 */

( function( $ ) {
var libName = "forms.select";

$( document ).bind( 'mobileinit', function() {
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
} );

module( libName, {
	setup: function() {
		$.testHelper.openPage( location.hash.indexOf( "#default" ) >= 0 ? "#" : "#default" );
	}
} );

test( "selects marked with data-native-menu=true should use a div as their button", function() {
	deepEqual( $( "#select-choice-native-container div.ui-button" ).length, 1 );
} );

test( "selects marked with data-native-menu=true should not have a custom menu", function() {
	deepEqual( $( "#select-choice-native-container ul" ).length, 0 );
} );

test( "selects marked with data-native-menu=true should sit inside the button", function() {
	deepEqual( $( "#select-choice-native-container div.ui-button select" ).length, 1 );
} );

test( "select controls will create when inside a container that receives a 'create' event", function() {
	ok( !$( "#enhancetest" ).appendTo( ".ui-page-active" ).find( ".ui-select" ).length, "did not have enhancements applied" );
	ok( $( "#enhancetest" ).enhanceWithin().find( ".ui-select" ).length, "enhancements applied" );
} );
} )( jQuery );
