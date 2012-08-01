/*
 * mobile dialog unit tests
 */
(function($) {
	test( "When the page loads, any dialogs in the page should be initialized", function() {
		expect( 1 );

		ok( $( "#foo-dialog" ).is( ".ui-dialog" ), "When a dialog is the first element in a page, it is created as a dialog widget." );
	});
})( jQuery );
