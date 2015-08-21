/*
 * mobile panel unit tests
 */


( function( QUnit, $ ) {

var count,
	defaults = $.mobile.panel.prototype.options,
	classes = defaults.classes,
	originalWidget = $.mobile.panel.prototype;

function getPageFromPanel( $panel ) {
	return $panel.closest( ":jqmData(role='page')" );
}

function getModalFromPanel( $panel ) {
	return $panel.data( "mobile-panel" )._modal;
}

function getWrapperFromPage( $page ) {
	return $page.find( "." + defaults.classes.pageWrapper );
}

QUnit.module( "stock panel" );

QUnit.test( "expected classes on create", function( assert ) {

	var $panel = $( "#panel-test-create" ),
		$page = getPageFromPanel( $panel );

	assert.ok( $panel.hasClass( defaults.classes.panel ), "default class is present" );
	assert.ok( $panel.hasClass( "ui-panel-display-" + defaults.display ), "display class is added per the default" );
	assert.ok( $panel.hasClass( "ui-panel-position-" + defaults.position ), "position class is added per the default" );

	assert.equal( $panel.hasClass( defaults.classes.animate ), $.support.cssTransform3d, "animate class is present by default when supported" );
	assert.ok( $panel.hasClass( defaults.classes.panelClosed ), "panel is closed by default" );
} );

QUnit.asyncTest( "expected open, close events", function( assert ) {

	assert.expect( 4 );

	var $panel = $( "#panel-test-events" );

	$panel.one( "panelbeforeopen panelopen panelbeforeclose panelclose", function( event ) {
		assert.ok( true, event.type + " event." );
	} ).one( "panelopen", function() {
		$panel.panel( "close" );
	} ).one( "panelclose", function() {
		QUnit.start();
	} );

	$panel.panel( "open" );

} );

QUnit.asyncTest( "classes modified by open", function( assert ) {
	assert.expect( 11 );
	var $panel = $( "#panel-test-open" ),
		$page = getPageFromPanel( $panel );

	$panel.one( "panelopen", function( event ) {
		var $wrapper = getWrapperFromPage( $page ),
			$modal = getModalFromPanel( $panel ),
			$openButton = $page.find( "a[href='\\#panel-test-open']" );

		assert.ok( !$openButton.hasClass( "ui-button-active" ), "button doesn't have active class" );

		assert.ok( !$panel.hasClass( defaults.classes.panelClosed ), "closed class removed" );
		assert.ok( $panel.hasClass( defaults.classes.panelOpen ), "open class added" );

		assert.equal( $wrapper.length, 1, "wrapper exists." );

		assert.ok( !$wrapper.hasClass( defaults.classes.contentWrapClosed ), "wrapper not closed class" );

		assert.ok( $wrapper.hasClass( defaults.classes.pageContentPrefix + "-open" ), "wrapper open class" );

		var prefix = defaults.classes.pageContentPrefix;
		assert.ok( $wrapper.hasClass( prefix + "-position-left" ), "wrapper position class" );
		assert.ok( $wrapper.hasClass( prefix + "-display-reveal" ), "wrapper display type class" );

		assert.ok( $modal.hasClass( defaults.classes.modalOpen ), "modal open class" );

		prefix = defaults.classes.modal;
		assert.ok( $modal.hasClass( prefix + "-position-left" ), "modal position class" );
		assert.ok( $modal.hasClass( prefix + "-display-reveal" ), "modal display type class" );

		// TODO test positioning when panel height > screen height
		// TODO test rebind resize after complete

		$panel.panel( "close" );
	} ).one( "panelclose", function() {
		QUnit.start();
	} );

	$panel.panel( "open" );

} );

QUnit.asyncTest( "classes modified by close", function( assert ) {
	assert.expect( 12 );

	var $panel = $( "#panel-test-close" ),
		$page = getPageFromPanel( $panel ),
		$wrapper = getWrapperFromPage( $page ),
		$modal = getModalFromPanel( $panel ),
		$openButton = $page.find( "a[href='\\#panel-test-close']" );

	$panel.one( "panelopen", function( event ) {
		$panel.panel( "close" );
	} ).one( "panelclose", function( event ) {
		assert.ok( !$openButton.hasClass( "ui-button-active" ), "button doesn't have active class" );
		assert.ok( !$panel.hasClass( defaults.classes.panelOpen ), "panel not open class" );

		assert.ok( !$modal.hasClass( defaults.classes.modalOpen ), "modal without open class" );
		var prefix = defaults.classes.modal;
		assert.ok( !$modal.hasClass( prefix + "-position-left" ), "modal without position class" );
		assert.ok( !$modal.hasClass( prefix + "-display-overlay" ), "modal without display type class" );

		assert.ok( !$wrapper.hasClass( defaults.classes.contentWrapOpen ), "wrapper open class" );
		assert.ok( !$wrapper.hasClass( defaults.classes.contentWrapOpenComplete ), "wrapper open complete class" );

		// complete
		assert.ok( $panel.hasClass( defaults.classes.panelClosed ), "panel closed class" );

		prefix = defaults.classes.contentWrap;
		assert.ok( !$wrapper.hasClass( prefix + "-position-left" ), "wrapper position class" );
		assert.ok( !$wrapper.hasClass( prefix + "-display-overlay" ), "wrapper display type class" );

		assert.ok( !$wrapper.hasClass( defaults.classes.pageContentPrefix + "-open" ), "wrapper open class removed" );
		assert.ok( !$page.hasClass( defaults.classes.pageBlock ), "page block class not added to page" );

		// TODO test positioning when panel height > screen height
		// TODO test rebind resize after complete

		QUnit.start();
	} );

	$panel.panel( "open" );

} );

QUnit.asyncTest( "toggle", function( assert ) {
	assert.expect( 2 );

	var $panel = $( "#panel-test-toggle" ),
		$page = getPageFromPanel( $panel );

	$panel.one( "panelopen", function( event ) {
		assert.ok( true, "toggle open" );
		$panel.panel( "close" );
	} ).one( "panelclose", function( event ) {
		assert.ok( true, "toggle closed" );
		QUnit.start();
	} );

	$panel.panel( "toggle" );

} );

QUnit.test( "wrapper exists after create", function( assert ) {

	var $page = getPageFromPanel( $( "#panel-test-wrapper" ) ),
		$wrapper = getWrapperFromPage( $page );

	assert.ok( $wrapper.length, "wrapper exists" );
	assert.ok( !$wrapper.hasClass( defaults.classes.pageContentPrefix + "-open" ), "wrapper does not have open class" );

} );

// TODO _bindPageEvents

QUnit.test( "destroy method", function( assert ) {

	var $panel = $( "#panel-test-destroy" ),
		$page = getPageFromPanel( $panel ),
		$wrapper = getWrapperFromPage( $page );

	$panel.panel( "destroy" );
	// test page without sibling panels

	assert.ok( !$wrapper.hasClass( defaults.classes.contentWrapOpen ) );
	assert.ok( !$wrapper.hasClass( defaults.classes.contentWrapOpenComplete ) );

	assert.ok( !$panel.hasClass( defaults.classes.panel ) );
	assert.ok( !$wrapper.hasClass( "ui-panel-position-left" ) );
	assert.ok( !$wrapper.hasClass( "ui-panel-display-overlay" ) );
	assert.ok( !$panel.hasClass( defaults.classes.panelOpen ) );
	assert.ok( !$panel.hasClass( defaults.classes.panelClosed ) );
	assert.ok( !$panel.hasClass( "ui-body-c" ) );
	assert.ok( !$panel.hasClass( defaults.classes.cssTransform3d ) );

	assert.ok( !$panel.hasClass( [ classes.openComplete, classes.panelUnfixed, classes.panelClosed, classes.panelOpen ].join( " " ) ) );
	assert.ok( !$page.hasClass( classes.pageBlock ) );

	$panel.panel();
} );

QUnit.asyncTest( "panelclose not called on document", function( assert ) {
	assert.expect( 2 );

	$( document ).on( "panelopen", "#panel-panelclose-event", function() {
		$( this ).panel( "close" );
	} );

	$( document ).on( "panelclose", "#panel-panelclose-event", function() {
		assert.ok( true, "document panelclose event emitted" );
	} );

	$( document.body ).on( "panelclose", "#panel-panelclose-event", function() {
		assert.ok( true, "document.body panelclose event emitted" );
		QUnit.start();
	} );

	$( "#panel-panelclose-event" ).panel( "open" );

} );

QUnit.asyncTest( "should be able to open a second panel", function( assert ) {
	assert.expect( 1 );

	$( document ).on( "panelopen", "#panel-opensecond", function() {
		assert.ok( true, "second panel opened" );
		QUnit.start();
	} );

	$( "#panel-openfirst" ).panel( "open" );
	$( "#panel-opensecond" ).panel( "open" );
} );

QUnit.module( "dismissable panel", {
	setup: function() {
		this.originalOriginalEvent = $.Event.prototype.originalEvent;
		$.testHelper.mockOriginalEvent( {
			touches: [ { 'pageX': 0 }, { 'pageY': 0 } ]
		} );
	},
	teardown: function() {
		$.Event.prototype.originalEvent = this.originalOriginalEvent;
	}
} );

QUnit.test( "dismissable", function( assert ) {
	var $panel = $( "#panel-test-dismiss" );
	assert.equal( getModalFromPanel( $panel ).length, 1, "modal added to page" );
} );

QUnit.asyncTest( "click on dismissable modal closes panel", function( assert ) {

	assert.expect( 1 );

	var $panel = $( "#panel-test-dismiss" ),
		$modal = getModalFromPanel( $panel );

	$panel.one( "panelopen", function() {

		$modal.trigger( "mousedown" );

	} ).one( "panelclose", function() {

		assert.ok( true, "modal is closed" );
		QUnit.start();

	} );

	$panel.panel( "open" );

} );

QUnit.asyncTest( "swipe on dismissible panel does not close panel if the default is prevented",
	function( assert ) {
		var panel = $( "#panel-test-dismiss" ),
			eventNs = ".swipeDoesNotClosePanel",
			input = $( "#dismiss-input" ).one( "swipeleft", function( event ) {
				event.preventDefault();
			} );

		assert.expect( 1 );

		$.testHelper.detailedEventCascade( [
			function() {
				panel.panel( "open" );
			},

			{
				panelopen: { src: panel, event: "panelopen" + eventNs + "1" }
			},

			function() {
				input.trigger( "swipeleft" );
			},

			{
				panelclose: { src: panel, event: "panelclose" + eventNs + "2" }
			},

			function( result ) {
				assert.deepEqual( result.panelclose.timedOut, true,
					"panelclose event did not happen in response to swipe on child input" );
				panel.panel( "close" );
			},

			{
				panelclose: { src: panel, event: "panelclose" + eventNs + "3" }
			},

			start
		] );
	} );

QUnit.asyncTest( "swipe on dismissible modal closes panel", function( assert ) {

	assert.expect( 1 );

	var $panel = $( "#panel-test-dismiss" ),
		$modal = getModalFromPanel( $panel );

	$panel.one( "panelopen", function() {

		$modal.trigger( "swipeleft" );

	} ).one( "panelclose", function() {

		assert.ok( true, "modal is closed" );
		QUnit.start();

	} );

	$panel.panel( "open" );

} );

QUnit.module( "panel with non-default theme" );

QUnit.test( "expected classes on create", function( assert ) {

	var $panel = $( "#panel-test-non-default-theme" );
	assert.ok( $panel.hasClass( "ui-body-" + $panel.jqmData( 'theme' ) ), "theme class was added" );

} );

QUnit.module( "panel with close button" );

QUnit.asyncTest( "panel opens, close button hides panel", function( assert ) {
	assert.expect( 2 );

	var $panel = $( "#panel-test-with-close" ),
		$page = getPageFromPanel( $panel ),
		$closeButton = $panel.find( ":jqmData(rel='close')" );

	$panel.one( "panelopen", function() {

		assert.ok( !$panel.hasClass( defaults.classes.panelClosed ), "wrapper opens" );
		$closeButton.trigger( "click" );

	} ).one( "panelclose", function() {

		assert.ok( $panel.hasClass( defaults.classes.panelClosed ), "wrapper has closed class" );
		QUnit.start();
	} );

	$panel.panel( "open" );
} );

// Test for https://github.com/jquery/jquery-mobile/issues/6693
QUnit.asyncTest( "unrelated link does not close the panel", function( assert ) {
	var panel = $( "#panel-test-ignore-unrelated-link" ),
		eventNs = ".ignoreUnrelatedLinkClick";

	$( "#unrelated-link" ).one( "click", function( event ) {
		event.preventDefault();
	} );

	$.testHelper.detailedEventCascade( [
		function() {
			panel.panel( "open" );
		},

		{
			panelopen: { src: panel, event: "panelopen" + eventNs + "1" }
		},

		function( result ) {
			assert.deepEqual( result.panelopen.timedOut, false,
				"Panel opened successfully" );
			$( "#unrelated-link" ).click();
		},

		{
			panelclose: { src: panel, event: "panelclose" + eventNs + "2" }
		},

		function( result ) {
			assert.deepEqual( result.panelclose.timedOut, true,
				"Panel did not close in response to unrelated click" );
			panel.panel( "close" );
		},

		{
			panelclose: { src: panel, event: "panelclose" + eventNs + "3" }
		},

		start
	] );
} );

QUnit.asyncTest( "Panel still opens after changing its ID", function( assert ) {
	var eventNs = ".panelStillOpensAfterChangingItsId",
		idTestPanel = $( "#panel-test-id-change" ),
		idTestLink = $( "a[href='#panel-test-id-change']" );

	assert.expect( 1 );

	idTestPanel.attr( "id", "something-else" );
	idTestLink.attr( "href", "#something-else" );

	$.testHelper.detailedEventCascade( [
		function() {
			idTestLink.click();
		},
		{
			panelopen: { src: idTestPanel, event: "panelopen" + eventNs + "1" }
		},
		function( result ) {
			assert.deepEqual( result.panelopen.timedOut, false, "Renamed panel has opened" );
			idTestPanel.panel( "close" );
		},
		{
			panelclose: { src: idTestPanel, event: "panelclose" + eventNs + "2" }
		},
		start
	] );
} );
QUnit.module( "wrapper generation", {
	setup: function() {
		count = 0;
		$.widget( "mobile.panel", $.mobile.panel, {
			_getWrapper: function() {
				this._super();
				count++;
			}
		} );
	},
	teardown: function() {
		$.mobile.panel.prototype = originalWidget;
	}
} );
QUnit.asyncTest( "overlay panel should not call getWrapper", function( assert ) {
	assert.expect( 5 );
	var eventNs = ".overlayPanelShouldNotCallGetWrapper",
		testPanel = $( "#panel-test-get-wrapper-overlay" );

	testPanel.panel( {
		"display": "overlay"
	} );
	assert.deepEqual( count, 0, "getWrapper only called once durring create" );

	$.testHelper.detailedEventCascade( [
		function() {
			testPanel.panel( "open" );
		},
		{
			panelopen: { src: testPanel, event: "panelopen" + eventNs + "1" }
		},
		function() {
			assert.deepEqual( count, 0, "getWrapper not called on open" );
			testPanel.panel( "close" );
		},
		{
			panelclose: { src: testPanel, event: "panelclose" + eventNs + "2" }
		},
		function() {
			assert.deepEqual( count, 0, "getWrapper not called on close" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#page2" );
		},
		{
			pagechange: { src: $( "body" ), event: "pagechange" + eventNs + "3" }
		},
		function() {
			assert.deepEqual( count, 0, "getWrapper not called on pagechange" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#page1" );
		},
		{
			pagechange: { src: $( "body" ), event: "pagechange" + eventNs + "4" }
		},
		function() {
			assert.deepEqual( count, 0, "getWrapper not called on pagechange back to initial page" );
			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "push panel should call getWrapper only once on create", function( assert ) {
	assert.expect( 5 );
	var eventNs = ".pushPanelShouldCallGetWrapperOnlyOnceOnCreate",
		testPanel = $( "#panel-test-get-wrapper-push" );

	testPanel.panel( {
		"display": "push"
	} );
	assert.ok( count === 1, "getWrapper only called once durring create" );

	$.testHelper.detailedEventCascade( [
		function() {
			testPanel.panel( "open" );
		},
		{
			panelopen: { src: testPanel, event: "panelopen" + eventNs + "1" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on open" );
			testPanel.panel( "close" );
		},
		{
			panelclose: { src: testPanel, event: "panelclose" + eventNs + "2" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on close" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#page2" );
		},
		{
			pagechange: { src: $( "body" ), event: "pagechange" + eventNs + "3" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on pagechange" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#page1" );
		},
		{
			pagechange: { src: $( "body" ), event: "pagechange" + eventNs + "4" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on pagechange back to inital page" );
			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "reveal panel should call getWrapper only once on create", function( assert ) {
	assert.expect( 5 );
	var eventNs = ".revealPanelShouldCallGetWrapperOnlyOnceOnCreate",
		testPanel = $( "#panel-test-get-wrapper" );

	testPanel.panel();
	assert.deepEqual( count, 1, "getWrapper only called once durring create" );

	$.testHelper.detailedEventCascade( [
		function() {
			testPanel.panel( "open" );
		},
		{
			panelopen: { src: testPanel, event: "panelopen" + eventNs + "1" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on open" );
			testPanel.panel( "close" );
		},
		{
			panelclose: { src: testPanel, event: "panelclose" + eventNs + "2" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on close" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#page2" );
		},
		{
			pagechange: { src: $( "body" ), event: "pagechange" + eventNs + "3" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on pagechange" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#page1" );
		},
		{
			pagechange: { src: $( "body" ), event: "pagechange" + eventNs + "4" }
		},
		function() {
			assert.deepEqual( count, 1, "getWrapper not called on pagechange back to inital page" );
			QUnit.start();
		}
	] );

} );
QUnit.asyncTest( "external panel should call getWrapper once on create and on page changes",
	function( assert ) {
		assert.expect( 5 );
		var eventNs = ".externalPanelShouldCallGetWrapperOnceOnCreateAndOnPageChanges",
			testPanel = $( "#external-panel-getWrapper-test" );

		testPanel.panel();
		assert.deepEqual( count, 1, "getWrapper only called once durring create" );

		$.testHelper.detailedEventCascade( [
			function() {
				testPanel.panel( "open" );
			},
			{
				panelopen: { src: testPanel, event: "panelopen" }
			},
			function() {
				assert.deepEqual( count, 1, "getWrapper not called on open" );
				testPanel.panel( "close" );
			},
			{
				panelclose: { src: testPanel, event: "panelclose" }
			},
			function() {
				assert.deepEqual( count, 1, "getWrapper not called on close" );
				$( ".ui-pagecontainer" ).pagecontainer( "change", "#page2" );
			},
			{
				pageshow: { src: $( "body" ), event: "pagecontainershow" }
			},
			function() {
				window.setTimeout( function() {
					assert.deepEqual( count, 2, "getWrapper called on pagechange" );
				}, 0 );

				$( "body" ).one( "pagecontainershow", function() {
					window.setTimeout( function() {
						assert.deepEqual( count, 3,
							"getWrapper called on pagechange back to inital page" );
						QUnit.start();
					}, 0 );
				} );
				$( ".ui-pagecontainer" ).pagecontainer( "change", "#page1" );
			}
		] );
	} );

QUnit.asyncTest( "external panel: test classes during A>B>A transition", function( assert ) {
	assert.expect( 16 );

	var $panel = $( "#panel-test-external" ).panel(),
		$firstPage = $( ":jqmData(role='page')" ).first(),
		$secondPage = $( ":jqmData(role='page')" ).last(),
		$openButton = $firstPage.find( "a[href='\\#panel-test-external']" ),
		$link = $panel.find( "a[href='\\#multipage']" ),
		$back = $panel.find( "a[data-nstest-rel='back']" );

	$panel.one( "panelopen", function( event ) {

		assert.ok( !$panel.hasClass( defaults.classes.panelClosed ), "closed class removed" );
		assert.ok( $panel.hasClass( defaults.classes.panelOpen ), "open class added" );
		assert.ok( $firstPage.data( "nstestPanel" ) === "open", "open flag set on first page" );
		assert.equal( $firstPage.find( ".ui-panel-wrapper" ).length, 1, "wrapper exists." );

		$link.trigger( "click" );

	} ).one( "panelclose", function( event ) {

		assert.ok( $panel.hasClass( defaults.classes.panelClosed ), "closed class removed" );
		assert.ok( !$panel.hasClass( defaults.classes.panelOpen ), "open class added" );
		assert.ok( $firstPage.data( "nstestPanel" ) === undefined, "no open flag on first" );

		$panel.trigger( "continue" );

	} ).one( "continue", function( event ) {

		setTimeout( function() {
			$panel.panel( "open" );

			assert.ok( !$panel.hasClass( defaults.classes.panelClosed ), "closed class removed" );
			assert.ok( $panel.hasClass( defaults.classes.panelOpen ), "open class added" );
			assert.ok( $secondPage.data( "nstestPanel" ) === "open", "open flag set on 2nd page" );
			assert.equal( $secondPage.find( ".ui-panel-wrapper" ).length, 1, "wrapper exists." );

			$back.trigger( "click" );

		}, 500 );

	} ).panel( "open" );

	$back.one( "click", function( event ) {

		assert.ok( $firstPage.data( "nstestPanel" ) === undefined,
			"no open flag on first page on backwards transition" );
		assert.equal( $firstPage.find( ".ui-panel-wrapper" ).length, 1, "wrapper exists." );

		setTimeout( function() {
			$panel.panel( "open" );

			assert.ok( $firstPage.data( "nstestPanel" ) === "open", "open flag set on first page" );
			assert.ok( !$panel.hasClass( defaults.classes.panelClosed ), "closed class removed" );
			assert.ok( $panel.hasClass( defaults.classes.panelOpen ), "open class added" );

			QUnit.start();
		}, 500 );
	} );
} );

}( QUnit, jQuery ) );
