/*
 * mobile textinput unit tests
 */
(function($){
	module( "jquery.mobile.forms.textinput.js" );

	test( "inputs without type specified are enhanced", function(){
		ok( $( "#typeless-input" ).hasClass( "ui-input-text" ) );
	});
})(jQuery);