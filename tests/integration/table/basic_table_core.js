test( "Basic table is enhanced correctly", function() {
	var basicTable = $( "#table-enhance-test" );

	deepEqual( basicTable.hasClass( "ui-table" ), true,
		"Enhanced table has class 'ui-table'" );
	deepEqual( !!basicTable.data( "mobile-table" ), true,
		"Enhanced table has object at key 'mobile-table'" );
	deepEqual( basicTable.data( "mobile-table" ).headers.length, 5,
		"Enhanced table widget has member 'headers' of correct length (5)" );
});

test( "Basic table is disabled/enabled correctly", function() {

	var table = $( "#table-disable-test" );

	table.table( "option", "disabled", true );
	deepEqual( table.hasClass( "ui-state-disabled" ), true,
		"Table has the ui-state-disabled class when disabled" );

	table.table( "option", "disabled", false );
	deepEqual( table.hasClass( "ui-state-disabled" ), false,
		"Table does not have the ui-state-disabled class when enabled" );
});

test( "Basic initially disabled table has ui-state-disabled class", function() {
	deepEqual( $( "#table-initially-disabled" ).hasClass( "ui-state-disabled" ), true,
		"class 'ui-state-disabled' is present" );
});
