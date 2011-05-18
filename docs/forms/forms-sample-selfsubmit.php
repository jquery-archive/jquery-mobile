<!DOCTYPE html> 
<html> 
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>jQuery Mobile Docs - Sample Form Submit to Self</title> 
	<link rel="stylesheet"  href="../../themes/default/" />  
	<link rel="stylesheet" href="../_assets/css/jqm-docs.css"/>
	<script src="../../js/jquery.js"></script>
	<script src="../../js/"></script>
</head> 
<body> 

<div data-role="page" data-theme="c">

	<div data-role="header" data-theme="e">
		<h1>Sample form submit to self</h1>
		<a href="../../" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home">Home</a>
	</div><!-- /header -->

	<div data-role="content" data-theme="c">
		
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
	
	</div><!-- /content -->
</div><!-- /page -->

</body>
</html>