<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Headers - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
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

			<h1>Headers <a href="http://api.jquerymobile.com/header/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">The header is a toolbar at the top of the page that usually contains the page title text and optional buttons positioned to the left and/or right of the title for navigation or actions.
			</p>

			<h2>Header markup</h2>

			<p>The title text is normally an H1 heading element but it's possible to use any heading level (H1-H6) to allow for semantic flexibility. All heading levels are styled identically by default to maintain visual consistency.</p>

			<div data-demo-html="true">
				<div data-role="header">
					<h1>Page Title</h1>
				</div>
			</div><!-- /demo-html -->

			<h2>Fixed position</h2>

			<p>The header can be set to fixed position by adding the <code>data-position="fixed"</code> to the header. See <a href="../fixed-toolbars/">fixed toolbars</a>.</p>

			
			<h2>Fullscreen position</h2>

			<p>The header can be set to fullscreen fixed position that overlays the toolbars over the content by adding the <code>data-fullscreen="true"</code> to a fixed header. See <a href="../fixed-toolbars/bars-fullscreen.php">fullscreen toolbars</a>.</p>


			<h2>Theme</h2>
			<p>The <code>header</code> toolbar is themed with the "a" swatch by default (black in the default theme) but you can easily set the theme swatch color.</p>

			<div data-demo-html="true">
				<div data-role="header" data-theme="b">
					<h1>Page Title</h1>
				</div>
			</div><!-- /demo-html -->

			<p> Headers can optionally be positioned as <a href="bars-fixed.php">fixed</a> so they remain at the top of the screen at all times instead of scrolling with the page.</p>

			<h2>Buttons</h2>

			<p>The header plugin looks for immediate children of the header container, and automatically sets the first link in the left button slot and the second link in the right. In this example, the 'Cancel' button will appear in the left slot and 'Save' will appear in the right slot based on their sequence in the source order. </p>

			<div data-demo-html="true">
				<div data-role="header">
					<a href="#" data-icon="delete">Cancel</a>
					<h1>My App</h1>
					<a href="#" data-icon="check">Save</a>
				</div>
			</div><!-- /demo-html -->

			<h2>Making buttons visually stand out</h2>

			<p>Buttons automatically adopt the swatch color of the bar they sit in, so a link in a header bar with the "a" color will also be styled as "a" colored buttons. To make a button visually stand out add a <code> data-theme</code> attribute to set the button swatch for contrast.</p>

			<div data-demo-html="true">
				<div data-role="header">
					<a href="#" data-icon="delete">Cancel</a>
					<h1>Edit Contact</h1>
					<a href="#" data-icon="check" data-theme="b">Save</a>
				</div>
			</div><!-- /demo-html -->

			<h2>Button position classes</h2>

			<p>The button position can also be controlled by adding classes to the button anchors, rather than relying on source order. This is especially useful if you only want a button in the right slot. To specify the button position, add the class of <code>ui-btn-left</code> or <code>ui-btn-right</code> to the anchor.</p>

			<div data-demo-html="true">
				<div data-role="header" >
					<h1>Page Title</h1>
					<a href="#" data-icon="gear" class="ui-btn-right">Options</a>
				</div>
			</div><!-- /demo-html -->

			<h2>Buttons in toolbars without a heading</h2>

			<p>The heading in the header bar has some margin that will give the bar its height. If you choose not to use a heading, you will need to add an element with <code>class="ui-title"</code> so that the bar can get the height and display correctly.</p>

			<div data-demo-html="true">
				<div data-role="header" >
					<a href="#" data-icon="gear" class="ui-btn-right">Options</a>
					<span class="ui-title"></span>
				</div>
			</div><!-- /demo-html -->

		<h2>Adding Back buttons</h2>

		<p>jQuery Mobile has a feature to automatically create and append "back" buttons to any header, though it is disabled by default. This is primarily useful in chromeless installed applications, such as those running in a native app webview. The framework automatically generates a "back" button on a header when the page plugin's <code>addBackBtn</code> option is true. This can also be set via markup if the page div has a <code>data-add-back-btn="true"</code> attribute. </p>

		<p>If you use the attribute <code>data-rel="back"</code> on an anchor, any clicks on that anchor will mimic the back button, going back one history entry and ignoring the anchor's default href. This is particularly useful when linking back to a named page, such as a link that says "home", or when generating "back" buttons with JavaScript, such as a button to close a dialog. When using this feature in your source markup, <strong>be sure to provide a meaningful href that actually points to the URL of the referring page. This will allow the feature to work for users in C-Grade browsers.</strong></p>
                <p>If you just want a reverse transition without actually going back in history, you should use the <code>data-direction="reverse"</code> attribute.</p>

		<h2>Customizing the back button text</h2>

		<p>If you'd like to configure the back button text, you can either use the <code>data-back-btn-text="previous"</code> attribute on your page element, or set it programmatically via the page plugin's options: <br /><code>$.mobile.page.prototype.options.backBtnText = "previous";</code></p>

		<h3>Default back button style</h3>
		<p>If you'd like to configure the back button role-theme, you can use: <br /><code>$.mobile.page.prototype.options.backBtnTheme = "a";</code><br />
		If you're doing this programmatically, set this option inside the mobileinit event handler.</p>

			<h2>Custom header configurations</h2>
			<p>If you need to create a header that doesn't follow the default configuration, simply wrap your custom styled markup in any container, such as <code>div</code>. The plugin won't apply the automatic button logic to the wrapped content inside the header container so you can write custom styles for laying out the content in your header.</p>

			<p>It's also possible to create custom bars without using the header data-role at all. For example, start with any container and add the <code>ui-bar</code> class to apply standard bar padding and add the <code>ui-bar-b</code> class to assign the bar swatch styles from your theme. (The "b" can be any swatch letter.)</p>

			<div data-demo-html="true">
				<div class="ui-bar ui-bar-b">
					<h3>I'm just a div with bar classes and a mini inline <a href="#" data-role="button" data-inline="true" data-mini="true">Button</a></h3>
				</div>
			</div><!-- /demo-html -->

				<p>Note that <code>.ui-bar</code> should not be added to header or footer bars that span the full width of the page, as the additional padding will cause a full-width element to break out of its parent container. To add padding inside of a full-width toolbar, wrap the toolbar's contents in an element and apply the padding to that element instead.</p>

				<p>By writing some simple styles, it's easy to build message bars like this:</p>
				<!-- Yes, the inline styles aren't recommended in a real system but they are used to simply illustrate how to tweak CSS -->
					<div class="ui-bar ui-bar-e">

						<h3 style="display:inline-block; width:92%; margin-top:5px;">This is an alert message. </h3><div style="display:inline-block; width:8%; margin-top:0px; text-align:right;"><a href="#" data-role="button" data-icon="delete" data-inline="true" data-iconpos="notext">Dismiss</a></div><p style="font-size:85%; margin:-.3em 0 1em;">And here's some additional text in a paragraph.</p>
					</div>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
