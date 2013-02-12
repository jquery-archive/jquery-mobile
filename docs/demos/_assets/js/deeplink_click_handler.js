( function( $, undefined ) {
	var href,
		ele = "";
	$( document ).on( "click", "a", function( e ) {
		href = $( this ).attr( "href" );
		var hash = $.mobile.path.parseUrl( href );
		if( typeof href !== "undefined" && hash !== "" && href !== href.replace( hash,"" ) && hash.search( "/" ) === -1 ){
			//remove the hash from the link to allow normal loading of the page.
			var newHref = href.replace( hash,"" );
			$( this ).attr( "href", newHref );
		}
		ele = $( this );
	});
	$( document ).on( "pagebeforechange", function( e, f ){
			f.originalHref = href;
	});
	$( document ).on("pagebeforechange", function( e,f ){
		var hash = $.mobile.path.parseUrl(f.toPage).hash;
		if( typeof hash !== "undefined" && hash.search( "/" ) === -1 && hash !== "" && $( hash ).length > 0 && !$( ".ui-page-active " + hash ).hasClass( "ui-page" ) && !$( ".ui-page-active " + hash ).hasClass( "ui-panel" ) && !$( ".ui-page-active " + hash ).hasClass( "ui-popup" )){
			//scroll to the id
			var pos = $( hash ).offset().top;
			$.mobile.silentScroll( pos );
			return false;
		} else if( $.mobile.path.parseUrl( f.originalHref ).hash !== "" ){
			$( ele ).attr( href, f.originalHref );
			$.mobile.document.one( "pagechange", function(){
				hash = $.mobile.path.parseUrl(f.originalHref).hash;
				var pos = $( ".ui-page-active " + hash) .offset().top;
				$.mobile.silentScroll( pos );
			} );
		}
	});
	$( document ).on( "mobileinit", function(){
		hash = window.location.hash;
		$.mobile.document.one( "pageshow", function(){
			if( hash !== "" && !$( ".ui-page-active " + hash ).hasClass( "ui-page" ) && !$( ".ui-page-active " + hash ).hasClass( "ui-panel" ) && !$( ".ui-page-active " + hash ).hasClass( "ui-popup" ) && !$( hash ).is( "body" ) ){
				var pos = $( ".ui-page-active " + hash ).offset().top;
				setTimeout( function(){
					$.mobile.silentScroll( pos );
				}, 100 );
			}
		});
	});
//auto self-init widgets


})( jQuery );