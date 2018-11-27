<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Fixed Toolbars - jQuery Mobile Framework</title>
    <link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <script src="../../external/jquery/jquery.js"></script>
    <script src="../_assets/js/"></script>
    <script src="../../js/"></script>
    <style>
		.left {
			float: left;
			width: 78%;
			margin-right: 2%;
		}
		.right {
			float: right;
			width: 20%;
		}
		.ui-textinput-search {
			margin: 0;
		}
		button.ui-button {
			margin: 0;
		}
    </style>
</head>
<body>

	<div data-role="page" class="jqm-demos">

		<div data-role="toolbar" data-type="header" data-position="fixed">
			<a href="../toolbar/" data-rel="back" class="ui-button ui-toolbar-header-button-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-button-icon-only">Back <span class="ui-icon ui-icon-caret-l"></span></a>
			<h1>2,146 Songs</h1>
			<div class="ui-bar ui-bar-b">
				<form action="#" method="get">
					<div class="left">
						<label for="search" class="ui-hidden-accessible">Search Input:</label>
				        <input type="search" name="search" id="search" value="" placeholder="Search songs...">
					</div>
					<div class="right">
						<button type="submit" class="ui-button ui-button-a ui-corner-all ui-mini">Go</button>
					</div>
				</form>
			</div>
		</div><!-- /header -->

		<div class="ui-content" role="main">

			<ul data-role="listview" data-split-icon="gear">
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
			</ul>

			<div data-role="popup" id="purchase" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">
				<h3>Purchase Album?</h3>
				<p>Your download will begin immediately on your mobile device when you purchase.</p>
				<a href="#" class="ui-button ui-button-b ui-button-inline ui-mini ui-corner-all ui-shadow" data-rel="back">Buy: $10.99 <span class="ui-icon ui-icon-check"></span></a>
				<a href="#" class="ui-button ui-button-inline ui-mini ui-corner-all ui-shadow" data-rel="back">Cancel</a>
			</div>

		</div><!-- /content -->

		<div data-role="toolbar" data-type="footer" data-theme="b" data-position="fixed">
			<form action="#" method="get">
				<div class="ui-bar">
					<label for="slider">Volume:</label>
				 	<input type="range" name="slider" id="slider" value="50" min="0" max="100" data-highlight="true" data-mini="true">
				</div>
			</form>
		</div><!-- /footer -->

	</div><!-- /page -->

</body>
</html>
