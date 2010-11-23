/*
 * mobile support unit tests
 */

(function( $ ) {
	$.testHelper.excludeFileProtocol(function(){
		var	prependToFn = $.fn.prependTo,
				libName = "jquery.mobile.support.js";

		module(libName, {
			teardown: function(){
				//NOTE undo any mocking
				$.fn.prependTo = prependToFn;
			}
		});

		// NOTE following two tests have debatable value as they only
		//      prevent property name changes and improper attribute checks
		test( "detects functionality from basic affirmative properties and attributes", function(){
			// TODO expose properties for less brittle tests
			$.extend(window, {
				WebKitTransitionEvent: true,
				orientation: true
			});

			document.ontouchend = true;

			history.pushState = function(){};
			$.mobile.media = function(){ return true; };

			$.testHelper.reloadLib(libName);

			ok($.support.orientation);
			ok($.support.touch);
			ok($.support.cssTransitions);
			ok($.support.pushState);
			ok($.support.mediaquery);
		});

		test( "detects functionality from basic negative properties and attributes (where possible)", function(){
			delete window["orientation"];
			delete document["ontouchend"];

			$.testHelper.reloadLib(libName);

			ok(!$.support.orientation);
			ok(!$.support.touch);
		});

		// NOTE mocks prependTo to simulate base href updates or lack thereof
		var mockBaseCheck = function( url ){
			var prependToFn = $.fn.prependTo;

			$.fn.prependTo = function( selector ){
				var result = prependToFn.call(this, selector);
				if(this[0].href && this[0].href.indexOf("testurl") != -1)
					result = [{href: url}];
				return result;
			};
		};

		test( "detects dynamic base tag when new base element added and base href updates", function(){
			mockBaseCheck(location.protocol + '//' + location.host + location.pathname + "ui-dir/");
			$.testHelper.reloadLib(libName);
			ok($.support.dynamicBaseTag);
		});

		test( "detects no dynamic base tag when new base element added and base href unchanged", function(){
			mockBaseCheck('testurl');
			$.testHelper.reloadLib(libName);
			ok(!$.support.dynamicBaseTag);
		});

		//TODO propExists testing, refactor propExists into mockable method
		//TODO scrollTop testing, refactor scrollTop logic into mockable method
	});
})(jQuery);