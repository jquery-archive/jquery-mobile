/*
 * mobile dialog unit tests
 */
(function($){
	var wait = function(length){
		setTimeout(start, length);
		stop();
	};

	module('jquery.mobile.dialog.js', {
		setup: function(){
			//bring up the dialog
			$("a[href='#foo-dialog']").click();

			//wait for the dialog to appear
			wait(500);
		},
		teardown: function(){
			// close the dialog
			$(".ui-dialog .ui-icon-delete").parents("a").click();

			// wait for the dialog to disappear
			wait(500);
		}
	});

	test( "dialog hash is added when the dialog is opened", function(){
		ok(/&ui-state=dialog/.test(location.hash), "ui-state=dialog =~ location.hash");
	});

	asyncTest( "dialog hash param is removed on close", function(){
		$(".ui-dialog .ui-icon-delete").parents("a").click();

		setTimeout(function(){
			ok(!/&ui-state=dialog/.test(location.hash), "ui-state=dialog !~ location.hash");
			start();
		}, 600);
	});
})(jQuery);
