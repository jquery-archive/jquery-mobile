<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8" /> 
	<title>jQuery Mobile Docs - Forms</title> 
	<link rel="stylesheet"  href="../../themes/default/" />  
	<link rel="stylesheet" href="../_assets/css/jqm-docs.css"/>
	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/"></script>
</head> 
<body> 

<div data-jq-role="page" data-jq-theme="c">

	<div data-jq-role="header" data-jq-theme="e">
		<h1>Sample form response</h1>
		<a href="../../" data-jq-icon="home" data-jq-iconpos="notext" data-jq-direction="reverse" class="ui-btn-right jqm-home">Home</a>
	</div><!-- /header -->

	<div data-jq-role="content" data-jq-theme="c">
		
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