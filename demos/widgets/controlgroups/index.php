<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Controlgroups - jQuery Mobile Demos</title>
	    <link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	    <link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	    <link rel="shortcut icon" href="../../favicon.ico">
	    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	    <script src="../../../js/jquery.js"></script>
	    <script src="../../_assets/js/"></script>
	    <script src="../../../js/"></script>
	    <style>
	        #demo-borders .ui-collapsible .ui-collapsible-heading .ui-btn { border-top-width: 1px !important; }
	    </style>
	</head>
	<body>
	<div data-role="page" class="jqm-demos" data-quicklinks="true">

	    <div data-role="header" class="jqm-header">
			<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
	        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
	        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
	        <?php include( '../../search.php' ); ?>
	    </div><!-- /header -->

	    <div data-role="content" class="jqm-content">

        <h1>Controlgroups <a href="http://api.jquerymobile.com/controlgroup/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

        <p class="jqm-intro">Controlgroups are used to visually group a set of buttons to form a single block that looks contained like a navigation component.
        </p>

		<h2>Controlgroup vertical</h2>

			<div data-demo-html="true">
				<div data-role="controlgroup">
					<a href="#" data-role="button">No icon</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="left">Left</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="right">Right</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="top">Top</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="bottom">Bottom</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="notext">Icon only</a>
				</div>
			</div><!--/demo-html -->

			<h3>Mini sized</h3>

			<div data-demo-html="true">
				<div data-role="controlgroup" data-mini="true">
					<a href="#" data-role="button" data-mini="true">No icon</a>
					<a href="#" data-role="button" data-icon="delete" data-mini="true" data-iconpos="left">Left</a>
					<a href="#" data-role="button" data-icon="delete" data-mini="true" data-iconpos="right">Right</a>
					<a href="#" data-role="button" data-icon="delete" data-mini="true" data-iconpos="top">Top</a>
					<a href="#" data-role="button" data-icon="delete" data-mini="true" data-iconpos="bottom">Bottom</a>
					<a href="#" data-role="button" data-icon="delete" data-mini="true" data-iconpos="notext">Icon only</a>
				</div>
			</div><!--/demo-html -->

			<h2>Controlgroup horizontal</h2>

			<div data-demo-html="true">
				<div data-role="controlgroup" data-type="horizontal">
					<a href="#" data-role="button">No icon</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="left">Left</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="right">Right</a>
				</div>
				<div data-role="controlgroup" data-type="horizontal">
					<a href="#" data-role="button" data-icon="delete" data-iconpos="top">Top</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="top">Top</a>
				</div>
				<div data-role="controlgroup" data-type="horizontal">
					<a href="#" data-role="button" data-icon="delete" data-iconpos="bottom">Bottom</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="bottom">Bottom</a>
				</div>
				<div data-role="controlgroup" data-type="horizontal">
					<a href="#" data-role="button" data-icon="delete" data-iconpos="notext">Icon only</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="notext">Icon only</a>
				</div>
				<form>
					<fieldset data-role="controlgroup" data-type="horizontal">
						<button data-icon="home">Home</button>
						<button data-icon="search" data-iconpos="notext">Search</button>
						<label for="select-more-1a" class="ui-hidden-accessible">More</label>
						<select name="select-more-1a" id="select-more-1a">
							<option value="">Select&hellip;</option>
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</form>
			</div><!--/demo-html -->

			<h2>Mini sized</h2>

			<div data-demo-html="true">
				<div data-role="controlgroup" data-type="horizontal" data-mini="true">
					<a href="#" data-role="button">No icon</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="left">Left</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="right">Right</a>
				</div>
				<div data-role="controlgroup" data-type="horizontal" data-mini="true">
					<a href="#" data-role="button" data-icon="delete" data-iconpos="top">Top</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="top">Top</a>
				</div>
				<div data-role="controlgroup" data-type="horizontal" data-mini="true">
					<a href="#" data-role="button" data-icon="delete" data-iconpos="bottom">Bottom</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="bottom">Bottom</a>
				</div>
				<div data-role="controlgroup" data-type="horizontal" data-mini="true">
					<a href="#" data-role="button" data-icon="delete" data-iconpos="notext">Icon only</a>
					<a href="#" data-role="button" data-icon="delete" data-iconpos="notext">Icon only</a>
				</div>
				<form>
					<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
						<button data-icon="home">Home</button>
						<button data-icon="search" data-iconpos="notext">Search</button>
						<label for="select-more-2a" class="ui-hidden-accessible">More</label>
						<select name="select-more-2a" id="select-more-2a">
							<option value="">Select&hellip;</option>
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
				</form>
			</div><!--/demo-html -->

				<h2>Radio button</h2>

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

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical, mini sized:</legend>
						<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6a" value="on" checked="checked">
						<label for="radio-choice-v-6a">One</label>
						<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6b" value="off">
						<label for="radio-choice-v-6b">Two</label>
						<input type="radio" name="radio-choice-v-6" id="radio-choice-v-6c" value="other">
						<label for="radio-choice-v-6c">Three</label>
					</fieldset>
					</form>
				</div><!--/demo-html -->

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

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
						<legend>Horizontal, mini sized:</legend>
						<input type="radio" name="radio-choice-h-6" id="radio-choice-h-6a" value="on" checked="checked">
						<label for="radio-choice-h-6a">One</label>
						<input type="radio" name="radio-choice-h-6" id="radio-choice-h-6b" value="off">
						<label for="radio-choice-h-6b">Two</label>
						<input type="radio" name="radio-choice-h-6" id="radio-choice-h-6c" value="other">
						<label for="radio-choice-h-6c">Three</label>
					</fieldset>
					</form>
				</div><!--/demo-html -->

				<h2>Checkbox</h2>

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup">
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

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical, mini sized:</legend>
						<input type="checkbox" name="checkbox-v-6a" id="checkbox-v-6a">
						<label for="checkbox-v-6a">One</label>
						<input type="checkbox" name="checkbox-v-6b" id="checkbox-v-6b">
						<label for="checkbox-v-6b">Two</label>
						<input type="checkbox" name="checkbox-v-6c" id="checkbox-v-6c">
						<label for="checkbox-v-6c">Three</label>
					</fieldset>
					</form>
				</div><!--/demo-html -->

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-type="horizontal">
						<legend>Horizontal:</legend>
						<input type="checkbox" name="checkbox-h-2a" id="checkbox-h-2a">
						<label for="checkbox-h-2a">One</label>
						<input type="checkbox" name="checkbox-h-2b" id="checkbox-h-2b">
						<label for="checkbox-h-2b">Two</label>
						<input type="checkbox" name="checkbox-h-2c" id="checkbox-h-2c">
						<label for="checkbox-h-2c">Three</label>
					</fieldset>
					</form>
				</div><!--/demo-html -->

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
						<legend>Horizontal, mini sized:</legend>
						<input type="checkbox" name="checkbox-h-6a" id="checkbox-h-6a">
						<label for="checkbox-h-6a">One</label>
						<input type="checkbox" name="checkbox-h-6b" id="checkbox-h-6b">
						<label for="checkbox-h-6b">Two</label>
						<input type="checkbox" name="checkbox-h-6c" id="checkbox-h-6c">
						<label for="checkbox-h-6c">Three</label>
					</fieldset>
					</form>
				</div><!--/demo-html -->

				<h2>Selects</h2>

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup">
						<legend>Vertical:</legend>
						<label for="select-v-2a">Select A</label>
						<select name="select-v-2a" id="select-v-2a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-2b">Select B</label>
						<select name="select-v-2b" id="select-v-2b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-2c">Select C</label>
						<select name="select-v-2c" id="select-v-2c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
					</form>
				</div><!--/demo-html -->

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-mini="true">
						<legend>Vertical, mini sized:</legend>
						<label for="select-v-6a">Select A</label>
						<select name="select-v-6a" id="select-v-6a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-6b">Select B</label>
						<select name="select-v-6b" id="select-v-6b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-v-6c">Select C</label>
						<select name="select-v-6c" id="select-v-6c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
					</form>
				</div><!--/demo-html -->

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-type="horizontal">
						<legend>Horizontal:</legend>
						<label for="select-h-2a">Select A</label>
						<select name="select-h-2a" id="select-h-2a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-2b">Select B</label>
						<select name="select-h-2b" id="select-h-2b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-2c">Select C</label>
						<select name="select-h-2c" id="select-h-2c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
					</fieldset>
					</form>
				</div><!--/demo-html -->

				<div data-demo-html="true">
					<form>
					<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
						<legend>Horizontal, mini sized:</legend>
						<label for="select-h-6a">Select A</label>
						<select name="select-h-6a" id="select-h-6a">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-6b">Select B</label>
						<select name="select-h-6b" id="select-h-6b">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
						<label for="select-h-6c">Select C</label>
						<select name="select-h-6c" id="select-h-6c">
							<option value="#">One</option>
							<option value="#">Two</option>
							<option value="#">Three</option>
						</select>
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
