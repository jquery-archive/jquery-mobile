/*
 * mobile listview unit tests
 */

// TODO split out into separate test files
( function( $ ) {
var home = $.mobile.path.parseUrl( location.href ).pathname + location.search,
	insetVal = $.mobile.listview.prototype.options.inset;

$.mobile.defaultTransition = "none";

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
			$.mobile.changePage( "#basic-linked-test" );
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
			$.mobile.changePage( "#basic-linked-test" );
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

asyncTest( "Slides back to main page when back button is clicked", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#basic-link-results" );
		},

		function() {
			window.history.back();
		},

		function() {
			ok( $( '#basic-linked-test' ).hasClass( 'ui-page-active' ) );
			start();
		}
	] );
} );

asyncTest( "Presence of ui-li-has- classes", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#ui-li-has-test" );
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
} );


module( 'Ordered Lists' );

asyncTest( "changes to the numbered list page and enhances it", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#numbered-list-test" );
		},

		function() {
			var $new_page = $( '#numbered-list-test' );
			ok( $new_page.hasClass( 'ui-page-active' ), "Makes the new page active when the hash is changed." );
			ok( $( '.ui-button', $new_page ).first().text() == "Number 1", "The text of the first LI should be Number 1" );
			start();
		}
	] );
} );

asyncTest( "changes to number 1 page when the li a is clicked", function() {
	$.testHelper.pageSequence( [
		function() {
			$( '#numbered-list-test li a' ).first().click();
		},

		function() {
			ok( $( '#numbered-list-results' ).hasClass( 'ui-page-active' ), "The new numbered page was transitioned correctly." );
			start();
		}
	] );
} );

asyncTest( "takes us back to the numbered list when the back button is clicked", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( '#numbered-list-test' );
		},

		function() {
			$.mobile.changePage( '#numbered-list-results' );
		},

		function() {
			window.history.back();
		},

		function() {
			ok( $( '#numbered-list-test' ).hasClass( 'ui-page-active' ) );
			start();
		}
	] );
} );

module( 'Read only list' );

asyncTest( "changes to the read only page when hash is changed", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#read-only-list-test" );
		},

		function() {
			var $new_page = $( '#read-only-list-test' );
			ok( $new_page.hasClass( 'ui-page-active' ), "makes the read only page the active page" );
			ok( $( 'li', $new_page ).first().text() === "Read", "The first LI has the proper text." );
			start();
		}
	] );
} );

module( 'Split view list' );

asyncTest( "changes the page to the split view list and enhances it correctly.", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#split-list-test" );
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
			$.mobile.changePage( "#split-list-test" );
		},

		function() {
			$( '.ui-page-active li a:eq(0)' ).click();
		},

		function() {
			ok( $( '#split-list-link1' ).hasClass( 'ui-page-active' ) );
			start();
		}
	] );
} );

asyncTest( "Slide back to the parent list view when the back button is clicked", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#split-list-test" );
		},

		function() {
			$( '.ui-page-active .ui-listview a:eq(0)' ).click();
		},

		function() {
			history.back();
		},

		function() {
			ok( $( '#split-list-test' ).hasClass( 'ui-page-active' ) );
			start();
		}
	] );
} );

asyncTest( "Clicking on the icon (the second link) should take the user to other a href of this LI", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#split-list-test" );
		},

		function() {
			$( '.ui-page-active .ui-li-has-alt > .ui-button:eq(1)' ).click();
		},

		function() {
			ok( $( '#split-list-link2' ).hasClass( 'ui-page-active' ) );
			start();
		}
	] );
} );

module( "List Dividers" );

asyncTest( "Makes the list divider page the active page and enhances it correctly.", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#list-divider-test" );
		},

		function() {
			var $new_page = $( '#list-divider-test' );
			ok( $new_page.find( '.ui-li-divider' ).length == 2 );
			ok( $new_page.hasClass( 'ui-page-active' ) );
			start();
		}
	] );
} );

module( "Autodividers" );

asyncTest( "Adds dividers based on first letters of list items.", function() {
	$.testHelper.pageSequence( [
		function() {
			$.testHelper.openPage( '#autodividers-test' );
		},

		function() {
			var $new_page = $( '#autodividers-test' );
			ok( $new_page.hasClass( 'ui-page-active' ) );
			ok( $new_page.find( '.ui-li-divider' ).length === 4 );
			start();
		}
	] );
} );

