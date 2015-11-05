<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Radio buttons - jQuery Mobile Demos</title>
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

		<h1>Radio buttons</h1>

		<a href="http://api.jquerymobile.com/checkboxradio/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>Radio inputs are used to provide a list of options where only a single option can be selected. Radio buttons are enhanced by the checkboxradio widget.</p>

		<h2>Basic markup</h2>

		<p>To create a set of radio buttons, add an <code>input</code> with a <code>type="radio"</code> attribute and a corresponding <code>label</code>. Set the <code>for</code> attribute of the <code>label</code> to match the <code>id</code> of the <code>input</code> so they are semantically associated.</p>

		<div data-demo-html="true">
			<form>
				<label>
					<input type="radio" name="radio-choice-0" id="radio-choice-0a">One
				</label>

				<label for="radio-choice-0b">Two</label>
				<input type="radio" name="radio-choice-0" id="radio-choice-0b" class="custom">
			</form>
		</div><!--/demo-html -->

		<h2>Horizontal group</h2>

		<p>To visually integrate multiple radio buttons into a horizontally grouped button set, the framework will automatically remove all margins between buttons and round only the top and bottom corners of the set if there is a <code>data-role="controlgroup"</code> attribute on the container.</p>

		<div data-demo-html="true">
			<form>
				<fieldset data-role="controlgroup">
					<legend>Horizontal:</legend>
					<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2a" value="on" checked="checked">
					<label for="radio-choice-h-2a">One</label>
					<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2b" value="off">
					<label for="radio-choice-h-2b">Two</label>
					<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2c" value="other">
					<label for="radio-choice-h-2c">Three</label>
				</fieldset>
			</form>
		</div><!--/demo-html -->

		<h2>Vertical group</h2>

		<p>To make a vertical button set, add the <code>data-direction="vertical"</code> to the <code>fieldset</code>.</p>

		<div data-demo-html="true">
			<form>
					<fieldset data-role="controlgroup" data-direction="vertical">
					<legend>Vertical:</legend>
					<input type="radio" name="radio-choice-v-2" id="radio-choice-v-2a" value="on" checked="checked">
					<label for="radio-choice-v-2a">One</label>
					<input type="radio" name="radio-choice-v-2" id="radio-choice-v-2b" value="off">
					<label for="radio-choice-v-2b">Two</label>
					<input type="radio" name="radio-choice-v-2" id="radio-choice-v-2c" value="other">
					<label for="radio-choice-v-2c">Three</label>
				</fieldset>
			</form>
		</div><!--/demo-html -->

		<h2>Mini size</h2>

		<p>For a more compact version that is useful in toolbars and tight spaces, add the <code>data-mini="true"</code> attribute to the controlgroup to create a mini version.</p>

		<div data-demo-html="true">
			<form>
				<fieldset data-role="controlgroup" data-mini="true">
					<legend>Mini sized:</legend>
					<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6a" value="on" checked="checked">
					<label for="radio-choice-v-6a">One</label>
					<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6b" value="off">
					<label for="radio-choice-v-6b">Two</label>
					<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6c" value="other">
					<label for="radio-choice-v-6c">Three</label>
				</fieldset>
			</form>
		</div><!--/demo-html -->

		<h2>Theme</h2>

		<p>To set the theme, add the <code>data-theme</code> attribute to the controlgroup or each of the individual radio inputs.</p>

		<div data-demo-html="true">
			<form>
				<fieldset data-role="controlgroup" data-theme="b">
					<legend>Horizontal:</legend>
					<input type="radio" name="radio-choice-t-6" id="radio-choice-t-6a" value="on" checked="checked">
					<label for="radio-choice-t-6a">One</label>
					<input type="radio" name="radio-choice-t-6" id="radio-choice-t-6b" value="off">
					<label for="radio-choice-t-6b">Two</label>
					<input type="radio" name="radio-choice-t-6" id="radio-choice-t-6c" value="other">
					<label for="radio-choice-t-6c">Three</label>
				</fieldset>
			</form>
		</div><!--/demo-html -->

		<h2>Disabled</h2>

		<div data-demo-html="true">
			<form>
				<label>
					<input type="radio" name="radio-choice-7" id="radio-choice-7a" disabled="disabled">One
				</label>
				<label for="radio-choice-7b">Two</label>
				<input type="radio" name="radio-choice-7" id="radio-choice-7b" disabled="disabled">
			</form>
		</div><!--/demo-html -->

		<h2>Enhanced</h2>

		<div data-demo-html="true">
			<div class="ui-radio">
				<label for="radio-enhanced" class="ui-button ui-corner-all ui-button-inherit ui-radio-off">I agree</label>
				<input type="radio" name="radio-enhanced" id="radio-enhanced" data-enhanced="true">
			</div>
		</div><!--/demo-html -->

		<div data-demo-html="true">
			<form>
				<label class="ui-radio-label ui-corner-all ui-button ui-widget ui-button-inherit">
					<span class="ui-checkboxradio-icon ui-corner-all ui-icon ui-icon-background ui-icon-blank"></span>
					<span class="ui-checkboxradio-icon-space"> </span>
					<input type="radio" data-enhanced="true" name="radio-enhanced" class="ui-checkboxradio ui-helper-hidden-accessible">I agree
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
