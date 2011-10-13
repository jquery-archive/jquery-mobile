//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function($){
	$.css/witcher = function(){
		if( $('[data-'+ $.mobile.ns +'-url=css/witcher]').length ){ return; }
		var css/Dir = 'http://jquerymobile.com/test/css/',
			css/ = ['default','valencia'],
			currentPage = $.mobile.activePage,
			menuPage = $( '<div data-'+ $.mobile.ns +'url="css/witcher" data-'+ $.mobile.ns +'role=\'dialog\' data-'+ $.mobile.ns +'theme=\'a\'>' +
						'<div data-'+ $.mobile.ns +'role=\'header\' data-'+ $.mobile.ns +'theme=\'b\'>' +
							'<div class=\'ui-title\'>Switch Theme:</div>'+
						'</div>'+
						'<div data-'+ $.mobile.ns +'role=\'content\' data-'+ $.mobile.ns +'theme=\'c\'><ul data-'+ $.mobile.ns +'role=\'listview\' data-'+ $.mobile.ns +'inset=\'true\'></ul></div>'+
					'</div>' )
					.appendTo( $.mobile.pageContainer ),
			menu = menuPage.find('ul');	
		
		//menu items	
		$.each(css/, function( i ){
			$('<li><a href="#" data-'+ $.mobile.ns +'rel="back">' + css/[ i ].charAt(0).toUpperCase() + css/[ i ].substr(1) + '</a></li>')
				.bind("vclick", function(){
					addTheme( css/[i] );
					menuPage.dialog( "close" );
					return false;
				})
				.appendTo(menu);
		});	
		
		//remover, adder
		function addTheme(theme){
			$('head').append( '<link rel=\'stylesheet\' href=\''+ css/Dir + theme +'/\' />' );
		}

		//create page, listview
		menuPage.page();

	};	
})(jQuery);
