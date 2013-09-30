<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>jQuery Mobile - Popup images</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>

	<script src="popup-examples.js"></script>
	<link rel="stylesheet" href="popup-examples.css" />

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

			<a href="index.php" data-role="button" data-transition="fade" data-icon="arrow-l" data-inline="true" data-mini="true">Back to Popups</a>
		<h1>Scaling images</h1>

		<p>The framework CSS contains rules that make images that are immediate children of the popup scale to fit the screen. Because of the absolute positioning of the popup container and screen, the height is not adjusted to screen height on all browsers. You can prevent vertical scrolling with a simple script that sets the <code>max-height</code> of the image.</p>

		<p>In the two examples below the divs with <code>data-role="popup"</code> have a class of <code>photopopup</code>. </p>

			<a href="#popupPhotoLandscape" data-rel="popup" data-position-to="window" data-role="button" data-theme="b" data-inline="true">Photo landscape</a>
			<a href="#popupPhotoPortrait" data-rel="popup" data-position-to="window" data-role="button" data-theme="b" data-inline="true" data-transition="fade">Photo portrait</a>

			<div data-role="popup" id="popupPhotoLandscape" class="photopopup" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" >
				<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><img src="../_assets/img/photo-landscape.jpg" alt="Photo landscape">
			</div>

			<div data-role="popup" id="popupPhotoPortrait" class="photopopup" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" >
				<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a><img src="../_assets/img/photo-portrait.jpg" alt="Photo portrait">
			</div>

		<p>The handler is bound to the <code>popupbeforeposition</code> event, which ensures the image is not only scaled before it is shown but also when the window is resized (e.g. orientation change). In this code example the height is reduced by 60 to take a top and bottom tolerance of 30 pixels into account.</p>

<pre><code>
$( document ).on( "pagecreate", function() {
    $( ".photopopup" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
        }
    });
});

</code></pre>

	</div><!-- /content -->

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
