<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../js/jquery.js"></script>
	<script src="_assets/js/"></script>
	<script src="../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-home">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><img src="_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></h1>
		<a href="#" class="jqm-search-link ui-btn-right" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( 'search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<div class="jqm-home-welcome">
		<h2>Demo center for <span class="jqm-version-number"></span></h2>
		
		<p class="jqm-intro">jQuery Mobile is a touch-optimized HTML5 UI framework designed to make sites and apps that are accessible on all popular smartphone, tablet and desktop devices.</p>

        <p class="jqm-intro"><small>For technical info,&nbsp;visit the <a href="#api-popup" data-rel="popup" data-transition="slideup" data-position-to="window">API documentation</a>.</small></p>
		
		</div>
		
		<div data-role="popup" id="api-popup" class="home-pop ui-content" data-theme="d" data-overlay-theme="b">
			<p>The API docs are a separate site from the demos and cover the technical details of each jQuery Mobile plugin in depth.</p>
			<a href="#" data-role="button" data-inline="true" data-rel="back"  data-mini="true" data-theme="c">Stay here</a>
			<a href="http://api.jquerymobile.com" class="jqm-button" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" data-theme="f">Visit API Site </a>
		</div>

		<ul data-role="listview" data-inset="true" data-theme="d" data-icon="false" data-filter-placeholder="Search..." class="jqm-list jqm-home-list">
            <li><a href="intro/"><h2>Introduction</h2><p>New to jQuery Mobile? Start here.</p></a></li>
            <li><a href="examples/"><h2>Demo Showcase</h2><p>Examples of how to customize and extend jQuery Mobile.</p></a></li>
            <li><a href="faq/"><h2>Questions &amp; Answers</h2><p>Common issues and questions, explained.</p></a></li>
			<li data-section="Widgets" data-filtertext="responsive web design rwd adaptive PE accessible mobile breakpoints media query"><a href="intro/rwd.php"><h2>Going Responsive</h2><p>How to use RWD with jQuery Mobile</p></a></li>
		</ul>

		<h2 class="jqm-home-widget">Widget reference</h2>

		<p class="jqm-intro">Test drive every component in the library, and easily build pages by copying and pasting the markup configuration you need.</p>

		<ul data-role="listview" data-inset="true" data-filter="true" data-theme="d" data-divider-theme="d" data-icon="false" data-filter-placeholder="Search widgets..." data-global-nav="demos" class="jqm-list">
        	<?php include( 'nav-widgets.php' ); ?>
        </ul>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /jqm-footer -->

</div><!-- /page -->
</body>
</html>
