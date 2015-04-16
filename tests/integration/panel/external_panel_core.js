var panel = $( "#wrapper-test-panel" ).panel(),
	stretchTestPanel = $( "#panel-stretch-test" ).panel();

asyncTest( "External panel updates wrapper correctly", function() {
var otherPageChildren,
	thisPage = $( "#start-page" ),
	otherPage = $( "#other-page" ),
	otherPageLink = $( "#go-to-other-page" );

expect( 7 );

$.testHelper.detailedEventCascade( [
	function() {
		panel.panel( "open" );
	},
	{
		panelopen: { src: panel, event: "panelopen.externalPanelUpdatesWrapperCorrectly1" }
	},
	function( result ) {
		deepEqual( result.panelopen.timedOut, false, "Panel did open" );
		deepEqual( thisPage.data( $.mobile.ns + "panel" ), "open",
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
		deepEqual( result.panelclose.timedOut, false, "Panel did close upon link click" );
		deepEqual( result.pagecontainerchange.timedOut, false,
			"pagecontainerchange event received" );
		deepEqual( otherPageChildren.length, 1, "Other page has exactly one child" );
		deepEqual( otherPageChildren.hasClass( "ui-panel-wrapper" ), true,
			"Other page child has class 'ui-panel-wrapper'" );
		deepEqual( thisPage.data( $.mobile.ns + "panel" ), undefined,
			"Data at key 'panel' on opening page absent" );
		$.mobile.back();
	},
	{
		pagecontainerchange: {
			src: $( window ),
			event: "pagecontainerchange.externalPanelUpdatesWrapperCorrectly2"
		}
	},
	start
] );
} );

asyncTest( "External panel stretches to acommodate page height", function( assert ) {
expect( 4 );

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
		$( "#panel-stretch-page .ui-content" ).height( $.mobile.getScreenHeight() * 3 );

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
	start
] );
} );
