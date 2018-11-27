<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>External Widgets - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

    <div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
        <a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">
		<h1>External Widgets and Ajax Navigation</h1>
		<p>Toolbars such as headers and footers, popups, panels, and many other widgets can be placed outside jQuery Mobile pages. When you use them outside pages, you should keep in mind that you must structure your application such that the widgets work together with the Ajax navigation.</p>
		<p>When Ajax navigation is used in combination with the pushState plugin, the location bar is updated to show the URL of the file that has been loaded via Ajax. This implies that the user may copy that URL and launch your application with a starting URL that is different from the one you had intended. For example, if your application contains two or more documents and if the pages inside the documents contain links to one another, then both documents must be equipped to handle your application's startup. This means that you have to copy script references into the <code>&lt;head&gt;</code> section of each document, and you must also copy external shared widgets (widgets that are not inside the page, but which are seen and/or used from both pages) to the <code>&lt;body&gt;</code> section of both documents.</p>
		<p>Since navigation from one page to the other involves retrieving the other page via Ajax, and since jQuery Mobile discards everything received in an Ajax call except for the first page, you may wish to optimize all your pages using server-side scripting to instruct the server to send the full document with headers, shared widgets, and page, whenever it is retrieved via an HTTP request, but to only send the page when the document is accessed via an Ajax request. This will save bandwidth for the user and reduce load times for your application.</p>
		<p>You can use and if-statement similar to the following to wrap external widgets and the document's <code>&lt;head&gt;</code> section, causing them to be included in a HTTP request, but be excluded from an Ajax request:</p>
<pre><code>
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
// Markup inside the body of this if-statement is only sent with HTTP requests
</code></pre>
	<a href="info.php" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-caret-r ui-btn-icon-right" data-ajax="false">Open Demo</a>
	<div data-demo-html="./info.php?source=true" data-demo-js="./shared-widget-init.js"></div>
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
