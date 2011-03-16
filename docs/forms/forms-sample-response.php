<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1"> 
	<title>jQuery Mobile Docs - Forms</title> 
	<link rel="stylesheet"  href="../../themes/default/" />  
	<link rel="stylesheet" href="../_assets/css/jqm-docs.css"/>
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/"></script>
</head> 
<body> 

<div data-role="page" data-theme="c">

	<div data-role="header" data-theme="e">
		<h1>Sample form response</h1>
		<a href="../../" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home">Home</a>
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