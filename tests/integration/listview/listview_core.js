/*
 * Mobile listview unit tests
 */

// TODO split out into separate test files
( function( $ ) {

module( "Basic Linked list" );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "The page should be enhanced correctly", function() {
	ok( $( "#basic-linked-test .ui-listview-item-static" ).length,
		".ui-listview-item-static class added to read-only li elements" );
	ok( $( "#basic-linked-test .ui-listview-item-divider" ).length,
		".ui-listview-item-divider class added to divider li elements" );
	ok( $( "#basic-linked-test li > .ui-button" ).length,
		".ui-button classes added to anchors that are immediate child of li elements" );
} );

test( "Slides to the listview page when the li a is clicked", function( assert ) {
	var done = assert.async();
=======
module( "Basic Linked list", {
	setup: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
		$.testHelper.navReset( home );
	},

	teardown: function() {
		$.mobile.listview.prototype.options.inset = insetVal;
	}
} );

asyncTest( "The page should be enhanced correctly", function() {
	expect( 3 );
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#basic-linked-test" );
		},

		function() {
			ok( $( '#basic-linked-test .ui-li-static' ).length, ".ui-li-static class added to read-only li elements" );
			ok( $( '#basic-linked-test .ui-li-divider' ).length, ".ui-li-divider class added to divider li elements" );
			ok( $( '#basic-linked-test li > .ui-button' ).length, ".ui-button classes added to anchors that are immediate child of li elements" );
			start();
		}
	] );
} );

asyncTest( "Slides to the listview page when the li a is clicked", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#basic-linked-test" );
		},

		function() {
			$( '#basic-linked-test li a' ).first().click();
		},

		function() {
			ok( $( '#basic-link-results' ).hasClass( 'ui-page-active' ) );
			start();
		}
	] );
} );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer

	$.testHelper.pageSequence( [
		function() {
<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
			$( "#basic-linked-test li a" ).first().click();
=======
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#basic-link-results" );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
		},

		function() {
			assert.hasClasses( $( "#basic-link-results" ), "ui-page-active" );
			$.mobile.back();
		},
		done
	] );
} );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "Presence of ui-listview-item-has- classes", function( assert ) {
	var items = $( "#ui-listview-item-has-test li" );

	assert.hasClasses( items.eq( 0 ), "ui-listview-item-has-count",
		"First LI should have ui-listview-item-has-count class" );
	assert.strictEqual(
		items.eq( 0 ).find( "a" ).first().children( "span.ui-icon-caret-r" ).length, 1,
		"First LI A should have ui-icon-caret-r class" );
	assert.lacksClasses( items.eq( 1 ), "ui-listview-item-has-count",
		"Second LI should NOT have ui-listview-item-has-count class" );
	assert.strictEqual(
		items.eq( 1 ).find( "a" ).first().children( "span.ui-icon-caret-r" ).length, 1,
		"Second LI A should have ui-icon-caret-r class" );
	assert.lacksClasses( items.eq( 2 ), "ui-listview-item-has-count",
		"Third LI should NOT have ui-listview-item-has-count class" );
	assert.strictEqual(
		items.eq( 2 ).find( "a" ).first().children( "span.ui-icon-caret-r" ).length, 0,
		"Third LI A should NOT have ui-icon-caret-r class" );
	assert.hasClasses( items.eq( 3 ), "ui-listview-item-has-count",
		"Fourth LI should have ui-listview-item-has-count class" );
	assert.strictEqual(
		items.eq( 3 ).find( "a" ).first().children( "span.ui-icon-caret-r" ).length, 0,
		"Fourth LI A should NOT have ui-icon-caret-r class" );
	assert.lacksClasses( items.eq( 4 ), "ui-listview-item-has-count",
		"Fifth LI should NOT have ui-listview-item-has-count class" );
	assert.strictEqual(
		items.eq( 4 ).find( "a" ).first().children( "span.ui-icon-caret-r" ).length, 0,
		"Fifth LI A should NOT have ui-icon-caret-r class" );
	assert.hasClasses( items.eq( 5 ), "ui-listview-item-has-alternate",
		"Sixth LI should have ui-listview-item-has-alternate class" );
=======
asyncTest( "Presence of ui-li-has- classes", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#ui-li-has-test" );
		},

		function() {
			var page = $( ".ui-page-active" ),
				items = page.find( "li" );

			ok( items.eq( 0 ).hasClass( "ui-li-has-count" ), "First LI should have ui-li-has-count class" );
			ok( items.eq( 0 ).find( "a" ).first().hasClass( "ui-icon-caret-r" ), "First LI A should have ui-icon-caret-r class" );
			ok( !items.eq( 1 ).hasClass( "ui-li-has-count" ), "Second LI should NOT have ui-li-has-count class" );
			ok( items.eq( 1 ).find( "a" ).first().hasClass( "ui-icon-caret-r" ), "Second LI A should have ui-icon-caret-r class" );
			ok( !items.eq( 2 ).hasClass( "ui-li-has-count" ), "Third LI should NOT have ui-li-has-count class" );
			ok( !items.eq( 2 ).find( "a" ).first().hasClass( "ui-icon-caret-r" ), "Third LI A should NOT have ui-icon-caret-r class" );
			ok( items.eq( 3 ).hasClass( "ui-li-has-count" ), "Fourth LI should have ui-li-has-count class" );
			ok( !items.eq( 3 ).find( "a" ).first().hasClass( "ui-icon-caret-r" ), "Fourth LI A should NOT have ui-icon-caret-r class" );
			ok( !items.eq( 4 ).hasClass( "ui-li-has-count" ), "Fifth LI should NOT have ui-li-has-count class" );
			ok( !items.eq( 4 ).find( "a" ).first().hasClass( "ui-icon-caret-r" ), "Fifth LI A should NOT have ui-icon-caret-r class" );
			ok( items.eq( 5 ).hasClass( "ui-li-has-alt" ), "Sixth LI should have ui-li-has-alt class" );
			ok( items.eq( 6 ).hasClass( "ui-li-has-icon" ), "Seventh LI should have ui-li-has-icon class" );
			ok( items.eq( 7 ).hasClass( "ui-li-has-thumb" ), "Eight LI should have ui-li-has-thumb class" );
			start();
		}
	] );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
} );

