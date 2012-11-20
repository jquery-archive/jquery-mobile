/*
 * mobile textinput unit tests
 */
(function($){
	module( "jquery.mobile.forms.textinput.js" );

	// NOTE this test isn't run because the event data isn't easily accessible
	// and with the advent of the widget _on method we are actually testing the
	// widget from UI which has it's own test suite for these sorts of things
	// ie, don't test your dependencies / framework
	if( $.testHelper.versionTest( $.fn.jquery, function( l, r ) { return ( l < r ); }, "1.8" ) ){
		test( "input is cleaned up on destroy", function(){
			var input = $( "#destroycorrectly" ),
			win = $( window ),
			loadLen;

			loadLen = win.data("events").load.length;

			input.remove();

			equal(win.data("events").load.length, (loadLen-1), "window load event was not removed");
		});
	}

	test( "inputs without type specified are enhanced", function(){
		ok( $( "#typeless-input" ).hasClass( "ui-input-text" ) );
	});

	$.mobile.page.prototype.options.keepNative = "textarea.should-be-native";

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "textarea in the keepNative set shouldn't be enhanced", function() {
		ok( !$("textarea.should-be-native").is("ui-input-text") );
	});

	asyncTest( "textarea should autogrow on document ready", function() {
		var test = $( "#init-autogrow" );

		setTimeout(function() {
			ok( $( "#reference-autogrow" )[0].clientHeight < test[0].clientHeight, "the height is greater than the reference text area with no content" );
			ok( test[0].clientHeight > 100, "autogrow text area's height is greater than any style padding");
			start();
		}, 400);
	});

	asyncTest( "textarea should autogrow when text is added via the keyboard", function() {
		var test = $( "#keyup-autogrow" ),
			originalHeight = test[0].clientHeight;

		test.keyup(function() {
			setTimeout(function() {
				ok( test[0].clientHeight > originalHeight, "the height is greater than original with no content" );
				ok( test[0].clientHeight > 100, "autogrow text area's height is greater any style/padding");
				start();
			}, 400);
		});

		test.val("foo\n\n\n\n\n\n\n\n\n\n\n\n\n\n").trigger("keyup");
	});

	asyncTest( "text area should auto grow when the parent page is loaded via ajax", function() {
		$.testHelper.pageSequence([
			function() {
				$("#external").click();
			},

			function() {
				setTimeout(function() {
					ok($.mobile.activePage.find( "textarea" )[0].clientHeight > 100, "text area's height has grown");
					window.history.back();
				}, 1000);
			},

			function() {
				start();
			}
		]);
	});

	// NOTE init binding to alter the setting is in settings.js
	test( "'clear text' button for search inputs should use configured text", function(){
		strictEqual( $( "#search-input" ).closest( ".ui-input-search" ).find( ".ui-input-clear" ).attr( "title" ), "custom value" );
	});

	test( "data-clear-btn adds clear button to text inputs", function() {
		ok( $( '#text-input-clear-btn' ).next().is( 'a.ui-input-clear' ), "data-clear-btn adds clear button to text inputs" );
	});

	test( "data-clear-btn does not add clear button to textarea", function() {
		ok( ! $( "#textarea-clear-btn" ).next().is( "a.ui-input-clear" ), "data-clear-btn does not add clear button to textarea" );
	});
	
})(jQuery);
