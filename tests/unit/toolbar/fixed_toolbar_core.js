// Establishing the page container for a toolbar reduces performance and is only needed for fixed
// toolbars (https://github.com/jquery/jquery-mobile/issues/7839)
test( "Static toolbar does not have 'pagecontainer' instance variable", function() {
	deepEqual( !!$( "#testHeader" ).data( "mobile-toolbar" ).pagecontainer, false,
		"Static toolbar does not have 'pagecontainer' instance variable" );
	deepEqual( !!$( "#testFooter" ).data( "mobile-toolbar" ).pagecontainer, true,
		"Fixed toolbar has 'pagecontainer' instance variable" );
});
