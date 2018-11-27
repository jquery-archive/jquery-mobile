/*
 * Mobile Fixed Toolbar unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

	QUnit.module( "jquery.mobile.toolbar.js" );

	var pageActiveFixedHeader = $( ".ui-page-active .ui-toolbar-header-fixed" );
	QUnit.test( "markup structure", function( assert ) {
		var classesB = $( "#classes-test-b" ),
			classesE = $( "#classes-test-e" );

		// Footer
		assert.lacksClasses( $( "#classes-test-a" ), "ui-toolbar-header-fixed",
			"An ordinary header should not have fixed classes" );
		assert.hasClasses( classesB, "ui-toolbar-header-fixed",
			"A header with data-position=fixed should have ui-toolbar-header-fixed class" );
		assert.hasClasses( $( "#classes-test-c" ), "ui-toolbar-header-fullscreen",
			"A header with =fixed and data-fullscreen gets ui-toolbar-header-fullscreen class" );

		// Footer
		assert.lacksClasses( $( "#classes-test-d" ), "ui-toolbar-footer-fixed",
			"An ordinary footer should not have fixed classes" );
		assert.hasClasses( classesE, "ui-toolbar-footer-fixed",
			"A footer with data-position=fixed should have ui-toolbar-footer-fixed class" );
		assert.hasClasses( $( "#classes-test-f" ), "ui-toolbar-footer-fullscreen",
			"A footer with =fixed and data-fullscreen gets ui-toolbar-footer-fullscreen class" );

		// Parent
		assert.hasClasses( classesB.closest( ".ui-page" ),
			"ui-toolbar-page-header-fixed",
			"Parent page of a fixed header has class ui-page-header-fixed" );
		assert.hasClasses( classesE.closest( ".ui-page" ),
			"ui-toolbar-page-footer-fixed",
			"Parent page of a fixed footer has class ui-page-header-fixed" );
	} );

	QUnit.test(
		"User zooming is disabled when the header is visible and disablePageZoom is true",
		function( assert ) {
			$.mobile.zoom.enable();
			var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
			pageActiveFixedHeader.toolbar( "option", "disablePageZoom", true );

			$( ".ui-page-active" ).trigger( "pagebeforeshow" );
			assert.ok( !$.mobile.zoom.enabled,
				"Viewport scaling is disabled before page show." );
			pageActiveFixedHeader
				.toolbar( "option", "disablePageZoom", defaultZoom );
			$.mobile.zoom.enable();
	} );

	QUnit.test(
		"Meta viewport content is restored to previous state, and zooming renabled, " +
		"after pagebeforehide",
		function( assert ) {
			$.mobile.zoom.enable( true );
			var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
			pageActiveFixedHeader.toolbar( "option", "disablePageZoom", true );

			$( ".ui-page-active" ).trigger( "pagebeforeshow" );
			assert.ok( !$.mobile.zoom.enabled,
				"Viewport scaling is disabled before page show." );
			$( ".ui-page-active" ).trigger( "pagebeforehide" );
			assert.ok( $.mobile.zoom.enabled, "Viewport scaling is enabled." );
			pageActiveFixedHeader.toolbar( "option", "disablePageZoom", defaultZoom );
			$.mobile.zoom.enable( true );
	} );

	QUnit.test(
		"User zooming is not disabled when the header is visible and disablePageZoom is false",
		function( assert ) {
			$.mobile.zoom.enable( true );
			var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
			$( ".ui-page :jqmData(position='fixed')" )
				.toolbar( "option", "disablePageZoom", false );

			$( ".ui-page-active" ).trigger( "pagebeforeshow" );

			assert.ok( $.mobile.zoom.enabled,
				"Viewport scaling is not disabled before page show." );

			$( ".ui-page :jqmData(position='fixed')" )
				.toolbar( "option", "disablePageZoom", defaultZoom );

			$.mobile.zoom.enable( true );
	} );
} );