module( "Ordered Lists" );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "Enhances numbered list", function( assert ) {
	assert.strictEqual( $( ".ui-button", "#numbered-list-test" ).first().text(), "Number 1",
		"The text of the first LI should be Number 1" );
=======
module( 'Ordered Lists' );

asyncTest( "changes to the numbered list page and enhances it", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#numbered-list-test" );
		},

		function() {
			var $new_page = $( '#numbered-list-test' );
			ok( $new_page.hasClass( 'ui-page-active' ), "Makes the new page active when the hash is changed." );
			ok( $( '.ui-button', $new_page ).first().text() == "Number 1", "The text of the first LI should be Number 1" );
			start();
		}
	] );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
} );

test( "changes to number 1 page when the li a is clicked", function( assert ) {
	var done = assert.async();

	$.testHelper.pageSequence( [
		function() {
<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
			$( "#numbered-list-test li a" ).first().click();
=======
			$( ".ui-pagecontainer" ).pagecontainer( "change", '#numbered-list-test' );
		},

		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", '#numbered-list-results' );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
		},

		function() {
			assert.hasClasses( $( "#numbered-list-results" ), "ui-page-active",
				"The new numbered page was transitioned correctly." );
			$.mobile.back();
		},
		done
	] );
} );

module( "Read only list" );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "changes to the read only page when hash is changed", function( assert ) {
	assert.strictEqual( $( "#read-only-list-test li" ).first().text(), "Read",
		"The first LI has the proper text." );
=======
asyncTest( "changes to the read only page when hash is changed", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#read-only-list-test" );
		},

		function() {
			var $new_page = $( '#read-only-list-test' );
			ok( $new_page.hasClass( 'ui-page-active' ), "makes the read only page the active page" );
			ok( $( 'li', $new_page ).first().text() === "Read", "The first LI has the proper text." );
			start();
		}
	] );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
} );

