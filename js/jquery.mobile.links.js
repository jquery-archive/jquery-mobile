//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds classes to links.
//>>label: Link Classes
//>>group: Utilities


define( [ "jquery", "jquery.mobile.core", "jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile._enhancer.add( "mobile.links", undefined, function( target ) {

	//links within content areas, tests included with page
	$( target )
		.find( "a" )
		.jqmEnhanceable()
		.filter( ":jqmData(rel='popup')[href][href!='']" )
		.each( function() {
			// Accessibility info for popups
			var e = this,
				href = $( this ).attr( "href" );

			e.setAttribute( "aria-haspopup", true );
			e.setAttribute( "aria-owns", href );
			e.setAttribute( "aria-expanded", false );
			$( document )
				.on( "popupafteropen", href, function() {
					e.setAttribute( "aria-expanded", true );
				})
				.on( "popupafterclose", href, function() {
					e.setAttribute( "aria-expanded", false );
				});
		})
		.end()
		.not( ".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')" )
		.addClass( "ui-link" );

});

})( jQuery );

//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
