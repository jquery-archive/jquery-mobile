/*
 * mobile filter unit tests - listview
 */

( function( $ ) {

module( "Filterable tests" );

asyncTest( "filterReveal filterable shows all items when all items match filter text", function() {
	var input = $( "#test-filter-reveal-show-all-input" ),
		list = $( "#test-filter-reveal-show-all-list" );

	expect( 1 );

	input.val( "Test" ).trigger( "change" );

	setTimeout( function() {
		deepEqual( list.children( ".ui-screen-hidden" ).length, 0,
			"All items visible when search value matches them all" );
		start();
	}, 500 );
} );

test( "Filterable input prevents default on ENTER", function() {
	var event = $.Event( "keydown" ),
		input = $( "#test-input-preventDefault" );

	event.keyCode = $.ui.keyCode.ENTER;

	input.trigger( event );

	deepEqual( event.isDefaultPrevented(), true, "keydown for ENTER default is prevented" );

	event = $.Event( "keypress" );

	input.trigger( event );

	deepEqual( event.isDefaultPrevented(), true, "Subsequent keypress default is also prevented" );
} );

} )( jQuery );
