<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="docs/_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="docs/_assets/favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="js/jquery.js"></script>
	<script src="docs/_assets/js/"></script>
	<script src="js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-home">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><img src="docs/_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></h1>
		<a href="#" class="jqm-search-link ui-btn-right" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( 'docs/search.php' ); ?>
	</div><!-- /header -->
	
	<div data-role="content" class="jqm-content">
		
		<p class="jqm-intro">jQuery Mobile is a touch-optimized HTML5 UI framework designed to make sites and apps that are accessible on all popular smartphone, tablet and desktop devices. <span class="jqm-version"></span></p>
		
		

		<ul data-role="listview" data-inset="true" data-theme="d" data-icon="false" data-filter-placeholder="Search..." class="jqm-list">
            <li><a href="docs/intro/"><h2>Introduction</h2><p>New to jQuery Mobile? Start here.</p></a></li>
            <li><a href="docs/examples/"><h2>Demo Showcase</h2><p>Examples of how to customize and extend jQuery Mobile.</p></a></li>
            <li><a href="docs/faq/"><h2>Questions &amp; Answers</h2><p>Common issues and questions, explained.</p></a></li>
			<li data-section="Widgets" data-filtertext="responsive web design rwd adaptive PE accessible mobile breakpoints media query"><a href="docs/intro/rwd.php"><h2>Responsive Web Design</h2><p>How use RWD with jQuery Mobile</p></a></li>
			<li><a href="http://api.jquerymobile.com"><h2>API documentation</h2><p>Visit the API site for full technical info.</p></a></li>
		</ul>
		
		<h2>Widget reference</h2>
		
		<p class="jqm-intro">Quick access to all the widgets in the library, ready to copy and paste.</p>
        
		<ul data-role="listview" data-inset="true" data-filter="true" data-theme="d" data-divider-theme="d" data-icon="false" data-filter-placeholder="Search widgets..." data-global-nav="docs" class="jqm-list">
        	<?php include( 'docs/nav-widgets.php' ); ?>
        </ul>


	</div><!-- /content -->
	
	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /jqm-footer -->
	
</div><!-- /page -->
</body>
</html>
