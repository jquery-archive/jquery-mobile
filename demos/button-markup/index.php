<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Button markup - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style>
		#custom-border-radius .ui-btn-icon-notext.ui-corner-all {
			-webkit-border-radius: .3125em;
			border-radius: .3125em;
		}
	</style>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Button markup <a href="http://api.jquerymobile.com/classes/" class="jqm-api-docs-link ui-btn ui-btn-icon-right ui-icon-carat-r ui-nodisc-icon ui-alt-icon ui-btn-inline ui-corner-all ui-mini">API</a></h1>

		<p>Add classes to style <code>a</code> and <code>button</code> elements. <code>input</code> buttons are enhanced by the button widget. See <a href="../button/" data-ajax="false">this page</a> for examples.</p>

		<p>Note that in 1.4 <code>data-</code> attributes will still work. The deprecated <code>buttonMarkup</code> method will add the applicable classes to <code>a</code> (with <code>data-role="button"</code>) and <code>button</code> elements. This method also adds the <code>role="button"</code> attribute to anchor elements.</p>

		<h2>Basic markup</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn">Anchor</a>
			<button class="ui-btn">Button</button>
		</div><!--/demo-html -->

		<h2>Corners</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-corner-all">Anchor</a>
			<button class="ui-btn ui-corner-all">Button</button>
		</div><!--/demo-html -->

		<p>Icon-only buttons are round by default. Here we show how you can set the same border-radius as other buttons.</p>

		<div data-demo-html="true" data-demo-css="true">
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">No text</a>
			<div id="custom-border-radius">
				<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">No text</a>
			</div>
		</div><!--/demo-html -->

		<h2>Shadow</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-shadow">Anchor</a>
			<button class="ui-btn ui-shadow">Button</button>
		</div><!--/demo-html -->

		<h2>Inline</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-btn-inline">Anchor</a>
			<button class="ui-btn ui-btn-inline">Button</button>
		</div><!--/demo-html -->

		<h2>Theme</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn">Anchor - Inherit</a>
			<a href="#" class="ui-btn ui-btn-a">Anchor - Theme swatch A</a>
			<a href="#" class="ui-btn ui-btn-b">Anchor - Theme swatch B</a>
			<button class="ui-btn">Button - Inherit</button>
			<button class="ui-btn ui-btn-a">Button - Theme swatch A</button>
			<button class="ui-btn ui-btn-b">Button - Theme swatch B</button>
		</div><!--/demo-html -->

		<h2>Mini</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-mini">Anchor</a>
			<button class="ui-btn ui-mini">Button</button>
		</div><!--/demo-html -->

		<h2>Icons</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-left">Anchor</a>
			<button class="ui-btn ui-icon-delete ui-btn-icon-left">Button</button>
		</div><!--/demo-html -->

		<h2>Icon position</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-left">Left</a>
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-right">Right</a>
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-top">Top</a>
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-bottom">Bottom</a>
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-notext">Icon only</a>
		</div><!--/demo-html -->

		<p>Inline:</p>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-left">Left</a>
			<a href="#" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-right">Right</a>
			<a href="#" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-top">Top</a>
			<a href="#" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-bottom">Bottom</a>
			<a href="#" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-notext">Icon only</a>
		</div><!--/demo-html -->

		<h2>Icon shadow</h2>
		<p>Note: This styling option is deprecated in jQuery Mobile 1.4.0 and will be removed in 1.5.0. Accordingly, we changed the default for framework-enhanced buttons to false.</p>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-icon-delete ui-btn-icon-left ui-shadow-icon">Anchor</a>
			<p>Theme B:</p>
			<button class="ui-btn ui-icon-delete ui-btn-icon-left ui-shadow-icon ui-btn-b">Button</button>
		</div><!--/demo-html -->

		<h2>Disabled</h2>

		<div data-demo-html="true">
			<a href="#" class="ui-btn ui-state-disabled">Disabled anchor via class</a>
			<button disabled>Button with disabled attribute</button>
		</div><!--/demo-html -->

		<h2>Native button</h2>
		<!-- TODO: Remove this demo in 1.5 -->
		<p>In 1.4 <code>button</code> will still be auto-enhanced. This example shows how you can prevent this.</p>

		<div data-demo-html="true">
			<button data-role="none">Button</button>
		</div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
