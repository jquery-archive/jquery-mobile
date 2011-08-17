/*
 * mobile select unit tests
 */

(function($){
	var resetHash;

	resetHash = function(timeout){
		$.testHelper.openPage( location.hash.indexOf("#default") >= 0 ? "#" : "#default" );
	};

	// https://github.com/jquery/jquery-mobile/issues/2181
	asyncTest( "dialog sized select should alter the value of its parent select", function(){
		var selectButton, value;

		$.testHelper.pageSequence([
			resetHash,

			function(){
				$.mobile.changePage( "cached.html" );
			},

			function(){
				selectButton = $( "#cached-page-select" ).siblings( 'a' );
				selectButton.click();
			},

			function(){
				ok( $.mobile.activePage.hasClass('ui-dialog'), "the dialog came up" );
				var option = $.mobile.activePage.find( "li a" ).not(":contains('" + selectButton.text() + "')").last();
				value = option.text();
				option.click();
			},

			function(){
				same( value, selectButton.text(), "the selected value is propogated back to the button text" );
				start();
			}
		]);
	});

	// https://github.com/jquery/jquery-mobile/issues/2181
	asyncTest( "dialog sized select should prevent the removal of its parent page from the dom", function(){
		var selectButton, parentPageId;

		expect( 2 );

		$.testHelper.pageSequence([
			resetHash,

			function(){
				$.mobile.changePage( "cached.html" );
			},

			function(){
				selectButton = $.mobile.activePage.find( "#cached-page-select" ).siblings( 'a' );
				parentPageId = $.mobile.activePage.attr( 'id' );
				same( $("#" + parentPageId).length, 1, "establish the parent page exists" );
				selectButton.click();
			},

			function(){
				same( $( "#" + parentPageId).length, 1, "make sure parent page is still there after opening the dialog" );
				$.mobile.activePage.find( "li a" ).last().click();
			},

			start
		]);
	});
})(jQuery);