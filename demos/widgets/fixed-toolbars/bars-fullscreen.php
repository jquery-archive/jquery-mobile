<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Fullscreen Fixed toolbars - jQuery Mobile Framework</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" data-position="fixed" data-theme="f" data-fullscreen="true">
        <h1>Fullscreen fixed header</h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
    </div>

    <div data-role="content" class="jqm-content">

		<p style="margin-top:0;text-align:center;"><img src="../../_assets/img/photo-run.jpeg" alt="Photo Run"></p>

		<p class="ui-body">This page demonstrates the "fullscreen" toolbar mode. This toolbar treatment is used in special cases where you want the content to fill the whole screen, and you want the header and footer toolbars to appear and disappear when the page is clicked responsively &mdash; a common scenario for photo, image or video viewers.</p>

		<p class="ui-body">To enable this toolbar feature type, you apply the <code>data-fullscreen="true"</code> attribute and the <code>data-position="fixed"</code> attribute to both the header and footer <code>div</code> elements, or whichever you want to be full-screen. </p>

		<p class="ui-body">Keep in mind that the toolbars in this mode will sit <strong>over</strong> page content, so not all content will be accessible with the toolbars open, just as shown in this demo.</p>

	</div><!-- /content -->

    <div data-role="footer" data-theme="a" data-position="fixed" data-fullscreen="true">
    	<h1>Fullscreen Fixed Footer</h1>
    </div>

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->

</body>
</html>
