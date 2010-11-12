//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function($){
	$.themeswitcher = function(){
		var themesDir = 'http://jquerymobile.com/test/themes/',
			themes = ['default','valencia'],
			currentPage = $.mobile.activePage,
			menuPage = $( '<div data-role=\'dialog\' data-theme=\'a\'>' +
						'<div data-role=\'header\' data-theme=\'b\'>' +
							'<div class=\'ui-title\'>Switch Theme:</div>'+
						'</div>'+
						'<div data-role=\'content\' data-theme=\'c\'><ul data-role=\'listview\' data-inset=\'true\'></ul></div>'+
					'</div>' )
					.appendTo( $.pageContainer ),
			menu = menuPage.find('ul');	
		
		//menu items	
		$.each(themes, function( i ){
			$('<li><a href=\'#\'>' + themes[ i ].charAt(0).toUpperCase() + themes[ i ].substr(1) + '</a></li>')
				.click(function(){
					addTheme( themes[i] );
				})
				.appendTo(menu);
		});	
		
		//remover, adder
		function addTheme(theme){
			$('head').append( '<link rel=\'stylesheet\' href=\''+ themesDir + theme +'/\' />' );
		}
		

		
		//create page, listview
		menuPage.page();
		
		//change page now	
		$.mobile.changePage([currentPage, menuPage], 'pop', false);
	};	
})(jQuery);
