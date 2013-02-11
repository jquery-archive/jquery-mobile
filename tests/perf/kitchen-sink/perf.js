require.config({ baseUrl: "../../../js" });

// Require both the generic suite and the library to be tested for performance
require( ["../suite.js", "jquery.mobile"], function( suite ) {
	suite.add( "full widget enchancement", function() {
		suite.fixtures.reset();
		suite.fixtures.trigger( "pagecreate" );
	});
});
