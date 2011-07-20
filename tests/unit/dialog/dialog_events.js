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
			ok($('#foo-dialog').hasClass('ui-body-b'), 'Expected theme ui-body-b');
			ok($('#foo-dialog').find( ":jqmData(role=header)" ).hasClass('ui-bar-b'), 'Expected header theme inherited from parent ui-bar-b');
			
			/* dialog content does will not inherit from parent.  This is consistent with the content inheritance of a page too. */
			ok($('#foo-dialog').find( ":jqmData(role=content)" ).hasClass('ui-body-c'), 'Expect default content theme ui-body-c');
			ok($('#foo-dialog').find( ":jqmData(role=footer)" ).hasClass('ui-bar-c'), 'Expected footer theme ui-bar-c');
			
			// close the dialog
			$(".ui-dialog").dialog("close");
		}, 500);

		setTimeout(function(){
			ok(!/&ui-state=dialog/.test(location.hash), "ui-state=dialog !~ location.hash");
			start();
		}, 1000);
	});
})(jQuery);
