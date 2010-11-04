//quick view source in new window links
$.fn.addSourceLink = function(style){

	return $(this).each(function(){
		var link = $('<a href="#" data-inline="true">View Source</a>'),
			src = src = $('<div></div>').append( $(this).clone() ).html(),
			page = $( "<div data-role='dialog' data-theme='a'>" +
					"<div data-role='header' data-theme='b'>" +
						"<a href='#' class='ui-btn-left' data-icon='delete' data-iconpos='notext'>Close</a>"+
						"<div class='ui-title'>jQuery Mobile Source Excerpt</div>"+
					"</div>"+
					"<div data-role='content'></div>"+
				"</div>" )
				.appendTo( "body" )
				.page();
				
		$('<a href="#">View Source</a>')
			.buttonMarkup({
				icon: 'arrow-u',
				iconpos: 'notext'
			})
			.click(function(){
				var codeblock = $('<pre><code></code></pre>');
				src = src.replace(/&/gmi, '&amp;').replace(/"/gmi, '&quot;').replace(/>/gmi, '&gt;').replace(/</gmi, '&lt;').replace('data-jqm-source="true"','');
				codeblock.find('code').append(src);

				var activePage = $(this).parents('.ui-page-active');
				page.find('.ui-content').append(codeblock);
				$.changePage(page, 'slideup',false);
				page.find('.ui-btn-left').click(function(){
					$.changePage(activepage, 'slideup',true);
					return false;
				});						
			})	
			.insertAfter(this);
		});	
};

//set up view source links
$('div').live('pagebeforecreate',function(){
	$(this).find('[data-jqm-source="true"]').addSourceLink();
});