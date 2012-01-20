/*
 * mobile init dialog tests
 */
(function($){
	module( "jquery.mobile.init dialog load tests" );

	// issue #3275
	test( "A document containing no pages and a dialog role div will enhance the div as a page", function() {
		ok( $("#foo").hasClass( "ui-page" ), "the div has the page class" );

		// NOTE this will fail when/if we decide to render it as a dialog
		ok( !$("#foo").hasClass( "ui-dialog-page" ), "the div does NOT have the dialog page class" );
	});

	//NOTE the opposite case is tested everyewhere else in the suite :D
})( jQuery );