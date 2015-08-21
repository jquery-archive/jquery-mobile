/*
 * mobile Fixed Toolbar unit tests
 */
( function( QUnit, $ ) {
QUnit.module( 'jquery.mobile.toolbar.js' );

QUnit.test( "Fixed Header Structural Classes are applied correctly", function( assert ) {
	//footer
	assert.ok( !$( '#classes-test-a' ).hasClass( 'ui-header-fixed' ), 'An ordinary header should not have fixed classes' );
	assert.ok( $( '#classes-test-b' ).hasClass( 'ui-header-fixed' ), 'An header with data-position=fixed should have ui-header-fixed class' );
	assert.ok( $( '#classes-test-c' ).hasClass( 'ui-header-fullscreen' ), 'An header with data-position=fixed and data-fullscreen should have ui-header-fullscreen class' );

	//footer
	assert.ok( !$( '#classes-test-d' ).hasClass( 'ui-footer-fixed' ), 'An ordinary footer should not have fixed classes' );
	assert.ok( $( '#classes-test-e' ).hasClass( 'ui-footer-fixed' ), 'A footer with data-position=fixed should have ui-footer-fixed class"' );
	assert.ok( $( '#classes-test-f' ).hasClass( 'ui-footer-fullscreen' ), 'A footer with data-position=fixed and data-fullscreen should have ui-footer-fullscreen class' );

	//parent
	assert.ok( $( '#classes-test-b' ).closest( ".ui-page" ).hasClass( "ui-page-header-fixed" ), "Parent page of a fixed header has class ui-page-header-fixed" );
	assert.ok( $( '#classes-test-e' ).closest( ".ui-page" ).hasClass( "ui-page-footer-fixed" ), "Parent page of a fixed footer has class ui-page-header-fixed" );
} );

QUnit.test( "User zooming is disabled when the header is visible and disablePageZoom is true", function( assert ) {
	$.mobile.zoom.enable();
	var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
	$( ".ui-page-active .ui-header-fixed" ).toolbar( "option", "disablePageZoom", true );

	$( ".ui-page-active" ).trigger( "pagebeforeshow" );
	assert.ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
	$( ".ui-page-active .ui-header-fixed" ).toolbar( "option", "disablePageZoom", defaultZoom );
	$.mobile.zoom.enable();
} );

QUnit.test( "Meta viewport content is restored to previous state, and zooming renabled, after pagebeforehide", function( assert ) {
	$.mobile.zoom.enable( true );
	var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
	$( ".ui-page-active .ui-header-fixed" ).toolbar( "option", "disablePageZoom", true );

	$( ".ui-page-active" ).trigger( "pagebeforeshow" );
	assert.ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
	$( ".ui-page-active" ).trigger( "pagebeforehide" );
	assert.ok( $.mobile.zoom.enabled, "Viewport scaling is enabled." );
	$( ".ui-page-active .ui-header-fixed" ).toolbar( "option", "disablePageZoom", defaultZoom );
	$.mobile.zoom.enable( true );
} );

QUnit.test( "User zooming is not disabled when the header is visible and disablePageZoom is false", function( assert ) {
	$.mobile.zoom.enable( true );
	var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
	$( ".ui-page :jqmData(position='fixed')" ).toolbar( "option", "disablePageZoom", false );

	$( ".ui-page-active" ).trigger( "pagebeforeshow" );

	assert.ok( $.mobile.zoom.enabled, "Viewport scaling is not disabled before page show." );

	$( ".ui-page :jqmData(position='fixed')" ).toolbar( "option", "disablePageZoom", defaultZoom );

	$.mobile.zoom.enable( true );
} );

QUnit.test( "Destroy works properly with external toolbars", function( assert ) {
	var unEnhanced = $( "#external-header" ).clone(),
		destroyed = $( "#external-header" ).toolbar().toolbar( "destroy" );

	assert.ok( $.testHelper.domEqual( destroyed, unEnhanced ),
		"unEnhanced equals destroyed" );
} );
} )( QUnit, jQuery );