module( "Split view list" );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "split view list is enhanced correctly", function( assert ) {
	assert.strictEqual( $( "#split-list-test .ui-listview-item-has-alternate" ).length, 3 );
	assert.strictEqual( $( "#split-list-test > li > .ui-button" ).length, 6 );
} );

test( "change the page to the split view page 1 upon first link click", function( assert ) {
	var done = assert.async();
=======
asyncTest( "changes the page to the split view list and enhances it correctly.", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#split-list-test" );
		},

		function() {
			var $new_page = $( '#split-list-test' );
			ok( $( '.ui-li-has-alt', $new_page ).length == 3 );
			ok( $( 'li > .ui-button', $new_page ).length == 6 );
			start();
		}
	] );
} );

asyncTest( "change the page to the split view page 1 when the first link is clicked", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#split-list-test" );
		},

		function() {
			$( '.ui-page-active li a:eq(0)' ).click();
		},
>>>>>>> Listview: Remove uses of $.mobile.pageContainer

	$.testHelper.pageSequence( [
		function() {
<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
			$( "#split-list-test li a:eq(0)" ).click();
=======
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#split-list-test" );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
		},
		function() {
			assert.hasClasses( $( "#split-list-link1" ), "ui-page-active" );
			$.mobile.back();
		},
		function() {
			assert.hasClasses( $( "#main-page" ), "ui-page-active" );
			done();
		}
	] );
} );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "Clicking on the icon (the 2nd link) should take the user to other a href of this LI",
	function( assert ) {
		var done = assert.async();

		$.testHelper.pageSequence( [
			function() {
				$( "#split-list-test .ui-listview-item-has-alternate > .ui-button:eq(1)" ).click();
			},
			function() {
				assert.hasClasses( $( "#split-list-link2" ), "ui-page-active" );
				$.mobile.back();
			},
			function() {
				assert.hasClasses( $( "#main-page" ), "ui-page-active" );
				done();
			}
		] );
=======
asyncTest( "Clicking on the icon (the second link) should take the user to other a href of this LI", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#split-list-test" );
		},

		function() {
			$( '.ui-page-active .ui-li-has-alt > .ui-button:eq(1)' ).click();
		},

		function() {
			ok( $( '#split-list-link2' ).hasClass( 'ui-page-active' ) );
			start();
		}
	] );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
} );

module( "List Dividers" );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "Enhances list with dividers correctly", function( assert ) {
	assert.strictEqual( $( "#list-divider-test" ).find( ".ui-listview-item-divider" ).length, 2 );
=======
asyncTest( "Makes the list divider page the active page and enhances it correctly.", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#list-divider-test" );
		},

		function() {
			var $new_page = $( '#list-divider-test' );
			ok( $new_page.find( '.ui-li-divider' ).length == 2 );
			ok( $new_page.hasClass( 'ui-page-active' ) );
			start();
		}
	] );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
} );

module( "Autodividers" );

test( "Adds dividers based on first letters of list items.", function( assert ) {
	assert.strictEqual( $( "#autodividers-test" ).find( ".ui-listview-item-divider" ).length, 4 );
} );

test( "Responds to addition/removal of list elements after refresh.", function( assert ) {
	var list = $( "#autodividers-test" );

	// Should remove all existing dividers
	assert.strictEqual( list.find( "li:contains('SHOULD REMOVE')" ).length, 0 );

	// Add li; should add an "X" divider
	list.append( "<li>x is for xanthe</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	ok( list.find( ".ui-listview-item-divider" ).is( ":contains('X')" ) );

	// Adding the same element again should create a valid list item but no new divider
	assert.strictEqual( list.find( ".ui-listview-item-static" ).length, 5 );
	list.append( "<li>x is for xanthe</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('X')" ).length, 1 );
	assert.strictEqual( list.find( ".ui-listview-item-static" ).length, 6 );

	// Should ignore addition of non-li elements to the list
	list.find( "li:eq(0)" ).append( "<span>ignore me</span>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-static" ).length, 6 );

	// Add li with the same initial letter as another li but after the X li item; should add a
	// second "B" divider to the end of the list
	list.append( "<li>b is for barry</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 6 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 2 );

	// Remove the item with a repeated "b"; should remove the second "B" divider
	list.find( "li:contains('barry')" ).remove();
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 1 );

	// Remove li; should remove the "A" divider
	list.find( "li:contains('aquaman')" ).remove();
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 4 );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).is( ":contains('A')" ), false );

	// Adding another "B" item after "C" should create two separate "B" dividers
	list.find( "li:contains('catwoman')" ).after( "<li>b is for barry</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 2 );

	// If two dividers with the same letter have only non-dividers between them, they get merged

	// Removing catwoman should cause the two "B" dividers to merge
	list.find( "li:contains('catwoman')" ).remove();
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 1 );

	// Adding another "D" item before the "D" divider should only result in a single "D" divider
	// after merging
	list.find( "li:contains('barry')" ).after( "<li>d is for dan</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('D')" ).length, 1 );
} );

