//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Make a widget react to a form's reset.
//>>label: formReset
//>>group: Forms

define( [ "jquery", "../../jquery.mobile.core" ], function( $ ) {
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
