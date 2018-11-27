<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listviews indented collapsible list items - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="collapsible-list-item-style">
		/* Basic settings */
		.ui-listview-item-static.ui-collapsible {
			padding: 0;
		}

		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content > .ui-listview,
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-heading {
			margin: 0;
		}

		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content {
			padding-top: 0;
			padding-bottom: 0;
			padding-right: 0;
			border-bottom-width: 0;
		}

		/* collapse vertical borders */
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-last-child,
		.ui-listview-item-static.ui-collapsible.ui-collapsible-collapsed > .ui-collapsible-heading > a.ui-button {
			border-bottom-width: 0;
		}

		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-first-child,
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-first-child > a.ui-button,
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-heading > a.ui-button {
			border-top-width: 0;
		}

		/* Remove right borders */
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-heading > a.ui-button,
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content > .ui-listview > .ui-listview-item-static,
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li > a.ui-button,
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content {
			border-right-width: 0;
		}

		/* Remove left borders */
		/* Here, we need class ui-listview-outer to identify the outermost listview */
		.ui-listview-outer > .ui-listview-item-static.ui-collapsible .ui-listview-item-static.ui-collapsible.ui-collapsible,
		.ui-listview-outer > .ui-listview-item-static.ui-collapsible > .ui-collapsible-heading > a.ui-button,
		.ui-listview-item-static.ui-collapsible > .ui-collapsible-content {
			border-left-width: 0;
		}
	</style>

</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

	<h1>Indented collapsible list items</h1>

	<p>You can create indented collapsible list items by instantiating collapsible widgets on them and adding some custom CSS to collapse borders and padding. In all the examples below, the outermost listview has class <code>ui-listview-outer</code> to identify it as the outermost listview in the tree structure of indented lists.</p>

	<h2>Regular listview</h2>

	<div data-demo-html="true" data-demo-css="#collapsible-list-item-style">
    <ul data-role="listview" class="ui-listview-outer">
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Birds</h2>
        <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false">
          <li>Condor</li>
          <li><a href="#">Eagle</a></li>
          <li>Sparrow</li>
        </ul>
      </li>
      <li><a href="#">Humans</a></li>
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Fish</h2>
        <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false">
          <li><a href="#">Salmon</a></li>
          <li>Pollock</li>
          <li>Trout</li>
        </ul>
      </li>
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Choose your preference</h2>
        <form>
          <fieldset data-role="controlgroup">
            <label>Birds<input type="checkbox" id="choose-birds-regular"></label>
            <label>Humans<input type="checkbox" id="choose-humans-regular"></label>
            <label>Fish<input type="checkbox" id="choose-fish-regular"></label>
          </fieldset>
        </form>
      </li>
    </ul>
	</div>

	<h2>Inset listview</h2>

	<div data-demo-html="true" data-demo-css="#collapsible-list-item-style">
    <ul data-role="listview" class="ui-listview-outer" data-inset="true">
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Birds</h2>
        <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false">
          <li>Condor</li>
          <li><a href="#">Eagle</a></li>
          <li>Sparrow</li>
        </ul>
      </li>
      <li><a href="#">Humans</a></li>
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Fish</h2>
        <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false">
          <li><a href="#">Salmon</a></li>
          <li>Pollock</li>
          <li>Trout</li>
        </ul>
      </li>
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Choose your preference</h2>
        <form>
          <fieldset data-role="controlgroup">
            <label>Birds<input type="checkbox" id="choose-birds-regular"></label>
            <label>Humans<input type="checkbox" id="choose-humans-regular"></label>
            <label>Fish<input type="checkbox" id="choose-fish-regular"></label>
          </fieldset>
        </form>
      </li>
    </ul>
	</div>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="toolbar" data-type="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<h6>jQuery Mobile Version <span class="jqm-version"></span> Demos</h6>
		<ul>
			<li><a href="http://jquerymobile.com/" title="Visit the jQuery Mobile web site">jquerymobile.com</a></li>
			<li><a href="https://github.com/jquery/jquery-mobile" title="Visit the jQuery Mobile GitHub repository">GitHub repository</a></li>
		</ul>
		<p>Copyright jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->

<?php include( '../jqm-search.php' ); ?>

</body>
</html>