module( "Autodividers Selector" );

test( "Adds right divider text", function( assert ) {

	// Check we have the right dividers
	var list = $( "#autodividers-selector-test-list1" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 4 );
	ok( list.find( ".ui-listview-item-divider" ).eq( 0 ).is( ":contains(A)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 1 ).is( ":contains(B)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 2 ).is( ":contains(C)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 3 ).is( ":contains(D)" ) );

	// Check that adding a new item creates the right divider
	list.append( "<li><a href='#'>e is for ethel</a></li>" );
	list.listview( "refresh" );
	ok( list.find( ".ui-listview-item-divider" ).eq( 4 ).is( ":contains(E)" ) );
} );

test( "Adds divider text based on custom selector.", function( assert ) {

	// Check we have the right dividers based on custom selector
	var list = $( "#autodividers-selector-test-list2" );

	list.listview( "option", "autodividersSelector", function( elt ) {
		var text = elt.find( "div > span.autodividers-selector-test-selectme" ).text();
		text = text.slice( 0, 1 ).toUpperCase();
		return text;
	} );

	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 4 );
	ok( list.find( ".ui-listview-item-divider" ).eq( 0 ).is( ":contains(E)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 1 ).is( ":contains(F)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 2 ).is( ":contains(G)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 3 ).is( ":contains(H)" ) );

	// Check that adding a new item creates the right divider
	list.append( "<li><div><span class='autodividers-selector-test-selectme'>" +
		"i is for impy</span></div></li>" );
	list.listview( "refresh" );

	ok( list.find( ".ui-listview-item-divider" ).eq( 4 ).is( ":contains(I)" ) );
} );

module( "Programmatically generated list items", {
	setup: function() {
		var label, item,
			data = [
				{
					id: 1,
					label: "Item 1"
				},
				{
					id: 2,
					label: "Item 2"
				},
				{
					id: 3,
					label: "Item 3"
				},
				{
					id: 4,
					label: "Item 4"
				}
			];

		$( "#programmatically-generated-list-items" ).html( "" );

		for ( var i = 0, len = data.length; i < len; i++ ) {
			item = $( "<li id='myItem" + data[ i ].id + "'>" );
			label = $( "<strong>" + data[ i ].label + "</strong>" ).appendTo( item );
			$( "#programmatically-generated-list-items" ).append( item );
		}
	}
} );

test( "Corner styling on programmatically created list items", function( assert ) {

	// https://github.com/jquery/jquery-mobile/issues/1470
<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
	assert.lacksClasses( $( "#programmatically-generated-list-items li:first-child" ),
		"ui-last-child", "First list item should not have class ui-last-child" );
=======
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#programmatically-generated-list" );
		},
		function() {
			ok( !$( "#programmatically-generated-list-items li:first-child" ).hasClass( "ui-last-child" ), "First list item should not have class ui-last-child" );
			start();
		}
	] );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
} );

