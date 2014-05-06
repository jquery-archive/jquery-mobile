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
    <div id="shared-header" data-role="header" data-position="fixed" data-theme="a">
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

			<ul data-role="listview" data-theme="a" data-dividertheme="b" data-filter="true" data-filter-theme="a" data-filter-placeholder="Search messages...">
				<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>
				<li><a href="#">
					<h3>Stephen Weber</h3>
				<p><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>
				<p>Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p>
					<p class="ui-li-aside"><strong>6:24</strong>PM</p>
				</a></li>
				<li><a href="#">
					<h3>jQuery Team</h3>
				<p><strong>Boston Conference Planning</strong></p>
				<p>In preparation for the upcoming conference in Boston, we need to start gathering a list of sponsors and speakers.</p>
					<p class="ui-li-aside"><strong>9:18</strong>AM</p>
				</a></li>
				<li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-li-count">1</span></li>
				<li><a href="#">
					<h3>Avery Walker</h3>
				<p><strong>Re: Dinner Tonight</strong></p>
				<p>Sure, let's plan on meeting at Highland Kitchen at 8:00 tonight. Can't wait! </p>
					<p class="ui-li-aside"><strong>4:48</strong>PM</p>
				</a></li>
				<li data-role="list-divider">Wednesday, October 6, 2010 <span class="ui-li-count">3</span></li>
				<li><a href="#">
					<h3>Amazon.com</h3>
				<p><strong>4-for-3 Books for Kids</strong></p>
				<p>As someone who has purchased children's books from our 4-for-3 Store, you may be interested in these featured books.</p>
					<p class="ui-li-aside"><strong>12:47</strong>PM</p>
				</a></li>
				<li><a href="#">
					<h3>Mike Taylor</h3>
				<p><strong>Re: This weekend in Maine</strong></p>
				<p>Hey little buddy, sorry but I can't make it up to vacationland this weekend. Maybe next weekend?</p>
					<p class="ui-li-aside"><strong>6:24</strong>AM</p>
				</a></li>
				<li><a href="#">
					<h3>Redfin</h3>
				<p><strong>Redfin listing updates for today</strong></p>
				<p>There are 3 updates for the home on your watchlist: 1 updated MLS listing and 2 homes under contract.</p>
					<p class="ui-li-aside"><strong>5:52</strong>AM</p>
				</a></li>
				<li data-role="list-divider">Tuesday, October 5, 2010 <span class="ui-li-count">3</span></li>
				<li><a href="info.php">
					<h3>Angela Smith</h3>
				<p><strong>Link Request</strong></p>
				<p>My name is Angela Smith, SEO Consultant. I've greatly enjoyed looking through your site and I was wondering if you'd be interested in providing a link</p>
					<p class="ui-li-aside"><strong>6:24</strong>AM</p>
				</a></li>
				<li><a href="info.php">
					<h3>Mike Taylor</h3>
				<p><strong>This weekend in Maine</strong></p>
				<p>Sounds good, let me check into our plans.</p>
					<p class="ui-li-aside"><strong>6:24</strong>AM</p>
				</a></li>
			</ul>

		</div><!-- /content -->

	</div><!-- /page -->

<?php if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest' || isset( $_GET['source'])) { ?>
	<div id="shared-navbar" data-role="footer" data-position="fixed" data-theme="a">
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
