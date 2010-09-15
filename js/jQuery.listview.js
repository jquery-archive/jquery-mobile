/*
* jQuery Mobile Framework : listview plugin
* Copyright (c) jQuery Project
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($){
$.fn.listview = function(options){
	return $(this).each(function(){
		var o = $.extend({
			theme: $(this).is('[data-theme]') ? $(this).attr('data-theme') : 'f'
		},options);
		
		//split these to be able to reference o.theme - there's a simpler way i'm sure!
		o = $.extend({	
			countTheme: $(this).is('[data-count-theme]') ? $(this).attr('data-count-theme') : o.theme,
			headerTheme: 'b',
			splitTheme: $(this).is('[data-split-theme]') ? $(this).attr('data-split-theme') : 'b'
		},o);

		//if it's a nested list, chunk it into ui-page items, recurse through them and call listview on each individual ul
		$( $(this).find("ul").get().reverse() ).each(function( i ) {
			var parent = $(this).parent(), 
				title = parent.contents()[0].nodeValue,
				theme = $(this).is('[data-theme]') ? $(this).attr('data-theme') : o.theme, //sub-uls can have data-theme
				countTheme = $(this).is('[data-count-theme]') ?  $(this).attr('data-count-theme') : o.countTheme;
			
			$(this).wrap("<div class='ui-page'><div class='ui-content'></div></div>")
				.parent()
				.before("<div class='ui-header ui-bar-"+ o.headerTheme+"'><h1>" + title + "</h1><a href='#' class='ui-back' data-icon='arrow-l'>Back</a></div>")
				.parent()
				.attr("id", "ui-listview-" + i)
				.attr('data-theme', theme)
				.attr('data-count-theme', countTheme)
				.appendTo("body")
				.fixHeaderFooter()
				.find('.ui-header a.ui-back')
				.buttonMarkup()
				.click(function(){
					history.go(-1);
					return false;
				});
			  
			parent.html("<a href='#ui-listview-" + i + "'>" + title + "</a>");
		}).listview();
		
		//create listview markup 
		$(this)
			.addClass('ui-listview')
			.find('li').each(function(){
				$(this)
					.addClass('ui-li' + ($(this).is(':has(img)') ? ' ui-li-has-thumb' : ''))
					.buttonMarkup({wrapperEls: 'div', shadow: false, corners: false, iconPos: 'right', icon: 'arrow-r', theme: o.theme})
					.find('a:eq(0)').addClass('ui-link-inherit');
			})
			.end()
			.controlgroup({shadow: true})
			.find('li').each(function(){		
				//for split buttons
				$(this).find('a:eq(1)').each(function(){
					$(this)
						.attr('title', $(this).text())
						.addClass('ui-li-link-alt')
						.empty()
						.buttonMarkup({shadow: false, corners: false, theme: o.theme})
						.find('.ui-btn-inner').append($('<span></span>').buttonMarkup({ shadow: true, corners: true, theme: o.splitTheme, iconPos: 'notext',icon: 'arrow-r' }));
					
					//fix corners
					var closestLi = $(this).closest('li');
					if(closestLi.is('li:first-child')){
						$(this).addClass('ui-corner-tr');
					}
					else if(closestLi.is('li:last-child')){
						$(this).addClass('ui-corner-br');
					}		
				});	
			})
			.find('img').addClass('ui-li-thumb')
				.filter('li:first-child img').addClass('ui-corner-tl').end()
				.filter('li:last-child img').addClass('ui-corner-bl').end()
			.end()
			.find('.ui-li-count').addClass('ui-btn-up-'+o.countTheme + ' ui-btn-corner-all')
			.end()
			.find(':header').addClass('ui-li-heading')
			.end()
			.find('p,ul,dl').addClass('ui-li-desc');

		//tapping the whole LI triggers ajaxClick on the first link
		$(this).find('li').live('tap',function(){
			$(this).find('a:first').ajaxClick();
		});
	});	
};		
})(jQuery);