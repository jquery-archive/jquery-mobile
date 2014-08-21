<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Toolbar - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="footer-abs-buttons">
		.footer-button-left,
		.footer-button-right {
			position: absolute;
			margin: 0;
			top: auto;
			bottom: 0.24em;
		}
		.footer-button-left {
			left: 0.4em;
		}
		.footer-button-right {
			right: 0.4em;
		}
	</style>
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

		<h1>Toolbar <a href="http://api.jquerymobile.com/toolbar/" class="jqm-api-docs-link ui-btn ui-btn-icon-right ui-icon-carat-r ui-nodisc-icon ui-alt-icon ui-btn-inline ui-corner-all ui-mini">API</a></h1>

		<p>The toolbar widget is used to enhance headers and footers.</p>

		<h2>Markup</h2>

		<h3>Header</h3>

		<p>The header is a toolbar at the top of the page that usually contains the page title text and optional buttons positioned to the left and/or right of the title for navigation or actions.</p>

		<p>The title text is normally an H1 heading element but it's possible to use any heading level (H1-H6) to allow for semantic flexibility. The framework add class <code>ui-title</code> to headings that are immediate children of toolbars. All heading levels with class <code>ui-title</code> are styled identically by default to maintain visual consistency.</p>

		<div data-demo-html="true">
			<div data-role="header">
				<h1>Page Title</h1>
			</div>
		</div><!-- /demo-html -->

		<h3>Footer</h3>

		<p>The footer is a toolbar at the bottom of the page that can contain a wide range of content, from form elements to navbars.</p>

		<p>The footer bar has the same basic structure as the header except it uses the <code>data-role</code> attribute value of <code>footer</code>. Headings that are immediate children of the footer get class <code>ui-title</code>, just like headers.</p>

		<div data-demo-html="true">
			<div data-role="footer">
				<h4>Powered by jQuery Mobile</h4>
			</div>
		</div><!-- /demo-html -->

		<h2>Theme</h2>

		<p>The header and footer toolbar inherit the theme swatch from the page by default but you can easily set the theme swatch color. If you use external fixed toolbars you always have to set a theme, because there is no parent page from which they can inherit the theme.</p>

		<div data-demo-html="true">
			<div data-role="header" data-theme="b">
				<h1>Page Title</h1>
			</div>
		</div><!-- /demo-html -->

		<h2>External toolbars</h2>

		<p>If you want to use the same toolbar on multiple pages, you can use <a href="../toolbar-external/" data-ajax="false">external toolbars</a>.</p>

		<h2>Fixed position</h2>

		<p>Toolbars can be set to fixed position by adding the <code>data-position="fixed"</code> to the header or footer. This will make them remain at the top (header) or bottom (footer) of the window at all time instead of scrolling with the page. See <a href="../toolbar-fixed/" data-ajax="false">fixed toolbars</a>.</p>

		<h2>Fullscreen position</h2>

		<p>The toolbars can be set to fullscreen fixed position that overlays the toolbar over the content by adding the <code>data-fullscreen="true"</code> to a fixed header. See <a href="../toolbar-fixed-fullscreen/" data-ajax="false">fullscreen toolbars</a>.</p>

		<h2>External fixed toolbars</h2>

		<p>See <a href="../toolbar-fixed-external/" data-ajax="false"> external fixed toolbars</a>.</p>

		<h2>Persistent toolbars</h2>

		<p>See <a href="../toolbar-fixed-persistent/" data-ajax="false">persistent toolbars</a>.</p>

		<h2>Buttons in toolbars</h2>

		<p>The framework automatically enhances links in toolbars as buttons with inline and mini style, but this has been deprecated in version 1.4. The same goes for positioning the first two buttons in a header left and right if they are immediate child of the header. The demos below prepare you for the next version.</p>

		<h3>Header button position classes</h3>

		<p>You can use the <code>ui-btn-left</code> and <code>ui-btn-right</code> classes to position buttons in the header.</p>

		<div data-demo-html="true">
			<div data-role="header">
				<a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-delete">Cancel</a>
			<h1>My App</h1>
				<button class="ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-check">Save</button>
			</div>
		</div><!-- /demo-html -->

		<div data-demo-html="true">
			<div data-role="header">
			<h1>Page Title</h1>
				<a href="#" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-gear">Options</a>
			</div>
		</div><!-- /demo-html -->

		<h3>Buttons in headers without a heading</h3>

		<p>The heading in the header bar has some margin that will give the bar its height. If you choose not to use a heading, you will need to add an element with <code>class="ui-title"</code> so that the bar can get the height and display correctly.</p>

		<div data-demo-html="true">
			<div data-role="header">
				<a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-grid">View</a>
				<span class="ui-title"></span>
			</div>
		</div><!-- /demo-html -->

		<h3>Buttons in footers</h3>

		<p>The classes <code>ui-btn-left</code> and <code>ui-btn-right</code> were not meant to be used in footers, because they do not account for the possible presence of text, navbars, and and other elements often present in footers. You can nevertheless achieve a similar effect when you add a bit of custom CSS.</p>

		<div data-demo-html="true" data-demo-css="#footer-abs-buttons">
			<div data-role="footer">
				<h2>Footer</h2>
				<a href="#" class="ui-btn ui-corner-all ui-btn-inline ui-mini footer-button-left ui-btn-icon-left ui-icon-power">Quit</a>
				<a href="#" class="ui-btn ui-corner-all ui-btn-inline ui-mini footer-button-right ui-btn-icon-right ui-icon-carat-r">Next</a>
			</div>
		</div>

		<h2>Adding back button to header</h2>

		<p>jQuery Mobile has a feature to automatically create and append "back" buttons to any header, though it is disabled by default. This is primarily useful in chromeless installed applications, such as those running in a native app webview. The framework automatically generates a "back" button on a header when the page plugin's <code>addBackBtn</code> option is true. This can also be set via markup if the header has a <code>data-add-back-btn="true"</code> attribute.</p>

		<p>If you use the attribute <code>data-rel="back"</code> on an anchor, any clicks on that anchor will mimic the back button, going back one history entry and ignoring the anchor's default href. This is particularly useful when linking back to a named page, such as a link that says "home", or when generating "back" buttons with JavaScript, such as a button to close a dialog. When using this feature in your source markup, <strong>be sure to provide a meaningful href that actually points to the URL of the referring page. This will allow the feature to work for users in C-Grade browsers.</strong></p>

        <p>If you just want a reverse transition without actually going back in history, you should use the <code>data-direction="reverse"</code> attribute.</p>

		<h3>Customizing the back button text</h3>

		<p>If you'd like to configure the back button text, you can either use the <code>data-back-btn-text="previous"</code> attribute on your header element, or set it programmatically via the toolbar plugin's options:<br><code>$.mobile.toolbar.prototype.options.backBtnText = "previous";</code></p>

		<h3>Default back button style</h3>

		<p>If you'd like to configure the back button theme, you can use:<br>
		<code>$.mobile.toolbar.prototype.options.backBtnTheme = "a";</code><br>
		If you're doing this programmatically, set this option inside the <code>mobileinit</code> event handler.</p>

		<h2>Navbars</h2>

		<p>See <a href="../navbar/" data-ajax="false">navbar</a> for examples of navigation bars inside toolbars.</p>

		<h2>Grouped buttons</h2>

		<p>To group buttons into a button set, wrap the links in an element with <code> data-role=&quot;controlgroup&quot;</code> and <code>data-type=&quot;horizontal&quot;</code> attributes.</p>

		<div data-demo-html="true">
			<div data-role="header">
				<div data-role="controlgroup" data-type="horizontal" class="ui-mini ui-btn-left">
					<a href="#" class="ui-btn ui-btn-icon-right ui-icon-plus">Add</a>
					<a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-u">Up</a>
					<a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-d">Down</a>
				</div>
				<h6>My header</h6>
			</div>
		</div>

		<h2>Adding padding</h2>

		<p>By default, toolbars don't have any padding to accommodate nav bars and other widgets. To add padding inside of a full-width toolbar, wrap the toolbar's contents in an element and add class <code>ui-bar</code> to that element or apply your own padding rule in your custom CSS.</p>

		<div data-demo-html="true">
			<div data-role="footer">
				<div class="ui-bar">
					<label for="select-choice-1" class="ui-hidden-accessible">Shipping:</label>
					<select name="select-choice-1" id="select-choice-1" data-mini="true" data-inline="true">
						<option value="standard">Standard: 7 day</option>
						<option value="rush">Rush: 3 days</option>
						<option value="express">Express: next day</option>
						<option value="overnight">Overnight</option>
					</select>
				</div>
			</div>
		</div>

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
