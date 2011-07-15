/*
 * mobile select unit tests
 */

(function($){
	var libName = "jquery.mobile.forms.select.js",
			originalDefaultDialogTrans = $.mobile.defaultDialogTransition,
			originalDefTransitionHandler = $.mobile.defaultTransitionHandler;

	module(libName, {
		teardown: function(){
			location.hash = "";
			$.mobile.defaultDialogTransition = originalDefaultDialogTrans;
			$.mobile.defaultTransitionHandler = originalDefTransitionHandler;
		}
	});

	asyncTest( "a large select menu should use the default dialog transition", function(){
		var select = $("#select-choice-many-container-1 a");

		//set to something else

		$.mobile.defaultTransitionHandler = $.testHelper.decorate({
			fn: $.mobile.defaultTransitionHandler,

			before: function(name){
				same(name, $.mobile.defaultDialogTransition);
			}
		});

    setTimeout(function(){
		$.testHelper.pageSequence([
			function(){
				// bring up the dialog
				select.trigger("click");
			},

			function(){
        $.mobile.activePage.find(".ui-header .ui-btn").click();
			},

			function(){
				start();
			}
		]);
    }, 1000);
	});

	asyncTest( "a large select menu should come up in a dialog many times", function(){
		var menu, select = $("#select-choice-many-container a");

		$.testHelper.pageSequence([
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
				$.mobile.activePage.find(".ui-header .ui-btn").click();
			},

			function(){
				//bring up the dialog again
				select.trigger("click");
			},

			function(){
				$.mobile.activePage.find(".ui-header .ui-btn").click();
			},

			function(){
				start();
			}
		]);
	});

	asyncTest( "custom select menu always renders screen from the left", function(){
		expect( 1 );
		var select = $("ul#select-offscreen-menu");

		$.testHelper.sequence([
			function(){
				$("#select-offscreen-container a").trigger("click");
			},

			function(){
				ok(select.offset().left >= 30);
				start();
			}
		], 1000);
	});

	asyncTest( "selecting an item from a dialog sized custom select menu leaves no dialog hash key", function(){
		var dialogHashKey = "ui-state=dialog";

		$.testHelper.pageSequence([
			function(){
				$("#select-choice-many-container-hash-check a").click();
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) > -1);
				$.mobile.activePage.find(".ui-header .ui-btn").click();
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
						$("#select-choice-many-container-many-clicks a").click();
					},

					function(){
						ok(location.hash.indexOf(dialogHashKey) > -1, "hash should have the dialog hash key");
						$(".ui-page-active li").click();
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

				equal(menu.width(), menu.find("li:nth-child(2) .ui-btn-text").width(), "ui-btn-text element should not overflow");
				start();
			}
		], 500);

	});
})(jQuery);
