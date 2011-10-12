/*
 * mobile listview unit tests
 */

// TODO split out into seperate test files
(function($){
  var home = $.mobile.path.parseUrl( location.href ).pathname;

	$.mobile.defaultTransition = "none";

	module( "Basic Linked list", {
		setup: function(){
			$.testHelper.openPage( "#basic-linked-test" );
		}
	});

	asyncTest( "The page should enhanced correctly", function(){
		setTimeout(function() {
			ok($('#basic-linked-test .ui-li').length, ".ui-li classes added to li elements");
			start();
		}, 800);
	});

	asyncTest( "Slides to the listview page when the li a is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#basic-linked-test");
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
				$.testHelper.openPage("#basic-link-results");
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
				$.testHelper.openPage( "#ui-li-has-test" );
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

	module('Nested List Test');

	asyncTest( "Changes page to nested list test and enhances", function() {
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#nested-list-test");
			},

			function(){
				ok($('#nested-list-test').hasClass('ui-page-active'), "makes nested list test page active");
				ok($(':jqmData(url="nested-list-test&ui-page=0-0")').length == 1, "Adds first UL to the page");
				ok($(':jqmData(url="nested-list-test&ui-page=0-1")').length == 1, "Adds second nested UL to the page");
				start();
			}
		]);
	});

	asyncTest( "change to nested page when the li a is clicked", function() {

		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#nested-list-test");
			},

			function(){
				$('.ui-page-active li:eq(1) a:eq(0)').click();
			},

			function(){
				var $new_page = $(':jqmData(url="nested-list-test&ui-page=0-0")');

				ok($new_page.hasClass('ui-page-active'), 'Makes the nested page the active page.');
				ok($('.ui-listview', $new_page).find(":contains('Rhumba of rattlesnakes')").length == 1, "The current page should have the proper text in the list.");
				ok($('.ui-listview', $new_page).find(":contains('Shoal of Bass')").length == 1, "The current page should have the proper text in the list.");
				start();
			}
		]);
	});

	asyncTest( "should go back to top level when the back button is clicked", function() {
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#nested-list-test&ui-page=0-0");
			},

			function(){
				window.history.back();
			},

			function(){
				ok($('#nested-list-test').hasClass('ui-page-active'), 'Transitions back to the parent nested page');
				start();
			}
		]);
	});

	test( "nested list title should use first text node, regardless of line breaks", function(){
		ok($('#nested-list-test .linebreaknode').text() === "More animals", 'Text should be "More animals"');
	});

	asyncTest( "Multiple nested lists on a page with same labels", function() {
		$.testHelper.pageSequence([
			function(){
				// https://github.com/jquery/jquery-mobile/issues/1617
				$.testHelper.openPage("#nested-lists-test");
			},

			function(){
				// Click on the link of the third li element
				$('.ui-page-active li:eq(2) a:eq(0)').click();
			},

			function(){
				equal($('.ui-page-active .ui-content .ui-listview li').text(), "Item A-3-0Item A-3-1Item A-3-2", 'Text should be "Item A-3-0Item A-3-1Item A-3-2"');
				start();
			}
		]);
	});

	module('Ordered Lists');

	asyncTest( "changes to the numbered list page and enhances it", function() {
		$.testHelper.pageSequence([
			function(){
				$.testHelper.openPage("#numbered-list-test");
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
				$.testHelper.openPage('#numbered-list-test');
			},

			function(){
				$.testHelper.openPage('#numbered-list-results');
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
				$.testHelper.openPage("#read-only-list-test");
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
				$.testHelper.openPage("#split-list-test");
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
				$.testHelper.openPage("#split-list-test");
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
				$.testHelper.openPage("#split-list-test");
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
				$.testHelper.openPage("#split-list-test");
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
				$.testHelper.openPage("#list-divider-test");
			},

			function(){
				var $new_page = $('#list-divider-test');
				ok($new_page.find('.ui-li-divider').length == 2);
				ok($new_page.hasClass('ui-page-active'));
				start();
			}
		]);
	});

	module( "Search Filter");

	var searchFilterId = "#search-filter-test";


	asyncTest( "Filter downs results when the user enters information", function() {
		var $searchPage = $(searchFilterId);
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage(searchFilterId);
			},

			function() {
				$searchPage.find('input').val('at');
				$searchPage.find('input').trigger('change');

				setTimeout(function() {
					same($searchPage.find('li.ui-screen-hidden').length, 2);
					start();
				}, 1000);
			}
		]);
	});

	asyncTest( "Redisplay results when user removes values", function() {
		var $searchPage = $(searchFilterId);
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage(searchFilterId);
			},

			function() {
				$searchPage.find('input').val('a');
				$searchPage.find('input').trigger('change');

				setTimeout(function() {
					same($searchPage.find("li[style^='display: none;']").length, 0);
					start();
				}, 1000);
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
				$.testHelper.openPage("#search-filter-with-dividers-test");
			},

			// wait for the page to become active/enhanced
			function(){
				$searchPage.find('input').val('at');
				$searchPage.find('input').trigger('change');
				setTimeout(function() {
					//there should be four hidden list entries
					same($searchPage.find('li.ui-screen-hidden').length, 4);

					//there should be two list entries that are list dividers and hidden
					same($searchPage.find('li.ui-screen-hidden:jqmData(role=list-divider)').length, 2);

					//there should be two list entries that are not list dividers and hidden
					same($searchPage.find('li.ui-screen-hidden:not(:jqmData(role=list-divider))').length, 2);
					start();
				}, 1000);
			}
		]);
	});

	asyncTest( "Redisplay results when user removes values", function() {
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage("#search-filter-with-dividers-test");
			},

			function() {
				$('.ui-page-active input').val('a');
				$('.ui-page-active input').trigger('change');

				setTimeout(function() {
					same($('.ui-page-active input').val(), 'a');
					same($('.ui-page-active li[style^="display: none;"]').length, 0);
					start();
				}, 1000);
			}
		]);
	});

	asyncTest( "Dividers are hidden when preceding hidden rows and shown when preceding shown rows", function () {
		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage("#search-filter-with-dividers-test");
			},

			function() {
				var $page = $('.ui-page-active');

				$page.find('input').val('at');
				$page.find('input').trigger('change');

				setTimeout(function() {
					same($page.find('li:jqmData(role=list-divider):hidden').length, 2);
					same($page.find('li:jqmData(role=list-divider):hidden + li:not(:jqmData(role=list-divider)):hidden').length, 2);
					same($page.find('li:jqmData(role=list-divider):not(:hidden) + li:not(:jqmData(role=list-divider)):not([:hidden)').length, 2);
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
		}

		$.testHelper.pageSequence([
			function() {
				$.testHelper.openPage("#search-filter-inset-test");
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
				$.testHelper.openPage( "#programmatically-generated-list" );
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
				$.testHelper.openPage("#removing-items-from-list-test");
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
				$.testHelper.openPage("#corner-rounded-test");
			},

			function() {
				var ul = $('#corner-rounded-test ul');

				for( var t = 0; t<3; t++){
					ul.append("<li>Item " + t + "</li>");
					ul.listview('refresh');
					equals(ul.find(".ui-corner-top").length, 1, "There should be only one element with class ui-corner-top");
					equals(ul.find("li:visible").first()[0], ul.find(".ui-corner-top")[0], "First list item should have class ui-corner-top in list with " + ul.find("li").length + " item(s)");
					equals(ul.find(".ui-corner-bottom").length, 1, "There should be only one element with class ui-corner-bottom");
					equals(ul.find("li:visible").last()[0], ul.find(".ui-corner-bottom")[0], "Last list item should have class ui-corner-bottom in list with " + ul.find("li").length + " item(s)");
				}

				ul.find( "li" ).first().hide();
				ul.listview( "refresh" );
				equals(ul.find("li:visible").first()[0], ul.find(".ui-corner-top")[0], "First visible list item should have class ui-corner-top");

				ul.find( "li" ).last().hide();
				ul.listview( "refresh" );
				equals(ul.find("li:visible").last()[0], ul.find(".ui-corner-bottom")[0], "Last visible list item should have class ui-corner-bottom");

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
				$.testHelper.openPage( "#" + home );
			},

			function(){
				$.testHelper.openPage( "#cache-tests/uncached-nested.html" );
			},

			function(){
				ok( findNestedPages( "#uncached-nested-list" ).length > 0, "verify that there are nested pages" );
				$.testHelper.openPage( "#" + home );
			},

			function() {
				$.testHelper.openPage( "#cache-tests/clear.html" );
			},

			function(){
				same( findNestedPages( "#uncached-nested-list" ).length, 0 );
				start();
			}
		]);
	});

	asyncTest( "nested pages preserved when parent page is cached", function(){

		$.testHelper.pageSequence([
			function(){
				//reset for relative url refs
				$.testHelper.openPage( "#" + home );
			},

			function(){
				$.testHelper.openPage( "#cache-tests/cached-nested.html" );
			},

			function(){
				ok( findNestedPages( "#cached-nested-list" ).length > 0, "verify that there are nested pages" );
				$.testHelper.openPage( "#" + home );
			},

			function() {
				$.testHelper.openPage( "#cache-tests/clear.html" );
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
				$.testHelper.openPage( "#" + home );
			},

			function(){
				$.testHelper.openPage( "#cache-tests/cached-nested.html" );
			},

			function(){
				same( $("#cached-nested-list").length, 1 );
				$.testHelper.openPage( "#" + home );
			},

			function() {
				$.testHelper.openPage( "#cache-tests/clear.html" );
			},

			function(){
				same( $("#cached-nested-list").length, 1 );
				start();
			}
		]);
	});

	asyncTest( "filterCallback can be altered after widget creation", function(){
		var listPage = $( "#search-filter-test" );
		expect( listPage.find("li").length );

		$.testHelper.pageSequence( [
			function(){
				//reset for relative url refs
				$.testHelper.openPage( "#" + home );
			},

			function() {
				$.testHelper.openPage( "#search-filter-test" );
			},

			function() {
				// set the listview instance callback
				listPage.find( "ul" ).listview( "option", "filterCallback", function() {
					ok(true, "custom callback invoked");
				});

				// trigger a change in the search filter
				listPage.find( "input" ).val( "foo" ).trigger( "change" );

				//NOTE beware a poossible issue with timing here
				start();
			}
		]);
	});

	asyncTest( "nested pages hash key is always in the hash (replaceState)", function(){
		$.testHelper.pageSequence([
			function(){
				//reset for relative url refs
				$.testHelper.openPage( "#" + home );
			},

			function(){
				// https://github.com/jquery/jquery-mobile/issues/1617
				$.testHelper.openPage("#nested-lists-test");
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
				same( $("div#nested-list-test").length, 1 );
				$( "a#nested-list-test-anchor" ).click();
			},

			function() {
				// go back to the origin page
				window.history.back();
			},

			function() {
				// make sure the page is still in place
				same( $("div#nested-list-test").length, 1 );
				start();
			}
		]);
	});
})(jQuery);
