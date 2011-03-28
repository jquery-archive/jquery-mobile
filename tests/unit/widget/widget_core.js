/*
 * mobile widget unit tests
 */
(function($){
	module('jquery.mobile.widget.js');

	test( "getting data from creation options", function(){
		var expected = "bizzle";

		$.mobile.widget.prototype.options = { "fooBar" : true };
		$.mobile.widget.prototype.element = $("<div data-foo-bar=" + expected + ">");
		same($.mobile.widget.prototype._getCreateOptions()["fooBar"],
				 expected);
	});

	test( "getting no data when the options are empty", function(){
				var expected = {};

		$.mobile.widget.prototype.options = {};
		$.mobile.widget.prototype.element = $("<div data-foo-bar=" + expected + ">");
		same($.mobile.widget.prototype._getCreateOptions(),
				 expected);
	});

	test( "getting no data when the element has none", function(){
		var expected = {};

		$.mobile.widget.prototype.options = { "fooBar" : true };
		$.mobile.widget.prototype.element = $("<div>");
		same($.mobile.widget.prototype._getCreateOptions(),
				 expected);
	});
})(jQuery);