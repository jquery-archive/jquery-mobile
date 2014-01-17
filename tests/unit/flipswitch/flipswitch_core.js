/*
 * mobile flipswitch unit tests
 */
(function($){

	test( "checkbox based flipswitch is enhanced", function() {
		ok( $("#flip-checkbox").parent().hasClass("ui-flipswitch"), "should be enhanced" );
	});
	test( "select based flipswitch is enhanced", function() {
		ok( $("#flip-select").parent().hasClass("ui-flipswitch"), "should be enhanced" );
	});
	test( "checkbox based flipswitch is disabled", function() {
		ok( $("#flip-checkbox-disabled").parent().hasClass("ui-state-disabled"), "should be disabled" );
	});
	test( "select based flipswitch is disabled", function() {
		ok( $("#flip-select-disabled").parent().hasClass("ui-state-disabled"), "should be disabled" );
	});
	test( "checkbox based flipswitch is active", function() {
		ok( $("#flip-checkbox-active").parent().hasClass("ui-flipswitch-active"), "should be active" );
	});
	test( "select based flipswitch is active", function() {
		ok( $("#flip-select-second-option").parent().hasClass("ui-flipswitch-active"), "should be active" );
	});
	test( "checkbox based flipswitch is mini", function() {
		ok( $("#flip-checkbox-mini").parent().hasClass("ui-mini"), "should be mini" );
	});
	test( "select based flipswitch is mini", function() {
		ok( $("#flip-select-mini").parent().hasClass("ui-mini"), "should be mini" );
	});
	test( "checkbox based flipswitch should have theme inherit", function() {
		ok( $("#flip-checkbox-active").parent().hasClass("ui-bar-inherit"), "should be inherit theme" );
	});
	test( "select based flipswitch should have theme inherit", function() {
		ok( $("#flip-select-second-option").parent().hasClass("ui-bar-inherit"), "should be inherit theme" );
	});
	test( "checkbox based flipswitch is toggled on click", function() {
		ok( !$("#flip-checkbox").parent().hasClass("ui-flipswitch-active"), "should not be active" );
		$("#flip-checkbox").parent().click()
		ok( $("#flip-checkbox").parent().hasClass("ui-flipswitch-active"), "should be active" );
	});
	test( "select based flipswitch is toggled on click", function() {
		$("#flip-select").click();
		ok( $("#flip-select").parent().hasClass("ui-flipswitch-active"), "should be active" );
	});
	test( "checkbox based flipswitch is not active after left swipe", function() {
		$("#flip-checkbox").trigger("swipeleft");
		ok( !$("#flip-checkbox").parent().hasClass("ui-flipswitch-active"), "should be active" );
	});
	test( "select based flipswitch is not active after left swipe", function() {
		$("#flip-select").trigger("swipeleft");
		ok( !$("#flip-select").parent().hasClass("ui-flipswitch-active"), "should be active" );
	});
	test( "checkbox based flipswitch is active after right swipe", function() {
		$("#flip-checkbox").trigger("swiperight");
		ok( $("#flip-checkbox").parent().hasClass("ui-flipswitch-active"), "should not be active" );
	});
	test( "select based flipswitch is active after right swipe", function() {
		$("#flip-select").trigger("swiperight");
		ok( $("#flip-select").parent().hasClass("ui-flipswitch-active"), "should not be active" );
	});
	test( "checkbox based flipswitch is untabbable", function() {
		deepEqual( parseInt( $( "#flip-checkbox" ).attr( "tabindex" ) ), -1,
			"tabindex is set to -1" );
	});
	test( "select based flipswitch is untabbable", function() {
		deepEqual( parseInt( $( "#flip-select" ).attr( "tabindex" ) ), -1,
			"tabindex is set to -1" );
	});

})( jQuery );
