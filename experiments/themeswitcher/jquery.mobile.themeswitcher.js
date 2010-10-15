//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function($){
	$.themeswitcher = function(){
		var themesDir = 'http://jquerymobile.com/test/themes/',
			themes = ['default','valencia'],
			currentPage = $('.ui-page-active'),
			menuPage = $( '<div data-role=\'dialog\' data-theme=\'a\'>' +
						'<div data-role=\'header\' data-theme=\'b\'>' +
							'<a href=\'#\' class=\'ui-btn-left\' data-icon=\'delete\' data-iconpos=\'notext\'>Cancel</a>'+
							'<div class=\'ui-title\'>Switch Theme:</div>'+
						'</div>'+
						'<div data-role=\'content\' data-theme=\'c\'><ul data-role=\'listview\' data-inset=\'true\'></ul></div>'+
					'</div>' )
					.appendTo( 'body' ),
			menu = menuPage.find('ul');	
		
		//menu items	
		$.each(themes, function( i ){
			$('<li><a href=\'#\'>' + themes[ i ].charAt(0).toUpperCase() + themes[ i ].substr(1) + '</a></li>')
				.click(function(){
					addTheme( themes[i] );
					done();
					return false;
				})
				.appendTo(menu);
		});	
		
		//remover, adder
		function addTheme(theme){
			$('head').append( '<link rel=\'stylesheet\' href=\''+ themesDir + theme +'/\' />' );
		}
		
		//finished with this
		function done(){
			$.changePage(menuPage, currentPage, 'pop', true);
			menuPage.bind('pagehide',function(){
				menuPage.remove();
			});
			return false;
		}
				
		//destroy
		menuPage.find('.ui-btn-left').click(done);
		
		//create page, listview
		menuPage.page();
		
		//change page now	
		$.changePage(currentPage, menuPage, 'pop', false);
	};	
})(jQuery);
