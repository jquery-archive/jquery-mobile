/*
 * mobile buttonMarkup tests
 */
(function($){
	module("jquery.mobile.buttonMarkup.js");

	test( "control group buttons should be enhanced inside a footer", function(){
		var group, linkCount;

		group = $("#control-group-footer");
		linkCount = group.find( "a" ).length;

		same( group.find("a.ui-btn").length, linkCount, "all 4 links should be buttons");
		same( group.find("a > span.ui-corner-left").length, 1, "only 1 left cornered button");
		same( group.find("a > span.ui-corner-right").length, 1, "only 1 right cornered button");
		same( group.find("a > span:not(.ui-corner-left):not(.ui-corner-right)").length, linkCount - 2, "only 2 buttons are cornered");
	});
})(jQuery);
