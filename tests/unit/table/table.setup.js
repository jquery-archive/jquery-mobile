define( [ "jquery" ], function( $ ) {

	// Basic
	var xcount = 0;
	var ycount = 0;
	$( window ).on( "refresh_test_table", function( e, data ) {
		var tb = $( data ).find( "tbody" ),
				numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
				chars = [ "a", "b", "c", "d", "e", "f", "g", "h", "i" ],
				use = xcount % 2 === 1 ? numbers : chars,
				newRow = "<tr><th data-test='abc'>" + use[ 0 ] + "</th><td>" + use[ 1 ] + "</td><td data-test='foo'>" + use[ 2 ] + "</td><td data-col='3'>" + use[ 3 ] + "</td><td>" + use[ 4 ] + "</td></tr>";
		tb.empty()
			.append( newRow )
			.closest( "table" )
			.table( "refresh" );
		xcount += 1;
	} )
	.on( "refresh_col_table", function( e, data ) {
		var tb = $( data ).find( "tbody" ),
			th = $( data ).find( "thead tr" ),
			numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
			chars = [ "z", "y", "x", "w", "v", "u", "t", "s", "t" ],
			use = xcount % 2 === 1 ? numbers : chars,
			newRow = "<tr><th>" + use[ 0 ] + "</th><td>" + use[ 1 ] + "</td><td data-test='foo'>" + use[ 2 ] + "</td><td data-col='3'>" + use[ 3 ] + "</td><td>" + use[ 4 ] + "</td><td>" + use[ 5 ] + "</td><td data-test='xyz'>" + use[ 6 ] + "</td></tr>";
		th.append( "<th data-nstest-priority='3'>New_A</th><th data-nstest-priority='5'>New_B</th>" );
		tb.empty()
			.append( newRow )
			.closest( "table" )
			.table( "rebuild" );
		ycount += 1;
	} );
} );
