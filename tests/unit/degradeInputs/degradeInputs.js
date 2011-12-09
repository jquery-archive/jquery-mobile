/*
 * degradeInputs unit tests
 */

(function($){
    
    module('jquery.mobile.slider.js');
	
	test('keepNative elements should not be degraded', function() {
        same($('input#not-to-be-degraded').attr("type"), "range");
	});
	
	test('should degrade input type to a different type, as specified in page options', function(){
        var degradeInputs = $.mobile.page.prototype.options.degradeInputs;
    
        expect( degradeInputs.length );
 
        // Initialize dialog page
        $.mobile.changePage($('#dialog'));
        $.mobile.changePage($('#page'));

        $.each(degradeInputs, function( oldType, newType ) {
            if (newType === false) {
                newType = oldType;
            }
            
            $('#page-test-container').html('<input type="' + oldType + '" />').trigger("create");
            
            same($('#page-test-container input').attr("type"), newType);

            $('#dialog-test-container').html('<input type="' + oldType + '" />').trigger("create");

            same($('#dialog-test-container input').attr("type"), newType);
        });
    });
	
})(jQuery);