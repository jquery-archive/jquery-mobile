define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Loader attaches to DOM when running individually", function( assert ) {
var loader = $.mobile.loading( "show" );

assert.deepEqual( $.contains( document, loader[ 0 ] ), true,
	"Document contains the loader after it is shown" );

assert.deepEqual( loader.is( ":visible" ), true, "Loader is visible when shown" );

$.mobile.loading( "hide" );
} );

} );
