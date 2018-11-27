define( [ "jquery", "qunit" ], function( $, QUnit ) {

function defineModule( whichWidget, prependHiddenWidget ) {
	function capitalize( word ) {
		return $.camelCase( "x-" + word ).substr( 1 );
	}

	function defineBorderExceptionTest( direction, theBorder ) {
		QUnit.test( capitalize( direction ) + ": " + capitalize( theBorder ) + " border",
			function( assert ) {
				var group = $( "#" + whichWidget + "-" + direction );
				var firstItem = group.find( ".ui-button" ).first();

				assert.strictEqual(
					parseInt( firstItem.css( "border-" + theBorder + "-width" ), 10 ),
					1, "The first item in a " + direction + " controlgroup has a " + theBorder +
						" border" );

				prependHiddenWidget( group );
				group.controlgroup( "refresh" );

				assert.strictEqual(
					parseInt( firstItem.css( "border-" + theBorder + "-width" ), 10 ),
					1, "After prepending a hidden item, " +
						"the first item in a " + direction + " controlgroup has a " + theBorder +
						" border" );
			} );
	}

	QUnit.module( capitalize( whichWidget ) );

	defineBorderExceptionTest( "horizontal", "left" );
	defineBorderExceptionTest( "vertical", "top" );

	QUnit.test( "Single", function( assert ) {
		var singleItem = $( "#" + whichWidget + "-single" ).find( ".ui-button" );
		assert.strictEqual( parseInt( singleItem.css( "border-left-width" ), 10 ), 1,
			"Single " + whichWidget + " in a controlgroup has a left border" );
		assert.strictEqual( parseInt( singleItem.css( "border-top-width" ), 10 ), 1,
			"Single " + whichWidget + " in a controlgroup has a top border" );
		assert.strictEqual( parseInt( singleItem.css( "border-right-width" ), 10 ),
			1, "Single " + whichWidget + " in a controlgroup has a right border" );
		assert.strictEqual( parseInt( singleItem.css( "border-bottom-width" ), 10 ),
			1, "Single " + whichWidget + " in a controlgroup has a bottom border" );
	} );
}

defineModule( "button", function prependHiddenButton( group ) {
	group.prepend( "<a class='ui-screen-hidden' href='#'>Hidden Link</a>" );
} );

defineModule( "checkboxradio", function prependHiddenCheckbox( group ) {
	$( "<label class='ui-screen-hidden'><input type='checkbox'>Hidden Checkbox</label>" )
		.prependTo( group )
		.children()
		.checkboxradio();
} );

defineModule( "selectmenu", function prependHiddenSelectmenu( group ) {
	$( "<select><option value='1'>One</option><option value='2'>Two</option></select>" )
		.prependTo( group )
		.selectmenu( { classes: { "ui-selectmenu": "ui-screen-hidden" } } );
} );

} );
