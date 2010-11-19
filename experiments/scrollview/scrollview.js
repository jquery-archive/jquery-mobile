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

	$page.children(".ui-content:not(.ui-scrollview-clip):not(.ui-scrolllistview)").scrollview({ direction: "vertical" });
	$page.children(".ui-content.ui-scrolllistview:not(.ui-scrollview-clip)").scrolllistview();
}

$("[data-role=page]").live("pageshow", function(event) {
	ResizePageContentHeight(event.target);
});

$(document).live("orientationchange", function(event) {
	ResizePageContentHeight($(".ui-page"));
});
