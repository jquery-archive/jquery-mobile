/*
 * mobile init dialog tests
 */
(function($){
	module( "jquery.mobile.init dialog load tests" );

	// issue #3275
	test( "A document containing no pages and a dialog role div will enhance the div as a dialog", function() {
		// NOTE this will fail when/if we decide to render it as a dialog
		ok( $("#foo").hasClass( "ui-dialog" ), "the div does NOT have the dialog page class" );
	});

	//NOTE the opposite case is tested everyewhere else in the suite :D
})( jQuery );