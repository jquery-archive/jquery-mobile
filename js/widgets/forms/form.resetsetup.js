//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: form reset support for form widgets
//>>label: formReset
//>>group: Forms

define( [ "jquery", "../../jquery.mobile.core" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	function addResetTimeout() {
		setTimeout( $.proxy( this, "_reset" ) );
	}

	$.mobile._formResetSetup = function( widget ) {
		widget._on( widget.element.closest( "form" ), {
			"reset": $.proxy( addResetTimeout, widget )
		});
	};
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
