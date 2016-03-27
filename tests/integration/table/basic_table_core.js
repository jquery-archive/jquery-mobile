define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
QUnit.test( "Basic table is enhanced correctly", function( assert ) {
	var basicTable = $( "#table-enhance-test" );

	assert.hasClasses( basicTable, "ui-table" );
	assert.deepEqual( !!basicTable.data( "mobile-table" ), true,
		"Enhanced table has object at key 'mobile-table'" );
	assert.deepEqual( basicTable.data( "mobile-table" ).headers.length, 5,
		"Enhanced table widget has member 'headers' of correct length (5)" );
} );

QUnit.test( "Basic table is disabled/enabled correctly", function( assert ) {

	var table = $( "#table-disable-test" );

	table.table( "option", "disabled", true );
	assert.hasClasses( table, "ui-state-disabled" );

	table.table( "option", "disabled", false );
	assert.lacksClasses( table, "ui-state-disabled" );
} );

QUnit.test( "Basic initially disabled table has ui-state-disabled class", function( assert ) {
	assert.hasClasses( $( "#table-initially-disabled" ), "ui-state-disabled" );
} );

} );
