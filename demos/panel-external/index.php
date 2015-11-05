<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>External panels - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="panel-init">
		$(function() {
			$( "body>[data-role='panel']" ).panel();
		});
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="toolbar" data-type="header">
		<h1>External panels</h1>
		<a href="../panel/" data-rel="back" class="ui-button ui-toolbar-header-button-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-button-icon-only">Back <span class="ui-icon ui-icon-caret-l"></span></a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content jqm-fullwidth">

		<h1>External Panels</h1>

		<p>The panels below are all located outside the page. Panels outside of a page must be initalized manually and will not be handled by auto init. Panels outside of pages will remain in the DOM (unless manually removed) as long as you use Ajax navigation, and can be opened or closed from any page.</p>

		<p>Navigate to page 2 to see this behavior. The HTML document for page 2 doesn't contain panel markup, but you can still open the panels.</p>

		<p><a href="page-b.php">Navigate to page 2</a></p>

		<p><strong>Left</strong> panel examples</p>
		<a href="#leftpanel3" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Overlay</a>
		<a href="#leftpanel1" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Reveal</a>
		<a href="#leftpanel2" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Push</a>

		<p><strong>Right</strong> panel examples</p>
		<a href="#rightpanel3" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Overlay</a>
		<a href="#rightpanel1" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Reveal</a>
		<a href="#rightpanel2" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Push</a>

	</div><!-- /content -->

</div><!-- /page -->

<div data-role="panel" id="leftpanel1" data-position="left" data-display="reveal" data-theme="a">

    <h3>Left Panel: Reveal</h3>
    <p>This panel is positioned on the left with the reveal display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
    <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
    <a href="#demo-links" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-a ui-button-inline">Close panel <span class="ui-icon ui-icon-delete"></span></a>

</div><!-- /leftpanel1 -->

<!-- leftpanel2  -->
<div data-role="panel" id="leftpanel2" data-position="left" data-display="push" data-theme="a">

    <h3>Left Panel: Push</h3>
    <p>This panel is positioned on the left with the push display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
    <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
    <a href="#demo-links" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-a ui-button-inline">Close panel <span class="ui-icon ui-icon-delete"></span></a>

</div><!-- /leftpanel2 -->

<!-- leftpanel3  -->
<div data-role="panel" id="leftpanel3" data-position="left" data-display="overlay" data-theme="a">

    <h3>Left Panel: Overlay</h3>
    <p>This panel is positioned on the left with the overlay display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
    <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
    <a href="#demo-links" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-a ui-button-inline">Close panel <span class="ui-icon ui-icon-delete"></span></a>

</div><!-- /leftpanel3 -->

<!-- rightpanel1  -->
<div data-role="panel" id="rightpanel1" data-position="right" data-display="reveal" data-theme="b">

    <h3>Right Panel: Reveal</h3>
    <p>This panel is positioned on the right with the reveal display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
    <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
    <a href="#demo-links" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-a ui-button-inline">Close panel <span class="ui-icon ui-icon-delete"></span></a>

</div><!-- /rightpanel1 -->

<!-- rightpanel2  -->
<div data-role="panel" id="rightpanel2" data-position="right" data-display="push" data-theme="b">

    <h3>Right Panel: Push</h3>
    <p>This panel is positioned on the right with the push display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
    <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
    <a href="#demo-links" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-a ui-button-inline">Close panel <span class="ui-icon ui-icon-delete"></span></a>

</div><!-- /rightpanel2 -->

<!-- rightpanel3  -->
<div data-role="panel" id="rightpanel3" data-position="right" data-display="overlay" data-theme="b">

    <h3>Right Panel: Overlay</h3>
    <p>This panel is positioned on the right with the overlay display mode. The panel markup is <em>after</em> the header, content and footer in the source order.</p>
    <p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>
    <a href="#demo-links" data-rel="close" class="ui-button ui-shadow ui-corner-all ui-button-a ui-button-inline">Close panel <span class="ui-icon ui-icon-delete"></span></a>

</div><!-- /rightpanel3 -->

</body>
</html>
