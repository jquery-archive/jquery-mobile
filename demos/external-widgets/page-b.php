<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest' || isset( $_GET['source'])) { ?>
<!DOCTYPE html>
<html>
<!-- This is an example of an HTML document equipped to handle the startup of an application. It
     contains a <head> section common to all documents of the application, and its body contains
     the markup for all widgets that will be shared across pages. The body for each document of the
     application contains such markup. -->
<head>

	<!-- The various documents reachable from within your navigation system must all have the
	     necessary header information to be able to launch your application. Nevertheless, the
		 server only needs to send this header information with the first request by the user. On
		 Ajax requests by the application, this information can be discarded server-side in order
		 to save bandwidth and to improve the time it takes to display a page. -->
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

	<!-- This script contains the code that is shared between all the documents of your
	     application. It is responsible for enhancing the shared widgets during your application's
		 startup. -->
	<script id="shared-widget-init" src="shared-widget-init.js"></script>
</head>
<body>
	<!-- The following panel is shared across all pages of the application, and must therefore be
	     copied to all the documents containing the application's pages. It will only be loaded
		 once with the first page. On subsequent page loads the existing widget will be reused. -->
	<div id="shared-panel" data-role="panel" data-theme="a" data-position="right">
		<ul id="nav-menu-links" data-role="listview">
			<li data-icon="lock"><a href="#nav-menu" data-rel="popup">Login</a></li>
			<li><a href="info.php" data-prefetch="true" data-transition="none">Info</a></li>
			<li><a href="page-b.php" data-prefetch="true" data-transition="flip">Friends</a></li>
			<li><a href="page-c.php" data-prefetch="true" data-transition="turn">Albums</a></li>
			<li><a href="page-d.php" data-prefetch="true" data-transition="slide">Emails</a></li>
		</ul>
	</div>
    <div id="shared-header" data-role="toolbar" data-type="header" data-position="fixed" data-theme="a">
		<!-- Shared header markup must be added to all documents of the application to ensure any
             of them can serve as the start page. The server can be instructed to omit sending
             this portion of the data whenever the request for the document is made via Ajax. -->
		<a href="../toolbar/" data-rel="back" class="ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-caret-l">Back</a>
		<a href="#shared-panel" data-rel="panel" class="ui-btn ui-btn-right ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-right ui-icon-navigation">Navigation</a>
		<div data-role="popup" id="nav-menu" data-theme="a">
			<form class="ui-content">
				<label for="login-field">Login:</label>
				<input id="login-field" name="login">
				<label for="password-field">Password:</label>
				<input type="password" id="password-field" name="password">
			</form>
		</div>
        <h1>Fixed external header</h1>
    </div><!-- /header -->
<?php } ?>
	<!-- This is the actual page. It will always be sent to the client. -->
	<div data-role="page">

    	<div class="ui-content" role="main">

			<ul data-role="listview" data-theme="a" data-dividertheme="b" data-filter="true" data-filter-theme="a" data-filter-placeholder="Search friends...">
				<li data-role="list-divider">A</li>
				<li><a href="#">Adam Kinkaid</a></li>
				<li><a href="#">Alex Wickerham</a></li>
				<li><a href="#">Avery Johnson</a></li>
				<li data-role="list-divider">B</li>
				<li><a href="#">Bob Cabot</a></li>
				<li data-role="list-divider">C</li>
				<li><a href="#">Caleb Booth</a></li>
				<li><a href="#">Christopher Adams</a></li>
				<li><a href="#">Culver James</a></li>
				<li data-role="list-divider">D</li>
				<li><a href="#">David Walsh</a></li>
				<li><a href="#">Drake Alfred</a></li>
				<li data-role="list-divider">E</li>
				<li><a href="#">Elizabeth Bacon</a></li>
				<li><a href="#">Emery Parker</a></li>
				<li><a href="#">Enid Voldon</a></li>
				<li data-role="list-divider">F</li>
				<li><a href="#">Francis Wall</a></li>
				<li data-role="list-divider">G</li>
				<li><a href="#">Graham Smith</a></li>
				<li><a href="#">Greta Peete</a></li>
				<li data-role="list-divider">H</li>
				<li><a href="#">Harvey Walls</a></li>
				<li data-role="list-divider">M</li>
				<li><a href="#">Mike Farnsworth</a></li>
				<li><a href="#">Murray Vanderbuilt</a></li>
				<li data-role="list-divider">N</li>
				<li><a href="#">Nathan Williams</a></li>
				<li data-role="list-divider">P</li>
				<li><a href="#">Paul Baker</a></li>
				<li><a href="#">Pete Mason</a></li>
				<li data-role="list-divider">R</li>
				<li><a href="#">Rod Tarker</a></li>
				<li data-role="list-divider">S</li>
				<li><a href="#">Sawyer Wakefield</a></li>
			</ul>

		</div><!-- /content -->

	</div><!-- /page -->

<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest' || isset( $_GET['source'])) { ?>
	<div id="shared-navbar" data-role="toolbar" data-type="footer" data-position="fixed" data-theme="a">
		<!-- Shared navbar markup must be added to all documents of the application to ensure any
             of them can serve as the start page. The server can be instructed to omit sending
             this portion of the data whenever the request for the document is made via Ajax. -->
		<div data-role="navbar">
			<ul>
				<li><a href="info.php" data-prefetch="true" data-transition="none">Info</a></li>
				<li><a href="page-b.php" data-prefetch="true" data-transition="flip">Friends</a></li>
				<li><a href="page-c.php" data-prefetch="true" data-transition="turn">Albums</a></li>
				<li><a href="page-d.php" data-prefetch="true" data-transition="slide">Emails</a></li>
			</ul>
		</div><!-- /navbar -->
	</div><!-- /footer -->

</body>
</html>
<?php } ?>
