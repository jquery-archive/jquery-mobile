$(function(){
		$('.photoview')
			.live('swipeleft',function(){
				$(this).find('a').ajaxClick();
			})
			.live('swiperight',function(){
				$(this).next().find('a:contains(Prev)').ajaxClick();
			});
		$('.photoview a').click(function(){
			event.stopImmediatePropagation();
		})
		.tap(function(event){
			$(this).ajaxClick();
			event.stopImmediatePropagation();
		})
		.taphold(function(event){
			$.fixedToolbars.toggle();
			event.stopImmediatePropagation();
		})
		
	}	
});

