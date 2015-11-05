<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Panel styling - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style>
		/* Adjust the width of the left reveal menu. */
		#demo-page #left-panel.ui-panel {
			width: 15em;
		}
		#demo-page #left-panel.ui-panel-closed {
			width: 0;
		}
		#demo-page .ui-panel-page-content-position-left,
		.ui-panel-dismiss-open.ui-panel-dismiss-position-left {
			left: 15em;
			right: -15em;
		}
		#demo-page .ui-panel-animate.ui-panel-page-content-position-left.ui-panel-page-content-display-reveal {
			left: 0;
			right: 0;
			-webkit-transform: translate3d(15em,0,0);
			-moz-transform: translate3d(15em,0,0);
			transform: translate3d(15em,0,0);
		}

		/* Listview with collapsible list items. */
	    .ui-listview > li .ui-collapsible-heading {
	      margin: 0;
	    }
	    .ui-collapsible.ui-listview-item-static {
	      padding: 0;
	      border: none !important;
	    }
	    .ui-collapsible + .ui-collapsible > .ui-collapsible-heading > .ui-button {
	      border-top: none !important;
	    }
	    /* Nested list button colors */
	    .ui-listview .ui-listview .ui-button {
	    	background: #fff;
	    }
	    .ui-listview .ui-listview .ui-button:hover {
	    	background: #f5f5f5;
	    }
	    .ui-listview .ui-listview .ui-button:active {
	    	background: #f1f1f1;
	    }

		/* Reveal panel shadow on top of the listview menu (only to be used if you don't use fixed toolbars) */
		#demo-page .ui-panel-display-reveal {
			-webkit-box-shadow: none;
			-moz-box-shadow: none;
			box-shadow: none;
		}
		#demo-page .ui-panel-page-content-position-left {
			-webkit-box-shadow: -5px 0px 5px rgba(0,0,0,.15);
			-moz-box-shadow: -5px 0px 5px rgba(0,0,0,.15);
			box-shadow: -5px 0px 5px rgba(0,0,0,.15);
		}

		/* Setting a custom background image. */
		#demo-page.ui-page-theme-a,
		#demo-page .ui-panel-wrapper {
			background-color: #fff;
			background-image: url("../_assets/img/bg-pattern.png");
			background-repeat: repeat-x;
			background-position: left bottom;
		}

		/* Styling of the page contents */
		.article p {
			margin: 0 0 1em;
			line-height: 1.5;
		}
		.article p img {
			max-width: 100%;
		}
		.article p:first-child {
			text-align: center;
		}
		.article small {
			display: block;
			font-size: 75%;
			color: #c0c0c0;
		}
		.article p:last-child {
			text-align: right;
		}
		.article a.ui-button {
			margin-right: 2em;
		}
		@media all and (min-width:769px) {
			.article {
				max-width: 994px;
				margin: 0 auto;
				padding-top: 4em;
				-webkit-column-count: 2;
				-moz-column-count: 2;
				column-count: 2;
				-webkit-column-gap: 2em;
				-moz-column-gap: 2em;
				column-gap: 2em;
			}
		}
	</style>
</head>
<body>
<div data-role="page" class="jqm-demos" id="demo-intro">

    <div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Panel styling</h1>

        <p>In this demo we show you how to:</p>

        <ul>
            <li>Change the width of a panel.</li>
            <li>Create a panel navmenu with listviews and collapsibles.</li>
            <li>Change the shadow of a reveal menu so it is on top of the list items.</li>
        	<li>Set a background image for a page that contains a panel.</li>
            <li>Give the page a responsive layout with CSS columns.</li>
        </ul>

        <p>Click the "view source" button to see the CSS and markup of this demo and open the demo to see the result.</p>

        <a href="#demo-page" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini ui-nodisc-icon ui-alt-icon">Open demo <span class="ui-icon ui-icon-caret-r"></span></a>

        <div data-demo-html="#demo-page" data-demo-css="true"></div><!--/demo-html -->

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

<div data-role="page" id="demo-page">

    <div data-role="toolbar" data-type="header">
        <h1>Bikes</h1>
		<a href="#left-panel" class="ui-button ui-button-icon-only ui-corner-all ui-toolbar-header-button-left"><span class="ui-icon ui-icon-bars"></span>Menu</a>
    </div><!-- /header -->

    <div role="main" class="ui-content">

    	<div class="article">
    		<p><img src="../_assets/img/bike.jpg" alt="Fixed Gear bike"></p>

            <h2>Fixed Gear</h2>

            <p>A fixed-gear or fixed-wheel bicycle, commonly known as a fixie, is a bicycle that has a drivetrain with no freewheel mechanism. The freewheel was developed early in the history of bicycle design but the fixed-gear bicycle remained the standard track racing design. More recently the 'fixie' has become a popular alternative among mainly urban cyclists, offering the advantages of simplicity compared with the standard multi-geared bicycle.</p>

            <p><small>Source: Wikipedia</small></p>

            <p><a href="#right-panel" class="ui-button ui-shadow ui-corner-all ui-button-inline ui-mini">Share</a></p>

		</div><!-- /article -->

    </div><!-- /content -->

    <div data-role="panel" id="left-panel">

        <ul data-role="listview">
        	<li data-icon="delete"><a href="#" data-rel="close">Close</a></li>
        	<li data-icon="back"><a href="#demo-intro" data-rel="back">Demo intro</a></li>
        	<li data-role="list-divider">Categories</li>

	        <li data-role="collapsible" data-inset="false" data-iconpos="right">

	          <h3>Bikes</h3>

	          <ul data-role="listview">
	            <li><a href="#">Road</a></li>
	            <li><a href="#">ATB</a></li>
	            <li><a href="#">Fixed Gear</a></li>
	            <li><a href="#">Cruiser</a></li>
	          </ul>

	        </li><!-- /collapsible -->

	        <li data-role="collapsible" data-inset="false" data-iconpos="right">

	          <h3>Cars</h3>

	          <ul data-role="listview">
	            <li><a href="#">SUV</a></li>
	            <li><a href="#">Sport</a></li>
	            <li><a href="#">Convertible</a></li>
	          </ul>

	        </li><!-- /collapsible -->

	        <li data-role="collapsible" data-inset="false" data-iconpos="right">

	          <h3>Boats</h3>

	          <ul data-role="listview">
	            <li><a href="#">Runabout</a></li>
	            <li><a href="#">Motorboat</a></li>
	            <li><a href="#">Sailboat</a></li>
	          </ul>

	        </li><!-- /collapsible -->

        </ul>

    </div><!-- /panel -->

    <div data-role="panel" id="right-panel" data-display="overlay" data-position="right">

        <ul data-role="listview" data-icon="false">
        	<li data-icon="delete"><a href="#" data-rel="close">Close</a></li>
        	<li data-role="list-divider">Share this page</li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Google +</a></li>
            <li><a href="#">Mail</a></li>
        </ul>

    </div><!-- /panel -->

</div><!-- /page -->

</body>
</html>
