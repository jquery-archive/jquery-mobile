<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Persistent toolbars - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$(function() {
			$( "[data-role='navbar']" ).navbar();
			$( "[data-role='header'], [data-role='footer']" ).toolbar();
		});
		// Update the contents of the toolbars
		$( document ).on( "pageshow", "[data-role='page']", function() {
			// Each of the four pages in this demo has a data-title attribute
			// which value is equal to the text of the nav button
			// For example, on first page: <div data-role="page" data-title="Info">
			var current = $( this ).jqmData( "title" );
			// Change the heading
			$( "[data-role='header'] h1" ).text( current );
			// Remove active class from nav buttons
			$( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
			// Add active class to current nav button
			$( "[data-role='navbar'] a" ).each(function() {
				if ( $( this ).text() === current ) {
					$( this ).addClass( "ui-btn-active" );
				}
			});
		});
	</script>
</head>
<body>
    <div data-role="header" data-position="fixed" data-theme="a">
		<a href="../toolbar/" data-rel="back" class="ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-carat-l">Back</a>
        <h1>Albums</h1>
    </div><!-- /header -->

<div data-role="page" data-title="Albums">

    <div class="ui-content" role="main">

			<ul data-role="listview" data-split-icon="gear" data-split-theme="a" data-inset="false">
				<li><a href="#">
					<img src="../_assets/img/album-bb.jpg">
				<h2>Broken Bells</h2>
				<p>Broken Bells</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../_assets/img/album-hc.jpg">
				<h2>Warning</h2>
				<p>Hot Chip</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../_assets/img/album-p.jpg">
				<h2>Wolfgang Amadeus Phoenix</h2>
				<p>Phoenix</p></a>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</li>
				<li><a href="#">
					<img src="../_assets/img/album-ok.jpg">
					<h3>Of The Blue Colour Of The Sky</h3>
				<p>Ok Go</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../_assets/img/album-ws.jpg">
					<h3>Elephant</h3>
				<p>The White Stripes</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../_assets/img/album-rh.jpg">
					<h3>Kid A</h3>
				<p>Radiohead</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../_assets/img/album-xx.jpg">
					<h3>XX</h3>
				<p>XX</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../_assets/img/album-mg.jpg">
					<h3>Congratulations</h3>
				<p>MGMT</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../_assets/img/album-ag.jpg">
					<h3>Ashes Grammar</h3>
				<p>A Sunny Day in Glasgow</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>

				<li><a href="index.html">
					<img src="../_assets/img/album-k.jpg">
					<h3>Hot Fuss</h3>
				<p>Killers</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
				<li><a href="#">
					<img src="../_assets/img/album-af.jpg">
					<h3>The Suburbs</h3>
				<p>Arcade Fire</p>
					<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a>
				</a></li>
			</ul>

			<div data-role="popup" id="purchase" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">
				<h3>Purchase Album?</h3>
				<p>Your download will begin immediately on your mobile device when you purchase.</p>
				<a href="#" class="ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-check" data-rel="back">Buy: $10.99</a>
				<a href="#" class="ui-btn ui-btn-inline ui-mini ui-corner-all ui-shadow" data-rel="back">Cancel</a>
			</div>

		</div><!-- /content -->

	</div><!-- /page -->

	<div data-role="footer" data-position="fixed" data-theme="a">
		<div data-role="navbar">
			<ul>
				<li><a href="index.php" data-prefetch="true" data-transition="fade">Info</a></li>
				<li><a href="page-b.php" data-prefetch="true" data-transition="flip">Friends</a></li>
				<li><a href="page-c.php" data-prefetch="true" data-transition="turn">Albums</a></li>
				<li><a href="page-d.php" data-prefetch="true" data-transition="slide">Emails</a></li>
			</ul>
		</div><!-- /navbar -->
	</div><!-- /footer -->

</body>
</html>
