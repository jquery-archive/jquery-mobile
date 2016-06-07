define( [ "qunit", "jquery" ], function( QUnit, $ ) {

$.mobile.ns = "nstest-";

QUnit.test( "Prerendered columntoggle table is destroyed/re-created correctly", function( assert ) {
	var table = $( "#columntoggle-prerendered-destroy-test" ),
		popup = $( "#columntoggle-prerendered-destroy-test-popup" );

	// Constituent widgets are also pre-rendered, and there's no autoinit to turn them on
	popup
		.find( "input" )
			.checkboxradio()
		.end()
		.find( "fieldset" )
			.controlgroup()
		.end()
		.popup();

	table.table();

	assert.deepEqual(
		$( "input" ).filter( ":data(" + $.camelCase( $.mobile.ns + "header" ) + ")" ).length, 4,
		"Four checkboxes have data at key 'header' after table construction" );

	assert.deepEqual(
		$( "input" ).filter( ":data(" + $.camelCase( $.mobile.ns + "cells" ) + ")" ).length, 4,
		"Four checkboxes have data at key 'cells' after table construction" );

	table.table( "destroy" );

	assert.deepEqual(
		$( "input" ).filter( ":data(" + $.camelCase( $.mobile.ns + "header" ) + ")" ).length, 0,
		"Four checkboxes have data at key 'header' after table construction" );

	assert.deepEqual(
		$( "input" ).filter( ":data(" + $.camelCase( $.mobile.ns + "cells" ) + ")" ).length, 0,
		"Checkboxes have no data at key 'cells' after table destruction" );
} );
} );
