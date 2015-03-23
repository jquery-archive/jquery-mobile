function defineTooltipTest( name, slider, hasValue, hasTooltip ) {
	test( name, function( assert ) {
		var widget = slider.slider( "instance" ),
			track = slider.siblings( ".ui-slider-track" ),
			handle = track.children( ".ui-slider-handle" ),
			popup = slider.siblings( ".ui-slider-popup" ),
			assertState = function( condition, popupVisible ) {
				var expectedHandleText =
					( hasValue ? ( widget.options.mini ? "" : ( "" + slider.val() ) ) : "" );

				assert.deepEqual( popup.is( ":visible" ), popupVisible,
					"Upon " + condition + " popup is " + ( popupVisible ? "" : "not " ) +
						"visible" );
				if ( popupVisible ) {
					assert.deepEqual( popup.text(), ( "" + slider.val() ),
						"Upon " + condition +
							" the popup reflects the input value (" + slider.val() + ")" );
				}
				deepEqual( handle.text(), expectedHandleText,
					"Upon " + condition + " the handle text is " + expectedHandleText );
			};

		assertState( "startup", false );

		// Make sure the widget updates correctly when dragging by the handle
		handle.trigger( "vmousedown" );
		assertState( "handle vmousedown", hasTooltip );

		// Move to 89% of the length of the slider
		handle.trigger( $.extend( $.Event( "vmousemove" ), {
			pageX: track.offset().left + track.width() * 0.89
		} ) );
		assertState( "handle vmousemove", hasTooltip );

		handle.trigger( "vmouseup" );
		assertState( "handle vmouseup", false );

		// Make sure the widget updates correctly when clicking on the track at 47%
		track.trigger( $.extend( $.Event( "vmousedown" ), {
			pageX: track.offset().left + track.width() * 0.47
		} ) );
		assertState( "track vmousedown", hasTooltip );

		// Move to 53%
		track.trigger( $.extend( $.Event( "vmousemove" ), {
			pageX: track.offset().left + track.width() * 0.53
		} ) );
		assertState( "track vmousemove", hasTooltip );

		track.trigger( "vmouseup" );
		assertState( "track vmouseup", false );
	} );
}

function defineTests( moduleNameSuffix, idPrefix ) {
	module( "Slider tooltip - " + moduleNameSuffix );

	defineTooltipTest( "Basic slider", $( "#" + idPrefix + "basic-slider" ), false, false );
	defineTooltipTest( "Slider showing value", $( "#" + idPrefix + "show-value" ), true, false );
	defineTooltipTest( "Slider showing tooltip", $( "#" + idPrefix + "popup" ), false, true );
	defineTooltipTest( "Tooltip and value", $( "#" + idPrefix + "value-and-popup" ), true, true );
}

defineTests( "regular size", "" );
defineTests( "mini size", "mini-" );
