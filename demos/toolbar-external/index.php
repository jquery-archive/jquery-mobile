<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>External toolbars - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$(function(){
			$( "[data-role='toolbar']" ).toolbar();
		});
	</script>
</head>
<body>
	<div data-role="toolbar" data-type="header" data-theme="a">
			<a href="../toolbar/" data-rel="back" class="ui-button ui-toolbar-header-button-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-button-icon-only"><span class="ui-icon ui-icon-caret-l"></span> Back</a>
		<h1>External header</h1>
	</div><!-- /header -->

	<div data-role="page" class="jqm-demos" data-quicklinks="true">

		<div role="main" class="ui-content jqm-content jqm-fullwidth">

			<h1>External toolbars</h1>

			<p>The header and footer on this page are positioned outside the page. They are before and after the page within the body. These Toolbars will remain in the dom until manually removed.</p>

			<h2>Markup</h2>

			<p>The markup for external toolbars is identical to normal toolbars, you just place the toolbar outside the page within the body of your page</p>

			<h2>Auto init</h2>

			<p>Because these toolbars are not within the page they will not auto initalize. You must call the toolbar plugin yourself.</p>

<pre><code>
$(function(){
	$( "[data-role='toolbar']" ).toolbar();
});
</code></pre>

			<h2>Theme</h2>

			<p>Since external toolbars are outside the page they don't inherit a theme from the page. This means you always have to set a theme for them. You can use the <code>data-theme</code> attribute for this or set the <code>theme</code> option when you call the plugin:</p>

<pre><code>
$(function(){
	$( "[data-role='toolbar']" ).toolbar({ theme: "a" });
});
</code></pre>

			<h2>Ajax navigation</h2>

			<p>Because these toolbars are not within the page they will remain in the DOM until manually removed.</p>

			<p>Toolbars not within a page will not be pulled into the DOM during Ajax navigation.</p>

			<h2>Fixed external toolbars</h2>

			<p>External toolbars can also be set to fixed positioning just like normal toolbars: <a href="../toolbar-fixed-external/" data-ajax="false">External fixed toolbars</a></p>

		</div><!-- /content -->

	</div><!-- /page -->

	<div data-role="toolbar" data-type="footer" data-theme="a">
		<h1>External footer</h1>
	</div><!-- /footer -->

</body>
</html>
