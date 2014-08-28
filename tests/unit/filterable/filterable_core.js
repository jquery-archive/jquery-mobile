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

module( "Filterable backwards compatibility" );

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

test( "Refreshing the listview also refreshes the filterable", function() {
	var listview = $( "#listview-refresh-refreshes-filterable" );

	listview.append( "<li>Item 3</li><li>Item 4</li><li>Item 5</li>" ).listview( "refresh" );
	deepEqual( listview.children( ".ui-screen-hidden" ).length, 5,
		"All list items are hidden after listview refresh" );
});

asyncTest( "Empty dividers are hidden by default", function() {
	var input = $( "#hide-empty-dividers-input" ),
		listview = $( "#hide-empty-dividers" );

	$.testHelper.detailedEventCascade([
		function() {
			input.val( "l" ).trigger( "change" );
		},
		{
			filterablefilter: {
				src: listview,
				event: "filterablebeforefilter.emptyDividersHidden1"
			}
		},
		function( result ) {
			deepEqual( result.filterablefilter.timedOut, false,
				"filterablefilter event was triggered" );
			deepEqual( $( "#prev-is-hidden" ).prev().hasClass( "ui-screen-hidden" ), true,
				"Divider for hidden item is hidden" );
			start();
		}
	]);
});

})( jQuery );
