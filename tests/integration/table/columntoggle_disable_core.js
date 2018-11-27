define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
$.mobile.ns = "nstest-";

QUnit.test( "Columntoggle table is disabled/enabled correctly", function( assert ) {

	var table = $( "#columntoggle-disable-test" ),
		button = $( "#columntoggle-disable-test-button" ),
		popup = $( "#columntoggle-disable-test-popup" );

	table.table( "option", "disabled", true );
	assert.hasClasses( table, "ui-state-disabled" );
	assert.hasClasses( button, "ui-state-disabled" );
	assert.deepEqual( button.attr( "tabindex" ), "-1", "Button tabindex is '-1'" );
	assert.deepEqual( popup.popup( "option", "disabled" ), true, "Popup is disabled" );

	table.table( "option", "disabled", false );
	assert.lacksClasses( table, "ui-state-disabled" );
	assert.lacksClasses( button, "ui-state-disabled" );
	assert.deepEqual( button.is( "[tabindex]" ), false, "Button has no tabindex attribute" );
	assert.deepEqual( popup.popup( "option", "disabled" ), false, "Popup is enabled" );
} );

} );
