/*
 * mobile widget unit tests
 */
(function($){
	module('jquery.mobile.widget.js');

	test( "getting data from creation options", function(){
		var expected = "bizzle";

		$.mobile.widget.prototype.options = { "fooBar" : true };
		$.mobile.widget.prototype.element = $("<div data-"+$.mobile.ns+"foo-bar=" + expected + ">");
		deepEqual($.mobile.widget.prototype._getCreateOptions()["fooBar"], expected);
	});

	test( "getting no data when the options are empty", function(){
				var expected = {};

		$.mobile.widget.prototype.options = {};
		$.mobile.widget.prototype.element = $("<div data-"+$.mobile.ns+"foo-bar=" + expected + ">");
		deepEqual($.mobile.widget.prototype._getCreateOptions(), expected);
	});

	test( "getting no data when the element has none", function(){
		var expected = {};

		$.mobile.widget.prototype.options = { "fooBar" : true };
		$.mobile.widget.prototype.element = $("<div>");
		deepEqual($.mobile.widget.prototype._getCreateOptions(), expected);
	});

	test( "elements embedded in sub page elements are excluded on create when they match the keep native selector", function() {
		// uses default keep native of data-role=none
		$("#enhance-prevented")
				.append('<label for="unenhanced">Text Input:</label><input type="text" name="name" id="unenhanced" value="" data-'+$.mobile.ns+'role="none" />')
				.trigger("create");

		ok( !$("#unenhanced").hasClass( "ui-input-text" ), "doesn't have the ui input text class (unenhanced)");
	});

	test( "elements embedded in sub page elements are included on create when they don't match the keep native selector", function() {

		// uses default keep native of data-role=none
		$("#enhance-allowed")
				.append('<label for="enhanced">Text Input:</label><input type="text" name="name" id="enhanced" value=""/>')
				.trigger("create");

		ok( $("#enhanced").hasClass( "ui-input-text" ), "has the ui input text class (unenhanced)");
	});
})(jQuery);