<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-faq">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
			<h2>Question:</h2>

			<h1>Why won't my CSS styles apply correctly to a widget?</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">This is probably because the element you see in the markup (button, form element, etc.) isn't the same after enhancements have been applied. In order to style elements and add behavior, jQuery Mobile modifies the original markup with additional classes and elements which could impact your CSS selectors. Use a web inspector to view the post-enhancement markup to find the right selectors to use.</p>

			<p>Let's look at an example to illustrate the enhancements. Here is the starting markup for a button:</p>
<pre class="brush: html"><code>
// Button before enhancement
&#60;button&#62;Button element&#60;/button&#62;
</code></pre>

			<p>After enhancement, the button markup has been modified by the framework to add classes and wrap the contents for styling:</p>
<pre class="brush: html"><code>
// Button after enhancement
&#60;div data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" aria-disabled="false"&#62;
	&#60;span class="ui-btn-inner ui-btn-corner-all"&#62;
		&#60;span class="ui-btn-text"&#62;Button element&#60;/span&#62;
	&#60;/span&#62;
	&#60;button class="ui-btn-hidden" aria-disabled="false"&#62;Button element&#60;/button&#62;
&#60;/div&#62;
</code></pre>

			<p>As you can see from the code snippet above the markup has significantly changed after enhancement. The original button you added has ben wrapped in a div and had several spans added. The original button you added is now also hidden. To change the visual styling of the button you must target the new enhanced markup not the button you added.</p>

			<a href="index.php" class="jqm-button" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-l" data-iconpos="left">All Questions &amp; Answers</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
