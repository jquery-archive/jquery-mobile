/*
 * Mobile select unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {
QUnit.module( "jquery.mobile.forms.select native" );

QUnit.test( "native menu selections alter the button text", function( assert ) {
	var select = $( "#native-select-choice-few" ), setAndCheck;

	setAndCheck = function( key ) {
		var text;

		select.val( key ).selectmenu( "refresh" );
		text = select.find( "option[value='" + key + "']" ).text();
		assert.deepEqual( select.prev( "span" ).text(), text );
	};

	setAndCheck( "rush" );
	setAndCheck( "standard" );
} );

// Issue 2424
QUnit.test( "native selects should provide open and close as a no-op", function( assert ) {

	// Exception will prevent test success if undef
	$( "#native-refresh" ).selectmenu( "open" );
	$( "#native-refresh" ).selectmenu( "close" );
	assert.ok( true );
} );

QUnit.test( "The preventFocusZoom option is working as expected", function( assert ) {
	var ready = assert.async();

	var zoomoptiondefault = $.mobile.selectmenu.prototype.options.preventFocusZoom;
	$.mobile.selectmenu.prototype.options.preventFocusZoom = true;

	$( document )
		.one( "vmousedown.test", function() {
			assert.ok( $.mobile.zoom.enabled === false, "zoom is disabled on vmousedown" );
		} )
		.one( "mouseup.test", function() {
			setTimeout( function() { // This empty setTimeout is to match the work-around for the issue reported in https://github.com/jquery/jquery-mobile/issues/5041
				assert.ok( $.mobile.zoom.enabled === true, "zoom is enabled on mouseup" );
				$.mobile.selectmenu.prototype.options.preventFocusZoom = zoomoptiondefault;
				$( document ).unbind( ".test" );
				$( "#select-choice-native" ).selectmenu( "option", "preventFocusZoom", zoomoptiondefault );
				ready();
			}, 0 );
		} );

	$( "#select-choice-native" )
		.selectmenu( "option", "preventFocusZoom", true )
		.parent()
			.trigger( "vmousedown" )
			.trigger( "mouseup" );
} );

QUnit.test( "The preventFocusZoom option does not manipulate zoom when it is false", function( assert ) {
	var ready = assert.async();

	var zoomstate = $.mobile.zoom.enabled,
		zoomoptiondefault = $.mobile.selectmenu.prototype.options.preventFocusZoom;

	$( document )
		.one( "vmousedown.test", function() {
			assert.ok( $.mobile.zoom.enabled === zoomstate, "zoom is unaffected on vmousedown" );
		} )
		.one( "mouseup.test", function() {
			assert.ok( $.mobile.zoom.enabled === zoomstate, "zoom is unaffected on mouseup" );
			$( document ).unbind( ".test" );
			$( "#select-choice-native" ).selectmenu( "option", "preventFocusZoom", zoomoptiondefault );
			ready();

		} );

	$( "#select-choice-native" )
		.selectmenu( "option", "preventFocusZoom", false )
		.parent()
			.trigger( "vmousedown" )
			.trigger( "mouseup" );
} );
} );
