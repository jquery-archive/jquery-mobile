/*
 * mobile page unit tests
 */
(function($){
	var libName = 'jquery.mobile.page.sections';

	module(libName);

	test( "no auto-generated back button exists on first page", function(){
		ok( !$(".ui-header > :jqmData(rel='back')").length );
	});

	test( "sections inside an ignored container do not enhance", function() {
		var $ignored = $( "#ignored-header" ),  $enhanced = $( "#enhanced-header" );

		$.mobile.ignoreContentEnabled = true;

		$ignored
			.parent()
			.attr( "data-" + $.mobile.ns + "role", "page" )
			.page()
			.trigger( "pagecreate" );
		deepEqual( $ignored.attr( "class" ), undefined, "ignored header has no class" );

		$enhanced
			.parent()
			.attr( "data-" + $.mobile.ns + "role", "page" )
			.page()
			.trigger( "pagecreate" );
		deepEqual( $enhanced.attr( "class" ).indexOf("ui-header"), 0, "enhanced header has classes" );

		$.mobile.ignoreContentEnabled = false;
	});
})(jQuery);
