<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <!-- Need to get a proper redirect hooked up. Blech. -->
    <meta http-equiv="refresh" content="0;url=demos/">
    <meta name="robots" content="noindex, follow">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>jQuery Mobile</title>
    <link rel="stylesheet" href="css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="demos/_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="demos/_assets/favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <script src="external/jquery/jquery.js"></script>
    <script src="demos/_assets/js/"></script>
    <script src="js/"></script>
    <script>
		$( document ).on( "pageshow", function(){
			$( "p.message" ).hide().delay( 1500 ).show( "fast" );
		});
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="content" class="jqm-content">

        <p class="message">Nothing to see here folks. <a href="demos/">View the demo center home page &rarr;</a></p>

	</div><!-- /content -->

</div><!-- /page -->
</body>
</html>
