<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>External toolbars - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$(function(){
			$( "[data-role='toolbar']" ).toolbar();
		});
	</script>
</head>
<body>
	<div data-role="toolbar"  data-type="header" data-theme="a">
			<a href="../toolbar/" data-rel="back" class="ui-button ui-toolbar-header-button-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-button-icon-only">Back <span class="ui-icon ui-icon-caret-l"></span></a>
		<h1>External header</h1>
	</div><!-- /header -->
	
	<div data-role="page" class="jqm-demos" data-quicklinks="true">

		<div role="main" class="ui-content jqm-content">

			<h1>External toolbars page 2</h1>

		</div><!-- /content -->

	</div><!-- /page -->

	<div data-role="toolbar" data-type="footer" data-theme="a">
		<h1>External footer</h1>
	</div><!-- /footer -->

</body>
</html>
