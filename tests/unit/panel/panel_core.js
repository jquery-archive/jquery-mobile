/*
 * mobile panel unit tests
 */

(function($){
	var defaults = $.mobile.panel.prototype.options,
		classes = defaults.classes;

	//QUnit.config.reorder = false;

	function getPageFromPanel( $panel ) {
		return $panel.closest( ":jqmData(role='page')" );
	}

	function getModalFromPanel( $panel ) {
		var $page = getPageFromPanel( $panel );

		return $page.find( "." + defaults.classes.modal ).filter(function() {
			return $( this ).data( "panelid" ) === $panel.attr( "id" );
		});
	}

	function getWrapperFromPage( $page ) {
		return $page.find( "." + defaults.classes.contentWrap );
	}

	$(document).on( "pageinit", function() {

		module( "stock panel");

		test( "expected classes on create", function() {

			var $panel = $( "#panel-test-stock" ),
				$page = getPageFromPanel( $panel );

			ok( $panel.hasClass( defaults.classes.panel ), "default class is present" );
			ok( $panel.hasClass( "ui-panel-display-" + defaults.display ), "display class is added per the default" );
			ok( $panel.hasClass( "ui-panel-position-" + defaults.position ), "position class is added per the default" );

			equal( $panel.hasClass( "ui-panel-animate" ), $.support.cssTransform3d, "animate class is present by default when supported" );
			equal( $page.hasClass( defaults.classes.pageChildAnimations ), $.support.cssTransform3d, "animation wrapper class added to page" );
			ok( $panel.hasClass( defaults.classes.panelClosed ), "panel is closed by default" );
			equal( $panel.hasClass( defaults.classes.cssTransform3d ), $.support.cssTransform3d, "transforms class added to page" );
		});

		asyncTest( "expected open, close events", function() {

			expect( 4 );

			var $panel = $( "#panel-test-stock" );

			$panel.one( "panelbeforeopen panelopen panelbeforeclose panelclose", function( event ) {
				ok( true, event.type + " event." );
			}).one( "panelopen", function() {
				$panel.panel( "close" );
			}).one( "panelclose", function() {
				start();
			});

			$panel.panel( "open" );

		});

		asyncTest( "classes modified by open", function() {
			expect( 13 );

			var $panel = $( "#panel-test-stock" ),
				$page = getPageFromPanel( $panel ),
				$wrapper = getWrapperFromPage( $page ),
				$modal = getModalFromPanel( $panel ),
				$openButton = $page.find( "a[href='\\#panel-test-stock']" );

			$panel.one( "panelopen", function( event ) {
				ok( !$openButton.hasClass( $.mobile.activeBtnClass ), "button doesn't have active class" );

				ok( $page.hasClass( defaults.classes.pageBlock ), "page block class added to page" );
				ok( !$panel.hasClass( defaults.classes.panelClosed ), "closed class removed" );
				ok( $panel.hasClass( defaults.classes.panelOpen ), "open class added" );

				ok( !$wrapper.hasClass( defaults.classes.contentWrapClosed ), "wrapper not closed class" );
				ok( $wrapper.hasClass( defaults.classes.contentWrapOpen ), "wrapper open class" );

				var prefix = defaults.classes.contentWrap;
				ok( $wrapper.hasClass( prefix + "-position-left" ), "wrapper position class" );
				ok( $wrapper.hasClass( prefix + "-display-overlay" ), "wrapper display type class" );

				ok( $modal.hasClass( defaults.classes.modalOpen ), "modal open class" );
				prefix = defaults.classes.modal;
				ok( $modal.hasClass( prefix + "-position-left" ), "modal position class" );
				ok( $modal.hasClass( prefix + "-display-overlay" ), "modal display type class" );

				// complete
				ok( $panel.hasClass( defaults.classes.openComplete ), "open complete class" );
				ok( $wrapper.hasClass( defaults.classes.contentWrapOpenComplete ), "wrapper open complete class" );

				// TODO test positioning when panel height > screen height
				// TODO test rebind resize after complete

				$panel.panel( "close" );
			}).one( "panelclose", function() {
				start();
			});

			$panel.panel( "open" );

		});

		asyncTest( "classes modified by close", function() {
			expect( 12 );

			var $panel = $( "#panel-test-stock" ),
				$page = getPageFromPanel( $panel ),
				$wrapper = getWrapperFromPage( $page ),
				$modal = getModalFromPanel( $panel ),
				$openButton = $page.find( "a[href='\\#panel-test-stock']" );

			$panel.one( "panelopen", function( event ) {
				$panel.panel( "close" );
			}).one( "panelclose", function( event ) {
				ok( !$openButton.hasClass( $.mobile.activeBtnClass ), "button doesn't have active class" );
				ok( !$panel.hasClass( defaults.classes.panelOpen ), "panel not open class" );

				ok( !$modal.hasClass( defaults.classes.modalOpen ), "modal without open class" );
				var prefix = defaults.classes.modal;
				ok( !$modal.hasClass( prefix + "-position-left" ), "modal without position class" );
				ok( !$modal.hasClass( prefix + "-display-overlay" ), "modal without display type class" );

				ok( !$wrapper.hasClass( defaults.classes.contentWrapOpen ), "wrapper open class" );
				ok( !$wrapper.hasClass( defaults.classes.contentWrapOpenComplete ), "wrapper open complete class" );

				// complete
				ok( $panel.hasClass( defaults.classes.panelClosed ), "panel closed class" );

				prefix = defaults.classes.contentWrap;
				ok( !$wrapper.hasClass( prefix + "-position-left" ), "wrapper position class" );
				ok( !$wrapper.hasClass( prefix + "-display-overlay" ), "wrapper display type class" );

				ok( $wrapper.hasClass( defaults.classes.contentWrapClosed ), "wrapper closed class" );
				ok( !$page.hasClass( defaults.classes.pageBlock ), "page block class not added to page" );

				// TODO test positioning when panel height > screen height
				// TODO test rebind resize after complete

				start();
			});

			$panel.panel( "open" );

		});

		asyncTest( "toggle", function() {
			expect( 2 );

			var $panel = $( "#panel-test-stock" ),
				$page = getPageFromPanel( $panel );

			$panel.one( "panelopen", function( event ) {
				ok( true, "toggle open" );
				$panel.panel( "close" );
			}).one( "panelclose", function( event ) {
				ok( true, "toggle closed" );
				start();
			});

			$panel.panel( "toggle" );

		});

		test( "wrapper exists after create", function() {

			var $page = getPageFromPanel( $( "#panel-test-stock" ) ),
				$wrapper = getWrapperFromPage( $page );

			ok( $wrapper.length, "wrapper exists" );
			ok( $wrapper.hasClass( defaults.classes.contentWrapClosed ), "wrapper has closed class" );

		});

		// TODO _bindPageEvents

		test( "dismissable", function() {

			var $panel = $( "#panel-test-stock" );

			equal( getModalFromPanel( $panel ).length, 1, "modal added to page" );
		});

		asyncTest( "click on dismissable modal closes panel", function() {

			expect( 1 );

			var $panel = $( "#panel-test-stock" ),
				$modal = getModalFromPanel( $panel );

			$panel.one( "panelopen", function() {

				$modal.trigger( "mousedown" );

			}).one( "panelclose", function() {

				ok( true, "modal is closed" );
				start();

			});

			$panel.panel( "open" );

		});

		test( "destroy method", function() {

			var $panel = $( "#panel-test-stock" ),
				$page = getPageFromPanel( $panel ),
				$wrapper = getWrapperFromPage( $page );

			$panel.panel( "destroy" );
			// test page without sibling panels

			ok( !$wrapper.hasClass( defaults.classes.contentWrapOpen ) );
			ok( !$wrapper.hasClass( defaults.classes.contentWrapOpenComplete ) );

			ok( !$panel.hasClass( defaults.classes.panel ) );
			ok( !$wrapper.hasClass( "ui-panel-position-left" ) );
			ok( !$wrapper.hasClass( "ui-panel-display-overlay" ) );
			ok( !$panel.hasClass( defaults.classes.panelOpen ) );
			ok( !$panel.hasClass( defaults.classes.panelClosed ) );
			ok( !$panel.hasClass( "ui-body-c" ) );
			ok( !$panel.hasClass( defaults.classes.cssTransform3d ) );
			ok( getModalFromPanel( $panel ).length === 0, "modal was removed" );

			ok( !$panel.hasClass( [ classes.openComplete, classes.panelUnfixed, classes.panelClosed, classes.panelOpen ].join( " " ) ) );
			ok( !$page.hasClass( classes.pageBlock ) );

			$panel.panel();
		});

		module( "panel with non-default theme" );

		test( "expected classes on create", function() {

			var $panel = $( "#panel-test-non-default-theme" );
			ok( $panel.hasClass( "ui-body-" + $panel.jqmData('theme') ), "theme class was added" );

		});

		module( "panel with close button" );

		asyncTest( "panel opens, close button hides panel", function() {
			expect( 2 );

			var $panel = $( "#panel-test-with-close" ),
				$page = getPageFromPanel( $panel ),
				$closeButton = $panel.find( ":jqmData(rel='close')" );

			$panel.one( "panelopen", function() {

				ok( !$panel.hasClass( defaults.classes.panelClosed ), "wrapper opens" );
				$closeButton.trigger( "click" );

			}).one( "panelclose", function() {

				ok( $panel.hasClass( defaults.classes.panelClosed ), "wrapper has closed class" );
				start();
			});

			$panel.panel( "open" );
		});

	});


}( jQuery ));
