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

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Listview Responsive Grid</h1>

        <p>A regular listview on smartphones, but grid tiles on tablets and larger screens? This demo shows you how you can accomplish this with custom CSS.</p>

        <h2>Starting points</h2>

        <p>Create a listview from an unordered list. For this demo we used an inset listview to show you how you can apply the corner styling to the tiles as well.</p>

        <p>In this demo there are two breakpoints. At the first breakpoint we swap from the regular stacked layout to a three column grid layout with tiles. At the second we switch from three to four columns.</p>

        <p>The list items have a thumbail. In the grid layout those will get the same size as the tile. One list item doesn't hold an image to demonstrate how you can take advantage of class <code>ui-listview-item-has-thumbnail</code> to adjust the style.</p>

        <a href="listview-grid.html" data-ajax="false" class="ui-shadow ui-button ui-corner-all ui-button-inline ui-mini">Open demo <span class="ui-icon ui-icon-arrow-r"></span></a>

        <div data-demo-html="#demo-page" data-demo-css="#listview-grid-css"></div>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

<!-- The markup below is a copy of the actual demo page just so we can show the markup in the "view source" -->

<div data-role="page" data-theme="b" id="demo-page" class="my-page">

	<div data-role="toolbar" data-type="header">
		<h1>Listview Responsive Grid</h1>
		<a href="./" data-shadow="false" data-iconshadow="false" data-icon="caret-l" data-iconpos="notext" data-rel="back" data-ajax="false">Back</a>
	</div><!-- /header -->

	<div role="main" class="ui-content">

        <ul data-role="listview" data-inset="true">
        	<li><a href="#">
				<img src="../_assets/img/apple.png" class="ui-listview-item-thumbnail">
            	<h2>iOS 6.1</h2>
                <p>Apple released iOS 6.1</p>
                <p class="ui-listview-item-aside">iOS</p>
            </a></li>
        	<li><a href="#">
				<img src="../_assets/img/blackberry_10.png" class="ui-listview-item-thumbnail">
            	<h2>BlackBerry 10</h2>
                <p>BlackBerry launched the Z10 and Q10 with the new BB10 OS</p>
                <p class="ui-listview-item-aside">BlackBerry</p>
            </a></li>
        	<li><a href="#">
				<img src="../_assets/img/lumia_800.png" class="ui-listview-item-thumbnail">
            	<h2>WP 7.8</h2>
                <p>Nokia rolls out WP 7.8 to Lumia 800</p>
                <p class="ui-listview-item-aside">Windows Phone</p>
            </a></li>
        	<li><a href="#">
				<img src="../_assets/img/galaxy_express.png" class="ui-listview-item-thumbnail">
            	<h2>Galaxy</h2>
                <p>New Samsung Galaxy Express</p>
                <p class="ui-listview-item-aside">Samsung</p>
            </a></li>
        	<li><a href="#">
				<img src="../_assets/img/nexus_7.png" class="ui-listview-item-thumbnail">
            	<h2>Nexus 7</h2>
                <p>Rumours about new full HD Nexus 7</p>
                <p class="ui-listview-item-aside">Android</p>
            </a></li>
        	<li><a href="#">
				<img src="../_assets/img/firefox_os.png" class="ui-listview-item-thumbnail">
            	<h2>Firefox OS</h2>
                <p>ZTE to launch Firefox OS smartphone at MWC</p>
                <p class="ui-listview-item-aside">Firefox</p>
            </a></li>
        	<li><a href="#">
				<img src="../_assets/img/tizen.png" class="ui-listview-item-thumbnail">
            	<h2>Tizen</h2>
                <p>First Samsung phones with Tizen can be expected in 2013</p>
                <p class="ui-listview-item-aside">Tizen</p>
            </a></li>
        	<li><a href="#">
            	<h2>Symbian</h2>
                <p>Nokia confirms the end of Symbian</p>
                <p class="ui-listview-item-aside">Symbian</p>
            </a></li>
        </ul>

    </div><!-- /content -->

</div><!-- /page -->

</body>
</html>
