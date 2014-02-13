<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dynamic collapsible - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$( document ).on( "pagecreate", function() {
			var nextId = 1;

			$("#add").click(function() {
				nextId++;
				var content = "<div data-role='collapsible' id='set" + nextId + "'><h3>Section " + nextId + "</h3><p>I am the collapsible content in a set so this feels like an accordion. I am hidden by default because I have the 'collapsed' state; you need to expand the header to see me.</p></div>";

				$( "#set" ).append( content ).collapsibleset( "refresh" );
			});

			$( "#expand" ).click(function() {
				$("#set").children(":last").collapsible( "expand" );
			});

			$( "#collapse" ).click(function() {
				$( "#set" ).children( ":last" ).collapsible( "collapse" );
			});
		});
	</script>
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

        <h1>Dynamic collapsible</h1>

        <p>This demo shows how you can dynamically add a collapsible to a collapsible set (accordion). It also shows how you can use the <code>expand</code> and <code>collapse</code> events to dynamically open or close a collapsible.</p>

        <div data-demo-html="true" data-demo-js="true">
            <button type="button" data-icon="gear" data-iconpos="right" data-mini="true" data-inline="true" id="add">Add</button>
            <button type="button" data-icon="plus" data-iconpos="right" data-mini="true" data-inline="true" id="expand">Expand last</button>
            <button type="button" data-icon="minus" data-iconpos="right" data-mini="true" data-inline="true" id="collapse">Collapse last</button>

            <div data-role="collapsibleset" data-content-theme="a" data-iconpos="right" id="set">
                <div data-role="collapsible" id="set1" data-collapsed="true">
                    <h3>Section 1</h3>
                    <p>I'm the collapsible content.</p>
                </div>
            </div>

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

