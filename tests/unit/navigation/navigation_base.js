/*
 * mobile navigation base tag unit tests
 */
(function($){
	var baseDir = $.mobile.path.parseUrl($("base").attr("href")).directory,
		contentDir = $.mobile.path.makePathAbsolute("../content/", baseDir);

	module('jquery.mobile.navigation.js - base tag', {
		setup: function(){
			if ( location.hash ) {
				stop();
				$(document).one("pagechange", function() {
					start();
				} );
				location.hash = "";
			}
		}
	});

	asyncTest( "can navigate between internal and external pages", function(){
		$.testHelper.pageSequence([
			function(){
				// Navigate from default internal page to another internal page.
				$.testHelper.openPage( "#internal-page-2" );
			},

			function(){
				// Verify that we are on the 2nd internal page.
				$.testHelper.assertUrlLocation({
					push: location.pathname + "#internal-page-2",
					hash: "internal-page-2",
					report: "navigate to internal page"
				});

				// Navigate to a page that is in the base directory. Note that the application
 				// document and this new page are *NOT* in the same directory.
 				$("#internal-page-2 .bp1").click();
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hashOrPush: baseDir + "base-page-1.html",
					report: "navigate from internal page to page in base directory"
				});

				// Navigate to another page in the same directory as the current page.
				$("#base-page-1 .bp2").click();
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hashOrPush: baseDir + "base-page-2.html",
					report: "navigate from base directory page to another base directory page"
				});

				// Navigate to another page in a directory that is the sibling of the base.
				$("#base-page-2 .cp1").click();
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hashOrPush: contentDir + "content-page-1.html",
					report: "navigate from base directory page to a page in a different directory hierarchy"
				});

				// Navigate to another page in a directory that is the sibling of the base.
				$("#content-page-1 .cp2").click();
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hashOrPush: contentDir + "content-page-2.html",
					report: "navigate to another page within the same non-base directory hierarchy"
				});

				// Navigate to an internal page.
				$("#content-page-2 .ip1").click();
			},

			function(){
				// Verify that we are on the expected page.
				// the hash based nav result (hash:) is dictate by the fact that #internal-page-1
				// is the original root page element
				$.testHelper.assertUrlLocation({
					hashOrPush: location.pathname + location.search,
					report: "navigate from a page in a non-base directory to an internal page"
				});

				// Try calling changePage() directly with a relative path.
				$.mobile.changePage("base-page-1.html");
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hashOrPush: baseDir + "base-page-1.html",
					report: "call changePage() with a filename (no path)"
				});

				// Try calling changePage() directly with a relative path.
				$.mobile.changePage("../content/content-page-1.html");
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hashOrPush: contentDir + "content-page-1.html",
					report: "call changePage() with a relative path containing up-level references"
				});

				// Try calling changePage() with an id
				$.mobile.changePage("content-page-2.html");
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hashOrPush: contentDir + "content-page-2.html",
					report: "call changePage() with a relative path should resolve relative to current page"
				});

				// test that an internal page works
				$("a.ip2").click();
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hash:  "internal-page-2",
					push: location.pathname + "#internal-page-2",
					report: "call changePage() with a page id"
				});

				// Try calling changePage() with an id
				$.mobile.changePage("internal-page-1");
			},

			function(){
				// Verify that we are on the expected page.
				$.testHelper.assertUrlLocation({
					hash:  "internal-page-2",
					push: location.pathname + "#internal-page-2",
					report: "calling changePage() with a page id that is not prefixed with '#' should not change page"
				});

				// Previous load should have failed and left us on internal-page-2.
				start();
			}
		]);
	});

	asyncTest( "internal form with no action submits to document URL", function(){
		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.testHelper.openPage( "#internal-no-action-form-page" );
			},

			function(){
				$( "#internal-no-action-form-page form" ).eq( 0 ).submit();
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: location.pathname + "?foo=1&bar=2",
					report: "hash should match document url and not base url"
				});

				start();
			}
		]);
	});

	asyncTest( "external page form with no action submits to external page URL", function(){
		$.testHelper.pageSequence([
			function(){
				// Go to an external page that has a form.
				$("#internal-page-1 .cp1").click();
			},

			function(){
				// Make sure we actually navigated to the external page.
				$.testHelper.assertUrlLocation({
					hashOrPush: contentDir + "content-page-1.html",
					report: "should be on content-page-1.html"
				});

				// Now submit the form in the external page.
				$("#content-page-1 form").eq(0).submit();
			},

			function(){
				$.testHelper.assertUrlLocation({
					hashOrPush: contentDir + "content-page-1.html?foo=1&bar=2",
					report: "hash should match page url and not document url"
				});

				start();
			}]);
	});
})(jQuery);
