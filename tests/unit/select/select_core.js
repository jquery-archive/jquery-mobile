/*
 * mobile select unit tests
 */

(function($){
	var libName = "jquery.mobile.forms.select.js";

	$(document).bind("mobileinit", function(){
		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	});

	module(libName, {
		teardown: function(){ location.hash = ""; }
	});
	
	asyncTest( "a large select menu should use the default dialog transition", function(){
		var select = $("#select-choice-many-container-1 a"),
			prevDefault = $.mobile.defaultDialogTransition;
			
			//set to something else	
			$.mobile.defaultDialogTransition = "fooz";
		
		$.testHelper.sequence([
			function(){
				// bring up the dialog
				select.trigger("click");
				ok( $("#select-choice-many-1-menu").closest(".ui-page").hasClass( $.mobile.defaultDialogTransition ) );
				$("#select-choice-many-1").selectmenu("close");
			},
			
			function(){
				start();
			}
		], 500);
	});

	asyncTest( "a large select menu should come up in a dialog many times", function(){
		var menu, select = $("#select-choice-many-container a");

		$.testHelper.sequence([
			function(){
				// bring up the dialog
				select.trigger("click");
			},

			function(){
				menu = $("#select-choice-many-menu");
				same(menu.closest('.ui-dialog').length, 1);
			},

			function(){
				// select and close the dialog
				$("#select-choice-many-menu").selectmenu("close");
			},

			function(){
				//bring up the dialog again
				select.trigger("click");
			},

			function(){
				same(menu.closest('.ui-dialog').length, 1);
					$("#select-choice-many-menu").selectmenu("close");
			},
			function(){
				start();
			}
		], 500);
	});

	asyncTest( "custom select menu always renders screen from the left", function(){
		expect( 1 );
		var select = $("ul#select-offscreen-menu");

		$("#select-offscreen-container a").trigger("click");

		setTimeout(function(){
			ok(select.offset().left >= 30);
			start();
		}, 1000);
	});

	asyncTest( "selecting an item from a dialog sized custom select menu leaves no dialog hash key", function(){
		var dialogHashKey = "ui-state=dialog";

		$.testHelper.pageSequence([
			function(){
				$("#select-choice-many-container-hash-check a").trigger("click");
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) > -1);
				$(".ui-page-active li:first a").trigger("click");
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) == -1);
				start();
			}
		]);
	});

 	asyncTest( "dialog sized select menu opened many times remains a dialog", function(){
		var dialogHashKey = "ui-state=dialog",

				openDialogSequence = [
					function(){
						$("#select-choice-many-container-many-clicks a").trigger("vclick");
					},

					function(){
						ok(location.hash.indexOf(dialogHashKey) > -1, "hash should have the dialog hash key");
						$(".ui-page-active li").trigger("click");
					}
				],

				sequence = openDialogSequence.concat(openDialogSequence).concat([start]);

		$.testHelper.sequence(sequence, 1000);
	});

	module("Non native menus", {
		setup: function() {
			$.mobile.selectmenu.prototype.options.nativeMenu = false;
		},
		teardown: function() {
			$.mobile.selectmenu.prototype.options.nativeMenu = true;
		}
	});

	asyncTest( "a large select option should not overflow", function(){
		// https://github.com/jquery/jquery-mobile/issues/1338
		var menu, select = $("#select-long-option-label");

		$.testHelper.sequence([
			function(){
				// bring up the dialog
				select.trigger("click");
			},

			function() {
				menu = $(".ui-selectmenu-list");

				equal(menu.width(), menu.find("li:nth-child(2) .ui-btn-text").width(), "ui-btn-text element should not overflow")
				start();
			}
		], 500);

	});
})(jQuery);
