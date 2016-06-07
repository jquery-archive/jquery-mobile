/*
 * Mobile slider unit tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {
	QUnit.module( "jquery.mobile.rangeslider.js core" );

	QUnit.test( "Highlight has correct margin and width", function( assert ) {
		assert.expect( 2 );
		var rangeslider = $( "#rangeslider-highlight" ),
			rangeFirst = $( "#rangeslider-highlight-first" ),
			rangeLast = $( "#rangeslider-highlight-last" ),
			bg = rangeslider.find( ".ui-slider-bg" ),
			width = rangeslider.find( ".ui-slider-track" ).first().width(),
			range = rangeFirst.attr( "max" ) - rangeFirst.attr( "min" ),
			cssMarginLeft, cssWidth, intWidth, bgMarginLeft, bgWidth;

		// Increase first input val with 20
		rangeFirst.val( parseInt( rangeFirst.val(), 10 ) + 20 ).slider( "refresh" );

		cssMarginLeft = bg.css( "margin-left" );

		// Check if browser returns a pixel or percentage value
		if ( cssMarginLeft.indexOf( "%" ) > -1 ) {
			bgMarginLeft = ( rangeFirst.val() / range * 100 ) + "%";

			assert.deepEqual( cssMarginLeft, bgMarginLeft, "Highlight has correct left margin" );
		} else {
			var intMarginLeft = parseFloat( cssMarginLeft.replace( "px", "" ) );

			bgMarginLeft = Math.round( rangeFirst.val() / range * width );

			// Take a rounding difference of max 2px into account
			assert.ok( -2 >= ( intMarginLeft - bgMarginLeft ) <= 2,
				"Highlight has correct left margin" );
		}

		cssWidth = bg.css( "width" );
		intWidth = parseFloat( cssWidth.replace( "px", "" ) );
		bgWidth = Math.round( ( rangeLast.val() - rangeFirst.val() ) / range * width );

		// Take a rounding difference of max 2px into account
		assert.ok( -2 >= ( intWidth - bgWidth ) <= 2, "Highlight has correct width" );
	} );

	QUnit.test( "Rangeslider backcompat tests", function( assert ) {
		assert.hasClasses( $( "#mini-rangeslider" ), "ui-mini" );
		assert.lacksClasses( $( "#nocorners-rangeslider" ), "ui-corner-all" );
	} );

} );
