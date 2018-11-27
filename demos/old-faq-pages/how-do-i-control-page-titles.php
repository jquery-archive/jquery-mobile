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

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
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
