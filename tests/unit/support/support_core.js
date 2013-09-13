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
		});

		window.history.pushState = function(){};
		window.history.replaceState = function(){};

		$.mobile.media = function(){ return true; };

		$.testHelper.reloadModule( moduleName ).done( function() {
			ok($.support.cssTransitions, "css transitions are supported" );
			ok($.support.pushState, "push state is supported" );
			ok($.support.mediaquery, "media queries are supported" );
			start();
		});
	});

	asyncTest( "detects orientation change", function() {
		$.extend(window, {
			orientation: true,
			onorientationchange: true
		});

		$.testHelper.reloadModule( "jquery.mobile.support.orientation" ).done( function() {
			ok($.support.orientation, "orientation is supported" );
			start();
		});
	});

	asyncTest( "detects touch", function() {
		document.ontouchend = true;

		$.testHelper.reloadModule( "jquery.mobile.support.touch" ).done( function() {
			ok( $.mobile.support.touch, "touch is supported" );
			ok( $.support.touch, "touch is supported" );
			start();
		});
	});

	asyncTest( "detects functionality from basic negative properties and attributes (where possible)", function(){
		delete window["orientation"];

		$.testHelper.reloadModule( "jquery.mobile.support.orientation" ).done( function() {
			ok(!$.support.orientation, "orientation is not supported" );
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
		expect( 1 );
		if ( !$.browser ) {
			ok( true, "Cannot perform test because $.browser has been removed" );
			start();
			return;
		}
		$.testHelper.reloadModule( moduleName ).done( function() {
		//here we're just comparing our version to what the conditional compilation finds
		 var ie 			= !!$.browser.msie, //get a boolean
		 	 version 		= parseInt( $.browser.version, 10),
		 	 jqmdetectedver = $.mobile.browser.oldIE;

		 	if( ie ){
		 		deepEqual(version, jqmdetectedver, "It's IE and the version is correct");
		 	}
		 	else{
		 		deepEqual(ie, jqmdetectedver, "It's not IE");
		 	}
			start();
		});
	});


	//TODO propExists testing, refactor propExists into mockable method
	//TODO scrollTop testing, refactor scrollTop logic into mockable method
});
