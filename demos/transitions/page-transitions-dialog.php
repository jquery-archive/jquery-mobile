<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Transitions - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>

	<div data-role="page" id="dialog-success" data-dom-cache="true"><!-- dialog-->

		<div data-role="toolbar" data-type="header" data-theme="b">
			<h1>Dialog</h1>
		</div><!-- /header -->

		<div class="ui-content" role="main">
			<p>That was an animated page transition effect to a dialog that we added with a <code>data-transition</code> attribute on the link.</p>
			<p>Since it uses CSS animations, this should be hardware accelerated on many devices. To see transitions, 3D transform support is required so if you only saw a fade transition that's the reason.</p>

			<a href="index.php" class="ui-button ui-corner-all ui-shadow ui-button-b" data-rel="back">Take me back</a>
		</div>
	</div><!-- dialog-->

	<div data-role="page" id="page-success"></div>

</body>
</html>
