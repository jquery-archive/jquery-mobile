<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos - How do I control page titles?</title>
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

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<p><strong>Note: this page has not been updated after 1.3</strong></p>

		<h2>Question:</h2>

		<h1>How do I control page titles?</h1>

		<h2>Answer:</h2>

		<p>When you load the first page of a jQuery Mobile based site, then click a link or submit a form, Ajax is used to pull in the content of the requested page. Having both pages in the DOM is essential to enable the animated page transitions, but one downside of this approach is that the page title is always that of the first page, not the subsequent page you're viewing. To remedy this, jQuery Mobile automatically parses the <code>title</code> of the page pulled via Ajax and changes the <code>title</code> attribute of the parent document to match.</p>

		<h2>Titles in multi-page templates</h2>

		<p>On multi-page documents, we follow a similar convention, but since all the pages share a common <code>title</code>, we have a <code>data-title</code> attribute that can be added to each page container within a multi-page template to manually define a title. The title of the HTML document will be automatically updated to match the <code>data-title</code> of the page currently in view.</p>

	<pre><code>
	&lt;div data-role=&quot;page&quot; id=&quot;foo&quot; <strong>data-title=&quot;Page Foo&quot;</strong>&gt;

	&lt;/div&gt;&lt;!-- /page --&gt;
	</code></pre>

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
