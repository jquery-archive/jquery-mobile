<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') { ?>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Ajax optimized persistent toolbars - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script id="shared-widget-init" src="shared-widget-init.js"></script>
</head>
<body>
    <div id="shared-header" data-role="header" data-position="fixed" data-theme="a">
		<!-- Shared header markup must be added to all pages of the demo to ensure any of them can
		     serve as the start page. The server can be instructed to omit sending this portion of
			 the data whenever the request for the document is made via Ajax. -->
		<a href="../toolbar/" data-rel="back" class="ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-carat-l">Back</a>
		<a href="#nav-menu" data-rel="popup" class="ui-btn ui-btn-right ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-right ui-icon-navigation">Navigation</a>
		<div data-role="popup" id="nav-menu" data-theme="a">
			<ul id="nav-menu-links">
				<li><a href="index.php" data-prefetch="true" data-transition="none">Info</a></li>
				<li><a href="page-b.php" data-prefetch="true" data-transition="flip">Friends</a></li>
				<li><a href="page-c.php" data-prefetch="true" data-transition="turn">Albums</a></li>
				<li><a href="page-d.php" data-prefetch="true" data-transition="slide">Emails</a></li>
			</ul>
		</div>
        <h1>Fixed external header</h1>
    </div><!-- /header -->
<?php } ?>
	<div data-role="page" class="jqm-demos">

	    <div class="ui-content jqm-content jqm-fullwidth" role="main">

			<h1>Ajax optimized Persistant Toolbars</h1>

			<p>These pages have been optimized on the server side to check if the request is coming from an Ajax request and if so they only send the actual page div instead of the entire page. If you navigate to any of the pages in the nav bar at the bottom and inspect the return data you will see it contains no head, toolbars, html tag, or body tag.</p>

			<p>However if you refresh the page all of these things will be present. This is done by checking the HTTP_X_REQUESTED_WITH header </p>

<pre><code>
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
</code></pre>

			<p>All of the markup not needed when being requested via Ajax is wrapped in if statements like the one above.</p>

		<h2>Shared scripts and widgets</h2>
		<p>Any one of the pages in this demo must be able to serve as the start page for your application. Thus, when accessed via plain HTTP, the server will return the full page, including references to jQuery and jQuery Mobile, as well as custom scripts which ensure that widgets shared by all the pages in the application are initialized at startup, no matter which page the user chooses as their start page.</p>
		<div data-demo-html="#shared-header,#shared-navbar" data-demo-js="#shared-widget-init"></div>

		</div><!-- /content -->

	</div><!-- /page -->

<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') { ?>
	<div id="shared-navbar" data-role="footer" data-position="fixed" data-theme="a">
		<!-- Shared navbar markup must be added to all pages of the demo to ensure any of them can
		     serve as the start page. The server can be instructed to omit sending this portion of
			 the data whenever the request for the document is made via Ajax. -->
		<div data-role="navbar">
			<ul>
				<li><a href="index.php" data-prefetch="true" data-transition="none">Info</a></li>
				<li><a href="page-b.php" data-prefetch="true" data-transition="flip">Friends</a></li>
				<li><a href="page-c.php" data-prefetch="true" data-transition="turn">Albums</a></li>
				<li><a href="page-d.php" data-prefetch="true" data-transition="slide">Emails</a></li>
			</ul>
		</div><!-- /navbar -->
	</div><!-- /footer -->

</body>
</html>
<?php } ?>
