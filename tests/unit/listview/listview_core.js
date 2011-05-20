/*
 * mobile listview unit tests
 */

// TODO split out into seperate test files
(function($){
	$.mobile.defaultTransition = "none";
	module('Basic Linked list', {
		setup: function(){
			$.testHelper.openPage("#basic-linked-test");
		}
	});

	asyncTest( "The page should enhanced correctly", function(){
		setTimeout(function() {
			ok($('#basic-linked-test .ui-li').length, ".ui-li classes added to li elements");
			start();
		}, 500);
	});

	asyncTest( "Slides to the listview page when the li a is clicked", function() {
		$.testHelper.openPage("#basic-linked-test");

		setTimeout(function(){
			$('#basic-linked-test li a').first().click();
		}, 500);

		setTimeout(function() {
			ok($('#basic-link-results').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	asyncTest( "Slides back to main page when back button is clicked", function() {
		$.testHelper.openPage("#basic-link-results");

		window.history.back();

		setTimeout(function() {
			ok($('#basic-linked-test').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	module('Nested List Test');

	asyncTest( "Changes page to nested list test and enhances", function() {
		$.testHelper.openPage("#nested-list-test");
		setTimeout(function() {
			ok($('#nested-list-test').hasClass('ui-page-active'), "makes nested list test page active");
			ok($(':jqmData(url="nested-list-test&ui-page=More-animals-0")').length == 1, "Adds first UL to the page");
			ok($(':jqmData(url="nested-list-test&ui-page=Groups-of-animals-1")').length == 1, "Adds second nested UL to the page");
			start();
		}, 1000);
	});

	asyncTest( "change to nested page when the li a is clicked", function() {
		$.testHelper.openPage("#nested-list-test");
		$('.ui-page-active li:eq(1) a:eq(0)').click();
		setTimeout(function() {
			var $new_page = $(':jqmData(url="nested-list-test&ui-page=More-animals-0")');

			ok($new_page.hasClass('ui-page-active'), 'Makes the nested page the active page.');
			ok($('.ui-listview', $new_page).find(":contains('Rhumba of rattlesnakes')").length == 1, "The current page should have the proper text in the list.");
			ok($('.ui-listview', $new_page).find(":contains('Shoal of Bass')").length == 1, "The current page should have the proper text in the list.");
			start();
		}, 1000);
	});

	asyncTest( "should go back to top level when the back button is clicked", function() {
		$.testHelper.openPage("#nested-list-test&ui-page=More-animals-0");
		window.history.back();

		setTimeout(function() {
			ok($('#nested-list-test').hasClass('ui-page-active'), 'Transitions back to the parent nested page');
			start();
		}, 1000);
	});

	test( "nested list title should use first text node, regardless of line breaks", function(){
		ok($('#nested-list-test .linebreaknode').text() === "More animals", 'Text should be "More animals"');
	});

	asyncTest( "Multiple nested lists on a page", function() {
        // https://github.com/jquery/jquery-mobile/issues/1617
		$.testHelper.openPage("#nested-lists-test");

		setTimeout(function() {
            $('.ui-page-active li:eq(2) a:eq(0)').click();

            equal($('.ui-page-active .ui-content .ui-listview li').text(), "Sub Item 10Sub Item 11Sub Item 12", 'Text should be "Sub Item 10Sub Item 11Sub Item 12"');
			start();
		}, 500);
	});

	module('Ordered Lists');

	asyncTest( "changes to the numbered list page and enhances it", function() {
		location.href = location.href.split('#')[0] + "#numbered-list-test";
		setTimeout(function() {
			var $new_page = $('#numbered-list-test');
			ok($new_page.hasClass('ui-page-active'), "Makes the new page active when the hash is changed.");
			ok($('.ui-link-inherit', $new_page).first().text() == "Number 1", "The text of the first LI should be Number 1");
			start();
		}, 1000);
	});

	asyncTest( "changes to number 1 page when the li a is clicked", function() {
		$('#numbered-list-test li a').first().click();
		setTimeout(function() {
			ok($('#numbered-list-results').hasClass('ui-page-active'), "The new numbered page was transitioned correctly.");
			start();
		}, 1000);
	});

	asyncTest( "takes us back to the numbered list when the back button is clicked", function() {
		$.testHelper.openPage('#numbered-list-test')
		$.testHelper.openPage('#numbered-list-results')
		window.history.back();
		setTimeout(function() {
			ok($('#numbered-list-test').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	module('Read only list');

	asyncTest( "changes to the read only page when hash is changed", function() {
		location.href = location.href.split('#')[0] + "#read-only-list-test";
		setTimeout(function() {
			var $new_page = $('#read-only-list-test');
			ok($new_page.hasClass('ui-page-active'), "makes the read only page the active page");
			ok($('li', $new_page).first().text() === "Read", "The first LI has the proper text.");
			start();
		}, 1000);
	});

	module('Split view list');

	asyncTest( "changes the page to the split view list and enhances it correctly.", function() {
		$.testHelper.openPage("#split-list-test");

		setTimeout(function() {
			var $new_page = $('#split-list-test');
			ok($('.ui-li-link-alt', $new_page).length == 3);
			ok($('.ui-link-inherit', $new_page).length == 3);
			start();
		}, 1000);
	});

	asyncTest( "change the page to the split view page 1 when the first link is clicked", function() {
		$.testHelper.openPage("#split-list-test");

		setTimeout(function(){
			$('.ui-page-active .ui-li a:eq(0)').click();
		}, 500);

		setTimeout(function() {
			ok($('#split-list-link1').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	asyncTest( "Slide back to the parent list view when the back button is clicked", function() {
		$.testHelper.openPage("#split-list-test");

		$.testHelper.sequence([
			function(){
				$('.ui-page-active .ui-listview a:eq(0)').click();
			},

			function(){
				history.back();
			},

			function() {
				ok($('#split-list-test').hasClass('ui-page-active'));
				start();
			}
		], 1000);
	});

	asyncTest( "Clicking on the icon (the second link) should take the user to other a href of this LI", function() {
		$.testHelper.openPage("#split-list-test");

		setTimeout(function(){
			$('.ui-page-active .ui-li-link-alt:eq(0)').click();
		}, 500);

		setTimeout(function() {
			ok($('#split-list-link2').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	module( "List Dividers" );

	asyncTest( "Makes the list divider page the active page and enhances it correctly.", function() {
		location.href = location.href.split('#')[0] + "#list-divider-test";
		setTimeout(function() {
			var $new_page = $('#list-divider-test');
			ok($new_page.find('.ui-li-divider').length == 2);
			ok($new_page.hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	module( "Search Filter");

	var searchFilterId = "#search-filter-test";


	asyncTest( "Filter downs results when the user enters information", function() {
		var $searchPage = $(searchFilterId);
		$.testHelper.openPage(searchFilterId);

		setTimeout(function(){
			$searchPage.find('input').val('at');
			$searchPage.find('input').trigger('change');
		}, 500);

		setTimeout(function() {
			same($searchPage.find('li.ui-screen-hidden').length, 2);
			start();
		}, 1000);
	});

	asyncTest( "Redisplay results when user removes values", function() {
		var $searchPage = $(searchFilterId);
		$.testHelper.openPage(searchFilterId);

		setTimeout(function(){
			$searchPage.find('input').val('a');
			$searchPage.find('input').trigger('change');
		}, 500);

		setTimeout(function() {
			same($searchPage.find("li[style^='display: none;']").length, 0);
			start();
		}, 1000);
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
		$.testHelper.openPage("#search-filter-with-dividers-test");

		// wait for the page to become active/enhanced
		setTimeout(function(){
			$searchPage.find('input').val('at');
			$searchPage.find('input').trigger('change');
		}, 500);

		setTimeout(function() {
			//there should be four hidden list entries
			same($searchPage.find('li.ui-screen-hidden').length, 4);

			//there should be two list entries that are list dividers and hidden
			same($searchPage.find('li.ui-screen-hidden:jqmData(role=list-divider)').length, 2);

			//there should be two list entries that are not list dividers and hidden
			same($searchPage.find('li.ui-screen-hidden:not(:jqmData(role=list-divider))').length, 2);
			start();
		}, 1000);
	});

	asyncTest( "Redisplay results when user removes values", function() {
		$.testHelper.openPage("#search-filter-with-dividers-test");

		// wait for the page to become active/enhanced
		setTimeout(function(){
			$('.ui-page-active input').val('a');
			$('.ui-page-active input').trigger('change');
		}, 500);

		setTimeout(function() {
			same($('.ui-page-active input').val(), 'a');
			same($('.ui-page-active li[style^="display: none;"]').length, 0);
			start();
		}, 1000);
	});

	asyncTest( "Dividers are hidden when preceding hidden rows and shown when preceding shown rows", function () {
		$.testHelper.openPage("#search-filter-with-dividers-test");
		var $page = $('.ui-page-active');

		// wait for the page to become active/enhanced
		setTimeout(function(){
			$page.find('input').val('at');
			$page.find('input').trigger('change');
		}, 500);

		setTimeout(function() {
			same($page.find('li:jqmData(role=list-divider):hidden').length, 2);
			same($page.find('li:jqmData(role=list-divider):hidden + li:not(:jqmData(role=list-divider)):hidden').length, 2);
			same($page.find('li:jqmData(role=list-divider):not(:hidden) + li:not(:jqmData(role=list-divider)):not([:hidden)').length, 2);
			start();
		}, 1000);
	});

})(jQuery);