asyncTest( "Responds to addition/removal of list elements after refresh.", function() {
	$.testHelper.pageSequence( [
		function() {
			$.testHelper.openPage( '#autodividers-test' );
		},

		function() {
			var $new_page = $( '#autodividers-test' );
			ok( $new_page.hasClass( 'ui-page-active' ) );

			var $list = $new_page.find( 'ul' );

			// should remove all existing dividers
			ok( $new_page.find( 'li:contains("SHOULD REMOVE")' ).length === 0 );

			// add li; should add an "X" divider
			$list.append( '<li>x is for xanthe</li>' );
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider' ).length === 5 );
			ok( $new_page.find( '.ui-li-divider' ).is( ':contains("X")' ) );

			// adding the same element again should create a valid list
			// item but no new divider
			ok( $new_page.find( '.ui-li-static' ).length === 5 );
			$list.append( '<li>x is for xanthe</li>' );
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider' ).length === 5 );
			ok( $new_page.find( '.ui-li-divider:contains("X")' ).length === 1 );
			ok( $new_page.find( '.ui-li-static' ).length === 6 );

			// should ignore addition of non-li elements to the list
			$list.find( 'li:eq(0)' ).append( '<span>ignore me</span>' );
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider' ).length === 5 );
			ok( $new_page.find( '.ui-li-static' ).length === 6 );

			// add li with the same initial letter as another li
			// but after the X li item; should add a second "B" divider to the
			// end of the list
			$list.append( '<li>b is for barry</li>' );
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider' ).length === 6 );
			ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 2 );

			// remove the item with a repeated "b"; should remove the second
			// "B" divider
			$list.find( 'li:contains("barry")' ).remove();
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider' ).length === 5 );
			ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 1 );

			// remove li; should remove the "A" divider
			$list.find( 'li:contains("aquaman")' ).remove();
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider' ).length === 4 );
			ok( !$new_page.find( '.ui-li-divider' ).is( ':contains("A")' ) );

			// adding another "B" item after "C" should create two separate
			// "B" dividers
			$list.find( 'li:contains("catwoman")' ).after( '<li>b is for barry</li>' );
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider' ).length === 5 );
			ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 2 );

			// if two dividers with the same letter have only non-dividers
			// between them, they get merged

			// removing catwoman should cause the two "B" dividers to merge
			$list.find( 'li:contains("catwoman")' ).remove();
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 1 );

			// adding another "D" item before the "D" divider should only
			// result in a single "D" divider after merging
			$list.find( 'li:contains("barry")' ).after( '<li>d is for dan</li>' );
			$list.listview( 'refresh' );
			ok( $new_page.find( '.ui-li-divider:contains("D")' ).length === 1 );

			start();
		}
	] );
} );

module( "Autodividers Selector" );

asyncTest( "Adds right divider text.", function() {
	$.testHelper.pageSequence( [
		function() {
			$.testHelper.openPage( '#autodividers-selector-test' );
		},

		function() {
			var $new_page = $( '#autodividers-selector-test' );
			ok( $new_page.hasClass( 'ui-page-active' ) );

			// check we have the right dividers
			var $list = $( '#autodividers-selector-test-list1' );
			ok( $list.find( '.ui-li-divider' ).length === 4 );
			ok( $list.find( '.ui-li-divider' ).eq( 0 ).is( ':contains(A)' ) );
			ok( $list.find( '.ui-li-divider' ).eq( 1 ).is( ':contains(B)' ) );
			ok( $list.find( '.ui-li-divider' ).eq( 2 ).is( ':contains(C)' ) );
			ok( $list.find( '.ui-li-divider' ).eq( 3 ).is( ':contains(D)' ) );

			// check that adding a new item creates the right divider
			$list.append( '<li><a href="#">e is for ethel</a></li>' );
			$list.listview( 'refresh' );
			ok( $list.find( '.ui-li-divider' ).eq( 4 ).is( ':contains(E)' ) );

			start();
		}
	] );
} );

asyncTest( "Adds divider text based on custom selector.", function() {
	$.testHelper.pageSequence( [
		function() {
			$.testHelper.openPage( '#autodividers-selector-test' );
		},

		function() {
			var $new_page = $( '#autodividers-selector-test' );
			ok( $new_page.hasClass( 'ui-page-active' ) );

			// check we have the right dividers based on custom selector
			var $list = $( '#autodividers-selector-test-list2' );
			$list.listview( 'option', 'autodividersSelector', function( elt ) {
				var text = elt.find( 'div > span.autodividers-selector-test-selectme' ).text();
				text = text.slice( 0, 1 ).toUpperCase();
				return text;
			} );

			$list.listview( 'refresh' );
			ok( $list.find( '.ui-li-divider' ).length === 4 );
			ok( $list.find( '.ui-li-divider' ).eq( 0 ).is( ':contains(E)' ) );
			ok( $list.find( '.ui-li-divider' ).eq( 1 ).is( ':contains(F)' ) );
			ok( $list.find( '.ui-li-divider' ).eq( 2 ).is( ':contains(G)' ) );
			ok( $list.find( '.ui-li-divider' ).eq( 3 ).is( ':contains(H)' ) );

			// check that adding a new item creates the right divider
			$list.append( '<li><div><span class="autodividers-selector-test-selectme">' +
				'i is for impy</span></div></li>' );
			$list.listview( 'refresh' );

			ok( $list.find( '.ui-li-divider' ).eq( 4 ).is( ':contains(I)' ) );

			start();
		}
	] );
} );

