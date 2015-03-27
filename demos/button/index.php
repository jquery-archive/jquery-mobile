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

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Buttons <a href="http://api.jquerymobile.com/button/" class="jqm-api-docs-link ui-button ui-nodisc-icon ui-alt-icon ui-button-inline ui-corner-all ui-mini">API <span class="ui-icon ui-icon-caret-r"></span></a></h1>

		<h2>Basic markup</h2>

		<p><code>button</code> elements and <code>input</code> elements with <code>type="button"</code>, <code>type="submit"</code>, or <code>type="reset"</code> are automatically enhanced by the Button widget. To have links styled as buttons you can add <code>data-role="button"</code> to the <code>a</code> element to initialize the Button widget.</p>

		<div data-demo-html="true">
			<a href="#" data-role="button">Anchor</a>
			<form>
				<button>Button</button>
				<input type="button" value="Input type button">
				<input type="submit" value="Input type submit">
				<input type="reset" value="Input type reset">
			</form>
		</div><!--/demo-html -->

		<h2>Enhanced</h2>

		<div data-demo-html="true">
			<form>
				<label>Label
					<input type="button" data-enhanced="true" value="Input value" class="ui-input-button ui-button ui-corner-all ui-shadow">
				</label>
			</form>
		</div><!--/demo-html -->

		<h2>Corners</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" value="Has corners by default">
				<input type="button" data-corners="false" value="Unset corners">
				<input type="button" data-enhanced="true" value="Enhanced" class="ui-input-button ui-button ui-corner-all">
            </form>
		</div><!--/demo-html -->

		<h2>Shadow</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" value="Has shadow by default">
				<input type="button" data-shadow="false" value="Unset shadow">
				<input type="button" data-enhanced="true" value="Enhanced" class="ui-input-button ui-button ui-shadow">
			</form>
		</div><!--/demo-html -->

		<h2>Inline</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-inline="true" value="Input">
				<input type="button" data-enhanced="true" value="Enhanced" class="ui-input-button ui-button ui-button-inline">
			</form>
		</div><!--/demo-html -->

		<h2>Theme</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" value="Input - Inherit">
				<input type="button" data-theme="a" value="Input - Theme swatch A">
				<input type="button" data-theme="b" value="Input - Theme swatch B">
				<div class="ui-input-button ui-button">
					Enhanced - Inherit
					<input type="button" data-enhanced="true" value="Enhanced - Inherit">
				</div>
				<div class="ui-input-button ui-button ui-button-a">
					Enhanced - Theme swatch A
					<input type="button" data-enhanced="true" value="Enhanced - Theme swatch A">
				</div>
				<div class="ui-input-button ui-button ui-button-b">
					Enhanced - Theme swatch B
					<input type="button" data-enhanced="true" value="Enhanced - Theme swatch B">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Mini</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-mini="true" value="Input">
				<div class="ui-input-button ui-button ui-mini">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Icons</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-icon="delete" value="Input">
				<div class="ui-input-button ui-button ui-icon-delete">
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
				<div class="ui-input-button ui-button ui-icon-delete">
					Enhanced - Left
					<input type="button" data-enhanced="true" value="Enhanced - Left">
				</div>
				<div class="ui-input-button ui-button ui-icon-delete">
					Enhanced - Right
					<input type="button" data-enhanced="true" value="Enhanced - Right">
				</div>
				<div class="ui-input-button ui-button ui-icon-delete">
					Enhanced - Top
					<input type="button" data-enhanced="true" value="Enhanced - Top">
				</div>
				<div class="ui-input-button ui-button ui-icon-delete">
					Enhanced - Bottom
					<input type="button" data-enhanced="true" value="Enhanced - Bottom">
				</div>
				<div class="ui-input-button ui-button ui-icon-delete ui-button-icon-only">
					Enhanced - Icon only
					<input type="button" data-enhanced="true" value="Enhanced - Icon only">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Icon shadow</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" data-theme="b" data-icon="delete" data-iconshadow="true" value="Input">
				<div class="ui-input-button ui-button ui-button-b ui-icon-delete ui-shadow-icon">
					Enhanced
					<input type="button" data-enhanced="true" value="Enhanced">
				</div>
			</form>
		</div><!--/demo-html -->

		<h2>Disabled</h2>

		<div data-demo-html="true">
			<form>
				<input type="button" disabled value="Input button with disabled attribute">
				<div class="ui-input-button ui-button ui-state-disabled">
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
