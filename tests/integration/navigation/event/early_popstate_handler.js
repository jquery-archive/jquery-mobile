define( [ "jquery" ], function( $ ) {

// TODO: Attaching early to popstate like this becomes unnecessary once the navigate event has been
// properly implemented so that it removes its popstate handler upon teardown and attaches it upon
// setup, rather than attaching it upon setup and then simply making sure upon subsequent calls to
// setup that the handlers are attached.
$( window ).on( "popstate", function( event ) {
	if ( window.preventDefaultForNextPopstate ) {
		event.preventDefault();
	}
} );

} );
