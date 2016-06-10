define( [ "qunit", "jquery" ], function( QUnit, $ ) {

var panel = $( "#wrapper-test-panel" ).panel(),
	stretchTestPanel = $( "#panel-stretch-test" ).panel();

QUnit.test( "External panel updates wrapper correctly", function( assert ) {
var otherPageChildren,
	thisPage = $( "#start-page" ),
	otherPage = $( "#other-page" ),
	otherPageLink = $( "#go-to-other-page" ),
	ready = assert.async();

assert.expect( 7 );

$.testHelper.detailedEventCascade( [
	function() {
		panel.panel( "open" );
	},
	{
		panelopen: { src: panel, event: "panelopen.externalPanelUpdatesWrapperCorrectly1" }
	},
	function( result ) {
		assert.deepEqual( result.panelopen.timedOut, false, "Panel did open" );
		assert.deepEqual( thisPage.data( $.mobile.ns + "panel" ), "open",
			"Data at key 'panel' on opening page present" );
		otherPageLink.click();
	},
	{
		panelclose: { src: panel, event: "panelclose.externalPanelUpdatesWrapperCorrectly2" },
		pagecontainerchange: {
			src: $( window ),
			event: "pagecontainerchange.externalPanelUpdatesWrapperCorrectly2"
		}
	},
	function( result ) {
		otherPageChildren = otherPage.children();
		assert.deepEqual( result.panelclose.timedOut, false, "Panel did close upon link click" );
		assert.deepEqual( result.pagecontainerchange.timedOut, false,
			"pagecontainerchange event received" );
		assert.deepEqual( otherPageChildren.length, 1, "Other page has exactly one child" );
		assert.deepEqual( otherPageChildren.hasClass( "ui-panel-wrapper" ), true,
			"Other page child has class 'ui-panel-wrapper'" );
		assert.deepEqual( thisPage.data( $.mobile.ns + "panel" ), undefined,
			"Data at key 'panel' on opening page absent" );
		$.mobile.back();
	},
	{
		pagecontainerchange: {
			src: $( window ),
			event: "pagecontainerchange.externalPanelUpdatesWrapperCorrectly2"
		}
	},
	ready
] );
} );

QUnit.test( "External panel stretches to acommodate page height", function( assert ) {
assert.expect( 4 );

var ready = assert.async();
var eventNs = ".externalPanelStretches";

$.testHelper.detailedEventCascade( [
	function() {
		$( "body" ).pagecontainer( "change", "#panel-stretch-page" );
	},
	{
		pagecontainerchange: { src: $( window ), event: "pagecontainerchange" + eventNs + "1" }
	},
	function( result ) {
		assert.deepEqual( result.pagecontainerchange.timedOut, false,
			"Successfully changed to page '#panel-stretch-page'" );

		// Make the page scroll
		$( "#panel-stretch-page .ui-content" ).height( $( window ).height() * 3 );

		stretchTestPanel.panel( "open" );
	},
	{
		panelopen: { src: stretchTestPanel, event: "panelopen" + eventNs + "2" }
	},
	function( result ) {

		// Making assertions about the document height has to happen immediately after the
		// operation that modifies the document height takes place, because the act of
		// recording the assertion itself may modify the document height, because QUnit will
		// insert new DOM elements to visually record the assertion, and the addition of such
		// DOM elements may affect the document height.
		assert.deepEqual( stretchTestPanel.outerHeight( true ), $( document ).height(),
			"Panel is as tall as the document" );
		assert.deepEqual( result.panelopen.timedOut, false, "Panel opened successfully" );
		stretchTestPanel.panel( "close" );
	},
	{
		panelclose: { src: stretchTestPanel, event: "panelclose" + eventNs + "3" }
	},
	function( result ) {
		assert.deepEqual( result.panelclose.timedOut, false, "Panel closedsuccessfully" );
		$.mobile.back();
	},
	{
		pagecontainerchange: { src: $( window ), event: "pagecontainerchange" + eventNs + "4" }
	},
	ready
] );
} );
} );
