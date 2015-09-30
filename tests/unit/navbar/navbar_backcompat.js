/*
 * mobile navbar unit tests
 */
( function( QUnit, $ ) {
QUnit.test( "navbar button gets active button class when clicked", function( assert ) {
	var link = $( "#disabled-button-click a:not(.ui-state-disabled)" ).first();

	link.click();
	assert.ok( link.hasClass( "ui-button-active" ), "link has active button class" );
} );

QUnit.test( "disabled navbar button doesn't add active button class when clicked",
    function( assert ) {
        var link = $( "#disabled-button-click a.ui-disabled" ).first();

        link.click();
        assert.ok( !link.hasClass( "ui-button-active" ), "link doesn't have active button class" );
} );

} )( QUnit, jQuery );
