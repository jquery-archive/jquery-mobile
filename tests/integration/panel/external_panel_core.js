var panel = $( "#wrapper-test-panel" ).panel();

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
