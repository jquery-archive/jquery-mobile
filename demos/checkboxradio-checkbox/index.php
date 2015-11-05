<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Checkbox - jQuery Mobile Demos</title>
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

		<h1>Checkbox</h1>

		<a href="http://api.jquerymobile.com/checkboxradio/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>Checkbox inputs are used to provide a list of options where more than one can be selected. Checkbox buttons are enhanced by the Checkboxradio widget.</p>

		<h2>Basic markup</h2>

		<p>To create a single checkbox, add an <code>input</code> with a <code>type="checkbox"</code> attribute and a corresponding <code>label</code>. If the <code>input</code> isn't wrapped in its corresponding <code>label</code>, be sure to set the <code>for</code> attribute of the <code>label</code> to match the <code>id</code> of the <code>input</code> so they are semantically associated.</p>

		<div data-demo-html="true">
			<form>
				<label>
					<input type="checkbox" name="checkbox-0 ">Check me
				</label>
			</form>
		</div><!--/demo-html -->

		<h2>Mini size</h2>

		<p>For a more compact version that is useful in toolbars and tight spaces, add the <code>ui-mini</code> class to the element's <code>data-wrapper-class</code> attribute to create a mini version. </p>

		<div data-demo-html="true">
			<form>
				<input type="checkbox" name="checkbox-mini-0" id="checkbox-mini-0" data-wrapper-class="ui-mini">
				<label for="checkbox-mini-0">I agree</label>
			</form>
		</div><!--/demo-html -->

		<h2>Horizontal group</h2>

		<p>Checkboxes can be used for grouped button sets where more than one button can be selected at once, such as the bold, italic and underline button group seen in word processors. To visually integrate multiple checkboxes into a grouped button set, the framework will automatically remove all margins between buttons and round only the top and bottom corners of the set if there is a <code> data-role="controlgroup"</code> attribute on the <code>fieldset</code>.</p>

		<div data-demo-html="true">
			<form>
				<fieldset data-role="controlgroup">
					<legend>Horizontal:</legend>
					<input type="checkbox" name="checkbox-h-2a" id="checkbox-h-2a">
					<label for="checkbox-h-2a">B</label>
					<input type="checkbox" name="checkbox-h-2b" id="checkbox-h-2b">
					<label for="checkbox-h-2b"><span style="font-style:italic;font-weight:normal;">I</span></label>
					<input type="checkbox" name="checkbox-h-2c" id="checkbox-h-2c">
					<label for="checkbox-h-2c"><span style="text-decoration:underline;font-weight:normal;">U</span></label>
				</fieldset>
			</form>
		</div><!--/demo-html -->

		<h2>Vertical group</h2>

		<p>To make a vertical button set, add <code>data-direction="vertical"</code> to the <code>fieldset</code>.</p>

		<div data-demo-html="true">
			<form>
				<fieldset data-role="controlgroup" data-direction="vertical">
					<legend>Vertical:</legend>
					<input type="checkbox" name="checkbox-v-2a" id="checkbox-v-2a">
					<label for="checkbox-v-2a">One</label>
					<input type="checkbox" name="checkbox-v-2b" id="checkbox-v-2b">
					<label for="checkbox-v-2b">Two</label>
					<input type="checkbox" name="checkbox-v-2c" id="checkbox-v-2c">
					<label for="checkbox-v-2c">Three</label>
				</fieldset>
			</form>
		</div><!--/demo-html -->

		<h2>Theme</h2>

		<p>To set the theme, add the <code>data-theme</code> attribute to the <code>fieldset</code> or to the individual checkbox inputs.</p>

		<div data-demo-html="true">
			<form>
				<fieldset data-role="controlgroup">
					<legend>Swatch B:</legend>
					<input type="checkbox" name="checkbox-t-2a" id="checkbox-t-2a" data-theme="b">
					<label for="checkbox-t-2a">One</label>
					<input type="checkbox" name="checkbox-t-2b" id="checkbox-t-2b" data-theme="b">
					<label for="checkbox-t-2b">Two</label>
					<input type="checkbox" name="checkbox-t-2c" id="checkbox-t-2c" data-theme="b">
					<label for="checkbox-t-2c">Three</label>
				</fieldset>
			</form>
		</div><!--/demo-html -->

		<h2>Disabled</h2>

		<div data-demo-html="true">
			<form>
				<input disabled type="checkbox" name="checkbox-t-3a" id="checkbox-t-3a" data-theme="a">
				<label for="checkbox-t-3a">One</label>
			</form>
		</div><!--/demo-html -->

		<h2>Enhanced</h2>

		<div data-demo-html="true">
			<form>
				<label class="ui-checkboxradio-label ui-corner-all ui-button ui-widget ui-button-inherit">
					<span class="ui-checkboxradio-icon ui-corner-all ui-icon ui-icon-background ui-icon-blank"></span>
					<span class="ui-checkboxradio-icon-space"> </span>
					<input type="checkbox" data-enhanced="true" name="checkbox-enhanced" class="ui-checkboxradio ui-helper-hidden-accessible">I agree
				</label>
			</form>
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
