<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Open panel on swipe - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$( document ).on( "pagecreate", "#demo-page", function() {

			$( document ).on( "swipeleft swiperight", "#demo-page", function( e ) {
				// We check if there is no open panel on the page because otherwise
				// a swipe to close the left panel would also open the right panel (and v.v.).
				// We do this by checking the data that the framework stores on the page element (panel: open).
				if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
					if ( e.type === "swipeleft" ) {
						$( "#right-panel" ).panel( "open" );
					} else if ( e.type === "swiperight" ) {
						$( "#left-panel" ).panel( "open" );
					}
				}
			});
		});
    </script>
	<style>
		/* Swipe works with mouse as well but often causes text selection. */
		/* We'll deny text selecton on everything but INPUTs and TEXTAREAs. */
		#demo-page :not(INPUT):not(TEXTAREA) {
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
		}
		/* Content styling. */
		dl { font-family: "Times New Roman", Times, serif; padding: 1em; }
		dt { font-size: 2em; font-weight: bold; }
		dt span { font-size: .5em; color: #777; margin-left: .5em; }
		dd { font-size: 1.25em;	margin: 1em 0 0; padding-bottom: 1em; border-bottom: 1px solid #eee; }
		.back-btn { float: right; margin: 0 2em 1em 0; }
	</style>
</head>
<body>

<div data-role="page" class="jqm-demos" id="demo-intro">

    <div data-role="header" class="jqm-header">
        <h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
        <a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
        <a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Open panel on swipe</h1>

        <p>By default panels can be closed by swiping in the direction of the open panel. In this demo we show how you can also open a panel with swipe. This is not part of the framework, because in case of multiple panels we wouldn't know which one to open.</p>

        <p>The demo page has two menus, one at each side. Both can be opened with swipe or with the buttons in the header.</p>

        <a href="#demo-page" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-mini ui-icon-carat-r ui-btn-icon-right">Open demo</a>

        <div data-demo-html="#demo-page" data-demo-js="true" data-demo-css="true"></div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

<div data-role="page" id="demo-page">

    <div data-role="header" data-theme="b">
        <h1>Swipe left or right</h1>
		<a href="#left-panel" data-icon="carat-r" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-nodisc-icon">Open left panel</a>
		<a href="#right-panel" data-icon="carat-l" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-nodisc-icon">Open right panel</a>
    </div><!-- /header -->

    <div role="main" class="ui-content">

    	<dl>
            <dt>Swipe <span>verb</span></dt>
            <dd><b>1.</b> to strike or move with a sweeping motion</dd>
        </dl>

		<a href="#demo-intro" data-rel="back" class="back-btn ui-btn ui-corner-all ui-shadow ui-mini ui-btn-inline ui-icon-back ui-btn-icon-right">Back to demo intro</a>

    </div><!-- /content -->

    <div data-role="panel" id="left-panel" data-theme="b">

    	<p>Left reveal panel.</p>
		<a href="#" data-rel="close" class="ui-btn ui-corner-all ui-shadow ui-mini ui-btn-inline ui-icon-delete ui-btn-icon-left ui-btn-right">Close</a>

    </div><!-- /panel -->

    <div data-role="panel" id="right-panel" data-display="push" data-position="right" data-theme="b">

    	<p>Right push panel.</p>
		<a href="#" data-rel="close" class="ui-btn ui-corner-all ui-shadow ui-mini ui-btn-inline ui-icon-delete ui-btn-icon-right">Close</a>

    </div><!-- /panel -->

</div><!-- /page -->

</body>
</html>
