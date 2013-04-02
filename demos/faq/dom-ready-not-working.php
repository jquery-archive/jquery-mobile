<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile: Why isn't DOM ready working for my scripts?</title>
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

			<h1>Why isn't DOM ready working for my scripts?</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">One of the first things people learn in jQuery is to use the <code>$(document).ready()</code> function for executing DOM-specific code as soon as the DOM is ready (which often occurs long before the <code>onload</code> event). However, in jQuery Mobile site and apps, pages are requested and injected into the same DOM as the user navigates, so the DOM ready event is not as useful, as it only executes for the first page. To execute code whenever a new page is loaded and created in jQuery Mobile, you can bind to the <code>pageinit</code> event. </p>

			<p>The <code>pageinit</code> event is triggered on a page when it is initialized, right after initialization occurs. Most of jQuery Mobile's official widgets auto-initialize themselves based on this event, and you can set up your code to do the same.</p>
<pre><code>
$( document ).delegate("#aboutPage", "pageinit", function() {
  alert('A page with an id of "aboutPage" was just created by jQuery Mobile!');
});
</code></pre>

	<p>If you'd like to manipulate a page's contents <em>before</em> the pageinit event fires and widgets are auto-initialized, you can instead bind to the <code>pagebeforecreate</code> event:</p>

<pre><code>
$( document ).delegate("#aboutPage", "pagebeforecreate", function() {
  alert('A page with an id of "aboutPage" is about to be created by jQuery Mobile!');
});
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
