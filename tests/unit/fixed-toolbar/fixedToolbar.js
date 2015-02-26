/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
	module( "jquery.mobile.toolbar.js" );

	test( "Fixed Header Structural Classes are applied correctly", function( assert ){
		//footer
		assert.lacksClasses( $( "#classes-test-a" ), "ui-toolbar-header-fixed", 
			"An ordinary header should not have fixed classes" );
		assert.hasClasses( $( "#classes-test-b" ), "ui-toolbar-header-fixed", 
			"A header with data-position=fixed should have ui-toolbar-header-fixed class" );
		assert.hasClasses( $( "#classes-test-c" ), "ui-toolbar-header-fullscreen",
			"A header with =fixed and data-fullscreen gets ui-toolbar-header-fullscreen class" );

		//footer
		assert.lacksClasses( $( "#classes-test-d" ), "ui-toolbar-footer-fixed", 
			"An ordinary footer should not have fixed classes");
		assert.hasClasses( $( "#classes-test-e" ), "ui-toolbar-footer-fixed", 
			"A footer with data-position=fixed should have ui-toolbar-footer-fixed class" );
		assert.hasClasses( $( "#classes-test-f" ), "ui-toolbar-footer-fullscreen", 
			"A footer with =fixed and data-fullscreen gets ui-toolbar-footer-fullscreen class" );

		//parent
		assert.hasClasses( $( "#classes-test-b" ).closest( ".ui-page" ),
			"ui-page-header-fixed", 
			"Parent page of a fixed header has class ui-page-header-fixed" );
		assert.hasClasses( $( "#classes-test-e" ).closest( ".ui-page" ),
			"ui-page-footer-fixed", 
			"Parent page of a fixed footer has class ui-page-header-fixed" );
	});

	test( "User zooming is disabled when the header is visible and disablePageZoom is true", function(){
		$.mobile.zoom.enable();
		var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
		$( ".ui-page-active .ui-toolbar-header-fixed" ).toolbar("option", "disablePageZoom", true );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
		$( ".ui-page-active .ui-toolbar-header-fixed" ).toolbar("option", "disablePageZoom", defaultZoom );
		$.mobile.zoom.enable();
	});

	test( "Meta viewport content is restored to previous state, and zooming renabled, after pagebeforehide", function(){
		$.mobile.zoom.enable( true );
		var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
		$( ".ui-page-active .ui-toolbar-header-fixed" ).toolbar("option", "disablePageZoom", true );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
		$( ".ui-page-active" ).trigger( "pagebeforehide" );
		ok( $.mobile.zoom.enabled, "Viewport scaling is enabled." );
		$( ".ui-page-active .ui-toolbar-header-fixed" ).toolbar("option", "disablePageZoom", defaultZoom );
		$.mobile.zoom.enable( true );
	});

	test( "User zooming is not disabled when the header is visible and disablePageZoom is false", function(){
		$.mobile.zoom.enable( true );
		var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
		$( ".ui-page :jqmData(position='fixed')" ).toolbar( "option", "disablePageZoom", false );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );

		ok( $.mobile.zoom.enabled, "Viewport scaling is not disabled before page show." );

		$( ".ui-page :jqmData(position='fixed')" ).toolbar( "option", "disablePageZoom", defaultZoom );

		$.mobile.zoom.enable( true );
	});
})(jQuery);
