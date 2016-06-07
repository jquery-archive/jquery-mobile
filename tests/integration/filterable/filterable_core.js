/*
 * Mobile filter unit tests - listview
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Filter Widget Core Functions" );

QUnit.test( "Filter hides/shows results when the user enters information", function( assert ) {
	var input = $( "#filtered-listview-input" ),
		listview = $( "#filtered-listview" );

	assert.expect( 5 );
	var ready = assert.async();

	$.testHelper.sequence( [
		function() {
			input.val( "at" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( listview.find( "li.ui-screen-hidden" ).length, 2, "Number of hidden item after typing 'at' is 2." );
			input.val( "aa" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( listview.find( "li.ui-screen-hidden" ).length, 4, "Number of hidden items after typing 'aa' is 4." );
			input.val( "m" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( listview.find( "li.ui-screen-hidden" ).length, 1, "Number of hidden items after typing 'm' is 1." );
			input.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( listview.find( "li.ui-screen-hidden" ).length, 0, "Number of hidden items after emptying input is 0." );
			input.val( "*" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( listview.find( "li.ui-screen-hidden" ).length, 4, "Number of hidden items after entering a regex special character is 4." );
			input.val( "" ).trigger( "change" );
		},
		ready
	], 500 );
} );

QUnit.test( "Event filterablebeforefilter fires in response to input change", function( assert ) {
	var input = $( "#filtered-listview-input" ),
		listview = $( "#filtered-listview" ),
		beforeFilterCount = 0;

	assert.expect( 2 );
	var ready = assert.async();

	listview.on( "filterablebeforefilter.theEventIsFiring", function() {
		beforeFilterCount++;
	} );

	$.testHelper.sequence( [
		function() {
			input.val( "a" ).trigger( "input" ).trigger( "keyup" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( beforeFilterCount, 1, "'filterablebeforefilter' fired only once for the same value." );
			input.val( "ab" ).trigger( "input" ).trigger( "keyup" );
		},
		function() {
			assert.deepEqual( beforeFilterCount, 2, "'filterablebeforefilter' fired only once again when the value has changed" );
			listview.off( "filterablebeforefilter.theEventIsFiring" );
			input.val( "" ).trigger( "change" );
		},
		ready
	], 500 );
} );

QUnit.test( "Filter won't run when preventing default on 'filterablebeforefilter'", function( assert ) {
	assert.expect( 1 );
	var ready = assert.async();

	var input = $( "#test-prevent-default-handler" ),
		listview = $( "#test-prevent-default-signal-emission" );

	listview.on( "filterablebeforefilter.theEventIsPrevented", function( e ) {
		e.preventDefault();
	} );

	$.testHelper.sequence( [
		function() {
			input.val( "a" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( listview.children( ".ui-screen-hidden" ).length, 0,
				"No children are hidden." );
			listview.off( "filterablebeforefilter.theEventIsPrevented" );
		},
		ready
	], 500 );
} );

QUnit.test( "filterCallback and filterReveal can be altered after widget creation", function( assert ) {
	var ready = assert.async();
	var filterable = $( "#custom-callback-listview" ),
		input = $( "#custom-callback-listview-input" ),
		origCallback = filterable.filterable( "option", "filterCallback" ),
		customCallback = function() {
			return $.mobile.getAttribute( this, "important", true ) ? false :
				origCallback.apply( this, arguments );
		};

	assert.expect( 4 );

	$.testHelper.sequence( [
		function() {
			filterable.filterable( "option", "filterReveal", true );
			assert.deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 4, "When turning on filterReveal, all items are hidden." );
			filterable.filterable( "option", "filterReveal", false );
			assert.deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 0, "When turning off filterReveal, all items are visible." );
			input.val( "c" ).trigger( "change" );
		},

		function() {
			assert.deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 3, "Only one item is visible when typing 'c'" );
			filterable.filterable( "option", "filterCallback", customCallback );
			assert.deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 2, "Two items are visible when the filter is 'c' and a custom callback is used" );
			ready();
		}
	], 500 );
} );

QUnit.test( "Multi-set filtering via 'children' attribute", function( assert ) {
	var ready = assert.async();
	var input = $( "#multi-set-filterable-input" )
			.filterable( "option", "children", $( ".multi-set-filterable-children > li" ) ),
		set1 = $( "#multi-set-filterable-set1" ),
		set2 = $( "#multi-set-filterable-set2" );

	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			input.val( "d" ).trigger( "change" );
		},

		function() {
			assert.deepEqual( set1.find( "li.ui-screen-hidden" ).length, 3, "After filtering for 'd' set 1 has 3 hidden items" );
			assert.deepEqual( set2.find( "li.ui-screen-hidden" ).length, 3, "After filtering for 'd' set 2 has 3 hidden items" );
			ready();
		}
	], 500 );
} );

QUnit.module( "Filter Widget Using Different Elements" );

QUnit.test( "Filtering Table Rows based on Cells", function( assert ) {
	var ready = assert.async();
	var table = $( "#table-filter-test" ),
		input = $( "#table-filter-test-input" );

	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			input.val( "12:12" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( table.find( ".ui-screen-hidden" ).length, 4, "Filtering table rows hides based on table cell values" );
			input.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( table.find( ".ui-screen-hidden" ).length, 0, "Removing filter value shows all table rows again" );
			ready();
		}
	], 500 );
} );

QUnit.test( "Controlgroup Search Filter", function( assert ) {
	var ready = assert.async();
	var grp = $( "#search-controlgroup-test" ),
		container = grp.controlgroup( "container" ),
		input = $( "#search-controlgroup-test-input" );

	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			input.val( "ac" ).trigger( "change" );
		},

		function() {
			assert.deepEqual( container.children( ".ui-screen-hidden" ).length, 3, "Filtering controlgroup inputs and links by value" );
			input.val( "" ).trigger( "change" );
		},

		function() {
			assert.deepEqual( container.children( ".ui-screen-hidden" ).length, 0, "Unsetting the filter unhides all children." );
			ready();
		}
	], 500 );
} );

QUnit.test( "Native Select Search Filter", function( assert ) {
	var ready = assert.async();
	var input = $( "#search-select-test-input" ),
		filterable = $( "#anotherSelect" );

	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			input.val( "a" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filterable.find( ".ui-screen-hidden" ).length, 9, "Filtering select options by option text" );
			input.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filterable.find( ".ui-screen-hidden" ).length, 0, "Removing filter value shows all select options again" );
			ready();
		}
	], 500 );
} );

QUnit.test( "Native Select Search Filter using data-filtertext", function( assert ) {
	var ready = assert.async();
	var input = $( "#search-select-test-input" ),
		filterable = $( "#anotherSelect" );

	assert.expect( 2 );

	$.testHelper.sequence( [
		function() {
			input.val( "this goes" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filterable.find( ".ui-screen-hidden" ).length, 9, "Filtering select options by option text" );
			input.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filterable.find( ".ui-screen-hidden" ).length, 0, "Removing filter value shows all select options again" );
			ready();
		}
	], 500 );
} );

QUnit.test( "Random Elements Filter - <P>", function( assert ) {
	var ready = assert.async();
	var textInput = $( "#p-text-element-filter-input" ),
		textList = $( "#p-text-element-filter" ),
		filtertextInput = $( "#p-filtertext-element-filter-input" ),
		filtertextList = $( "#p-filtertext-element-filter" );

	assert.expect( 5 );

	$.testHelper.sequence( [
		function() {
			textInput.val( "b" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( textList.find( ".ui-screen-hidden" ).length, 5, "Filtering <p> elements by text" );
			textInput.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( textList.find( ".ui-screen-hidden" ).length, 0, "Clearing filter shows all elements again" );
			filtertextInput.val( "f" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filtertextList.find( ".ui-screen-hidden" ).length, 5, "Filtering <p> on 2nd set using data-filtertext works" );
			assert.deepEqual( filtertextList.find( ":not(.ui-screen-hidden)" ).text(), "a", "Filtering works on data-filtertext and not text" );
			filtertextInput.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filtertextList.find( ".ui-screen-hidden" ).length, 0, "Clearing filter shows all elements again" );
			ready();
		}
	], 500 );
} );

QUnit.test( "Random Elements Filter - <SPAN>", function( assert ) {
	var ready = assert.async();
	var textInput = $( "#span-text-element-filter-input" ),
		textList = $( "#span-text-element-filter" ),
		filtertextInput = $( "#span-filtertext-element-filter-input" ),
		filtertextList = $( "#span-filtertext-element-filter" );

	assert.expect( 5 );

	$.testHelper.sequence( [
		function() {
			textInput.val( "b" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( textList.find( ".ui-screen-hidden" ).length, 5, "Filtering <span> elements by text" );
			textInput.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( textList.find( ".ui-screen-hidden" ).length, 0, "Clearing filter shows all elements again" );
			filtertextInput.val( "f" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filtertextList.find( ".ui-screen-hidden" ).length, 5, "Filtering <span> on 2nd set using data-filtertext works" );
			assert.deepEqual( filtertextList.find( ":not(.ui-screen-hidden)" ).text(), "a", "Filtering works on data-filtertext and not text" );
			filtertextInput.val( "" ).trigger( "change" );
		},
		function() {
			assert.deepEqual( filtertextList.find( ".ui-screen-hidden" ).length, 0, "Clearing filter shows all elements again" );
			ready();
		}
	], 500 );
} );

QUnit.module( "Filter widget destruction" );

QUnit.test( "Destroy restores visibility of items", function( assert ) {
	var ready = assert.async();
	var input = $( "#destroy-test-input" ),
	list = $( "#destroy-test" );

	$.testHelper.sequence( [
		function() {
			input.val( "c" ).trigger( "change" );
		},

		function() {
			assert.deepEqual( list.children( ".ui-screen-hidden" ).length, 2, "Two children are hidden when filtering for 'c'." );
			list.filterable( "destroy" );
			assert.deepEqual( list.children( ".ui-screen-hidden" ).length, 0, "All children become visible when destroying the filterable while a filter is active." );
			ready();
		}
	], 500 );
} );

QUnit.test( "Pre-rendered: destroy restores visibility of items", function( assert ) {
	var ready = assert.async();
	var input = $( "#pre-rendered-destroy-test-input" ),
	list = $( "#pre-rendered-destroy-test" );

	$.testHelper.sequence( [
		function() {
			input.val( "c" ).trigger( "change" );
		},

		function() {
			assert.deepEqual( list.children( ".ui-screen-hidden" ).length, 2, "Two children are hidden when filtering for 'c'." );
			list.filterable( "destroy" );
			assert.deepEqual( list.children( ".ui-screen-hidden" ).length, 4, "All children become hidden when destroying the pre-rendered filterable while a filter is active and filterReveal is set." );
			ready();
		}
	], 500 );
} );

QUnit.test( "Default not prevented on keystroke following 'Enter'", function( assert ) {
	var event,
		input = $( "#test-keyboard-flag-reset-input" );

	event = $.Event( "keydown" );
	event.keyCode = $.ui.keyCode.ENTER;
	input.trigger( event );
	assert.deepEqual( event.isDefaultPrevented(), true, "'Enter' keydown default prevented" );

	event = $.Event( "keypress" );
	event.keyCode = $.ui.keyCode.ENTER;
	input.trigger( event );
	assert.deepEqual( event.isDefaultPrevented(), true,
		"'Enter' keypress following 'Enter' keydown default prevented" );

	event = $.Event( "keydown" );
	event.keyCode = $.ui.keyCode.ENTER;
	input.trigger( event );
	assert.deepEqual( event.isDefaultPrevented(), true, "'Enter' keydown default prevented again" );

	event = $.Event( "keydown" );
	event.keyCode = 85;
	input.trigger( event );
	assert.deepEqual( event.isDefaultPrevented(), false, "'u' keydown default not prevented" );

	event = $.Event( "keypress" );
	event.keyCode = 85;
	input.trigger( event );
	assert.deepEqual( event.isDefaultPrevented(), false, "'u' keypress default not prevented" );
} );

QUnit.test( "All event handlers are removed from input", function( assert ) {
	assert.deepEqual( $._data( $( "#test-handler-removal-input" )[ 0 ] ), {},
		"Private data for input is initially empty" );

	$( "#test-handler-removal-list" )
		.filterable( "option", "input", "#test-handler-removal-input" );

	assert.notDeepEqual( $._data( $( "#test-handler-removal-input" )[ 0 ] ), {},
		"Private data for input not empty after setting as filterable input" );

	$( "#test-handler-removal-list" )
		.filterable( "option", "input", false );

	assert.deepEqual( $._data( $( "#test-handler-removal-input" )[ 0 ] ), {},
		"Private data for input is empty again after unsetting as filterable input" );
} );

} );
