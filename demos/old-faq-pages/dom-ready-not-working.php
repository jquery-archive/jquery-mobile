<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile: Why isn't DOM ready working for my scripts?</title>
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

		<h1>Why isn't DOM ready working for my scripts?</h1>

		<h2>Answer:</h2>

		<p>One of the first things people learn in jQuery is to use the <code>$(document).ready()</code> function for executing DOM-specific code as soon as the DOM is ready (which often occurs long before the <code>onload</code> event). However, in jQuery Mobile site and apps, pages are requested and injected into the same DOM as the user navigates, so the DOM ready event is not as useful, as it only executes for the first page. To execute code whenever a new page is loaded and created in jQuery Mobile, you can bind to the <code>pagecreate</code> event. </p>

		<p>The <code>pagecreate</code> event is triggered on a page when it is initialized, right after initialization occurs. Most of jQuery Mobile's official widgets auto-initialize themselves based on this event, and you can set up your code to do the same.</p>
<pre><code>
$( document ).delegate("#aboutPage", "pagecreate", function() {
  alert('A page with an id of "aboutPage" was just created by jQuery Mobile!');
});
</code></pre>

	<p>If you'd like to manipulate a page's contents <em>before</em> the <code>pagecreate</code> event fires and widgets are auto-initialized, you can instead bind to the <code>pagebeforecreate</code> event:</p>

<pre><code>
$( document ).delegate("#aboutPage", "pagebeforecreate", function() {
  alert('A page with an id of "aboutPage" is about to be created by jQuery Mobile!');
});
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
