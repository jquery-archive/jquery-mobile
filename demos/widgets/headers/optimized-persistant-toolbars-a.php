<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') { ?>
<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navbar - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script>
		$(function(){
			$("[data-role='navbar']").navbar();
			$("[data-role='header'], [data-role='footer']").toolbar();
		});
	</script>
</head>
<body>
	 <div data-role="header" class="jqm-header" data-position="fixed">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
    </div><!-- /header -->
<?php } ?>
<div data-role="page" class="jqm-demos">

    <div data-role="content" class="jqm-content">

			<h1>Ajax Optimized Persistant Toolbars <a href="http://api.jquerymobile.com/navbar/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>
			<p>These pages have been optimized on the server side to check if the request is coming from an ajax request and if so they only send the actual page div instead fo the entire page. If you navigate to any of the pages in the nav bar at the bottom and inspect the return data you will see it contains no head, toolbars, html tag, or body tag</p>
			<p>However if you refresh the page all of these things will be present</p>
			<p>This is done by checking the HTTP_X_REQUESTED_WITH header </p>
			<pre><code>
				if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
			</code></pre>
			<p>all of the markup not needed when being requested via ajax is wrapped in if statements like the one above.</p>
		</div><!-- /content -->

		

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->
<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') { ?>
	<div data-role="footer" data-position="fixed">
			<div data-role="navbar">
				<ul>
					<li><a href="optimized-persistant-toolbars-a.php" data-prefetch="true" data-transition="none">Info</a></li>
					<li><a href="optimized-persistant-toolbars-b.php" data-prefetch="true" data-transition="flip">Friends</a></li>
					<li><a href="optimized-persistant-toolbars-c.php" data-prefetch="true" data-transition="turn">Albums</a></li>
					<li><a href="optimized-persistant-toolbars-d.php" data-prefetch="true" data-transition="slide">Emails</a></li>
				</ul>
			</div><!-- /navbar -->
		</div><!-- /footer -->
	</body>
	</html>
	<?php } ?>
