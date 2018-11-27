<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
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

		<p><strong>Note: this page has not been updated after 1.3</strong></p>

		<h2>Question:</h2>

		<h1>How does theming work?</h1>

		<h2>Answer:</h2>

		<p>The jQuery Mobile theme system separates color and texture from structural styles that define things like padding and dimensions. This allows theme colors and textures to be defined once in the stylesheet and to be mixed, matched, and combined to achieve a wide range of visual effects. </p>

		<h2>Customize with ThemeRoller</h2>

		<p>The easiest way to create custom themes is with the <a href="http://www.jquerymobile.com/themeroller" rel="external">ThemeRoller tool</a>. It allows you to build a theme, then download a custom CSS file, ready to be dropped into your project. View a tutorial on <a href="http://learn.jquery.com/jquery-mobile/theme-roller/">how to use ThemeRoller to create a custom theme</a> on the learn site.</p>

					<h2>Default theme swatch mapping for components</h2>

					<p>If no theme swatch letter is set at all, the framework uses the "a" swatch (black in the default theme) for headers and footers and the "c" swatch (light gray in the default theme) for the page content to maximize contrast between the both.</p>

				        <p>All items in containers inherit the swatch from their parent. Exceptions to this rule are the listdivider in listviews, the header of nested list pages, and the button of split button lists. Those default to "b" (blue in the default theme). Count bubbles default to "c" (silver in the default theme).</p>

				        <p>Note that there is also a swatch named "active" (bright blue in the default theme) which is used to indicate an active selected item. See the <strong>Global "Active" state</strong> further down this page for further information on the <strong>active</strong> swatch.</p>

				        <p>The page loading dialog and error message don't inherit a swatch theme. The loading dialog defaults to swatch "a" (black in the default theme) and the error message to swatch "e" (yellow in the default theme). You can configure those defaults globally..</p>

					<h2>Themes &amp; swatches</h2>

					<p>Each theme includes several global settings, including font family, drop shadows for overlays, and corner radius values for buttons and boxes. In addition, the theme can include multiple color swatches, each with color values for bars, content blocks, buttons and list items, and font <code>text-shadow</code>.</p>

					<p>The default theme includes 5 swatches that are given letters (a, b, c, d, e) for quick reference. To make mapping of color swatches consistent across our widgets, we have followed the convention that swatch "a" is the highest level of visual priority (black in our default theme), "b" is secondary level (blue) and "c" is the baseline level (gray) that we use by default in many situations, "d" for an alternate secondary level and "e" as an accent swatch.  Themes may have additional swatches for accent colors or specific situations. For example, you could add a new theme swatch "f" that has a red bar and button for use in error situations.</p>

					<p>Most theme changes can be done using ThemeRoller, but it's also simple to manually edit the base swatches in the default theme and/or add additional swatches by editing the theme CSS file. Just copy a block of swatch styles, rename the classes with the new swatch letter name, and tweak colors as you see fit.</p>

						<h3>Bars</h3>
					<p>The default theme contains the following five bar styles:</p>

						<div class="swatch-preview">
							<div class="ui-bar ui-bar-a">Bar A - <a href="#" data-role="none" class="ui-link">Link</a></div>
							<div class="ui-bar ui-bar-b">Bar B - <a href="#" data-role="none" class="ui-link">Link</a></div>
							<div class="ui-bar ui-bar-c">Bar C - <a href="#" data-role="none" class="ui-link">Link</a></div>
							<div class="ui-bar ui-bar-d">Bar D - <a href="#" data-role="none" class="ui-link">Link</a></div>
							<div class="ui-bar ui-bar-e">Bar E - <a href="#" data-role="none" class="ui-link">Link</a></div>
						</div><!-- end swatch-bars -->

					<p>By default, the framework assigns the "a" swatch to all headers and footers, because these are typically given high visual priority in an application. To set the color of a bar to a different swatch color, simply add the <code> data-theme</code> attribute to your header or footer and specify an alternate swatch letter ("b" or "d", for example) and the specified theme swatch color will be applied. </p>

						<h3>Content Blocks</h3>
					<p>The default theme also includes color swatch values for use in content blocks, designed to coordinate with the header color swatches in the theme. </p>

						<div class="swatch-preview">
							<div class="ui-body ui-body-a">Block A - <a href="#">Link</a></div>
							<div class="ui-body ui-body-b">Block B - <a href="#">Link</a></div>
							<div class="ui-body ui-body-c">Block C - <a href="#">Link</a></div>
							<div class="ui-body ui-body-d">Block D - <a href="#">Link</a></div>
							<div class="ui-body ui-body-e">Block E - <a href="#">Link</a></div>
						</div><!-- end swatch-bars -->

					<p>If a theme isn't specified on a content block, the framework will default to "c" to maximize contrast against the default header "a".</p>

					<h2>Lists &amp; Buttons</h2>
					<p>Each swatch also includes default styles for interactive elements like list items and buttons. Each button has styles for normal, hover/focus and pressed states.</p>

						<div class="swatch-preview">
							<a href="index.html" class="ui-button ui-corner-all ui-button-a">Button A <span class="ui-icon ui-icon-arrow-l"></span></a>
							<a href="index.html" class="ui-button ui-corner-all ui-button-b">Button B <span class="ui-icon ui-icon-arrow-l"></span></a>
							<a href="index.html" class="ui-button ui-corner-all ui-button-c">Button C <span class="ui-icon ui-icon-arrow-l"></span></a>
							<a href="index.html" class="ui-button ui-corner-all ui-button-d">Button D <span class="ui-icon ui-icon-arrow-l"></span></a>
							<a href="index.html" class="ui-button ui-corner-all ui-button-e">Button E <span class="ui-icon ui-icon-arrow-l"></span></a>
						</div><!-- end swatch-bars -->

					<p>By default, any button that's placed in a bar is automatically assigned a swatch letter that matches its parent bar or content box. This  behavior makes it easy to ripple a theme change through a page by setting a theme swatch on a parent because you know the buttons will maintain the same relative visual weight across themes. Since form elements use the button styles, they will also adapt to their parent container.</p>

					<p>If you want to add visual emphasis to a button, an alternate swatch color can be set by adding a <code> data-theme="a"</code> to the anchor. Once an alternate swatch color is set on a button in the markup, the framework won't override that color if the parent theme is changed, because you made a conscious decision to set it.</p>

						<h3>Global "Active" state</h3>
					<p>The jQuery Mobile framework uses a swatch called "active" (bright blue in the default theme) to consistently indicate the selected state, regardless of the individual swatch of the given widget. We apply this in navigation and form controls whenever there is a need to indicate what is currently selected. Because this theme swatch is designed for clear, consistent user feedback, it cannot be overridden via the markup; it is set once in the theme and applied by the framework whenever a selected or active state is needed. The styling for this state is in the theme stylesheet under the <code>ui-button-active</code> style rules.</p>

						<fieldset data-role="controlgroup" class="ui-field-contain">
					     	<legend>Active is used for the on state of these toggles:</legend>
					         	<input type="radio" name=" radio-choice-a" id="radio-choice-a" value="on" checked="checked">
					         	<label for="radio-choice-a">On</label>
					         	<input type="radio" name=" radio-choice-a" id="radio-choice-b" value="off">
					         	<label for="radio-choice-b">Off</label>
					    </fieldset>

						<h3>Icons</h3>
					<p>There is a core set of <a href="../widgets/icons/">standard icons</a> included in the framework that can be assigned to any button. To minimize the download size of the core icons, jQuery Mobile only includes these icons in white and automatically adds a semi-transparent black circle behind the icon to make sure it has good contrast on all background colors.</p>

						<h3>Theme classes</h3>
					<p>Assigning color swatches through the <code> data-theme</code> attribute is one way to leverage the theme system, but it's also possible to apply any of the theme swatches directly to your markup through classes to apply the colors, textures and font formatting of your theme to any markup. This is especially useful when creating your own custom layout elements or UI widgets. Here are a few common theme classes, but many more are available in the theme stylesheet:</p>
						<dl>
							<dt><code>ui-bar-(a-z)</code></dt>
							<dd>Applies the toolbar theme styles for the selected swatch letter. Commonly used in conjunction with <code>ui-bar</code> structural class to add the standard bar padding styles.</dd>
							<dt><code>ui-body-(a-z)</code></dt>
							<dd>Applies the content body theme styles for the selected swatch letter. Commonly used in conjunction with <code>ui-body</code> structural class to add the standard content block padding styles. </dd>
							<dt><code>ui-button-up-(a-z)</code></dt>
							<dd>Applies the button/clickable element theme styles for the selected swatch letter. Commonly used with the <code>ui-button-hover-(a-z)</code> and <code>ui-button-down-(a-z)</code> interaction class states to provide visual feedback and <code>ui-button-active</code> to indicate the selected or "on" state.</dd>
							<dt><code>ui-corner-all</code></dt>
							<dd>Applies the theme's global border-radius for rounded corners and is used for container or grouped items in the framework (inset lists, radiobutton sets). There are additional classes for all the possible combinations of rounded corners, for example: <code>ui-corner-tl</code> (top left only), <code>-top</code> (both top corners), <code>-left</code> (both left corners),  etc. A second full set of corner classes is provided for buttons so these can have a different corner radius. These use classes with a similar naming convention, but with "button-corner" instead of "corner", like this: <code>.ui-<strong>button-corner</strong>-all</code>.</dd>
							<dt><code>ui-shadow</code></dt>
							<dd>Applies the theme's global drop shadow to any element using CSS <code>box-shadow</code> property. </dd>
							<dt><code>ui-disabled</code></dt>
							<dd>Applies the disabled look and feel which essentially reduces the opacity of any element with this class to 30%, hides the cursor, and sets <code>pointer-events: none;</code> which prevents any interaction in many modern browsers.</dd>
						</dl>

							<h3>Overriding themes</h3>
						<p>The themes are meant as a solid starting point, but are meant to be customized. Since everything is controlled by CSS, it's easy to use a web inspector tool to identify the style properties you want to modify. The set of of theme classes (global) and semantic structural classes (widget-specific) added to elements provide a rich set of possible selectors against which to target style overrides. We recommend adding an external stylesheet to the <code>head</code>, placed <strong>after</strong> the structure and theme stylesheet references, that contain all your style overrides. This allows you to easily update to newer versions of the library because overrides are kept separate from the library code.</p>

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
