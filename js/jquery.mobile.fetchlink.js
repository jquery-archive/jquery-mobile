(function( $, undefined ) {

$.widget( "mobile.fetchlink", $.mobile.widget, {
	options: {
		initSelector: ":jqmData(role='fetchlink')"
	},
	_create: function() {

		$( this.element )
		 .click(function() {
			var el			= $( this ),
				url		    = el.attr( "href" ),
				target		= el.data( "target" ),
				targetEl	= target && $( target ) || el,
				fragment    = el.data( "fragment" ),
				load		= fragment || ":jqmData(role='page')",
				threshold	= screen.width > parseInt( el.data( "breakpoint" ) || 0 ),
				methods		= [ "append", "prepend", "replace", "before", "after" ],
				method      = "html",
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

				if ( url && method ) {
					
					targetEl.ajaxStart(function(){
						$(this).trigger('inlineLoader');
					 });
					
					$.get( url, function( data ) {
						var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
							data = $( $("<div/>").append( data.replace( rscript, "" ) ).find( load ) )
							responseEl = !fragment ? $( data.html() ) : data;
									
						setTimeout(function() {				
							targetEl[ method ]( responseEl.addClass('fade in') );
						
							responseEl
								.trigger( "create" )
								.trigger( "fetchlink", { target : targetEl, data: responseEl });
						}, 300);
						
					});					
				}
			}
			return false;
		});

	}
});

$( document ).bind( "inlineLoader", function( e ){	
	$( e.target ).children().removeClass('fade in').addClass('fade out');
	
	setTimeout(function() {
		$( e.target ).html( "<div class='ui-loader-inline'><span class='ui-icon ui-icon-loading spin'></span></div>" );
	}, 300);
});

//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.fetchlink.prototype.options.initSelector, e.target ).fetchlink();
});

})( jQuery );
