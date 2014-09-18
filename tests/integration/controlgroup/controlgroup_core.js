test( "Controlgroup honors keepNative", function() {
	deepEqual( !!$( "select.selectmenu-enhanced" ).data( "mobile-selectmenu" ), true,
		"selectmenu instantiated where data-role='none' is absent" );
	deepEqual( !!$( ".button-enhanced" ).data( "mobile-button" ), true,
		"button instantiated where data-role='none' is absent" );
	deepEqual( !!$( ".checkboxradio-enhanced" ).data( "mobile-checkboxradio" ), true,
		"checkboxradio instantiated where data-role='none' is absent" );
	deepEqual( $( "button.buttonMarkup-enhanced" ).hasClass( "ui-btn" ), true,
		"button element enhanced where data-role='none' is absent" );
	deepEqual( $( "a.buttonMarkup-enhanced" ).hasClass( "ui-btn" ), true,
		"Anchor enhanced where data-role='none' is absent" );

	deepEqual( !!$( "select.selectmenu-skipped" ).data( "mobile-selectmenu" ), false,
		"selectmenu instantiation skipped where data-role='none' is present" );
	deepEqual( !!$( ".button-skipped" ).data( "mobile-button" ), false,
		"button instantiation skipped where data-role='none' is present" );
	deepEqual( !!$( ".checkboxradio-skipped" ).data( "mobile-checkboxradio" ), false,
		"checkboxradio instantiation skipped where data-role='none' is present" );
	deepEqual( $( "button.buttonMarkup-skipped" ).hasClass( "ui-btn" ), false,
		"button element enhancement skipped where data-role='none' is present" );
	deepEqual( $( "a.buttonMarkup-skipped" ).hasClass( "ui-btn" ), false,
		"Anchor enhancement skipped where data-role='none' is present" );
});
