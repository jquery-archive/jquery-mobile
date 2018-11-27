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
