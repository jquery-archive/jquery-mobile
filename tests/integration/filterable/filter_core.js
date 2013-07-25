/*
 * mobile filter unit tests - listview
 */

(function($){
	module( "Filter Widget Core Functions" );

	test( "Filterable filterPlaceholder option works", function() {
		var input = $( "#filtered-listview-input" ),
			listview = $( "#filtered-listview" );

		deepEqual( input.attr( "placeholder" ), "Replacement...", "Input's own placeholder is replaced by the 'filterPlaceholder' option" );
		listview.filterable( "option", "filterPlaceholder", "Yo!" );
		deepEqual( input.attr( "placeholder" ), "Yo!", "Replacing the placeholder by setting the filterable's 'filterPlaceholder' option works" );
	});

	asyncTest( "Filter hides/shows results when the user enters information", function() {
		var input = $( "#filtered-listview-input" ),
			listview = $( "#filtered-listview" );

		expect( 5 );

		$.testHelper.sequence([
			function() {
				input.val( "at" ).trigger( "change" );
			},
			function() {
				deepEqual( listview.find( "li.ui-screen-hidden" ).length, 2, "Number of hidden item after typing 'at' is 2." );
				input.val( "aa" ).trigger( "change" );
			},
			function() {
				deepEqual (listview.find( "li.ui-screen-hidden" ).length, 4, "Number of hidden items after typing 'aa' is 4." );
				input.val( "m" ).trigger( "change" );
			},
			function() {
				deepEqual (listview.find( "li.ui-screen-hidden" ).length, 1, "Number of hidden items after typing 'm' is 1." );
				input.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( listview.find( "li.ui-screen-hidden" ).length, 0, "Number of hidden items after emptying input is 0." );
				input.val( "*" ).trigger( "change" );
			},
			function() {
				deepEqual( listview.find( "li.ui-screen-hidden" ).length, 4, "Number of hidden items after entering a regex special character is 4." );
				input.val( "" ).trigger( "change" );
			},
			start
		], 500 );
	});

	asyncTest( "Event filterablebeforefilter fires in response to input change", function() {
		var input = $( "#filtered-listview-input" ),
			listview = $( "#filtered-listview" ),
			beforeFilterCount = 0;

		expect( 2 );

		listview.on( "filterablebeforefilter.theEventIsFiring", function() {
			beforeFilterCount++;
		});

		$.testHelper.sequence([
			function() {
				input.val( "a" ).trigger( "input" ).trigger( "keyup" ).trigger( "change" );
			},
			function() {
				deepEqual( beforeFilterCount, 1, "'filterablebeforefilter' fired only once for the same value." );
				input.val( "ab" ).trigger( "input" ).trigger( "keyup" );
			},
			function() {
				deepEqual( beforeFilterCount, 2, "'filterablebeforefilter' fired only once again when the value has changed" );
				listview.off( "filterablebeforefilter.theEventIsFiring" );
				input.val( "" ).trigger( "change" );
			},
			start
		], 500 );
	});

	asyncTest( "filterCallback and filterReveal can be altered after widget creation", function(){
		var filterable = $( "#custom-callback-listview" ),
			input = $( "#custom-callback-listview-input" ),
			origCallback = filterable.filterable( "option", "filterCallback" ),
			customCallback = function( index, searchValue ) {
				return $.mobile.getAttribute( this, "important", true ) ? false:
					origCallback.apply( this, arguments );
			};

		expect( 4 );

		$.testHelper.sequence([
			function() {
				filterable.filterable( "option", "filterReveal", true );
				deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 4, "When turning on filterReveal, all items are hidden." );
				filterable.filterable( "option", "filterReveal", false );
				deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 0, "When turning off filterReveal, all items are visible." );
				input.val( "c" ).trigger( "change" );
			},

			function() {
				deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 3, "Only one item is visible when typing 'c'" );
				filterable.filterable( "option", "filterCallback", customCallback );
				deepEqual( filterable.find( "li.ui-screen-hidden" ).length, 2, "Two items are visible when the filter is 'c' and a custom callback is used" );
				start();
			}
		], 500 );
	});

	asyncTest( "Multi-set filtering via 'children' attribute", function () {
		var input = $( "#multi-set-filterable-input" )
			.filterable( "option", "children", $( ".multi-set-filterable-children > li" ) ),
			set1 = $( "#multi-set-filterable-set1" ),
			set2 = $( "#multi-set-filterable-set2" );

		expect( 2 );

		$.testHelper.sequence([
			function() {
				input.val( "d" ).trigger( "change" );
			},

			function() {
				deepEqual( set1.find( "li.ui-screen-hidden" ).length, 3, "After filtering for 'd' set 1 has 3 hidden items" );
				deepEqual( set2.find( "li.ui-screen-hidden" ).length, 3, "After filtering for 'd' set 2 has 3 hidden items" );
				start();
			}
		], 500 );
	});

	module( "Filter Widget Using Different Elements" );

	asyncTest( "Filtering Table Rows based on Cells", function () {
		var table = $( "#table-filter-test" ),
			input = $( "#table-filter-test-input" );

		expect( 2 );

		$.testHelper.sequence([
			function() {
				input.val( "12:12" ).trigger( "change" );
			},
			function() {
				deepEqual( table.find( ".ui-screen-hidden" ).length, 4, "Filtering table rows hides based on table cell values" );
				input.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( table.find( ".ui-screen-hidden" ).length, 0, "Removing filter value shows all table rows again" );
				start();
			}
		], 500 );
	});

	asyncTest( "Controlgroup Search Filter", function () {
		var grp = $( "#search-controlgroup-test" ),
			container = grp.controlgroup( "container" ),
			input = $( "#search-controlgroup-test-input" );

		expect( 2 );

		$.testHelper.sequence([
			function() {
				input.val( "ac" ).trigger( "change" );
			},

			function() {
				deepEqual( container.children( ".ui-screen-hidden" ).length, 3, "Filtering controlgroup inputs and links by value" );
				input.val( "" ).trigger( "change" );
			},

			function() {
				deepEqual( container.children( ".ui-screen-hidden" ).length, 0, "Unsetting the filter unhides all children." );
				start();
			}
		], 500 );
	});

	asyncTest( "Native Select Search Filter", function () {
		var input = $( "#search-select-test-input" ),
			filterable = $( "#anotherSelect" );

		expect( 2 );

		$.testHelper.sequence([
			function() {
				input.val( "a" ).trigger( "change" );
			},
			function() {
				deepEqual( filterable.find( ".ui-screen-hidden" ).length, 9, "Filtering select options by option text" );
				input.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( filterable.find( ".ui-screen-hidden" ).length, 0, "Removing filter value shows all select options again" );
				start();
			}
		], 500 );
	});

	asyncTest( "Native Select Search Filter using data-filtertext", function () {
		var input = $( "#search-select-test-input" ),
			filterable = $( "#anotherSelect" );

		expect( 2 );

		$.testHelper.sequence([
			function() {
				input.val( "this goes" ).trigger( "change" );
			},
			function() {
				deepEqual( filterable.find( ".ui-screen-hidden" ).length, 9, "Filtering select options by option text" );
				input.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( filterable.find( ".ui-screen-hidden" ).length, 0, "Removing filter value shows all select options again" );
				start();
			}
		], 500 );
	});

	asyncTest( "Random Elements Filter - <P>", function () {
		var textInput = $( "#p-text-element-filter-input" ),
			textList = $( "#p-text-element-filter" ),
			filtertextInput = $( "#p-filtertext-element-filter-input" ),
			filtertextList = $( "#p-filtertext-element-filter" );

		expect( 5 );

		$.testHelper.sequence([
			function() {
				textInput.val( "b" ).trigger( "change" );
			},
			function() {
				deepEqual( textList.find( ".ui-screen-hidden" ).length, 5, "Filtering <p> elements by text" );
				textInput.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( textList.find('.ui-screen-hidden').length, 0, "Clearing filter shows all elements again" );
				filtertextInput.val( "f" ).trigger( "change" );
			},
			function() {
				deepEqual( filtertextList.find('.ui-screen-hidden').length, 5, "Filtering <p> on 2nd set using data-filtertext works" );
				deepEqual( filtertextList.find( ":not(.ui-screen-hidden)" ).text(), "a", "Filtering works on data-filtertext and not text" );
				filtertextInput.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( filtertextList.find('.ui-screen-hidden').length, 0, "Clearing filter shows all elements again" );
				start();
			}
		], 500 );
	});

	asyncTest( "Random Elements Filter - <SPAN>", function () {
		var textInput = $( "#span-text-element-filter-input" ),
			textList = $( "#span-text-element-filter" ),
			filtertextInput = $( "#span-filtertext-element-filter-input" ),
			filtertextList = $( "#span-filtertext-element-filter" );

		expect( 5 );

		$.testHelper.sequence([
			function() {
				textInput.val( "b" ).trigger( "change" );
			},
			function() {
				deepEqual( textList.find( ".ui-screen-hidden" ).length, 5, "Filtering <span> elements by text" );
				textInput.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( textList.find('.ui-screen-hidden').length, 0, "Clearing filter shows all elements again" );
				filtertextInput.val( "f" ).trigger( "change" );
			},
			function() {
				deepEqual( filtertextList.find('.ui-screen-hidden').length, 5, "Filtering <span> on 2nd set using data-filtertext works" );
				deepEqual( filtertextList.find( ":not(.ui-screen-hidden)" ).text(), "a", "Filtering works on data-filtertext and not text" );
				filtertextInput.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( filtertextList.find('.ui-screen-hidden').length, 0, "Clearing filter shows all elements again" );
				start();
			}
		], 500 );
	});

})(jQuery);
