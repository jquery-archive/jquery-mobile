/*
 * Mobile init tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "page element is generated when not present in initial markup", function( assert ) {
	assert.ok( $( ".ui-page" ).length, 1 );
} );

} );
