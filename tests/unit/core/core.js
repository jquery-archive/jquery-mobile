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

		same( $("body").jqmData("foo", true), $("body"), "setting data returns the element" );

		same( $("body").jqmData("foo"), true, "getting data returns the right value" );

		same( $("body").data($.mobile.nsNormalize("foo")), true, "data was set using namespace" );

		same( $("body").jqmData("foo", undefined), true, "getting data still returns the value if there's an undefined second arg" );

		data = $.extend( {}, $("body").data() );
		delete data[ $.expando ]; //discard the expando for that test
		same( data , { "nstestFoo": true }, "passing .data() no arguments returns a hash with all set properties" );

		same( $("body").jqmData(), undefined, "passing no arguments returns undefined" );

		same( $("body").jqmData(undefined), undefined, "passing a single undefined argument returns undefined" );

		same( $("body").jqmData(undefined, undefined), undefined, "passing 2 undefined arguments returns undefined" );

		same( $("body").jqmRemoveData("foo"), $("body"), "jqmRemoveData returns the element" );

		same( $("body").jqmData("foo"), undefined, "jqmRemoveData properly removes namespaced data" );

	});


	test( "$.jqmData and $.jqmRemoveData methods are working properly", function(){
		same( $.jqmData(document.body, "foo", true), true, "setting data returns the value" );

		same( $.jqmData(document.body, "foo"), true, "getting data returns the right value" );

		same( $.data(document.body, $.mobile.nsNormalize("foo")), true, "data was set using namespace" );

		same( $.jqmData(document.body, "foo", undefined), true, "getting data still returns the value if there's an undefined second arg" );

		same( $.jqmData(document.body), undefined, "passing no arguments returns undefined" );

		same( $.jqmData(document.body, undefined), undefined, "passing a single undefined argument returns undefined" );

		same( $.jqmData(document.body, undefined, undefined), undefined, "passing 2 undefined arguments returns undefined" );

		same( $.jqmRemoveData(document.body, "foo"), undefined, "jqmRemoveData returns the undefined value" );

		same( $("body").jqmData("foo"), undefined, "jqmRemoveData properly removes namespaced data" );

	});

	test( "addDependents works properly", function() {
		same( $("#parent").jqmData('dependents'), undefined );
		$( "#parent" ).addDependents( $("#dependent") );
		same( $("#parent").jqmData('dependents').length, 1 );
	});

	test( "removeWithDependents removes the parent element and ", function(){
		$( "#parent" ).addDependents( $("#dependent") );
		same($( "#parent, #dependent" ).length, 2);
		$( "#parent" ).removeWithDependents();
		same($( "#parent, #dependent" ).length, 0);
	});

	test( "$.fn.getEncodedText should return the encoded value where $.fn.text doesn't", function() {
		same( $("#encoded").text(), "foo>");
		same( $("#encoded").getEncodedText(), "foo&gt;");
		same( $("#unencoded").getEncodedText(), "foo");
	});
})(jQuery);