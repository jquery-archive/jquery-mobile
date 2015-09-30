/*
 * mobile navbar unit tests
 */
( function( QUnit, $ ) {
QUnit.test( "navbar button gets active button class when clicked", function( assert ) {
	var link = $( "#disabled-btn-click a:not(.ui-state-disabled)" ).first();

	link.click();
	assert.ok( link.hasClass( "ui-button-active" ), "link has active button class" );
} );

QUnit.test( "disabled navbar button doesn't add active button class when clicked", function( assert ) {
	var link = $( "#disabled-button-click a.ui-disabled" ).first();

	link.click();
	assert.ok( !link.hasClass( "ui-button-active" ), "link doesn't have active button class" );
} );

QUnit.test( "classes are correctly assigned", function( assert ) {
	var $ul = $( '#enhanced-classes' ),
		r = $ul.find( "li" ).eq( 0 ).find( "a" ),
		d = $ul.find( "li" ).eq( 1 ).find( "a" ),
		u = $ul.find( "li" ).eq( 2 ).find( "a" );

	assert.ok( r.hasClass( "ui-icon-arrow-r" ) && !r.hasClass( "ui-icon-arrow-d" ) && !r.hasClass( "ui-icon-arrow-u" ), "first item only has class of arrow-r" );
	assert.ok( !d.hasClass( "ui-icon-arrow-r" ) && d.hasClass( "ui-icon-arrow-d" ) && !d.hasClass( "ui-icon-arrow-u" ), "second item only has class of arrow-d" );
	assert.ok( !u.hasClass( "ui-icon-arrow-r" ) && !u.hasClass( "ui-icon-arrow-d" ) && u.hasClass( "ui-icon-arrow-u" ), "third item only has class of arrow-u" );
} );
} )( QUnit, jQuery );
