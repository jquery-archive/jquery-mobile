define( [ "jquery" ], function( $ ) {
	$( document ).bind( "mobileinit", function() {
		$.mobile.pagecontainer.prototype.options.changeOptions.changeHash = false;
		$.mobile.hashListeningEnabled = false;
		$.mobile.pushStateEnabled = false;
	} );
} );
