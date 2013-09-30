<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Tabs - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left" role="button">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right" role="button">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>Tabs</h1>

		<p>The jQuery mobile tabs widget is actually just an extension of the jQuery ui tabs widget and takes all the same options and methods</p>
			</p>
		<h2>Use navbar for tabs</h2>
			<div data-role="tabs" id="tabs">
		      <div data-role="navbar">
			    <ul>
			      <li><a href="#one" data-ajax="false">one</a></li>
			      <li><a href="#two" data-ajax="false">two</a></li>
			      <li><a href="ajax-content.php" data-ajax="false">three</a></li>
			    </ul>
		      </div>
		      <div id="one" class="ui-body-d ui-content">
		        <h1>First tab contents</h1>
		      </div>
		      <div id="two">
		        <ul data-role="listview" data-inset="true">
		            <li><a href="#">Acura</a></li>
		            <li><a href="#">Audi</a></li>
		            <li><a href="#">BMW</a></li>
		            <li><a href="#">Cadillac</a></li>
		            <li><a href="#">Ferrari</a></li>
		        </ul>      
		      </div>
		    </div>
		    <h2>Use inset listview for tabs</h2>
		    <div data-role="tabs">
		      	<ul data-role="listview" data-inset="true" class="tabs-list-left">
			      <li><a href="#one" data-ajax="false">one</a></li>
			      <li><a href="#two" data-ajax="false">two</a></li>
			      <li><a href="ajax-content.php" data-ajax="false">three</a></li>
			    </ul>
			    <div id="one" class="ui-body-d tabs-list-content">
		        <h1>First tab contents</h1>
		      </div>
		      
		        <ul id="two" class="tabs-list-content" data-role="listview" data-inset="true">
		            <li><a href="#">Acura</a></li>
		            <li><a href="#">Audi</a></li>
		            <li><a href="#">BMW</a></li>
		            <li><a href="#">Cadillac</a></li>
		            <li><a href="#">Ferrari</a></li>
		        </ul>      
		      
		    </div>
		    <h2>Tabbed page content</h2>
		    <p>You can also use tabs to swap out an enitre pages content <a data-ajax="false" href="tabbed-content.php">Tabbed Content Pages</a></p>

		</div><!-- /content -->

		<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	<?php include( '../jqm-panels.php' ); ?>

	</div><!-- /page -->
	</body>
	</html>
