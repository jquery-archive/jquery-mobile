<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8" /> 
	<title>jQuery Mobile Docs - Forms</title> 
	<link rel="stylesheet"  href="../../themes/default" /> 
	<script type="text/javascript" src="../../js/"></script>
</head> 
<body> 

<div data-role="page" data-theme="c">

	<div data-role="header" data-theme="e">
		<h1>Sample form response</h1>
	</div><!-- /header -->

	<div data-role="content" data-theme="c">
		
		<form action="index.html" method="get">
			
			<h2>You Chose:</h2>



			<?php
				echo "<p> " . $_REQUEST['shipping'] . "</p>";
			?>


	</form>
	
	</div><!-- /content -->
</div><!-- /page -->

</body>
</html>