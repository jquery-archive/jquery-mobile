/*
 * mobile init tests
 */
define([
	"jquery",
	"jquery.mobile",
	"./shared",
	"./prepare"
], function( $, jqm, shared ){
	require( [
		"init"
	], function() {
		var libName = 'init',
			coreLib = 'core',
			extendFn = $.extend,
			setGradeA = function(value) { $.mobile.gradeA = function(){ return value; }; },
			reloadCoreNSandInit = function(){
				$.testHelper.reloadLib("jquery.setNameSpace.js");
				return $.when( $.testHelper.reloadModule( coreLib ), $.testHelper.reloadModule( libName ));
			};


	module(libName, {
		setup: function(){
			$.mobile.ns = ns;
			// NOTE reset for gradeA tests
			$('html').removeClass('ui-mobile');
		},

		teardown: function(){
			$.extend = extendFn;

			// clear the classes added by reloading the init
			$("html").attr('class', '');
		}
	});

	// NOTE important to use $.fn.one here to make sure library reloads don't fire
	//      the event before the test check below
	$(document).one( "mobileinit", function(){
		ns = $.mobile.ns;
		mobilePage = $.mobile.page;

		$.mobile.loader.prototype.options.text = "mobileinit";
		$.mobile.loader.prototype.options.textVisible = true;
	});

	// NOTE for the following two tests see index html for the binding
	test( "mobile.page is available when mobile init is fired", function(){
		ok( mobilePage !== undefined, "$.mobile.page is defined" );
	});

				$.testHelper.reloadModule( libName ).then(function() {
					ok(initFired, "init fired");
				}).then( start );
			});

			asyncTest( "enhancements are skipped when the browser is not grade A", function(){
				setGradeA(false);
				$.testHelper.reloadModule( libName ).then(function() {
					//NOTE easiest way to check for enhancements, not the most obvious
					ok( !$( "html" ).hasClass( "ui-mobile" ), "html elem doesn't have class ui-mobile" );
				}).then( start );

			});

		test( "enhancments are skipped when the browser is not grade A", function(){
			setGradeA(false);
			$.testHelper.reloadLib(libName);

			var findFirstPage = function() {
				return $( ":jqmData(role='page')" ).first();
			};

		test( "enhancments are added when the browser is grade A", function(){
			setGradeA(true);
			$.testHelper.reloadLib(libName);

			ok($("html").hasClass("ui-mobile"), "html elem has class mobile");
		});

		var findFirstPage = function() {
			return $(":jqmData(role='page')").first();
		};

		test( "active page and start page should be set to the fist page in the selected set", function(){
			expect( 2 );
			$.testHelper.reloadLib(libName);
			var firstPage = findFirstPage();

			deepEqual($.mobile.firstPage[0], firstPage[0]);
			deepEqual($.mobile.activePage[0], firstPage[0]);
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

			deepEqual($.mobile.pageContainer[0], firstPage.parent()[0]);
		});

		test( "pages without a data-url attribute have it set to their id", function(){
			deepEqual($("#foo").jqmData('url'), "foo");
		});

		test( "pages with a data-url attribute are left with the original value", function(){
			deepEqual($("#bar").jqmData('url'), "bak");
		});

		// NOTE the next two tests work on timeouts that assume a page will be
		// created within 2 seconds it'd be great to get these using a more
		// reliable callback or event
		asyncTest( "page does auto-initialize at domready when autoinitialize option is true (default) ", function(){

			$( "<div />", { "data-nstest-role": "page", "id": "autoinit-on" } ).prependTo( "body" );

			$(document).one("mobileinit", function(){
				$.mobile.autoInitializePage = true;
			});

			asyncTest( "page does auto-initialize at domready when autoinitialize option is true (default) ", function(){

			reloadCoreNSandInit();

			setTimeout(function(){
				deepEqual( $( "#autoinit-on.ui-page" ).length, 1 );

				start();
			}, 2000);
		});


		asyncTest( "page does not initialize at domready when autoinitialize option is false ", function(){
			$(document).one("mobileinit", function(){
				$.mobile.autoInitializePage = false;
			});


			asyncTest( "page does not initialize at domready when autoinitialize option is false ", function(){
				$(document).one("mobileinit", function(){
					$.mobile.autoInitializePage = false;
				});

				$( "<div />", { "data-nstest-role": "page", "id": "autoinit-off" } ).prependTo( "body" );

				location.hash = "";


				reloadCoreNSandInit().then(
					function() {
						deepEqual( $( "#autoinit-off.ui-page" ).length, 0 );

						$(document).bind("mobileinit", function(){
							$.mobile.autoInitializePage = true;
						});

						return reloadCoreNSandInit();
					}
				).then( start );
			});
		});
	});
})(jQuery);
