<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navbar - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">
		<div data-role="tabs">
			<div data-role="navbar">
				<ul>
			      <li><a href="#one" data-theme="a" data-ajax="false">one</a></li>
			      <li><a href="#two"  data-theme="a" data-ajax="false">two</a></li>
			      <li><a href="ajax-content.php"  data-theme="a" data-ajax="false">three</a></li>
			    </ul>
			</div>
		
		<div id="one" class="ui-content">
			<h1>First tab contents</h1>
		</div>
		<div id="two" class="ui-content">
			<ul data-role="listview">
			    <li><a href="#">Acura</a></li>
			    <li><a href="#">Audi</a></li>
			    <li><a href="#">BMW</a></li>
			    <li><a href="#">Cadillac</a></li>
			    <li><a href="#">Ferrari</a></li>
			</ul>      
		</div>
</div>
		<div data-role="footer" class="jqm-footer">
			<p class="jqm-version"></p>
			<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	</div><!-- /page -->
	</body>
	</html>
