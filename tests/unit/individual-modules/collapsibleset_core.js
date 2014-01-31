test( "Collapsible set widget works correctly", function() {
	var collapsibleset = $( "#collapsibleset" ).collapsibleset();

	deepEqual( collapsibleset.hasClass( "ui-collapsible-set" ), true, "Collapsible set has class ui-collapsible-set" );
	deepEqual( collapsibleset.children( ".ui-collapsible" ).length, 2, "Collapsible set correctly enhances its children" );

	collapsibleset.collapsibleset( "option", "mini", "true" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-mini" ).length, 2, "Collapsible set correctly apply option(mini='true') to children" );

	collapsibleset.collapsibleset( "option", "mini", "false" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-mini" ).length, 0, "Collapsible set correctly apply option(mini='false') to children" );

	collapsibleset.collapsibleset( "option", "inset", "false" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-collapsible-inset" ).length, 0, "Collapsible set correctly apply option(inset='false') to children" );

	collapsibleset.collapsibleset( "option", "inset", "true" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-collapsible-inset" ).length, 2, "Collapsible set correctly apply option(inset='true') to children" );

	collapsibleset.collapsibleset( "option", "iconpos", "right" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-btn-icon-right" ).length, 2, "Collapsible set correctly apply option(iconpos='right') to children" );

	collapsibleset.collapsibleset( "option", "iconpos", "left" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-btn-icon-left" ).length, 2, "Collapsible set correctly apply option(iconpos='left') to children" );

	collapsibleset.collapsibleset( "option", "collapsedIcon", "arrow-r" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-icon-arrow-r" ).length, 1, "Collapsible set correctly apply option(collapsedIcon='arrow-r') to children" );

	collapsibleset.collapsibleset( "option", "collapsedIcon", "plus" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-icon-plus" ).length, 1, "Collapsible set correctly apply option(collapsedIcon='plus') to children" );

	collapsibleset.collapsibleset( "option", "expandedIcon", "arrow-r" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-icon-arrow-r" ).length, 1, "Collapsible set correctly apply option(expandedIcon='arrow-r') to children" );

	collapsibleset.collapsibleset( "option", "expandedIcon", "minus" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-icon-plus" ).length, 1, "Collapsible set correctly apply option(expandedIcon='minus') to children" );

	collapsibleset.collapsibleset( "option", "theme", "b" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-btn-b" ).length, 2, "Collapsible set correctly apply option(theme='b') to children" );

	collapsibleset.collapsibleset( "option", "theme", "a" ).collapsibleset( "refresh" );
	deepEqual( collapsibleset.find( ".ui-btn-a" ).length, 2, "Collapsible set correctly apply option(theme='a') to children" );
});
