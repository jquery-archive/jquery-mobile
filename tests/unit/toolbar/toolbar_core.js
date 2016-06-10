/*
 * Mobile Fixed Toolbar unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

	QUnit.config.autostart = false;

	QUnit.module( "toolbar" );

	QUnit.test( "markup structure", function( assert ) {
		$( "body" ).pagecontainer( "change", "#default" );
		var toolbar = $( "#testHeaderClasses" ),
			toolbarH1 = toolbar.find( "h1" );

		assert.hasClasses( toolbar, "ui-toolbar-header",
			"toolbar gets ui-toolbar-header after init" );
		assert.hasClasses( toolbarH1, "ui-toolbar-title", "toolbar title assigned correctly" );
		assert.ok( toolbar.attr( "role" ) === "banner", "header gets banner role assigned" );
		assert.ok( toolbarH1.attr( "role" ) === "heading", "heading role properly assigned" );
	} );

	QUnit.test( "footer classes and roles assigned correctly", function( assert ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#default" );
		var toolbar = $( "#testFooterClasses" ),
			toolbarH1 = toolbar.find( "h1" );

		assert.hasClasses( toolbar, "ui-toolbar-footer",
			"toolbar gets ui-toolbar-footer after init" );
		assert.hasClasses( toolbarH1, "ui-toolbar-title", "toolbar title assigned correctly" );
		assert.ok( toolbar.attr( "role" ) === "contentinfo",
			"footer gets contentinfo role assigned" );
		assert.ok( toolbarH1.attr( "role" ) === "heading", "heading role properly assigned" );
	} );

	QUnit.asyncTest( "manual init works properly", function( assert ) {
		$( "body" ).pagecontainer( "change", "#default" );
		assert.expect( 3 );

		var toolbar = $( "#testInit" ).toolbar( {
			create: function() {
				assert.ok( true, "create event fired" );
				QUnit.start();
			}
		} );

		assert.hasClasses( toolbar, "ui-toolbar", "manual init gets base toolbar class" );
		assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title", "ui-toolbar-title assigned" );
	} );

	QUnit.asyncTest( "external headers are created properly", function( assert ) {
		$( "body" ).pagecontainer( "change", "#default" );
		assert.expect( 3 );

		var toolbar = $( "#testExternalHeader" ).toolbar( {
			create: function() {
				assert.ok( true, "external toolbar create event" );
				QUnit.start();
			}
		} );

		assert.hasClasses( toolbar, "ui-toolbar-header",
			"external toolbar gets ui-toolbar-header class" );
		assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title",
			"ui-toolbar-title assigned properly" );
	} );

	 QUnit.asyncTest( "external footers are created properly", function( assert ) {
		$( "body" ).pagecontainer( "change", "#default" );
		assert.expect( 3 );

		var toolbar = $( "#testExternalFooter" ).toolbar( {
			create: function() {
				assert.ok( true, "external toolbar create event" );
				QUnit.start();
			}
		} );

		assert.hasClasses( toolbar, "ui-toolbar-footer",
			"external toolbar gets ui-toolbar-footer class" );
		assert.hasClasses( toolbar.find( "h1" ), "ui-toolbar-title",
			"ui-toolbar-title assigned properly" );
	} );

	QUnit.test( "destroy preserves original structure", function( assert ) {
		$( "body" ).pagecontainer( "change", "#destroyPage" );

		var unEnhanced = $( "#testDestroy" ).clone(),
			destroyed = $( "#testDestroy" ).toolbar().toolbar( "destroy" ),
			unEnhancedHeader = $( "<div data-" + ( $.mobile.ns || "" ) + "role='toolbar' data-" +
							( $.mobile.ns || "" ) + "type='header'>" +
							"<h1>title</h1>" +
							"</div>" ),
			headerClone = unEnhancedHeader.clone();
		$( "#destroyPage" ).append( headerClone );
		headerClone.toolbar().toolbar( "destroy" );

		assert.ok( $.testHelper.domEqual( destroyed, unEnhanced ),
			"unEnhanced footer equals destroyed" );
		assert.ok( $.testHelper.domEqual( headerClone, unEnhancedHeader ),
			"headers match after destroy" );
	 } );

} );
