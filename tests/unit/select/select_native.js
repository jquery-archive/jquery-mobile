/*
 * mobile select unit tests
 */

(function($){
	module("jquery.mobile.forms.select native");

	test( "native menu selections alter the button text", function(){
		var select = $( "#native-select-choice-few" ), setAndCheck;

		setAndCheck = function(key){
      var text;

		  select.val( key ).selectmenu( 'refresh' );
		  text = select.find( "option[value='" + key + "']" ).text();
		  same( select.parent().find(".ui-btn-text").text(), text );
		};

    setAndCheck( 'rush' );
    setAndCheck( 'standard' );
	});

	asyncTest( "selecting a value removes the related buttons down state", function(){
		var select = $( "#native-select-choice-few" );

		$.testHelper.sequence([
			function() {
				// click the native menu parent button
				select.parent().trigger( 'vmousedown' );
			},

			function() {
				ok( select.parent().hasClass("ui-btn-down-c"), "button down class added" );
			},

			function() {
				// trigger a change on the select
				select.trigger( "change" );
			},

			function() {
				ok( !select.parent().hasClass("ui-btn-down-c"), "button down class removed" );
				start();
			}
		], 300);
	});
})(jQuery);