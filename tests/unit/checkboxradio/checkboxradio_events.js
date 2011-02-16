/*
 * mobile checkbox/radio unit tests
 */

(function($){
	var mouseUpTouchEnd = $.support.touch ? 'touchend' : 'mouseup',
		libName = 'jquery.mobile.forms.checkboxradio.js';

	module(libName);

	test( 'Clicking the label of a radio button should check this radio button, set its label to active and trigger click and change (if value is changed) events.', function(){
		var radio1 = $('#radio-choice-1'),
            label1 = $('label[for="radio-choice-1"]'),
		    radio2 = $('#radio-choice-2'),
            label2 = $('label[for="radio-choice-2"]');
            changeCalls = 0,
            clickCalls = 0;
            $('#radio-multiple input').bind('change', function() {
                changeCalls++;
            });
            $('#radio-multiple input').bind('click', function() {
                clickCalls++;
            });

		// click the first radio button
		label1.trigger(mouseUpTouchEnd);
        ok(label1.hasClass('ui-btn-active'), 'Click the label of the first radio button. This label should now have a class ui-btn-active.');
        ok(radio1.is(':checked'), 'The first radio button should be checked.');
        same(changeCalls, 1, 'Change event should be triggered once.');
        same(clickCalls, 1, 'Click event should be triggered once.');

		// click the second radio button
		label2.trigger(mouseUpTouchEnd);
        ok(label2.hasClass('ui-btn-active'), 'Click the label of the second radio button. This label should have a class ui-btn-active.');
        ok(radio2.is(':checked'), 'The second radio button should be checked.');
        ok(!label1.hasClass('ui-btn-active'), 'The label of the first radio button should not have a class ui-btn-active anymore.');
        ok(!radio1.is(':checked'), 'The first radio button should be unchecked.');
        same(changeCalls, 2, 'Change event should be triggered a second time now.');
        same(clickCalls, 2, 'Click event should be triggered a second time now.');

        // click the second radio button again (the label should stay active)
		label2.trigger(mouseUpTouchEnd);
        ok(label2.hasClass('ui-btn-active'), 'Click the label of the second radio button again. This button should still have a class ui-btn-active.');
        ok(radio2.is(':checked'), 'The second radio button should still be checked.');
        same(changeCalls, 2, 'Change event should still be triggered two times.');
        same(clickCalls, 3, 'Click event should be triggered a third time now.');
	});

	test( 'Clicking the label of a checkbox should check this checkbox, set its label to active and trigger click and change (if value is changed) events.', function(){
		var checkbox1 = $('#checkbox-1a'),
            label1 = $('label[for="checkbox-1a"]'),
		    checkbox2 = $('#checkbox-2a'),
            label2 = $('label[for="checkbox-2a"]');
            changeCalls = 0,
            clickCalls = 0;
            $('#checkbox-multiple input').bind('change', function() {
                changeCalls++;
            });
            $('#checkbox-multiple input').bind('click', function() {
                clickCalls++;
            });

		// click the first checkbox
		label1.trigger(mouseUpTouchEnd);
        ok(label1.hasClass('ui-btn-active'), 'Click the label of the first checkbox. This label should now have a class ui-btn-active.');
        ok(checkbox1.is(':checked'), 'The first checkbox should be checked.');
        same(changeCalls, 1, 'Change event should be triggered once.');
        same(clickCalls, 1, 'Click event should be triggered once.');

		// click the second checkbox
		label2.trigger(mouseUpTouchEnd);
        ok(label2.hasClass('ui-btn-active'), 'Click the label of the second checkbox. This label should have a class ui-btn-active.');
        ok(checkbox2.is(':checked'), 'The second checkbox should be checked.');
        ok(label1.hasClass('ui-btn-active'), 'The label of the first checkbox should still have a class ui-btn-active.');
        ok(checkbox1.is(':checked'), 'The first checkbox should still be checked.');
        same(changeCalls, 2, 'Change event should be triggered a second time now.');
        same(clickCalls, 2, 'Click event should be triggered a second time now.');

        // click the second checkbox again (the label should be inactive)
		label2.trigger(mouseUpTouchEnd);
        ok(!label2.hasClass('ui-btn-active'), 'Click the label of the second checkbox again. This label should not have a class ui-btn-active anymore.');
        ok(!checkbox2.is(':checked'), 'The second checkbox should not be checked anymore.');
        same(changeCalls, 3, 'Change event should still be triggered a third time now.');
        same(clickCalls, 3, 'Click event should be triggered a third time now.');
	});


})(jQuery);
