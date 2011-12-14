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
})(jQuery);