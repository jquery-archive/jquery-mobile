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
	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
	</div><!-- /header -->
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	

	<div data-role="content" class="jqm-content">

			<h1>External Headers <a href="http://api.jquerymobile.com/header/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">
				The Header and footer on this page are positioned outside the page. They are before and after the page withing the body. These Toolbars will remain in the dom until manually removed. If you navigate to a page that does not have a header or footer within it these toolbars will persist. Otherwise they will hide to allow the page's internal header and footer to show. 
			</p>

			<h2>Header markup</h2>

			<p>The markup for external headers is identical to normal headers you just place the header outside the page within the body of your page</p>

			<h2>Auto Init</h2>

			<p>Because these toolbars are not within the page they will not auto initalize. You must call the toolbar plugin yourself on document ready.</p>

			<h2>Ajax Navigation</h2>

			<p>Because these toolbars are not within the page they will remain in the DOM until manually removed. However they will automatically hide if you navigate to a page containing a toolbar to allow the pages own toolbars to take their place. They will automatically show again if you navigate to a page containing no toolbars.</p>

			<p>Toolbars not within a page will not be pulled into the DOM during Ajax navigation.</p>

			<h2>Fixed External Toolbars</h2>

			<p>External toolbars can also be set to fixed positioning just like normal toolbars <a href="external-fixed.php" data-ajax="false">Fixed Position External Toolbars</a></p>

	</div><!-- /content -->

	

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
<div data-role="footer" class="jqm-footer">
	<p class="jqm-version"></p>
	<p>Copyright 2013 The jQuery Foundation</p>
</div><!-- /footer -->
</body>
</html>
