test( "Checkboxradio widget works correctly", function() {
	var checkbox = $( "#the-checkbox" ).checkboxradio(),
		initiallyChecked = checkbox.prop( "checked" );

	deepEqual( checkbox.parent().hasClass( "ui-checkbox" ), true,
		"Wrapper has class ui-checkbox" );
	deepEqual( checkbox.siblings( "label" ).hasClass( "ui-button" ), true,
		"Input has a sibling <label> with class ui-button" );

	checkbox.siblings( "label" ).click();

	deepEqual( checkbox.prop( "checked" ), !initiallyChecked,
		"Clicking the label toggles the checkbox" );
});
