/*
 * mobile panel unit tests
 */


(function( $ ){

	var defaults = $.mobile.panel.prototype.options,
		classes = defaults.classes;

	function getPageFromPanel( $panel ) {
		return $panel.closest( ":jqmData(role='page')" );
	}

	function getModalFromPanel( $panel ) {
		return $panel.data("mobile-panel")._modal;
	}

	function getWrapperFromPage( $page ) {
		return $page.find( "." + defaults.classes.pageWrapper );
	}

	module( "stock panel" );

	test( "expected classes on create", function() {

		var $panel = $( "#panel-test-create" ),
			$page = getPageFromPanel( $panel );

		ok( $panel.hasClass( defaults.classes.panel ), "default class is present" );
		ok( $panel.hasClass( "ui-panel-display-" + defaults.display ), "display class is added per the default" );
		ok( $panel.hasClass( "ui-panel-position-" + defaults.position ), "position class is added per the default" );

		equal( $panel.hasClass( defaults.classes.animate ), $.support.cssTransform3d, "animate class is present by default when supported" );
		ok( $panel.hasClass( defaults.classes.panelClosed ), "panel is closed by default" );
	});

	asyncTest( "expected open, close events", function() {

		expect( 4 );

		var $panel = $( "#panel-test-events" );

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
		expect( 11 );
		var $panel = $( "#panel-test-open" ),
			$page = getPageFromPanel( $panel );

		$panel.one( "panelopen", function( event ) {
			var $wrapper = getWrapperFromPage( $page ),
			$modal = getModalFromPanel( $panel ),
			$openButton = $page.find( "a[href='\\#panel-test-open']" );

			ok( !$openButton.hasClass( $.mobile.activeBtnClass ), "button doesn't have active class" );

			ok( !$panel.hasClass( defaults.classes.panelClosed ), "closed class removed" );
			ok( $panel.hasClass( defaults.classes.panelOpen ), "open class added" );

			equal( $wrapper.length, 1, "wrapper exists." );

			ok( !$wrapper.hasClass( defaults.classes.contentWrapClosed ), "wrapper not closed class" );

			ok( $wrapper.hasClass( defaults.classes.pageContentPrefix + "-open" ), "wrapper open class" );

			var prefix = defaults.classes.pageContentPrefix;
			ok( $wrapper.hasClass( prefix + "-position-left" ), "wrapper position class" );
			ok( $wrapper.hasClass( prefix + "-display-reveal" ), "wrapper display type class" );

			ok( $modal.hasClass( defaults.classes.modalOpen ), "modal open class" );
	
			prefix = defaults.classes.modal;
			ok( $modal.hasClass( prefix + "-position-left" ), "modal position class" );
			ok( $modal.hasClass( prefix + "-display-reveal" ), "modal display type class" );

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

		var $panel = $( "#panel-test-close" ),
			$page = getPageFromPanel( $panel ),
			$wrapper = getWrapperFromPage( $page ),
			$modal = getModalFromPanel( $panel ),
			$openButton = $page.find( "a[href='\\#panel-test-close']" );

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

			ok( !$wrapper.hasClass( defaults.classes.pageContentPrefix + "-open" ), "wrapper open class removed" );
			ok( !$page.hasClass( defaults.classes.pageBlock ), "page block class not added to page" );

			// TODO test positioning when panel height > screen height
			// TODO test rebind resize after complete

			start();
		});

		$panel.panel( "open" );

	});

	asyncTest( "toggle", function() {
		expect( 2 );

		var $panel = $( "#panel-test-toggle" ),
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

		var $page = getPageFromPanel( $( "#panel-test-wrapper" ) ),
			$wrapper = getWrapperFromPage( $page );

		ok( $wrapper.length, "wrapper exists" );
		ok( !$wrapper.hasClass( defaults.classes.pageContentPrefix + "-open" ), "wrapper does not have open class" );

	});

	// TODO _bindPageEvents

	test( "destroy method", function() {

		var $panel = $( "#panel-test-destroy" ),
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

		ok( !$panel.hasClass( [ classes.openComplete, classes.panelUnfixed, classes.panelClosed, classes.panelOpen ].join( " " ) ) );
		ok( !$page.hasClass( classes.pageBlock ) );

		$panel.panel();
	});

	module( "dismissable panel", {
		setup: function(){
			$.Event.prototype.originalEvent = {
				touches: [{ 'pageX' : 0 }, { 'pageY' : 0 }]
			};
		}
	});

	test( "dismissable", function() {
		var $panel = $( "#panel-test-dismiss" );
		equal( getModalFromPanel( $panel ).length, 1, "modal added to page" );
	});

	asyncTest( "click on dismissable modal closes panel", function() {

		expect( 1 );
		
		var $panel = $( "#panel-test-dismiss" ),
			$modal = getModalFromPanel( $panel );

		$panel.one( "panelopen", function() {

			$modal.trigger( "mousedown" );

		}).one( "panelclose", function() {

			ok( true, "modal is closed" );
			start();

		});

		$panel.panel( "open" );

	});

	asyncTest( "swipe on dismissable modal closes panel", function() {

		expect( 1 );

		var $panel = $( "#panel-test-dismiss" ),
			$modal = getModalFromPanel( $panel );

		$panel.one( "panelopen", function() {

			$modal.trigger( "swipeleft" );

		}).one( "panelclose", function() {

			ok( true, "modal is closed" );
			start();

		});

		$panel.panel( "open" );

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

	// Test for https://github.com/jquery/jquery-mobile/issues/6693
	asyncTest( "link unrelated to closing the panel does not close the panel", function() {
		var panel = $( "#panel-test-ignore-unrelated-link" ),
			eventNs = ".ignoreUnrelatedLinkClick";

		$( "#unrelated-link" ).one( "click", function( event ) {
			event.preventDefault();
		});

		$.testHelper.detailedEventCascade([
			function() {
				panel.panel( "open" );
			},

			{
				panelopen: { src: panel, event: "panelopen" + eventNs + "1" }
			},

			function( result ) {
				deepEqual( result.panelopen.timedOut, false, "Panel opened successfully" );
				$( "#unrelated-link" ).click();
			},

			{
				panelclose: { src: panel, event: "panelclose" + eventNs + "2" }
			},

			function( result ) {
				deepEqual( result.panelclose.timedOut, true, "Panel did not close in response to unrelated link click" );
				panel.panel( "close" );
			},

			{
				panelclose: { src: panel, event: "panelclose" + eventNs + "3" }
			},

			start
		]);
	});

}( jQuery ));
