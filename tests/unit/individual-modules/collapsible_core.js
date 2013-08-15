test( "Collapsible widget works correctly", function() {
	var collapsible = $( "#collapsible" ).collapsible();

	deepEqual( collapsible.hasClass( "ui-collapsible" ), true, "Collapsible has class ui-collapsible" );
	deepEqual( collapsible.children( "h1" ).hasClass( "ui-collapsible-heading" ), true, "Collapsible heading has class ui-collapsible-heading" );
	deepEqual( collapsible.children( "h1" ).next().hasClass( "ui-collapsible-content" ), true, "Collapsible content has class ui-collapsible-content" );
	deepEqual( collapsible.children().length, 2, "Collapsible contains exactly two children" );
});
