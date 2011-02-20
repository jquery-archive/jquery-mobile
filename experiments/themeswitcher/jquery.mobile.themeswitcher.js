//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function($){
	$.themeswitcher = function(){
		if( $('[data-url=themeswitcher]').length ){ return; }
		var themesDir = 'http://jquerymobile.com/test/themes/',
			themes = ['default','valencia'],
			currentPage = $.mobile.activePage,
			menuPage = $( '<div data-jq-'+ $.mobile.ns +'url="themeswitcher" data-jq-'+ $.mobile.ns +'role=\'dialog\' data-jq-'+ $.mobile.ns +'theme=\'a\'>' +
						'<div data-jq-'+ $.mobile.ns +'role=\'header\' data-jq-theme=\'b\'>' +
							'<div class=\'ui-title\'>Switch Theme:</div>'+
						'</div>'+
						'<div data-jq-'+ $.mobile.ns +'role=\'content\' data-jq-'+ $.mobile.ns +'theme=\'c\'><ul data-jq-'+ $.mobile.ns +'role=\'listview\' data-jq-inset=\'true\'></ul></div>'+
					'</div>' )
					.appendTo( $.mobile.pageContainer ),
			menu = menuPage.find('ul');	
		
		//menu items	
		$.each(themes, function( i ){
			$('<li><a href="#" data-jq-'+ $.mobile.ns +'rel="back">' + themes[ i ].charAt(0).toUpperCase() + themes[ i ].substr(1) + '</a></li>')
				.click(function(){
					addTheme( themes[i] );
					return false;
				})
				.appendTo(menu);
		});	
		
		//remover, adder
		function addTheme(theme){
			$('head').append( '<link rel=\'stylesheet\' href=\''+ themesDir + theme +'/\' />' );
		}

		//create page, listview
		menuPage.page();

	};	
})(jQuery);
