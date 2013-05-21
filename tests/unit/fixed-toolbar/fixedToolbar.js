/*
 * mobile Fixed Toolbar unit tests
 */
(function($){
	module('jquery.mobile.toolbar.js');

	test( "Fixed Header Structural Classes are applied correctly", function(){
		//footer
		ok( !$('#classes-test-a').hasClass('ui-header-fixed'), 'An ordinary header should not have fixed classes');
		ok( $('#classes-test-b').hasClass('ui-header-fixed'), 'An header with data-position=fixed should have ui-header-fixed class');
		ok( $('#classes-test-c').hasClass('ui-header-fullscreen'), 'An header with data-position=fixed and data-fullscreen should have ui-header-fullscreen class');

		//footer
		ok( !$('#classes-test-d').hasClass('ui-footer-fixed'), 'An ordinary footer should not have fixed classes');
		ok( $('#classes-test-e').hasClass('ui-footer-fixed'), 'A footer with data-position=fixed should have ui-footer-fixed class"');
		ok( $('#classes-test-f').hasClass('ui-footer-fullscreen'), 'A footer with data-position=fixed and data-fullscreen should have ui-footer-fullscreen class');

		//parent
		ok( $('#classes-test-b').closest( ".ui-page" ).hasClass( "ui-page-header-fixed" ), "Parent page of a fixed header has class ui-page-header-fixed" );
		ok( $('#classes-test-e').closest( ".ui-page" ).hasClass( "ui-page-footer-fixed" ), "Parent page of a fixed footer has class ui-page-header-fixed" );
	});

	test( "User zooming is disabled when the header is visible and disablePageZoom is true", function(){
		$.mobile.zoom.enable();
		var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
		$( ".ui-page-active .ui-header-fixed" ).toolbar("option", "disablePageZoom", true );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
		$( ".ui-page-active .ui-header-fixed" ).toolbar("option", "disablePageZoom", defaultZoom );
		$.mobile.zoom.enable();
	});

	test( "Meta viewport content is restored to previous state, and zooming renabled, after pagebeforehide", function(){
		$.mobile.zoom.enable( true );
		var defaultZoom = $.mobile.toolbar.prototype.options.disablePageZoom;
		$( ".ui-page-active .ui-header-fixed" ).toolbar("option", "disablePageZoom", true );

		$( ".ui-page-active" ).trigger( "pagebeforeshow" );
		ok( !$.mobile.zoom.enabled, "Viewport scaling is disabled before page show." );
		$( ".ui-page-active" ).trigger( "pagebeforehide" );
		ok( $.mobile.zoom.enabled, "Viewport scaling is enabled." );
		$( ".ui-page-active .ui-header-fixed" ).toolbar("option", "disablePageZoom", defaultZoom );
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
