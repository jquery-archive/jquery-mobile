/*
 * mobile checkbox/radio unit tests
 */

// Resets inputs and labels to default values, as if page was reloaded.
function resetAll() {
	$('input').removeAttr('checked');
	$('label').removeClass('ui-btn-active');
}

(function($){
	var mouseUpTouchEnd = $.support.touch ? 'touchend' : 'mouseup',
		libName = 'jquery.mobile.forms.checkboxradio.js';

	module(libName);

// Radio button tests
	test('Clicking the label of a radio button should check the corresponding input', function() {
		var radio1 = $('#radio-choice-1'),
			label1 = $('label[for="radio-choice-1"]'),
			radio2 = $('#radio-choice-2'),
			label2 = $('label[for="radio-choice-2"]');

		resetAll();

		// Click a radio button.
		label1.trigger(mouseUpTouchEnd);
		ok(radio1.is(':checked'), 'The first radio button should be checked.');

		// Click another radio button.
		label2.trigger(mouseUpTouchEnd);
		ok(radio2.is(':checked'), 'The second radio button should be checked.');
		ok(!radio1.is(':checked'), 'The first radio button should be unchecked.');
		// Click second radio again.
		label2.trigger(mouseUpTouchEnd);
		ok(radio2.is(':checked'), 'The second radio button should be checked.');
		ok(!radio1.is(':checked'), 'The first radio button should be unchecked.');
	});

	test('Clicking the label of a radio button should highlight the label', function() {
		var label1 = $('label[for="radio-choice-1"]'),
			label2 = $('label[for="radio-choice-2"]');

		resetAll();

		// Click a radio button.
		label1.trigger(mouseUpTouchEnd);
		ok(label1.hasClass('ui-btn-active'), 'The label of the first radio button should now have a class ui-btn-active.');

		// Click another radio button.
		label2.trigger(mouseUpTouchEnd);
		ok(label2.hasClass('ui-btn-active'), 'The label of the second radio button should have a class ui-btn-active.');
		ok(!label1.hasClass('ui-btn-active'), 'The label of the first radio button should not have a class ui-btn-active.');

		// Click second radio again.
		label2.trigger(mouseUpTouchEnd);
		ok(label2.hasClass('ui-btn-active'), 'The label of the second radio button should have a class ui-btn-active.');
		ok(!label1.hasClass('ui-btn-active'), 'The label of the first radio button should not have a class ui-btn-active.');
	});

	test('Clicking the label of a radio button should trigger change event if the value changed.', function() {
		var label1 = $('label[for="radio-choice-1"]'),
			label2 = $('label[for="radio-choice-2"]'),
			changeCalls = 0;

		$('#radio-multiple input').bind('change', function() {
			changeCalls++;
		});

		// Click a radio button.
		label1.trigger(mouseUpTouchEnd);

		// Click another radio button.
		label2.trigger(mouseUpTouchEnd);

		// Click the second radio button again.
		label2.trigger(mouseUpTouchEnd);
		same(changeCalls, 2, 'Change event should be triggered two times.');
	});

	test( 'Clicking the label of a radio button should trigger click event.', function(){
		var label1 = $('label[for="radio-choice-1"]'),
			label2 = $('label[for="radio-choice-2"]'),
			clickCalls = 0;

		resetAll();

		$('#radio-multiple input').bind('click', function() {
			clickCalls++;
		});

		// Click the first radio button.
		label1.trigger(mouseUpTouchEnd);

		// Click the second radio button.
		label2.trigger(mouseUpTouchEnd);

		// Click the second radio button again.
		label2.trigger(mouseUpTouchEnd);
		same(clickCalls, 3, 'Click event should be triggered three times.');
	});

// Checkbox tests
	test('Clicking the label of a checkbox should check the corresponding input', function() {
		var checkbox1 = $('#checkbox-1a'),
			label1 = $('label[for="checkbox-1a"]'),
			checkbox2 = $('#checkbox-2a'),
			label2 = $('label[for="checkbox-2a"]');

		resetAll();

		// Click a checkbox.
		label1.trigger(mouseUpTouchEnd);
		ok(checkbox1.is(':checked'), 'The first checkbox should be checked.');

		// Click another checkbox.
		label2.trigger(mouseUpTouchEnd);
		ok(checkbox2.is(':checked'), 'The second checkbox should be checked.');
		ok(checkbox1.is(':checked'), 'The first checkbox should still be checked.');
		// Click second checkbox again.
		label2.trigger(mouseUpTouchEnd);
		ok(!checkbox2.is(':checked'), 'The second checkbox should be unchecked.');
	});

	test('Clicking the label of a checkbox should highlight the label', function() {
		var label1 = $('label[for="checkbox-1a"]'),
			label2 = $('label[for="checkbox-2a"]');

		resetAll();

		// Click a checkbox.
		label1.trigger(mouseUpTouchEnd);
		ok(label1.hasClass('ui-btn-active'), 'The label of the first checkbox should have a class ui-btn-active.');

		// Click another checkbox.
		label2.trigger(mouseUpTouchEnd);
		ok(label2.hasClass('ui-btn-active'), 'The label of the second checkbox should have a class ui-btn-active.');
		ok(label1.hasClass('ui-btn-active'), 'The label of the first checkbox should still have a class ui-btn-active.');

		// Click second checkbox again.
		label2.trigger(mouseUpTouchEnd);
		ok(!label2.hasClass('ui-btn-active'), 'The label of the second checkbox should not have a class ui-btn-active.');
	});

	test('Clicking the label of a checkbox should trigger change event if the value changed.', function() {
		var label1 = $('label[for="checkbox-1a"]'),
			label2 = $('label[for="checkbox-2a"]'),
			changeCalls = 0;

		resetAll();

		$('#checkbox-multiple input').bind('change', function() {
			changeCalls++;
		});

		// Click a checkbox.
		label1.trigger(mouseUpTouchEnd);

		// Click another checkbox.
		label2.trigger(mouseUpTouchEnd);

		// Click the second checkbox again.
		label2.trigger(mouseUpTouchEnd);
		same(changeCalls, 3, 'Change event should be triggered three times.');
	});

	test( 'Clicking the label of a checkbox should trigger click event.', function(){
		var label1 = $('label[for="checkbox-1a"]'),
			label2 = $('label[for="checkbox-2a"]'),
			clickCalls = 0;

		resetAll();

		$('#checkbox-multiple input').bind('click', function() {
			clickCalls++;
		});

		// Click the first checkbox.
		label1.trigger(mouseUpTouchEnd);

		// Click the second checkbox.
		label2.trigger(mouseUpTouchEnd);

		// Click the second checkbox again.
		label2.trigger(mouseUpTouchEnd);
		same(clickCalls, 3, 'Click event should be triggered three times.');
	});

})(jQuery);
