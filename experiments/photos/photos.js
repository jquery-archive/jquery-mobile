
$('.photoview')
	.live('pagebeforehide',function(){
		$.fixedToolbars.hide(true);
	})
	.live('pageshow',function(){
		$.fixedToolbars.show();
	})
	.live('swipeleft',function(){
		$(this).find('a.next').click();
	})
	.live('swiperight',function(){
		$(this).next().find('a.prev').click();
	});

$('.photoview img').live('mousedown touchstart',function(event){
	event.preventDefault();
})	
	


