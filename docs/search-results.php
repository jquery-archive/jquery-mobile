<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="_assets/favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../js/jquery.js"></script>
	<script src="_assets/js/"></script>
	<script src="../js/"></script>

</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-index jqm-demos-search-results">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../"><img src="_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( 'search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h2>Search Results</h2>
        <div class="jqm-search-results-wrap">
	        <ul class="jqm-list jqm-search-results-list">
	            <?php include( 'nav-widgets.php' ); ?>
	            <?php include( 'nav-examples.php' ); ?>
	            <?php include( 'nav-faq.php' ); ?>
	        </ul>
	    </div>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /jqm-footer -->
<?php include( 'global-nav.php' ); ?>
</div><!-- /page -->
</body>
</html>
