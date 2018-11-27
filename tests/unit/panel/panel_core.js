/*
 * Mobile panel unit tests
 */

define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

var count,
	defaults = $.mobile.panel.prototype.options,
	originalWidget = $.mobile.panel.prototype;

function getPageFromPanel( $panel ) {
	return $panel.closest( ":jqmData(role='page')" );
}

function getModalFromPanel( $panel ) {
	return $panel.data( "mobile-panel" )._modal;
}

function getWrapperFromPage( $page ) {
	return $page.find( ".ui-panel-wrapper" );
}

QUnit.module( "stock panel" );

QUnit.test( "expected classes on create", function( assert ) {

	var $panel = $( "#panel-test-create" );

	assert.hasClasses( $panel, "ui-panel",
		"default class is present" );
	assert.hasClasses( $panel, "ui-panel-display-" + defaults.display,
		"display class is added per the default" );
	assert.hasClasses( $panel, "ui-panel-position-" + defaults.position,
		"position class is added per the default" );

	if ( $.support.cssTransform3d ) {
		assert.hasClasses( $panel, "ui-panel-animate",
			"animate class is present by default when supported" );
	} else {
		assert.lacksClasses( $panel, "ui-panel-animate",
			"animate class is not present by default when not supported" );
	}

	assert.hasClasses( $panel, "ui-panel-closed",
		"panel is closed by default" );
} );

QUnit.test( "expected open, close events", function( assert ) {

	assert.expect( 4 );
	var ready = assert.async();
	var $panel = $( "#panel-test-events" );

	$panel.one( "panelbeforeopen panelopen panelbeforeclose panelclose",
		function( event ) {
			assert.ok( true, event.type + " event." );
		} ).one( "panelopen", function() {
			$panel.panel( "close" );
		} ).one( "panelclose", function() {
			ready();
		} );

	$panel.panel( "open" );

} );

QUnit.test( "classes modified by open", function( assert ) {
	assert.expect( 10 );
	var $panel = $( "#panel-test-open" ),
		$page = getPageFromPanel( $panel );
	var ready = assert.async();

	$panel.one( "panelopen", function() {
		var $wrapper = getWrapperFromPage( $page ),
			$modal = getModalFromPanel( $panel ),
			$openButton = $page.find( "a[href='\\#panel-test-open']" );

		assert.lacksClasses( $openButton, "ui-button-active",
			"button doesn't have active class" );

		assert.lacksClasses( $panel, "ui-panel-closed",
			"closed class removed" );

		assert.hasClasses( $panel, "ui-panel-open",
			"open class added" );

		assert.equal( $wrapper.length, 1, "wrapper exists." );

		assert.hasClasses( $wrapper, "ui-panel-page-content" +
			"-open", "wrapper open class" );

		var prefix = "ui-panel-page-content";
		assert.hasClasses( $wrapper, prefix + "-position-left",
			"wrapper position class" );
		assert.hasClasses( $wrapper, prefix + "-display-reveal",
			"wrapper display type class" );

		assert.hasClasses( $modal, "ui-panel-dismiss-open",
			"modal open class" );

		prefix = "ui-panel-dismiss";
		assert.hasClasses( $modal, prefix + "-position-left",
			"modal position class" );
		assert.hasClasses( $modal, prefix + "-display-reveal",
			"modal display type class" );

		// TODO test positioning when panel height > screen height
		// TODO test rebind resize after complete

		$panel.panel( "close" );
	} ).one( "panelclose", function() {
		ready();
	} );

	$panel.panel( "open" );

} );

QUnit.test( "classes modified by close", function( assert ) {
	assert.expect( 7 );
	var ready = assert.async();
	var $panel = $( "#panel-test-close" ),
		$page = getPageFromPanel( $panel ),
		$wrapper = getWrapperFromPage( $page ),
		$modal = getModalFromPanel( $panel ),
		$openButton = $page.find( "a[href='\\#panel-test-close']" );

	$panel.one( "panelopen", function() {
		$panel.panel( "close" );
	} ).one( "panelclose", function() {
		assert.lacksClasses( $openButton, "ui-button-active",
			"button doesn't have active class" );
		assert.lacksClasses( $panel, "ui-panel-open", "panel not open class" );

		assert.lacksClasses( $modal, "ui-panel-dismiss-open", "modal without open class" );
		var prefix = "ui-panel-dismiss";
		assert.lacksClasses( $modal, prefix + "-position-left", "modal without position class" );
		assert.lacksClasses( $modal, prefix + "-display-overlay",
			"modal without display type class" );

		// Complete
		assert.hasClasses( $panel, "ui-panel-closed", "panel closed class" );

		assert.lacksClasses( $wrapper, "ui-panel-page-content" +
			"-open", "wrapper open class removed" );

		// TODO test positioning when panel height > screen height
		// TODO test rebind resize after complete

		ready();
	} );

	$panel.panel( "open" );

} );

