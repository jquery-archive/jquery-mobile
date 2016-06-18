/*
 * Mobile select unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Native select" );

QUnit.test( "Native select does not blur synchronously in response to change", function( assert ) {
	var selectmenu = $( "#blur-test" );

	selectmenu.focus();

	selectmenu.trigger( "change" );

	assert.deepEqual( selectmenu.parent().hasClass( "ui-focus" ), true,
		"Native select is focused after triggering 'change'" );
} );

QUnit.module( "Custom select" );

QUnit.test( "Custom select is enhanced correctly", function( assert ) {
	var eventNamespace = ".customSelectIsEnhancedCorrectly",
		popup = $( "#enhance-test-listbox" ),
		done = assert.async();

	$.testHelper.detailedEventCascade( [
		function() {
			$( "#enhance-test" ).selectmenu( "open" );
		},
		{
			popupafteropen: { src: popup, event: "popupafteropen" + eventNamespace + "1" }
		},
		function() {
			popup.popup( "close" );
		},
		{
			popupafterclose: { src: popup, event: "popupafterclose" + eventNamespace + 2 }
		},
		function() {
			assert.strictEqual( $( "#enhance-test-listbox a:first" ).attr( "role" ), "button",
				"The close button for a multiple choice select popup has the " +
					"\"role='button'\" set" );
			assert.strictEqual( $( "#enhance-test-button" ).attr( "tabindex" ), "2",
				"Tabindex is correctly copied from select" );
			assert.strictEqual( popup.popup( "option", "overlayTheme" ), "b",
				"Popup has overlayTheme b" );
			assert.strictEqual( popup.popup( "option", "theme" ), "x", "Popup has theme x" );
			done();
		}
	] );
} );

QUnit.module( "Custom select Multiple" );

QUnit.test( "Custom select multiple is cleared correctly", function( assert ) {
	var popup = $( "#enhance-test-listbox" );
	$( "#enhance-test" )
		.find( "option" )
			.attr( "selected", false )
			.prop( "selected", false )
		.end()
		.selectmenu( "refresh" );
	assert.deepEqual( popup.find( ".ui-checkbox-on" ).length, 0,
		"Checkboxes should not have ui-checkbox-on class" );
} );

QUnit.module( "Custom select Multiple Inline" ) ;

QUnit.test( "Custom select multiple inline width is adjusted correctly", function( assert ) {
	var selectMenu = $( "#width-test" ),
		parent = selectMenu.parent(),
		widths = [ 100, 250, 500, 1000 ],
		finalResult = 0,
		result = 0;

	$.each( widths, function( index, width ) {
		parent.css( { "width": width + "px" } );
		selectMenu
			.find( "option" )
				.prop( "selected", true )
			.end();
		selectMenu.selectmenu( "refresh" );
		result = selectMenu.width() < parent.width() ? 1 : 0;
		if ( result === 1 ) {
			finalResult += 1;
		}
	} );

	assert.strictEqual( finalResult, 4,
		"select menu width should not exceed parent's width" );
} );

QUnit.module( "Native select" );

QUnit.test( "Select menu ID", function( assert ) {
	assert.ok( $( ".no-id-test" ).closest( ".ui-button" ).attr( "id" ) !== "undefined-button",
		"Select menu without an ID does not result in the button having name 'undefined-button'" );
} );

} );
