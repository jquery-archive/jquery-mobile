<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navbar - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">
	<div data-demo-html="true">
		<div data-role="tabs">
			<div data-role="navbar">
				<ul>
					<li><a href="#one" data-theme="a" data-ajax="false">one</a></li>
					<li><a href="#two" data-theme="a" data-ajax="false">two</a></li>
					<li><a href="ajax-content-ignore.php" data-theme="a" data-ajax="false">three</a></li>
				</ul>
			</div><!-- /navbar -->

			<div id="one" class="ui-content">
				<h1>First tab contents</h1>
			</div><!-- /one -->
			<div id="two" class="ui-content">
				<ul data-role="listview">
				    <li><a href="#">Acura</a></li>
				    <li><a href="#">Audi</a></li>
				    <li><a href="#">BMW</a></li>
				    <li><a href="#">Cadillac</a></li>
				    <li><a href="#">Ferrari</a></li>
				</ul>
			</div><!-- /two -->
		</div><!-- /tabs -->
		<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
			<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
			<p>Copyright jQuery Foundation</p>
		</div><!-- /footer -->
	</div><!-- /demo-html -->

</div><!-- /page -->

</body>
</html>
