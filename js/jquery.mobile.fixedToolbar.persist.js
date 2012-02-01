//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Basic page formatting.
//>>label: Pages

define( [ "jquery", "./jquery.mobile.fixedToolbar" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {
	
	// Allow for mobileinit override
	$.mobile.fixedtoolbar.prototype.options.trackPersistentToolbars = true;
	
	$( document ).bind( "pagebeforehide", function( e, ui ){
		if( $.mobile.fixedtoolbar.prototype.options.trackPersistentToolbars ){
			var thisFooter = $( ".ui-footer-fixed:jqmData(id)", e.target ),
				thisHeader = $( ".ui-header-fixed:jqmData(id)", e.target ),
				nextFooter = thisFooter.length && ui.nextPage && $( ".ui-footer-fixed:jqmData(id='" + thisFooter.jqmData( "id" ) + "')", ui.nextPage ),
				nextHeader = thisHeader.length && ui.nextPage && $( ".ui-header-fixed:jqmData(id='" + thisHeader.jqmData( "id" ) + "')", ui.nextPage );
		
				if( nextFooter.length || nextHeader.length ){
					
					nextFooter.add( nextHeader ).appendTo( $.mobile.pageContainer );
				
					ui.nextPage.one( "pageshow", function(){
						nextFooter.add( nextHeader ).appendTo( this );
					} );
				}
		}
	});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
