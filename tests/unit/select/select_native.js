/*
 * mobile select unit tests
 */

(function($){
	module("jquery.ui.forms.select native");

	test( "native menu selections alter the button text", function(){
		var select = $( "#native-select-choice-few" ), setAndCheck;

		setAndCheck = function(key){
			var text;

			select.val( key ).selectmenu( 'refresh' );
			text = select.find( "option[value='" + key + "']" ).text();
			deepEqual( select.parent().find( "span:first" ).text(), text );
		};

		setAndCheck( 'rush' );
		setAndCheck( 'standard' );
	});

	// issue https://github.com/jquery/jquery-mobile/issues/2410
	test( "adding options and refreshing a custom select defaults the text", function() {
		var select = $( "#custom-refresh" ),
			button = function() { return select.siblings( "a" ).find( "span:first" ); },
			text = "foo";

		deepEqual( $.trim( button().text() ), "default" );
		select.find( "option" ).remove(); //remove the loading message
		select.append( '<option value="1">' + text + '</option>' );
		select.selectmenu( 'refresh' );
		deepEqual( $.trim( button().text() ), text);
	});

	// issue 2424
	test( "native selects should provide open and close as a no-op", function() {
		// exception will prevent test success if undef
		$( "#native-refresh" ).selectmenu( 'open' );
		$( "#native-refresh" ).selectmenu( 'close' );
		ok( true );
	});

	asyncTest( "The preventFocusZoom option is working as expected", function() {

		var zoomoptiondefault = $.ui.selectmenu.prototype.options.preventFocusZoom;
		$.ui.selectmenu.prototype.options.preventFocusZoom = true;

		$(document)
			.one("vmousedown.test", function(){
				ok( $.ui.zoom.enabled === false, "zoom is disabled on vmousedown" );
			})
			.one("mouseup.test", function(){
				setTimeout(function() { // This empty setTimeout is to match the work-around for the issue reported in https://github.com/jquery/jquery-mobile/issues/5041
					ok( $.ui.zoom.enabled === true, "zoom is enabled on mouseup" );
					$.ui.selectmenu.prototype.options.preventFocusZoom = zoomoptiondefault;
					$(document).unbind(".test");
					$( "#select-choice-native" ).selectmenu( "option", "preventFocusZoom", zoomoptiondefault );
					start();
				}, 0);
		});

		$( "#select-choice-native" )
			.selectmenu( "option", "preventFocusZoom", true )
			.parent()
			.trigger( "vmousedown" )
			.trigger( "mouseup" );




	});

	asyncTest( "The preventFocusZoom option does not manipulate zoom when it is false", function() {

		var zoomstate = $.ui.zoom.enabled,
			zoomoptiondefault = $.ui.selectmenu.prototype.options.preventFocusZoom;


		$(document)
			.one("vmousedown.test", function(){
				ok( $.ui.zoom.enabled === zoomstate, "zoom is unaffected on vmousedown" );
			})
			.one("mouseup.test", function(){
				ok( $.ui.zoom.enabled === zoomstate, "zoom is unaffected on mouseup" );
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
