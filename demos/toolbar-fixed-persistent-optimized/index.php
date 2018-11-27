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
	<script>
		$(function(){
			$("[data-role='navbar']").navbar();
			$("[data-role='toolbar']").toolbar();
		});
	</script>
</head>
<body>
    <div data-role="toolbar" data-type="header" data-position="fixed" data-theme="a">
		<a href="../toolbar/" data-rel="back" class="ui-button ui-toolbar-header-button-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-button-icon-only">Back <span class="ui-icon ui-icon-caret-l"></span></a>
        <h1>Fixed external header</h1>
    </div><!-- /header -->
<?php } ?>
	<div data-role="page" class="jqm-demos">

	    <div class="ui-content jqm-content jqm-fullwidth" role="main">

			<h1>Ajax optimized Persistant Toolbars</h1>

			<p>These pages have been optimized on the server side to check if the request is coming from an Ajax request and if so they only send the actual page div instead fo the entire page. If you navigate to any of the pages in the nav bar at the bottom and inspect the return data you will see it contains no head, toolbars, html tag, or body tag.</p>

			<p>However if you refresh the page all of these things will be present. This is done by checking the HTTP_X_REQUESTED_WITH header </p>

<pre><code>
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
</code></pre>

			<p>All of the markup not needed when being requested via Ajax is wrapped in if statements like the one above.</p>

		</div><!-- /content -->

	</div><!-- /page -->

<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') { ?>
	<div data-role="toolbar" data-type="footer" data-position="fixed" data-theme="a">
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
