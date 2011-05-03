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

	asyncTest( "a large select menu should come up in a dialog many times", function(){
		var menu, select = $("#select-choice-many-container a");

		$.testHelper.sequence([
			function(){
				// bring up the dialog
				select.trigger("click");
			},

			function(){
				menu = $("#select-choice-many-menu");
				same(menu.parents('.ui-dialog').length, 1);
			},

			function(){
				// select and close the dialog
				menu.parents('ui-dialog').find("span.ui-icon-delete").click();
			},

			function(){
				//bring up the dialog again
				select.trigger("click");
			},

			function(){
				same(menu.parents('.ui-dialog').length, 1);
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

		$.testHelper.sequence([
			function(){
				$("#select-choice-many-container-hash-check a").trigger("click");
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) > -1);
				$(".ui-page-active li").trigger("click");
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) == -1);
				start();
			}
		], 500);
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

})(jQuery);
