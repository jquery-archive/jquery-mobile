test( "Textinput widget works correctly", function() {
	var plainText = $( "#plain-text" ).textinput(),
		searchText = $( "#search-text" ).textinput(),
		textarea = $( "#textarea" ).textinput();

	deepEqual( plainText.textinput( "widget" ).hasClass( "ui-textinput-text" ), true, "Plain text widget has class ui-textinput-text" );
	deepEqual( searchText.textinput( "widget" ).hasClass( "ui-textinput-search" ), true, "Search text widget has class ui-textinput-search" );
	deepEqual( searchText.textinput( "widget" ).hasClass( "ui-textinput-has-clear-button" ), true, "Search text widget has class ui-textinput-has-clear-button" );
	deepEqual( textarea.textinput( "widget" ).hasClass( "ui-textinput-text" ), true, "Textarea widget has class ui-textinput-text" );
});
