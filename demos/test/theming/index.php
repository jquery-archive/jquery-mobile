<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Theme inheritance - jQuery Mobile Tests</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<script src="../../../js/jquery.js"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" id="testpage">

	<div data-role="header">
		<h1>Theme A</h1>
		<a href="../../" data-role="button" data-rel="back" data-icon="back" data-iconpos="notext">Back</a>
		<a href="#" data-role="button" data-icon="gear">Button</a>
	</div><!-- /header -->

	<div data-role="content">

		<div class="ui-body ui-body-a ui-body-inherit ui-corner-all">
			<p>I am a div with classes ui-body, ui-body-a and ui-corner-all.</p>
			<p><a href="#">I am a link</a></p>
		</div>
		
		<div class="ui-bar ui-bar-a ui-corner-all">
			<p>I am a div with classes ui-bar, ui-bar-a and ui-corner-all. <a href="#">I am a link</a></p>
		</div>
				
		<a href="#" data-role="button" data-inline="true" data-icon="arrow-r" data-iconpos="right">We</a>
		<button data-inline="true" data-icon="arrow-r" data-iconpos="right">are</button>
		<input type="button" value="buttons" data-inline="true" data-icon="arrow-r" data-iconpos="right">

		<ul data-role="listview" data-inset="true">
			<li>I</li>
			<li data-role="list-divider">Divider<span class="ui-li-count">3</span></li>
			<li>am</li>
			<li>static<span class="ui-li-count">6</span></li>
		</ul>

		<ul data-role="listview" data-inset="true">
			<li><a href="#">We</a></li>
			<li data-role="list-divider">Divider</li>
			<li><a href="#">have<span class="ui-li-count">4</span></a></li>
			<li><a href="#">links</a></li>
		</ul>
		
		<ul data-role="listview" data-split-icon="gear" data-inset="true">
			<li><a href="#">
				<img src="../../_assets/img/album-bb.jpg" />
				<h2>Broken Bells</h2>
				<p>Broken Bells</p></a>
				<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
			</li>
			<li><a href="#">
				<img src="../../_assets/img/album-hc.jpg" />
				<h2>Warning</h2>
				<p>Hot Chip</p></a>
				<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
			</li>
			<li><a href="#">
				<img src="../../_assets/img/album-bb.jpg" />
				<h2>Wolfgang Amadeus Phoenix</h2>
				<p>Phoenix</p></a>
				<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
			</li>
		</ul>
		
		<form>
			<div data-role="fieldcontain">
				<label for="name2">Text Input:</label>
				<input type="text" name="name2" id="name2" value="" data-clear-btn="true">
			</div>
			<div data-role="fieldcontain">
				<label for="textarea2">Textarea:</label>
				<textarea cols="40" rows="8" name="textarea2" id="textarea2"></textarea>
			</div>
			<div data-role="fieldcontain">
				<label for="flip2">Flip switch:</label>
				<select name="flip2" id="flip2" data-role="slider">
					<option value="off">Off</option>
					<option value="on">On</option>
				</select>
			</div>
			<div data-role="fieldcontain">
				<label for="slider2">Slider:</label>
				<input type="range" name="slider2" id="slider2" value="0" min="0" max="100" data-highlight="true">
			</div>
			<div data-role="fieldcontain">
				<fieldset data-role="controlgroup">
					<legend>Checkbox:</legend>
					<input type="checkbox" name="checkbox-v-1a" id="checkbox-v-1a">
					<label for="checkbox-v-1a">One</label>
					<input type="checkbox" name="checkbox-v-1b" id="checkbox-v-1b">
					<label for="checkbox-v-1b">Two</label>
					<input type="checkbox" name="checkbox-v-1c" id="checkbox-v-1c">
					<label for="checkbox-v-1c">Three</label>
				</fieldset>
			</div>
			<div data-role="fieldcontain">
				<fieldset data-role="controlgroup" data-type="horizontal">
					<legend>Controlgroup:</legend>
					<button data-icon="home" data-iconpos="right">One</button>
					<input type="button" data-icon="back" data-iconpos="right" value="Two">
					<a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
				</fieldset>
			</div>
			<div data-role="fieldcontain">
				<label for="select-choice-1" class="select">Custom select:</label>
				<select name="select-choice-1" id="select-choice-1" data-native-menu="false" multiple="multiple">
					<option value="standard">Standard: 7 day</option>
					<option value="rush">Rush: 3 days</option>
					<option value="express">Express: next day</option>
					<option value="overnight">Overnight</option>
				</select>
			</div>
			<div data-role="fieldcontain">
				<label for="submit-1">Send form:</label>
				<input type="submit" id="submit-1" value="Send">
			</div>
		</form>
		
		
		<a href="#" data-role="button" data-icon="gear" class="ui-btn-active">Active button</a>
		
		<form>
			<ul data-role="listview" data-inset="true">
				<li data-role="fieldcontain">
					<label for="name3">Text Input:</label>
					<input type="text" name="name3" id="name3" value="" data-clear-btn="true">
				</li>
				<li data-role="fieldcontain">
					<label for="flip3">Flip switch:</label>
					<select name="flip3" id="flip3" data-role="slider">
						<option value="off">Off</option>
						<option value="on">On</option>
					</select>
				</li>
				<li data-role="fieldcontain">
					<label for="slider3">Slider:</label>
					<input type="range" name="slider3" id="slider3" value="0" min="0" max="100" data-highlight="true">
				</li>
			</ul>
		</form>

		<div class="ui-bar ui-bar-inherit">
			<p>Bar</p>
			<div data-role="fieldcontain">
				<label for="name4">Text Input:</label>
				<input type="text" name="name4" id="name4" value="" data-clear-btn="true">
			</div>
			<div data-role="fieldcontain">
				<label for="flip4">Flip switch:</label>
				<select name="flip4" id="flip4" data-role="slider">
					<option value="off">Off</option>
					<option value="on">On</option>
				</select>
			</div>
			<div data-role="fieldcontain">
				<label for="slider4">Slider:</label>
				<input type="range" name="slider4" id="slider4" value="0" min="0" max="100" data-highlight="true">
			</div>
		</div>

		<div data-role="collapsible" data-content-theme="a">
			<h4>Heading</h4>
			<p>I'm the collapsible content with a themed content block set to "a".</p>
		</div>
		
		<div data-role="collapsible-set" data-content-theme="a">
			<div data-role="collapsible">
				<h3>Section 1</h3>
				<p>I'm the collapsible content for section 1</p>
			</div>
			<div data-role="collapsible">
				<h3>Section 2</h3>
				<p>I'm the collapsible content for section 2</p>
			</div>
			<div data-role="collapsible">
				<h3>Section 3</h3>
				<p>I'm the collapsible content for section 3</p>
			</div>
		</div>
		
	</div><!-- /content -->

</div><!-- /page -->
</body>
</html>
