/*
 * mobile init tests
 */
(function($){
	var mobilePage = undefined,
			mobileSelect = undefined,
			metaViewportContentDefault = $.mobile.metaViewportContent,
	    libName = 'jquery.mobile.init.js',
			setGradeA = function(value) { $.mobile.gradeA = function(){ return value; }; },
			extendFn = $.extend;

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

		var findMeta = function(){
				return $("head meta[name='viewport']");
			},
			setViewPortContent = function(){
				$.testHelper.reloadLib( libName );
			};

		test( "meta viewport element not added to head when not defined on mobile", function(){
			$.mobile.metaViewportContent = null;
			findMeta().remove();
			setViewPortContent();
			same( findMeta().length, 0);
		});

		test( "meta viewport element is added to head when defined on mobile and no meta already exists", function(){
			findMeta().remove();
			setViewPortContent();
			same( findMeta().length, 1);
		});

		test( "meta viewport element is not added to head when defined on mobile and a meta already exists", function(){
			findMeta().remove();
			$( '<meta name="viewport" content="width=device-width">').prependTo("head");
			setViewPortContent();
			same( findMeta().length, 1);
		});

		var findFirstPage = function() {
			return $("[data-nstest-role='page']").first();
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
			same($("#foo").mobileData('url'), "foo");
		});

		test( "pages with a data-url attribute are left with the original value", function(){
			same($("#bar").mobileData('url'), "bak");
		});

		asyncTest( "pageLoading doesn't add the dialog to the page when loading message is false", function(){
			$.testHelper.alterExtend({loadingMessage: false});
			$.testHelper.reloadLib(libName);
			$.mobile.pageLoading(false);

			setTimeout(function(){
				ok(!$(".ui-loader").length);
				start();
			}, 500);
		});

		asyncTest( "pageLoading removes the loading class from the page when done is passed as true", function(){
			$.testHelper.alterExtend({loadingMessage: true});
			$.testHelper.reloadLib(libName);
			$.mobile.pageLoading(true);

			setTimeout(function(){
				console.log($(".ui-loading").length);
				same($(".ui-loading").length, 0, "page should not be in the loading state");
				start();
			}, 500);
		});

		var coreLib = 'jquery.mobile.core.js';

		asyncTest( "pageLoading adds the loading class to the page when done is false", function(){
			$.testHelper.alterExtend({loadingMessage: true});
			$.testHelper.reloadLib(coreLib);
			$.mobile.pageLoading(false);

			setTimeout(function(){
				same($(".ui-loading").length, 1, "page should be in the loading state");
				start();
			}, 500);
		});

		asyncTest( "page loading should contain default loading message", function(){
			$.testHelper.reloadLib(coreLib);
			$.mobile.pageLoading(false);

			setTimeout(function(){
				same($(".ui-loader h1").text(), "loading");
				start();
			}, 500);
		});

		asyncTest( "page loading should contain custom loading message", function(){
			$(document).bind('mobileinit', function(){
				$.mobile.loadingMessage = "foo";
			});

			$.testHelper.reloadLib(coreLib);
			$.mobile.pageLoading(false);

			setTimeout(function(){
				same($(".ui-loader h1").text(), "foo");
				start();
			}, 500);
		});
	});
})(jQuery);
