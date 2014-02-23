( function( $, undefined ) {

test( "Radio groups are correctly identified", function() {
	var detached = $( "<input type='radio' name='group1' id='detached'>" ),
		groups = {
			"#radio\\:1": "#radio\\:1,#radio\\:8",
			"#radio\\:2": "#radio\\:2,#radio\\:3,#radio\\:6",
			"#radio\\:3": "#radio\\:2,#radio\\:3,#radio\\:6",
			"#radio\\:6": "#radio\\:2,#radio\\:3,#radio\\:6",
			"#radio\\:4": "#radio\\:4,#radio\\:7",
			"#radio\\:7": "#radio\\:4,#radio\\:7",
			"#radio\\:5": "#radio\\:5",
			"#radio\\:8": "#radio\\:1,#radio\\:8"
		},
		checkGroup = function( radio, group ) {
			var prefix = radio.attr( "id" ) + ": ",
				result = $.mobile.checkboxradio.prototype._getInputSet.call({
					element: radio,
					inputtype: "radio"
				});

			deepEqual( group.length, result.length, prefix + "length of group is correct" );
			group.each( function() {
				deepEqual( result.filter( this ).length, 1,
					prefix + $( this ).attr( "id" ) + " is correctly present in the result" );
			});
		};

	$.each( groups, function( index, value ) {
		checkGroup( $( index ), $( value ) );
	});

	checkGroup( detached, detached );
});

})( jQuery );
