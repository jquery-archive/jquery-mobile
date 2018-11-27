<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Grouping and dividing content - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
  <style id="combined-heading-and-section">
    .custom-corners .ui-bar {
      -webkit-border-top-left-radius: inherit;
      border-top-left-radius: inherit;
      -webkit-border-top-right-radius: inherit;
      border-top-right-radius: inherit;
    }
    .custom-corners .ui-body {
      border-top-width: 0;
      -webkit-border-bottom-left-radius: inherit;
      border-bottom-left-radius: inherit;
      -webkit-border-bottom-right-radius: inherit;
      border-bottom-right-radius: inherit;
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

		<h1>Grouping and dividing content</h1>

		<p>jQuery Mobile provides classes <code>ui-bar</code> and <code>ui-body</code> for subdividing and for visually grouping content.</p>
		<p>Add class <code>ui-bar</code> to create a full-width heading or a separator between sections of content. Additionally, classes <code>ui-bar-[a-z]</code> add the appropriate swatch from your theme.</p>
		<p>Add class <code>ui-body</code> to visual group and/or emphasize a section of content. Additionally, classes <code>ui-body-[a-z]</code> add the appropriate swatch from your theme.</p>

		<h2>Heading and accompanying section</h2>

		<div data-demo-html="true">
      <h3 class="ui-bar ui-bar-a">Heading</h3>
			<div class="ui-body">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum. Pellentesque cursus mauris purus, auctor commodo mi ullamcorper nec. Donec semper mattis eros, nec condimentum ante sollicitudin quis. Etiam orci sem, porttitor ut tellus nec, blandit posuere urna. Proin a arcu non lacus pretium faucibus. Aliquam sed est porttitor, ullamcorper urna nec, vehicula lorem. Cras porttitor est lorem, non venenatis diam convallis congue.</p>
			</div>
		</div>

		<h2>Heading with rounded corners and accompanying section</h2>

		<div data-demo-html="true">
      <h3 class="ui-bar ui-bar-a ui-corner-all">Heading</h3>
			<div class="ui-body">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum. Pellentesque cursus mauris purus, auctor commodo mi ullamcorper nec. Donec semper mattis eros, nec condimentum ante sollicitudin quis. Etiam orci sem, porttitor ut tellus nec, blandit posuere urna. Proin a arcu non lacus pretium faucibus. Aliquam sed est porttitor, ullamcorper urna nec, vehicula lorem. Cras porttitor est lorem, non venenatis diam convallis congue.</p>
			</div>
		</div>

		<h2>Heading with rounded corners accompanying themed section with rounded corners</h2>

		<div data-demo-html="true">
      <h3 class="ui-bar ui-bar-a ui-corner-all">Heading</h3>
			<div class="ui-body ui-body-a ui-corner-all">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum. Pellentesque cursus mauris purus, auctor commodo mi ullamcorper nec. Donec semper mattis eros, nec condimentum ante sollicitudin quis. Etiam orci sem, porttitor ut tellus nec, blandit posuere urna. Proin a arcu non lacus pretium faucibus. Aliquam sed est porttitor, ullamcorper urna nec, vehicula lorem. Cras porttitor est lorem, non venenatis diam convallis congue.</p>
			</div>
		</div>

		<h2>Combined heading and accompanying themed section with rounded corners</h2>

		<div data-demo-html="true">
			<div class="ui-body ui-body-a ui-corner-all">
	      <h3>Heading</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan blandit fermentum. Pellentesque cursus mauris purus, auctor commodo mi ullamcorper nec. Donec semper mattis eros, nec condimentum ante sollicitudin quis. Etiam orci sem, porttitor ut tellus nec, blandit posuere urna. Proin a arcu non lacus pretium faucibus. Aliquam sed est porttitor, ullamcorper urna nec, vehicula lorem. Cras porttitor est lorem, non venenatis diam convallis congue.</p>
			</div>
		</div>

		<h2>Heading attached to section - custom rounded corners</h2>

		<div data-demo-html="true" data-demo-css="#combined-heading-and-section">
      <div class="ui-corner-all custom-corners">
        <div class="ui-bar ui-bar-a">
          <h3>Heading</h3>
        </div>
        <div class="ui-body ui-body-a">
          <p>Content</p>
        </div>
      </div>
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
