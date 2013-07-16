//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Behavior mixing to mark first and last visible item with special classes.
//>>label: First & Last Classes
//>>group: Widgets

define( [ "jquery", "../jquery.mobile.core" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.behaviors.optionDemultiplexer = {
	_setOption: function( key, value ) {
		var setter = "_set" + key.charAt( 0 ).toUpperCase() + key.slice( 1 );

		if ( this[ setter ] !== undefined ) {
			this[ setter ]( value );
		}

		this._super( key, value );
	}
};

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
