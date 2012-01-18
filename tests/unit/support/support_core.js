/*
 * mobile support unit tests
 */

$.testHelper.excludeFileProtocol(function(){
	var	prependToFn = $.fn.prependTo,
		moduleName = "jquery.mobile.support";

	module(moduleName, {
		teardown: function(){
			//NOTE undo any mocking
			$.fn.prependTo = prependToFn;
		}
	});

	// NOTE following two tests have debatable value as they only
	//      prevent property name changes and improper attribute checks
	asyncTest( "detects functionality from basic affirmative properties and attributes", function(){
		// TODO expose properties for less brittle tests
		$.extend(window, {
			WebKitTransitionEvent: true,
			orientation: true,
			onorientationchange: true
		});

		document.ontouchend = true;

		window.history.pushState = function(){};
		window.history.replaceState = function(){};

		$.mobile.media = function(){ return true; };

		$.testHelper.reloadModule( moduleName ).done( function() {
				ok($.support.orientation);
				ok($.support.touch);
				ok($.support.cssTransitions);
				ok($.support.pushState);
				ok($.support.mediaquery);
				start();
		});
	});

	asyncTest( "detects functionality from basic negative properties and attributes (where possible)", function(){
		delete window["orientation"];
		delete document["ontouchend"];

		$.testHelper.reloadModule( moduleName ).done( function() {
			ok(!$.support.orientation);
			ok(!$.support.touch);
			start();
		});
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

	asyncTest( "detects dynamic base tag when new base element added and base href updates", function(){
		mockBaseCheck(location.protocol + '//' + location.host + location.pathname + "ui-dir/");
		$.testHelper.reloadModule( moduleName ).done( function() {
			ok($.support.dynamicBaseTag);
			start();
		});
	});

	asyncTest( "detects no dynamic base tag when new base element added and base href unchanged", function(){
		mockBaseCheck('testurl');
		$.testHelper.reloadModule( moduleName ).done( function() {
			ok(!$.support.dynamicBaseTag);
			start();
		});
	});

	asyncTest( "jQM's IE browser check properly detects IE versions", function(){
		$.testHelper.reloadModule( moduleName ).done( function() {
		//here we're just comparing our version to what the conditional compilation finds
		 var ie 			= !!$.browser.msie, //get a boolean
		 	 version 		= parseInt( $.browser.version, 10),
		 	 jqmdetectedver = $.mobile.browser.ie;

		 	if( ie ){
		 		same(version, jqmdetectedver, "It's IE and the version is correct");
		 	}
		 	else{
		 		same(ie, jqmdetectedver, "It's not IE");
		 	}
			start();
		});
	});


	//TODO propExists testing, refactor propExists into mockable method
	//TODO scrollTop testing, refactor scrollTop logic into mockable method
});
