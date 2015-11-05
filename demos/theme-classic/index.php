<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Classic theme - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.icons.css">
	<link rel="stylesheet" href="theme-classic.css">
	<link rel="stylesheet" href="../../css/structure/jquery.mobile.structure.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../../js/"></script>
	<script>
		$( document ).on( "pagecreate", function() {
			$( "#theme-selector input" ).on( "change", function( event ) {
				var themeClass = $( "#theme-selector input:checked" ).attr( "id" );

				$( "#testpage" ).removeClass( "ui-page-theme-a ui-page-theme-b ui-page-theme-c ui-page-theme-d ui-page-theme-e" ).addClass( "ui-page-theme-" + themeClass );
				$( "#ui-body-test" ).removeClass( "ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e" ).addClass( "ui-body-" + themeClass );
				$( "#ui-bar-test, #ui-bar-form" ).removeClass( "ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e" ).addClass( "ui-bar-" + themeClass );
				$( ".ui-collapsible-content" ).removeClass( "ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e" ).addClass( "ui-body-" + themeClass );
				$( ".theme" ).text( themeClass );
			});
			$( "#opt-navbars input" ).on( "change", function( event ) {
				if ( $( "#show" ).prop( "checked" ) ) {
					$( "#testpage .ui-navbar" ).show();
					$( "#testpage .ui-footer h4" ).hide();
				} else if ( $( "#hide" ).prop( "checked" ) ) {
					$( "#testpage .ui-navbar" ).hide();
					$( "#testpage .ui-footer h4" ).show();
				}
			});
			$( "#opt-shadow input" ).on( "change", function( event ) {
				if ( $( "#on" ).prop( "checked" ) ) {
					$( "#testpage" ).removeClass( "noshadow" );
				} else if ( $( "#off" ).prop( "checked" ) ) {
					$( "#testpage" ).addClass( "noshadow" );
				}
			});
			$( "#opt-iconshadow input" ).on( "change", function( event ) {
				if ( $( "#off1" ).prop( "checked" ) ) {
					$( "#testpage" ).removeClass( "ui-shadow-icon" );
				} else if ( $( "#on1" ).prop( "checked" ) ) {
					$( "#testpage" ).addClass( "ui-shadow-icon" );
				}
			});
			$( "#opt-gradient input" ).on( "change", function( event ) {
				if ( $( "#off2" ).prop( "checked" ) ) {
					$( "#testpage" ).addClass( "nogradient" );
				} else if ( $( "#on2" ).prop( "checked" ) ) {
					$( "#testpage" ).removeClass( "nogradient" );
				}
			});
			$( "#opt-highlight input" ).on( "change", function( event ) {
				if ( $( "#off3" ).prop( "checked" ) ) {
					$( "#testpage" ).addClass( "nohighlight" );
				} else if ( $( "#on3" ).prop( "checked" ) ) {
					$( "#testpage" ).removeClass( "nohighlight" );
				}
			});
		});
	</script>
	<style>
		.noshadow * {
			-webkit-box-shadow: none !important;
			-moz-box-shadow: none !important;
			box-shadow: none !important;
		}
		.nogradient,
		.nogradient * {
			background-image: none !important;
		}
		.nohighlight .ui-button:before {
			display: none !important;
		}
		form.ui-mini .ui-field-contain fieldset.ui-controlgroup legend small {
			color: #666;
		}
	</style>
