/*
* "fixHeaderFooter" plugin - on-demand positioning for headers,footers
*/

(function( $, undefined ) {

var slideDownClass = "ui-header-fixed ui-fixed-inline fade",
	slideUpClass = "ui-footer-fixed ui-fixed-inline fade",

	slideDownSelector = ".ui-header:jqmData(position='fixed')",
	slideUpSelector = ".ui-footer:jqmData(position='fixed')";

$.fn.fixHeaderFooter = function( options ) {

	if ( !$.support.scrollTop || ( $.support.touchOverflow && $.mobile.touchOverflowEnabled ) ) {
		return this;
	}

	return this.each(function() {
		var $this = $( this );

		if ( $this.jqmData( "fullscreen" ) ) {
			$this.addClass( "ui-page-fullscreen" );
		}

		// Should be slidedown
		$this.find( slideDownSelector ).addClass( slideDownClass );

		// Should be slideup
		$this.find( slideUpSelector ).addClass( slideUpClass );
	});
};

// single controller for all showing,hiding,toggling
$.mobile.fixedToolbars = (function() {

	if ( !$.support.scrollTop || ( $.support.touchOverflow && $.mobile.touchOverflowEnabled ) ) {
		return;
	}

	var stickyFooter, delayTimer,
		currentstate = "inline",
		autoHideMode = false,
		showDelay = 100,
		ignoreTargets = "a,input,textarea,select,button,label,.ui-header-fixed,.ui-footer-fixed",
		toolbarSelector = ".ui-header-fixed:first, .ui-footer-fixed:not(.ui-footer-duplicate):last",
		// for storing quick references to duplicate footers
		supportTouch = $.support.touch,
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		stateBefore = null,
		scrollTriggered = false,
		touchToggleEnabled = true;

	function showEventCallback( event ) {
		// An event that affects the dimensions of the visual viewport has
		// been triggered. If the header and/or footer for the current page are in overlay
		// mode, we want to hide them, and then fire off a timer to show them at a later
		// point. Events like a resize can be triggered continuously during a scroll, on
		// some platforms, so the timer is used to delay the actual positioning until the
		// flood of events have subsided.
		//
		// If we are in autoHideMode, we don't do anything because we know the scroll
		// callbacks for the plugin will fire off a show when the scrolling has stopped.
		if ( !autoHideMode && currentstate === "overlay" ) {
			if ( !delayTimer ) {
				$.mobile.fixedToolbars.hide( true );
			}

			$.mobile.fixedToolbars.startShowTimer();
		}
	}

	$(function() {
		var $document = $( document ),
			$window = $( window );

		$document
			.bind( "vmousedown", function( event ) {
				if ( touchToggleEnabled ) {
					stateBefore = currentstate;
				}
			})
			.bind( "vclick", function( event ) {
				if ( touchToggleEnabled ) {

					if ( $(event.target).closest( ignoreTargets ).length ) {
						return;
					}

					if ( !scrollTriggered ) {
						$.mobile.fixedToolbars.toggle( stateBefore );
						stateBefore = null;
					}
				}
			})
			.bind( "silentscroll", showEventCallback );


		// The below checks first for a $(document).scrollTop() value, and if zero, binds scroll events to $(window) instead.
		// If the scrollTop value is actually zero, both will return zero anyway.
		//
		// Works with $(document), not $(window) : Opera Mobile (WinMO phone; kinda broken anyway)
		// Works with $(window), not $(document) : IE 7/8
		// Works with either $(window) or $(document) : Chrome, FF 3.6/4, Android 1.6/2.1, iOS
		// Needs work either way : BB5, Opera Mobile (iOS)

		( ( $document.scrollTop() === 0 ) ? $window : $document )
			.bind( "scrollstart", function( event ) {

				scrollTriggered = true;

				if ( stateBefore === null ) {
					stateBefore = currentstate;
				}

				// We only enter autoHideMode if the headers/footers are in
				// an overlay state or the show timer was started. If the
				// show timer is set, clear it so the headers/footers don't
				// show up until after we're done scrolling.
				var isOverlayState = stateBefore == "overlay";

				autoHideMode = isOverlayState || !!delayTimer;

				if ( autoHideMode ) {
					$.mobile.fixedToolbars.clearShowTimer();

					if ( isOverlayState ) {
						$.mobile.fixedToolbars.hide( true );
					}
				}
			})
			.bind( "scrollstop", function( event ) {

				if ( $( event.target ).closest( ignoreTargets ).length ) {
					return;
				}

				scrollTriggered = false;

				if ( autoHideMode ) {
					$.mobile.fixedToolbars.startShowTimer();
					autoHideMode = false;
				}
				stateBefore = null;
			});

			$window.bind( "resize updatelayout", showEventCallback );
	});

	// 1. Before page is shown, check for duplicate footer
	// 2. After page is shown, append footer to new page
	$( ".ui-page" )
		.live( "pagebeforeshow", function( event, ui ) {

			var page = $( event.target ),
				footer = page.find( ":jqmData(role='footer')" ),
				id = footer.data( "id" ),
				prevPage = ui.prevPage,
				prevFooter = prevPage && prevPage.find( ":jqmData(role='footer')" ),
				prevFooterMatches = prevFooter.length && prevFooter.jqmData( "id" ) === id;

			if ( id && prevFooterMatches ) {
				stickyFooter = footer;
				setTop( stickyFooter.removeClass( "fade in out" ).appendTo( $.mobile.pageContainer ) );
			}
		})
		.live( "pageshow", function( event, ui ) {

			var $this = $( this );

			if ( stickyFooter && stickyFooter.length ) {

				setTimeout(function() {
					setTop( stickyFooter.appendTo( $this ).addClass( "fade" ) );
					stickyFooter = null;
				}, 500);
			}

			$.mobile.fixedToolbars.show( true, this );
		});

	// When a collapsiable is hidden or shown we need to trigger the fixed toolbar to reposition itself (#1635)
	$( ".ui-collapsible-contain" ).live( "collapse expand", showEventCallback );

	// element.getBoundingClientRect() is broken in iOS 3.2.1 on the iPad. The
	// coordinates inside of the rect it returns don't have the page scroll position
	// factored out of it like the other platforms do. To get around this,
	// we'll just calculate the top offset the old fashioned way until core has
	// a chance to figure out how to handle this situation.
	//
	// TODO: We'll need to get rid of getOffsetTop() once a fix gets folded into core.

	function getOffsetTop( ele ) {
		var top = 0,
			op, body;

		if ( ele ) {
			body = document.body;
			op = ele.offsetParent;
			top = ele.offsetTop;

			while ( ele && ele != body ) {
				top += ele.scrollTop || 0;

				if ( ele == op ) {
					top += op.offsetTop;
					op = ele.offsetParent;
				}

				ele = ele.parentNode;
			}
		}
		return top;
	}

	function setTop( el ) {
		var fromTop = $(window).scrollTop(),
			thisTop = getOffsetTop( el[ 0 ] ), // el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
			thisCSStop = el.css( "top" ) == "auto" ? 0 : parseFloat(el.css( "top" )),
			screenHeight = window.innerHeight,
			thisHeight = el.outerHeight(),
			useRelative = el.parents( ".ui-page:not(.ui-page-fullscreen)" ).length,
			relval;

		if ( el.is( ".ui-header-fixed" ) ) {

			relval = fromTop - thisTop + thisCSStop;

			if ( relval < thisTop ) {
				relval = 0;
			}

			return el.css( "top", useRelative ? relval : fromTop );
		} else {
			// relval = -1 * (thisTop - (fromTop + screenHeight) + thisCSStop + thisHeight);
			// if ( relval > thisTop ) { relval = 0; }
			relval = fromTop + screenHeight - thisHeight - (thisTop - thisCSStop );

			return el.css( "top", useRelative ? relval : fromTop + screenHeight - thisHeight );
		}
	}

	// Exposed methods
	return {

		show: function( immediately, page ) {

			$.mobile.fixedToolbars.clearShowTimer();

			currentstate = "overlay";

			var $ap = page ? $( page ) :
					( $.mobile.activePage ? $.mobile.activePage :
						$( ".ui-page-active" ) );

			return $ap.children( toolbarSelector ).each(function() {

				var el = $( this ),
					fromTop = $( window ).scrollTop(),
					// el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
					thisTop = getOffsetTop( el[ 0 ] ),
					screenHeight = window.innerHeight,
					thisHeight = el.outerHeight(),
					alreadyVisible = ( el.is( ".ui-header-fixed" ) && fromTop <= thisTop + thisHeight ) ||
														( el.is( ".ui-footer-fixed" ) && thisTop <= fromTop + screenHeight );

				// Add state class
				el.addClass( "ui-fixed-overlay" ).removeClass( "ui-fixed-inline" );

				if ( !alreadyVisible && !immediately ) {
					el.animationComplete(function() {
						el.removeClass( "in" );
					}).addClass( "in" );
				}
				setTop(el);
			});
		},

		hide: function( immediately ) {

			currentstate = "inline";

			var $ap = $.mobile.activePage ? $.mobile.activePage :
									$( ".ui-page-active" );

			return $ap.children( toolbarSelector ).each(function() {

				var el = $(this),
					thisCSStop = el.css( "top" ),
					classes;

				thisCSStop = thisCSStop == "auto" ? 0 :
											parseFloat(thisCSStop);

				// Add state class
				el.addClass( "ui-fixed-inline" ).removeClass( "ui-fixed-overlay" );

				if ( thisCSStop < 0 || ( el.is( ".ui-header-fixed" ) && thisCSStop !== 0 ) ) {

					if ( immediately ) {
						el.css( "top", 0);
					} else {

						if ( el.css( "top" ) !== "auto" && parseFloat( el.css( "top" ) ) !== 0 ) {

							classes = "out reverse";

							el.animationComplete(function() {
								el.removeClass( classes ).css( "top", 0 );
							}).addClass( classes );
						}
					}
				}
			});
		},

		startShowTimer: function() {

			$.mobile.fixedToolbars.clearShowTimer();

			var args = [].slice.call( arguments );

			delayTimer = setTimeout(function() {
				delayTimer = undefined;
				$.mobile.fixedToolbars.show.apply( null, args );
			}, showDelay);
		},

		clearShowTimer: function() {
			if ( delayTimer ) {
				clearTimeout( delayTimer );
			}
			delayTimer = undefined;
		},

		toggle: function( from ) {
			if ( from ) {
				currentstate = from;
			}
			return ( currentstate === "overlay" ) ? $.mobile.fixedToolbars.hide() :
								$.mobile.fixedToolbars.show();
		},

		setTouchToggleEnabled: function( enabled ) {
			touchToggleEnabled = enabled;
		}
	};
})();

//auto self-init widgets
$( document ).bind( "pagecreate create", function( event ) {

	if ( $( ":jqmData(position='fixed')", event.target ).length ) {

		$( event.target ).each(function() {

			if ( !$.support.scrollTop || ( $.support.touchOverflow && $.mobile.touchOverflowEnabled ) ) {
				return this;
			}

			var $this = $( this );

			if ( $this.jqmData( "fullscreen" ) ) {
				$this.addClass( "ui-page-fullscreen" );
			}

			// Should be slidedown
			$this.find( slideDownSelector ).addClass( slideDownClass );

			// Should be slideup
			$this.find( slideUpSelector ).addClass( slideUpClass );

		})

	}
});

})( jQuery );
