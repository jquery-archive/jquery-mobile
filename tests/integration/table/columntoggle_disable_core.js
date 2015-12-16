$.mobile.ns = "nstest-";

test( "Columntoggle table is disabled/enabled correctly", function() {

	var table = $( "#columntoggle-disable-test" ),
		button = $( "#columntoggle-disable-test-button" ),
		popup = $( "#columntoggle-disable-test-popup" );

debugger;
	table.table( "option", "disabled", true );
	deepEqual( table.hasClass( "ui-state-disabled" ), true,
		"Table has the ui-state-disabled class when disabled" );
	deepEqual( button.hasClass( "ui-state-disabled" ), true,
		"Button has the ui-state-disabled class when disabled" );
	deepEqual( button.attr( "tabindex" ), "-1", "Button tabindex is '-1'" );
	deepEqual( popup.popup( "option", "disabled" ), true, "Popup is disabled" );

	table.table( "option", "disabled", false );
	deepEqual( table.hasClass( "ui-state-disabled" ), false,
		"Table has no ui-state-disabled class when enabled" );
	deepEqual( button.hasClass( "ui-state-disabled" ), false,
		"Button has no ui-state-disabled class when enabled" );
	deepEqual( button.is( "[tabindex]" ), false, "Button has no tabindex attribute" );
	deepEqual( popup.popup( "option", "disabled" ), false, "Popup is enabled" );
});
