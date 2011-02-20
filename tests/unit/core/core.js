/*
 * mobile core unit tests
 */

(function($){
	var libName = "jquery.mobile.core.js",
			setGradeA = function(value) { $.support.mediaquery = value; },
			extendFn = $.extend;

	module(libName, {
		setup: function(){
			// NOTE reset for gradeA tests
			$('html').removeClass('ui-mobile');

			// NOTE reset for pageLoading tests
			$('.ui-loader').remove();
		},
		teardown: function(){
			$.extend = extendFn;
		}
	});

	$.testHelper.excludeFileProtocol(function(){
		test( "grade A browser support media queries", function(){
			setGradeA(false);
			$.testHelper.reloadLib(libName);
			ok(!$.mobile.gradeA());

			setGradeA(true);
			$.testHelper.reloadLib(libName);
			ok($.mobile.gradeA());
		});

		test( "loading the core library triggers mobilinit on the document", function(){
			expect( 1 );

			$(window.document).bind('mobileinit', function(event){
				ok(true);
			});

			$.testHelper.reloadLib(libName);
		});

		test( "enhancments are skipped when the browser is not grade A", function(){
			setGradeA(false);
			$.testHelper.reloadLib(libName);

			//NOTE easiest way to check for enhancements, not the most obvious
			ok(!$("html").hasClass("ui-mobile"));
		});

		test( "enhancments are added when the browser is grade A", function(){
			setGradeA(true);
			$.testHelper.reloadLib(libName);

			ok($("html").hasClass("ui-mobile"));
		});


		//TODO lots of duplication
		test( "pageLoading doesn't add the dialog to the page when loading message is false", function(){
			$.testHelper.alterExtend({loadingMessage: false});
			$.testHelper.reloadLib(libName);
			$.mobile.pageLoading(false);
			ok(!$(".ui-loader").length);
		});

		test( "pageLoading doesn't add the dialog to the page when done is passed as true", function(){
			$.testHelper.alterExtend({loadingMessage: true});
			$.testHelper.reloadLib(libName);

			// TODO add post reload callback
			$('.ui-loader').remove();

			$.mobile.pageLoading(true);
			ok(!$(".ui-loader").length);
		});

		test( "pageLoading adds the dialog to the page when done is true", function(){
			$.testHelper.alterExtend({loadingMessage: true});
			$.testHelper.reloadLib(libName);
			$.mobile.pageLoading(false);
			ok($(".ui-loader").length);
		});

				var metaViewportSelector = "head meta[name=viewport]",
		setViewPortContent = function(value){
			$(metaViewportSelector).remove();
			$.testHelper.alterExtend({metaViewportContent: value});
			$.testHelper.reloadLib(libName);
		};

		test( "meta view port element is added to head when defined on mobile", function(){
			setViewPortContent("width=device-width");
			same($(metaViewportSelector).length, 1);
		});

		test( "meta view port element not added to head when not defined on mobile", function(){
			setViewPortContent(false);
			same($(metaViewportSelector).length, 0);
		});

		var findFirstPage = function() {
			return $("[ data-"+ $.mobile.ns +"-role='page']").first();
		};

		test( "active page and start page should be set to the fist page in the selected set", function(){
			var firstPage = findFirstPage();
			$.testHelper.reloadLib(libName);

			same($.mobile.firstPage, firstPage);
			same($.mobile.activePage, firstPage);
		});

		test( "mobile viewport class is defined on the first page's parent", function(){
			var firstPage = findFirstPage();
			$.testHelper.reloadLib(libName);

			ok(firstPage.parent().hasClass('ui-mobile-viewport'));
		});

		test( "mobile page container is the first page's parent", function(){
			var firstPage = findFirstPage();
			$.testHelper.reloadLib(libName);

			same($.mobile.pageContainer, firstPage.parent());
		});

		test( "page loading is called on document ready", function(){
			$.testHelper.alterExtend({ pageLoading: function(){
				start();
				ok("called");
			}});

			stop();
			$.testHelper.reloadLib(libName);
		});

		test( "hashchange triggered on document ready with single argument: true", function(){
			$(window).bind("hashchange", function(ev, arg){
				same(arg, true);
				start();
			});

			stop();
			$.testHelper.reloadLib(libName);
		});
	});
})(jQuery);