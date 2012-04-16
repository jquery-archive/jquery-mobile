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
	test( "adding options and refreshing a custom select defaults the text", function() {
		var select = $( "#custom-refresh" ),
			button = select.siblings( "a" ).find( ".ui-btn-inner" ),
			text = "foo";

		same($.trim(button.text()), "default");
		select.find( "option" ).remove(); //remove the loading message
		select.append('<option value="1">' + text + '</option>');
		select.selectmenu( 'refresh' );
		same($.trim(button.text()), text);
	});

	// issue 2424
	test( "native selects should provide open and close as a no-op", function() {
		// exception will prevent test success if undef
		$( "#native-refresh" ).selectmenu( 'open' );
		$( "#native-refresh" ).selectmenu( 'close' );
		ok( true );
	});

	asyncTest( "The preventFocusZoom option is working as expected", function() {

		var zoomoptiondefault = $.mobile.selectmenu.prototype.options.preventFocusZoom;
		$.mobile.selectmenu.prototype.options.preventFocusZoom = true;

		$(document)
			.one("vmousedown.test", function(){
				ok( $.mobile.zoom.enabled === false, "zoom is disabled on vmousedown" );
			})
			.one("mouseup.test", function(){
				ok( $.mobile.zoom.enabled === true, "zoom is enabled on mouseup" );
				$.mobile.selectmenu.prototype.options.preventFocusZoom = zoomoptiondefault;
				$(document).unbind(".test");
				$( "#select-choice-native" ).selectmenu( "option", "preventFocusZoom", zoomoptiondefault )
				start();
		});

		$( "#select-choice-native" )
			.selectmenu( "option", "preventFocusZoom", true )
			.parent()
			.trigger( "vmousedown" )
			.trigger( "mouseup" );




	});

	asyncTest( "The preventFocusZoom option does not manipulate zoom when it is false", function() {

		var zoomstate = $.mobile.zoom.enabled,
			zoomoptiondefault = $.mobile.selectmenu.prototype.options.preventFocusZoom;


		$(document)
			.one("vmousedown.test", function(){
				ok( $.mobile.zoom.enabled === zoomstate, "zoom is unaffected on vmousedown" );
			})
			.one("mouseup.test", function(){
				ok( $.mobile.zoom.enabled === zoomstate, "zoom is unaffected on mouseup" );
				$(document).unbind(".test");
				$( "#select-choice-native" ).selectmenu( "option", "preventFocusZoom", zoomoptiondefault );
				start();

		});

		$( "#select-choice-native" )
			.selectmenu( "option", "preventFocusZoom", false )
			.parent()
			.trigger( "vmousedown" )
			.trigger( "mouseup" );

	});
})(jQuery);