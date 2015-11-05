<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Fullscreen Fixed toolbars - jQuery Mobile Framework</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>

	<div data-role="page" class="jqm-demos">

	    <div data-role="toolbar" data-type="header" data-position="fixed" data-fullscreen="true">
			<a href="../toolbar/" data-rel="back" class="ui-button ui-toolbar-header-button-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-button-icon-only">Back <span class="ui-icon ui-icon-caret-l"></span></a>
	        <h1>Fullscreen fixed header</h1>
	    </div><!-- /header -->

	    <div class="ui-content" role="main">

			<img src="../_assets/img/newyork.jpg" alt="New York" style="width:100%; max-width:2048px; margin:0 auto; display:block;">

			<div class="jqm-content" style="margin-bottom:3em;">
				<p>This page demonstrates the "fullscreen" toolbar mode. This toolbar treatment is used in special cases where you want the content to fill the whole screen, and you want the header and footer toolbars to appear and disappear when the page is clicked responsively &mdash; a common scenario for photo, image or video viewers.</p>

				<p>To enable this toolbar feature type, you apply the <code>data-fullscreen="true"</code> attribute and the <code>data-position="fixed"</code> attribute to both the header and footer <code>div</code> elements. The framework will also unset the padding for the content container (<code>.ui-content</code>).</p>

				<p>Keep in mind that the toolbars in this mode will sit <strong>over</strong> page content, so not all content will be accessible with the toolbars visible.</p>
				<br>
			</div>

		</div><!-- /content -->

	    <div data-role="toolbar" data-type="footer" data-theme="a" data-position="fixed" data-fullscreen="true">
	    	<h1>Fullscreen fixed Footer</h1>
	    </div><!-- /footer -->

	</div><!-- /page -->

</body>
</html>
