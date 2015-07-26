define( [ "jquery" ], function( $ ) {
	$( document ).bind( 'mobileinit', function(){
		$.testHelper.setPushState();
	});
})
