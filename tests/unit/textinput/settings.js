define( [ "jquery" ], function( $ ) {

$( document ).bind( "mobileinit", function() {
	$.mobile.textinput.prototype.options.clearBtnText = "custom value";
} );

} );