QUnit.test( "toggle", function( assert ) {
	assert.expect( 2 );
	var ready = assert.async();
	var $panel = $( "#panel-test-toggle" );

	$panel.one( "panelopen", function() {
		assert.ok( true, "toggle open" );
		$panel.panel( "close" );
	} ).one( "panelclose", function() {
		assert.ok( true, "toggle closed" );
		ready();
	} );

	$panel.panel( "toggle" );

} );

QUnit.test( "wrapper exists after create", function( assert ) {

	var $page = getPageFromPanel( $( "#panel-test-wrapper" ) ),
		$wrapper = getWrapperFromPage( $page );

	assert.ok( $wrapper.length, "wrapper exists" );
	assert.ok( !$wrapper.hasClass( "ui-panel-page-content" +
		"-open" ), "wrapper does not have open class" );

} );

// TODO _bindPageEvents

QUnit.test( "destroy method", function( assert ) {

	var $panel = $( "#panel-test-destroy" ),
		$page = getPageFromPanel( $panel ),
		$wrapper = getWrapperFromPage( $page );

	$panel.panel( "destroy" );

	// Test page without sibling panels

	assert.lacksClasses( $panel, "ui-panel" );
	assert.lacksClasses( $wrapper, "ui-panel-position-left" );
	assert.lacksClasses( $wrapper, "ui-panel-display-overlay" );
	assert.lacksClasses( $panel, "ui-panel-open" );
	assert.lacksClasses( $panel, "ui-panel-closed" );
	assert.lacksClasses( $panel, "ui-body-c" );
	assert.lacksClasses( $panel, "ui-panel-closed ui-panel-open" );

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

QUnit.test( "should be able to open a second panel", function( assert ) {
	assert.expect( 1 );
	var ready = assert.async();

	$( document ).on( "panelopen", "#panel-opensecond", function() {
		assert.ok( true, "second panel opened" );
		ready();
	} );

	$( "#panel-openfirst" ).panel( "open" );
	$( "#panel-opensecond" ).panel( "open" );
} );

QUnit.module( "dismissable panel", {
	setup: function() {
		this.originalOriginalEvent = $.Event.prototype.originalEvent;
		$.testHelper.mockOriginalEvent( {
			touches: [ { "pageX": 0 }, { "pageY": 0 } ]
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

QUnit.test( "click on dismissable modal closes panel", function( assert ) {

	assert.expect( 1 );
	var ready = assert.async();
	var $panel = $( "#panel-test-dismiss" ),
		$modal = getModalFromPanel( $panel );

	$panel.one( "panelopen", function() {

		$modal.trigger( "mousedown" );

	} ).one( "panelclose", function() {

		assert.ok( true, "modal is closed" );
		ready();

	} );

	$panel.panel( "open" );

} );

QUnit.test( "swipe on dismissible panel does not close panel if the default is prevented",
	function( assert ) {
		var panel = $( "#panel-test-dismiss" ),
			eventNs = ".swipeDoesNotClosePanel",
			input = $( "#dismiss-input" ).one( "swipeleft", function( event ) {
				event.preventDefault();
			} ),
			done = assert.async();

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

			done
		] );
	} );

QUnit.test( "swipe on dismissible modal closes panel", function( assert ) {

	assert.expect( 1 );

	var $panel = $( "#panel-test-dismiss" ),
		$modal = getModalFromPanel( $panel );
	var ready = assert.async();
	$panel.one( "panelopen", function() {

		$modal.trigger( "swipeleft" );

	} ).one( "panelclose", function() {

		assert.ok( true, "modal is closed" );
		ready();

	} );

	$panel.panel( "open" );

} );

QUnit.module( "panel with non-default theme" );

QUnit.test( "expected classes on create", function( assert ) {

	var $panel = $( "#panel-test-non-default-theme" );
	assert.hasClasses( $panel, "ui-body-" + $panel.jqmData( "theme" ),
		"theme class was added" );

} );

QUnit.module( "panel with close button" );

QUnit.test( "panel opens, close button hides panel", function( assert ) {
	assert.expect( 2 );

	var $panel = $( "#panel-test-with-close" ),
		$closeButton = $panel.find( ":jqmData(rel='close')" );
	var ready = assert.async();
	$panel.one( "panelopen", function() {

		assert.lacksClasses( $panel, "ui-panel-closed",
			"wrapper opens" );
		$closeButton.trigger( "click" );

	} ).one( "panelclose", function() {

		assert.hasClasses( $panel, "ui-panel-closed",
			"wrapper has closed class" );
		ready();
	} );

	$panel.panel( "open" );
} );

// Test for https://github.com/jquery/jquery-mobile/issues/6693
QUnit.test( "unrelated link does not close the panel", function( assert ) {
	var panel = $( "#panel-test-ignore-unrelated-link" ),
		eventNs = ".ignoreUnrelatedLinkClick",
		done = assert.async();

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

		done
	] );
} );

QUnit.test( "Panel still opens after changing its ID", function( assert ) {
	var eventNs = ".panelStillOpensAfterChangingItsId",
		idTestPanel = $( "#panel-test-id-change" ),
		idTestLink = $( "a[href='#panel-test-id-change']" );

	assert.expect( 1 );

	var done = assert.async();

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
		done
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
QUnit.test( "overlay panel should not call getWrapper", function( assert ) {
	assert.expect( 5 );
	var eventNs = ".overlayPanelShouldNotCallGetWrapper",
		testPanel = $( "#panel-test-get-wrapper-overlay" );
	var ready = assert.async();

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
			assert.deepEqual( count, 0,
				"getWrapper not called on pagechange back to initial page" );
			ready();
		}
	] );
} );

QUnit.test( "push panel should call getWrapper only once on create", function( assert ) {
	assert.expect( 5 );
	var eventNs = ".pushPanelShouldCallGetWrapperOnlyOnceOnCreate",
		testPanel = $( "#panel-test-get-wrapper-push" );
	var ready = assert.async();
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
			ready();
		}
	] );
} );

