// popup examples
$( document ).on( "pagecreate", function() {

	// The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
	function scale( width, height, padding, border ) {
		var scrWidth = $( window ).width() - 30,
			scrHeight = $( window ).height() - 30,
			ifrPadding = 2 * padding,
			ifrBorder = 2 * border,
			ifrWidth = width + ifrPadding + ifrBorder,
			ifrHeight = height + ifrPadding + ifrBorder,
			h, w;

		if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
			w = ifrWidth;
			h = ifrHeight;
		} else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
			w = scrWidth;
			h = ( scrWidth / ifrWidth ) * ifrHeight;
		} else {
			h = scrHeight;
			w = ( scrHeight / ifrHeight ) * ifrWidth;
		}

		return {
			'width': w - ( ifrPadding + ifrBorder ),
			'height': h - ( ifrPadding + ifrBorder )
		};
	};

	$( ".ui-popup iframe" )
		.attr( "width", 0 )
		.attr( "height", "auto" );

	$( "#popupMap iframe" ).contents().find( "#map_canvas" )
		.css( { "width" : 0, "height" : 0 } );

	$( "#popupMap" ).on({
		popupbeforeposition: function() {
			var size = scale( 480, 320, 0, 1 ),
				w = size.width,
				h = size.height;

			$( "#popupMap iframe" )
				.attr( "width", w )
				.attr( "height", h );

			$( "#popupMap iframe" ).contents().find( "#map_canvas" )
				.css( { "width": w, "height" : h } );
		},
		popupafterclose: function() {
			$( "#popupMap iframe" )
				.attr( "width", 0 )
				.attr( "height", 0 );

			$( "#popupMap iframe" ).contents().find( "#map_canvas" )
				.css( { "width": 0, "height" : 0 } );
		}
	});
});
