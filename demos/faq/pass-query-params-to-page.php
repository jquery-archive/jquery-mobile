<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-faq">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
			<h2>Question:</h2>

			<h1>Why is only the first page of my multi page document loaded?</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">If you are trying to pass query parameters to an internal or embedded page this is not supported. This has to do with limitations in how jQuery mobile sets the data-url for pages. The data-url is set only once when the page is initialized.</p>

			<p>There are also currently three different plugins available for jQuery Mobile to support passing of query params to internal pages. </p>

			<ul>
				<li><a href="https://github.com/jblas/jquery-mobile-plugins/tree/master/page-params">A lightweight page params plugin</a></li>
				<li><a href="https://github.com/azicchetti/jquerymobile-router">A more fully featured jQuery Mobile router plugin for use with backbone.js or spine.js.</a></li>
				<li><a href="https://github.com/1Marc/jquery-mobile-routerlite">A very simple Routerlite plugin</a>
			</li>
			</ul>

			<a href="index.php" class="jqm-button" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-l" data-iconpos="left">All Questions &amp; Answers</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
