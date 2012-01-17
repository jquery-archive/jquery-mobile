//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Prevents iOS from zooming into form fields on focus
//>>label: Prevent form focus zoom

define( [ "jquery", "jquery.mobile.core", "jquery.mobile.zoom" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
( function( $, window ) {

    $( document )
		.bind( "focusin.iosfocusfix vmousedown.iosfocusfix", function( e ){
			if( $( e.target ).is( "select, input" ) ){
				$.mobile.zoom.disable();
				setTimeout( $.mobile.zoom.enable, 500 );
			}
		} );

}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
