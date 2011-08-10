/*
 * mobile dialog unit tests
 */
(function($){
	module('jquery.mobile.dialog.js');

	asyncTest( "dialog hash is added when the dialog is opened and removed when closed", function(){
		expect( 6 );

		//bring up the dialog
		$("a[href='#foo-dialog']").click();

		setTimeout(function(){
			ok(/&ui-state=dialog/.test(location.hash), "ui-state=dialog =~ location.hash");
			
			// Assert dialog theme inheritance (issue 1375):
			ok($('#foo-dialog').hasClass('ui-body-b'), 'Expected explicit theme ui-body-b');
			ok($('#foo-dialog').find( ":jqmData(role=header)" ).hasClass('ui-bar-a'), 'Expected header to inherit from $.mobile.page.prototype.options.headerTheme');
			ok($('#foo-dialog').find( ":jqmData(role=content)" ).hasClass('ui-body-d'), 'Expect content to inherit from $.mobile.page.prototype.options.contentTheme');
			ok($('#foo-dialog').find( ":jqmData(role=footer)" ).hasClass('ui-bar-a'), 'Expected footer to inherit from $.mobile.page.prototype.options.footerTheme');
			
			// close the dialog
			$(".ui-dialog").dialog("close");
		}, 500);

		setTimeout(function(){
			ok(!/&ui-state=dialog/.test(location.hash), "ui-state=dialog !~ location.hash");
			start();
		}, 1000);
	});
})(jQuery);
