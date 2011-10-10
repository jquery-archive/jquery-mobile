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
})(jQuery);