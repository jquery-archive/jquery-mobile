<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listview Autodivider Linkbar - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="stylesheet" href="autodividers-linkbar.css" id="demo-style">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script src="autodividers-linkbar.js" id="demo-script"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Listview Autodivider Linkbar</h1>

		<p>This demo shows the linkbar extension that adds a fixed positioned bar on the right of the screen that makes it easy to anchor down to a specific part of a listview. View the source to see how it works.</p>

		<a href="autodividers-linkbar-demo.html" data-ajax="false" class="ui-shadow ui-button ui-corner-all ui-button-inline ui-mini ui-icon-end">Open demo<span class="ui-icon ui-icon-arrow-r"></span></a>

		<div data-demo-html="#demo-page" data-demo-js="#demo-script" data-demo-css="#demo-style"></div><!--/demo-html -->

    </div><!-- /content -->

    <?php include( '../jqm-navmenu.php' ); ?>

    <div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
        <p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
        <p>Copyright 2014 The jQuery Foundation</p>
    </div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

<!-- The markup below is a copy of the actual demo page just so we can show the markup in the "view source" -->

<div data-role="page" id="demo-page">

	<div data-role="header">
		<h1>Listview Autodivider Linkbar</h1>
		<a href="#" class="jqm-search-link ui-shadow ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
	</div><!-- /header -->

	<div role="main" class="ui-content">

        <div id="sorter">

            <ul data-role="listview">
                <li><span>A</span></li>
                <li><span>B</span></li>
                <li><span>C</span></li>
                <li><span>D</span></li>
                <li><span>E</span></li>
                <li><span>F</span></li>
                <li><span>G</span></li>
                <li><span>H</span></li>
                <li><span>I</span></li>
                <li><span>J</span></li>
                <li><span>K</span></li>
                <li><span>L</span></li>
                <li><span>M</span></li>
                <li><span>N</span></li>
                <li><span>O</span></li>
                <li><span>P</span></li>
                <li><span>Q</span></li>
                <li><span>R</span></li>
                <li><span>S</span></li>
                <li><span>T</span></li>
                <li><span>U</span></li>
                <li><span>V</span></li>
                <li><span>W</span></li>
                <li><span>X</span></li>
                <li><span>Y</span></li>
                <li><span>Z</span></li>
            </ul>
        </div><!-- /sorter -->

        <ul data-role="listview" data-autodividers="true" id="sortedList">
            <li><a href="#">Aaron</a></li>
            <li><a href="#">Adam</a></li>
            <li><a href="#">Alexander</a></li>
            <li><a href="#">Alice</a></li>
            <li><a href="#">Andrew</a></li>
            <li><a href="#">Anna</a></li>
            <li><a href="#">Anthony</a></li>
            <li><a href="#">Audrey</a></li>
            <li><a href="#">Benjamin</a></li>
            <li><a href="#">Brandon</a></li>
            <li><a href="#">Brody</a></li>
            <li><a href="#">Caleb</a></li>
            <li><a href="#">Cameron</a></li>
            <li><a href="#">Charlotte</a></li>
            <li><a href="#">Chloe</a></li>
            <li><a href="#">Christopher</a></li>
            <li><a href="#">Claire</a></li>
            <li><a href="#">Colin</a></li>
            <li><a href="#">Damien</a></li>
            <li><a href="#">Daniel</a></li>
            <li><a href="#">David</a></li>
            <li><a href="#">Dominic</a></li>
            <li><a href="#">Dylan</a></li>
            <li><a href="#">Edward</a></li>
            <li><a href="#">Elizabeth</a></li>
            <li><a href="#">Elliot</a></li>
            <li><a href="#">Emily</a></li>
            <li><a href="#">Emma</a></li>
            <li><a href="#">Ethan</a></li>
            <li><a href="#">Eva</a></li>
            <li><a href="#">Finn</a></li>
            <li><a href="#">Gabriel</a></li>
            <li><a href="#">Gavin</a></li>
            <li><a href="#">Grace</a></li>
            <li><a href="#">Hannah</a></li>
            <li><a href="#">Harry</a></li>
            <li><a href="#">Henry</a></li>
            <li><a href="#">Ian</a></li>
            <li><a href="#">Isaac</a></li>
            <li><a href="#">Isabel</a></li>
            <li><a href="#">Jack</a></li>
            <li><a href="#">Jackson</a></li>
            <li><a href="#">Jacob</a></li>
            <li><a href="#">James</a></li>
            <li><a href="#">Jason</a></li>
            <li><a href="#">John</a></li>
            <li><a href="#">Jonah</a></li>
            <li><a href="#">Jonathan</a></li>
            <li><a href="#">Julia</a></li>
            <li><a href="#">Kylie</a></li>
            <li><a href="#">Lauren</a></li>
            <li><a href="#">Leah</a></li>
            <li><a href="#">Liam</a></li>
            <li><a href="#">Lillian</a></li>
            <li><a href="#">Lucy</a></li>
            <li><a href="#">Luke</a></li>
            <li><a href="#">Lydia</a></li>
            <li><a href="#">Madeline</a></li>
            <li><a href="#">Mason</a></li>
            <li><a href="#">Matthew</a></li>
            <li><a href="#">Megan</a></li>
            <li><a href="#">Michael</a></li>
            <li><a href="#">Natalie</a></li>
            <li><a href="#">Nathan</a></li>
            <li><a href="#">Nicholas</a></li>
            <li><a href="#">Noah</a></li>
            <li><a href="#">Norah</a></li>
            <li><a href="#">Oliver</a></li>
            <li><a href="#">Olivia</a></li>
            <li><a href="#">Owen</a></li>
            <li><a href="#">Paige</a></li>
            <li><a href="#">Ruby</a></li>
            <li><a href="#">Ryan</a></li>
            <li><a href="#">Samuel</a></li>
            <li><a href="#">Sarah</a></li>
            <li><a href="#">Scarlett</a></li>
            <li><a href="#">Sebastian</a></li>
            <li><a href="#">Seth</a></li>
            <li><a href="#">Sophie</a></li>
            <li><a href="#">Thomas</a></li>
            <li><a href="#">Tristan</a></li>
            <li><a href="#">Tyler</a></li>
            <li><a href="#">Violet</a></li>
            <li><a href="#">Vivienne</a></li>
            <li><a href="#">William</a></li>
            <li><a href="#">Xavier</a></li>
            <li><a href="#">Zachary</a></li>
            <li><a href="#">Zoe</a></li>
        </ul><!-- /listview -->

    </div><!-- /content -->

    <div data-role="footer">
    	<h4>Footer</h4>
    </div><!-- /footer -->

</div><!-- /page -->

</body>
</html>
