/*
 * mobile core unit tests
 */

(function($){
	var libName = "jquery.mobile.core",
			setGradeA = function(value, version) {
				$.support.mediaquery = value;
				$.mobile.browser.ie = version;
			},
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
		asyncTest( "grade A browser either supports media queries or is IE 7+", function(){
			setGradeA(false, 6);
			$.testHelper.deferredSequence([
				function() {
					return $.testHelper.reloadModule(libName);
				},

				function() {
					ok(!$.mobile.gradeA());
				},

				function() {
					setGradeA(true, 8);
					return $.testHelper.reloadModule(libName);
				},

				function() {
					ok($.mobile.gradeA());
					start();
				}
			]);
		});
	});

	function clearNSNormalizeDictionary()
	{
		var dict = $.mobile.nsNormalizeDict;
		for ( var prop in dict ) {
			delete dict[ prop ];
		}
	}

	test( "$.mobile.nsNormalize works properly with namespace defined (test default)", function(){
		// Start with a fresh namespace property cache, just in case
		// the previous test mucked with namespaces.
		clearNSNormalizeDictionary();

		equal($.mobile.nsNormalize("foo"), "nstestFoo", "appends ns and initcaps");
		equal($.mobile.nsNormalize("fooBar"), "nstestFooBar", "leaves capped strings intact");
		equal($.mobile.nsNormalize("foo-bar"), "nstestFooBar", "changes dashed strings");
		equal($.mobile.nsNormalize("foo-bar-bak"), "nstestFooBarBak", "changes multiple dashed strings");

		// Reset the namespace property cache for the next test.
		clearNSNormalizeDictionary();
	});

	test( "$.mobile.nsNormalize works properly with an empty namespace", function(){
		var realNs = $.mobile.ns;

		$.mobile.ns = "";

		// Start with a fresh namespace property cache, just in case
		// the previous test mucked with namespaces.
		clearNSNormalizeDictionary();

		equal($.mobile.nsNormalize("foo"), "foo", "leaves uncapped and undashed");
		equal($.mobile.nsNormalize("fooBar"), "fooBar", "leaves capped strings intact");
		equal($.mobile.nsNormalize("foo-bar"), "fooBar", "changes dashed strings");
		equal($.mobile.nsNormalize("foo-bar-bak"), "fooBarBak", "changes multiple dashed strings");

		$.mobile.ns = realNs;

		// Reset the namespace property cache for the next test.
		clearNSNormalizeDictionary();
	});

	//data tests
	test( "$.fn.jqmData and $.fn.jqmRemoveData methods are working properly", function(){
		var data;

		deepEqual( $("body").jqmData("foo", true), $("body"), "setting data returns the element" );

		deepEqual( $("body").jqmData("foo"), true, "getting data returns the right value" );

		deepEqual( $("body").data($.mobile.nsNormalize("foo")), true, "data was set using namespace" );

		deepEqual( $("body").jqmData("foo", undefined), true, "getting data still returns the value if there's an undefined second arg" );

		data = $.extend( {}, $("body").data() );
		delete data[ $.expando ]; //discard the expando for that test
		deepEqual( data , { "nstestFoo": true }, "passing .data() no arguments returns a hash with all set properties" );

		deepEqual( $("body").jqmData(), undefined, "passing no arguments returns undefined" );

		deepEqual( $("body").jqmData(undefined), undefined, "passing a single undefined argument returns undefined" );

		deepEqual( $("body").jqmData(undefined, undefined), undefined, "passing 2 undefined arguments returns undefined" );

		deepEqual( $("body").jqmRemoveData("foo"), $("body"), "jqmRemoveData returns the element" );

		deepEqual( $("body").jqmData("foo"), undefined, "jqmRemoveData properly removes namespaced data" );

	});


	test( "$.jqmData and $.jqmRemoveData methods are working properly", function(){
		deepEqual( $.jqmData(document.body, "foo", true), true, "setting data returns the value" );

		deepEqual( $.jqmData(document.body, "foo"), true, "getting data returns the right value" );

		deepEqual( $.data(document.body, $.mobile.nsNormalize("foo")), true, "data was set using namespace" );

		deepEqual( $.jqmData(document.body, "foo", undefined), true, "getting data still returns the value if there's an undefined second arg" );

		deepEqual( $.jqmData(document.body), undefined, "passing no arguments returns undefined" );

		deepEqual( $.jqmData(document.body, undefined), undefined, "passing a single undefined argument returns undefined" );

		deepEqual( $.jqmData(document.body, undefined, undefined), undefined, "passing 2 undefined arguments returns undefined" );

		deepEqual( $.jqmRemoveData(document.body, "foo"), undefined, "jqmRemoveData returns the undefined value" );

		deepEqual( $("body").jqmData("foo"), undefined, "jqmRemoveData properly removes namespaced data" );

	});

	test( "addDependents works properly", function() {
		deepEqual( $("#parent").jqmData('dependents'), undefined );
		$( "#parent" ).addDependents( $("#dependent") );
		deepEqual( $("#parent").jqmData('dependents').length, 1 );
	});

	test( "removeWithDependents removes the parent element and ", function(){
		$( "#parent" ).addDependents( $("#dependent") );
		deepEqual($( "#parent, #dependent" ).length, 2);
		$( "#parent" ).removeWithDependents();
		deepEqual($( "#parent, #dependent" ).length, 0);
	});

	test( "$.fn.getEncodedText should return the encoded value where $.fn.text doesn't", function() {
		deepEqual( $("#encoded").text(), "foo>");
		deepEqual( $("#encoded").getEncodedText(), "foo&gt;");
		deepEqual( $("#unencoded").getEncodedText(), "var foo;");
	});

	test( "closestPageData returns the parent's page data", function() {
		var pageChild = $( "#page-child" );

		$( "#parent-page" ).data( "page", { foo: "bar" } );
		deepEqual( $.mobile.closestPageData( pageChild ).foo, "bar" );
	});

	test( "closestPageData returns the parent dialog's page data", function() {
		var dialogChild = $( "#dialog-child" );

		$( "#parent-dialog" ).data( "page", { foo: "bar" } );
		deepEqual( $.mobile.closestPageData(dialogChild).foo, "bar" );
	});

	test( "test that $.fn.jqmHijackable works", function() {
		$.mobile.ignoreContentEnabled = true;

		deepEqual( $( "#hijacked-link" ).jqmHijackable().length, 1,
					"a link without any association to data-ajax=false should be included");

		deepEqual( $( "#unhijacked-link-by-parent" ).jqmHijackable().length, 0,
					"a link with a data-ajax=false parent should be excluded");

		deepEqual( $( "#unhijacked-link-by-attr" ).jqmHijackable().length, 0,
					"a link with data-ajax=false should be excluded");

		$.mobile.ignoreContentEnabled = false;
	});
})(jQuery);