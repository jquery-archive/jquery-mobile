/*
 * mobile widget unit tests
 */
(function($){
	var widgetInitialized = false;

	module( 'jquery.mobile.widget.js' );

	$( document ).on( 'pageinit', "#foo", function(){
		// ordering sensitive here, the value has to be set after the call
		// so that if the widget factory says that its not yet initialized,
		// which is an exception, the value won't be set
		$( "#foo-slider" ).slider( 'refresh' );
		widgetInitialized = true;
	});

	test( "page is enhanced before init is fired", function() {
		ok( widgetInitialized );
	});

	test( "elements within an ignore container are not enhanced when ignoreContentEnabled is true ", function() {
		$.mobile.ignoreContentEnabled = true;

		$.mobile.collapsible.prototype.enhanceWithin( $("#ignored") );

		ok( !$( "#ignored-collapsible" ).hasClass( "ui-collapsible" ), "ignored element doesn't have ui-collapsible" );

		$.mobile.collapsible.prototype.enhanceWithin( $("#not-ignored") );

		ok( $( "#collapsible" ).hasClass( "ui-collapsible" ), "identical unignored elements are enahanced" );

		$.mobile.ignoreContentEnabled = false;
	});

	test( "siblings without ignore parent are enhanced", function() {
		$.mobile.ignoreContentEnabled = true;

		$.mobile.collapsible.prototype.enhanceWithin( $("#many-ignored") );

		ok( !$( "#many-ignored-collapsible" ).hasClass( "ui-collapsible" ), "sibling ignored element doesn't have ui-collapsible" );
		ok( $( "#many-enhanced-collapsible" ).hasClass( "ui-collapsible" ), "sibling unignored elements are enahanced" );

		$.mobile.ignoreContentEnabled = false;
	});
})( jQuery );