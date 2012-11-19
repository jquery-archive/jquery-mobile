/*
 * mobile dialog unit tests
 */
(function($) {
	var home = $.mobile.path.parseUrl(location.pathname).directory,
		homeWithSearch = home + location.search;

	module( "jquery.mobile.dialog.js", {
		setup: function() {
			$.mobile.page.prototype.options.contentTheme = "d";
			$.testHelper.navReset( homeWithSearch );
		}
	});

	asyncTest( "dialog hash is added when the dialog is opened and removed when closed", function() {
		expect( 2 );

		$.testHelper.pageSequence([
			function() {
				//bring up the dialog
				$( "#foo-dialog-link" ).click();
			},

			function() {
				var fooDialog = $( "#foo-dialog" );

				// make sure the dialog came up
				ok( /&ui-state=dialog/.test(location.hash), "ui-state=dialog =~ location.hash", "dialog open" );

				// close the dialog
				$( ".ui-dialog" ).dialog( "close" );
			},

			function() {
				ok( !(/&ui-state=dialog/.test(location.hash)), "ui-state=dialog !~ location.hash" );
				start();
			}
		]);
	});

	asyncTest( "Test option data-close-btn", function() {
		expect( 5 );

		$.testHelper.pageSequence([
			function() {
				// bring up the dialog
				$( "#close-btn-test-link" ).click();
			},

			function() {
				var a = $( "#close-btn-test .ui-header a" );
				deepEqual( a.length, 0, "Initially, the dialog header has no anchor elements (option value 'none')" );

				$( "#close-btn-test" ).dialog( "option", "closeBtn", "left" );
				a = $( "#close-btn-test .ui-header a" );
				deepEqual( a.length, 1, "The dialog header has eactly one anchor element when the option value is set to 'left'" );
				ok( a.hasClass( "ui-btn-left" ), "The close button has class ui-btn-left when the closeBtn option is set to 'left'" );

				$( "#close-btn-test" ).dialog( "option", "closeBtn", "right" );
				a = $( "#close-btn-test .ui-header a" );
				deepEqual( a.length, 1, "The dialog header has eactly one anchor element when the option value is set to 'right'" );
				ok( a.hasClass( "ui-btn-right" ), "The close button has class ui-btn-right when the closeBtn option is set to 'right'" );

				$( "#close-btn-test" ).dialog( "close" );
			},

			function() {
				start();
			}
		]);
	});

	asyncTest( "clicking dialog 'Close' button twice in quick succession does not cause the browser history to retreat by two", function() {
		var correctLocation;

		expect(3);

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( $( "#mypage" ) );
			},

			function() {
				$.mobile.changePage( $( "#doubleCloseTestPage" ) );
			},

			function() {
				correctLocation = location.href;
				$( "#doubleCloseTestPage a" ).click();
			},

			function() {
				$( "#foo-dialog a" ).click();
				setTimeout( function() { $( "#foo-dialog a" ).click(); }, 0 );
			},

			function( timedOut ) {
				ok( !timedOut, "Clicking dialog 'Close' has resulted in a pagechange event" );
			},

			function( timedOut ) {
				ok( timedOut, "Clicking dialog 'Close' has not resulted in two pagechange events" );
				ok( location.href === correctLocation, "Location is correct afterwards" );
				start();
			}
		]);
	});

	asyncTest( "dialog element with no theming", function() {
		expect(4);

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( $( "#mypage" ) );
			},

			function() {
				//bring up the dialog
				$( "#link-a" ).click();
			},

			function() {
				var dialog = $( "#dialog-a" );

				// Assert dialog theme inheritance (issue 1375):
				ok( dialog.hasClass( "ui-body-c" ), "Expected explicit theme ui-body-c" );
				ok( dialog.find( ":jqmData(role=header)" ).hasClass( "ui-bar-" + $.mobile.page.prototype.options.footerTheme ), "Expected header to inherit from $.mobile.page.prototype.options.headerTheme" );
				ok( dialog.find( ":jqmData(role=content)" ).hasClass( "ui-body-" + $.mobile.page.prototype.options.contentTheme ), "Expect content to inherit from $.mobile.page.prototype.options.contentTheme" );
				ok( dialog.find( ":jqmData(role=footer)" ).hasClass( "ui-bar-" + $.mobile.page.prototype.options.footerTheme ), "Expected footer to inherit from $.mobile.page.prototype.options.footerTheme" );

				start();
			}
		]);
	});

	asyncTest( "dialog element with data-theme", function() {
		// Reset fallback theme for content
		$.mobile.page.prototype.options.contentTheme = null;

		expect(5);

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( $( "#mypage" ) );
			},

			function() {
				//bring up the dialog
				$( "#link-b" ).click();
			},

			function() {
				var dialog = $( "#dialog-b" );

				// Assert dialog theme inheritance (issue 1375):
				ok( dialog.hasClass( "ui-body-e" ), "Expected explicit theme ui-body-e" );
				ok( !dialog.hasClass( "ui-overlay-b" ), "Expected no theme ui-overlay-b" );
				ok( dialog.find( ":jqmData(role=header)" ).hasClass( "ui-bar-" + $.mobile.page.prototype.options.footerTheme ), "Expected header to inherit from $.mobile.page.prototype.options.headerTheme" );
				ok( dialog.find( ":jqmData(role=content)" ).hasClass( "ui-body-e" ), "Expect content to inherit from data-theme" );
				ok( dialog.find( ":jqmData(role=footer)" ).hasClass( "ui-bar-" + $.mobile.page.prototype.options.footerTheme ), "Expected footer to inherit from $.mobile.page.prototype.options.footerTheme" );

				start();
			}
		]);
	});

	asyncTest( "dialog element with data-theme & data-overlay-theme", function() {
		expect(5);

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( $( "#mypage" ) );
			},

			function() {
				//bring up the dialog
				$( "#link-c" ).click();
			},

			function() {
				var dialog = $( "#dialog-c" );

				// Assert dialog theme inheritance (issue 1375):
				ok( dialog.hasClass( "ui-body-e" ), "Expected explicit theme ui-body-e" );
				ok( dialog.hasClass( "ui-overlay-b" ), "Expected explicit theme ui-overlay-b" );
				ok( dialog.find( ":jqmData(role=header)" ).hasClass( "ui-bar-" + $.mobile.page.prototype.options.footerTheme ), "Expected header to inherit from $.mobile.page.prototype.options.headerTheme" );
				ok( dialog.find( ":jqmData(role=content)" ).hasClass( "ui-body-" + $.mobile.page.prototype.options.contentTheme ), "Expect content to inherit from $.mobile.page.prototype.options.contentTheme" );
				ok( dialog.find( ":jqmData(role=footer)" ).hasClass( "ui-bar-" + $.mobile.page.prototype.options.footerTheme ), "Expected footer to inherit from $.mobile.page.prototype.options.footerTheme" );

				start();
			}
		]);
	});


	asyncTest( "page container is updated to dialog overlayTheme at pagebeforeshow", function(){
		var pageTheme;

		expect( 1 );

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( "#mypage" );
			},

			function() {
				//bring up the dialog
				$( "#foo-dialog-link" ).click();
			},

			function() {
				pageTheme = "ui-overlay-" + $.mobile.activePage.dialog( "option", "overlayTheme" );

				$.mobile.pageContainer.removeClass( pageTheme );

				$.mobile.activePage
					.bind( "pagebeforeshow", function(){
						ok( $.mobile.pageContainer.hasClass( pageTheme ), "Page container has the same theme as the dialog overlayTheme on pagebeforeshow" );
						start();
					}).trigger( "pagebeforeshow" );
			}
		]);
	});
})( jQuery );
