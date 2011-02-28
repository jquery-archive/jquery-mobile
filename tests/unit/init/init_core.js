/*
 * mobile init tests
 */
(function($){
	var mobilePage = undefined, mobileSelect = undefined,
	    libName = 'jquery.mobile.init.js',
			setGradeA = function(value) { $.mobile.gradeA = function(){ return value; }; },
			extendFn = $.extend;

	module(libName, {
		setup: function(){
			// NOTE reset for gradeA tests
			$('html').removeClass('ui-mobile');
		},
		teardown: function(){
			$.extend = extendFn;
		}
	});

	// NOTE important to use $.fn.one here to make sure library reloads don't fire
	//      the event before the test check below
	$(document).one("mobileinit", function(){
		mobilePage = $.mobile.page;
		mobileSelect = $.mobile.selectmenu;
	});

	test( "mobile.page is available when mobile init is fired", function(){
		ok(mobilePage !== undefined, "$.mobile.page is defined");
	});

	test( "mobile.selectmenu is available when mobile init is fired", function(){
		ok(mobileSelect !== undefined, "$.mobile.selectmenu is defined");
	});

	$.testHelper.excludeFileProtocol(function(){
		test( "loading the init library triggers mobilinit on the document", function(){
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

		var metaViewportSelector = "head meta[name=viewport]",
				setViewPortContent = function(value){
					$(metaViewportSelector).remove();
					$.mobile.metaViewportContent = value;
					$.testHelper.reloadLib( libName );
				};

		test( "meta view port element not added to head when not defined on mobile", function(){
			setViewPortContent(false);
			same($(metaViewportSelector).length, 0);
		});

		test( "meta view port element is added to head when defined on mobile", function(){
			setViewPortContent("width=device-width");
			same($(metaViewportSelector).length, 1);
		});

				var findFirstPage = function() {
			return $("[data-role='page']").first();
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

		test( "pages without a data-url attribute have it set to their id", function(){
			same($("#foo").data('url'), "foo");
		});

		test( "pages with a data-url attribute are left with the original value", function(){
			same($("#bar").data('url'), "bak");
		});
	});
})(jQuery);