module( "Programmatic list items manipulation" );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "Removing list items", 4, function( assert ) {
	var ul = $( "#removing-items-from-list-test" );
=======
asyncTest( "Removing list items", 4, function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#removing-items-from-list-test" );
		},
>>>>>>> Listview: Remove uses of $.mobile.pageContainer

	ul.find( "li" ).first().remove();
	assert.strictEqual( ul.find( "li" ).length, 3, "There should be only 3 list items left" );

	ul.listview( "refresh" );
	assert.hasClasses( ul.find( "li" ).first(), "ui-first-child",
		"First list item should have class ui-first-child" );

	ul.find( "li" ).last().remove();
	assert.strictEqual( ul.find( "li" ).length, 2, "There should be only 2 list items left" );

	ul.listview( "refresh" );
	assert.hasClasses( ul.find( "li" ).last(), "ui-last-child",
		"Last list item should have class ui-last-child" );
} );

module( "Rounded corners" );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "Top and bottom corners rounded in inset list", function( assert ) {
	var ul = $( "#corner-rounded-test" );

	for ( var t = 0; t < 3; t++ ) {
		ul.append( "<li>Item " + t + "</li>" );
		ul.listview( "refresh" );
		assert.strictEqual( ul.find( ".ui-first-child" ).length, 1,
			"There should be only one element with class ui-first-child" );
		assert.deepEqual( ul.find( "li:visible" ).first()[ 0 ], ul.find( ".ui-first-child" )[ 0 ],
			"First list item should have class ui-first-child in list with " +
				ul.find( "li" ).length + " item(s)" );
		assert.strictEqual( ul.find( ".ui-last-child" ).length, 1,
			"There should be only one element with class ui-last-child" );
		assert.deepEqual( ul.find( "li:visible" ).last()[ 0 ], ul.find( ".ui-last-child" )[ 0 ],
			"Last list item should have class ui-last-child in list with " +
				ul.find( "li" ).length + " item(s)" );
	}
=======
asyncTest( "Top and bottom corners rounded in inset list", 14, function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#corner-rounded-test" );
		},

		function() {
			var ul = $( '#corner-rounded-test ul' );

			for ( var t = 0; t < 3; t++ ) {
				ul.append( "<li>Item " + t + "</li>" );
				ul.listview( 'refresh' );
				equal( ul.find( ".ui-first-child" ).length, 1, "There should be only one element with class ui-first-child" );
				equal( ul.find( "li:visible" ).first()[ 0 ], ul.find( ".ui-first-child" )[ 0 ], "First list item should have class ui-first-child in list with " + ul.find( "li" ).length + " item(s)" );
				equal( ul.find( ".ui-last-child" ).length, 1, "There should be only one element with class ui-last-child" );
				equal( ul.find( "li:visible" ).last()[ 0 ], ul.find( ".ui-last-child" )[ 0 ], "Last list item should have class ui-last-child in list with " + ul.find( "li" ).length + " item(s)" );
			}

			ul.find( "li" ).first().hide();
			ul.listview( "refresh" );
			equal( ul.find( "li:visible" ).first()[ 0 ], ul.find( ".ui-first-child" )[ 0 ], "First visible list item should have class ui-first-child" );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer

	ul.find( "li" ).first().hide();
	ul.listview( "refresh" );
	assert.deepEqual( ul.find( "li:visible" ).first()[ 0 ], ul.find( ".ui-first-child" )[ 0 ],
		"First visible list item should have class ui-first-child" );

	ul.find( "li" ).last().hide();
	ul.listview( "refresh" );
	assert.deepEqual( ul.find( "li:visible" ).last()[ 0 ], ul.find( ".ui-last-child" )[ 0 ],
		"Last visible list item should have class ui-last-child" );
} );

test( "Listview will create when inside a container when calling enhance on it",
	function( assert ) {
		assert.strictEqual(
			$( "#enhancetest" ).appendTo( ".ui-page-active" ).find( ".ui-listview" ).length, 0,
			"did not have enhancements applied" );
		ok( $( "#enhancetest" ).enhance().find( ".ui-listview" ).length, "enhancements applied" );
	} );

module( "Cached Linked List" );

