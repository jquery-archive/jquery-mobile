<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup with arrow - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../../css/themes/default/jquery.mobile.css">
	<link id="arrowStyle" rel="stylesheet" href="jquery.mobile.popup.arrow.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script id="arrowSrc" src="popup.arrow.js"></script>
	<script>
$( document ).on( "click", function( e ) {
	if ( $( e.target ).parents( "#arrow-popup-demo-content" ).length > 0 ) {
		$( ".click-tracker" ).css( { left: e.pageX, top: e.pageY } );
		$( "#arrow-popup" ).popup( "open", { x: e.pageX, y: e.pageY } );
	}
});
	</script>
	<style>
		.really-tall {
			height: 5000px;
		}
		.click-tracker {
			position: absolute;
			width: 1px;
			height: 1px;
			background: yellow;
			left: -9999px;
			top: -9999px;
			border: 1px solid black;
			margin-left: -1px;
			margin-top: -1px;
		}
	</style>
</head>
<body>
<div data-role="page" id="demo-intro" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content" id="arrow-popup-demo-content">
		<div class="click-tracker"></div>
		<h1>Popup with arrow</h1>
		<div data-demo-html="true" data-demo-js="#arrowSrc" data-demo-css="#arrowStyle">
			<h3>Click anywhere in the square below to show the arrowed popup.</h3>
			<p>A dot will appear to show you where you have clicked.</p>
			<div data-role="popup" data-arrow="true" id="arrow-popup">
				<p>This is a popup containing several paragraphs of text.</p>
				<p>The first paragraph is the one above. This is the second.</p>
				<p>And here's another paragraph to help the popup achieve a decent height.</p>
			</div>
		</div>
		<a href="#"><div class="ui-body-c really-tall"></div></a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /jqm-footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
