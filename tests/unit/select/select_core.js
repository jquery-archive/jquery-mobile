/*
 * mobile select unit tests
 */

(function($){
	var libName = "jquery.mobile.forms.select",
		originalDefaultDialogTrans = $.mobile.defaultDialogTransition,
		originalDefTransitionHandler = $.mobile.defaultTransitionHandler,
		originalGetEncodedText = $.fn.getEncodedText,
		resetHash, closeDialog;

	resetHash = function(timeout){
		$.testHelper.openPage( location.hash.indexOf("#default") >= 0 ? "#" : "#default" );
	};

	closeDialog = function(timeout){
		$.mobile.activePage.find("li a").first().click();
	};

	module(libName, {
		teardown: function(){
			$.mobile.defaultDialogTransition = originalDefaultDialogTrans;
			$.mobile.defaultTransitionHandler = originalDefTransitionHandler;

			$.fn.getEncodedText = originalGetEncodedText;
			window.encodedValueIsDefined = undefined;
		}
	});

	asyncTest( "placeholder correctly gets ui-selectmenu-placeholder class after rebuilding", function(){
		$.testHelper.sequence([
			function(){
				// bring up the optgroup menu
				ok($("#optgroup-and-placeholder-container a").length > 0, "there is in fact a button in the page");
				$("#optgroup-and-placeholder-container a").trigger("click");
			},

			function(){
				//select the first menu item
				$("#optgroup-and-placeholder-menu a:first").click();
			},

			function(){
				ok($("#optgroup-and-placeholder-menu li:first").hasClass("ui-selectmenu-placeholder"), "the placeholder item has the ui-selectmenu-placeholder class");
				start();
			}
		], 1000);
	});

	asyncTest( "firing a click at least 400 ms later on the select screen overlay does close it", function(){
		$.testHelper.sequence([
			function(){
				// bring up the smaller choice menu
				ok($("#select-choice-few-container a").length > 0, "there is in fact a button in the page");
				$("#select-choice-few-container a").trigger("click");
			},

			function(){
				//select the first menu item
				$("#select-choice-few-menu a:first").click();
			},

			function(){
				deepEqual($("#select-choice-few-menu").parent().parent(".ui-selectmenu-hidden").length, 1);
				start();
			}
		], 1000);
	});

	asyncTest( "a large select menu should use the default dialog transition", function(){
		var select;

		$.testHelper.pageSequence([
			resetHash,

			function(timeout){
				select = $("#select-choice-many-container-1 a");

				//set to something else
				$.mobile.defaultTransitionHandler = $.testHelper.decorate({
					fn: $.mobile.defaultTransitionHandler,

					before: function(name){
						deepEqual(name, $.mobile.defaultDialogTransition);
					}
				});

				// bring up the dialog
				select.trigger("click");
			},

			closeDialog,

			start
		]);
	});

	asyncTest( "selecting an item from a dialog sized custom select menu leaves no dialog hash key", function(){
		var dialogHashKey = "ui-state=dialog";

		$.testHelper.pageSequence([
			resetHash,

			function(timeout){
				$("#select-choice-many-container-hash-check a").click();
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) > -1);
				closeDialog();
			},

			function(){
				deepEqual(location.hash.indexOf(dialogHashKey), -1);
				start();
			}
		]);
	});

	asyncTest( "dialog sized select menu opened many times remains a dialog", function(){
		var dialogHashKey = "ui-state=dialog",

				openDialogSequence = [
					resetHash,

					function(){
						$("#select-choice-many-container-many-clicks a").click();
					},

					function(){
						ok(location.hash.indexOf(dialogHashKey) > -1, "hash should have the dialog hash key");
						closeDialog();
					}
				],

				sequence = openDialogSequence.concat(openDialogSequence).concat([start]);

		$.testHelper.sequence(sequence, 1000);
	});

	test( "make sure the label for the select gets the ui-select class", function(){
		ok( $( "#native-select-choice-few-container label" ).hasClass( "ui-select" ), "created label has ui-select class" );
	});

	module("Non native menus", {
		setup: function() {
			$.mobile.selectmenu.prototype.options.nativeMenu = false;
		},
		teardown: function() {
			$.mobile.selectmenu.prototype.options.nativeMenu = true;
		}
	});

	test( "a popup containing a non-native select will cause the select to be rendered as native", function() {
		ok( $( "#select-choice-inside-popup-menu" ).length === 0, "non-native select inside popup has no generated menu" );
	});

	asyncTest( "a large select option should not overflow", function(){
		// https://github.com/jquery/jquery-mobile/issues/1338
		var menu, select;

		$.testHelper.sequence([
			resetHash,

			function(){
				select = $("#select-long-option-label");
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

	asyncTest( "focus is transferred to a menu item when the menu is opened",function() {
		var select, menu, button;

		expect( 1 );

		$.testHelper.sequence([
			function() {
				select = $( "#select-choice-menu-focus-test" );
				menu = $( "#select-choice-menu-focus-test-menu" );
				button = select.find( "a" );
				button.trigger( "click" );
			},

			function() {
				ok( $( document.activeElement ).parents( "#select-choice-menu-focus-test-menu" ).length > 0, "item in open select menu (" + menu.length + ") has focus" );
				$(".ui-popup-screen:not(.ui-screen-hidden)").trigger( "click" );
			},

			function() {
				start();
			}
		], 5000);
	});

	asyncTest( "using custom refocuses the button after close", function() {
		var select, button, triggered = false;

		expect( 1 );

		$.testHelper.sequence([
			resetHash,

			function() {
				select = $("#select-choice-focus-test");
				button = select.find( "a" );
				button.trigger( "click" );
			},

			function() {
				// NOTE this is called twice per triggered click
				button.focus(function() {
					triggered = true;
				});

				$(".ui-popup-screen:not(.ui-screen-hidden)").trigger("click");
			},

			function(){
				ok(triggered, "focus is triggered");
				start();
			}
		], 1500);
	});

	asyncTest( "selected items are highlighted", function(){
		$.testHelper.sequence([
			resetHash,

			function(){
				// bring up the smaller choice menu
				ok($("#select-choice-few-container a").length > 0, "there is in fact a button in the page");
				$("#select-choice-few-container a").trigger("click");
			},

			function(){
				var firstMenuChoice = $("#select-choice-few-menu li:first");
				ok( firstMenuChoice.hasClass( $.mobile.activeBtnClass ),
						"default menu choice has the active button class" );

				$("#select-choice-few-menu a:last").click();
			},

			function(){
				// bring up the menu again
				$("#select-choice-few-container a").trigger("click");
			},

			function(){
				var lastMenuChoice = $("#select-choice-few-menu li:last");
				ok( lastMenuChoice.hasClass( $.mobile.activeBtnClass ),
						"previously slected item has the active button class" );

				// close the dialog
				lastMenuChoice.find( "a" ).click();
			},

			start
		], 1000);
	});

	test( "enabling and disabling", function(){
		var select = $( "select" ).first(), button;

		button = select.siblings( "a" ).first();

		select.selectmenu( 'disable' );
		deepEqual( select.attr('disabled'), "disabled", "select is disabled" );
		ok( button.hasClass("ui-disabled"), "disabled class added" );
		deepEqual( button.attr('aria-disabled'), "true", "select is disabled" );
		deepEqual( select.selectmenu( 'option', 'disabled' ), true, "disbaled option set" );

		select.selectmenu( 'enable' );
		deepEqual( select.attr('disabled'), undefined, "select is disabled" );
		ok( !button.hasClass("ui-disabled"), "disabled class added" );
		deepEqual( button.attr('aria-disabled'), "false", "select is disabled" );
		deepEqual( select.selectmenu( 'option', 'disabled' ), false, "disbaled option set" );
	});

	asyncTest( "adding options and refreshing a custom select changes the options list", function(){
		var select = $( "#custom-refresh-opts-list" ),
      button = select.siblings( "a" ).find( ".ui-btn-inner" ),
      text = "foo";

		$.testHelper.sequence([
			// bring up the dialog
			function() {
				button.click();
			},

			function() {
				deepEqual( $( ".ui-popup-container:not(.ui-selectmenu-hidden) .ui-selectmenu ul" ).text(), "default" );
				$( ".ui-popup-screen" ).click();
			},

			function() {
				select.find( "option" ).remove(); //remove the loading message
				select.append('<option value="1">' + text + '</option>');
				select.selectmenu( 'refresh' );
			},

			function() {
				button.click();
			},

			function() {
				deepEqual( $( ".ui-popup-container:not(.ui-selectmenu-hidden) .ui-selectmenu ul" ).text(), text );
				$( ".ui-popup-screen" ).click();
			},

			start
		], 500);
	});

	test( "theme defined on select is used", function(){
		var select = $("select#non-parent-themed");

		ok( select.siblings( "a" ).hasClass("ui-btn-up-" + select.jqmData('theme')));
	});

	test( "select without theme defined inherits theme from parent", function() {
		var select = $("select#parent-themed");

		ok( select
			.siblings( "a" )
			.hasClass("ui-btn-up-" + select.parents(":jqmData(role='page')").jqmData('theme')));
	});

	// issue #2547
	test( "custom select list item links have encoded option text values", function() {
		$( "#encoded-option" ).data( 'selectmenu' )._buildList();
		deepEqual(window.encodedValueIsDefined, undefined);
	});

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "select elements in the keepNative set shouldn't be enhanced", function() {
		ok( !$("#keep-native").parent().is("div.ui-btn") );
	});

	asyncTest( "dialog size select title should match the label", function() {
		var $select = $( "#select-choice-many-1" ),
			$label = $select.parent().siblings( "label" ),
			$button = $select.siblings( "a" );

		$.testHelper.pageSequence([
			function() {
				$button.click();
			},

			function() {
				deepEqual($.mobile.activePage.find( ".ui-title" ).text(), $label.text());
				window.history.back();
			},

			start
		]);
	});

	asyncTest( "dialog size select title should match the label when changed after the dialog markup is added to the DOM", function() {
		var $select = $( "#select-choice-many-1" ),
			$label = $select.parent().siblings( "label" ),
			$button = $select.siblings( "a" );

		$label.text( "foo" );

		$.testHelper.pageSequence([
			function() {
				$label.text( "foo" );
				$button.click();
			},

			function() {
				deepEqual($.mobile.activePage.find( ".ui-title" ).text(), $label.text());
				window.history.back();
			},

			start
		]);
	});

	test( "a disabled custom select should still be enhanced as custom", function() {
		$("#select-disabled-enhancetest").selectmenu("enable").selectmenu("open");

		var menu = $(".ui-selectmenu").not( ".ui-selectmenu-hidden" );
		ok( menu.text().indexOf("disabled enhance test") > -1, "the right select is showing" );
	});

	test( "selected option classes are persisted to the button text", function() {
		var $select = $( "#select-preserve-option-class" ),
			selectedOptionClasses = $select.find( "option:selected" ).attr( "class" );

		deepEqual( $select.parent().find( ".ui-btn-text > span" ).attr( "class" ), selectedOptionClasses );
	});

	test( "multiple select option classes are persisted from the first selected option to the button text", function() {
		var $select = $( "#select-preserve-option-class-multiple" ),
			selectedOptionClasses = $select.find( "option:selected" ).first().attr( "class" );

		deepEqual( $select.parent().find( ".ui-btn-text > span" ).attr( "class" ), selectedOptionClasses );
	});

	test( "multiple select text values are aggregated in the button text", function() {
		var $select = $( "#select-aggregate-option-text" );

		deepEqual( "Standard: 7 day, Rush: 3 days", $select.parent().find( ".ui-btn-text" ).text() );
	});
})(jQuery);
