<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Radio buttons - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
</head>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			<h1>Radio buttons <a href="http://api.jquerymobile.com/checkboxradio/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">Radio buttons are used to provide a list of options where only a single option can be selected.
			</p>

			<h2 id="radio-markup">Basic markup</h2>

			<p>To create a set of radio buttons, add an <code>input</code> with a <code>type="radio"</code> attribute and a corresponding <code>label</code>. Set the <code>for</code> attribute of the <code>label</code> to match the <code>id</code> of the <code>input</code> so they are semantically associated.</p>

			<div data-demo-html="true">
                <form>
					<label>
						<input type="radio" name="radio-choice-0" id="radio-choice-0a"/>One
					</label>

                    <label for="radio-choice-0b">Two</label>
                    <input type="radio" name="radio-choice-0" id="radio-choice-0b" class="custom" />
            	</form>
			</div><!--/demo-html -->

			<h2 id="radio-vert">Vertical group</h2>

			<p>To visually integrate multiple radio buttons into a vertically grouped button set, the framework will automatically remove all margins between buttons and round only the top and bottom corners of the set if there is a <code> data-role="controlgroup"</code> attribute on the container.</p>

			<div data-demo-html="true">
                <form>
                		<fieldset data-role="controlgroup">
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

			<h2 id="radio-horiz">Horizontal group</h2>

			<p>Radio buttons can also be used for grouped button sets where more than one button can be selected at once, such as the bold, italic and underline button group seen in word processors. To make a horizontal button set, add the <code> data-type="horizontal"</code> to the <code>fieldset</code>.</p>

			<div data-demo-html="true">
                <form>
					<fieldset data-role="controlgroup" data-type="horizontal">
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

		<h2 id="radio-mini">Mini size</h2>

			<p>For a more compact version that is useful in toolbars and tight spaces, add the <code>data-mini="true"</code> attribute to the element to create a mini version. </p>

			<div data-demo-html="true">
                <form>
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical, icon right, mini sized:</legend>
						<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6a" value="on" checked="checked">
						<label for="radio-choice-v-6a">One</label>
						<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6b" value="off">
						<label for="radio-choice-v-6b">Two</label>
						<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6c" value="other">
						<label for="radio-choice-v-6c">Three</label>
					</fieldset>
            	</form>
			</div><!--/demo-html -->

			<h2 id="radio-iconpos">Icon position</h2>

			<p>To swap the position of the radio icon from the default position on the left, add the <code>data-iconpos="right"</code> attribute to the fieldset to create a mini version. </p>

			<div data-demo-html="true">
                <form>
					<fieldset data-role="controlgroup" data-iconpos="right">
						<legend>Vertical, icon right, mini sized:</legend>
						<input type="radio" name="radio-choice-w-6" id="radio-choice-w-6a" value="on" checked="checked">
						<label for="radio-choice-w-6a">One</label>
						<input type="radio" name="radio-choice-w-6" id="radio-choice-w-6b" value="off">
						<label for="radio-choice-w-6b">Two</label>
						<input type="radio" name="radio-choice-w-6" id="radio-choice-w-6c" value="other">
						<label for="radio-choice-w-6c">Three</label>
					</fieldset>
            	</form>
			</div><!--/demo-html -->

			<h2 id="radio-theme">Theme</h2>

			<p>To set the theme, add the <code> data-theme</code> attribute each of the individual checkbox inputs.</p>

			<div data-demo-html="true">
                <form>
                	<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
						<legend>Horizontal, mini sized:</legend>
						<input type="radio" data-theme="a" name="radio-choice-t-6" id="radio-choice-t-6a" value="on" checked="checked">
						<label for="radio-choice-t-6a">One</label>
						<input type="radio" data-theme="a" name="radio-choice-t-6" id="radio-choice-t-6b" value="off">
						<label for="radio-choice-t-6b">Two</label>
						<input type="radio" data-theme="a" name="radio-choice-t-6" id="radio-choice-t-6c" value="other">
						<label for="radio-choice-t-6c">Three</label>
					</fieldset>
            	</form>
			</div><!--/demo-html -->

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
