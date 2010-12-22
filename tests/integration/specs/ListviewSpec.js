describe("Listviews", function() {

	describe("Basic Linked list", function() {
		it("should setup the listview correctly", function() {
			waitsFor(function() {
				return ($('.ui-page-active').length > 0)
			})
			
			runs(function() {
				expect($('.ui-page-active .ui-listview').length).toEqual(1);
				expect($('.ui-page-active [role="option"]').length).toEqual(3);
			})
		});
		
		it("should slide the listview page into view when the list view link is clicked", function() {
			listViewHelper.resetForPage($('#basic-link-results'))
			$('.ui-page-active li').first().click();

			waitsFor(function() {
				return listViewHelper.transitionComplete();
			})

			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();
			})
	  });
	
		it("should slide back to the main page when the back button is clicked", function() {
			listViewHelper.resetForPage($('#basic-linked-test'))
			$('#basic-link-results a:contains("Back")').click();

			waitsFor(function() {
				return listViewHelper.transitionComplete();
			})	
			
			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
			});
		});
	});
	
	describe("Nested List", function() {	
		it("should change the page to the nested list and make sure the page was enhanced.", function() {
			listViewHelper.resetForPage($('#nested-list-test'))
			$.mobile.changePage(listViewHelper.currentPage(), "slide", true, true);
			
			waitsFor(function() {
				return listViewHelper.transitionComplete();
			})
			
			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();
				expect($('[role="option"]', listViewHelper.currentPage()).length).toEqual(2);
				expect($('body > [data-url="nested-list-test&ui-page=More-animals-0"]').length).toEqual(1);
				expect($('body > [data-url="nested-list-test&ui-page=Groups-of-animals-1"]').length).toEqual(1);
			});			
		});
		
		it("should change to nested page when it is clicked", function() {
			listViewHelper.resetForPage($('body > [data-url="nested-list-test&ui-page=More-animals-0"]'));
			$('.ui-page-active li:eq(1)').click();
			
			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});
			
			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();
				expect($('[role="option"]', listViewHelper.currentPage()).length).toEqual(2);
				expect($('.ui-listview', listViewHelper.currentPage()).find(":contains('Rhumba of rattlesnakes')").length).toEqual(1);
				expect($('.ui-listview', listViewHelper.currentPage()).find(":contains('Shoal of Bass')").length).toEqual(1);
			});
		});
		
		it("should go back to top level when the back button is clicked", function() {
			listViewHelper.resetForPage($('#nested-list-test'));
			$('body > [data-url="nested-list-test&ui-page=More-animals-0"]').find('a:contains("Back")').click();
			
			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});
			
			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();				
			});
		});
	});
	
	describe("Ordered Lists", function() {
			it("should change the page to the numbered list and make sure the page was enhanced.", function() {
				listViewHelper.resetForPage($('#numbered-list-test'));	
				$.mobile.changePage(listViewHelper.currentPage(), "slide", true, true);

				waitsFor(function() {
					return listViewHelper.transitionComplete();
				});

				runs(function() {
					expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
					expect($('[role="option"]', listViewHelper.currentPage()).length).toEqual(3);
					expect($('.ui-link-inherit', listViewHelper.currentPage()).first().text()).toEqual("Number 1");
				});			
			});
			
			it("should take us to number 1 page when click", function() {
				listViewHelper.resetForPage($('#numbered-list-results'));	
				$('.ui-page-active li').first().click();

		   	waitsFor(function() {
					return listViewHelper.transitionComplete();
				});

				runs(function() {
					expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();
				})
			});
		
			it("should slide back to the main numbered page when the back button is clicked", function() {
				listViewHelper.resetForPage($('#numbered-list-test'));
				$('.ui-page-active a:contains("Back")').click();
				
				waitsFor(function() {
					return listViewHelper.transitionComplete();
				});

				runs(function() {
					expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
				});
			});
	});
	
	describe("read only list", function() {
		it("should change the page to the Read only list and make sure the page was enhanced.", function() {
			listViewHelper.resetForPage($('#read-only-list-test'));
			$.mobile.changePage(listViewHelper.currentPage(), "slide", true, true);

			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});

			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
				expect($('[role="option"]', listViewHelper.currentPage()).length).toEqual(4);
				expect($('li', listViewHelper.currentPage()).first().text()).toEqual("Read");
			});			
		});
		
		it("should not take us to new page when a list item clicked", function() {
			var current_page = $('#read-only-list-test');
			$('li', current_page).first().click();
			
			//wait a second to make sure that we give it time to transition if it is going to.  It shouldn't
			waits(1000);
			
			runs(function() {
				expect($('.ui-page-active').attr('id')).toEqual('read-only-list-test');
			})
		});
	});
	
	describe("split view list", function() {
		it("should change the page to the split view and list view and enhance the page correctly.", function() {
			listViewHelper.resetForPage($('#split-list-test'));
			$.mobile.changePage(listViewHelper.currentPage(), "slide", true, true);

			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});

			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
				expect($('[role="option"]', listViewHelper.currentPage()).length).toEqual(3);
				expect($('.ui-li-link-alt', listViewHelper.currentPage()).length).toEqual(3);
				expect($('.ui-link-inherit', listViewHelper.currentPage()).length).toEqual(3);
			});			
		});
		
		it("should change the page to split view page 1 when the first link is clicked", function() {
			listViewHelper.resetForPage($('#split-list-link1'));
			$('.ui-page-active [role="option"]:eq(0)').click();
		
			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});

			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
			});
		});
		
		it("should slide the page back to the split list view when the back button is clicked", function() {
			listViewHelper.resetForPage($('#split-list-test'));
			$('.ui-page-active a:contains("Back")').click();
			
			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});

			runs(function() {
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
			});
		});
		
		/* 
		 * Once the bug in which the changePage call does not update the hash correctly, resulting in the back button
		 * going back to the wrong page is fixed, then we should implement these tests.
		 */
		it("should slide to the second link when the right icon is clicked", function() {
			//pending
		})
		
		it("should slide back to the split list view page when teh back button is clicked", function() {
			//pending
		});
	});
	
	describe("List dividers", function() {
		it("should make the list divider page the active page and enhance it correctly.", function() {
			listViewHelper.resetForPage($('#list-divider-test'));
			$.mobile.changePage(listViewHelper.currentPage(), "slide", true, true);

			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});

			runs(function() {
				expect($('.ui-page-active .ui-li-divider').length).toEqual(2);
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
			});
		});
	});
	
	describe("Search Filter", function() {
		it("should make the search filter page the active page and enhance it correctly.", function() {
			listViewHelper.resetForPage($('#search-filter-test'));
			$.mobile.changePage(listViewHelper.currentPage(), "slide", true, true);

			waitsFor(function() {
				return listViewHelper.transitionComplete();
			});

			runs(function() {
				expect($('.ui-page-active input').length).toEqual(1)
				expect(listViewHelper.currentPage().hasClass('ui-page-active')).toBeTruthy();	
			});
		});
		
		it("should filter down the results when the user enters information", function() {
			$('.ui-page-active input').val('at');
			$('.ui-page-active input').trigger('change');
			
			waitsFor(function() {
				return $('.ui-page-active li[style="display: none; "]').length == 2;
			})
			
			runs(function() {
				expect( $('.ui-page-active li[style="display: none; "]').length).toEqual(2);
			});
		});
		
		it("if user removes values it should redisplay the results", function() {
			$('.ui-page-active input').val('a')
			$('.ui-page-active input').trigger('change');
		
			waitsFor(function() {
				return $('.ui-page-active li[style="display: none; "]').length == 0;
			})

			runs(function() {
				expect( $('.ui-page-active li[style="display: none; "]').length).toEqual(0);
			});
		});
	});
});