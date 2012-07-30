// popup examples
$( document ).on( "pageinit", function() {

	// scale images	
	$( ".photopopup" ).on({
		popupbeforeposition: function( event ) {
			var inner = $( window ).height() - 60 + "px";
			$( "img, .photopopup" ).css( "max-height", inner );
		}
	});

	// set the size of iframes
	$("#mapiframe, #vidiframe")
		.prop( "width", 0 )
		.prop( "height", 0 );
		$( "#mapiframe" ).contents().find( "#map_canvas" ).css( { "width" : 0, "height" : 0 } );
			
	function sizes(iframewidth, iframeheight, padding, border) {
		var sw = $( window ).width() - 30,
			sh = $( window ).height() - 30,
			ip = 2 * padding,
			ib = 2 * border,
			iw = iframewidth + ip + ib,
			ih = iframeheight + ip + ib,
			h, w, width, height;

		if ( iw < sw && ih < sh ) {
			w = iw;
			h = ih;
		} else if ( ( iw / sw ) > ( ih / sh ) ) {
			w = sw;
			h = ( sw / iw ) * ih;
		} else {
			h = sh;
			w = ( sh / ih ) * iw;
		}
		
		width = w - ( ip + ib );
		height = h - ( ip + ib );
		
		return {
			'width': width,
			'height': height
		};
	};
	
	$( "#popupMap" ).on({
		popupbeforeposition: function( event ) {
			var size = sizes(480, 320, 0, 1),
				w = size.width,
				h = size.height;

			$( "#mapiframe" )
				.prop( "width", w )
				.prop( "height", h );
			$( "#mapiframe" ).contents().find( "#map_canvas" ).css( { "width": w, "height" : h } );
		},
		popupafterclose: function( event ) {
			$("#mapiframe")
				.prop( "width", 0 )
				.prop( "height", 0 );
			$( "#mapiframe" ).contents().find( "#map_canvas" ).css( { "width": 0, "height" : 0 } );
		}
	});
	$( "#popupVideo" ).on({
		popupbeforeposition: function( event ) {
			var size = sizes(497, 298, 15, 1),
				w = size.width,
				h = size.height;
				
			$( "#vidiframe" )
				.prop( "width", w )
				.prop( "height", h );
		},
		popupafterclose: function( event ) {
			$("#vidiframe")
				.prop( "width", 0 )
				.prop( "height", 0 );	
		}
	});
});