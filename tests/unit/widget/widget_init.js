/*
 * mobile widget unit tests
 */
(function($){
	var widgetInitialized = false;

	module( 'jquery.ui.widget.js' );

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
		$.ui.ignoreContentEnabled = true;

		$.ui.collapsible.prototype.enhanceWithin( $("#ignored") );

		ok( !$( "#ignored-collapsible" ).hasClass( "ui-collapsible" ), "ignored element doesn't have ui-collapsible" );

		$.ui.collapsible.prototype.enhanceWithin( $("#not-ignored") );

		ok( $( "#collapsible" ).hasClass( "ui-collapsible" ), "identical unignored elements are enahanced" );

		$.ui.ignoreContentEnabled = false;
	});

	test( "siblings without ignore parent are enhanced", function() {
		$.ui.ignoreContentEnabled = true;

		$.ui.collapsible.prototype.enhanceWithin( $("#many-ignored") );

		ok( !$( "#many-ignored-collapsible" ).hasClass( "ui-collapsible" ), "sibling ignored element doesn't have ui-collapsible" );
		ok( $( "#many-enhanced-collapsible" ).hasClass( "ui-collapsible" ), "sibling unignored elements are enahanced" );

		$.ui.ignoreContentEnabled = false;
	});
})( jQuery );