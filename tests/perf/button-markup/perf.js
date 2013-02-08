require.config({ baseUrl: "../../../js" });

require( ["../setup.js", "jquery.mobile.buttonMarkup"], function( suite ) {
	suite.name = "Button Markup";

	suite.add( "$.fn.buttonMarkup enchancement", function() {
		suite.fixtures.reset();
		suite.fixtures.find( "[data-role='button']" ).buttonMarkup();
	});
});
