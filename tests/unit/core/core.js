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
})(jQuery);