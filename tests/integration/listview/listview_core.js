/*
 * mobile listview unit tests
 */

// TODO split out into separate test files
( function( $ ) {

module( "Basic Linked list" );

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

	$.testHelper.pageSequence( [
		function() {
			$( "#basic-linked-test li a" ).first().click();
		},

		function() {
			assert.hasClasses( $( "#basic-link-results" ), "ui-page-active" );
			$.mobile.back();
		},
		done
	] );
} );

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
} );

module( "Ordered Lists" );

test( "Enhances numbered list", function( assert ) {
	assert.strictEqual( $( ".ui-button", "#numbered-list-test" ).first().text(), "Number 1",
		"The text of the first LI should be Number 1" );
} );

test( "changes to number 1 page when the li a is clicked", function( assert ) {
	var done = assert.async();

	$.testHelper.pageSequence( [
		function() {
			$( "#numbered-list-test li a" ).first().click();
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

test( "changes to the read only page when hash is changed", function( assert ) {
	assert.strictEqual( $( "#read-only-list-test li" ).first().text(), "Read",
		"The first LI has the proper text." );
} );

module( "Split view list" );

test( "split view list is enhanced correctly", function( assert ) {
	assert.strictEqual( $( "#split-list-test .ui-listview-item-has-alternate" ).length, 3 );
	assert.strictEqual( $( "#split-list-test > li > .ui-button" ).length, 6 );
} );

test( "change the page to the split view page 1 upon first link click", function( assert ) {
	var done = assert.async();

	$.testHelper.pageSequence( [
		function() {
			$( "#split-list-test li a:eq(0)" ).click();
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
} );

module( "List Dividers" );

test( "Enhances list with dividers correctly", function( assert ) {
	assert.strictEqual( $( "#list-divider-test" ).find( ".ui-listview-item-divider" ).length, 2 );
} );

module( "Autodividers" );

test( "Adds dividers based on first letters of list items.", function( assert ) {
	assert.strictEqual( $( "#autodividers-test" ).find( ".ui-listview-item-divider" ).length, 4 );
} );

test( "Responds to addition/removal of list elements after refresh.", function( assert ) {
	var list = $( "#autodividers-test" );

	// should remove all existing dividers
	assert.strictEqual( list.find( "li:contains('SHOULD REMOVE')" ).length, 0 );

	// add li; should add an "X" divider
	list.append( "<li>x is for xanthe</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	ok( list.find( ".ui-listview-item-divider" ).is( ":contains('X')" ) );

	// adding the same element again should create a valid list item but no new divider
	assert.strictEqual( list.find( ".ui-listview-item-static" ).length, 5 );
	list.append( "<li>x is for xanthe</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('X')" ).length, 1 );
	assert.strictEqual( list.find( ".ui-listview-item-static" ).length, 6 );

	// should ignore addition of non-li elements to the list
	list.find( "li:eq(0)" ).append( "<span>ignore me</span>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-static" ).length, 6 );

	// add li with the same initial letter as another li but after the X li item; should add a
	// second "B" divider to the end of the list
	list.append( "<li>b is for barry</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 6 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 2 );

	// remove the item with a repeated "b"; should remove the second "B" divider
	list.find( "li:contains('barry')" ).remove();
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 1 );

	// remove li; should remove the "A" divider
	list.find( "li:contains('aquaman')" ).remove();
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 4 );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).is( ":contains('A')" ), false );

	// adding another "B" item after "C" should create two separate "B" dividers
	list.find( "li:contains('catwoman')" ).after( "<li>b is for barry</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 5 );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 2 );

	// if two dividers with the same letter have only non-dividers between them, they get merged

	// removing catwoman should cause the two "B" dividers to merge
	list.find( "li:contains('catwoman')" ).remove();
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('B')" ).length, 1 );

	// adding another "D" item before the "D" divider should only result in a single "D" divider
	// after merging
	list.find( "li:contains('barry')" ).after( "<li>d is for dan</li>" );
	list.listview( "refresh" );
	assert.strictEqual( list.find( ".ui-listview-item-divider:contains('D')" ).length, 1 );
} );

module( "Autodividers Selector" );

test( "Adds right divider text", function( assert ) {

	// check we have the right dividers
	var list = $( "#autodividers-selector-test-list1" );
	assert.strictEqual( list.find( ".ui-listview-item-divider" ).length, 4 );
	ok( list.find( ".ui-listview-item-divider" ).eq( 0 ).is( ":contains(A)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 1 ).is( ":contains(B)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 2 ).is( ":contains(C)" ) );
	ok( list.find( ".ui-listview-item-divider" ).eq( 3 ).is( ":contains(D)" ) );

	// check that adding a new item creates the right divider
	list.append( "<li><a href='#'>e is for ethel</a></li>" );
	list.listview( "refresh" );
	ok( list.find( ".ui-listview-item-divider" ).eq( 4 ).is( ":contains(E)" ) );
} );

test( "Adds divider text based on custom selector.", function( assert ) {

	// check we have the right dividers based on custom selector
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

	// check that adding a new item creates the right divider
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
	assert.lacksClasses( $( "#programmatically-generated-list-items li:first-child" ),
		"ui-last-child", "First list item should not have class ui-last-child" );
} );

module( "Programmatic list items manipulation" );

test( "Removing list items", 4, function( assert ) {
	var ul = $( "#removing-items-from-list-test" );

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
			$.mobile.changePage( "#list-theme-inherit" );
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

test( "split list items respect the icon", function( assert ) {
	$( "#split-list-icon li" ).each( function( i, elem ) {
		var $elem = $( elem ),
			order = [ "star", "plus", "delete", "grid" ];

		assert.strictEqual( $elem
			.children( ".ui-button" )
				.last()
					.children( "span.ui-icon-" + order[ i ] ).length, 1 );
	} );
} );

test( "links in list dividers are ignored", function( assert ) {
	assert.strictEqual(
		$( "#list-divider-ignore-link" ).find( "#ignored-link .ui-button-inner" ).length, 0,
		"no buttons in list dividers" );
} );

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
			$.mobile.changePage( "#list-inside-collapsible-content" );
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
} );

} )( jQuery );
