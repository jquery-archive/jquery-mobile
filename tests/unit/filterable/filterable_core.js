/*
 * mobile filter unit tests - listview
 */

( function( $ ){

module( "Backwards compatibility tests" );

test( "Listview with filter has hideDividers option set to true", function() {
	deepEqual( $( "#hidedividers-option-test" ).listview( "option", "hideDividers" ), true );
});

test( "Filterable input prevents default on ENTER", function() {
	var event = $.Event( "keydown" );

	event.keyCode = $.ui.keyCode.ENTER;

	$( "#test-input-preventDefault" ).trigger( event );

	deepEqual( event.isDefaultPrevented(), true, "Keydown for ENTER default is prevented" );
});

})( jQuery );
