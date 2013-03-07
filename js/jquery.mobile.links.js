//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds classes to links.
//>>label: Link Classes
//>>group: Utilities


define( [ "jquery", "jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.addEnhancementHook( "mobile-links", {}, function( e ) {

	//links within content areas, tests included with page
	$( e.target )
		.find( "a" )
		.jqmEnhanceable()
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
