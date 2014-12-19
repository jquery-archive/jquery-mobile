//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Touch event shortcuts including: touchstart, touchmove, touchend
//>>label: Touch
//>>group: Events

define( [ "jquery" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");

(function( $, window, undefined ) {
	// setup new event shortcuts
	$.each( [ "touchstart", "touchmove", "touchend" ], function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

})( jQuery, this );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
