<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Slider Tooltip Extension - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">
	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left" role="button">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right" role="button">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>Slider tooltip extension</h1>

        <div data-demo-html="true">
            <form>
              <label for="slider-1">Slider with tooltip:</label>
              <input type="range" name="slider-1" id="slider-1" min="0" max="100" value="50" data-popup-enabled="true">
              <label for="slider-2">Slider showing value on button:</label>
              <input type="range" name="slider-2" id="slider-2" min="0" max="100" value="50" data-show-value="true">
              <label for="slider-3">Both options together:</label>
              <input type="range" name="slider-3" id="slider-3" min="0" max="100" value="50" data-show-value="true" data-popup-enabled="true">
              <label for="slider-3">Both options together (mini):</label>
              <input type="range" name="slider-3" id="slider-3" min="0" max="100" value="50" data-show-value="true" data-popup-enabled="true" data-mini="true">
            </form>
        </div><!-- /demo-html -->

	</div><!-- /content -->

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
