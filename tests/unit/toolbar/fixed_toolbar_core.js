// Establishing the page container for a toolbar reduces performance and is only needed for fixed
// toolbars (https://github.com/jquery/jquery-mobile/issues/7839)

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Static toolbar does not have 'pagecontainer' instance variable",
	function( assert ) {
	assert.deepEqual( !!$( "#testHeader" ).data( "mobile-toolbar" ).pagecontainer, false,
		"Static toolbar does not have 'pagecontainer' instance variable" );
	assert.deepEqual( !!$( "#testFooter" ).data( "mobile-toolbar" ).pagecontainer, true,
		"Fixed toolbar has 'pagecontainer' instance variable" );
} );

} );
