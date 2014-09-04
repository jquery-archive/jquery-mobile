<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listview AutodividersSelector - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script>
		// Bind to "mobileinit" before you load jquery.mobile.js
		$( document ).on( "mobileinit", function() {
			$.mobile.listview.prototype.options.autodividersSelector = function( elt ) {
				var text = $.trim( elt.text() ) || null;

				if ( !text ) {
					return null;
				}
				if ( !isNaN(parseFloat(text)) ) {
					return "0-9";
				} else {
					text = text.slice( 0, 1 ).toUpperCase();
					return text;
				}
			};
		});
	</script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Custom autodivider selector</h1>

        <p>By default the autodividers plugin will use the first character of a list item as selector. The option <code>autodividersSelector</code> allows you to return a different string. In this example we show you how to set an autodividers selector of "0-9" for list items that contain numbers so you can group them.</p>

        <div data-demo-html="true" data-demo-js="true">
            <ul data-role="listview" data-autodividers="true" data-inset="true">
                <li><a href="#">0203491</a></li>
                <li><a href="#">2284573</a></li>
                <li><a href="#">5844795</a></li>
                <li><a href="#">9368744</a></li>
                <li><a href="#">Adam Kinkaid</a></li>
                <li><a href="#">Alex Wickerham</a></li>
                <li><a href="#">Avery Johnson</a></li>
                <li><a href="#">Bob Cabot</a></li>
                <li><a href="#">Caleb Booth</a></li>
                <li><a href="#">Christopher Adams</a></li>
                <li><a href="#">Culver James</a></li>
                <li><a href="#">David Walsh</a></li>
                <li><a href="#">Drake Alfred</a></li>
                <li><a href="#">Elizabeth Bacon</a></li>
                <li><a href="#">Emery Parker</a></li>
                <li><a href="#">Enid Voldon</a></li>
            </ul>
        </div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
