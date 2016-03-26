/*
 * Mobile filter unit tests - listview
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Filterable tests" );

QUnit.asyncTest( "filterReveal filterable shows all items when all items match filter text", function( assert ) {
	var input = $( "#test-filter-reveal-show-all-input" ),
		list = $( "#test-filter-reveal-show-all-list" );

	assert.expect( 1 );

	input.val( "Test" ).trigger( "change" );

	setTimeout( function() {
		assert.deepEqual( list.children( ".ui-screen-hidden" ).length, 0,
			"All items visible when search value matches them all" );
		QUnit.start();
	}, 500 );
} );

QUnit.test( "Filterable input prevents default on ENTER", function( assert ) {
	var event = $.Event( "keydown" ),
		input = $( "#test-input-preventDefault" );

	event.keyCode = $.ui.keyCode.ENTER;

	input.trigger( event );

	assert.deepEqual( event.isDefaultPrevented(), true, "keydown for ENTER default is prevented" );

	event = $.Event( "keypress" );

	input.trigger( event );

	assert.deepEqual( event.isDefaultPrevented(), true, "Subsequent keypress default is also prevented" );
} );

} );
