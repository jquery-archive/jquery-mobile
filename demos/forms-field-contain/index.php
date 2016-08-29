<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Field containers - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Field containers</h1>

		<p>Add class <code>ui-field-contain</code> to a wrapper of a form widget and its <code>label</code>.</p>

		<p><strong>Note:</strong> <code>data-role="fieldcontain"</code> has been deprecated in 1.4 and will be removed in 1.5.</p>

		<form action="#" method="get">

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="textinput-1">Text Input:</label>
					<input type="text" name="textinput-1" id="textinput-1" placeholder="Text input" value="">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="search-1">Search Input:</label>
					<input type="search" name="search-1" id="search-1" value="">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="textarea-1">Textarea:</label>
					<textarea cols="40" rows="8" name="textarea-1" id="textarea-1">Textarea</textarea>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="checkbox-a">Checkbox:</label>
					<input type="checkbox" name="checkbox-a" id="checkbox-a">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<legend>Checkbox legend:</legend>
					<label for="checkbox-b">Checkbox with legend</label>
					<input type="checkbox" name="checkbox-b" id="checkbox-b">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<button>Button</button>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="select-native-1">Native select:</label>
					<select name="select-native-1" id="select-native-1">
						<option value="small">One</option>
						<option value="medium">Two</option>
						<option value="large">Three</option>
					</select>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="select-multiple-1">Custom multiple select:</label>
					<select multiple="multiple" data-native-menu="false" name="select-multiple-1" id="select-multiple-1">
						<option value="">Choices:</option>
						<option value="small">One</option>
						<option value="medium">Two</option>
						<option value="large">Three</option>
					</select>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup">
						<legend>Vertical controlgroup, buttons:</legend>
						<button class="ui-shadow ui-button">One <span class="ui-icon ui-icon-home"></span></button>
						<input type="button" value="Two">
						<a href="#">Three <span class="ui-icon ui-icon-grid"></span></a>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<legend>Horizontal controlgroup, buttons:</legend>
						<button class="ui-shadow ui-button">One <span class="ui-icon ui-icon-home"></span></button>
						<input type="button" value="Two">
						<a href="#">Three <span class="ui-icon ui-icon-grid"></span></a>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup">
						<legend>Vertical controlgroup, select:</legend>
						<label for="select-v-1a" class="ui-hidden-accessible">Select A</label>
						<select name="select-v-1a" id="select-v-1a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-1b" class="ui-hidden-accessible">Select B</label>
						<select name="select-v-1b" id="select-v-1b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-1c" class="ui-hidden-accessible">Select C</label>
						<select name="select-v-1c" id="select-v-1c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<legend>Horizontal controlgroup, select:</legend>
						<label for="select-h-1a" class="ui-hidden-accessible">Select A</label>
						<select name="select-h-1a" id="select-h-1a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-1b" class="ui-hidden-accessible">Select B</label>
						<select name="select-h-1b" id="select-h-1b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-1c" class="ui-hidden-accessible">Select C</label>
						<select name="select-h-1c" id="select-h-1c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<legend>Horizontal controlgroup, mixed:</legend>
						<a href="#">Link <span class="ui-icon ui-icon-arrow-r"></span></a>
						<button class="ui-shadow ui-button ui-button-icon-only">Button <span class="ui-icon ui-icon-grid"></span></button>
						<label for="select-v-1e" class="ui-hidden-accessible">Select</label>
						<select name="select-v-1e" id="select-v-1e">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="slider-1">Slider:</label>
					<input type="range" name="slider-1" id="slider-1" value="50" min="0" max="100" data-highlight="true">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="flip-1">Flip toggle:</label>
					<select name="flip-1" id="flip-1" data-role="flipswitch">
						<option value="off">Off</option>
						<option value="on">On</option>
					</select>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup">
						<legend>Single checkbox:</legend>
						<label for="checkbox-1">I agree</label>
						<input type="checkbox" name="checkbox-1" id="checkbox-1">
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup">
						<legend>Vertical controlgroup, checkbox:</legend>
						<input type="checkbox" name="checkbox-v-1a" id="checkbox-v-1a">
						<label for="checkbox-v-1a">One</label>
						<input type="checkbox" name="checkbox-v-1b" id="checkbox-v-1b">
						<label for="checkbox-v-1b">Two</label>
						<input type="checkbox" name="checkbox-v-1c" id="checkbox-v-1c">
						<label for="checkbox-v-1c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup">
						<legend>Vertical controlgroup, radio:</legend>
						<input type="radio" name="radio-choice-v-1" id="radio-choice-v-1a" value="on" checked="checked">
						<label for="radio-choice-v-1a">One</label>
						<input type="radio" name="radio-choice-v-1" id="radio-choice-v-1b" value="off">
						<label for="radio-choice-v-1b">Two</label>
						<input type="radio" name="radio-choice-v-1" id="radio-choice-v-1c" value="other">
						<label for="radio-choice-v-1c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<legend>Horizontal controlgroup, checkbox:</legend>
						<input type="checkbox" name="checkbox-h-1a" id="checkbox-h-1a">
						<label for="checkbox-h-1a">One</label>
						<input type="checkbox" name="checkbox-h-1b" id="checkbox-h-1b">
						<label for="checkbox-h-1b">Two</label>
						<input type="checkbox" name="checkbox-h-1c" id="checkbox-h-1c">
						<label for="checkbox-h-1c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal">
						<legend>Horizontal controlgroup, radio:</legend>
						<input type="radio" name="radio-choice-h-1" id="radio-choice-h-1a" value="on" checked="checked">
						<label for="radio-choice-h-1a">One</label>
						<input type="radio" name="radio-choice-h-1" id="radio-choice-h-1b" value="off">
						<label for="radio-choice-h-1b">Two</label>
						<input type="radio" name="radio-choice-h-1" id="radio-choice-h-1c" value="other">
						<label for="radio-choice-h-1c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="submit-1">Send:</label>
					<button type="submit" id="submit-1" class="ui-shadow ui-button ui-corner-all">Submit</button>
				</div>
			</div><!--/demo-html -->

		</form>

		<h2>Mini sized</h2>

		<form action="#" method="get">

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="textinput-5">Text Input:</label>
					<input type="text" name="textinput-5" id="textinput-5" placeholder="Text input" value="" data-mini="true">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="search-5">Search Input:</label>
					<input type="search" name="search-5" id="search-5" value="" data-mini="true">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="textarea-5">Textarea:</label>
					<textarea cols="40" rows="8" name="textarea-5" id="textarea-5" data-mini="true">Textarea</textarea>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="select-native-5">Native select:</label>
					<select name="select-native-5" id="select-native-5" data-mini="true">
						<option value="small">One</option>
						<option value="medium">Two</option>
						<option value="large">Three</option>
					</select>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="select-multiple-5">Custom multiple select:</label>
					<select multiple="multiple" data-native-menu="false" name="select-multiple-5" id="select-multiple-5" data-mini="true">
						<option value="">Choices:</option>
						<option value="small">One</option>
						<option value="medium">Two</option>
						<option value="large">Three</option>
					</select>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical controlgroup, buttons:</legend>
						<button class="ui-shadow ui-button">One <span class="ui-icon ui-icon-home"></span></button>
						<input type="button" value="Two">
						<a href="#" class="ui-shadow ui-button">Three <span class="ui-icon ui-icon-grid"></span></a>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
						<legend>Horizontal controlgroup, buttons:</legend>
						<button class="ui-shadow ui-button">One <span class="ui-icon ui-icon-home"></span></button>
						<input type="button" value="Two">
						<a href="#" class="ui-shadow ui-button">Three <span class="ui-icon ui-icon-grid"></span></a>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical controlgroup, select:</legend>
						<label for="select-v-5a" class="ui-hidden-accessible">Select A</label>
						<select name="select-v-5a" id="select-v-5a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-5b" class="ui-hidden-accessible">Select B</label>
						<select name="select-v-5b" id="select-v-5b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-5c" class="ui-hidden-accessible">Select C</label>
						<select name="select-v-5c" id="select-v-5c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
						<legend>Horizontal controlgroup, select:</legend>
						<label for="select-h-5a" class="ui-hidden-accessible">Select A</label>
						<select name="select-h-5a" id="select-h-5a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-5b" class="ui-hidden-accessible">Select B</label>
						<select name="select-h-5b" id="select-h-5b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-5c" class="ui-hidden-accessible">Select C</label>
						<select name="select-h-5c" id="select-h-5c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
						<legend>Horizontal controlgroup, mixed:</legend>
						<a href="#">Link <span class="ui-icon ui-icon-arrow-r"></span></a>
						<button class="ui-shadow ui-button ui-button-icon-only">Button <span class="ui-icon ui-icon-grid"></span></button>
						<label for="select-v-5e" class="ui-hidden-accessible">Select</label>
						<select name="select-v-5e" id="select-v-5e">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="slider-5">Slider:</label>
					<input type="range" name="slider-5" id="slider-5" value="50" min="0" max="100" data-highlight="true" data-mini="true">
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="flip-5">Flip toggle:</label>
					<select name="flip-5" id="flip-5" data-role="flipswitch" data-mini="true">
						<option value="off">Off</option>
						<option value="on">On</option>
					</select>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Single checkbox:</legend>
						<label for="checkbox-5">I agree</label>
						<input type="checkbox" name="checkbox-5" id="checkbox-5">
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical controlgroup, checkbox:</legend>
						<input type="checkbox" name="checkbox-v-5a" id="checkbox-v-5a">
						<label for="checkbox-v-5a">One</label>
						<input type="checkbox" name="checkbox-v-5b" id="checkbox-v-5b">
						<label for="checkbox-v-5b">Two</label>
						<input type="checkbox" name="checkbox-v-5c" id="checkbox-v-5c">
						<label for="checkbox-v-5c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical controlgroup, radio:</legend>
						<input type="radio" name="radio-choice-v-5" id="radio-choice-v-5a" value="on" checked="checked">
						<label for="radio-choice-v-5a">One</label>
						<input type="radio" name="radio-choice-v-5" id="radio-choice-v-5b" value="off">
						<label for="radio-choice-v-5b">Two</label>
						<input type="radio" name="radio-choice-v-5" id="radio-choice-v-5c" value="other">
						<label for="radio-choice-v-5c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
						<legend>Horizontal controlgroup, checkbox:</legend>
						<input type="checkbox" name="checkbox-h-5a" id="checkbox-h-5a">
						<label for="checkbox-h-5a">One</label>
						<input type="checkbox" name="checkbox-h-5b" id="checkbox-h-5b">
						<label for="checkbox-h-5b">Two</label>
						<input type="checkbox" name="checkbox-h-5c" id="checkbox-h-5c">
						<label for="checkbox-h-5c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
						<legend>Horizontal controlgroup, radio:</legend>
						<input type="radio" name="radio-choice-h-5" id="radio-choice-h-5a" value="on" checked="checked">
						<label for="radio-choice-h-5a">One</label>
						<input type="radio" name="radio-choice-h-5" id="radio-choice-h-5b" value="off">
						<label for="radio-choice-h-5b">Two</label>
						<input type="radio" name="radio-choice-h-5" id="radio-choice-h-5c" value="other">
						<label for="radio-choice-h-5c">Three</label>
					</fieldset>
				</div>
			</div><!--/demo-html -->

			<div data-demo-html="true">
				<div class="ui-field-contain">
					<label for="submit-5">Send:</label>
					<button type="submit" id="submit-5" class="ui-shadow ui-button ui-corner-all ui-mini">Submit</button>
				</div>
			</div><!--/demo-html -->

		</form>

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
