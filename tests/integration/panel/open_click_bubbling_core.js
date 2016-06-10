define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Click on link that opens panel may bubble and does not cause navigation", function( assert ) {
var origHref = location.href,
	eventNs = ".clickOnLinkThatOpensPanelMayBubble",
	panel = $( "#open-click-bubbling-panel" ),
	link = $( "#open-click-bubbling-link" ),
	ready = assert.async();

$.testHelper.detailedEventCascade( [
	function() {
		link.click();
	},
	{
		panelopen: { src: panel, event: "panelopen" + eventNs + "1" },
		click: { src: $( document ), event: "click" + eventNs + "1" }
	},
	function( result ) {
		assert.deepEqual( result.panelopen.timedOut, false, "panelopen event occurred" );
		assert.deepEqual( result.click.timedOut, false, "click propagated to document" );
	},
	{
		timeout: { length: 500 }
	},
	function() {
		assert.deepEqual( location.href, origHref, "opening the panel leaves location.href alone" );
		panel.panel( "close" );
	},
	{
		panelclose: { src: panel, event: "panelclose" + eventNs + "2" }
	},
	ready
] );
} );
} );
