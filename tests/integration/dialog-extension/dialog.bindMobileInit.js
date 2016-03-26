define( [ "jquery" ], function( $ ) {
	$( document ).bind( "mobileinit", function() {

		// Expect content to inherit this theme when not explicitly set
		$.mobile.page.prototype.options.contentTheme = "d";
	} );
} );
