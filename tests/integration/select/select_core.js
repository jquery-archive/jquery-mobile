/*
 * mobile select unit tests
 */

(function($){
	var libName = "jquery.ui.forms.select",
		originalDefaultDialogTrans = $.ui.defaultDialogTransition,
		originalDefTransitionHandler = $.ui.defaultTransitionHandler,
		originalGetEncodedText = $.fn.getEncodedText,
		resetHash, closeDialog;

	resetHash = function(timeout){
		$.testHelper.openPage( location.hash.indexOf("#default") >= 0 ? "#" : "#default" );
	};

	closeDialog = function(timeout){
		$.ui.activePage.find("li a").first().click();
	};

	// Check if two chunks of DOM are identical
	var domEqual = function( l, r ) {
		var idx, idxAttr, lattr, rattr;

		// If the lengths of the two jQuery objects are different, the DOM
		// must be different so don't bother checking
		if ( l.length === r.length ) {
			// Otherwise, examine each element
			for ( idx = 0 ; idx < l.length ; idx++ ) {
				l = l.eq( idx ); r = r.eq( idx );

				// If the tagName is different the DOM must be different
				if ( l[ 0 ].tagName !== r[ 0 ].tagName ){
					return false;
				}

				// Otherwise, check the attributes
				if ( l[ 0 ].attributes.length === r[ 0 ].attributes.length ) {
					// convert attributes array to dictionary, because the order
					// of the attributes may be different between l and r
					lattr = {};
					rattr = {};
					for ( idxAttr = 0 ; idxAttr < l[ 0 ].attributes.length ; idxAttr++ ) {
						lattr[ l[ 0 ].attributes[ idxAttr ].name ] = l[ 0 ].attributes[ idxAttr ].value;
						rattr[ r[ 0 ].attributes[ idxAttr ].name ] = r[ 0 ].attributes[ idxAttr ].value;
					}

					// Check if each attribute in lattr has the same value in rattr
					for ( idxAttr in lattr ) {
						if ( rattr[ idxAttr ] !== lattr[ idxAttr ] ) {
							return false;
						}
					}

					// If so, compare the children of l and r recursively
					if ( !domEqual( $( l[ 0 ] ).children(), $( r[ 0 ] ).children() ) ) {
						return false;
					}
				} else {
					return false;
				}
				l = l.end(); r = r.end();
			}
			if ( idx === l.length ) {
				return true;
			}
		}

		return false;
	};

	var homeWithSearch = $.ui.path.parseUrl(location.pathname).pathname + location.search;

	module(libName, {
		setup: function() {
			$.ui.navigate.history.stack = [];
			$.ui.navigate.history.activeIndex = 0;
			$.testHelper.navReset( homeWithSearch );
		},

		teardown: function(){
			$.ui.defaultDialogTransition = originalDefaultDialogTrans;
			$.ui.defaultTransitionHandler = originalDefTransitionHandler;

			$.fn.getEncodedText = originalGetEncodedText;
			window.encodedValueIsDefined = undefined;
		}
	});

	asyncTest( "placeholder correctly gets ui-screen-hidden class after rebuilding", function() {
		$.testHelper.sequence( [
			function() {
				// bring up the optgroup menu
				ok( $( "#optgroup-and-placeholder-container a" ).length > 0, "there is in fact a button in the page" );
				$( "#optgroup-and-placeholder-container a" ).trigger( "click" );
			},

			function() {
				//select the first menu item
				$( "#optgroup-and-placeholder-menu li:not(.ui-screen-hidden) a:first" ).click();
			},

			function() {
				ok( $( "#optgroup-and-placeholder-menu li:first" ).hasClass( "ui-screen-hidden" ), "the placeholder item has the ui-screen-hidden class" );
				start();
			}
		], 1000);
	});

	asyncTest( "firing a click at least 400 ms later on the select screen overlay does close it", function(){
		expect( 3 );

		var prefix = ".firingAClick";
		$.testHelper.detailedEventCascade([
			function(){
				// bring up the smaller choice menu
				ok($("#select-choice-few-container a").length > 0, "there is in fact a button in the page");
				$("#select-choice-few-container a").trigger("click");
			},

			{
				popupafteropen: { src: $( "#select-choice-few\\.dotTest-listbox" ), event: "popupafteropen" + prefix },
				timeout: { length: 1000 }
			},

			function( result ){
				deepEqual( result.popupafteropen.timedOut, false, "Did receive 'popupafteropen'" );
				//select the first menu item
				$("#select-choice-few\\.dotTest-menu a:first").click();
			},

			{
				timeout: { length: 1000 }
			},

			function(){
				deepEqual($("#select-choice-few\\.dotTest-menu").parent().parent(".ui-popup-hidden").length, 1);
				start();
			}
		]);
	});

	asyncTest( "a large select menu should use the default dialog transition", function(){
		var select;

		$.testHelper.pageSequence([
			resetHash,

			function(timeout){
				select = $("#select-choice-many-container-1 a");

				//set to something else
				$.ui.defaultTransitionHandler = $.testHelper.decorate({
					fn: $.ui.defaultTransitionHandler,

					before: function(name){
						deepEqual(name, $.ui.defaultDialogTransition);
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

	module("Non native menus", {
		setup: function() {
			$.ui.selectmenu.prototype.options.nativeMenu = false;
		},
		teardown: function() {
			$.ui.selectmenu.prototype.options.nativeMenu = true;
		}
	});

	asyncTest( "a large select option should not overflow", function() {
		// https://github.com/jquery/jquery-mobile/issues/1338
		var menu;

		$.testHelper.sequence( [
			resetHash,

			function() {
				// bring up the dialog
				$( "#select-long-option-label" ).siblings( "a" ).trigger( "click" );
			},

			function() {
				menu = $( "#select-long-option-label-menu.ui-selectmenu-list" );

				equal( menu.outerWidth( true ), menu.find( "li:nth-child(2) a" ).outerWidth( true ), "a element should not overflow" );
				start();
			}
		], 500);
	});

	asyncTest( "focus is transferred to a menu item when the menu is opened",function() {
		expect( 1 );

		$.testHelper.sequence([
			resetHash,

			function() {
				// bring up the dialog
				$( "#select-choice-menu-focus-test a:first" ).trigger( "click" );
			},

			function() {
				ok( $( document.activeElement ).parents( "#select-choice-menu-focus-test-menu" ).length > 0,
					"item in open select menu (" + $( "#select-choice-menu-focus-test-menu" ).length + ") has focus" );
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
				var firstMenuChoice = $("#select-choice-few\\.dotTest-menu li:first a");
				ok( firstMenuChoice.hasClass( $.ui.activeBtnClass ),
						"default menu choice has the active button class" );

				$("#select-choice-few\\.dotTest-menu a:last").click();
			},

			function(){
				// bring up the menu again
				$("#select-choice-few-container a").trigger("click");
			},

			function(){
				var lastMenuChoice = $("#select-choice-few\\.dotTest-menu li:last a");
				ok( lastMenuChoice.hasClass( $.ui.activeBtnClass ),
						"previously selected item has the active button class" );

				// close the dialog
				lastMenuChoice.click();
			},

			start
		], 1000);
	});

	asyncTest( "adding options and refreshing a custom select changes the options list", function(){
		var select = $( "#custom-refresh-opts-list" ),
			button = select.siblings( "a" ),
			text = "foo";

		$.testHelper.sequence([
			resetHash,

			// bring up the dialog
			function() {
				button.click();
			},

			function() {
				deepEqual( $( ".ui-popup-container:not(.ui-popup-hidden) .ui-selectmenu ul" ).text(), "default" );
				$( ".ui-popup-screen.in" ).click();
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
				deepEqual( $( ".ui-popup-container:not(.ui-popup-hidden) .ui-selectmenu ul" ).text(), text );
				$( ".ui-popup-screen.in" ).click();
			},

			start
		], 500);
	});

	// issue #2547
	test( "custom select list item links have encoded option text values", function() {
		$( "#encoded-option" ).data( 'ui-selectmenu' )._buildList();
		deepEqual(window.encodedValueIsDefined, undefined);
	});

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "select elements in the keepNative set shouldn't be enhanced", function() {
		ok( !$("#keep-native").parent().is("div.ui-btn") );
	});

	asyncTest( "dialog size select title should match the label", function() {
		var $select = $( "#select-choice-many-1\\.dotTest" ),
			$label = $select.parent().siblings( "label" ),
			$button = $select.siblings( "a" );

		$.testHelper.pageSequence([
			function() {
				$button.click();
			},

			function() {
				deepEqual($.ui.activePage.find( ".ui-title" ).text(), $label.text());
				window.history.back();
			},

			start
		]);
	});

	asyncTest( "dialog size select title should match the label when changed after the dialog markup is added to the DOM", function() {
		var $select = $( "#select-choice-many-1\\.dotTest" ),
			$label = $select.parent().siblings( "label" ),
			$button = $select.siblings( "a" );

		$.testHelper.detailedEventCascade([
			function() {
				$label.text( "foo" );
				$button.click();
			},

			{ pagechange: { src: $.ui.pageContainer, event: "pagechange.dialogSizeSelectTitleMod1" } },

			function() {
				deepEqual($.ui.activePage.find( ".ui-title" ).text(), $label.text());
				window.history.back();
			},

			{ pagechange: { src: $.ui.pageContainer, event: "pagechange.dialogSizeSelectTitleMod2" } },

			start
		]);
	});

	asyncTest( "destroying a select menu leaves no traces", function() {
		$.testHelper.pageSequence( [
			function() { $.ui.changePage( "#destroyTest" ); },
			// Check if two chunks of DOM are identical
			function() {
				var unenhancedSelect = $(
						"<select data-" + ( $.ui.ns || "" ) + "native-menu='true'>" +
						"<option>Title</option>" +
						"<option value='option1'>Option 1</option>" +
						"<option value='option2'>Option 2</option>" +
						"</select>"),
					unenhancedSelectClone = unenhancedSelect.clone();

				$( "#destroyTest" ).append( unenhancedSelectClone );
				unenhancedSelectClone.selectmenu();
				unenhancedSelectClone.selectmenu( "destroy" );
				unenhancedSelectClone.remove();

				deepEqual( $( "#destroyTest" ).children().length, 0, "After adding, enhancing, destroying, and removing the select menu, the page is empty" );
				ok( domEqual( unenhancedSelect, unenhancedSelectClone ), "DOM for select after enhancement/destruction is equal to DOM for unenhanced select" );
			},
			function() { $.ui.back(); },

			start
		]);
	});

	asyncTest( "destroying a custom select menu leaves no traces", function() {
		expect( 7 );

		var unenhancedSelectClone,
			prefix = ".destroyingASelectMenuLeavesNoTraces",
			id = "select-" + Math.round( Math.random() * 1177 ),
			unenhancedSelect = $(
				"<select id='" + id + "' data-" + ( $.ui.ns || "" ) + "native-menu='false'>" +
				"<option>Title</option>" +
				"<option value='option1'>Option 1</option>" +
				"<option value='option2'>Option 2</option>" +
				"</select>");
		$.testHelper.detailedEventCascade( [
			function() {
				$.ui.changePage( "#destroyTest" );
			},

			{
				pagechange: { src: $.ui.pageContainer, event: "pagechange" + prefix + "0" }
			},

			function() {
				unenhancedSelectClone = unenhancedSelect.clone();

				$( "#destroyTest" ).append( unenhancedSelectClone );
				unenhancedSelectClone.selectmenu();
				$( "#" + id + "-button" ).click();
			},

			{
				popupafteropen: { src: $.ui.document, event: "popupafteropen" + prefix + "1" }
			},

			function( result ) {
				deepEqual( result.popupafteropen.timedOut, false, "Popup did open" );
				$( "#" + id + "-listbox" ).popup( "close" );
			},

			{
				popupafterclose: { src: $.ui.document, event: "popupafterclose" + prefix + "2" }
			},

			function( result ) {
				var idx;

				deepEqual( result.popupafterclose.timedOut, false, "Popup did close" );

				unenhancedSelectClone.selectmenu( "destroy" );
				unenhancedSelectClone.remove();

				deepEqual( $( "#destroyTest" ).children().length, 0, "After adding, enhancing, opening, destroying, and removing the popup-sized select menu, the page is empty" );
				ok( domEqual( unenhancedSelect, unenhancedSelectClone ), "DOM for select after enhancement/destruction is equal to DOM for unenhanced select" );

				// Add a bunch of options to make sure the menu ends up larger than
				// the screen, thus requiring a dialog
				for ( idx = 3 ; idx < 60 ; idx++ ) {
					unenhancedSelect.append( "<option value='option" + idx + "'>Option " + idx + "</option>" );
				}
				unenhancedSelectClone = unenhancedSelect.clone();
				$( "#destroyTest" ).append( unenhancedSelectClone );
				unenhancedSelectClone.selectmenu();
				$( "#" + id + "-button" ).click();
			},

			{
				pagechange: { src: $.ui.pageContainer, event: "pagechange" + prefix + "3" }
			},

			function() {
				// Close the dialog
				$.ui.activePage.find( "a:first" ).click();
			},

			{
				pagechange: { src: $.ui.pageContainer, event: "pagechange" + prefix + "4" }
			},

			function() {
				unenhancedSelectClone.selectmenu( "destroy" );
				unenhancedSelectClone.remove();

				deepEqual( $( "#destroyTest" ).children().length, 0, "After adding, enhancing, opening, destroying, and removing the dialog-sized select menu, the page is empty" );
				ok( domEqual( unenhancedSelect, unenhancedSelectClone ), "DOM for select after enhancement/destruction is equal to DOM for unenhanced select" );
				deepEqual( $( "#" + id + "-dialog" ).length, 0, "After adding, enhancing, opening, destroying, and removing the dialog-sized select menu, no dialog page is left behind" );
				$.ui.back();
			},

			{
				pagechange: { src: $.ui.pageContainer, event: "pagechange" + prefix + "5" }
			},

			start
		]);
	});

})(jQuery);
