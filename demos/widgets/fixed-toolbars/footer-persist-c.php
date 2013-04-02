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
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header" data-position="fixed">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

    <div data-role="content" class="jqm-content jqm-fullwidth">

			<ul data-role="listview" data-split-icon="gear" data-split-theme="d" data-inset="false">
				<li><a href="#">
					<img src="../../_assets/img/album-bb.jpg" />
					<h2>Broken Bells</h2>
					<p>Broken Bells</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-hc.jpg" />
					<h2>Warning</h2>
					<p>Hot Chip</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-p.jpg" />
					<h2>Wolfgang Amadeus Phoenix</h2>
					<p>Phoenix</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../../_assets/img/album-ok.jpg" />
					<h3>Of The Blue Colour Of The Sky</h3>
					<p>Ok Go</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../../_assets/img/album-ws.jpg" />
					<h3>Elephant</h3>
					<p>The White Stripes</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../../_assets/img/album-rh.jpg" />
					<h3>Kid A</h3>
					<p>Radiohead</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../../_assets/img/album-xx.jpg" />
					<h3>XX</h3>
					<p>XX</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../../_assets/img/album-mg.jpg" />
					<h3>Congratulations</h3>
					<p>MGMT</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../../_assets/img/album-ag.jpg" />
					<h3>Ashes Grammar</h3>
					<p>A Sunny Day in Glasgow</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>

				<li><a href="index.html">
					<img src="../../_assets/img/album-k.jpg" />
					<h3>Hot Fuss</h3>
					<p>Killers</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../../_assets/img/album-af.jpg" />
					<h3>The Suburbs</h3>
					<p>Arcade Fire</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
			</ul>

			<div data-role="popup" id="purchase" data-theme="d" data-overlay-theme="b" class="ui-content" style="max-width:340px;">
				<h3>Purchase Album?</h3>
				<p>Your download will begin immediately on your mobile device when you purchase.</p>
				<a href="index.html" data-role="button" data-rel="back" data-theme="b" data-icon="check" data-inline="true" data-mini="true">Buy: $10.99</a>
				<a href="index.html" data-role="button" data-rel="back" data-inline="true" data-mini="true">Cancel</a>
			</div>

		</div><!-- /content -->

		<div data-role="footer" data-id="foo1" data-position="fixed">
			<div data-role="navbar">
				<ul>
					<li><a href="footer-persist-a.php" data-prefetch="true" data-transition="none">Info</a></li>
					<li><a href="footer-persist-b.php" data-prefetch="true" data-transition="none">Friends</a></li>
					<li><a href="footer-persist-c.php" data-prefetch="true" data-transition="none" class="ui-btn-active ui-state-persist">Albums</a></li>
					<li><a href="footer-persist-d.php" data-prefetch="true" data-transition="none">Emails</a></li>
				</ul>
			</div><!-- /navbar -->
		</div><!-- /footer -->

		<?php include( '../../global-nav.php' ); ?>

		</div><!-- /page -->
		</body>
		</html>
