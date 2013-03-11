<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Accordions - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			<h1>Accordions <a href="http://api.jquerymobile.com/collapsible-set/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">An accordion is created in jQuery Mobile by grouping a series of individual collapsibles into set.
			</p>

			<h2 id="accordion-markup">Markup</h2>

			<p>Collapsible sets start with the same markup as <a href="../collapsibles/" data-ajax="false">individual collapsibles</a> which have a heading followed by the collapsible content. By adding a parent wrapper with a <code>data-role="collapsible-set"</code> attribute to the collapsibles they will be visually grouped and they will behave like an accordion so only one section can be open at a time.</p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-theme="c" data-content-theme="d">
					<div data-role="collapsible">
						<h3>Section 1</h3>
						<p>I'm the collapsible content for section 1</p>
					</div>
					<div data-role="collapsible">
						<h3>Section 2</h3>
						<p>I'm the collapsible content for section 2</p>

					</div>
					<div data-role="collapsible">
						<h3>Section 3</h3>
						<p>I'm the collapsible content for section 3</p>
					</div>
				</div>
			</div><!--/demo-html -->

			<h2 id="accordion-inline">Inset vs. full width</h2>

			<p>For full width collapsibles without corner styling add the <code>data-inset="false"</code> attribute to the set. This makes the collapsible set look more like an expandable <a href="../listviews/">listview</a>.</p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-inset="false">
					<div data-role="collapsible">
						<h3>Animals</h3>
						<ul data-role="listview" data-inset="false">
							<li>Cats</li>
							<li>Dogs</li>
							<li>Lizards</li>
							<li>Snakes</li>
						</ul>
					</div>
					<div data-role="collapsible">
						<h3>Cars</h3>
						<ul data-role="listview" data-inset="false">
							<li>Acura</li>
							<li>Audi</li>
							<li>BMW</li>
							<li>Cadillac</li>
						</ul>
					</div>
					<div data-role="collapsible">
						<h3>Planets</h3>
						<ul data-role="listview" data-inset="false">
							<li>Earth</li>
							<li>Jupiter</li>
							<li>Mars</li>
							<li>Mercury</li>
						</ul>
					</div>
				</div>
			</div><!--/demo-html -->

			<h2 id="accordion-mini">Mini</h2>

			<p>For a more compact version that is useful in tight spaces, add the <code>data-mini="true"</code> attribute to the set. </p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-mini="true">
					<div data-role="collapsible">
						<h3>I'm a mini collapsible</h3>
						<p>This is good for tight spaces.</p>
					</div>
					<div data-role="collapsible">
						<h3>I'm another mini</h3>
						<p>Here's some collapsible content.</p>

					</div>
					<div data-role="collapsible">
						<h3>Last one</h3>
						<p>Final bit of collapsible content.</p>
					</div>
				</div>
			</div><!--/demo-html -->

			<h2 id="accordion-icons">Icons</h2>

			<p>The default icons of collapsible headings can be overridden by using the <code>data-collapsed-icon</code> and <code>data-expanded-icon</code> attributes, either at the <code>collapsible-set</code> level or on any of its collapsibles individually.</p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">
					<div data-role="collapsible">
						<h3>Icon set on the set</h3>
						<p>Specify the open and close icons on the set to apply it to all the collapsibles within.</p>
					</div>
					<div data-role="collapsible">
						<h3>Icon set on the set</h3>
						<p>This collapsible also gets the icon from the set.</p>
					</div>
					<div data-role="collapsible" data-collapsed-icon="gear" data-expanded-icon="delete">
						<h3>Icon set on this collapsible</h3>
						<p>The icons here are applied to this collapsible specifically, thus overriding the set icons.</p>
					</div>
				</div>
			</div><!--/demo-html -->

			<h2 id="accordion-icon-position">Icon position</h2>

			<p>The default icon positioning of collapsible headings can be overridden by using the <code>data-iconpos</code> attribute, either at the <code>collapsible-set</code> level or on any of its collapsibles individually.</p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-iconpos="right">
					<div data-role="collapsible">
						<h3>Right</h3>
						<p>Inherits icon positioning from <code>data-iconpos="right"</code> attribute on set.</p>
					</div>
					<div data-role="collapsible" data-iconpos="left">
						<h3>Left</h3>
						<p>Set via <code>data-iconpos="left"</code> attribute on the collapsible</p>
					</div>
					<div data-role="collapsible" data-iconpos="bottom">
						<h3>Bottom</h3>
						<p>Set via <code>data-iconpos="bottom"</code> attribute on the collapsible</p>
					</div>
					<div data-role="collapsible" data-iconpos="top">
						<h3>Top</h3>
						<p>Set via <code>data-iconpos="top"</code> attribute on the collapsible</p>
					</div>
				</div>
			</div><!--/demo-html -->

			<h2 id="accordion-corners">Corners</h2>
			<p>Add the <code>data-corners="false"</code> attribute to get an inset collapsible set without rounded corners.</p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-corners="false" data-theme="c" data-content-theme="d">
					<div data-role="collapsible">
						<h3>Section 1</h3>
						<p>Collapsible content</p>
					</div>
					<div data-role="collapsible">
						<h3>Section 2</h3>
						<p>Collapsible content</p>

					</div>
					<div data-role="collapsible">
						<h3>Section 3</h3>
						<p>Collapsible content</p>
					</div>
				</div>
			</div><!--/demo-html -->

			<h2 id="accordion-theme">Theme</h2>

			<p>Add a <code>data-theme</code> attribute to the set to set the color of each collapsible header in a set. Add the <code>data-content-theme</code> attribute to specify the color of the collapsible content. </p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-theme="a" data-content-theme="a">
					<div data-role="collapsible">
						<h3>1 - Theme A</h3>
						<p>Content theme A</p>
					</div>
					<div data-role="collapsible">
						<h3>2 - Theme A</h3>
						<p>Content theme A</p>
					</div>
				</div>
			</div><!--/demo-html -->

			<p>To have individual sections in a group styled differently, add <code>data-theme</code> and <code>data-content-theme</code> attributes to specific collapsibles.</p>

			<div data-demo-html="true">
				<div data-role="collapsible-set" data-content-theme="c">
					<div data-role="collapsible" data-theme="b" data-content-theme="b">
						<h3>Section header, swatch B</h3>
						<p>Collapsible content, swatch "b"</p>
					</div>
					<div data-role="collapsible" data-theme="a" data-content-theme="a">
						<h3>Section header, swatch A</h3>
						<p>Collapsible content, swatch "a"</p>
					</div>
					<div data-role="collapsible" data-theme="e" data-content-theme="d">
						<h3>Section header, swatch E</h3>
						<p>Collapsible content, swatch "d"</p>
					</div>
				</div>
		</div><!--/demo-html -->

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
