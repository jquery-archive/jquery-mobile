/*
 * mobile filter unit tests - listview
 */

( function( $ ){

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
});

module( "Backwards compatibility tests" );

test( "Listview with filter has hideDividers option set to true", function() {
	deepEqual( $( "#hidedividers-option-test" ).listview( "option", "hideDividers" ), true );
});

test( "Filterable input prevents default on ENTER", function() {
	var event = $.Event( "keydown" ),
		input = $( "#test-input-preventDefault" );

	event.keyCode = $.ui.keyCode.ENTER;

	input.trigger( event );

	deepEqual( event.isDefaultPrevented(), true, "keydown for ENTER default is prevented" );

	event = $.Event( "keypress" );

	input.trigger( event );

	deepEqual( event.isDefaultPrevented(), true, "Subsequent keypress default is also prevented" );
});

asyncTest( "Working filterable is instantiated on dynamic listview when data-filter='true'", function() {
	var list = $( "<ul data-nstest-filter='true'><li>Chicago</li><li>Berlin</li><li>Windsor</li></ul>" )
			.appendTo( "#content" )
			.listview(),
		input = list.prev().find( "input" );

	expect( 3 );

	deepEqual( !!list.data( "mobile-filterable" ), true, "Filterable widget is present on listview" );
	input.val( "o" ).trigger( "change" );
	setTimeout( function() {
		deepEqual( list.children( ".ui-screen-hidden" ).length, 1, "One child was hidden" );
		deepEqual( list.children( ".ui-screen-hidden" ).text(), "Berlin", "'Berlin' was hidden" );
		start();
	}, 500 );
});

})( jQuery );
