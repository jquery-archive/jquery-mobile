/*
 * mobile listview unit tests
 */
(function($) {
	module('Nested List Test', {
		setup: function() {
			// ensure that the nested pages are generated
			stop();
			$.testHelper.pageSequence([
				function(){
					$.mobile.changePage("#nested-list-test");
				},

				function() {
					window.history.back();
				},

				start
			]);
		}
	});

	asyncTest( "Changes page to nested list test and enhances", function() {
		$.testHelper.pageSequence([
			function(){
				$.mobile.changePage("#nested-list-test");
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
				$.mobile.changePage("#nested-list-test");
			},

			function(){
				$('.ui-page-active li:eq(1) a:eq(0)').click();
			},

			function(){
				var $new_page = $(':jqmData(url*="ui-page=0-0")');

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
				$.mobile.changePage("#nested-list-test");
			},

			function(){
				$.mobile.changePage("#nested-list-test&ui-page=0-0");
			},

			function(){
				window.history.back();
			},

			function( timeout ){
				ok($.mobile.activePage.is('#nested-list-test'), 'Transitions back to the parent nested page');
				start();
			}
		]);
	});

	test( "nested list title should use first text node, regardless of line breaks", function(){
		deepEqual($(":jqmData(url='nested-list-test&ui-page=0-0') .ui-title").text(), "More animals", 'Text should be "More animals"');
	});

	asyncTest( "Multiple nested lists on a page with same labels", function() {
		$.testHelper.pageSequence([
			function(){
				// https://github.com/jquery/jquery-mobile/issues/1617
				$.mobile.changePage("#nested-lists-test");
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
})( jQuery );