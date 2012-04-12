/*
 * mobile init tests
 */
(function($){
	var mobilePage = undefined,
			libName = 'jquery.mobile.init.js',
			coreLib = 'jquery.mobile.core.js',
			extendFn = $.extend,
			originalLoadingMessage = $.mobile.loadingMessage,
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

			// NOTE reset for showPageLoadingMsg/hidePageLoadingMsg tests
			$('.ui-loader').remove();

			// clear the classes added by reloading the init
			$("html").attr('class', '');

			$.mobile.loadingMessage = originalLoadingMessage;
		}
	});

	// NOTE important to use $.fn.one here to make sure library reloads don't fire
	//      the event before the test check below
	$(document).one("mobileinit", function(){
		mobilePage = $.mobile.page;
	});

	// NOTE for the following two tests see index html for the binding
	test( "mobile.page is available when mobile init is fired", function(){
		ok( mobilePage !== undefined, "$.mobile.page is defined" );
	});

	$.testHelper.excludeFileProtocol(function(){
		asyncTest( "loading the init library triggers mobilinit on the document", function(){
			var initFired = false;
			expect( 1 );

			$(window.document).one('mobileinit', function(event){
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
			ok(!$("html").hasClass("ui-mobile"), "html elem doesn't have class ui-mobile");
		});

		test( "enhancments are added when the browser is grade A", function(){
			setGradeA(true);
			$.testHelper.reloadLib(libName);

			ok($("html").hasClass("ui-mobile"), "html elem has class mobile");
		});

		asyncTest( "useFastClick is configurable via mobileinit", function(){
			$(document).one( "mobileinit", function(){
				$.mobile.useFastClick = false;
				start();
			});

			$.testHelper.reloadLib(libName);

			same( $.mobile.useFastClick, false , "fast click is set to false after init" );
			$.mobile.useFastClick = true;
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

			ok(firstPage.parent().hasClass("ui-mobile-viewport"), "first page has viewport");
		});

		test( "mobile page container is the first page's parent", function(){
			expect( 1 );
			$.testHelper.reloadLib(libName);
			var firstPage = findFirstPage();

			same($.mobile.pageContainer[0], firstPage.parent()[0]);
		});

		asyncTest( "hashchange triggered on document ready with single argument: true", function(){
			$.testHelper.sequence([
				function(){
					location.hash = "#foo";
				},

				// delay the bind until the first hashchange
				function(){
					$(window).one("hashchange", function(ev, arg){
						same(arg, true);
						start();
					});
				},

				function(){
					$.testHelper.reloadLib(libName);
				}
			], 1000);
		});

		test( "pages without a data-url attribute have it set to their id", function(){
			same($("#foo").jqmData('url'), "foo");
		});

		test( "pages with a data-url attribute are left with the original value", function(){
			same($("#bar").jqmData('url'), "bak");
		});

		asyncTest( "showPageLoadingMsg doesn't add the dialog to the page when loading message is false", function(){
			expect( 1 );
			$.mobile.loadingMessage = false;
			$.mobile.showPageLoadingMsg();

			setTimeout(function(){
				ok(!$(".ui-loader").length, "no ui-loader element");
				start();
			}, 500);
		});

		asyncTest( "hidePageLoadingMsg doesn't add the dialog to the page when loading message is false", function(){
			expect( 1 );
			$.mobile.loadingMessage = true;
			$.mobile.hidePageLoadingMsg();

			setTimeout(function(){
				same($(".ui-loading").length, 0, "page should not be in the loading state");
				start();
			}, 500);
		});

		asyncTest( "showPageLoadingMsg adds the dialog to the page when loadingMessage is true", function(){
			expect( 1 );
			$.mobile.loadingMessage = true;
			$.mobile.showPageLoadingMsg();

			setTimeout(function(){
				same($(".ui-loading").length, 1, "page should be in the loading state");
				start();
			}, 500);
		});

		asyncTest( "page loading should contain default loading message", function(){
			expect( 1 );
			reloadCoreNSandInit();
			$.mobile.showPageLoadingMsg();

			setTimeout(function(){
				same($(".ui-loader h1").text(), "loading");
				start();
			}, 500);
		});

		asyncTest( "page loading should contain custom loading message", function(){
			$.mobile.loadingMessage = "foo";
			$.testHelper.reloadLib(libName);
			$.mobile.showPageLoadingMsg();

			setTimeout(function(){
				same($(".ui-loader h1").text(), "foo");
				start();
			}, 500);
		});

		asyncTest( "page loading should contain custom loading message when set during runtime", function(){
			$.mobile.loadingMessage = "bar";
			$.mobile.showPageLoadingMsg();

			setTimeout(function(){
				same($(".ui-loader h1").text(), "bar");
				start();
			}, 500);
		});



		// NOTE: the next two tests work on timeouts that assume a page will be created within 2 seconds
		// it'd be great to get these using a more reliable callback or event

		asyncTest( "page does auto-initialize at domready when autoinitialize option is true (default) ", function(){

			$( "<div />", { "data-nstest-role": "page", "id": "autoinit-on" } ).prependTo( "body" )

			$(document).one("mobileinit", function(){
				$.mobile.autoInitializePage = true;
			});

			location.hash = "";

			reloadCoreNSandInit();

			setTimeout(function(){
				same( $( "#autoinit-on.ui-page" ).length, 1 );

				start();
			}, 2000);
		});


		asyncTest( "page does not initialize at domready when autoinitialize option is false ", function(){
			$(document).one("mobileinit", function(){
				$.mobile.autoInitializePage = false;
			});

			$( "<div />", { "data-nstest-role": "page", "id": "autoinit-off" } ).prependTo( "body" )

			location.hash = "";


			reloadCoreNSandInit();

			setTimeout(function(){
				same( $( "#autoinit-off.ui-page" ).length, 0 );

				$(document).bind("mobileinit", function(){
					$.mobile.autoInitializePage = true;
				});

				reloadCoreNSandInit();

				start();
			}, 2000);
		});



	});
})(jQuery);
