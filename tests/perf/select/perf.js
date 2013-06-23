require.config({ baseUrl: "../../../js" });

// Require both the generic suite and the library to be tested for performance
require( [ "../suite.js", "widgets/forms/select.custom" ], function( suite ) {
	suite.add( "custom select enchancement", function() {
		suite.fixtures.reset();
		suite.fixtures.children().first().selectmenu( { nativeMenu: false } );
	});
});
