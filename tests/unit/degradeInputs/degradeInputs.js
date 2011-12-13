/*
 * degradeInputs unit tests
 */

(function($){
	module('jquery.mobile.slider.js');

	test('keepNative elements should not be degraded', function() {
		same($('input#not-to-be-degraded').attr("type"), "range");
	});

	asyncTest('should degrade input type to a different type, as specified in page options', function(){
		var degradeInputs = $.mobile.page.prototype.options.degradeInputs;

		expect( degradeInputs.length );

		// NOTE the initial page is already enhanced (or expected to be) so we load the dialog to enhance it
		// and _expect_ that the default page will remain "unreaped". This will break if that assumption changes
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( "#dialog" );
			},

			function() {
				$.each(degradeInputs, function( oldType, newType ) {
					if (newType === false) {
						newType = oldType;
					}

					$('#page-test-container').html('<input type="' + oldType + '" />').trigger("create");

					same($('#page-test-container input').attr("type"), newType, "type attr on page is: " + newType);

					$('#dialog-test-container').html('<input type="' + oldType + '" />').trigger("create");

					same($('#dialog-test-container input').attr("type"), newType, "type attr on dialog is: " + newType);
				});

				start();
			}
		]);
	});
})(jQuery);