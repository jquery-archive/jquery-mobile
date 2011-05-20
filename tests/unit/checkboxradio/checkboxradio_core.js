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
				$checkboxLabel = $checkbox.parent().find(".ui-btn");

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

	asyncTest( "radio button labels should update the active button class to last clicked and clear checked", function(){
		var $radioBtns = $('#radio-active-btn-test input'),
				singleActiveAndChecked = function(){
					same($("#radio-active-btn-test .ui-btn-active").length, 1, "there should be only one active button");
					same($("#radio-active-btn-test :checked").length, 1, "there should be only one checked");
				};

		$.testHelper.sequence([
			function(){
				$radioBtns.last().siblings('label').click();
			},

			function(){
				ok($radioBtns.last().attr('checked'));
				ok($radioBtns.last().siblings('label').hasClass('ui-btn-active'),
					"last input label is an active button");

				ok(!$radioBtns.first().attr('checked'));
				ok(!$radioBtns.first().siblings('label').hasClass('ui-btn-active'),
					"first input label is not active");

				singleActiveAndChecked();

				$radioBtns.first().siblings('label').click();
			},

			function(){
				ok($radioBtns.first().attr('checked'));
				ok($radioBtns.first().siblings('label').hasClass('ui-btn-active'),
					"first input label is an active button");

				ok(!$radioBtns.last().attr('checked'));
				ok(!$radioBtns.last().siblings('label').hasClass('ui-btn-active'),
					"last input label is not active");

				singleActiveAndChecked();

				start();
			}
		], 500);

	});
})(jQuery);
