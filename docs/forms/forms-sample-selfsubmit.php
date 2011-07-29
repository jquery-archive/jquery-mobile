<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>jQuery Mobile Docs - Sample Form Submit to Self</title> 
	<link rel="stylesheet"  href="../../themes/default/" />  
	<link rel="stylesheet" href="../_assets/css/jqm-docs.css"/>
	<script src="../../js/jquery.js"></script>
	<script src="../../experiments/themeswitcher/jquery.mobile.themeswitcher.js"></script>
	<script src="../_assets/js/jqm-docs.js"></script>
	<script src="../../js/"></script>
</head> 
<body> 

	<div data-role="page" class="type-interior">

		<div data-role="header" data-theme="f">
		<h1>Sample form submit to self</h1>
		<a href="../../" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home">Home</a>
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
		
		<div data-role="collapsible" data-collapsed="true" data-theme="b">
			
				<h3>More in this section</h3>
				
				<ul data-role="listview" data-theme="c" data-dividertheme="d">
				
					<li data-role="list-divider">Form elements</li>
					<li><a href="docs-forms.html">Form basics</a></li>
					<li><a href="forms-all.html">Form element gallery</a></li>
					<li><a href="texts/index.html">Text inputs</a></li>
					<li><a href="forms-search.html">Search inputs</a></li>
					<li><a href="forms-slider.html">Slider</a></li>
					<li><a href="forms-switch.html">Flip toggle switch</a></li>
					<li><a href="radiobuttons/index.html">Radio buttons</a></li>
					<li><a href="checkboxes/index.html">Checkboxes</a></li>
					<li><a href="forms-selects.html">Select menus</a></li>
					<li><a href="forms-themes.html">Theming forms</a></li>
					<li><a href="forms-all-native.html">Native form elements</a></li>
					<li data-theme="a"><a href="forms-sample.html">Submitting forms</a></li>
					<li><a href="plugin-eventsmethods.html">Plugin methods</a></li>
	
				</ul>
		</div>
	</div>		

</div><!-- /content -->

<div data-role="footer" class="footer-docs" data-theme="c">
		<p>&copy; 2011 The jQuery Project</p>
</div>
	
</div><!-- /page -->

</body>
</html>
