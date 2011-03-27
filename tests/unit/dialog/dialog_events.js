/*
 * mobile dialog unit tests
 */
(function($){
	module('jquery.mobile.dialog.js');

	asyncTest( "dialog hash is added when the dialog is opened and removed when closed", function(){
		expect( 2 );

		//bring up the dialog
		$("a[href='#foo-dialog']").click();

		setTimeout(function(){
			ok(/&ui-state=dialog/.test(location.hash), "ui-state=dialog =~ location.hash");
			// close the dialog
			$(".ui-dialog").dialog("close");
		}, 500);

		setTimeout(function(){
			ok(!/&ui-state=dialog/.test(location.hash), "ui-state=dialog !~ location.hash");
			start();
		}, 1000);
	});
})(jQuery);
