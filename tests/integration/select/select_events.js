/*
 * Mobile select unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {
var libName = "forms.select";

$( document ).bind( "mobileinit", function() {
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
} );

QUnit.module( libName, {
	beforeEach: function() {
		$.testHelper.openPage( location.hash.indexOf( "#default" ) >= 0 ? "#" : "#default" );
	}
} );

QUnit.test( "selects marked with data-native-menu=true should use a div as their button",
	function( assert ) {
		assert.deepEqual( $( "#select-choice-native-container div.ui-button" ).length, 1 );
	} );

QUnit.test( "selects marked with data-native-menu=true should not have a custom menu",
	function( assert ) {
		assert.deepEqual( $( "#select-choice-native-container ul" ).length, 0 );
	} );

QUnit.test( "selects marked with data-native-menu=true should sit inside the button",
	function( assert ) {
		assert.deepEqual( $( "#select-choice-native-container div.ui-button select" ).length, 1 );
	} );

QUnit.test( "select controls will create when inside a container that receives a 'create' event",
	function( assert ) {
		assert.ok(
			!$( "#enhancetest" ).appendTo( ".ui-page-active" ).find( ".ui-selectmenu" ).length,
			"did not have enhancements applied" );
		assert.ok( $( "#enhancetest" ).enhanceWithin().find( ".ui-selectmenu" ).length,
			"enhancements applied" );
	} );
} )( jQuery );
