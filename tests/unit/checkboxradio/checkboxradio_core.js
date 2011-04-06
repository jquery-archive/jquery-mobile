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

	asyncTest( "change events fired on checkbox for both check and uncheck", function(){
		var $checkbox = $("#checkbox-2"),
				$checkboxLabel = $("[for=checkbox-2]");

		$checkbox.unbind("change");

		expect( 2 );

		$checkbox.change(function(){
			ok(true, "change fired on click to check the box");
		});

		$checkboxLabel.trigger("click");

		//test above will be triggered twice, and the start here once	
		$checkbox.change(function(){
			start();
		});

		$checkboxLabel.trigger("click");
	});
})(jQuery);
