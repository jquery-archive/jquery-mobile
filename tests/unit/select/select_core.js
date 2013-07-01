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

	var homeWithSearch = $.mobile.path.parseUrl(location.pathname).pathname + location.search;

	module(libName, {
		setup: function() {
			$.mobile.navigate.history.stack = [];
			$.mobile.navigate.history.activeIndex = 0;
			$.testHelper.navReset( homeWithSearch );
		},

		teardown: function(){
			$.mobile.defaultDialogTransition = originalDefaultDialogTrans;
			$.mobile.defaultTransitionHandler = originalDefTransitionHandler;

			$.fn.getEncodedText = originalGetEncodedText;
			window.encodedValueIsDefined = undefined;
		}
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

	test( "enabling and disabling", function(){
		var select = $( "select" ).first(), button;

		button = select.siblings( "a" ).first();

		select.selectmenu( 'disable' );
		deepEqual( select.attr('disabled'), "disabled", "select is disabled" );
		ok( button.hasClass("ui-state-disabled"), "disabled class added" );
		deepEqual( button.attr('aria-disabled'), "true", "select is disabled" );
		deepEqual( select.selectmenu( 'option', 'disabled' ), true, "disbaled option set" );

		select.selectmenu( 'enable' );
		deepEqual( select.attr('disabled'), undefined, "select is disabled" );
		ok( !button.hasClass("ui-state-disabled"), "disabled class added" );
		deepEqual( button.attr('aria-disabled'), "false", "select is disabled" );
		deepEqual( select.selectmenu( 'option', 'disabled' ), false, "disabled option set" );
	});

	test( "theme defined on select is used", function() {
		var select = $( "select#non-parent-themed" );

		ok( select.siblings( "a" ).hasClass( "ui-btn-" + select.jqmData( 'theme' ) ) );
	});

	test( "select without theme defined inherits theme from parent", function() {
		var select = $("select#parent-themed");

		deepEqual( select
			.siblings( "a" )
			.css( "background-color" ), "rgb(221, 221, 221)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
	});

	// issue #2547
	test( "custom select list item links have encoded option text values", function() {
		$( "#encoded-option" ).data( 'mobile-selectmenu' )._buildList();
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

		$.testHelper.detailedEventCascade([
			function() {
				$label.text( "foo" );
				$button.click();
			},

			{ pagechange: { src: $.mobile.pageContainer, event: "pagechange.dialogSizeSelectTitleMod1" } },

			function() {
				deepEqual($.mobile.activePage.find( ".ui-title" ).text(), $label.text());
				window.history.back();
			},

			{ pagechange: { src: $.mobile.pageContainer, event: "pagechange.dialogSizeSelectTitleMod2" } },

			start
		]);
	});

	test( "a disabled custom select should still be enhanced as custom", function() {
		$("#select-disabled-enhancetest").selectmenu("enable").selectmenu("open");

		var menu = $(".ui-selectmenu").not( ".ui-popup-hidden" );
		ok( menu.text().indexOf("disabled enhance test") > -1, "the right select is showing" );
	});

	test( "selected option classes are persisted to the button text", function() {
		var $select = $( "#select-preserve-option-class" ),
			selectedOptionClasses = $select.find( "option:selected" ).attr( "class" );

		deepEqual( $select.prev( "span" ).attr( "class" ), selectedOptionClasses );
	});

	test( "multiple select option classes are persisted from the first selected option to the button text", function() {
		var $select = $( "#select-preserve-option-class-multiple" ),
			selectedOptionClasses = $select.find( "option:selected" ).first().attr( "class" );

		deepEqual( $select.prevAll( "span:not(.ui-li-count)" ).attr( "class" ), selectedOptionClasses );
	});

	test( "multiple select text values are aggregated in the button text", function() {
		var $select = $( "#select-aggregate-option-text" );

		deepEqual( $select.prevAll( "span:not(.ui-li-count)" ).text(), "Standard: 7 day, Rush: 3 days" );
	});

	asyncTest( "destroying a select menu leaves no traces", function() {
		$.testHelper.pageSequence( [
			function() { $.mobile.changePage( "#destroyTest" ); },
			// Check if two chunks of DOM are identical
			function() {
				var unenhancedSelect = $(
						"<select data-" + ( $.mobile.ns || "" ) + "native-menu='true'>" +
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
			function() { $.mobile.back(); },
			function() { start(); }
		]);
	});

	asyncTest( "destroying a custom select menu leaves no traces", function() {
		$.testHelper.pageSequence( [
			function() { $.mobile.changePage( "#destroyTestCustom" ); },
			function() {
				var unenhancedSelect = $(
						"<select data-" + ( $.mobile.ns || "" ) + "native-menu='false'>" +
						"<option>Title</option>" +
						"<option value='option1'>Option 1</option>" +
						"<option value='option2'>Option 2</option>" +
						"</select>"),
					unenhancedSelectClone = unenhancedSelect.clone();

				$( "#destroyTestCustom" ).append( unenhancedSelectClone );
				unenhancedSelectClone.selectmenu();
				unenhancedSelectClone.selectmenu( "destroy" );
				unenhancedSelectClone.remove();

				deepEqual( $( "#destroyTestCustom" ).children().length, 0, "After adding, enhancing, destroying, and removing the select menu, the page is empty" );
				ok( domEqual( unenhancedSelect, unenhancedSelectClone ), "DOM for select after enhancement/destruction is equal to DOM for unenhanced select" );
			},
			function() { $.mobile.back(); },
			function() { start(); }
		]);
	});

	test( "changing the placeholder text for a non-native select will update the placeholder list item", function() {
		var newText = "Updated placeholder";
		$( "#test-placeholder-update option:first-child" ).text( newText );
		$( "#test-placeholder-update" ).selectmenu( "refresh", true );
		deepEqual ( $( "#test-placeholder-update-menu li:first-child > a" ).text(), newText, "Placeholder list item reflects new value after refresh( true )" );
	});

})(jQuery);
