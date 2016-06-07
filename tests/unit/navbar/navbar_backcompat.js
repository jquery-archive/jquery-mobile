/*
 * Mobile navbar unit tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "navbar button gets active button class when clicked", function( assert ) {
	var link = $( "#disabled-button-click a:not(.ui-state-disabled)" ).first();

	link.click();
	assert.hasClasses( link, "ui-button-active" );
} );

QUnit.test( "disabled navbar button doesn't add active button class when clicked",
	function( assert ) {
		var link = $( "#disabled-button-click a.ui-state-disabled" ).first();

		link.click();
		assert.lacksClasses( link, "ui-button-active" );
} );

} );
