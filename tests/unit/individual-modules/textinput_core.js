define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.test( "Textinput widget works correctly", function( assert ) {
var plainText = $( "#plain-text" ).textinput(),
	searchText = $( "#search-text" ).textinput(),
	textarea = $( "#textarea" ).textinput();

assert.hasClasses( plainText.textinput( "widget" )[ 0 ], "ui-textinput-text",
	"Plain text widget has class ui-textinput-text" );
assert.hasClasses( searchText.textinput( "widget" )[ 0 ], "ui-textinput-search",
	"Search text widget has class ui-textinput-search" );
assert.hasClasses( searchText.textinput( "widget" )[ 0 ], "ui-textinput-has-clear-button",
	"Search text widget has class ui-textinput-has-clear-button" );
assert.hasClasses( textarea.textinput( "widget" )[ 0 ], "ui-textinput-text",
	"Textarea widget has class ui-textinput-text" );
} );

} );
