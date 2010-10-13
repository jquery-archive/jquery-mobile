//quick & dirty theme switcher, written to potentially work as a bookmarklet
(function($){
	$.themeswitcher = function(){
		var themesDir = 'http://jquerymobile.com/test/themes/',
			themes = ['default','dobson'],
			currentPage = $('.ui-page-active'),
			menuPage = $( '<div data-role=\'dialog\' data-theme=\'a\'>' +
						'<div data-role=\'header\' data-theme=\'b\'>' +
							'<a href=\'#\' class=\'ui-btn-left\' data-icon=\'delete\'>Cancel</a>'+
							'<div class=\'ui-title\'>Choose a theme:</div>'+
						'</div>'+
						'<div data-role=\'content\' data-theme=\'c\'><ul data-role=\'listview\'></ul></div>'+
					'</div>' )
					.appendTo( 'body' ),
			menu = menuPage.find('ul');	
		
		//menu items	
		$.each(themes, function( i ){
			$('<li><a href=\'#\'>' + themes[ i ] + '</a></li>')
				.click(function(){
					addTheme( themes[i] );
					done();
					return false;
				})
				.appendTo(menu);
		});	
		
		//remover, adder
		function addTheme(theme){
			//way too greedy theme remover
			$.each(themes,function( i ){
				$('head link[href*='+themes[ i ]+']').remove();
			});
			$('head').append( '<link rel=\'stylesheet\' href=\''+ themesDir + theme +'/\' />' );
		}
		
		//finished with this
		function done(){
			$.changePage(menuPage, currentPage, 'slideup', true);
			menuPage.bind('pagehide',function(){
				$(this).remove();
			});
			return false;
		}
		
		//create page, listview
		menuPage.page();
		
		//change page now	
		$.changePage(currentPage, menuPage, 'slideup', false);
		
		//destroy
		menuPage.find('.ui-btn-left').click(done);
	};	
})(jQuery);