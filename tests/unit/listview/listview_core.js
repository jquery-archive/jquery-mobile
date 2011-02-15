/*
 * mobile listview unit tests
 */


// TODO splite out into seperate test files
(function($){
	module('Basic Linked list');

	asyncTest( "The page should enhanced correctly", function(){
		setTimeout(function() {
			ok($('.ui-page-active').length > 0, "ui-page-active added to current page");
			ok($('.ui-page-active [role="option"]').length == 3, "roles added to li elements");
			start();
		}, 100);
	});

	asyncTest( "Slides to the listview page when the li is clicked", function() {
		$('.ui-page-active li').first().click();
		setTimeout(function() {
			ok($('#basic-link-results').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	asyncTest( "Slides back to main page when back button is clicked", function() {
		$('#basic-link-results a:contains("Back")').click();
		setTimeout(function() {
			ok($('#basic-linked-test').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	module('Nested List Test');

	asyncTest( "Changes page to nested list test and enhances", function() {
		location.href = location.href.split('#')[0] + "#nested-list-test";
		setTimeout(function() {
			ok($('#nested-list-test').hasClass('ui-page-active'), "makes nested list test page active");
			ok($('[role="option"]', $('#nested-list-test')).length == 2, 'Adds data role to the two LIs');
			ok($('body > [data-url="nested-list-test&ui-page=More-animals-0"]').length == 1, "Adds first UL to the page");
			ok($('body > [data-url="nested-list-test&ui-page=Groups-of-animals-1"]').length == 1, "Adds second nested UL to the page");
			start();
		}, 1000);
	});

	asyncTest( "change to nested page when the li is clicked", function() {
		$('.ui-page-active li:eq(1)').click();
				setTimeout(function() {
					var $new_page = $('body > [data-url="nested-list-test&ui-page=More-animals-0"]');
					ok($new_page.hasClass('ui-page-active'), 'Makes the nested page the active page.');
					ok($('.ui-listview', $new_page).find(":contains('Rhumba of rattlesnakes')").length == 1, "The current page should have the proper text in the list.");
					ok($('.ui-listview', $new_page).find(":contains('Shoal of Bass')").length == 1, "The current page should have the proper text in the list.");
					start();
				}, 1000);
	});

	asyncTest( "should go back to top level when the back button is clicked", function() {
		$('body > [data-url="nested-list-test&ui-page=More-animals-0"]').find('a:contains("Back")').click();
		setTimeout(function() {
			ok($('#nested-list-test').hasClass('ui-page-active'), 'Transitions back to the parent nested page');
			start();
		}, 1000);
	});

	test( "nested list title should use first text node, regardless of line breaks", function(){
		ok($('#nested-list-test .linebreaknode').text() === "More animals", 'Text should be "More animals"');
	});

	module('Ordered Lists');

	asyncTest( "changes to the numbered list page and enhances it", function() {
		location.href = location.href.split('#')[0] + "#numbered-list-test";
		setTimeout(function() {
			var $new_page = $('#numbered-list-test');
			ok($new_page.hasClass('ui-page-active'), "Makes the new page active when the hash is changed.");
			ok($('[role="option"]', $new_page).length == 3, "There should be three LI that are enhanced");
			ok($('.ui-link-inherit', $new_page).first().text() == "Number 1", "The text of the first LI should be Number 1");
			start();
		}, 1000);
	});

	asyncTest( "changes to number 1 page when the li is clicked", function() {
		$('.ui-page-active li').first().click();
		setTimeout(function() {
			ok($('#numbered-list-results').hasClass('ui-page-active'), "The new numbered page was transitioned correctly.");
			start();
		}, 1000);
	});

	asyncTest( "takes us back to the numbered list when the back button is clicked", function() {
		$('.ui-page-active a:contains("Back")').click();
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
			ok($('[role="option"]', $new_page).length === 4, "There are 4 li that enhanced as role options");
			ok($('li', $new_page).first().text() === "Read", "The first LI has the proper text.");
			start();
		}, 1000);
	});

	asyncTest( "Does not go to new page when an item is clicked", function() {
		$('li', $('#read-only-list-test').first().click());
		setTimeout(function() {
			ok($('.ui-page-active').attr('id') == "read-only-list-test", "Page does not change for read only lists");
			start();
		}, 1000);
	});

	module('Split view list');

	asyncTest( "changes the page to the split view list and enhances it correctly.", function() {
		location.href = location.href.split('#')[0] + "#split-list-test";
		setTimeout(function() {
			var $new_page = $('#split-list-test');
			ok($('[role="option"]', $new_page).length == 3);
			ok($('.ui-li-link-alt', $new_page).length == 3);
			ok($('.ui-link-inherit', $new_page).length == 3);
			start();
		}, 1000);
	});

	asyncTest( "change the page to the split view page 1 when the first link is clicked", function() {
		$('.ui-page-active [role="option"]:eq(0)').click();
		setTimeout(function() {
			ok($('#split-list-link1').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	asyncTest( "Slide back to the parent list view when the back button is clicked", function() {
		$('.ui-page-active a:contains("Back")').click();
		setTimeout(function() {
			ok($('#split-list-test').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	asyncTest( "Clicking on the icon (the second link) should take the user to other a href of this LI", function() {
		$('.ui-page-active .ui-li-link-alt:eq(0)').click();
		setTimeout(function() {
			ok($('#split-list-link2').hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	asyncTest( "Slide back to the parent list view when the back button is clicked", function() {
		$('.ui-page-active a:contains("Back")').click();
		setTimeout(function() {
			ok($('#split-list-test').hasClass('ui-page-active'));
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

	module( "Search Filter", {
		setup: function(){
			location.href = location.href.split('#')[0] + "#search-filter-test";
		}
	});

	asyncTest( "Make the search filter page the actie page and enhance it correctly.", function() {
		setTimeout(function() {
			var $new_page = $('#search-filter-test');
			ok($new_page.find('input').length == 1);
			ok($new_page.hasClass('ui-page-active'));
			start();
		}, 1000);
	});

	asyncTest( "Filter downs results when the user enters information", function() {
		$('.ui-page-active input').val('at');
		$('.ui-page-active input').trigger('change');

		setTimeout(function() {
			same($('.ui-page-active li[style^="display: none;"]').length, 2);
			start();
		}, 1000);
	});

	asyncTest( "Redisplay results when user removes values", function() {
		$('.ui-page-active input').val('a');
		$('.ui-page-active input').trigger('change');
		setTimeout(function() {
			same($('.ui-page-active li[style^="display: none;"]').length, 0);
			start();
		}, 1000);
	});
})(jQuery);