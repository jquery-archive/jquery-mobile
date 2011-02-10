/*
 * mobile controlgroup unit tests
 */
(function($){
    module('jquery.mobile.controlGroup.js');
    
    var itemtemplate = '<div class="ui-btn"><span class="ui-btn-inner">Button</span></div>';
    
    function createAppendItem(id) {
        var item = $(itemtemplate);
        if(id) {
            item.attr('id',id);
        }
        item.appendTo($('[data-role=controlgroup]'));
        return item;
    }
    
	test('controlgroup with no options creates vertical control group', function(){
        var controlgroup = $('[data-role=controlgroup]');
        controlgroup.controlgroup();
        
		ok(controlgroup.hasClass('ui-controlgroup'), 'ui-controlgroup added');
		ok(controlgroup.hasClass('ui-controlgroup-vertical'), 'ui-controlgroup-vertical added');
		ok(!controlgroup.hasClass('ui-controlgroup-horizontal'), 'ui-controlgroup-horizontal not added');
        
        controlgroup.controlgroup('teardown');
	});
    
    test('controlgroup.init with vertical direction', function(){
        var controlgroup = $('[data-role=controlgroup]');
        controlgroup.controlgroup({
            direction: 'vertical'
        });
        
		ok(controlgroup.hasClass('ui-controlgroup'), 'ui-controlgroup added');
		ok(controlgroup.hasClass('ui-controlgroup-vertical'), 'ui-controlgroup-vertical added');
		ok(!controlgroup.hasClass('ui-controlgroup-horizontal'), 'ui-controlgroup-horizontal not added');
        
        controlgroup.controlgroup('teardown');
    });
    
    test('controlgroup.init with horizontal direction', function(){
        var controlgroup = $('[data-role=controlgroup]');
        controlgroup.controlgroup({
            direction: 'horizontal'
        });
        
		ok(controlgroup.hasClass('ui-controlgroup'), 'ui-controlgroup added');
		ok(!controlgroup.hasClass('ui-controlgroup-vertical'), 'ui-controlgroup-vertical not added');
		ok(controlgroup.hasClass('ui-controlgroup-horizontal'), 'ui-controlgroup-horizontal added');
        
        controlgroup.controlgroup('teardown');
    });
    
    test('legend gets replaced', function(){
        var controlgroup = $('[data-role=controlgroup]').empty().append($('<legend>A Legend</legend>'));        
        controlgroup.controlgroup();
        
        equal(controlgroup.find('legend').length, 0, 'legend no longer there');

        controlgroup.controlgroup('teardown');
    });
    
    test('controlgroup with one item', function(){
        var controlgroup = $('[data-role=controlgroup]').empty();
        var firstItem = createAppendItem();
        
        controlgroup.controlgroup();
        
        ok(firstItem.hasClass('ui-corner-top'), 'one item gets ui-corner-top');
        ok(firstItem.hasClass('ui-corner-bottom'), 'one item gets ui-corner-bottom');

        controlgroup.controlgroup('teardown');
    });
    
    test('controlgroup with multiple items', function(){
        var controlgroup = $('[data-role=controlgroup]').empty();
        var firstItem = createAppendItem();
        var secondItem = createAppendItem()

        controlgroup.controlgroup();
        
        ok(firstItem.hasClass('ui-corner-top'), 'top item gets ui-corner-top');
        ok(!firstItem.hasClass('ui-corner-bottom'), 'top item does not get ui-corner-bottom');

        ok(!secondItem.hasClass('ui-corner-top'), 'bottom item gets ui-corner-top');
        ok(secondItem.hasClass('ui-corner-bottom'), 'bottom item does not get ui-corner-bottom');

        controlgroup.controlgroup('teardown');
    });

    test('controlgroup refresh', function(){
        var controlgroup = $('[data-role=controlgroup]').empty();
        var firstItem = createAppendItem();
        
        var secondItem = createAppendItem();

        controlgroup.controlgroup();
        
        var thirdItem = createAppendItem();

        // cause a refresh of everything.
        controlgroup.controlgroup('refresh');
        
        ok(firstItem.hasClass('ui-corner-top'), 'top item gets ui-corner-top');
        ok(!secondItem.hasClass('ui-corner-top'), 'second item does not get ui-corner-top');
        ok(!secondItem.hasClass('ui-corner-bottom'), 'third item does not get ui-corner-bottom');
        ok(thirdItem.hasClass('ui-corner-bottom'), 'third item gets ui-corner-bottom');

        controlgroup.controlgroup('teardown');
    });
    
    test('teardown removes all controlgroup stuff from vertical group', function(){
        var controlgroup = $('[data-role=controlgroup]');

        controlgroup.controlgroup();
        controlgroup.controlgroup('teardown');
        
        ok(!controlgroup.hasClass('ui-controlgroup'), 'teardown removes ui-controlgroup');
        ok(!controlgroup.hasClass('ui-controlgroup-vertical'), 'teardown removes ui-controlgroup-vertical');
    });
    
    test('teardown puts the legend back in its place', function(){
        var controlgroup = $('[data-role=controlgroup]').empty().append('<legend>A Legend</legend>');
        createAppendItem('first');
        createAppendItem('second');
        createAppendItem('third');

        controlgroup.controlgroup();
        controlgroup.controlgroup('teardown');
        
        equal(controlgroup.find('.ui-controlgroup-label').length, 0, 'ui-controlgroup-label is removed');
        equal(controlgroup.find('.ui-controlgroup-controls').length, 0, 'ui-controlgroup-controls is removed');
        equal(controlgroup.find('legend').length, 1, 'legend is put back');
        equal(controlgroup.find('.ui-btn').length, 3, '3 buttons still exist');
        
    });
    
    test('teardown removes all controlgroup stuff from horizontal group', function(){
        var controlgroup = $('[data-role=controlgroup]');
        controlgroup.controlgroup({
            direction: 'horizontal'
        });
        
        controlgroup.controlgroup('teardown');
        ok(!controlgroup.hasClass('ui-controlgroup-horizontal'), 'teardown removes ui-controlgroup-horizontal');
    });
    
    
    
})(jQuery);
