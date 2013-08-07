<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Grid Listview - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="grid-listview.css" id="grid-listview-css">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

        <h1>Grid Listview</h1>

        <p class="jqm-intro">A regular listview on smartphones, but grid tiles on tablets and larger screens? This demo shows you how you can accomplish this with custom CSS.</p>

        <h2>Starting points</h2>

        <p>Create a listview from an unordered list. For this demo we used an inset listview to show you how you can apply the corner styling to the tiles as well.</p>

        <p>In this demo there are two breakpoints. At the first breakpoint we swap from the regular stacked layout to a three column grid layout with tiles. At the second we switch from three to four columns.</p>

        <p>The list items have a thumbail. In the grid layout those will get the same size as the tile. One list item doesn't hold an image to demonstrate how you can take advantage of class <code>ui-li-has-thumb</code> to adjust the style.</p>

        <a href="grid-listview-demo.html" class="jqm-button" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right">Open demo</a>

        <div data-demo-html="#demo-page" data-demo-css="#grid-listview-css"></div>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->

<!-- The markup below is a copy of the actual demo page just so we can show the markup in the "view source" -->

<div data-role="page" data-theme="a" id="demo-page" class="my-page">

	<div data-role="header">
		<h1>News</h1>
		<a href="grid-listview.html" data-shadow="false" data-iconshadow="false" data-icon="arrow-l" data-iconpos="notext" data-rel="back" data-ajax="false">Back</a>
	</div><!-- /header -->

	<div data-role="content">

        <ul data-role="listview" data-inset="true">
        	<li><a href="#">
            	<img src="../../_assets/img/apple.png">
            	<h2>iOS 6.1</h2>
                <p>Apple released iOS 6.1</p>
                <p class="ui-li-aside">iOS</p>
            </a></li>
        	<li><a href="#">
            	<img src="../../_assets/img/blackberry_10.png">
            	<h2>BlackBerry 10</h2>
                <p>BlackBerry launched the Z10 and Q10 with the new BB10 OS</p>
                <p class="ui-li-aside">BlackBerry</p>
            </a></li>
        	<li><a href="#">
            	<img src="../../_assets/img/lumia_800.png">
            	<h2>WP 7.8</h2>
                <p>Nokia rolls out WP 7.8 to Lumia 800</p>
                <p class="ui-li-aside">Windows Phone</p>
            </a></li>
        	<li><a href="#">
            	<img src="../../_assets/img/galaxy_express.png">
            	<h2>Galaxy</h2>
                <p>New Samsung Galaxy Express</p>
                <p class="ui-li-aside">Samsung</p>
            </a></li>
        	<li><a href="#">
            	<img src="../../_assets/img/nexus_7.png">
            	<h2>Nexus 7</h2>
                <p>Rumours about new full HD Nexus 7</p>
                <p class="ui-li-aside">Android</p>
            </a></li>
        	<li><a href="#">
            	<img src="../../_assets/img/firefox_os.png">
            	<h2>Firefox OS</h2>
                <p>ZTE to launch Firefox OS smartphone at MWC</p>
                <p class="ui-li-aside">Firefox</p>
            </a></li>
        	<li><a href="#">
            	<img src="../../_assets/img/tizen.png">
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

    <div data-role="footer" data-theme="none">
        <h3>Responsive Grid Listview</h3>
    </div><!-- /footer -->

</div><!-- /page -->
</body>
</html>
