/*
 * mobile init tests
 */
(function($){
	var mobilePage = undefined,
	    	libName = 'jquery.mobile.init.js',
			coreLib = 'jquery.mobile.core.js',
			extendFn = $.extend,
			setGradeA = function(value) { $.mobile.gradeA = function(){ return value; }; },
			reloadCoreNSandInit = function(){
				$.testHelper.reloadLib(coreLib);
				$.testHelper.reloadLib("jquery.setNamespace.js");
				$.testHelper.reloadLib(libName);
			};


	module(libName, {
		setup: function(){
			// NOTE reset for gradeA tests
			$('html').removeClass('ui-mobile');

			// TODO add post reload callback
			$('.ui-loader').remove();
		},
		teardown: function(){
			$.extend = extendFn;

			// NOTE reset for pageLoading tests
			$('.ui-loader').remove();

			// reset meta view port content
			$.mobile.metaViewportContent = metaViewportContentDefault;
		}
	});

	// NOTE important to use $.fn.one here to make sure library reloads don't fire
	//      the event before the test check below
	$(document).one("mobileinit", function(){
		mobilePage = $.mobile.page;
	});

	// NOTE for the following two tests see index html for the binding
	test( "mobile.page is available when mobile init is fired", function(){
		ok(mobilePage !== undefined, "$.mobile.page is defined");
	});

	$.testHelper.excludeFileProtocol(function(){
		asyncTest( "loading the init library triggers mobilinit on the document", function(){
			var initFired = false;
			expect( 1 );

			$(window.document).bind('mobileinit', function(event){
				initFired = true;
			});

			$.testHelper.reloadLib(libName);

			setTimeout(function(){
				ok(initFired, "init fired");
				start();
			}, 1000);
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

		

		var findFirstPage = function() {
			return $(":jqmData(role='page')").first();
		};

		test( "active page and start page should be set to the fist page in the selected set", function(){
			expect( 2 );
			$.testHelper.reloadLib(libName);
			var firstPage = findFirstPage();

			same($.mobile.firstPage[0], firstPage[0]);
			same($.mobile.activePage[0], firstPage[0]);
		});

		test( "mobile viewport class is defined on the first page's parent", function(){
			expect( 1 );
			$.testHelper.reloadLib(libName);
			var firstPage = findFirstPage();

			ok(firstPage.parent().hasClass('ui-mobile-viewport'));
		});

		test( "mobile page container is the first page's parent", function(){
			expect( 1 );
			$.testHelper.reloadLib(libName);
			var firstPage = findFirstPage();

			same($.mobile.pageContainer[0], firstPage.parent()[0]);
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
			same($("#foo").jqmData('url'), "foo");
		});

		test( "pages with a data-url attribute are left with the original value", function(){
			same($("#bar").jqmData('url'), "bak");
		});

		asyncTest( "pageLoading doesn't add the dialog to the page when loading message is false", function(){
			$.mobile.loadingMessage = false;
			$.mobile.pageLoading(false);

			setTimeout(function(){
				ok(!$(".ui-loader").length);
				start();
			}, 500);
		});

		asyncTest( "pageLoading doesn't add the dialog to the page when done is passed as true", function(){
			$.mobile.loadingMessage = true;
			$.mobile.pageLoading(true);

			setTimeout(function(){
				same($(".ui-loading").length, 0, "page should not be in the loading state");
				start();
			}, 500);
		});

		asyncTest( "pageLoading adds the dialog to the page when done is true", function(){
			$.mobile.loadingMessage = true;
			$.mobile.pageLoading(false);

			setTimeout(function(){
				same($(".ui-loading").length, 1, "page should be in the loading state");
				start();
			}, 500);
		});

		asyncTest( "page loading should contain default loading message", function(){
			reloadCoreNSandInit();
			$.mobile.pageLoading(false);

			setTimeout(function(){
				same($(".ui-loader h1").text(), "loading");
				start();
			}, 500);
		});

		asyncTest( "page loading should contain custom loading message", function(){
			$.mobile.loadingMessage = "foo";
			$.testHelper.reloadLib(libName);
			$.mobile.pageLoading(false);

			setTimeout(function(){
				same($(".ui-loader h1").text(), "foo");
				start();
			}, 500);
		});
	});
})(jQuery);
