(function ( $ ) {
	var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	$.mobile.page.prototype.options.cache = true;
	$( ":mobile-page" )
		.live( "pagebeforecreate", function() {
			var page = $( this ).data( "page" ),
				cache = page.options.cache;
			// WTF?
			page.url = page.options.url;
			if ( cache === true ) {
				return;
			}

			if ( cache === false ) {
				page.cacheExpiration = -1;
			} else if ( typeof cache === "number" ) {
				page.cacheExpiration = $.now() + ( cache * 1000 );
			}
		})
		.live( "pagebeforeshow", function( event, opts ) {
			var $page = $( this ),
				page = $page.data( "page" ),
				expiration = page.cacheExpiration;

			if ( !expiration || expiration === -1 ) {
				return;
			}

			if ( $.now() > expiration ) {
				var url = page.url;
				$.ajax({
					url: url,
					async: false,
					cache: false,
					context: $page,
					success: function( data ) {
						this.page( "destroy" );
						var html = $( "<div>" )
							.append( data.replace( rscript, "" ) )
							.find( "[data-role='page']" )
							.html();
						this.html( html ).page({ url: url });
					}
				});
			}
		})
		.live( "pageshow", function() {
			var page = $( this ).data( "page" );
			if ( page.cacheExpiration === -1 ) {
				page.cacheExpiration = $.now();
			}
		});
})( jQuery );