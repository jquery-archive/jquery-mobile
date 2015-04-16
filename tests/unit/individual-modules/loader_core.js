test( "Loader attaches to DOM when running individually", function() {
var loader = $.mobile.loading( "show" );

deepEqual( $.contains( document, loader[ 0 ] ), true,
	"Document contains the loader after it is shown" );

deepEqual( loader.is( ":visible" ), true, "Loader is visible when shown" );

$.mobile.loading( "hide" );
} );
