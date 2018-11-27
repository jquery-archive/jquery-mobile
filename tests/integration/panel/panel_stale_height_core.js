define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Closing a panel removes the modal's height from its inline CSS", function( assert ) {
	var ready = assert.async();
	var eventNs = ".closingAPanelRemovesModalsHeightFromItsInlineCSS",
		panel = $( "#stale-height-panel" ),
		link = $( "#stale-height-panel-link" ),
		modal = $( ".ui-panel-dismiss" );

	$.testHelper.detailedEventCascade( [
		function() {
			link.click();
		},
		{
			panelopen: { src: panel, event: "panelopen" + eventNs + "1" }
		},
		function() {
			panel.panel( "close" );
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + "2" }
		},
		function() {
			assert.deepEqual( ( modal.attr( "style" ) || "" ).match( /height:\s*[0-9]/ ), null,
				"style attribute does not include a height field" );
			ready();
		}
	] );
} );

} );
