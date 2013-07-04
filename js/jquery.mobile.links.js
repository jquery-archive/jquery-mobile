//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds classes to links.
//>>label: Link Classes
//>>group: Utilities


define( [ "jquery", "jquery.mobile.core" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$( document ).bind( "pagecreate create", function( e ) {

	//links within content areas, tests included with page
	$( e.target )
		.find( "a" )
		.jqmEnhanceable()
		.filter( ":jqmData(rel='popup')[href][href!='']" )
		.each( function() {
			// Accessibility info for popups
			var e = this,
				href = $( this ).attr( "href" ),
				idref = href.substring( 1 );

			e.setAttribute( "aria-haspopup", true );
			e.setAttribute( "aria-owns", idref );
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
