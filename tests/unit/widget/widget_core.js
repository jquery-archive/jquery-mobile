/*
 * mobile widget unit tests
 */

(function( $ ) {
	test( "getting data attributes from creation options", function(){
		expect( 1 );
		var result, expected = "bizzle";

		$.mobile.widget.prototype.options = { "fooBar" : true };
		$.mobile.widget.prototype.element = $("<div data-foo-bar=" + expected + ">");

		result = $.mobile.widget.prototype._getCreateOptions();
		same(result["fooBar"], expected);
	});
})(jQuery);