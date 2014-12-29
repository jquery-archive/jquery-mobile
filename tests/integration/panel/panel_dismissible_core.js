( function( $ ) {

// Returns the portion of the test sequence asserting that the panel closes in response to various
// actions. This sequence is intended to be concatenated with one which initially opens the panel
// and prepended to one which finally proceeds after asserting that the panel is closed.
function panelExpectedToCloseSequence( panel, closeLink, eventNs, eventRound ) {
	return [

		// It is assumed that the previous function opened the panel, so initially a 'panelopen'
		// event is expected

		// Close via swipe
		{
			panelopen: { src: panel, event: "panelopen" + eventNs + ( eventRound.i++ ) }
		},
		function( result ) {
			deepEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			panel.swipeleft();
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		},

		// Close via escape
		function( result ) {
			deepEqual( result.panelclose.timedOut, false, "Swipe: 'panelclose' event received" );
			panel.panel( "open" );
		},
		{
			panelopen: { src: panel, event: "panelopen" + eventNs + ( eventRound.i++ ) }
		},
		function( result ) {
			deepEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			panel.trigger( $.extend( $.Event( "keyup" ), { keyCode: 27 } ) );
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		},

		// Close via mousedown
		function( result ) {
			deepEqual( result.panelclose.timedOut, false, "Escape: 'panelclose' event received" );
			panel.panel( "open" );
		},
		{
			panelopen: { src: panel, event: "panelopen" + eventNs + ( eventRound.i++ ) }
		},
		function( result ) {
			deepEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			panel
				.data( "mobile-panel" )._modal
					.trigger( $.extend( $.Event( "mousedown" ), { originalEvent: {} } ) );
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		},

		// Close via link click
		function( result ) {
			deepEqual( result.panelclose.timedOut, false, "Mouse: 'panelclose' event received" );
			panel.panel( "open" );
		},
		{
			panelopen: { src: panel, event: "panelopen" + eventNs + ( eventRound.i++ ) }
		},
		function( result ) {
			deepEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			closeLink.click();
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		},

		// Close programmatically
		function( result ) {
			deepEqual( result.panelclose.timedOut, false, "Link: 'panelclose' event received" );
			panel.panel( "open" );
		},
		{
			panelopen: { src: panel, event: "panelopen" + eventNs + ( eventRound.i++ ) }
		},
		function( result ) {
			deepEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			panel.panel( "close" );
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		}

		// It is assumed that the next function will assert that the panel was closed based on the
		// result of the 'panelclose' event expected above
	];
}

// Returns the portion of the test sequence asserting that the panel does not close in response to
// various actions. This sequence is intended to be concatenated with one which initially opens the
// panel and prepended to one which finally proceeds after asserting that the panel is closed.
function panelExpectedNotToCloseSequence( panel, closeLink, eventNs, eventRound ) {
	return [

		// It is assumed that the previous function opened the panel, so initially a 'panelopen'
		// event is expected

		{
			panelopen: { src: panel, event: "panelopen" + eventNs + ( eventRound.i++ ) }
		},

		// Close via swipe
		function( result ) {
			deepEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			panel.swipeleft();
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		},

		// Close via escape
		function( result ) {
			deepEqual( result.panelclose.timedOut, true, "Swipe: 'panelclose' not triggered" );
			panel.trigger( $.extend( $.Event( "keyup" ), { keyCode: 27 } ) );
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		},

		// Cannot test close via mousedown because there is no modal onto which to mousedown

		// Programmatic close
		function( result ) {
			deepEqual( result.panelclose.timedOut, true, "Escape: 'panelclose' not triggered" );
			panel.panel( "close" );
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		},

		// Close via link click
		function( result ) {
			deepEqual( result.panelclose.timedOut, false, "Program: 'panelclose' event received" );
			panel.panel( "open" );
		},
		{
			panelopen: { src: panel, event: "panelopen" + eventNs + ( eventRound.i++ ) }
		},
		function( result ) {
			deepEqual( result.panelopen.timedOut, false, "'panelopen' event received" );
			closeLink.click();
		},
		{
			panelclose: { src: panel, event: "panelclose" + eventNs + ( eventRound.i++ ) }
		}

		// It is assumed that the next function will assert that the panel was closed based on the
		// result of the 'panelclose' event expected above
	];
}

function defineInitiallyDismissibleTestForPanelType( panelType ) {
	asyncTest( "Setting option renders initially dismissible " + panelType +
		" panel non-dismissible", function() {
			var eventRound = { i: 1 },
				increment = { value: 1 },
				eventNs = "." + panelType + "SettingOptionRendersDismissibleNonDismissible";
				panel = $( "#" + panelType + "-initially-dismissible" ),
				closeLink = $( "#" + panelType + "-close-initially-dismissible" );

			$.testHelper.detailedEventCascade([
					function() {
						deepEqual( !!panel.data( "mobile-panel" )._modal, true,
							"Modal initially set" );
						panel.panel( "open" );
					}
				]
				.concat( panelExpectedToCloseSequence( panel, closeLink, eventNs, eventRound ) )
				.concat([
					function( result ) {
						deepEqual( result.panelclose.timedOut, false,
							"Program: 'panelclose' event received" );
						panel.panel( "option", "dismissible", false );
						deepEqual( !!panel.data( "mobile-panel" )._modal, false,
							"Modal unset after unsetting option 'dismissible'" );
						panel.panel( "open" );
					}])
				.concat( panelExpectedNotToCloseSequence( panel, closeLink, eventNs, eventRound ) )
				.concat([
					function( result ) {
						deepEqual( result.panelclose.timedOut, false,
							"Link: 'panelclose' event received" );
						start();
					}
				]));
		});
	}

function defineInitiallyNotDismissibleTestForPanelType( panelType ) {
	asyncTest( "Setting option renders initially non-dismissible " + panelType +
		" panel dismissible", function() {
			var eventRound = { i: 1 },
				eventNs = "." + panelType + "SettingOptionRendersNonDismissibleDismissible";
				panel = $( "#" + panelType + "-initially-not-dismissible" ),
				closeLink = $( "#" + panelType + "-close-initially-not-dismissible" );

			$.testHelper.detailedEventCascade([
					function() {
						deepEqual( !!panel.data( "mobile-panel" )._modal, false,
							"Modal initially unset" );
						panel.panel( "open" );
					}]
				.concat( panelExpectedNotToCloseSequence( panel, closeLink, eventNs, eventRound ) )
				.concat([
					function( result ) {
						deepEqual( result.panelclose.timedOut, false,
							"Link: 'panelclose' event received" );
						panel.panel( "option", "dismissible", true );
						deepEqual( !!panel.data( "mobile-panel" )._modal, true,
							"Modal set after setting option 'dismissible'" );
						panel.panel( "open" );
					}])
				.concat( panelExpectedToCloseSequence( panel, closeLink, eventNs, eventRound ) )
				.concat([
					function( result ) {
						deepEqual( result.panelclose.timedOut, false,
							"Program: 'panelclose' event received" );
						start();
					}
				]));
		});
	}

defineInitiallyDismissibleTestForPanelType( "reveal" );
defineInitiallyDismissibleTestForPanelType( "overlay" );
defineInitiallyDismissibleTestForPanelType( "push" );

defineInitiallyNotDismissibleTestForPanelType( "reveal" );
defineInitiallyNotDismissibleTestForPanelType( "overlay" );
defineInitiallyNotDismissibleTestForPanelType( "push" );

})( jQuery );
