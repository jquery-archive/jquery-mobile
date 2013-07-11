$.testHelper.delayStart();

/*
 * mobile init tests
 */
(function($){
	module("jquery.ui.loader", {
		setup: function(){
			// NOTE reset for gradeA tests
			$('html').removeClass('ui-mobile');

			$.ui.loading( 'hide' );
		},

		teardown: function(){
			// clear the classes added by reloading the init
			$("html").attr('class', '');

			$.ui.loadingMessage =
				$.ui.loadingMessageTheme =
				$.ui.loadingMessageTextVisible = undefined;
		}
	});

	// NOTE important to use $.fn.one here to make sure library reloads don't fire
	//      the event before the test check below
	$(document).one( "mobileinit", function(){
		$.ui.loader.prototype.options.text = "mobileinit";
		$.ui.loader.prototype.options.textVisible = true;
	});

	test( "prototype options are used for mobile loader", function() {
		$.ui.loading( 'show' );

		deepEqual( $('.ui-loader').text(), "mobileinit", "prototype options set the text and make it visible" );
	});

	test( "showPageLoadingMsg does not show the text when the loading message is false", function(){
		$.ui.loadingMessage = false;
		$.ui.showPageLoadingMsg();

		deepEqual($(".ui-loader h1").text(), "", "no loading message present");
	});

	test( "showPageLoadingMsg doesn't hide the text loading message is true", function(){
		$.ui.loadingMessageTextVisible = true;
		$.ui.showPageLoadingMsg();

		ok($(".ui-loader").hasClass( "ui-loader-verbose" ), "displaying text");
	});

	test( "hidePageLoadingMsg doesn't add the dialog to the page when loading message is false", function(){
		$.ui.loadingMessage = true;
		$.ui.showPageLoadingMsg();
		$.ui.hidePageLoadingMsg();

		deepEqual($(".ui-loading").length, 0, "page should not be in the loading state");
	});

	test( "showPageLoadingMsg adds the dialog to the page when loadingMessage is true", function(){
		$.ui.loadingMessage = true;
		$.ui.showPageLoadingMsg();

		deepEqual($(".ui-loading").length, 1, "page should be in the loading state");
	});

	test( "page loading should contain custom loading message", function(){
		$.ui.loadingMessage = "foo";
		$.ui.showPageLoadingMsg();

		deepEqual($(".ui-loader h1").text(), "foo");
	});

	test( "page loading should contain custom loading message when set at runtime", function(){
		$.ui.loadingMessage = "bar";
		$.ui.showPageLoadingMsg();

		deepEqual($(".ui-loader h1").text(), "bar");
	});

	test( "page loading should contain custom loading message when used in param object", function() {
		$.ui.showPageLoadingMsg({ text: "bak" });
		deepEqual($(".ui-loader h1").text(), "bak", "loader has custom message 'bak'");
	});

	test( "page loading should contain different theme when used in param object", function() {
		$.ui.showPageLoadingMsg({ theme: "l" });
		ok($(".ui-loader").hasClass( "ui-body-l"), "loader has theme l");
	});

	test( "page loading should contain new html when provided, prefers passed param", function() {
		$.ui.showPageLoadingMsg({
			html: "<div class=\"foo\"></div>"
		});

		deepEqual($(".ui-loader > div.foo").length, 1, "loader has a custom html");
	});

	test( "page loading should always contain text when passed as the second arg", function() {
		$.ui.loadingMessageTextVisible = false;

		// simulate error call in navigation ajax error callback
		$.ui.showPageLoadingMsg( "e", "foo serious", true );

		deepEqual($(".ui-loader").text(), "foo serious", "loader has message regardless of global setting");
	});

	test( "page loading should always contain text when passed as an object prop", function() {
		$.ui.loadingMessageTextVisible = false;

		// simulate error call in navigation ajax error callback
		$.ui.showPageLoadingMsg({ theme: "e", text: "foo serious second", textonly: true });

		deepEqual($(".ui-loader").text(), "foo serious second", "loader has message regardless of global setting");
	});

	test( "page loading should not contain text when default is used and visible prop is false", function() {
		$.ui.loadingMessageTextVisible = false;

		// simulate error call in navigation ajax error callback
		$.ui.showPageLoadingMsg({ theme: "e", textonly: true });

		ok($(".ui-loader").hasClass("ui-loader-default"), "loader text is hidden");

		$.ui.hidePageLoadingMsg();

		// simulate error call in navigation ajax error callback
		$.ui.showPageLoadingMsg( "e", undefined, true );

		ok($(".ui-loader").hasClass("ui-loader-default"), "loader text is hidden");
	});

	test( "test the loading config object precedence", function() {
		$.ui.loadingMessage = "fozzle";
		$.ui.loadingMessageTheme = "x";

		$.ui.showPageLoadingMsg();
		ok($(".ui-loader").hasClass( "ui-body-x" ), "has theme x");
		deepEqual($(".ui-loader h1").text(), "fozzle", "has text fozzle in loading config object");
	});
})(jQuery);
