/*
 * mobile core unit tests
 */

(function( $ ) {
	var libName = "jquery.mobile.core.js",
			setGradeA = function(value) { $.support.mediaquery = value; };

	module(libName, {
		setup: function(){
			$('html').removeClass('ui-mobile');
		}
	});

	$.testHelper.excludeFileProtocol(function(){

		test("grade A browser support media queries", function(){
			setGradeA(false);
			$.testHelper.reloadLib(libName);
			ok(!$.mobile.gradeA());

			setGradeA(true);
			$.testHelper.reloadLib(libName);
			ok($.mobile.gradeA());
		});

		test("loading the core library triggers mobilinit on the document", function(){
			expect( 1 );

			$(window.document).bind('mobileinit', function(event){
				ok(true);
			});

			$.testHelper.reloadLib(libName);
		});

		test("enhancments are skipped when the browser is not grade A", function(){
			setGradeA(false);
			$.testHelper.reloadLib(libName);

			//NOTE easiest way to check for enhancements, not the most obvious
			ok(!$("html").hasClass("ui-mobile"));
		});

		test("enhancments are added when the browser is not grade A", function(){
			setGradeA(true);
			$.testHelper.reloadLib(libName);

			ok($("html").hasClass("ui-mobile"));
		});
	});
})(jQuery);