/*
 * mobile navigation unit tests
 */
(function($){
	var changePageFn = $.mobile.changePage;
	module('jquery.mobile.navigation.js', {
		teardown: function(){
			$.mobile.changePage = changePageFn;
		}
	});

	test( "forms with data attribute ajax set to false will not call changePage", function(){
		var called = false;
		$.mobile.changePage = function(){
			called = true;
		};

		stop();
		$('#non-ajax-form').live('submit', function(event){
			ok(true, 'submit callbacks are fired');
			start();
			event.preventDefault();
		}).submit();

		ok(!called, "change page should not be called");
	});

	test( "forms with data attribute ajax not set or set to anything but false will call changepage", function(){
		var called = 0;
		$.mobile.changePage = function(){
			called += 1;
			if(called > 1){ start(); }
		};

		stop();
		$('#ajax-form, #rand-ajax-form').submit();

		same(called, 2, "change page should be called twice");
	});

	test( "check for external link succeeds", function(){
		same($.mobile.isExternalLink("<a href='mailto:'></a>"), true, "mailto");
		same($.mobile.isExternalLink("<a href='http://foo.com'></a>"), true, "http protocol");
		same($.mobile.isExternalLink("<a href='foo' rel='external'></a>"), true, "rel=external");
		same($.mobile.isExternalLink("<a href='foo' target='foo'></a>"), true, "target");
	});

	test( "check for external link fails", function(){
		same($.mobile.isExternalLink("<a href='foo.html'></a>"), false, "mailto");
		same($.mobile.isExternalLink("<a href='#foo'></a>"), false, "mailto");
	});
})(jQuery);