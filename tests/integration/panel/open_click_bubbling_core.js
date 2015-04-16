asyncTest( "Click on link that opens panel may bubble and does not cause navigation", function() {
var origHref = location.href,
	eventNs = ".clickOnLinkThatOpensPanelMayBubble",
	panel = $( "#open-click-bubbling-panel" ),
	link = $( "#open-click-bubbling-link" );

$.testHelper.detailedEventCascade( [
	function() {
		link.click();
	},
	{
		panelopen: { src: panel, event: "panelopen" + eventNs + "1" },
		click: { src: $( document ), event: "click" + eventNs + "1" }
	},
	function( result ) {
		deepEqual( result.panelopen.timedOut, false, "panelopen event occurred" );
		deepEqual( result.click.timedOut, false, "click propagated to document" );
	},
	{
		timeout: { length: 500 }
	},
	function() {
		deepEqual( location.href, origHref, "opening the panel leaves location.href alone" );
		panel.panel( "close" );
	},
	{
		panelclose: { src: panel, event: "panelclose" + eventNs + "2" }
	},
	start
] );
} );
