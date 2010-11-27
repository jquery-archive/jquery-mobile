<!DOCTYPE html> 
<html> 
<head>
	<meta charset="utf-8" /> 
	<title>jQuery Mobile Framework - Page Cache</title> 
	<link rel="stylesheet" href="../../themes/default/" />
	<script type="text/javascript" src="../../js"></script>
</head>
<body>
<div data-role="page" data-theme="a">
	<div data-role="header">
		<h1>Page 1</h1>
	</div>
	
	<div data-role="content">
		This page is cached by default.
	</div>
	
	<ul data-role="listview">
		<li>
			<a href="./never-cache.php">Next page</a>
		</li>
	</ul>
</div>
</body>
</html>