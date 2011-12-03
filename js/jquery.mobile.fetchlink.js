(function( $, undefined ) {

$.widget( "mobile.fetchlink", $.mobile.widget, {
	options: {
		initSelector: ":jqmData(role='fetchlink')"
	},
	_create: function() {
		
		// Prototyping.
	//	$( this.element.data( 'fragment' ) ).hide();
		
		$( this.element ).click(function() {
			var el			= $( this ),
				url		    = el.attr( 'href' ),
				target		= el.data( "target" ),
				targetEl	= target && $( target ) || el,
				load		= el.data( "fragment" ) /* Needs a proper default (page, most likely). */,
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
						/* Swiped from the jQuery core; $.get() should really be replaced by .load() */
						var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
							responseEl = $( load ? $("<div/>").append( data.replace( rscript, "" ) ).find( load ) : data );

						setTimeout(function() {
							targetEl[ method ]( responseEl );
							responseEl
								.trigger( "create" )
								.trigger( "fetchlink", { target : targetEl, data: responseEl } );
						}, 1500);
						
					});
					
				}
			}
			return false;
		});

	}
});

$( document ).bind( "inlineLoader", function( e ){
	$( e.target ).html( "<div class='ui-loader' style='display: block; position: static; float: none; width: 100%; padding: 1em 0 .5em 0; margin: 0;'><span class='ui-icon ui-icon-loading spin' style='top: 0; border: 1px solid red;'></span><h1></h1></div>" );
});


//auto self-init widgets
$( document ).bind( "pagecreate create", function( e ){
	$( $.mobile.fetchlink.prototype.options.initSelector, e.target ).fetchlink();
});

})( jQuery );
