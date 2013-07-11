//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Touch feature test
//>>label: Touch support test
//>>group: Core

define( [ "jquery", "./jquery.ui.core" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.ui.support = $.ui.support || {};
		$.extend( $.support, support );
		$.extend( $.ui.support, support );
	}( jQuery ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
