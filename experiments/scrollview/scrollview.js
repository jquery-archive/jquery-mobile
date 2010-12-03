function ResizePageContentHeight(page)
{
	var $page = $(page);
	var $content = $page.children(".ui-content");
	var hh = $page.children(".ui-header").outerHeight(); hh = hh ? hh : 0;
	var fh = $page.children(".ui-footer").outerHeight(); fh = fh ? fh : 0;
	var pt = parseFloat($content.css("padding-top"));
	var pb = parseFloat($content.css("padding-bottom"));
	var wh = window.innerHeight;
	$content.height(wh - (hh + fh) - (pt + pb));
}

$("[data-role=page]").live("pageshow", function(event) {
	var $page = $(this);
	$page.find(".ui-content").attr("data-scroll", "y");
	$page.find("[data-scroll]:not(.ui-scrollview-clip)").each(function(){
		var $this = $(this);
		// XXX: Remove this check for ui-scrolllistview once we've
		//      integrated list divider support into the main scrollview class.
		if ($this.hasClass("ui-scrolllistview"))
			$this.scrolllistview();
		else
		{
			var st = $this.data("scroll") + "";
			var paging = st && st.search(/^[xy]p$/) != -1;
			var dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null;

			var opts = {};
			if (dir)
				opts.direction = dir;
			if (paging)
				opts.pagingEnabled = true;

			$this.scrollview(opts);
		}
	});

	ResizePageContentHeight(event.target);
});

$(document).live("orientationchange", function(event) {
	ResizePageContentHeight($(".ui-page"));
});
