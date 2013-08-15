test( "Collapsible set widget works correctly", function() {
	var collapsibleset = $( "#collapsibleset" ).collapsibleset();

	deepEqual( collapsibleset.hasClass( "ui-collapsible-set" ), true, "Collapsible set has class ui-collapsible-set" );
	deepEqual( collapsibleset.children( ".ui-collapsible" ).length, 2, "Collapsible set correctly enhances its children" );
});
