/*
 * mobile textinput unit tests
 */
(function($){
	module( "jquery.mobile.forms.textinput.js" );

	test( "Negate style option", function() {
		var input = $("#negate-style-corner");
		deepEqual( input.parent().hasClass("ui-corner-none"), true, "Inputtext has negate class.");
		deepEqual( parseInt( input.css("border-radius"), 10 ), 0, "Inputtext does not have border-radius.");
	});
})(jQuery);