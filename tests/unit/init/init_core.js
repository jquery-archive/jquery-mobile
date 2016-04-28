/*
 * Mobile init tests
 */

define( [
	"qunit",
	"jquery",
	"jquery.mobile",
	"tests/unit/init/shared",
	"tests/unit/init/prepare"
], function( QUnit, $, jqm, shared ) {

require( [
	"init"
], function() {
	var libName = "init",
		coreLib = "core",
		extendFn = $.extend,
		setGradeA = function( value ) {
			$.mobile.gradeA = function() {
				return value;
			};
		},
		reloadCoreNSandInit = function() {
			$.testHelper.reloadLib( "../../jquery.setNameSpace.js" );
			return $.when( $.testHelper.reloadModule( coreLib ), $.testHelper.reloadModule( libName ) );
		};

	QUnit.module( libName, {
		setup: function() {
			$.mobile.ns = shared.ns;

			// NOTE reset for gradeA tests
			$( "html" ).removeClass( "ui-mobile" );
		},

		teardown: function() {
			$.extend = extendFn;

			// Clear the classes added by reloading the init
			$( "html" ).attr( "class", "" );
		}
	} );

	// NOTE for the following two tests see index html for the binding
	QUnit.test( "mobile.page is available when mobile init is fired", function( assert ) {
		assert.ok( shared.page !== undefined, "$.mobile.page is defined" );
	} );

	$.testHelper.excludeFileProtocol( function() {
		QUnit.test( "loading the init library triggers mobilinit on the document", function( assert ) {
			var done = assert.async();
			var initFired = false;
			assert.expect( 1 );

			$( window.document ).one( "mobileinit", function() {
				initFired = true;
			} );

			$.testHelper.reloadModule( libName ).then( function() {
				assert.ok( initFired, "init fired" );
			} ).then( done );
		} );

		QUnit.test( "enhancements are skipped when the browser is not grade A", function( assert ) {
			var done = assert.async();
			setGradeA( false );
			$.testHelper.reloadModule( libName ).then( function() {

				//NOTE easiest way to check for enhancements, not the most obvious
				assert.ok( !$( "html" ).hasClass( "ui-mobile" ), "html elem doesn't have class ui-mobile" );
			} ).then( done );

		} );

		QUnit.test( "enhancements are added when the browser is grade A", function( assert ) {
			var done = assert.async();
			assert.expect( 1 );
			setGradeA( true );
			$.testHelper.reloadModule( libName ).then(
				function() {
					assert.ok( $( "html" ).hasClass( "ui-mobile" ), "html elem has class mobile" );
				}
			).then( done );
		} );

		var findFirstPage = function() {
			return $( ":jqmData(role='page')" ).first();
		};

		QUnit.test( "active page and start page should be set to the fist page in the selected set", function( assert ) {
			var done = assert.async();
			assert.expect( 2 );
			$.testHelper.reloadModule( libName ).then(
				function() {
					var firstPage = findFirstPage();

					assert.deepEqual( $.mobile.firstPage[ 0 ], firstPage[ 0 ] );
					assert.deepEqual( $.mobile.activePage[ 0 ], firstPage[ 0 ] );
				}
			).then( done );
		} );

		QUnit.test( "mobile viewport class is defined on the first page's parent", function( assert ) {
			var done = assert.async();
			assert.expect( 1 );
			$.testHelper.reloadModule( libName ).then(
				function() {
					var firstPage = findFirstPage();

					assert.ok( firstPage.parent().hasClass( "ui-mobile-viewport" ), "first page has viewport" );
				}
			).then( done );
		} );

		QUnit.test( "mobile page container is the first page's parent", function( assert ) {
			var done = assert.async();
			assert.expect( 1 );
			$.testHelper.reloadModule( libName ).then(
				function() {
					var firstPage = findFirstPage();

					assert.deepEqual( $( ".ui-pagecontainer" )[ 0 ], firstPage.parent()[ 0 ] );
				}
			).then( done );
		} );

		QUnit.test( "pages without a data-url attribute have it set to their id", function( assert ) {
			assert.deepEqual( $( "#foo" ).jqmData( "url" ), "foo" );
		} );

		QUnit.test( "pages with a data-url attribute are left with the original value", function( assert ) {
			assert.deepEqual( $( "#bar" ).jqmData( "url" ), "bak" );
		} );

		// NOTE the next two tests work on timeouts that assume a page will be
		// created within 2 seconds it'd be great to get these using a more
		// reliable callback or event
		QUnit.test( "page does auto-initialize at domready when autoinitialize option is true (default) ", function( assert ) {
			var done = assert.async();

			$( "<div />", { "data-nstest-role": "page", "id": "autoinit-on" } ).prependTo( "body" );

			$( document ).one( "mobileinit", function() {
				$.mobile.autoInitializePage = true;
			} );

			location.hash = "";

			reloadCoreNSandInit().then(
				function() {
					assert.deepEqual( $( "#autoinit-on.ui-page" ).length, 1 );
				}
			).then( done );
		} );

		QUnit.test( "page does not initialize at domready when autoinitialize option is false ", function( assert ) {
			var done = assert.async();
			$( document ).one( "mobileinit", function() {
				$.mobile.autoInitializePage = false;
			} );

			$( "<div />", { "data-nstest-role": "page", "id": "autoinit-off" } ).prependTo( "body" );

			location.hash = "";

			reloadCoreNSandInit().then(
				function() {
					assert.deepEqual( $( "#autoinit-off.ui-page" ).length, 0 );

					$( document ).bind( "mobileinit", function() {
						$.mobile.autoInitializePage = true;
					} );

					return reloadCoreNSandInit();
				}
			).then( done );
		} );
	} );

	QUnit.start();
} );
} );
