<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Listviews - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="collapsible-list-item-style">
/* Basic settings */
.ui-li-static.ui-collapsible {
  padding: 0;
}

.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview,
.ui-li-static.ui-collapsible > .ui-collapsible-heading {
  margin: 0;
}

.ui-li-static.ui-collapsible > .ui-collapsible-content {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  border-bottom-width: 0;
}

/* collapse vertical borders */
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-last-child,
.ui-li-static.ui-collapsible.ui-collapsible-collapsed > .ui-collapsible-heading > a.ui-btn {
  border-bottom-width: 0;
}

.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-first-child,
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li.ui-first-child > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-heading > a.ui-btn {
  border-top-width: 0;
}

/* Remove right borders */
.ui-li-static.ui-collapsible > .ui-collapsible-heading > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > .ui-li-static,
.ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-content {
  border-right-width: 0;
}

/* Remove left borders */
/* Here, we need class ui-listview-outer to identify the outermost listview */
.ui-listview-outer > .ui-li-static.ui-collapsible .ui-li-static.ui-collapsible.ui-collapsible,
.ui-listview-outer > .ui-li-static.ui-collapsible > .ui-collapsible-heading > a.ui-btn,
.ui-li-static.ui-collapsible > .ui-collapsible-content {
  border-left-width: 0;
}
	</style>
	<style id="flat-sublist-style">
/* Additional rules for flat sublists */
/* Remove some more left borders and paddings for flat sublists */
.ui-listview-flat-sublists .ui-li-static.ui-collapsible > .ui-collapsible-content {
  padding-left: 0;
}

.ui-listview-outer.ui-listview-flat-sublists .ui-li-static.ui-collapsible > .ui-collapsible-heading > a.ui-btn,
.ui-listview-outer.ui-listview-flat-sublists .ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > .ui-li-static,
.ui-listview-outer.ui-listview-flat-sublists .ui-li-static.ui-collapsible > .ui-collapsible-content > .ui-listview > li > a.ui-btn {
  border-left-width: 0;
}
  </style>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

	<h1>Collapsible list items</h1>

	<p>You can render list items collapsible by instantiating collapsible widgets on them and adding some custom CSS to collapse borders and padding. In all the examples below, the outermost listview has class <code>ui-listview-outer</code> to identify it as the outermost listview in the tree structure of indented lists.</p>

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
    </ul>
	</div>

	<h2>Flat sublists</h2>
	<p>With a little more CSS, you can create class <code>ui-listview-flat-sublists</code> that will cause all the sublists of a listview to which it is applied to display without indentation. In the example below, the first list item contains a list that has indented sublists. The second list item contains a list that has flat sublists.</p>

	<div data-demo-html="true" data-demo-css="#collapsible-list-item-style,#flat-sublist-style">
    <ul data-role="listview" class="ui-listview-outer" data-inset="true" data-shadow="false">
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Indented Sublists</h2>

    <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false">
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
    </ul>

      </li>
      <li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">
        <h2>Flat Sublists</h2>

    <ul data-role="listview" data-shadow="false" data-inset="true" data-corners="false" class="ui-listview-flat-sublists">
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
    </ul>

      </li>
    </ul>
	</div>

	</div><!-- /content -->

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
