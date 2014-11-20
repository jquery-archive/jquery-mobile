test( "Textinput widget works correctly", function() {
	var theButton = $( "#theButton" ).button(),
		onlyTextNodes = function() { return this.nodeType == 3; };
	deepEqual( theButton.parent().is( "div.ui-button.ui-input-button" ), true, "The input-based button is wrapped in a div.ui-button.ui-input-button" );
	deepEqual( theButton.parent().contents().filter( onlyTextNodes ).first().text(), "The Button", "The input-based button has a text node containing the button's value attributes." );
});
