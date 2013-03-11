<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Footers - jQuery Mobile Demos</title>
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

			<h1>Footers <a href="http://api.jquerymobile.com/footer/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">The footer is a toolbar at the bottom of the page that can contain a wide range of content, from for elements to navbars.
			</p>

			<h2>Footer markup</h2>

			<p>The <code>footer</code> bar has the same basic structure as the <a href="../headers/">header</a> except it uses the <code> data-role</code> attribute value of <code>footer</code>. The <code>footer</code> toolbar will be themed with the "a" swatch by default (black in the default theme) but you can easily set the theme swatch color.</p>

			<div data-demo-html="true">
				<div data-role="footer" class="ui-bar">
					<a href="#" data-icon="plus">Add</a>
					<a href="#" data-icon="arrow-u">Up</a>
					<a href="#" data-icon="arrow-d">Down</a>
				</div>
			</div><!-- /demo-html -->

			<p>The page footer is very similar to the header in terms of options and configuration. The primary difference is that the footer is designed to be less structured than the header to allow more flexibility, so the framework doesn't automatically reserve slots for buttons to the left or right as it does in headers. Since footers do not have the same prescriptive markup conventions as headers, we recommend using layout <a href="../grids/">grids</a> or writing custom styles to achieve the design you want.</p>

				<p>Any link or valid <a href="../buttons/">button markup</a> added to the footer will automatically be turned into a button. To save space, buttons in toolbars are automatically set to inline styling so the button is only as wide as the text and icons it contains.  </p>

				<p>By default, toolbars don't have any padding to accommodate nav bars and other widgets. To include padding on the bar, add a <code>class="ui-bar"</code> to the footer.</p>

			</p>Note that <code>.ui-bar</code> should not be added to header or footer bars that span the full width of the page, as the additional padding will cause a full-width element to break out of its parent container. To add padding inside of a full-width toolbar, wrap the toolbar's contents in an element and apply the padding to that element.</p>

			<h2>Grouped buttons</h2>

			<p>To group buttons together into a button set, wrap the links in a wrapper with <code> data-role=&quot;controlgroup&quot;</code> and <code>data-type=&quot;horizontal&quot;</code> attributes.</p>

<code>&lt;div data-role=&quot;controlgroup&quot; data-type=&quot;horizontal&quot;&gt;</code>

			<p>This creates a grouped set of buttons:</p>

			<div data-role="footer" class="ui-bar">
				<div data-role="footer" class="ui-bar">
					<div data-role="controlgroup" data-type="horizontal">
						<a href="#" data-icon="plus">Add</a>
						<a href="#" data-icon="arrow-u">Up</a>
						<a href="#" data-icon="arrow-d">Down</a>
					</div>
				</div>
			</div>

			<h2>Adding form elements</h2>

			<p><a href="../forms/">Form</a> elements and other content can also be added to toolbars. Here is an example of a <a href="../selects/">select</a> menu inside a footer bar. We recommend using mini-sized form elements in toolbars by adding the <code>data-mini="true"</code> attribute:</p>

			<div data-role="footer" class="ui-bar">
				<label for="select-choice-1">Shipping:</label>
				<select name="select-choice-1" id="select-choice-1" data-theme="a" data-mini="true">
					<option value="standard">Standard: 7 day</option>
					<option value="rush">Rush: 3 days</option>
					<option value="express">Express: next day</option>
					<option value="overnight">Overnight</option>
				</select>
			</div>

					<h2>Fixed &amp; Persistent footers</h2>
					<p>In situations where the footer is a global navigation element, you may want it to appear <a href="../fixed-toolbars/">fixed</a> so it doesn't scroll out of view. It's also possible to make a fixed toolbar <a href="../fixed-toolbars/footer-persist-a.php">persistent</a> so it appears to not move between <a href="../transitions/" data-ajax="false">page transitions</a>. This can be accomplished by using the persistent footer feature included in jQuery Mobile.</p>

					<p>To make a footer persistent between transitions, add the <code>data-id</code> attribute to the footer of all relevant pages and use the same <code>id</code> value for each. For example, by adding <code>data-id="myfooter"</code> to the current page and the target page, the framework will keep the footer anchors in the same spot during the page animation. <strong>This effect will only work correctly if the header and footer toolbars are set to <code>data-position="fixed"</code> so they are in view during the transition.</strong></p>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
