/*
 * degradeInputs unit tests
 */

(function($){
    

	module('jquery.mobile.slider.js', {
	    setup: function() {
	        $('#test-container').html("");
	    }
	});
	
	test('keepNative elements should not be degraded', function() {
        same($('input#not-to-be-degraded').attr("type"), "range");
	});
	
	test('input type color should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="color" />').trigger("create");
        
        same($('#test-container input').attr("type"), "color");
    });
    
    test('input type date should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="date" />').trigger("create");
        
        same($('#test-container input').attr("type"), "date");
    });
    
    test('input type datetime should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="datetime" />').trigger("create");
        
        same($('#test-container input').attr("type"), "datetime");
    });
    
    test('input type datetime-local should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="datetime-local" />').trigger("create");
        
        same($('#test-container input').attr("type"), "datetime-local");
    });
    
    test('input type email should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="email" />').trigger("create");
        
        same($('#test-container input').attr("type"), "email");
    });
    
    test('input type month should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="month" />').trigger("create");
        
        same($('#test-container input').attr("type"), "month");
    });
    
    test('input type number should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="number" />').trigger("create");
        
        same($('#test-container input').attr("type"), "number");
    });

    test('input type range should degrade to number when "create" event is triggered', function(){
        $('#test-container').html('<input type="range" />').trigger("create");
        
        same($('#test-container input').attr("type"), "number");
    });
    
    test('input type search should degrade to text when "create" event is triggered', function(){
        $('#test-container').html('<input type="search" />').trigger("create");
        
        same($('#test-container input').attr("type"), "text");
    });
    
    test('input type tel should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="tel" />').trigger("create");
        
        same($('#test-container input').attr("type"), "tel");
    });
    
    test('input type time should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="time" />').trigger("create");
        
        same($('#test-container input').attr("type"), "time");
    });
    
    test('input type url should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="url" />').trigger("create");
        
        same($('#test-container input').attr("type"), "url");
    });
    
    test('input type week should not degrade when "create" event is triggered', function(){
        $('#test-container').html('<input type="week" />').trigger("create");
        
        same($('#test-container input').attr("type"), "week");
    });
	
})(jQuery);