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
})( jQuery );