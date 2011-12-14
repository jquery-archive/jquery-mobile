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

	asyncTest( "dialog sized select shouldn't rebind its parent page remove handler when closing, if the parent page domCache option is true", function(){
		expect( 3 );

		$.testHelper.pageSequence([
			resetHash,

			function(){
				$.mobile.changePage( "cached-dom-cache-true.html" );
			},

			function(){
				$.mobile.activePage.find( "#domcache-page-select" ).siblings( 'a' ).click();
			},

			function(){
				ok( $.mobile.activePage.hasClass('ui-dialog'), "the dialog came up" );
				$.mobile.activePage.find( "li a" ).last().click();
			},

			function(){
				ok( $.mobile.activePage.is( "#dialog-select-parent-domcache-test" ), "the dialog closed" );
				$.mobile.changePage( $( "#default" ) );
			},

			function(){
				same( $("#dialog-select-parent-domcache-test").length, 1, "make sure the select parent page is still cached in the dom after changing page" );
				start();
			}
		]);
	});

	asyncTest( "menupage is removed when the parent page is removed", function(){
		var dialogCount = $(":jqmData(role='dialog')").length;

		$.testHelper.pageSequence([
			resetHash,

			function(){

				$.mobile.changePage( "uncached-dom-cached-false.html" );
			},

			function(){
				same( $(":jqmData(role='dialog')").length, dialogCount + 1 );
				window.history.back();
			},

			function() {
				same( $(":jqmData(role='dialog')").length, dialogCount );
				start();
			}
		]);
	});
})(jQuery);