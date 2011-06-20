<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>jQuery Mobile Docs - Sample form response</title> 
	<link rel="stylesheet"  href="../../themes/default/" />  
	<link rel="stylesheet" href="../_assets/css/jqm-docs.css"/>
	<script src="../../js/jquery.js"></script>
	<script src="../../experiments/themeswitcher/jquery.mobile.themeswitcher.js"></script>
	<script src="../_assets/js/jqm-docs.js"></script>
	<script src="../../js/"></script>
</head> 
<body> 

	<div data-role="page" class="type-interior">

		<div data-role="header" data-theme="e">
		<h1>Sample form response</h1>
		<a href="../../" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home">Home</a>
	</div><!-- /header -->

	<div data-role="content" data-theme="c">
		<div class="content-primary">
		
		<form action="index.html" method="get">
			
			<h2>You Chose:</h2>



			<?php
				echo "<p> " . $_REQUEST['shipping'] . "</p>";
			?>


	</form>
	
	</div><!--/content-primary -->		
	
	<div class="content-secondary">
		
		<div data-role="collapsible" data-collapsed="true" data-theme="b">
			
				<h3>Demos &amp; Docs Sections</h3>
				
				<ul data-role="listview" data-theme="c" data-dividertheme="d">
				
					<li data-role="list-divider">Components</li>
					<li><a href="../../docs/pages/index.html">Pages &amp; dialogs</a></li>
					<li><a href="../../docs/toolbars/index.html">Toolbars</a></li>
					<li><a href="../../docs/buttons/index.html">Buttons</a></li>
					<li><a href="../../docs/content/index.html">Content formatting</a></li>
					<li data-theme="a"><a href="../../docs/forms/index.html">Form elements</a></li>
					<li><a href="../../docs/lists/index.html">List views</a></li>
	
				</ul>
		</div>
	</div>		

</div><!-- /content -->

<div data-role="footer" class="footer-docs" data-theme="c">
		<p>&copy;2011 The jQuery Project</p>
</div>
	
</div><!-- /page -->

</body>
</html>
