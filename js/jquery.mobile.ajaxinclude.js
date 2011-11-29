( function( $, undefined ) {		
	$.fn.ajaxInclude = function( e ) {
		return this.each(function() {
			var el			= $( this ),
				url		    = el.attr( 'href' ),
				target		= el.data( "target" ),
				targetEl	= target && $( target ) || el,
				load		= el.data( "fragment" ),
				threshold	= screen.width > parseInt( el.data( "breakpoint" ) || 0 ),
				methods		= [ "append", "prepend", "replace", "before", "after" ],
				method      = "replace",
				url;
			
			if ( threshold ) {
				for( var ml = methods.length, i=0; i < ml; i++ ){
					if( el.is( "[data-include='" + methods[ i ] + "']" ) ){
						method	= methods[ i ];
					}
				}

				if ( method === "replace" ){
					method += "With";
				}

				if ( url && method ){
					$.get( url, function( data ) {
						/* Swiped from the jQuery core; $.get() should really be replaced by .load() */
						var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
							responseEl = $( load ? $("<div/>").append( data.replace( rscript, "" ) ).find( load ) : data ),
							eTarget = method === "replaceWith" || !method ? responseEl : el;

						$( load ).remove();	
						targetEl[ method ]( responseEl )
						
						eTarget.trigger( "ajaxInclude", [eTarget, data] );
					});
				}

			}
		});
	};

	$( function(){
		$("[data-include]").ajaxInclude();
	});
	
})(jQuery);