</head>
<body>
<div data-role="page" id="testpage">

	<div data-role="toolbar" data-type="header">
		<h1>Classic theme</h1>
		<a href="#" data-rel="back" class="ui-button ui-corner-all ui-shadow ui-button-icon-only">Back <span class="ui-icon ui-icon-back"></span></a>
		<a href="#" class="ui-button ui-corner-all ui-shadow">Button <span class="ui-icon ui-icon-gear"></span></a>
		<div data-role="navbar">
			<ul>
				<li><a href="#" class="ui-button-active ui-state-persist">Menu item 1</a></li>
				<li><a href="#">Menu item 2</a></li>
				<li><a href="#">Menu item 3</a></li>
			</ul>
		</div>
	</div><!-- /header -->

	<div class="ui-content" role="main">

		<p>This "classic" theme mimics the old jQuery Mobile default theme. IMPORTANT: This classic theme is only a demo and not a supported feature. Issues or ThemeRoller incompatibility might not be fixed, this theme is not available on the CDN, and this demo can be removed at any time.</p>

		<p><a href="theme-classic.css" target="_blank">Open the classic theme CSS file in a new tab</a></p>

		<form class="ui-mini">
			<div class="ui-field-contain" id="theme-selector">
				<fieldset data-role="controlgroup">
					<legend>Theme:</legend>
					<label for="a">A</label>
					<input type="radio" name="theme" id="a" checked>
					<label for="b">B</label>
					<input type="radio" name="theme" id="b">
					<label for="c">C</label>
					<input type="radio" name="theme" id="c">
					<label for="d">D</label>
					<input type="radio" name="theme" id="d">
					<label for="e">E</label>
					<input type="radio" name="theme" id="e">
				</fieldset>
			</div>
			<div class="ui-field-contain" id="opt-navbars">
				<fieldset data-role="controlgroup">
					<legend>Navbars:</legend>
					<label for="show">Show</label>
					<input type="radio" name="navbars" id="show" checked>
					<label for="hide">Hide</label>
					<input type="radio" name="navbars" id="hide">
				</fieldset>
			</div>
			<div class="ui-field-contain" id="opt-shadow">
				<fieldset data-role="controlgroup">
					<legend>Shadow:<br><small>Off: set the widget option shadow to false (data-shadow="false")</small></legend>
					<label for="on">On</label>
					<input type="radio" name="shadow" id="on" checked>
					<label for="off">Off</label>
					<input type="radio" name="shadow" id="off">
				</fieldset>
			</div>
			<div class="ui-field-contain" id="opt-iconshadow">
				<fieldset data-role="controlgroup">
					<legend>Icon shadow:<br><small>On: add class ui-shadow-icon to the button or its container</small></legend>
					<label for="on1">On</label>
					<input type="radio" name="iconshadow" id="on1">
					<label for="off1">Off</label>
					<input type="radio" name="iconshadow" id="off1" checked>
				</fieldset>
			</div>
			<div class="ui-field-contain" id="opt-gradient">
				<fieldset data-role="controlgroup">
					<legend>Gradient:<br><small>Off: remove background-image rules from classic theme CSS</small></legend>
					<label for="on2">On</label>
					<input type="radio" name="gradient" id="on2" checked>
					<label for="off2">Off</label>
					<input type="radio" name="gradient" id="off2">
				</fieldset>
			</div>
			<div class="ui-field-contain" id="opt-highlight">
				<fieldset data-role="controlgroup">
					<legend>Highlight:<br><small>Off: remove .ui-button:before rule from classic theme CSS</small></legend>
					<label for="on3">On</label>
					<input type="radio" name="highlight" id="on3" checked>
					<label for="off3">Off</label>
					<input type="radio" name="highlight" id="off3">
				</fieldset>
			</div>
		</form>

		<div id="ui-body-test" class="ui-body ui-body-a ui-corner-all" style="margin-bottom:1em;">
		<p>I am a div with classes ui-body, ui-body-<span class="theme">a</span> and ui-corner-all.</p>
		<p><a href="#">I am a link</a></p>
			<h4>Panels</h4>
			<a href="#panel-reveal" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-mini">Reveal</a>
			<a href="#panel-overlay" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-mini">Overlay</a>
			<a href="#panel-push" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-mini">Push</a>
		</div>

		<div id="ui-bar-test" class="ui-bar ui-bar-a ui-corner-all" style="margin-bottom:1em;">
		<p>I am a div with classes ui-bar, ui-bar-<span class="theme">a</span> and ui-corner-all. <a href="#">I am a link</a></p>
		</div>

		<a href="#" class="ui-button ui-corner-all ui-shadow ui-button-inline">We <span class="ui-icon ui-icon-caret-r"></span></a>
		<button class="ui-button ui-corner-all ui-shadow ui-button-inline">are <span class="ui-icon ui-icon-caret-r"></span></button>
		<input type="button" value="buttons" data-inline="true" data-icon="caret-r" data-iconpos="right">

		<ul data-role="listview" data-inset="true" data-counttheme="c">
			<li>I</li>
			<li data-role="list-divider" data-theme="b">Divider<span class="ui-listview-item-count-bubble">3</span></li>
			<li>am</li>
			<li>static<span class="ui-listview-item-count-bubble">6</span></li>
		</ul>

		<ul data-role="listview" data-inset="true" data-counttheme="c">
			<li><a href="#">We</a></li>
			<li data-role="list-divider" data-theme="b">Divider</li>
			<li><a href="#">have<span class="ui-listview-item-count-bubble">4</span></a></li>
			<li><a href="#">links</a></li>
		</ul>

		<ul data-role="listview" data-split-icon="gear" data-inset="true">
			<li><a href="#">
				<img src="../_assets/img/album-bb.jpg">
			<h2>Broken Bells</h2>
			<p>Broken Bells</p></a>
				<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
			</li>
			<li><a href="#">
				<img src="../_assets/img/album-hc.jpg">
			<h2>Warning</h2>
			<p>Hot Chip</p></a>
				<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
			</li>
			<li><a href="#">
				<img src="../_assets/img/album-bb.jpg">
			<h2>Wolfgang Amadeus Phoenix</h2>
			<p>Phoenix</p></a>
				<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
			</li>
		</ul>

		<form>
			<div class="ui-field-contain">
				<label for="name2">Text Input:</label>
				<input type="text" name="name2" id="name2" value="" data-clear-button="true">
			</div>
			<div class="ui-field-contain">
				<label for="textarea2">Textarea:</label>
				<textarea cols="40" rows="8" name="textarea2" id="textarea2"></textarea>
			</div>
			<div class="ui-field-contain">
				<label for="flip2">Flip switch:</label>
				<select name="flip2" id="flip2" data-role="flipswitch">
					<option value="off">Off</option>
					<option value="on">On</option>
				</select>
			</div>
			<div class="ui-field-contain">
				<label for="slider2">Slider:</label>
				<input type="range" name="slider2" id="slider2" value="0" min="0" max="100" data-highlight="true">
			</div>
			<div class="ui-field-contain">
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
			<div class="ui-field-contain">
				<fieldset data-role="controlgroup">
					<legend>Radio:</legend>
					<input type="radio" name="radio-v-1" id="radio-v-1a" checked>
					<label for="radio-v-1a">One</label>
					<input type="radio" name="radio-v-1" id="radio-v-1b">
					<label for="radio-v-1b">Two</label>
					<input type="radio" name="radio-v-1" id="radio-v-1c">
					<label for="radio-v-1c">Three</label>
				</fieldset>
			</div>
			<div class="ui-field-contain">
				<fieldset data-role="controlgroup">
					<legend>Controlgroup:</legend>
					<button class="ui-button ui-corner-all ui-shadow">One <span class="ui-icon ui-icon-home"></span></button>
					<input type="button" data-icon="back" data-iconpos="right" value="Two">
					<a href="#" class="ui-button ui-corner-all ui-shadow">Three <span class="ui-icon ui-icon-grid"></span></a>
				</fieldset>
			</div>
			<div class="ui-field-contain">
				<label for="select-choice-1" class="select">Custom select:</label>
				<select name="select-choice-1" id="select-choice-1" data-native-menu="false" multiple="multiple">
					<option value="standard">Standard: 7 day</option>
					<option value="rush">Rush: 3 days</option>
					<option value="express">Express: next day</option>
					<option value="overnight">Overnight</option>
				</select>
			</div>
			<div class="ui-field-contain">
				<label for="submit-1">Send form:</label>
				<input type="submit" id="submit-1" value="Send">
			</div>
		</form>

		<a href="#" class="ui-button ui-corner-all ui-shadow ui-button-active">Active button <span class="ui-icon ui-icon-gear"></span></a>

		<p>Form inside static list:</p>

		<form>
			<ul data-role="listview" data-inset="true">
				<li class="ui-field-contain">
					<label for="name3">Text Input:</label>
					<input type="text" name="name3" id="name3" value="" data-clear-button="true">
				</li>
				<li class="ui-field-contain">
					<label for="flip3">Slider flip switch:</label>
					<select name="flip3" id="flip3" data-role="slider">
						<option value="off">Off</option>
						<option value="on">On</option>
					</select>
				</li>
				<li class="ui-field-contain">
					<label for="slider3">Slider:</label>
					<input type="range" name="slider3" id="slider3" value="0" min="0" max="100" data-highlight="true">
				</li>
			</ul>
		</form>

		<div id="ui-bar-form" class="ui-bar ui-bar-a">
		<p>ui-bar-<span class="theme">a</span></p>
			<div class="ui-field-contain">
				<label for="name4">Text Input:</label>
				<input type="text" name="name4" id="name4" value="" data-clear-button="true">
			</div>
			<div class="ui-field-contain">
				<label for="flip4">Flip switch:</label>
				<select name="flip4" id="flip4" data-role="slider">
					<option value="off">Off</option>
					<option value="on">On</option>
				</select>
			</div>
			<div class="ui-field-contain">
				<label for="slider4">Slider:</label>
				<input type="range" name="slider4" id="slider4" value="0" min="0" max="100" data-highlight="true">
			</div>
		</div>

		<div data-role="collapsible" data-content-theme="a">
			<h4>Heading</h4>
		<p>I'm the collapsible content with a themed content block set to "<span class="theme">a</span>".</p>
		</div>

		<div data-role="collapsibleset" data-content-theme="a">
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

	<div data-role="toolbar" data-type="footer" data-position="fixed">
		<div data-role="navbar">
			<ul>
				<li><a href="#">Menu item 1</a></li>
				<li><a href="#" class="ui-button-active ui-state-persist">Menu item 2</a></li>
				<li><a href="#">Menu item 3</a></li>
			</ul>
		</div>
		<h4 style="display:none;">Footer</h4>
	</div>

	<div data-role="panel" id="panel-reveal">
		<ul data-role="listview">
			<li data-icon="delete"><a href="#" data-rel="close">Close</a></li>
			<li><a href="#">List item</a></li>
			<li><a href="#">List item</a></li>
			<li><a href="#">List item</a></li>
		</ul>
		<br><br>
		<button class="ui-button ui-corner-all ui-shadow">Button</button>
	</div>

	<div data-role="panel" id="panel-overlay" data-display="overlay">
		<ul data-role="listview">
			<li data-icon="delete"><a href="#" data-rel="close">Close</a></li>
			<li><a href="#">List item</a></li>
			<li><a href="#">List item</a></li>
			<li><a href="#">List item</a></li>
		</ul>
		<br><br>
		<button class="ui-button ui-corner-all ui-shadow">Button</button>
	</div>

	<div data-role="panel" id="panel-push" data-display="push">
		<ul data-role="listview">
			<li data-icon="delete"><a href="#" data-rel="close">Close</a></li>
			<li><a href="#">List item</a></li>
			<li><a href="#">List item</a></li>
			<li><a href="#">List item</a></li>
		</ul>
		<br><br>
		<button class="ui-button ui-corner-all ui-shadow">Button</button>
	</div>

</div><!-- /page -->

</body>
</html>
