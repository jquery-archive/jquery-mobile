<? if( $_SERVER[ "HTTP_X_REQUESTED_WITH" ] && $_SERVER[ "HTTP_X_REQUESTED_WITH" ] ==="XMLHttpRequest" ){ ?>

{ "title" : "Data-driven Page Response", "content" : "<p>This page was served as JSON via Ajax. When <a href=\"pages-dynamic-data-example.php\" data-ajax=\"false\">requested via HTTP</a>, it returns HTML markup.</p>" }

<? } else { ?>
	
<!DOCTYPE html> 
<html> 

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>Page Title</title> 
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0b2/jquery.mobile-1.0b2.min.css" />
	<script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.0b2/jquery.mobile-1.0b2.min.js"></script>
</head> 

<body> 

<div data-role="page">

	<div data-role="header">
		<h1>HTML-driven Page Response</h1>
	</div><!-- /header -->

	<div data-role="content">	
		<p>This page was served as HTML via HTTP. When <a href="pages-dynamic-data.html#/jquery-mobile/docs/pages/pages-dynamic-data-example.php" data-ajax="false">requested via Ajax</a>, it returns JSON data.</p>
	</div><!-- /content -->


</div><!-- /page -->

</body>
</html>
<? } ?>