/*
 * mobile checkboxradio unit tests
 */
(function($){
	module('jquery.mobile.forms.checkboxradio.js');

	test( "widget can be disabled and enabled", function(){
		var input = $("#checkbox-1");
		var button = input.parent().find(".ui-btn");

		input.checkboxradio("disable");
		input.checkboxradio("enable");
		ok(!input.attr("disabled"), "start input as enabled");
		ok(!input.parent().hasClass("ui-disabled"), "no disabled styles");
		ok(!input.attr("checked"), "not checked before click");
		button.trigger("click");
		ok(input.attr("checked"), "checked after click");
		ok(button.hasClass("ui-btn-active"), "active styles after click");
		button.trigger("click");

		input.checkboxradio("disable");
		ok(input.attr("disabled"), "input disabled");
		ok(input.parent().hasClass("ui-disabled"), "disabled styles");
		ok(!input.attr("checked"), "not checked before click");
		button.trigger("click");
		ok(!input.attr("checked"), "not checked after click");
		ok(!button.hasClass("ui-btn-active"), "no active styles after click");
	});
})(jQuery);
