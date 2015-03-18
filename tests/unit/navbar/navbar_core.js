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

		ok( !$ignored.hasClass( "ui-grid" ), "ignored list doesn't have the grid theme" );
		deepEqual( $enhanced.attr( "class" ).indexOf("ui-grid"), 0, "enhanced list has the grid theme" );
		$.mobile.ignoreContentEnabled = false;
	});

	test( "classes are correctly assigned", function() {
		var $ul = $('#enhanced-classes'),
			r = $ul.find("li").eq(0).find("a"),
			d = $ul.find("li").eq(1).find("a"),
			u = $ul.find("li").eq(2).find("a");

		ok(r.hasClass("ui-icon-arrow-r") && !r.hasClass("ui-icon-arrow-d") && !r.hasClass("ui-icon-arrow-u"),"first item only has class of arrow-r");
		ok(!d.hasClass("ui-icon-arrow-r") && d.hasClass("ui-icon-arrow-d") && !d.hasClass("ui-icon-arrow-u"),"second item only has class of arrow-d");
		ok(!u.hasClass("ui-icon-arrow-r") && !u.hasClass("ui-icon-arrow-d") && u.hasClass("ui-icon-arrow-u"),"third item only has class of arrow-u");
	});
})(jQuery);