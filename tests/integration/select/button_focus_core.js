define( [ "qunit", "jquery" ], function( QUnit, $ ) {

function defineTest( testName, clickAction, expectChange ) {
	QUnit.test( testName, function( assert ) {
		var ready = assert.async();
		var eventNs = "." + $.camelCase( testName.replace( / /g, "-" ) );

		assert.expect( expectChange ? 6 : 5 );

		$.testHelper.detailedEventCascade( [
			function() {
				$( "#button-focus-test-button" ).click();
			},
			{
				pagecontainerchange: {
					src: $( document ),
					event: "pagecontainerchange" + eventNs + "1"
				}
			},
			function( result ) {
				var activePage = $( ".ui-pagecontainer" ).pagecontainer( "getActivePage" );

				assert.deepEqual( result.pagecontainerchange.timedOut, false, "Page change has occurred" );
				assert.deepEqual( activePage.attr( "id" ), "button-focus-test-dialog", "Dialog is active" );
				clickAction( activePage );
			},
			$.extend( {
				pagecontainerchange: {
					src: $( document ),
					event: "pagecontainerchange" + eventNs + "2"
				},
				focus: {
					src: $( "#button-focus-test-button" ),
					event: "focus" + eventNs + "2"
				}
			}, ( expectChange ? {
				change: {
					src: $( "#button-focus-test" ),
					event: "change" + eventNs + "2"
				}
			} : {} ) ),
			function( result ) {
				var activePage = $( ".ui-pagecontainer" ).pagecontainer( "getActivePage" );

				assert.deepEqual( result.pagecontainerchange.timedOut, false, "Page change has occurred" );
				assert.deepEqual( activePage.attr( "id" ), "default", "Default page is active" );
				assert.deepEqual( result.focus.timedOut, false, "Button has received focus" );
				if ( expectChange ) {
					assert.deepEqual( result.change.timedOut, false, "Element has emitted 'change'" );
				}
				ready();
			}
		] );
	} );
}

defineTest( "Selectmenu regains focus when dialog closes without changes", function( dialogPage ) {
dialogPage.find( "a" ).first().click();
} );

defineTest( "Selectmenu regains focus when dialog closes due to change", function( dialogPage ) {
dialogPage.find( "#button-focus-test-menu li" ).eq( 11 ).click();
}, true );

} );
