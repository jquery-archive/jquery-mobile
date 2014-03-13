/*
 * mobile filter unit tests - listview
 */

( function( $ ){

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

})( jQuery );
