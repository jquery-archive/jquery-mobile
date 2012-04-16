<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>jQuery Mobile Docs - Sample Form Submit to Self</title> 
	<link rel="stylesheet"  href="../../css/themes/default/jquery.mobile.css" />  
	<link rel="stylesheet" href="../_assets/css/jqm-docs.css"/>
	<script src="../../js/jquery.js"></script>
	
	<script src="../_assets/js/jqm-docs.js"></script>
	<script src="../../js/"></script>
</head> 
<body> 

	<div data-role="page" class="type-interior">

		<div data-role="header" data-theme="f">
		<h1>Sample form submit to self</h1>
		<a href="../../" data-icon="home" data-iconpos="notext" data-direction="reverse">Home</a>
		<a href="../nav.html" data-icon="search" data-iconpos="notext" data-rel="dialog" data-transition="fade">Search</a>
	</div><!-- /header -->

	<div data-role="content" data-theme="c">
		<div class="content-primary">
		
		<form action="forms-sample-selfsubmit.php" method="post">
			
			<fieldset data-role="controlgroup" data-type="horizontal" data-role="fieldcontain">
			    <legend>Testing</legend>
			    <div>
			    	<?php $g = $_REQUEST['gender']; ?>
			        <input type="radio" name="gender" value="m" id="gender-1" <?=$g=="m"? "checked": ""; ?> /><label for="gender-1">Male</label>
			        <input type="radio" name="gender" value="f" id="gender-2" <?=$g=="f"? "checked": ""; ?> /><label for="gender-2">Female</label>
			    </div>
			</fieldset>
			
			<button type="submit">Submit</submit>
	</form>
	
	</div><!--/content-primary -->		
	
	<div class="content-secondary">
		
		<div data-role="collapsible" data-collapsed="true" data-theme="b" data-content-theme="d">
			
				<h3>More in this section</h3>
				
				<ul data-role="listview" data-theme="c" data-dividertheme="d">
				
					<li data-role="list-divider">Form elements</li>
					<li><a href="docs-forms.html">Form basics</a></li>
					<li><a href="forms-all.html">Form element gallery</a></li>
					<li><a href="forms-all-mini.html">Mini form element gallery</a></li>
					<li><a href="textinputs/">Text inputs</a></li>
					<li><a href="search/">Search inputs</a></li>
					<li><a href="slider/">Slider</a></li>
					<li><a href="switch/">Flip toggle switch</a></li>
					<li><a href="radiobuttons/">Radio buttons</a></li>
					<li><a href="checkboxes/">Checkboxes</a></li>
					<li><a href="forms-selects.html">Select menus</a></li>
					<li><a href="forms-themes.html">Theming forms</a></li>
					<li><a href="forms-all-native.html">Native form elements</a></li>
					<li data-theme="a"><a href="forms-sample.html">Submitting forms</a></li>
					
	
				</ul>
		</div>
	</div>		

</div><!-- /content -->

<div data-role="footer" class="footer-docs" data-theme="c">
		<p>&copy; 2011-12 The jQuery Foundation</p>
</div>
	
</div><!-- /page -->

</body>
</html>
