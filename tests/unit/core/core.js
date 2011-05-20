/*
 * mobile core unit tests
 */

(function($){
	var libName = "jquery.mobile.core.js",
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
		test( "grade A browser either supports media queries or is IE 7+", function(){
			setGradeA(false, 6);
			$.testHelper.reloadLib(libName);
			ok(!$.mobile.gradeA());

			setGradeA(true, 8);
			$.testHelper.reloadLib(libName);
			ok($.mobile.gradeA());
		});
	});

	test( "$.mobile.nsNormalize works properly with namespace defined (test default)", function(){
		equal($.mobile.nsNormalize("foo"), "nstestFoo", "appends ns and initcaps");
		equal($.mobile.nsNormalize("fooBar"), "nstestFooBar", "leaves capped strings intact");
		equal($.mobile.nsNormalize("foo-bar"), "nstestFooBar", "changes dashed strings");
		equal($.mobile.nsNormalize("foo-bar-bak"), "nstestFooBarBak", "changes multiple dashed strings");
	});

	test( "$.mobile.nsNormalize works properly with an empty namespace", function(){
		var realNs = $.mobile.ns;

		$.mobile.ns = "";

		equal($.mobile.nsNormalize("foo"), "foo", "leaves uncapped and undashed");
		equal($.mobile.nsNormalize("fooBar"), "fooBar", "leaves capped strings intact");
		equal($.mobile.nsNormalize("foo-bar"), "fooBar", "changes dashed strings");
		equal($.mobile.nsNormalize("foo-bar-bak"), "fooBarBak", "changes multiple dashed strings");

		$.mobile.ns = realNs;
	});

	//data tests
	test( "$.fn.jqmData and $.fn.jqmRemoveData methods are working properly", function(){
		same( $("body").jqmData("foo", true), $("body"), "setting data returns the element" );

		same( $("body").jqmData("foo"), true, "getting data returns the right value" );

		same( $("body").data($.mobile.nsNormalize("foo")), true, "data was set using namespace" );

		same( $("body").jqmData("foo", undefined), true, "getting data still returns the value if there's an undefined second arg" );

		same( $("body").jqmData(), { "nstestFoo": true}, "passing no arguments returns a hash with all set properties" );

		same( $("body").jqmData(undefined), { "nstestFoo": true}, "passing a single undefined argument returns a hash with all set properties" );

		same( $("body").jqmData(undefined, undefined), {"nstestFoo": true}, "passing 2 undefined arguments returns a hash with all set properties" );

		same( $("body").jqmRemoveData("foo"), $("body"), "jqmRemoveData returns the element" );

		same( $("body").jqmData("foo"), undefined, "jqmRemoveData properly removes namespaced data" );

	});


	test( "$.jqmData and $.jqmRemoveData methods are working properly", function(){
		same( $.jqmData(document.body, "foo", true), true, "setting data returns the value" );

		same( $.jqmData(document.body, "foo"), true, "getting data returns the right value" );

		same( $.data(document.body, $.mobile.nsNormalize("foo")), true, "data was set using namespace" );

		same( $.jqmData(document.body, "foo", undefined), true, "getting data still returns the value if there's an undefined second arg" );

		same( $.jqmData(document.body), { "nstestFoo": true}, "passing no arguments returns a hash with all set properties" );

		same( $.jqmData(document.body, undefined), { "nstestFoo": true}, "passing a single undefined argument returns a hash with all set properties" );

		same( $.jqmData(document.body, undefined, undefined), {"nstestFoo": true}, "passing 2 undefined arguments returns a hash with all set properties" );

		same( $.jqmRemoveData(document.body, "foo"), undefined, "jqmRemoveData returns the undefined value" );

		same( $("body").jqmData("foo"), undefined, "jqmRemoveData properly removes namespaced data" );

	});

	test( "jqmHasData method is working properly", function(){
		same( $.jqmHasData(document.body, "foo"), false, "body has no data defined under 'foo'" );
		$.jqmData(document.body, "foo", true);
		same( $.jqmHasData(document.body, "foo"), true, "after setting, body has data defined under 'foo' equal to true" );
		$.jqmRemoveData(document.body, "foo");
	});
})(jQuery);