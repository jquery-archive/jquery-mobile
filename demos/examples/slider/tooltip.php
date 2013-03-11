<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Slider Tooltip Extension - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="slider.tooltip.css" id="tooltipStyle">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script src="slider.tooltip.js" id="tooltipCode"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">
	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>Slider tooltip extension</h1>

        <div data-demo-html="true" data-demo-js="#tooltipCode" data-demo-css="#tooltipStyle">
            <form>
              <label for="slider-1">Slider with tooltip:</label>
              <input type="range" name="slider-1" id="slider-1" min="0" max="100" value="50" data-popup-enabled="true">
              <label for="slider-2">Slider showing value on button:</label>
              <input type="range" name="slider-2" id="slider-2" min="0" max="100" value="50" data-show-value="true">
              <label for="slider-3">Both options together:</label>
              <input type="range" name="slider-3" id="slider-3" min="0" max="100" value="50" data-show-value="true" data-popup-enabled="true">
            </form>
        </div><!-- /demo-html -->

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
