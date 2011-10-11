/*
 * mobile textinput unit tests
 */
(function($){
	module( "jquery.mobile.forms.textinput.js" );

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
})(jQuery);