//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: A behavioral mixin that forces a widget to react to a form reset
//>>label: Form Reset
//>>group: Forms

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.behaviors.formReset = {
	_handleFormReset: function() {
		this._on( this.element.closest( "form" ), {
			reset: function() {
				this._delay( "_reset" );
			}
		});
	}
};

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
