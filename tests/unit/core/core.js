/*
 * mobile core unit tests
 */

(function($){
	var libName = "jquery.mobile.core.js",
			setGradeA = function(value) { $.support.mediaquery = value; },
			extendFn = $.extend;

	module(libName, {
		teardown: function(){
			$.extend = extendFn;
		}
	});

	$.testHelper.excludeFileProtocol(function(){
		test( "grade A browser support media queries", function(){
			setGradeA(false);
			$.testHelper.reloadLib(libName);
			ok(!$.mobile.gradeA());

			setGradeA(true);
			$.testHelper.reloadLib(libName);
			ok($.mobile.gradeA());
		});
	});
})(jQuery);