test( "Refresh applies thumb styling", function() {
	var ul = $( '.ui-page-active ul' );

	ul.append( "<li id='fiz'><img/></li>" );
	ok( !ul.find( "#fiz" ).hasClass( "ui-li-has-thumb" ) );
	ul.listview( 'refresh' );
	ok( ul.find( "#fiz" ).hasClass( "ui-li-has-thumb" ) );
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
			item = $( '<li id="myItem' + data[ i ].id + '">' );
			label = $( "<strong>" + data[ i ].label + "</strong>" ).appendTo( item );
			$( "#programmatically-generated-list-items" ).append( item );
		}
	}
} );

asyncTest( "Corner styling on programmatically created list items", function() {
	// https://github.com/jquery/jquery-mobile/issues/1470
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#programmatically-generated-list" );
		},
		function() {
			ok( !$( "#programmatically-generated-list-items li:first-child" ).hasClass( "ui-last-child" ), "First list item should not have class ui-last-child" );
			start();
		}
	] );
} );

module( "Programmatic list items manipulation" );

asyncTest( "Removing list items", 4, function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#removing-items-from-list-test" );
		},

		function() {
			var ul = $( '#removing-items-from-list-test ul' );
			ul.find( "li" ).first().remove();
			equal( ul.find( "li" ).length, 3, "There should be only 3 list items left" );

			ul.listview( 'refresh' );
			ok( ul.find( "li" ).first().hasClass( "ui-first-child" ), "First list item should have class ui-first-child" );

			ul.find( "li" ).last().remove();
			equal( ul.find( "li" ).length, 2, "There should be only 2 list items left" );

			ul.listview( 'refresh' );
			ok( ul.find( "li" ).last().hasClass( "ui-last-child" ), "Last list item should have class ui-last-child" );
			start();
		}
	] );
} );

module( "Rounded corners" );

asyncTest( "Top and bottom corners rounded in inset list", 14, function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#corner-rounded-test" );
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

			ul.find( "li" ).last().hide();
			ul.listview( "refresh" );
			equal( ul.find( "li:visible" ).last()[ 0 ], ul.find( ".ui-last-child" )[ 0 ], "Last visible list item should have class ui-last-child" );

			start();
		}
	] );
} );


test( "Listview will create when inside a container that has enhance called on it", function(){
	ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-listview").length, "did not have enhancements applied" );
	ok( $("#enhancetest").enhance().find(".ui-listview").length, "enhancements applied" );
});

module( "Cached Linked List" );


asyncTest( "list inherits theme from parent", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#list-theme-inherit" );
		},

		function() {
			var theme = $.mobile.activePage.jqmData( 'theme' );
			ok( $.mobile.activePage.find( "ul > li" ).hasClass( "ui-body-inherit" ), "theme matches the parent" );
			window.history.back();
		},

		start
	] );
} );

asyncTest( "split list items respect the icon", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#split-list-icon" );
		},

		function() {
			$.mobile.activePage.find( "li" ).each( function( i, elem ) {
				var $elem = $( elem ),
					order = [ "star", "plus", "delete", "grid" ];

				ok( $elem.children( ".ui-button" ).last().hasClass( "ui-icon-" + order[ i ] ) );
			} );

			window.history.back();
		},

		start
	] );
} );

asyncTest( "links in list dividers are ignored", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#list-divider-ignore-link" );
		},

		function() {
			deepEqual( $.mobile.activePage.find( "#ignored-link .ui-button-inner" ).length, 0, "no buttons in list dividers" );

			window.history.back();
		},

		start
	] );
} );

module( "Borders" );

asyncTest( "last list item has border-bottom", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#list-last-visible-item-border" );
		},

		function() {
			deepEqual( $.mobile.activePage.find( ".listitem > .ui-button" ).css( "border-bottom-width" ), "0px", "has no border bottom" );
			deepEqual( $.mobile.activePage.find( "#lastitem > .ui-button" ).css( "border-bottom-width" ), "1px", "has border bottom" );

			window.history.back();
		},

		start
	] );
} );

asyncTest( "list inside collapsible content", function() {
	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#list-inside-collapsible-content" );
		},

		function() {
			deepEqual( $.mobile.activePage.find( "#noninsetlastli > .ui-button" ).css( "border-bottom-width" ), "0px", "last li non-inset list has no border bottom" );
			deepEqual( $.mobile.activePage.find( "#insetlastli > .ui-button" ).css( "border-bottom-width" ), "1px", "last li inset list has border bottom" );

			window.history.back();
		},

		start
	] );
} );

} )( jQuery );
