<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Introduction - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
        <h1 class="jqm-logo"><a href="../"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			<h1>Introduction</h1>

			<p class="jqm-intro">jQuery Mobile is a touch-friendly UI framework built on jQuery Core that works across all popular mobile, tablet and desktop platforms.
			</p>

			<h2>Introduction</h2>

			<p>jQuery Mobile is a user interface framework based on jQuery that works across all popular phones, tablet, e-reader, and desktop platforms. Built with accessibility and universal access in mind, we follow progressive enhancement and <a href="rwd.php">responsive web design (RWD)</a> principles. HTML5 Markup-driven configuration makes it easy to learn, but a powerful <a href="http://api.jquerymobile.com/">API</a> makes it easy to deeply customize the library.</p>

			<h2>Pages & Dialogs</h2>

			<p>A <a href="../widgets/pages/">page</a> in jQuery Mobile consists of an element with a <code> data-role="page"</code> attribute. Within the "page" container, any valid HTML markup can be used, but for typical pages in jQuery Mobile, the immediate children of a "page" are divs with data-roles of <code>"header"</code>, <code>"content"</code>, and <code>"footer"</code>. The baseline requirement for a page is only the page wrapper to support the navigation system, the rest is optional. </p>

			<p>A page can be styled as a <a href="../widgets/dialog/">dialog</a> that makes the page look like it's a modal style overlay. To give a standard page the appearance of a modal dialog, add the <strong>data-rel="dialog"</strong> attribute to the link. Transitions can also be set on dialog links.</p>

			<h2>AJAX Navigation & Transitions</h2>

			<p>jQuery Mobile includes an <a href="../widgets/navigation/" data-ajax="false">AJAX navigation system</a> to support a rich set of animated page <a href="../widgets/transitions/" data-ajax="false">transitions</a> by automatically 'hijacking' standard links and form submissions and turning them into an AJAX request. The back button is fully supported and there are features to prefetch &amp; cache, dynamically inject, and script pages for advanced use cases.</p>

			<p>Whenever a link is clicked or a form is submitted, that event is automatically intercepted by the AJAX nav system and is used to issue an AJAX request based on the <code>href</code> or form action instead of reloading the page. While the framework waits for the AJAX response, a loader overlay is displayed.</p>

			<p>When the requested page loads, jQuery Mobile parses the document for an element with the <code> data-role="page"</code> attribute and inserts that code into the DOM of the original page. Next, any widgets in the incoming page are enhanced to apply all the styles and behavior. The rest of the incoming page is discarded so any scripts, stylesheets or other information will not be included. The framework will also note the title of the incoming page to update the title when the new page is transitioned into view.</p>

			<p>Now that the requested page is in the DOM and enhanced, it is animated into view with a <a href="../widgets/transitions/" data-ajax="false">transition</a>. By default, the framework applies a <strong>fade</strong> transition. To set a custom transition effect, add the <code>data-transition</code> attribute to the link. </p>

			<h2>Content & Widgets</h2>

			<p>Inside your content container, you can add any standard HTML elements - headings, lists, paragraphs, etc. You can write your own custom styles to create custom layouts by adding an additional stylesheet to the <code>head</code> after the jQuery Mobile stylesheet.</p>

			<p>jQuery Mobile includes a wide range of touch-friendly UI widgets: <a  href="../widgets/buttons/">buttons</a>, <a href="../widgets/forms/">form elements</a>, <a href="../widgets/collapsibles/">collapsibles</a>, <a href="../widgets/accordions/">accordions</a>, <a href="../widgets/popup/">popups</a>, <a href="../widgets/dialog/">dialogs</a>, <a href="../widgets/table-column-toggle/">responsive tables</a>, and much more. For best performance, use the <a href="http://jquerymobile.com/download-builder/" rel="external">download builder</a> to pick the components you need.</p>

				<h4>Buttons</h4>
				<p>There are a few ways to make <a href="../widgets/buttons/" title="buttons-types">buttons</a>, but let's turn a link into a button so it's easy to click. Just start with a link and add a <code>data-role="button"</code> attribute to it.  You can add an <a href="../widgets/icons/">icon</a> with the <code>data-icon</code> attribute and optionally set its position with the <code>data-iconpos</code> attribute.</p>

				<div data-demo-html="true">
				<a href="#" data-role="button" data-icon="star">Star button</a>
				</div><!--/demo-html -->

			<h4>Listviews</h4>
			<p>jQuery Mobile includes a diverse set of common <a href="../widgets/listviews/" title="docs-lists">listviews</a> that are coded as lists with a <code>data-role="listview"</code> added. Here is a simple linked list that has a role of <code>listview</code>. We're going to make this look like an inset module by adding a <code>data-inset="true"</code> attribute and we add a dynamic search filter with <code>data-filter="true"</code>.</p>

			<div data-demo-html="true">
			<ul data-role="listview" data-inset="true" data-filter="true">
				<li><a href="#">Acura</a></li>
				<li><a href="#">Audi</a></li>
				<li><a href="#">BMW</a></li>
				<li><a href="#">Cadillac</a></li>
				<li><a href="#">Ferrari</a></li>
			</ul>
			</div><!--/demo-html -->

			<h4>Form elements</h4>
			<p>The framework contains a full set of <a href="../widgets/forms/">form elements</a> that are automatically enhanced into touch-friendly styled widgets. Here's a slider made with the new HTML5 input type of range, no <code>data-role</code> needed. Be sure to wrap these in a <code>form</code> element and always properly associate a <code>label</code> with every form element.</p>

			<div data-demo-html="true">
			<form>
				<label for="textinput-s">Text Input:</label>
				<input type="text" name="textinput-s" id="textinput-s" placeholder="Text input" value="" data-clear-btn="true">

				<label for="select-native-s">Select:</label>
				<select name="select-native-s" id="select-native-s">
					<option value="small">One</option>
					<option value="medium">Two</option>
					<option value="large">Three</option>
				</select>

				<label for="slider-s">Input slider:</label>
				<input type="range" name="slider-s" id="slider-s" value="25" min="0" max="100" data-highlight="true"  />
			</form>

			</div><!--/demo-html -->

			<h2>Responsive Design</h2>

			<p>jQuery Mobile has always been designed to work within a <a href="rwd.php">responsive web design (RWD)</a> context and our docs and forms had a few responsive elements from the very start. All the widgets are built to be 100% flexible in width to fit easily inside any responsive layout system you choose to build. </p>

			<p>The library also includes a number of responsive widgets like <a href="../widgets/grids/">responsive grids</a>, <a href="../widgets/table-reflow/">reflow tables</a> and <a href="../widgets/table-column-toggle/">column chooser tables</a>, and <a href="../widgets/panels/">sliding panels</a>.</p>

			<h2>Theming</h2>
			<p>jQuery Mobile has a robust theme framework that supports up to 26 sets of toolbar, content and button colors, called a "swatch". Just add a <code>data-theme="e"</code> attribute to any of the widgets on this page: page, header, list, input for the slider, or button to turn it yellow. Try different swatch letters from "a" to "e" in the default theme to mix and match swatches.</p>
			<p>Cool party trick: add the theme swatch to the page and see how all the widgets inside the content will automatically inherit the theme (headers and footers don't inherit, they default to swatch "a").</p>

			<div data-demo-html="true">
			<a href="#" data-role="button" data-icon="star" data-theme="a">data-theme="a"</a>
			<a href="#" data-role="button" data-icon="star" data-theme="b">data-theme="b"</a>
			<a href="#" data-role="button" data-icon="star" data-theme="c">data-theme="c"</a>
			<a href="#" data-role="button" data-icon="star" data-theme="d">data-theme="d"</a>
			<a href="#" data-role="button" data-icon="star" data-theme="e">data-theme="e"</a>
			</div><!--/demo-html -->

		<p>When you're ready to build a custom theme, use <a href="http://www.jquerymobile.com/themeroller" rel="external">ThemeRoller</a> to drag and drop, then download a custom theme.</p>

			</div><!-- /content -->

			<div data-role="footer" class="jqm-footer">
				<p class="jqm-version"></p>
				<p>Copyright 2013 The jQuery Foundation</p>
			</div><!-- /footer -->

		<?php include( '../global-nav.php' ); ?>

		</div><!-- /page -->
		</body>
		</html>

