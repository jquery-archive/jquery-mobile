//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Touch feature test
//>>label: Touch support test
//>>group: Core

define( [ "jquery", "./jquery.mobile.ns" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
	(function( $, undefined ) {
		$.mobile.support = $.mobile.support || {};
		$.support.touch = $.mobile.support.touch = "ontouchend" in document;
	}( jQuery ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
