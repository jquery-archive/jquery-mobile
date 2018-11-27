<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dynamic toolbars - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
    	$( document ).on( "click", "#inject-toolbars", function() {
    		$( "<div data-role='toolbar' data-type='header'><h1>Dynamic header</h1></div>")
    			.prependTo( "#page-with-dynamic-toolbars" )
    			.toolbar({ position: "fixed" });

    		$( "<div data-role='toolbar' data-type='footer'><h4>Dynamic footer</h4></div>")
    			.appendTo( "#page-with-dynamic-toolbars" )
    			.toolbar({ position: "fixed" });
    		// Update the page height and padding
    		$.mobile.resetActivePageHeight();
    	});
	</script>
</head>
<body>
	<div data-role="page" class="jqm-demos" id="page-with-dynamic-toolbars">

		<div role="main" class="ui-content jqm-content jqm-fullwidth">

			<h1>Dynamic toolbars</h1>

			<p>click on the button to dynamically inject toolbars. Note that we have to update the page height and padding by calling <code>$.mobile.resetActivePageHeight();</code>.</p>

			<div data-demo-html="#page-with-dynamic-toolbars" data-demo-js="true">
				<button id="inject-toolbars" class="ui-button ui-button-inline ui-corner-all">Inject toolbars</button>
			</div>

		</div><!-- /content -->

	</div><!-- /page -->

</body>
</html>
