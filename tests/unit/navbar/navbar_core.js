/*
 * mobile navbar unit tests
 */
(function($){
	test( "navbar button gets active button class when clicked", function() {
		var link = $("#disabled-btn-click a:not(.ui-disabled)").first();

		link.click();
		ok( link.hasClass($.mobile.activeBtnClass), "link has active button class" );
	});

	test( "disabled navbar button doesn't add active button class when clicked", function() {
		var link = $("#disabled-btn-click a.ui-disabled").first();

		link.click();
		ok( !link.hasClass($.mobile.activeBtnClass), "link doesn't have active button class" );
	});

	test( "grids inside an ignored container do not enhance", function() {
		var $ignored = $( "#ignored-grid" ), $enhanced = $( "#enhanced-grid" );

		$.mobile.ignoreContentEnabled = true;

		$("#foo").trigger( "create" );

		deepEqual( $ignored.attr( "class" ), undefined, "ignored list doesn't have the grid theme" );
		deepEqual( $enhanced.attr( "class" ).indexOf("ui-grid"), 0, "enhanced list has the grid theme" );

		$.mobile.ignoreContentEnabled = false;
	});
})(jQuery);