<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Accordion - jQuery Mobile Demos</title>
		<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
		<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
		<script src="../../external/jquery/jquery.js"></script>
		<script src="../_assets/js/"></script>
		<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><img src="_assets/img/jquery-logo.png" alt="jQuery Mobile"></h2>
		<p>Version <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
	</div><!-- /header -->


	<div role="main" class="ui-content jqm-content">

		<h1>Accordion <a href="http://api.jquerymobile.com/accordion/" class="jqm-api-docs-link ui-button ui-icon-end ui-nodisc-icon ui-alt-icon ui-button-inline ui-corner-all ui-mini">API<span class="ui-icon ui-icon-carat-r"></span></a></h1>

		<p>Displays collapsible content panels for presenting information in a limited amount of space.</p>

		<h2>Basic Accordion</h2>


		<div data-demo-html="true">
				<div data-role="accordion">
					<h3>Section 1</h3>
					<div>
						<p>
							Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.
						</p>
					</div>
					<h3>Section 2</h3>
					<div>
						<p>
							Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non quam. In suscipit faucibus urna.
						</p>
					</div>
					<h3>Section 3</h3>
					<div>
						<p>
							Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis. Phasellus pellentesque purus in massa. Aenean in pede. Phasellus ac libero ac tellus pellentesque semper. Sed ac felis. Sed commodo, magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.
						</p>
						<ul>
							<li>List item one</li>
							<li>List item two</li>
							<li>List item three</li>
						</ul>
					</div>
					<h3>Section 4</h3>
					<div>
						<p>
							Cras dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean lacinia mauris vel est.
						</p>
						<p>
							Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
						</p>
					</div>
				</div>
		</div><!--/demo-html -->
	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
