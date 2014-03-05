<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listview Responsve Grid - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="stylesheet" href="listview-grid.css" id="listview-grid-css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Listview Responsive Grid</h1>

        <p>A regular listview on smartphones, but grid tiles on tablets and larger screens? This demo shows you how you can accomplish this with custom CSS.</p>

        <h2>Starting points</h2>

        <p>Create a listview from an unordered list. For this demo we used an inset listview to show you how you can apply the corner styling to the tiles as well.</p>

        <p>In this demo there are two breakpoints. At the first breakpoint we swap from the regular stacked layout to a three column grid layout with tiles. At the second we switch from three to four columns.</p>

        <p>The list items have a thumbail. In the grid layout those will get the same size as the tile. One list item doesn't hold an image to demonstrate how you can take advantage of class <code>ui-li-has-thumb</code> to adjust the style.</p>

        <a href="listview-grid.html" data-ajax="false" class="ui-shadow ui-btn ui-corner-all ui-btn-inline ui-mini ui-icon-arrow-r ui-btn-icon-right">Open demo</a>

        <div data-demo-html="#demo-page" data-demo-css="#listview-grid-css"></div>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

<!-- The markup below is a copy of the actual demo page just so we can show the markup in the "view source" -->

<div data-role="page" data-theme="b" id="demo-page" class="my-page">

	<div data-role="header">
		<h1>Listview Responsive Grid</h1>
		<a href="./" data-shadow="false" data-iconshadow="false" data-icon="carat-l" data-iconpos="notext" data-rel="back" data-ajax="false">Back</a>
	</div><!-- /header -->

	<div role="main" class="ui-content">

        <ul data-role="listview" data-inset="true">
        	<li><a href="#">
            	<img src="../_assets/img/apple.png" class="ui-li-thumb">
            	<h2>iOS 6.1</h2>
                <p>Apple released iOS 6.1</p>
                <p class="ui-li-aside">iOS</p>
            </a></li>
        	<li><a href="#">
            	<img src="../_assets/img/blackberry_10.png" class="ui-li-thumb">
            	<h2>BlackBerry 10</h2>
                <p>BlackBerry launched the Z10 and Q10 with the new BB10 OS</p>
                <p class="ui-li-aside">BlackBerry</p>
            </a></li>
        	<li><a href="#">
            	<img src="../_assets/img/lumia_800.png" class="ui-li-thumb">
            	<h2>WP 7.8</h2>
                <p>Nokia rolls out WP 7.8 to Lumia 800</p>
                <p class="ui-li-aside">Windows Phone</p>
            </a></li>
        	<li><a href="#">
            	<img src="../_assets/img/galaxy_express.png" class="ui-li-thumb">
            	<h2>Galaxy</h2>
                <p>New Samsung Galaxy Express</p>
                <p class="ui-li-aside">Samsung</p>
            </a></li>
        	<li><a href="#">
            	<img src="../_assets/img/nexus_7.png" class="ui-li-thumb">
            	<h2>Nexus 7</h2>
                <p>Rumours about new full HD Nexus 7</p>
                <p class="ui-li-aside">Android</p>
            </a></li>
        	<li><a href="#">
            	<img src="../_assets/img/firefox_os.png" class="ui-li-thumb">
            	<h2>Firefox OS</h2>
                <p>ZTE to launch Firefox OS smartphone at MWC</p>
                <p class="ui-li-aside">Firefox</p>
            </a></li>
        	<li><a href="#">
            	<img src="../_assets/img/tizen.png" class="ui-li-thumb">
            	<h2>Tizen</h2>
                <p>First Samsung phones with Tizen can be expected in 2013</p>
                <p class="ui-li-aside">Tizen</p>
            </a></li>
        	<li><a href="#">
            	<h2>Symbian</h2>
                <p>Nokia confirms the end of Symbian</p>
                <p class="ui-li-aside">Symbian</p>
            </a></li>
        </ul>

    </div><!-- /content -->

</div><!-- /page -->

</body>
</html>