QUnit.test( "reveal panel should call getWrapper only once on create", function( assert ) {
	assert.expect( 5 );
	var eventNs = ".revealPanelShouldCallGetWrapperOnlyOnceOnCreate",
		testPanel = $( "#panel-test-get-wrapper" );
	var ready = assert.async();
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
			ready();
		}
	] );

} );
QUnit.test( "external panel should call getWrapper once on create and on page changes",
	function( assert ) {
		assert.expect( 5 );
		var testPanel = $( "#external-panel-getWrapper-test" );
		var ready = assert.async();
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
						ready();
					}, 0 );
				} );
				$( ".ui-pagecontainer" ).pagecontainer( "change", "#page1" );
			}
		] );
	} );

QUnit.test( "external panel: test classes during A>B>A transition", function( assert ) {
	assert.expect( 16 );
	var ready = assert.async();
	var $panel = $( "#panel-test-external" ).panel(),
		$firstPage = $( ":jqmData(role='page')" ).first(),
		$secondPage = $( ":jqmData(role='page')" ).last(),
		$link = $panel.find( "a[href='\\#multipage']" ),
		$back = $panel.find( "a[data-nstest-rel='back']" );

	$panel.one( "panelopen", function() {

		assert.lacksClasses( $panel, "ui-panel-closed", "closed class removed" );
		assert.hasClasses( $panel, "ui-panel-open", "open class added" );
		assert.ok( $firstPage.data( "nstestPanel" ) === "open", "open flag set on first page" );
		assert.equal( $firstPage.find( ".ui-panel-wrapper" ).length, 1, "wrapper exists." );

		$link.trigger( "click" );

	} ).one( "panelclose", function() {

		assert.hasClasses( $panel, "ui-panel-closed", "closed class removed" );
		assert.lacksClasses( $panel, "ui-panel-open", "open class added" );
		assert.ok( $firstPage.data( "nstestPanel" ) === undefined, "no open flag on first" );

		$panel.trigger( "continue" );

	} ).one( "continue", function() {

		setTimeout( function() {
			$panel.panel( "open" );

			assert.lacksClasses( $panel, "ui-panel-closed", "closed class removed" );
			assert.hasClasses( $panel, "ui-panel-open", "open class added" );
			assert.ok( $secondPage.data( "nstestPanel" ) === "open", "open flag set on 2nd page" );
			assert.equal( $secondPage.find( ".ui-panel-wrapper" ).length, 1, "wrapper exists." );

			$back.trigger( "click" );

		}, 500 );

	} ).panel( "open" );

	$back.one( "click", function() {

		assert.ok( $firstPage.data( "nstestPanel" ) === undefined,
			"no open flag on first page on backwards transition" );
		assert.equal( $firstPage.find( ".ui-panel-wrapper" ).length, 1, "wrapper exists." );

		setTimeout( function() {
			$panel.panel( "open" );

			assert.ok( $firstPage.data( "nstestPanel" ) === "open", "open flag set on first page" );
			assert.lacksClasses( $panel, "ui-panel-closed", "closed class removed" );
			assert.hasClasses( $panel, "ui-panel-open", "open class added" );

			ready();
		}, 500 );
	} );
} );

} );
