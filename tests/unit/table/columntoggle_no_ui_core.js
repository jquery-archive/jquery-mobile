test( "Columntoggle table correctly sets priority classes", function() {
	var table = $( "#no-ui-test" );

	deepEqual(
		table.children().children().children( ":nth(0)" ).is( function() {
			return !$( this ).hasClass( "ui-table-priority-2" );
		}),
		false,
		"Members of the first column have class 'ui-table-priority-2'" );

	deepEqual(
		table.children().children().children( ":nth(1)" ).is( function() {
			var index,
				classes = this.className.split( " " );

			for ( index in classes ) {
				if ( classes[ index ].match( /ui-table-priority-[0-9]+/ ) ) {
					return true;
				}
			}
			return false;
		}),
		false,
		"Members of the second column have no 'ui-table-priority-<number>' class" );

	deepEqual(
		table.children().children().children( ":nth(2)" ).is( function() {
			return !$( this ).hasClass( "ui-table-priority-3" );
		}),
		false,
		"Members of the first column have class 'ui-table-priority-3'" );

	deepEqual(
		table.children().children().children( ":nth(3)" ).is( function() {
			return !$( this ).hasClass( "ui-table-priority-1" );
		}),
		false,
		"Members of the first column have class 'ui-table-priority-1'" );

	deepEqual(
		table.children().children().children( ":nth(4)" ).is( function() {
			return !$( this ).hasClass( "ui-table-priority-5" );
		}),
		false,
		"Members of the first column have class 'ui-table-priority-5'" );
});
