/*
 * mobile listview unit tests
 */

// TODO split out into seperate test files
(function($){
	var home = $.mobile.path.parseUrl( location.href ).pathname + location.search,
		insetVal = $.mobile.listview.prototype.options.inset;

	$.mobile.defaultTransition = "none";

	module( "Basic Linked list", {
		setup: function(){
			if( location.hash != "#basic-linked-test" ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( home );
			}
		},

		teardown: function() {
			$.mobile.listview.prototype.options.inset = insetVal;
		}
	});

	asyncTest( "The page should be enhanced correctly", function(){
		setTimeout(function() {
			ok($('#basic-linked-test .ui-li').length, ".ui-li classes added to li elements");
			start();
		}, 800);
	});

	asyncTest( "Slides to the listview page when the li a is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#basic-linked-test");
			},

			function(){
				$('#basic-linked-test li a').first().click();
			},

			function(){
				ok($('#basic-link-results').hasClass('ui-page-active'));
				start();
			}
		]);
	});

	asyncTest( "Slides back to main page when back button is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#basic-link-results");
			},

			function(){
				window.history.back();
			},

			function(){
				ok($('#basic-linked-test').hasClass('ui-page-active'));
				start();
			}
		]);
	});

	asyncTest( "Presence of ui-li-has- classes", function(){
		$.testHelper.pageSequence( [
			function() {
				$.mobile.changePage( "#ui-li-has-test" );
			},

			function() {
				var page = $( ".ui-page-active" ),
					items = page.find( "li" );

				ok(  items.eq( 0 ).hasClass( "ui-li-has-count"), "First LI should have ui-li-has-count class" );
				ok(  items.eq( 0 ).hasClass( "ui-li-has-arrow"), "First LI should have ui-li-has-arrow class" );
				ok( !items.eq( 1 ).hasClass( "ui-li-has-count"), "Second LI should NOT have ui-li-has-count class" );
				ok(  items.eq( 1 ).hasClass( "ui-li-has-arrow"), "Second LI should have ui-li-has-arrow class" );
				ok( !items.eq( 2 ).hasClass( "ui-li-has-count"), "Third LI should NOT have ui-li-has-count class" );
				ok( !items.eq( 2 ).hasClass( "ui-li-has-arrow"), "Third LI should NOT have ui-li-has-arrow class" );
				ok(  items.eq( 3 ).hasClass( "ui-li-has-count"), "Fourth LI should have ui-li-has-count class" );
				ok( !items.eq( 3 ).hasClass( "ui-li-has-arrow"), "Fourth LI should NOT have ui-li-has-arrow class" );
				ok( !items.eq( 4 ).hasClass( "ui-li-has-count"), "Fifth LI should NOT have ui-li-has-count class" );
				ok( !items.eq( 4 ).hasClass( "ui-li-has-arrow"), "Fifth LI should NOT have ui-li-has-arrow class" );
				start();
			}
		]);
	});


	module('Ordered Lists');

	asyncTest( "changes to the numbered list page and enhances it", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#numbered-list-test");
			},

			function(){
				var $new_page = $('#numbered-list-test');
				ok($new_page.hasClass('ui-page-active'), "Makes the new page active when the hash is changed.");
				ok($('.ui-link-inherit', $new_page).first().text() == "Number 1", "The text of the first LI should be Number 1");
				start();
			}
		]);
	});

	asyncTest( "changes to number 1 page when the li a is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$('#numbered-list-test li a').first().click();
			},

			function(){
				ok($('#numbered-list-results').hasClass('ui-page-active'), "The new numbered page was transitioned correctly.");
				start();
			}
		]);
	});

	asyncTest( "takes us back to the numbered list when the back button is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage('#numbered-list-test');
			},

			function(){
				$.mobile.changePage('#numbered-list-results');
			},

			function(){
				window.history.back();
			},

			function(){
				ok($('#numbered-list-test').hasClass('ui-page-active'));
				start();
			}
		]);
	});

	module('Read only list');

	asyncTest( "changes to the read only page when hash is changed", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#read-only-list-test");
			},

			function(){
				var $new_page = $('#read-only-list-test');
				ok($new_page.hasClass('ui-page-active'), "makes the read only page the active page");
				ok($('li', $new_page).first().text() === "Read", "The first LI has the proper text.");
				start();
			}
		]);
	});

	module('Split view list');

	asyncTest( "changes the page to the split view list and enhances it correctly.", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#split-list-test");
			},

			function(){
				var $new_page = $('#split-list-test');
				ok($('.ui-li-link-alt', $new_page).length == 3);
				ok($('.ui-link-inherit', $new_page).length == 3);
				start();
			}
		]);
	});

	asyncTest( "change the page to the split view page 1 when the first link is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#split-list-test");
			},

			function(){
				$('.ui-page-active .ui-li a:eq(0)').click();
			},

			function(){
				ok($('#split-list-link1').hasClass('ui-page-active'));
				start();
			}
		]);
	});

	asyncTest( "Slide back to the parent list view when the back button is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#split-list-test");
			},

			function(){
				$('.ui-page-active .ui-listview a:eq(0)').click();
			},

			function(){
				history.back();
			},

			function(){
				ok($('#split-list-test').hasClass('ui-page-active'));
				start();
			}
		]);
	});

	asyncTest( "Clicking on the icon (the second link) should take the user to other a href of this LI", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#split-list-test");
			},

			function(){
				$('.ui-page-active .ui-li-link-alt:eq(0)').click();
			},

			function(){
				ok($('#split-list-link2').hasClass('ui-page-active'));
				start();
			}
		]);
	});

	module( "List Dividers" );

	asyncTest( "Makes the list divider page the active page and enhances it correctly.", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#list-divider-test");
			},

			function(){
				var $new_page = $('#list-divider-test');
				ok($new_page.find('.ui-li-divider').length == 2);
				ok($new_page.hasClass('ui-page-active'));
				start();
			}
		]);
	});

	module( "Autodividers" );

	asyncTest( "Adds dividers based on first letters of list items.", function() {
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage( '#autodividers-test' );
			},

			function() {
				var $new_page = $( '#autodividers-test' );
				ok( $new_page.hasClass( 'ui-page-active' ) );
				ok( $new_page.find( '.ui-li-divider' ).length === 4 );
				start();
			}
		]);
	});

	asyncTest( "Responds to addition/removal of list elements after refresh.", function() {
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage( '#autodividers-test' );
			},

			function() {
				var $new_page = $( '#autodividers-test' );
				ok( $new_page.hasClass( 'ui-page-active' ));

				var $list = $new_page.find( 'ul' );

				// should remove all existing dividers
				ok( $new_page.find( 'li:contains("SHOULD REMOVE")' ).length === 0 );

				// add li; should add an "X" divider
				$list.append( '<li>x is for xanthe</li>' );
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider' ).length === 5 );
				ok( $new_page.find( '.ui-li-divider' ).is( ':contains("X")' ) );

				// adding the same element again should create a valid list
				// item but no new divider
				ok( $new_page.find( '.ui-li-static' ).length === 5 );
				$list.append( '<li>x is for xanthe</li>' );
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider' ).length === 5 );
				ok( $new_page.find( '.ui-li-divider:contains("X")' ).length === 1 );
				ok( $new_page.find( '.ui-li-static' ).length === 6 );

				// should ignore addition of non-li elements to the list
				$list.find( 'li:eq(0)' ).append( '<span>ignore me</span>' );
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider' ).length === 5 );
				ok( $new_page.find( '.ui-li-static' ).length === 6 );

				// add li with the same initial letter as another li
				// but after the X li item; should add a second "B" divider to the
				// end of the list
				$list.append( '<li>b is for barry</li>' );
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider' ).length === 6 );
				ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 2 );

				// remove the item with a repeated "b"; should remove the second
				// "B" divider
				$list.find( 'li:contains("barry")' ).remove();
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider' ).length === 5 );
				ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 1 );

				// remove li; should remove the "A" divider
				$list.find( 'li:contains("aquaman")' ).remove();
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider' ).length === 4 );
				ok( !$new_page.find( '.ui-li-divider' ).is( ':contains("A")' ) );

				// adding another "B" item after "C" should create two separate
				// "B" dividers
				$list.find( 'li:contains("catwoman")' ).after( '<li>b is for barry</li>' );
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider' ).length === 5 );
				ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 2 );

				// if two dividers with the same letter have only non-dividers
				// between them, they get merged

				// removing catwoman should cause the two "B" dividers to merge
				$list.find( 'li:contains("catwoman")' ).remove();
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider:contains("B")' ).length === 1 );

				// adding another "D" item before the "D" divider should only
				// result in a single "D" divider after merging
				$list.find( 'li:contains("barry")' ).after( '<li>d is for dan</li>' );
				$list.listview('refresh');
				ok( $new_page.find( '.ui-li-divider:contains("D")' ).length === 1 );

				start();
			}
		]);
	});

	module( "Autodividers Selector" );

	asyncTest( "Adds right divider text.", function() {
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage( '#autodividers-selector-test' );
			},

			function() {
				var $new_page = $( '#autodividers-selector-test' );
				ok($new_page.hasClass( 'ui-page-active' ));

				// check we have the right dividers
				var $list = $( '#autodividers-selector-test-list1' );
				ok( $list.find( '.ui-li-divider' ).length === 4 );
				ok( $list.find( '.ui-li-divider' ).eq(0).is( ':contains(A)' ) );
				ok( $list.find( '.ui-li-divider' ).eq(1).is( ':contains(B)' ) );
				ok( $list.find( '.ui-li-divider' ).eq(2).is( ':contains(C)' ) );
				ok( $list.find( '.ui-li-divider' ).eq(3).is( ':contains(D)' ) );

				// check that adding a new item creates the right divider
				$list.append( '<li><a href="#">e is for ethel</a></li>' );
				$list.listview('refresh');
				ok( $list.find( '.ui-li-divider' ).eq(4).is( ':contains(E)' ) );

				start();
			}
		]);
	});

	asyncTest( "Adds divider text based on custom selector.", function() {
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage( '#autodividers-selector-test' );
			},

			function() {
				var $new_page = $( '#autodividers-selector-test' );
				ok($new_page.hasClass( 'ui-page-active' ));

				// check we have the right dividers based on custom selector
				var $list = $( '#autodividers-selector-test-list2' );
				$list.listview( 'option', 'autodividersSelector', function( elt ) {
          var text = elt.find( 'div > span.autodividers-selector-test-selectme' ).text();
          text = text.slice( 0, 1 ).toUpperCase();
          return text;
				});

				$list.listview( 'refresh' );
				ok( $list.find( '.ui-li-divider' ).length === 4 );
				ok( $list.find( '.ui-li-divider').eq(0).is( ':contains(E)' ) );
				ok( $list.find( '.ui-li-divider').eq(1).is( ':contains(F)' ) );
				ok( $list.find( '.ui-li-divider').eq(2).is( ':contains(G)' ) );
				ok( $list.find( '.ui-li-divider').eq(3).is( ':contains(H)' ) );

				// check that adding a new item creates the right divider
				$list.append( '<li><div><span class="autodividers-selector-test-selectme">' +
				'i is for impy</span></div></li>' );
				$list.listview( 'refresh' );

				ok( $list.find( '.ui-li-divider').eq(4).is( ':contains(I)' ) );

				start();
			}
		]);
	});

	module( "Search Filter" );

	var searchFilterId = "#search-filter-test";

	asyncTest( "Filter downs results when the user enters information", function() {
		var $searchPage = $(searchFilterId);
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage(searchFilterId);
			},

			function() {
				$searchPage.find('input').val('at');
				$searchPage.find('input').trigger('change');

				deepEqual($searchPage.find('li.ui-screen-hidden').length, 2);
				start();
			}
		]);
	});

	asyncTest( "Redisplay results when user removes values", function() {
		var $searchPage = $(searchFilterId);
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage(searchFilterId);
			},

			function() {
				$searchPage.find('input').val('a');
				$searchPage.find('input').trigger('change');

				deepEqual($searchPage.find("li[style^='display: none;']").length, 0);
				start();
			}
		]);
	});

    asyncTest( "Filter works fine with \\W- or regexp-special-characters", function() {
        var $searchPage = $(searchFilterId);
        $.testHelper.pageSequence([
            function() {
                $.mobile.changePage(searchFilterId);
            },

            function() {
                $searchPage.find('input').val('*');
                $searchPage.find('input').trigger('change');

                deepEqual($searchPage.find('li.ui-screen-hidden').length, 4);
                start();
            }
        ]);
    });

	test( "Refresh applies thumb styling", function(){
		var ul = $('.ui-page-active ul');

		ul.append("<li id='fiz'><img/></li>");
		ok(!ul.find("#fiz img").hasClass("ui-li-thumb"));
		ul.listview('refresh');
		ok(ul.find("#fiz img").hasClass("ui-li-thumb"));
	});

	asyncTest( "Filter downs results and dividers when the user enters information", function() {
		var	$searchPage = $("#search-filter-with-dividers-test");
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#search-filter-with-dividers-test");
			},

			// wait for the page to become active/enhanced
			function(){
				$searchPage.find('input').val('at');
				$searchPage.find('input').trigger('change');
				setTimeout(function() {
					//there should be four hidden list entries
					deepEqual($searchPage.find('li.ui-screen-hidden').length, 4);

					//there should be two list entries that are list dividers and hidden
					deepEqual($searchPage.find('li.ui-screen-hidden:jqmData(role=list-divider)').length, 2);

					//there should be two list entries that are not list dividers and hidden
					deepEqual($searchPage.find('li.ui-screen-hidden:not(:jqmData(role=list-divider))').length, 2);
					start();
				}, 1000);
			}
		]);
	});

	asyncTest( "Redisplay results when user removes values", function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#search-filter-with-dividers-test");
			},

			function() {
				$('.ui-page-active input').val('a');
				$('.ui-page-active input').trigger('change');

				setTimeout(function() {
					deepEqual($('.ui-page-active input').val(), 'a');
					deepEqual($('.ui-page-active li[style^="display: none;"]').length, 0);
					start();
				}, 1000);
			}
		]);
	});

	asyncTest( "Dividers are hidden when preceding hidden rows and shown when preceding shown rows", function () {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#search-filter-with-dividers-test");
			},

			function() {
				var $page = $('.ui-page-active');

				$page.find('input').val('at');
				$page.find('input').trigger('change');

				setTimeout(function() {
					deepEqual($page.find('li:jqmData(role=list-divider):hidden').length, 2);
					deepEqual($page.find('li:jqmData(role=list-divider):hidden + li:not(:jqmData(role=list-divider)):hidden').length, 2);
					deepEqual($page.find('li:jqmData(role=list-divider):not(:hidden) + li:not(:jqmData(role=list-divider)):not(:hidden)').length, 2);
					start();
				}, 1000);
			}
		]);
	});

	asyncTest( "Inset List View should refresh corner classes after filtering", 4 * 2, function () {
		var checkClasses = function() {
			var $page = $( ".ui-page-active" ),
				$li = $page.find( "li:visible" );
			ok($li.first().hasClass( "ui-corner-top" ), $li.length+" li elements: First visible element should have class ui-corner-top");
			ok($li.last().hasClass( "ui-corner-bottom" ), $li.length+" li elements: Last visible element should have class ui-corner-bottom");
		};

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#search-filter-inset-test");
			},

			function() {
				var $page = $('.ui-page-active');
				$.testHelper.sequence([
					function() {
						checkClasses();

						$page.find('input').val('man');
						$page.find('input').trigger('change');
					},

					function() {
						checkClasses();

						$page.find('input').val('at');
						$page.find('input').trigger('change');
					},

					function() {
						checkClasses();

						$page.find('input').val('catwoman');
						$page.find('input').trigger('change');
					},

					function() {
						checkClasses();
						start();
					}
				], 50);
			}
		]);
	});

	module( "Custom search filter", {
		setup: function() {
			var self = this;
			this._refreshCornersCount = 0;
			this._refreshCornersFn = $.mobile.listview.prototype._refreshCorners;

			this.startTest = function() {
				return this._refreshCornersCount === 1;
			};

			// _refreshCorners is the last method called in the filter loop
			// so we count the number of times _refreshCorners gets invoked to stop the test
			$.mobile.listview.prototype._refreshCorners = function() {
				self._refreshCornersCount += 1;
				self._refreshCornersFn.apply( this, arguments );
				if ( self.startTest() ) {
					start();
				}
			}
		},
		teardown: function() {
			$.mobile.listview.prototype._refreshCorners = this._refreshCornersFn;
		}
	});

	asyncTest( "Custom filterCallback should cause iteration on all list elements", function(){
		var listPage = $( "#search-customfilter-test" ),
			filterCallbackCount = 0,
			expectedCount = 2 * listPage.find("li").length;
		expect( 1 );

		this.startTest = function() {
			if ( this._refreshCornersCount === 3 ) {
				equal( filterCallbackCount, expectedCount, "filterCallback should be call exactly "+ expectedCount +" times" );
			}
			return this._refreshCornersCount === 3;
		}

		$.testHelper.pageSequence( [
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-customfilter-test" );
			},

			function() {
				// set the listview instance callback
				listPage.find( "ul" ).listview( "option", "filterCallback", function( text, searchValue, item ) {
					filterCallbackCount += 1;

					return text.toString().toLowerCase().indexOf( searchValue ) === -1;
				});

				// trigger a change in the search filter
				listPage.find( "input" ).val( "at" ).trigger( "change" );
				listPage.find( "input" ).val( "atw" ).trigger( "change" );

			}
		]);
	});

	asyncTest( "filterCallback can be altered after widget creation", function(){
		var listPage = $( "#search-customfilter-test" );
		expect( listPage.find("li").length );

		$.testHelper.pageSequence( [
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-customfilter-test" );
			},

			function() {
				// set the listview instance callback
				listPage.find( "ul" ).listview( "option", "filterCallback", function() {
					ok( true, "custom callback invoked" );
				});

				// trigger a change in the search filter
				listPage.find( "input" ).val( "foo" ).trigger( "change" );
			}
		]);
	});

	module( "Programmatically generated list items", {
		setup: function(){
			var item,
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

			$( "#programmatically-generated-list-items" ).html("");

			for ( var i = 0, len = data.length; i < len; i++ ) {
				item = $( '<li id="myItem' + data[i].id + '">' );
				label = $( "<strong>" + data[i].label + "</strong>").appendTo( item );
				$( "#programmatically-generated-list-items" ).append( item );
			}
		}
	});

	asyncTest( "Corner styling on programmatically created list items", function() {
		// https://github.com/jquery/jquery-mobile/issues/1470
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( "#programmatically-generated-list" );
			},
			function() {
				ok(!$( "#programmatically-generated-list-items li:first-child" ).hasClass( "ui-corner-bottom" ), "First list item should not have class ui-corner-bottom" );
				start();
			}
		]);
	});

	module("Programmatic list items manipulation");

	asyncTest("Removing list items", 4, function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#removing-items-from-list-test");
			},

			function() {
				var ul = $('#removing-items-from-list-test ul');
				ul.find("li").first().remove();
				equal(ul.find("li").length, 3, "There should be only 3 list items left");

				ul.listview('refresh');
				ok(ul.find("li").first().hasClass("ui-corner-top"), "First list item should have class ui-corner-top");

				ul.find("li").last().remove();
				equal(ul.find("li").length, 2, "There should be only 2 list items left");

				ul.listview('refresh');
				ok(ul.find("li").last().hasClass("ui-corner-bottom"), "Last list item should have class ui-corner-bottom");
				start();
			}
		]);
	});

	module("Rounded corners");

	asyncTest("Top and bottom corners rounded in inset list", 14, function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#corner-rounded-test");
			},

			function() {
				var ul = $('#corner-rounded-test ul');

				for( var t = 0; t<3; t++){
					ul.append("<li>Item " + t + "</li>");
					ul.listview('refresh');
					equal(ul.find(".ui-corner-top").length, 1, "There should be only one element with class ui-corner-top");
					equal(ul.find("li:visible").first()[0], ul.find(".ui-corner-top")[0], "First list item should have class ui-corner-top in list with " + ul.find("li").length + " item(s)");
					equal(ul.find(".ui-corner-bottom").length, 1, "There should be only one element with class ui-corner-bottom");
					equal(ul.find("li:visible").last()[0], ul.find(".ui-corner-bottom")[0], "Last list item should have class ui-corner-bottom in list with " + ul.find("li").length + " item(s)");
				}

				ul.find( "li" ).first().hide();
				ul.listview( "refresh" );
				equal(ul.find("li:visible").first()[0], ul.find(".ui-corner-top")[0], "First visible list item should have class ui-corner-top");

				ul.find( "li" ).last().hide();
				ul.listview( "refresh" );
				equal(ul.find("li:visible").last()[0], ul.find(".ui-corner-bottom")[0], "Last visible list item should have class ui-corner-bottom");

				start();
			}
		]);
	});

	test( "Listview will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-listview").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-listview").length, "enhancements applied" );
	});

	module( "Cached Linked List" );

	var findNestedPages = function(selector){
		return $( selector + " #topmost" ).listview( 'childPages' );
	};

	asyncTest( "nested pages are removed from the dom by default", function(){
		$.testHelper.pageSequence([
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function(){
				$.mobile.changePage( "cache-tests/uncached-nested.html" );
			},

			function(){
				ok( findNestedPages( "#uncached-nested-list" ).length > 0, "verify that there are nested pages" );
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "cache-tests/clear.html" );
			},

			function(){
				deepEqual( findNestedPages( "#uncached-nested-list" ).length, 0 );
				start();
			}
		]);
	});

	asyncTest( "nested pages preserved when parent page is cached", function(){

		$.testHelper.pageSequence([
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function(){
				$.mobile.changePage( "cache-tests/cached-nested.html" );
			},

			function(){
				ok( findNestedPages( "#cached-nested-list" ).length > 0, "verify that there are nested pages" );
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "cache-tests/clear.html" );
			},

			function(){
				ok( findNestedPages( "#cached-nested-list" ).length > 0, "nested pages remain" );
				start();
			}
		]);
	});

	asyncTest( "parent page is not removed when visiting a sub page", function(){
		$.testHelper.pageSequence([
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function(){
				$.mobile.changePage( "cache-tests/cached-nested.html" );
			},

			function(){
				deepEqual( $("#cached-nested-list").length, 1 );
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "cache-tests/clear.html" );
			},

			function(){
				deepEqual( $("#cached-nested-list").length, 1 );
				start();
			}
		]);
	});

	asyncTest( "nested pages hash key is always in the hash (replaceState)", function(){
		$.testHelper.pageSequence([
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function(){
				// https://github.com/jquery/jquery-mobile/issues/1617
				$.mobile.changePage("#nested-lists-test");
			},

			function(){
				// Click on the link of the third li element
				$('.ui-page-active li:eq(2) a:eq(0)').click();
			},

			function(){
				ok( location.hash.search($.mobile.subPageUrlKey) >= 0 );
				start();
			}
		]);
	});

	asyncTest( "embedded listview page with nested pages is not removed from the dom", function() {
		$.testHelper.pageSequence([
			function() {
				// open the nested list page
				deepEqual( $("div#nested-list-test").length, 1 );
				$( "a#nested-list-test-anchor" ).click();
			},

			function() {
				// go back to the origin page
				window.history.back();
			},

			function() {
				// make sure the page is still in place
				deepEqual( $("div#nested-list-test").length, 1 );
				start();
			}
		]);
	});


	asyncTest( "list inherits theme from parent", function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-theme-inherit");
			},

			function() {
				var theme = $.mobile.activePage.jqmData('theme');
				ok( $.mobile.activePage.find("ul > li").hasClass("ui-btn-up-b"), "theme matches the parent");
				window.history.back();
			},

			start
		]);
	});

	asyncTest( "list filter is inset from prototype options value", function() {
		$.mobile.listview.prototype.options.inset = true;
		$("#list-inset-filter-prototype").page();

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-inset-filter-prototype");
			},

			function( timedOut) {
				ok( !timedOut );
				deepEqual( $.mobile.activePage.find("form.ui-listview-filter-inset").length, 1, "form is inset");
				window.history.back();
			},

			start
		]);
	});

	asyncTest( "list filter is inset from data attr value", function() {
		$.mobile.listview.prototype.options.inset = false;
		$("#list-inset-filter-data-attr").page();

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-inset-filter-data-attr");
			},

			function( timedOut) {
				ok( !timedOut );
				deepEqual( $.mobile.activePage.find("form.ui-listview-filter-inset").length, 1, "form is inset");
				window.history.back();
			},

			start
		]);
	});

	asyncTest( "split list items respect the icon", function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#split-list-icon");
			},

			function() {
				$.mobile.activePage.find("li").each(function(i, elem){
					var $elem = $(elem),
						order = [ "star", "plug", "delete", "plug" ];

					deepEqual( $elem.find("span.ui-icon-" + order[i]).length, 1, "there should be one " + order[i] + " icon" );
				});

				window.history.back();
			},

			start
		]);
	});

	asyncTest( "links in list dividers are ignored", function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-divider-ignore-link");
			},

			function() {
				deepEqual($.mobile.activePage.find("#ignored-link .ui-btn-inner").length, 0, "no buttons in list dividers");

				window.history.back();
			},

			start
		]);
	});

	module( "Borders" );

	asyncTest( "last list item has border-bottom", function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-last-visible-item-border");
			},

			function() {
				deepEqual($.mobile.activePage.find(".listitem").css("border-bottom-width"), "0px", "has no border bottom");
				deepEqual($.mobile.activePage.find("#lastitem").css("border-bottom-width"), "1px", "has border bottom");

				window.history.back();
			},

			start
		]);
	});

	asyncTest( "list inside collapsible content", function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-inside-collapsible-content");
			},

			function() {
				deepEqual($.mobile.activePage.find("#noninsetlastli").css("border-bottom-width"), "0px", "last li non-inset list has no border bottom");
				deepEqual($.mobile.activePage.find("#insetlastli").css("border-bottom-width"), "1px", "last li inset list has border bottom");

				window.history.back();
			},

			start
		]);
	});

})(jQuery);
