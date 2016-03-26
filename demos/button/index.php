<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Buttons - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Buttons</h1>

		<a href="http://api.jquerymobile.com/button/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<h2>Basic markup</h2>

		<p><code>button</code> elements and <code>input</code> elements with <code>type="button"</code>, <code>type="submit"</code>, or <code>type="reset"</code> are automatically enhanced by the Button widget. To have links styled as buttons you can add <code>data-role="button"</code> to the <code>a</code> element to initialize the Button widget.</p>

		<div data-demo-html="true">
			<a href="#" data-role="button">Anchor</a>
			<button>Button</button>
			<form>
				<input type="button" value="Input type button">
				<input type="submit" value="Input type submit">
				<input type="reset" value="Input type reset">
			</form>
		</div><!--/demo-html -->

		<h2>Enhanced</h2>

		<div data-demo-html="true">
			<form>
				<label>Input label
					<input type="button" data-enhanced="true" value="Input value" class="ui-button ui-corner-all ui-shadow ui-widget">
				</label>
			</form>
			<button data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget">Button text</button>
			<a href="index.php" data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget">Link text</a>
		</div><!--/demo-html -->

		<h2>Corners</h2>

		<div data-demo-html="true">
			<button>Has corners by default</button>
			<button data-corners="false">Unset corners</button>
			<button data-enhanced="true" class="ui-button ui-corner-all ui-shadow ui-widget">Enhanced</button>
		</div><!--/demo-html -->

		<h2>Shadow</h2>

		<div data-demo-html="true">
			<button>Has shadow by default</button>
			<button data-shadow="false">Unset shadow</button>
			<button data-enhanced="true" class="ui-button ui-corner-all ui-shadow ui-widget">Enhanced</button>
		</div><!--/demo-html -->

		<h2>Inline</h2>

		<div data-demo-html="true">
			<button data-inline="true">Inline</button>
			<button data-enhanced="true" class="ui-button ui-button-inline ui-corner-all ui-shadow ui-widget">Enhanced</button>
		</div><!--/demo-html -->

		<h2>Mini</h2>

		<div data-demo-html="true">
			<button data-mini="true">Mini</button>
			<button data-enhanced="true" class="ui-button ui-mini ui-corner-all ui-shadow ui-widget">Enhanced</button>
		</div><!--/demo-html -->

		<h2>Mini inline</h2>

		<div data-demo-html="true">
			<button data-mini="true" data-inline="true">Mini</button>
			<button data-enhanced="true" class="ui-button ui-mini ui-button-inline ui-corner-all ui-shadow ui-widget">Enhanced</button>
		</div><!--/demo-html -->

		<h2>Theme</h2>

		<div data-demo-html="true">
			<button>Inherit</button>
			<button data-theme="a">Theme swatch A</button>
			<button data-theme="b">Theme swatch B</button>

			<button data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget">Enhanced - Inherit</button>
			<button data-enhanced="true" class="ui-button ui-button-a ui-shadow ui-corner-all ui-widget">Enhanced - Theme swatch A</button>
			<button data-enhanced="true" class="ui-button ui-button-b ui-shadow ui-corner-all ui-widget">Enhanced - Theme swatch B</button>
		</div><!--/demo-html -->

		<h2>Icons</h2>

		<p>Link buttons and <code>button</code> elements can contain icons. The use of icons in <code>input</code> buttons is no longer supported.</p>

		<div data-demo-html="true">
			<button data-icon="ui-icon-delete">Button</button>
			<button data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-delete"></span><span class="ui-button-icon-space"> </span>Enhanced</button>
		</div><!--/demo-html -->

		<h2>Icon position</h2>

		<div data-demo-html="true">
			<button data-icon="ui-icon-arrow-l">Beginning</button>
			<button data-icon="ui-icon-arrow-r" data-icon-position="end">End</button>
			<button data-icon="ui-icon-arrow-u" data-icon-position="top">Top</button>
			<button data-icon="ui-icon-arrow-d" data-icon-position="bottom">Bottom</button>

			<button data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-arrow-l"></span><span class="ui-button-icon-space"> </span>Enhanced - Beginning</button>
			<button data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget">Enhanced - End<span class="ui-button-icon-space"> </span><span class="ui-button-icon ui-icon ui-icon-arrow-r"></span></button>
			<button data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-arrow-u ui-widget-icon-block"></span>Enhanced - Top</button>
			<button data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget">Enhanced - Bottom<span class="ui-button-icon ui-icon ui-icon-arrow-d ui-widget-icon-block"></span></button>
		</div><!--/demo-html -->

		<h2>Disabled</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" disabled value="Input button with disabled attribute">
				<input type="button" disabled value="Enhanced input button with disabled attribute" class="ui-button ui-shadow ui-corner-all ui-widget ui-button-disabled ui-state-disabled">
			</form>
		</div><!--/demo-html -->

		<h2>Native inputs and button</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-role="none" value="Input button">
				<input type="submit" data-role="none" value="Submit">
				<input type="reset" data-role="none" value="Reset">
			</form>
			<br>
			<button data-role="none">Button</button>
		</div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

</body>
</html>
