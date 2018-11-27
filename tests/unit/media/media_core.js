/*
 * Mobile media unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "$.mobile.media function returns same boolean result as window.matchMedia", function( assert ) {
	assert.deepEqual( $.mobile.media( "screen" ), window.matchMedia( "screen" ).matches );
} );

QUnit.test( "$.mobile.media function returns boolean result", function( assert ) {
	assert.deepEqual( typeof $.mobile.media( "screen" ), "boolean" );
} );

QUnit.test( "$.mobile.media function returns false result for inapplicable media", function( assert ) {
	assert.deepEqual( $.mobile.media( "foo" ), false );
} );

} );
