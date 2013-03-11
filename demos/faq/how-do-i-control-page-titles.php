<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos - How do I control page titles?</title>
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

			<h1>How do I control page titles?</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">When you load the first page of a jQuery Mobile based site, then click a link or submit a form, AJAX is used to pull in the content of the requested page. Having both pages in the DOM is essential to enable the animated page transitions, but one downside of this approach is that the page title is always that of the first page, not the subsequent page you're viewing. To remedy this, jQuery Mobile automatically parses the <code>title</code> of the page pulled via AJAX and changes the <code>title</code> attribute of the parent document to match.</p>

			<h2>Titles in multi-page templates</h2>

			<p>On multi-page documents, we follow a similar convention, but since all the pages share a common <code>title</code>, we have a <code>data-title</code> attribute that can be added to each page container within a multi-page template to manually define a title. The title of the HTML document will be automatically updated to match the <code>data-title</code> of the page currently in view.</p>

	<pre><code>
	&lt;div data-role=&quot;page&quot; id=&quot;foo&quot; <strong>data-title=&quot;Page Foo&quot;</strong>&gt;

	&lt;/div&gt;&lt;!-- /page --&gt;
	</code></pre>

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
