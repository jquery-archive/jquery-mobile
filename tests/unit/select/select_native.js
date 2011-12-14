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

	// issue https://github.com/jquery/jquery-mobile/issues/2410
	test( "adding options and refreshing a native select defaults the text", function() {
		var select = $( "#native-refresh" ),
      button = select.siblings( '.ui-btn-inner' ),
      text = "foo";

    same(button.text(), "default");
    select.find( "option" ).remove(); //remove the loading message
    select.append('<option value="1">' + text + '</option>');
    select.selectmenu('refresh');
		same(button.text(), text);
	});

	// issue 2424
	test( "native selects should provide open and close as a no-op", function() {
		// exception will prevent test success if undef
		$( "#native-refresh" ).selectmenu( 'open' );
		$( "#native-refresh" ).selectmenu( 'close' );
		ok( true );
	});
})(jQuery);