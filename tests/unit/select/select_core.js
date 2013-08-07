/*
 * mobile select unit tests
 */

(function($){

	module( "Custom select" );

	test( "Custom select is enhanced correctly", function() {
		deepEqual( $( "#role-test-listbox a:first" ).attr( "role" ), "button", "The close button for a multiple choice select popup has the " + '"' + "role='button'" + '"' + " set" );
	});

})(jQuery);
