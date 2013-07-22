/*
 * mobile filter unit tests - listview
 */

(function($){
	module( "Filter Widget Core Functions" );

	asyncTest( "Filter hides/shows results when the user enters information", function() {
		var input = $( "#filtered-listview-filterable" ),
			listview = $( "#filtered-listview" );

		expect( 5 );

		$.testHelper.sequence([
			function() {
				input.val( "at" ).trigger( "change" );
			},
			function() {
				deepEqual( listview.find( "li.ui-screen-hidden" ).length, 2, "Number of hidden item after typing 'at' is 2." );
				input.val( "aa" ).trigger( "change" );
			},
			function() {
				deepEqual (listview.find( "li.ui-screen-hidden" ).length, 4, "Number of hidden items after typing 'aa' is 4." );
				input.val( "m" ).trigger( "change" );
			},
			function() {
				deepEqual (listview.find( "li.ui-screen-hidden" ).length, 1, "Number of hidden items after typing 'm' is 1." );
				input.val( "" ).trigger( "change" );
			},
			function() {
				deepEqual( listview.find( "li.ui-screen-hidden" ).length, 0, "Number of hidden items after emptying input is 0." );
				input.val( "*" ).trigger( "change" );
			},
			function() {
				deepEqual( listview.find( "li.ui-screen-hidden" ).length, 4, "Number of hidden items after entering a regex special character is 4." );
				input.val( "" ).trigger( "change" );
			},
			start
		], 500 );
	});

	asyncTest( "Event filterablebeforefilter fires in response to input change", function() {
		var input = $( "#filtered-listview-filterable" ),
			listview = $( "#filtered-listview" ),
			beforeFilterCount = 0;

		listview.on( "filterablebeforefilter.theEventIsFiring", function() {
			beforeFilterCount++;
		});

		$.testHelper.sequence([
			function() {
				input.val( "a" ).trigger( "input" ).trigger( "keyup" ).trigger( "change" );
			},
			function() {
				deepEqual( beforeFilterCount, 1, "'filterablebeforefilter' fired only once for the same value." );
				input.val( "ab" ).trigger( "input" ).trigger( "keyup" );
			},
			function() {
				deepEqual( beforeFilterCount, 2, "'filterablebeforefilter' fired only once again when the value has changed" );
				listview.off( "filterablebeforefilter.theEventIsFiring" );
				input.val( "" ).trigger( "change" );
			},
			start
		], 500 );
	});

	asyncTest( "Filter hides results and dividers when the user enters information",
		function() {
			var $searchPage = $("#search-filter-with-dividers-test");
			$.testHelper.pageSequence([
				function() {
					$.mobile.changePage("#search-filter-with-dividers-test");
				},
				// wait for the page to become active/enhanced
				function(){
					$searchPage.find('input').val('at');
					$searchPage.find('input').trigger('change');
					setTimeout(function() {
						//there should be four hidden list entries
						deepEqual(
							$searchPage.find('li.ui-screen-hidden').length,
							4
						);
						//there should be two list entries that are list dividers and hidden
						deepEqual(
							$searchPage
								.find('li.ui-screen-hidden:jqmData(role=list-divider)')
								.length,
							2
						);
						//there should be two list entries that are not list dividers and hidden
						deepEqual(
							$searchPage
								.find('li.ui-screen-hidden:not(:jqmData(role=list-divider))')
								.length,
							2
						);
						start();
					}, 500);
				}
			]);
		}
	);

	asyncTest( "Redisplay results when user removes values", function() {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#search-filter-with-dividers-test");
			},

			function() {
				$('.ui-page-active input').val('a');
				$('.ui-page-active input').trigger('change');

				setTimeout(function() {
					deepEqual($('.ui-page-active input').val(), 'a');
					deepEqual($('.ui-page-active li[style^="display: none;"]').length, 0);
					start();
				}, 500);
			}
		]);
	});

	asyncTest( "Dividers are hidden when preceding hidden rows and shown when preceding shown rows", function () {
		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#search-filter-with-dividers-test");
			},

			function() {
				var $page = $('.ui-page-active');

				$page.find('input').val('at');
				$page.find('input').trigger('change');
				setTimeout(function() {
					deepEqual($page.find('li:jqmData(role=list-divider):hidden').length, 2);
					deepEqual($page.find('li:jqmData(role=list-divider):hidden + li:not(:jqmData(role=list-divider)):hidden').length, 2);
					deepEqual($page.find('li:jqmData(role=list-divider):not(:hidden) + li:not(:jqmData(role=list-divider)):not(:hidden)').length, 2);
					start();
				}, 500);
			}
		]);
	});

	asyncTest( "Inset List View should refresh corner classes after filtering", 4 * 2, function () {
		var checkClasses = function() {
			var $page = $( ".ui-page-active" ),
				$li = $page.find( "li:visible" );
			ok($li.first().hasClass( "ui-first-child" ), $li.length+" li elements: First visible element should have class ui-first-child");
			ok($li.last().hasClass( "ui-last-child" ), $li.length+" li elements: Last visible element should have class ui-last-child");
		};

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#search-filter-inset-test");
			},

			function() {
				var $page = $('.ui-page-active');
				$.testHelper.sequence([
					function() {
						checkClasses();

						$page.find('input').val('man');
						$page.find('input').trigger('change');
					},

					function() {
						checkClasses();

						$page.find('input').val('at');
						$page.find('input').trigger('change');
					},

					function() {
						checkClasses();

						$page.find('input').val('catwoman');
						$page.find('input').trigger('change');
					},

					function() {
						checkClasses();
						start();
					}
				], 50);
			}
		]);
	});

	module( "Filter Widget Custom Filter", {
		setup: function() {
			var self = this;
			this._refreshCornersCount = 0;
			this._refreshCornersFn = $.mobile.filterable.prototype._addFirstLastClasses;

			// _refreshCorners is the last method called in the filter loop
			// so we count the number of times _refreshCorners gets invoked to stop the test
			$.mobile.filterable.prototype._addFirstLastClasses = function() {
				self._refreshCornersCount += 1;
				self._refreshCornersFn.apply( this, arguments );
			}
		},
		teardown: function() {
			$.mobile.filterable.prototype._refreshCorners = this._refreshCornersFn;
		}
	});

	asyncTest( "Custom filterCallback should cause iteration on all list elements", function(){
		var listPage = $( "#search-customfilter-test" ),
			filterCallbackCount = 0,
			expectedCount = 2 * listPage.find("li").length;
		expect( 1 );

		$.testHelper.pageSequence( [
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-customfilter-test" );
			},

			function() {
				// set the listview instance callback
				listPage.find( "ul" ).filterable( "option", "filterCallback", function( text, searchValue, item ) {
					filterCallbackCount += 1;
					return text.toString().toLowerCase().indexOf( searchValue ) === -1;
				});

				// trigger a change in the search filter
				listPage.find( "input" ).val( "at" ).trigger( "change" );
				// need to wait because of the filterdelay
				window.setTimeout(function() {
					listPage.find( "input" ).val( "atw" ).trigger( "change" );
				},500);
			},

			function() {
				equal( filterCallbackCount, expectedCount, "filterCallback should be called exactly "+ expectedCount +" times" );
				start();
			}
		]);
	});

	asyncTest( "filterCallback can be altered after widget creation", function(){
		var listPage = $( "#search-customfilter-test" ),
			filterChangedCallbackCount = 0,
			expectedCount = 1 * listPage.find("li").length,
			runtest;
		expect( 1 );

		$.testHelper.pageSequence( [
			function(){
				//reset for relative url refs
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-customfilter-test" );
			},

			function() {
				// set the filter instance callback
				listPage.find( "ul" ).filterable( "option", "filterCallback", function() {
					filterChangedCallbackCount += 1;
				});

				listPage.find( "input" ).val( "foo" )
				listPage.find( "input" ).trigger( "change" );
			},

			function() {
				equal( filterChangedCallbackCount, expectedCount, "filterChangeCallback should be called exactly "+ expectedCount +" times" );
				start();
			}
		]);
	});

	module( "Filter Widget Reveal/Autocomplete" );

	asyncTest( "Filter downs results when the user enters information", 3, function() {
		var $searchPage = $( "#search-filter-reveal-test" );

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( $searchPage );
			},

			function() {
				deepEqual( $searchPage.find( 'li.ui-screen-hidden' ).length, 22);
			},

			function() {
				$searchPage.find( 'input' ).val( 'a' );
				$searchPage.find( 'input' ).trigger('change');
				window.setTimeout(function() {
					deepEqual( $searchPage.find('li.ui-screen-hidden').length, 11);	
				},500);
			},

			function() {
				$searchPage.find( 'input' ).val( '' );
				$searchPage.find( 'input' ).trigger('change');
				window.setTimeout(function() {
					deepEqual( $searchPage.find('li.ui-screen-hidden').length, 22);
					start();
				},500);
			}
		]);
	});

	module( "Caching" );

		asyncTest( "list filter is inset from prototype options value", function() {
		$.mobile.filterable.prototype.options.inset = true;
		$("#list-inset-filter-prototype").page();

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-inset-filter-prototype");
			},

			function( timedOut) {
				ok( !timedOut );
				deepEqual( $.mobile.activePage.find("div.ui-filterable-inset").length, 1, "div is inset");
				window.history.back();
			},

			start
		]);
	});

	asyncTest( "list filter is inset from data attr value", function() {
		$.mobile.listview.prototype.options.inset = false;
		$("#list-inset-filter-data-attr").page();

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage("#list-inset-filter-data-attr");
			},

			function( timedOut) {
				ok( !timedOut );
				deepEqual( $.mobile.activePage.find("div.ui-filterable-inset").length, 1, "div is inset");
				window.history.back();
			},

			start
		]);
	});

	module( "Filter Widget Configuration" );

	asyncTest( "Custom id and classes are set on filter", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-custom-id-classes-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$list = $page.find( "ul" );

				ok($filter.is( ".baz" ), "filter element has custom classed set by user");
				//removed ok($filter.attr( "id" ) === "foo", "filter has custom id");

				$list.filterable("destroy");

				ok($page.find( ".ui-filterable" ).length === 0, "filter can be destroyed using custom user id");			 
				start();
			}
		]);
	});

	asyncTest( "Placing the filter at a location specified by data-target", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-target-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$list = $page.find( "ul" );

				ok($filter.parent().hasClass( "baz" ), "filter appended to element specified by data-target")

				$page.find('input').val('ac');
				$page.find('input').trigger('change');
				setTimeout(function() {
					deepEqual($list.find('li.ui-screen-hidden').length, 3);
					start();
				}, 500);
			}
		]);
	});

	asyncTest( "Selector attribute allows filtering of multiple datasets", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-selector-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$list_a = $page.find( "ul" ).eq(0),
					$list_b = $page.find( "ul" ).eq(1);

				$page.find('input').val('ac');
				$page.find('input').trigger('change');
				setTimeout(function() {
					deepEqual($list_a.find('li.ui-screen-hidden').length, $list_b.find('li.ui-screen-hidden').length);
					start();
				}, 500);
			}
		]);
	});

	asyncTest( "Filter can be set pre-enhanced (if wrapper class is provided)", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-pre-enhance-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$list = $page.find( "ul" ).eq(0);

				$page.find('input').val('ac');
				$page.find('input').trigger('change');
				setTimeout(function() {
					deepEqual(
						$list.find('li.ui-screen-hidden').length,
						3,
						"Custom filter can be used for filtering"
					);
					$list.filterable( "destroy" );
					ok(
						$page.find( ".ui-filterable" ).length === 1,
						"Pre-enhanced filter element is not removed on destroy"
					);
					deepEqual(
						$list.find('li.ui-screen-hidden').length,
						0,
						"destroying a filter shows all elements"
					);
					start();
				}, 500);
			}
		]);
	});

	module( "Filter Widget Methods/Options" );

	asyncTest( "Disabling, enabling text input", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-disable-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$list = $page.find( "ul" ).eq(0);

				$list.filterable( "disable" );

				deepEqual(
					$page.find('input').prop( "disabled" ),
					true,
					"Setting disable option on widget (ul) disables filter textinput"
				);

				$page.find('input').val('ac');
				$page.find('input').trigger('change');
				setTimeout(function() {
					deepEqual(
						$list.find('li.ui-screen-hidden').length,
						0,
						"Disabled filters cannot filter"
					);

					$list.filterable( "enable" );

					deepEqual(
						$page.find('input').attr( "disabled" ),
						undefined,
						"Enabling widget also enables textinput"
					);

					$page.find('input').val('ac');
					$page.find('input').trigger('change');
					setTimeout(function() {
						deepEqual(
							$list.find('li.ui-screen-hidden').length,
							3,
							"Enabled filter is working again"
						);
						start();
					},500);
				}, 500);
			}
		]);
	});

	module( "Filter Widget Using Different Elements" );

	asyncTest( "Filtering Table Rows based on Cells", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-table-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$table = $page.find( "table" ).eq(0);

				$page.find('input').val('12:12');
				$page.find('input').trigger('change');
				setTimeout(function() {
					deepEqual(
						$table.find('.ui-screen-hidden').length,
						4,
						"Filtering table rows hides based on table cell values"
					);
					$page.find('input').val('');
					$page.find('input').trigger('change');
					setTimeout(function() {
						deepEqual(
							$table.find('.ui-screen-hidden').length,
							0,
							"Removing filter value shows all table rows again"
						);
						start();
					}, 500);
				}, 500);
			}
		]);
	});

	asyncTest( "Controlgroup Search Filter", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-controlgroup-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$controlgroup = $page.find( "div.helper" );

				// filter
				$page.find('input').val('ac');
				$page.find('input').trigger('change');
				setTimeout(function() {
					deepEqual(
						$controlgroup.find('.ui-screen-hidden').length,
						3,
						"Filtering controlgroup input/a buttons by value"
					);

					// clear 
					$page.find('input').val('');
					$page.find('input').trigger('change');
					setTimeout(function() {
						deepEqual(
							$controlgroup.find('.ui-screen-hidden').length,
							0,
							"Removing filter value shows all controlgroup buttons again"
						);
						start();
					}, 500);
				}, 500);
			}
		]);
	});

	asyncTest( "Native Select Search Filter", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-select-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$select = $page.find( ".ui-select" );

				// filter
				$page.find('input').val('a');
				$page.find('input').trigger('change');
				setTimeout(function() {

					deepEqual(
						$select.find('.ui-screen-hidden').length,
						9,
						"Filtering select options by option text"
					);

					// clear 
					$page.find('input').val('');
					$page.find('input').trigger('change');
					setTimeout(function() {
						deepEqual(
							$select.find('.ui-screen-hidden').length,
							0,
							"Removing filter value shows all select options again"
						);
						start();
					}, 500);
				}, 500);
			}
		]);
	});

	asyncTest( "Native Select Search Filter - using data-filtertext", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-select-test" );
			},

			function() {
				var $options,
					$page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$select = $page.find( ".ui-select select" );

				// filter
				$page.find('input').val('this goes');
				$page.find('input').trigger('change');

				setTimeout(function() {
					$options = $select.find("option.ui-screen-hidden");
					deepEqual(
						$options.length,
						9,
						"Filtering select options by option text"
					);

					// clear 
					$page.find('input').val('');
					$page.find('input').trigger('change');
					setTimeout(function() {
						$options = $select.find("option.ui-screen-hidden");
						deepEqual(
							$options.length,
							0,
							"Removing filter value shows all select options again"
						);
						start();
					}, 500);
				}, 500);
			}
		]);
	});

	asyncTest( "Native Select Search Filter - select is hidden if no options match", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-select-test" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ),
					$select = $page.find( ".ui-select" );

				// filter
				$page.find('input').val('aaaaaaaa');
				$page.find('input').trigger('change');
				setTimeout(function() {
					ok(
						$select.is( '.ui-screen-hidden' ),
						"Select element itself is hidden when no options match filter"
					);

					// clear 
					$page.find('input').val('');
					$page.find('input').trigger('change');
					setTimeout(function() {
						deepEqual(
							$select.is( '.ui-screen-hidden' ),
							false,
							"Clearing filter also shows select again"
						);
						start();
					}, 500);
				}, 500);
			}
		]);
	});
	/* ================= the next block is tested on different elements ======= */
	asyncTest( "Random Elements Filter - <P>", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-random-test-p" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ).eq(1),
					$selection = $page.find( ".elements_p" );
					$selection2 = $page.find( ".elements_b_p" );

				// filter
				$page.find('input').eq(0).val('b');
				$page.find('input').eq(0).trigger('change');
				setTimeout(function() {
					deepEqual(
							$selection.find('.ui-screen-hidden').length,
							5,
							"Filtering <p> elements by text"
						);

					// clear 
					$page.find('input').eq(0).val('');
					$page.find('input').eq(0).trigger('change');
					setTimeout(function() {
						deepEqual(
							$selection.find('.ui-screen-hidden').length,
							0,
							"Clearing filter shows all elements again"
						);

						// filter second set
						$page.find('input').eq(1).val('f');
						$page.find('input').eq(1).trigger('change');
						setTimeout(function() {
							deepEqual(
									$selection2.find('.ui-screen-hidden').length,
									5,
									"Filtering <p> on 2nd set using data-filtertext works"
								);
							deepEqual(
									$selection.find('.ui-screen-hidden').length,
									0,
									"Filtering <p> on 2nd set does not change first dataset"
								);
							ok((
								$selection2.children().not( '.ui-screen-hidden' ).length === 1 &&
									$selection2.children().not( '.ui-screen-hidden' ).text() === "a"
								), "Filtering works on data-filtertext and not text"
							);
							// clear 
							$page.find('input').eq(1).val('');
							$page.find('input').eq(1).trigger('change');
							setTimeout(function() {
								deepEqual(
									$selection2.find('.ui-screen-hidden').length,
									0,
									"Clearing filter shows all elements again"
								);
								$page.find( "#ticktick_p" ).filterable("destroy");
								ok(
									$page.find(".ui-filterable").length === 1,
									"Destroying one filter does not destroy another filter"
								);
								start();
							},500);
						}, 500);
					}, 500);
				}, 500);
			}
		]);
	});

	asyncTest( "Random Elements Filter - <span>", function () {
		$.testHelper.pageSequence( [
			function(){
				$.mobile.changePage( home );
			},

			function() {
				$.mobile.changePage( "#search-random-test-span" );
			},

			function() {
				var $page = $( ".ui-page-active" ),
					$filter = $page.find( ".ui-filterable" ).eq(1),
					$selection = $page.find( ".elements_span" );
					$selection2 = $page.find( ".elements_b_span" );

				// filter
				$page.find('input').eq(0).val('b');
				$page.find('input').eq(0).trigger('change');
				setTimeout(function() {
					deepEqual(
							$selection.find('.ui-screen-hidden').length,
							5,
							"Filtering <span> elements by text"
						);

					// clear 
					$page.find('input').eq(0).val('');
					$page.find('input').eq(0).trigger('change');
					setTimeout(function() {
						deepEqual(
							$selection.find('.ui-screen-hidden').length,
							0,
							"Clearing filter shows all elements again"
						);

						// filter second set
						$page.find('input').eq(1).val('f');
						$page.find('input').eq(1).trigger('change');
						setTimeout(function() {
							deepEqual(
									$selection2.find('.ui-screen-hidden').length,
									5,
									"Filtering <span> on 2nd set using data-filtertext works"
								);
							deepEqual(
									$selection.find('.ui-screen-hidden').length,
									0,
									"Filtering <span> on 2nd set does not change first dataset"
								);
							ok((
								$selection2.children().not( '.ui-screen-hidden' ).length === 1 &&
									$selection2.children().not( '.ui-screen-hidden' ).text() === "a"
								), "Filtering works on data-filtertext and not text"
							);
							// clear 
							$page.find('input').eq(1).val('');
							$page.find('input').eq(1).trigger('change');
							setTimeout(function() {
								deepEqual(
									$selection2.find('.ui-screen-hidden').length,
									0,
									"Clearing filter shows all elements again"
								);
								$page.find( "#ticktick_span" ).filterable("destroy");
								ok(
									$page.find(".ui-filterable").length === 1,
									"Destroying one filter does not destroy another filter"
								);
								start();
							},500);
						}, 500);
					}, 500);
				}, 500);
			}
		]);
	});
})(jQuery);
