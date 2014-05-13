$.mobile.ns = "nstest-";

test( "Basic table is disabled/enabled correctly", function() {

	var table = $( "#table-disable-test" );

	table.table( "option", "disabled", true );
	deepEqual( table.hasClass( "ui-state-disabled" ), true,
		"Table has the ui-state-disabled class when disabled" );

	table.table( "option", "disabled", false );
	deepEqual( table.hasClass( "ui-state-disabled" ), false,
		"Table does not have the ui-state-disabled class when enabled" );
});
