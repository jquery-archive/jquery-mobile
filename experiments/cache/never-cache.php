<!DOCTYPE html> 
<html> 
<head>
	<meta charset="utf-8" /> 
	<title>jQuery Mobile Framework - Page Cache</title> 
	<link rel="stylesheet" href="../../themes/default/" />
	<script type="text/javascript" src="../../js"></script>
</head>
<body>
<div data-role="page" data-theme="a" data-cache="false">
	<div data-role="header">
		<h1>Page 2</h1>
	</div>
	
	<div data-role="content">
		This page is never cached. It means that when it is requested the second time, it will be reloaded.
	</div>
	
	<ul data-role="listview">
		<li>
			<a href="./cache-10-seconds.php">Next page</a>
		</li>
	</ul>
</div>
</body>
</html>