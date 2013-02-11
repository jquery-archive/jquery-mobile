require.config({ baseUrl: "../../../js" });

// Require both the generic suite and the library to be tested for performance
require( ["../suite.js", "jquery.mobile.buttonMarkup"], function( suite ) {
	suite.add( "$.fn.buttonMarkup enchancement", function() {
		suite.fixtures.reset();
		suite.fixtures.find( "[data-role='button']" ).buttonMarkup();
	});
});
