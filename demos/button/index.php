<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Input buttons - jQuery Mobile Demos</title>
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

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Input buttons <a href="http://api.jquerymobile.com/button/" class="jqm-api-docs-link ui-btn ui-btn-icon-right ui-icon-carat-r ui-nodisc-icon ui-alt-icon ui-btn-inline ui-corner-all ui-mini">API</a></h1>

		<p>Examples of how to style input buttons; <code>input</code> elements with <code>type="button"</code>, <code>type="submit"</code>, or <code>type="reset"</code>. See <a href="../button-markup/">button markup</a> for examples of <code>a</code> and <code>button</code> elements.</p>

		<h2>Default</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" value="Button">
				<input type="submit" value="Submit">
				<input type="reset" value="Reset">
			</form>
		</div><!--/demo-html -->

		<h2>Enhanced</h2>

		<div data-demo-html="true">
			<form>
				<div class="ui-input-btn ui-btn ui-corner-all ui-shadow">
					Input value
					<input type="button" data-enhanced="true" value="Input value">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Corners</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" value="Has corners by default">
				<input type="button" data-corners="false" value="Unset corners">
				<div class="ui-input-btn ui-btn ui-corner-all">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<p>Icon-only buttons are round by default. Here we show how you can set the same border-radius as other buttons.</p>

		<div data-demo-html="true" data-demo-css="true">
			<form>
				<input type="button" data-icon="delete" data-iconpos="notext" value="Icon only">
				<div id="custom-border-radius">
					<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">
						Enhanced - Icon only
						<input type="button" data-enhanced="true" value="Enhanced - Icon only">
					</div>
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Shadow</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" value="Has shadow by default">
				<input type="button" data-shadow="false" value="Unset shadow">
				<div class="ui-input-btn ui-btn ui-shadow">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Inline</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-inline="true" value="Input">
				<div class="ui-input-btn ui-btn ui-btn-inline">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Theme</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" value="Input - Inherit">
				<input type="button" data-theme="a" value="Input - Theme swatch A">
				<input type="button" data-theme="b" value="Input - Theme swatch B">
				<div class="ui-input-btn ui-btn">
					Enhanced - Inherit
					<input type="button" data-enhanced="true" value="Enhanced - Inherit">
				</div>
				<div class="ui-input-btn ui-btn ui-btn-a">
					Enhanced - Theme swatch A
					<input type="button" data-enhanced="true" value="Enhanced - Theme swatch A">
				</div>
				<div class="ui-input-btn ui-btn ui-btn-b">
					Enhanced - Theme swatch B
					<input type="button" data-enhanced="true" value="Enhanced - Theme swatch B">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Mini</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-mini="true" value="Input">
				<div class="ui-input-btn ui-btn ui-mini">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Icons</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-icon="delete" value="Input">
				<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-left">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Icon position</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-icon="delete" value="Left (default)">
				<input type="button" data-icon="delete" data-iconpos="right" value="Right">
				<input type="button" data-icon="delete" data-iconpos="top" value="Top">
				<input type="button" data-icon="delete" data-iconpos="bottom" value="Bottom">
				<input type="button" data-icon="delete" data-iconpos="notext" value="Icon only">
				<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-left">
					Enhanced - Left
					<input type="button" data-enhanced="true" value="Enhanced - Left">
				</div>
				<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-right">
					Enhanced - Right
					<input type="button" data-enhanced="true" value="Enhanced - Right">
				</div>
				<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-top">
					Enhanced - Top
					<input type="button" data-enhanced="true" value="Enhanced - Top">
				</div>
				<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-bottom">
					Enhanced - Bottom
					<input type="button" data-enhanced="true" value="Enhanced - Bottom">
				</div>
				<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-notext">
					Enhanced - Icon only
					<input type="button" data-enhanced="true" value="Enhanced - Icon only">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Icon shadow</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-theme="b" data-icon="delete" data-iconshadow="true" value="Input">
				<div class="ui-input-btn ui-btn ui-btn-b ui-icon-delete ui-btn-icon-left ui-shadow-icon">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Disabled</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" disabled value="Input button with disabled attribute">
				<div class="ui-input-btn ui-btn ui-state-disabled">
					Enhanced
					<input type="button" disabled data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Native inputs</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-role="none" value="Button">
				<input type="submit" data-role="none" value="Submit">
				<input type="reset" data-role="none" value="Reset">
			</form>
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
