<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listviews collapsible list items - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="collapsible-list-item-style-flat">
		.ui-li-static.ui-collapsible > .ui-collapsible-heading {
			margin: 0;
		}

		.ui-li-static.ui-collapsible {
			padding: 0;
		}

		.ui-li-static.ui-collapsible > .ui-collapsible-heading > .ui-btn {
			border-top-width: 0;
		}

		.ui-li-static.ui-collapsible > .ui-collapsible-heading.ui-collapsible-heading-collapsed > .ui-btn,
		.ui-li-static.ui-collapsible > .ui-collapsible-content {
			border-bottom-width: 0;
		}
	</style>

</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

	<h1>Collapsible list items</h1>

	<p>You can create collapsible list items by instantiating collapsible widgets on them and adding some custom CSS to collapse borders and padding.</p>

	<h2>Regular listview</h2>

	<div data-demo-html="true" data-demo-css="#collapsible-list-item-style-flat">
    <ul data-role="listview">
      <li data-role="collapsible" data-iconpos="right" data-inset="false">
        <h2>Birds</h2>
        <ul data-role="listview" data-theme="b">
          <li><a href="#">Condor</a></li>
          <li><a href="#">Eagle</a></li>
          <li><a href="#">Sparrow</a></li>
        </ul>
      </li>
      <li><a href="#">Humans</a></li>
      <li data-role="collapsible" data-iconpos="right" data-inset="false">
        <h2>Fish</h2>
        <ul data-role="listview" data-theme="b">
          <li><a href="#">Salmon</a></li>
          <li><a href="#">Pollock</a></li>
          <li><a href="#">Trout</a></li>
        </ul>
      </li>
      <li data-role="collapsible" data-iconpos="right" data-inset="false">
        <h2>Choose your preference</h2>
        <form>
          <fieldset data-role="controlgroup" data-type="horizontal">
            <label>Birds<input type="checkbox" id="choose-birds-regular"></label>
            <label>Humans<input type="checkbox" id="choose-humans-regular"></label>
            <label>Fish<input type="checkbox" id="choose-fish-regular"></label>
          </fieldset>
        </form>
      </li>
    </ul>
	</div>

	<h2>Inset listview</h2>

	<div data-demo-html="true" data-demo-css="#collapsible-list-item-style-flat">
    <ul data-role="listview" data-inset="true" data-shadow="false">
      <li data-role="collapsible" data-iconpos="right" data-inset="false">
        <h2>Birds</h2>
        <ul data-role="listview" data-theme="b">
          <li><a href="#">Condor</a></li>
          <li><a href="#">Eagle</a></li>
          <li><a href="#">Sparrow</a></li>
        </ul>
      </li>
      <li><a href="#">Humans</a></li>
      <li data-role="collapsible" data-iconpos="right" data-inset="false">
        <h2>Fish</h2>
        <ul data-role="listview" data-theme="b">
          <li><a href="#">Salmon</a></li>
          <li><a href="#">Pollock</a></li>
          <li><a href="#">Trout</a></li>
        </ul>
      </li>
      <li data-role="collapsible" data-iconpos="right" data-inset="false">
        <h2>Choose your preference</h2>
        <form>
          <fieldset data-role="controlgroup" data-type="horizontal">
            <label>Birds<input type="checkbox" id="choose-birds-inset"></label>
            <label>Humans<input type="checkbox" id="choose-humans-inset"></label>
            <label>Fish<input type="checkbox" id="choose-fish-inset"></label>
          </fieldset>
        </form>
      </li>
    </ul>
	</div>

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
