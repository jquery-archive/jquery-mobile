/*
 * mobile select unit tests
 */

(function($){

	module( "Custom select" );

	test( "Custom select is enhanced correctly", function() {
		deepEqual( $( "#role-test-listbox a:first" ).attr( "role" ), "button", "The close button for a multiple choice select popup has the " + '"' + "role='button'" + '"' + " set" );
	});

	module( "Native select" );

	test( "Select menu ID", function() {
		ok( $( ".no-id-test" ).closest( ".ui-btn" ).attr( "id" ) !== "undefined-button", "Select menu without an ID does not result in the button having name 'undefined-button'" );
	});

})(jQuery);
