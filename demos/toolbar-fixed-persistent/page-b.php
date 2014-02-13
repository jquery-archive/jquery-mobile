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
	<script src="../../external/jquery/jquery.js"></script>
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
        <h1>Friends</h1>
    </div><!-- /header -->

	<div data-role="page" data-title="Friends">

	    <div class="ui-content" role="main">

				<ul data-role="listview" data-theme="a" data-dividertheme="e" data-filter="true" data-filter-theme="a" data-filter-placeholder="Search friends...">
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
