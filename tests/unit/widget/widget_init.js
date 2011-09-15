/*
 * mobile widget unit tests
 */
(function($){
	var initFired = false;

	module( 'jquery.mobile.widget.js' );

	$( "#foo" ).live( 'pageinit', function(){
		initFired = true;
	});

	test( "widget init event is fired after markup enhancement has taken place", function() {
		ok( initFired );
	});
})( jQuery );