test( "List inherits theme from parent", function( assert ) {
	var done = assert.async();

	$.testHelper.pageSequence( [
		function() {
<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
			$.mobile.changePage( "#list-theme-inherit" );
=======
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#list-theme-inherit" );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
		},

		function() {
			var theme = $.mobile.activePage.jqmData( "theme" );
			assert.hasClasses( $.mobile.activePage.find( "ul > li" ), "ui-body-inherit",
				"theme matches the parent" );
			$.mobile.back();
		},

		done
	] );
} );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "split list items respect the icon", function( assert ) {
	$( "#split-list-icon li" ).each( function( i, elem ) {
		var $elem = $( elem ),
			order = [ "star", "plus", "delete", "grid" ];
=======
asyncTest( "split list items respect the icon", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#split-list-icon" );
		},

		function() {
			$.mobile.activePage.find( "li" ).each( function( i, elem ) {
				var $elem = $( elem ),
					order = [ "star", "plus", "delete", "grid" ];

				ok( $elem.children( ".ui-button" ).last().hasClass( "ui-icon-" + order[ i ] ) );
			} );

			window.history.back();
		},
>>>>>>> Listview: Remove uses of $.mobile.pageContainer

		assert.strictEqual( $elem
			.children( ".ui-button" )
				.last()
					.children( "span.ui-icon-" + order[ i ] ).length, 1 );
	} );
} );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
test( "links in list dividers are ignored", function( assert ) {
	assert.strictEqual(
		$( "#list-divider-ignore-link" ).find( "#ignored-link .ui-button-inner" ).length, 0,
		"no buttons in list dividers" );
} );
=======
asyncTest( "links in list dividers are ignored", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#list-divider-ignore-link" );
		},
>>>>>>> Listview: Remove uses of $.mobile.pageContainer

module( "Borders" );

test( "last list item has border-bottom", function( assert ) {
	var listview = $( "#list-last-visible-item-border" );

	assert.strictEqual( listview.find( ".listitem > .ui-button" ).css( "border-bottom-width" ),
		"0px", "has no border bottom" );
	assert.strictEqual( listview.find( "#lastitem > .ui-button" ).css( "border-bottom-width" ),
		"1px", "has border bottom" );
} );

test( "list inside collapsible content", function( assert ) {
	var done = assert.async();

	$.testHelper.pageSequence( [
		function() {
<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
			$.mobile.changePage( "#list-inside-collapsible-content" );
=======
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#list-last-visible-item-border" );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
		},

		function() {
			assert.strictEqual(
				$.mobile.activePage.find( "#noninsetlastli > .ui-button" )
					.css( "border-bottom-width" ),
				"0px", "last li non-inset list has no border bottom" );
			assert.strictEqual(
				$.mobile.activePage.find( "#insetlastli > .ui-button" )
					.css( "border-bottom-width" ),
				"1px", "last li inset list has border bottom" );

			$.mobile.back();
		},

		done
	] );
} );

<<<<<<< 2ea6d1709f5b979c06c9cd63cf739c1a90de4a95
module( "Pre-enhanced" );

test( "basic pre-enhanced listview", function( assert ) {
	var item = $( "<li><a href='#'>New Item</a></li>" ),
		list = $( "#list-pre-enhanced" ),
		icons = list.find( "span.ui-listview-item-icon" );

	list.listview( "option", "classes.ui-listview-item-icon", "test-class" );
	assert.strictEqual(
		!icons.is( function() {
			return !$( this ).hasClass( "test-class" );
		} ),
		true,
		"All icons are tracked" );

	assert.strictEqual( !!list.listview( "instance" ), true,
		"listview instance declared on pre-enhanced list" );
	list.append( item ).listview( "refresh" );
	assert.hasClasses( item.children( "a" ), "ui-button",
		"Listview refresh() enhances new items" );
=======
asyncTest( "list inside collapsible content", function() {
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#list-inside-collapsible-content" );
		},

		function() {
			deepEqual( $.mobile.activePage.find( "#noninsetlastli > .ui-button" ).css( "border-bottom-width" ), "0px", "last li non-inset list has no border bottom" );
			deepEqual( $.mobile.activePage.find( "#insetlastli > .ui-button" ).css( "border-bottom-width" ), "1px", "last li inset list has border bottom" );

			window.history.back();
		},

		start
	] );
>>>>>>> Listview: Remove uses of $.mobile.pageContainer
} );

} )( jQuery );
