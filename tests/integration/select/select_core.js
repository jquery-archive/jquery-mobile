/*
 * Mobile select unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

var libName = "forms.select",
	originalDefaultDialogTrans = $.mobile.defaultDialogTransition,
	originalDefTransitionHandler = $.mobile.defaultTransitionHandler.prototype.transition,
	originalGetEncodedText = $.fn.getEncodedText,
	resetHash, closeDialog;

resetHash = function() {
	$.testHelper.openPage( location.hash.indexOf( "#default" ) >= 0 ? "#" : "#default" );
};

closeDialog = function() {
	$.mobile.activePage.find( "li a" ).first().click();
};

var homeWithSearch = $.mobile.path.parseUrl( location.pathname ).pathname + location.search;

QUnit.test( "No tags are accidentally injected during list building", function( assert ) {
	assert.strictEqual( $( "#encoding-test-menu > li:first-child > a > script" ).length, 0,
		"No script tag has ended up inside the anchor" );
} );

QUnit.module( libName, {
	beforeEach: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
		$.testHelper.navReset( homeWithSearch );
	},

	afterEach: function() {
		$.mobile.defaultDialogTransition = originalDefaultDialogTrans;
		$.mobile.defaultTransitionHandler.prototype.transition = originalDefTransitionHandler;

		$.fn.getEncodedText = originalGetEncodedText;
		window.encodedValueIsDefined = undefined;
	}
} );

QUnit.test( "placeholder correctly gets ui-screen-hidden after rebuilding",
	function( assert ) {
		var ready = assert.async();
		assert.expect( 3 );

		$.testHelper.sequence( [
			function() {

				// Bring up the optgroup menu
				assert.ok( $( "#optgroup-and-placeholder-container a" ).length > 0,
					"there is in fact a button in the page" );
				assert.hasClasses(
					$( "#optgroup-and-placeholder-menu li.ui-listview-item-divider" ).first(),
					"ui-bar-b", "Optgroup header has swatch b" );
				$( "#optgroup-and-placeholder-container a" ).trigger( "click" );
			},

			function() {

				// Select the first menu item
				$( "#optgroup-and-placeholder-menu li:not(.ui-screen-hidden) a:first" ).click();
			},

			function() {
				assert.hasClasses( $( "#optgroup-and-placeholder-menu li:first" ),
					"ui-screen-hidden", "the placeholder item has the ui-screen-hidden class" );
				ready();
			}
		], 1000 );
	} );

QUnit.test( "firing a click at least 400ms later on the select screen closes it",
	function( assert ) {
		var ready = assert.async();
		assert.expect( 3 );

		var prefix = ".firingAClick";
		$.testHelper.detailedEventCascade( [
			function() {

				// Bring up the smaller choice menu
				assert.ok( $( "#select-choice-few-container a" ).length > 0,
					"there is in fact a button in the page" );
				$( "#select-choice-few-container a" ).trigger( "click" );
			},

			{
				popupafteropen: {
					src: $( "#select-choice-few\\.dotTest-listbox" ),
					event: "popupafteropen" + prefix
				},
				timeout: { length: 1000 }
			},

			function( result ) {
				assert.strictEqual( result.popupafteropen.timedOut, false,
					"Did receive 'popupafteropen'" );

				// Select the first menu item
				$( "#select-choice-few\\.dotTest-menu a:first" ).click();
			},

			{
				timeout: { length: 1000 }
			},

			function() {
				assert.strictEqual( $( "#select-choice-few\\.dotTest-menu" )
					.parent()
					.parent( ".ui-popup-hidden" ).length, 1 );
				ready();
			}
		] );
	} );

QUnit.test( "a large select menu should use the default dialog transition",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.pageSequence( [
			resetHash,

			function() {
				var select, old;

				select = $( "#select-choice-many-container-1 a" );

				old = $.mobile.defaultTransitionHandler.prototype.transition;

				// Set to something else
				$.mobile.defaultTransitionHandler.prototype.transition = function() {

					// Check that the instantiated transition handlers transition name property
					// matches the default transition
					assert.strictEqual( this.name, $.mobile.defaultDialogTransition );
					return old.apply( this, arguments );
				};

				// Bring up the dialog
				select.trigger( "click" );
			},

			closeDialog,

			ready
		] );
	} );

QUnit.test( "selecting an item from a large custom select leaves no dialog hash key",
	function( assert ) {
		var ready = assert.async();
		var dialogHashKey = "select-choice-many-hash-check-dialog";

		$.testHelper.pageSequence( [
			resetHash,

			function() {
				$( "#select-choice-many-container-hash-check a" ).click();
			},

			function() {
				assert.ok( location.hash.indexOf( dialogHashKey ) > -1 );
				closeDialog();
			},

			function() {
				assert.strictEqual( location.hash.indexOf( dialogHashKey ), -1 );
				ready();
			}
		] );
	} );

QUnit.test( "dialog sized select menu opened many times remains a dialog",
	function( assert ) {
		var ready = assert.async();
		var dialogHashKey = "select-choice-many-many-clicks-dialog",

			openDialogSequence = [
				resetHash,

				function() {
					$( "#select-choice-many-container-many-clicks a" ).click();
				},

				function() {
					assert.ok( location.hash.indexOf( dialogHashKey ) > -1,
						"hash should have the dialog hash key" );
					closeDialog();
				}
			],

			sequence = openDialogSequence.concat( openDialogSequence ).concat( [ ready ] );

		$.testHelper.sequence( sequence, 1000 );
	} );

QUnit.module( "Non native menus", {
	beforeEach: function() {
		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	},
	afterEach: function() {
		$.mobile.selectmenu.prototype.options.nativeMenu = true;
	}
} );

QUnit.test( "a large select option should not overflow", function( assert ) {
	var ready = assert.async();

	// https://github.com/jquery/jquery-mobile/issues/1338
	var menu;

	$.testHelper.sequence( [
		resetHash,

		function() {

			// Bring up the dialog
			$( "#select-long-option-label" ).siblings( "a" ).trigger( "click" );
		},

		function() {
			menu = $( "#select-long-option-label-menu.ui-selectmenu-custom-list" );

			assert.equal( menu.outerWidth( true ),
				menu.find( "li:nth-child(2) a" ).outerWidth( true ),
				"a element should not overflow" );
			ready();
		}
	], 500 );
} );

QUnit.test( "focus is transferred to a menu item when the menu is opened",
	function( assert ) {
		var ready = assert.async();
		assert.expect( 1 );

		$.testHelper.sequence( [
			resetHash,

			function() {

				// Bring up the dialog
				$( "#select-choice-menu-focus-test-container a:first" ).trigger( "click" );
			},

			function() {
				assert.ok( $( document.activeElement )
					.parents( "#select-choice-menu-focus-test-1-menu" ).length > 0,
					"item in open select menu (" +
						$( "#select-choice-menu-focus-test-1-menu" ).length + ") has focus" );
				$( ".ui-popup-screen:not(.ui-screen-hidden)" ).trigger( "click" );
			},

			function() {
				ready();
			}
		], 5000 );
	} );

QUnit.test( "using custom refocuses the button after close", function( assert ) {
	var ready = assert.async();
	var select, button,
		triggered = false;

	assert.expect( 1 );

	$.testHelper.sequence( [
		resetHash,

		function() {
			select = $( "#select-choice-focus-test-container" );
			button = select.find( "a" );
			button.trigger( "click" );
		},

		function() {

			// NOTE this is called twice per triggered click
			button.focus( function() {
				triggered = true;
			} );

			$( ".ui-popup-screen:not(.ui-screen-hidden)" ).trigger( "click" );
		},

		function() {
			assert.ok( triggered, "focus is triggered" );
			ready();
		}
	], 1500 );
} );

QUnit.test( "selected items are highlighted", function( assert ) {
	var ready = assert.async();
	$.testHelper.sequence( [
		resetHash,

		function() {

			// Bring up the smaller choice menu
			assert.ok( $( "#select-choice-few-container a" ).length > 0,
				"there is in fact a button in the page" );
			$( "#select-choice-few-container a" ).trigger( "click" );
		},

		function() {
			var firstMenuChoice = $( "#select-choice-few\\.dotTest-menu li:first a" );

			assert.hasClasses( firstMenuChoice, "ui-button-active",
				"default menu choice has the active button class" );

			$( "#select-choice-few\\.dotTest-menu a:last" ).click();
		},

		function() {

			// Bring up the menu again
			$( "#select-choice-few-container a" ).trigger( "click" );
		},

		function() {
			var lastMenuChoice = $( "#select-choice-few\\.dotTest-menu li:last a" );
			assert.hasClasses( lastMenuChoice, "ui-button-active",
				"previously selected item has the active button class" );

			// Close the dialog
			lastMenuChoice.click();
		},

		ready
	], 1000 );
} );

QUnit.test( "adding options and refreshing a custom select changes the options list",
	function( assert ) {
		var ready = assert.async();
		var select = $( "#custom-refresh-opts-list" ),
			button = select.siblings( "a" ),
			text = "foo";

		$.testHelper.sequence( [
			resetHash,

			// Bring up the dialog
			function() {
				button.click();
			},

			function() {
				assert.strictEqual(
					$( ".ui-popup-container:not(.ui-popup-hidden) .ui-selectmenu-custom ul" )
						.text(),
					"default" );
				$( ".ui-popup-screen.in" ).click();
			},

			function() {

				// Remove the loading message
				select.find( "option" ).remove();
				select.append( "<option value='1'>" + text + "</option>" );
				select.selectmenu( "refresh" );
			},

			function() {
				button.click();
			},

			function() {
				assert.strictEqual(
					$( ".ui-popup-container:not(.ui-popup-hidden) .ui-selectmenu-custom ul" )
						.text(),
					text );
				$( ".ui-popup-screen.in" ).click();
			},

			ready
		], 500 );
	} );

// Issue #2547
QUnit.test( "custom select list item links have encoded option text values", function( assert ) {
	$( "#encoded-option" ).data( "mobile-selectmenu" )._buildList();
	assert.strictEqual( window.encodedValueIsDefined, undefined );
} );

// Not testing the positive case here since's it's obviously tested elsewhere
QUnit.test( "select elements not marked with role shouldn't be enhanced", function( assert ) {
	assert.lacksClasses( $( "#keep-native" ).parent(), "ui-button" );
} );

QUnit.test( "dialog size select title should match the label", function( assert ) {
	var $select = $( "#select-choice-many-1\\.dotTest" ),
		$label = $select.parent().siblings( "label" ),
		$button = $select.siblings( "a" );
	var ready = assert.async();

	$.testHelper.pageSequence( [
		function() {
			$button.click();
		},

		function() {
			assert.strictEqual( $.mobile.activePage.find( ".ui-toolbar-title" ).text(),
				$label.text(),
				"Dialog title set to label text" );
			window.history.back();
		},

		ready
	] );
} );

QUnit.test( "dialog size select title should match the placeholder when there's no label",
	function( assert ) {
		var ready = assert.async();
		var $select = $( "#select-choice-many-placeholder-1" ),
			$label = $( "#select-choice-many-placeholder-1-listbox li:first" ),
			$button = $select.siblings( "a" );

		$.testHelper.pageSequence( [
			function() {
				$button.click();
			},

			function() {
				assert.strictEqual( $.mobile.activePage.find( ".ui-toolbar-title" ).text(),
					$label.text() );
				window.history.back();
			},

			ready
		] );
	} );

QUnit.test( "dialog size select title should match the label when changed after the dialog " +
	"markup is added to the DOM", function( assert ) {
		var $select = $( "#select-choice-many-1\\.dotTest" ),
			$label = $select.parent().siblings( "label" ),
			$button = $select.siblings( "a" );
		var ready = assert.async();

		$.testHelper.detailedEventCascade( [
			function() {
				$label.text( "foo" );
				$button.click();
			},

			{
				pagechange: {
					src: $( ".ui-pagecontainer" ),
					event: "pagechange.dialogSizeSelectTitleMod1"
				}
			},

			function() {
				assert.strictEqual( $.mobile.activePage.find( ".ui-toolbar-title" ).text(),
					$label.text() );
				window.history.back();
			},

			{
				pagechange: {
					src: $( ".ui-pagecontainer" ),
					event: "pagechange.dialogSizeSelectTitleMod2"
				}
			},

			ready
		] );
	} );

QUnit.test( "destroying a select menu leaves no traces", function( assert ) {
	var ready = assert.async();
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#destroyTest" );
		},

		// Check if two chunks of DOM are identical
		function() {
			var unenhancedSelect = $(
					"<select data-" + ( $.mobile.ns || "" ) + "native-menu='true'>" +
					"<option>Title</option>" +
					"<option value='option1'>Option 1</option>" +
					"<option value='option2'>Option 2</option>" +
					"</select>" ),
				unenhancedSelectClone = unenhancedSelect.clone();

			$( "#destroyTest" ).append( unenhancedSelectClone );
			unenhancedSelectClone.selectmenu();
			unenhancedSelectClone.selectmenu( "destroy" );
			unenhancedSelectClone.remove();

			assert.strictEqual( $( "#destroyTest" ).children().length, 0,
				"After adding/enhancing/destroying/removing the select menu, the page is empty" );
			assert.ok( $.testHelper.domEqual( unenhancedSelect, unenhancedSelectClone ),
				"DOM for select after enhancement/destruction is equal to unenhanced select DOM" );
		},
		function() {
			$.mobile.back();
		},

		ready
	] );
} );

QUnit.test( "destroying a custom select menu leaves no traces", function( assert ) {
	assert.expect( 7 );
	var ready = assert.async();

	var unenhancedSelectClone,
		prefix = ".destroyingASelectMenuLeavesNoTraces",
		id = "select-" + Math.round( Math.random() * 1177 ),
		unenhancedSelect = $(
			"<select id='" + id + "' data-" + ( $.mobile.ns || "" ) + "native-menu='false'>" +
			"<option>Title</option>" +
			"<option value='option1'>Option 1</option>" +
			"<option value='option2'>Option 2</option>" +
			"</select>" );
	$.testHelper.detailedEventCascade( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#destroyTest" );
		},

		{
			pagechange: { src: $( ".ui-pagecontainer" ), event: "pagechange" + prefix + "0" }
		},

		function() {
			unenhancedSelectClone = unenhancedSelect.clone();

			$( "#destroyTest" ).append( unenhancedSelectClone );
			unenhancedSelectClone.selectmenu();
			$( "#" + id + "-button" ).click();
		},

		{
			popupafteropen: { src: $.mobile.document, event: "popupafteropen" + prefix + "1" }
		},

		function( result ) {
			assert.strictEqual( result.popupafteropen.timedOut, false, "Popup did open" );
			$( "#" + id + "-listbox" ).popup( "close" );
		},

		{
			popupafterclose: { src: $.mobile.document, event: "popupafterclose" + prefix + "2" }
		},

		function( result ) {
			var idx;

			assert.strictEqual( result.popupafterclose.timedOut, false, "Popup did close" );

			unenhancedSelectClone.selectmenu( "destroy" );
			unenhancedSelectClone.remove();

			assert.strictEqual( $( "#destroyTest" ).children().length, 0,
				"After adding, enhancing, opening, destroying, and removing the popup-sized " +
				"select menu, the page is empty" );
			assert.ok( $.testHelper.domEqual( unenhancedSelect, unenhancedSelectClone ),
				"DOM for select after enhancement/destruction is equal to unenhanced select DOM" );

			// Add a bunch of options to make sure the menu ends up larger than the screen, thus
			// requiring a dialog
			for ( idx = 3; idx < 60; idx++ ) {
				unenhancedSelect.append( "<option value='option" + idx + "'>Option " + idx +
					"</option>" );
			}
			unenhancedSelectClone = unenhancedSelect.clone();
			$( "#destroyTest" ).append( unenhancedSelectClone );
			unenhancedSelectClone.selectmenu();
			$( "#" + id + "-button" ).click();
		},

		{
			pagechange: { src: $( ".ui-pagecontainer" ), event: "pagechange" + prefix + "3" }
		},

		function() {

			// Close the dialog
			$.mobile.activePage.find( "a:first" ).click();
		},

		{
			pagechange: { src: $( ".ui-pagecontainer" ), event: "pagechange" + prefix + "4" }
		},

		function() {
			unenhancedSelectClone.selectmenu( "destroy" );
			unenhancedSelectClone.remove();

			assert.strictEqual( $( "#destroyTest" ).children().length, 0,
				"After adding, enhancing, opening, destroying, and removing the dialog-sized " +
				"select menu, the page is empty" );
			assert.ok( $.testHelper.domEqual( unenhancedSelect, unenhancedSelectClone ),
				"DOM for select after enhancement/destruction is equal to unenhanced select DOM" );
			assert.strictEqual( $( "#" + id + "-dialog" ).length, 0,
				"After adding, enhancing, opening, destroying, and removing the dialog-sized " +
				"select menu, no dialog page is left behind" );
			$.mobile.back();
		},

		{
			pagechange: { src: $( ".ui-pagecontainer" ), event: "pagechange" + prefix + "5" }
		},

		ready
	] );
} );

QUnit.test( "Custom select passes overlay theme to its dialog", function( assert ) {

	assert.expect( 2 );
	var ready = assert.async();
	var dialog;

	$.testHelper.pageSequence( [
		function() {
			$( "#select-overlay-theme-container a:first" ).click();
		},
		function() {
			dialog = $( "#select-choice-many-overlay-theme-test-dialog" );
			assert.hasClasses( $( ":mobile-pagecontainer" ), "ui-overlay-x",
				"Page container has appropriate theme." );
			assert.strictEqual( dialog.page( "option", "overlayTheme" ), "x",
				"Dialog widget overlayTheme option is correct." );
			$.mobile.back();
		},
		ready
	] );
} );

// Utensils for logging calls to $.event.trigger()
var callLog, origTrigger,
	replacementTrigger = function( event, data, element, onlyHandlers ) {
		callLog.push( {
			event: event,
			data: data,
			element: element,
			onlyHandlers: onlyHandlers
		} );
		return origTrigger.apply( this, arguments );
	};

QUnit.module( "Custom select change comes after closing list", {
	beforeEach: function() {
		callLog = [];
		origTrigger = $.event.trigger;
		$.event.trigger = replacementTrigger;
	},
	afterEach: function() {
		$.event.trigger = origTrigger;
	}
} );

function testChangeAfterClose( assert, select, ns, openEvent, closeEvent, tail ) {
	var closeComesBeforeChange = false,
		closeEventName = closeEvent.event;

	openEvent.event += ns + "1";
	closeEvent.event += ns + "2";

	$.testHelper.detailedEventCascade( [
		function() {
			$( "#" + select.attr( "id" ) + "-button" ).click();
		},
		{
			openevent: openEvent
		},
		function() {
			$( "#" + select.attr( "id" ) + "-menu" ).find( "a" ).eq( 2 ).click();
		},
		{
			closeevent: closeEvent,
			change: { src: select, event: "change" + ns + "2" }
		},
		function() {
			$.each( callLog, function( index ) {
				var name = ( typeof callLog[ index ].event === "string" ?
						callLog[ index ].event :
						callLog[ index ].event.type ),
					target = callLog[ index ].element;

				if ( name === "change" && target === select[ 0 ] ) {
					return false;
				}

				if ( name === closeEventName &&
						( !closeEvent.filter || closeEvent.filter( callLog[ index ].data ) ) &&
						target === ( typeof closeEvent.src === "function" ?
							closeEvent.src()[ 0 ] :
							closeEvent.src[ 0 ] ) ) {

					closeComesBeforeChange = true;
					return false;
				}
			} );

			assert.strictEqual( closeComesBeforeChange, true,
				"close event is triggered before change event" );
			tail();
		}
	] );
}

QUnit.test( "Small select triggers change after popup closes", function( assert ) {
	var ready = assert.async();
	testChangeAfterClose( assert, $( "#small-select-change-after-close" ),
		".smallSelectTriggersChangeAfterPopupCloses",
		{
			src: $( "#small-select-change-after-close-listbox" ),
			event: "popupafteropen"
		},
		{
			src: $( "#small-select-change-after-close-listbox" ),
			event: "popupafterclose"
		}, ready );
} );

QUnit.test( "Large select triggers change after dialog closes", function( assert ) {
	var ready = assert.async();
	testChangeAfterClose( assert, $( "#large-select-change-after-close" ),
		".largeSelectTriggersChangeAfterPopupCloses",
		{
			src: $( "body" ),
			event: "pagecontainershow",
			filter: function dataFilter( data ) {
				return data.nextPage.attr( "id" ) === "large-select-change-after-close-dialog";
			}
		},
		{
			src: $( "body" ),
			event: "pagecontainerhide",
			filter: function dataFilter( data ) {
				return data.prevPage.attr( "id" ) === "large-select-change-after-close-dialog";
			}
		},
		ready );
} );

} );
