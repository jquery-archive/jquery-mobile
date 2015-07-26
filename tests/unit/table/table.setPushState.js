define( [ "jquery" ], function( $ ) {

// redirects from push-state-tests.html
$( document ).bind( 'mobileinit', function() {
	$.testHelper.setPushState();
} );

})
