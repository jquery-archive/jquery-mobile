<!DOCTYPE html> 
<html> 
<head>
	<meta charset="utf-8" /> 
	<title>jQuery Mobile Framework - Page Cache</title> 
	<link rel="stylesheet" href="../../themes/default/" />
	<script type="text/javascript" src="../../js"></script>
</head>
<body>
<div data-role="page" data-theme="a" data-cache="10">
	<div data-role="header">
		<h1>Page 3</h1>
	</div>
	
	<div data-role="content">
		This page is cached for 10 seconds only. Page was generated at <?= date('Y-m-d H:i:s') ?>
	</div>
</div>
</body>
</html>