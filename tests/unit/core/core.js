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

			// NOTE reset for pageLoading tests
			$('.ui-loader').remove();
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

		//TODO lots of duplication
		test( "pageLoading doesn't add the dialog to the page when loading message is false", function(){
			$.testHelper.alterExtend({loadingMessage: false});
			$.testHelper.reloadLib(libName);
			$.mobile.pageLoading(false);
			ok(!$(".ui-loader").length);
		});

		test( "pageLoading doesn't add the dialog to the page when done is passed as true", function(){
			$.testHelper.alterExtend({loadingMessage: true});
			$.testHelper.reloadLib(libName);

			// TODO add post reload callback
			$('.ui-loader').remove();

			$.mobile.pageLoading(true);
			ok(!$(".ui-loader").length);
		});

		test( "pageLoading adds the dialog to the page when done is true", function(){
			$.testHelper.alterExtend({loadingMessage: true});
			$.testHelper.reloadLib(libName);
			$.mobile.pageLoading(false);
			ok($(".ui-loader").length);
		});
	});
})(jQuery);