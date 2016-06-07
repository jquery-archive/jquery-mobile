define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Panel inner wrapper and page wrapper are attached even if they have nothing to wrap",
	function( assert ) {
		var panel = $( "#empty-page-test" );

		assert.strictEqual( panel.children( ".ui-panel-inner" ).length, 1,
			"Empty panel contains inner wrapper" );
		assert.strictEqual( $( "#empty-page" ).children( ".ui-panel-wrapper" ).length, 1,
			"Empty page contains panel wrapper" );
	} );

QUnit.test( "Empty panel on empty page opens correctly", function( assert ) {
	var eventNs = ".emptyPanelOnEmptyPageOpensCorrectly",
		done = assert.async(),
		panel = $( "#empty-page-test" );

	$.testHelper.detailedEventCascade( [
		function() {
			panel.panel( "open" );
		},
		{
			panelbeforeopen: { src: panel, event: "panelbeforeopen" + eventNs + "1" },
			panelopen: { src: panel, event: "panelopen" + eventNs + "1" }
		},
		function( result ) {
			assert.strictEqual( result.panelbeforeopen.timedOut, false,
				"'panelbeforeopen' event received" );
			assert.strictEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			assert.strictEqual( result.panelbeforeopen.idx < result.panelopen.idx, true,
				"'panelbeforeopen' arrived before 'panelopen'" );
			panel.panel( "close" );
		},
		{
			panelbeforeclose: { src: panel, event: "panelbeforeclose" + eventNs + "2" },
			panelclose: { src: panel, event: "panelclose" + eventNs + "2" }
		},
		function( result ) {
			assert.strictEqual( result.panelbeforeclose.timedOut, false,
				"'panelbeforeclose' event received" );
			assert.strictEqual( result.panelclose.timedOut, false, "'panelclose' event received" );
			assert.strictEqual( result.panelbeforeclose.idx < result.panelclose.idx, true,
				"'panelbeforeclose' arrived before 'panelclose'" );
			done();
		}
	] );
} );

} );
