<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Headers - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script>
		$(function(){
			$("[data-role='header'], [data-role='footer']").toolbar();
		});
	</script>
</head>
<body>
	<div data-role="header" class="jqm-header" data-position="fixed">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
	</div><!-- /header -->
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	

	<div data-role="content" class="jqm-content">

			<h1>Fixed External Headers <a href="http://api.jquerymobile.com/header/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="carat-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">The Header and footer on this page are outside of the page within the body. They have been set to position fixed.</p>

			<h2>True Persistant Toolbars</h2>

			<p>Because External toolbars are outside of the page they are not effected by transition and make truely persistant toolbars possible</p>

			<p><a href="footer-persist-a.php" data-ajax="false">Persistant Footer</a></p>

			

	</div><!-- /content -->

	

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
<div data-role="footer" class="jqm-footer" data-position="fixed" style="background-color:white;">
	<p class="jqm-version"></p>
	<p>Copyright 2013 The jQuery Foundation</p>
</div><!-- /footer -->
</body>
</html>
