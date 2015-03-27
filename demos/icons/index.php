<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Icons - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="custom-icon">
        .ui-icon-myicon {
			background-image: url("../_assets/img/glyphish-icons/21-skull.png");
			/* Make your icon fit */
			background-size: 18px 18px;
		}
    </style>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Icons <a href="http://api.jquerymobile.com/icons/" class="jqm-api-docs-link ui-button ui-nodisc-icon ui-alt-icon ui-button-inline ui-corner-all ui-mini">API <span class="ui-icon ui-icon-caret-r"></span></a></h1>

        <p>A set of built-in icons in jQuery Mobile can be applied to buttons, collapsibles, listview buttons and more. There is an SVG and PNG image of each icon. By default the SVG icons, that look great on both SD and HD screens, are used. On platforms that don't support SVG the framework falls back to PNG icons.</p>

        <h2>Icon set</h2>

        <p>The text in the buttons below show the name of the icon used in that button.</p>

        <p>In widgets where you set the icon with a <code>data-icon</code> attribute you use the name of the icon as value. For example: <code>data-icon="arrow-r"</code>.</p>

        <p>To add an icon to link buttons and <code>button</code> elements, use the name prefixed with <code>ui-icon-</code> as class. For example: <code>ui-icon-arrow-r</code>. See also <a href="../button/">Button</a>.</p>

        <div data-demo-html="true">
            <button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-action"></span> action</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-alert"></span> alert</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-d"></span> arrow-d</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-d-l"></span> arrow-d-l</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-d-r"></span> arrow-d-r</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-l"></span> arrow-l</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-r"></span> arrow-r</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-u"></span> arrow-u</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-u-l"></span> arrow-u-l</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-u-r"></span> arrow-u-r</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-audio"></span> audio</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-back"></span> back</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-bars"></span> bars</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-bullets"></span> bullets</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-calendar"></span> calendar</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-camera"></span> camera</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-caret-d"></span> caret-d</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-caret-l"></span> caret-l</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-caret-r"></span> caret-r</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-caret-u"></span> caret-u</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-check"></span> check</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-clock"></span> clock</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-cloud"></span> cloud</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-comment"></span> comment</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-delete"></span> delete</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-edit"></span> edit</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-eye"></span> eye</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-forbidden"></span> forbidden</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-forward"></span> forward</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-gear"></span> gear</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-grid"></span> grid</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-heart"></span> heart</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-home"></span> home</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-info"></span> info</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-location"></span> location</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-lock"></span> lock</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-mail"></span> mail</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-minus"></span> minus</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-navigation"></span> navigation</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-phone"></span> phone</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-plus"></span> plus</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-power"></span> power</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-recycle"></span> recycle</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-refresh"></span> refresh</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-search"></span> search</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-shop"></span> shop</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-star"></span> star</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-tag"></span> tag</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-user"></span> user</button>
			<button class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-video"></span> video</button>
        </div><!--/demo-html -->

        <h2>Custom Icons</h2>

		<p>Icons are displayed as background image of <code>:after</code> pseudo elements. Target the pseudo element to set a custom icon.</p>

        <div data-demo-html="true" data-demo-css="#custom-icon">
			<button class="ui-button ui-shadow ui-corner-all">myicon <span class="ui-icon ui-icon-myicon"></span></button>
		</div>

		<p>You can safely use SVG icons. The framework contains a SVG support test and adds class <code>ui-nosvg</code> to the <code>html</code> element on platforms that don't support SVG. Use this class in your CSS to provide a PNG image as fallback.</p>

<pre><code>
.ui-icon-myicon:after {
	background-image: url("iconimg.svg");
}
/* Fallback */
.ui-nosvg .ui-icon-myicon:after {
	background-image: url("iconimg.png");
}
</code></pre>

		<h2>Icon positioning</h2>

		<p>By default, icons in <code>input</code> buttons are placed to the left of the button text. This default may be overridden using the <code>data-iconpos</code> attribute to set the icon position to "right", "top", or "bottom". In case of link buttons or <code>button</code> elements you have to add an icon position class (<code>ui-button-icon-[value]</code>).</p>

		<div data-demo-html="true">
			<a href="index.php" class="ui-button ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-l"></span> Left</a>
			<a href="index.php" class="ui-button ui-shadow ui-corner-all">Right <span class="ui-icon ui-icon-arrow-r"></span></a>
			<a href="index.php" class="ui-button ui-shadow ui-corner-all">Top<span class="ui-icon ui-icon-arrow-u ui-icon-display-block"></span></a>
			<a href="index.php" class="ui-button ui-shadow ui-corner-all">Bottom<span class="ui-icon ui-icon-arrow-d ui-icon-display-block"></span></a>
		</div><!--/demo-html -->
		
		<p>Mini buttons</p>
		
		<div data-demo-html="true">
			<a href="index.php" class="ui-button ui-mini ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-l"></span> Left</a>
			<a href="index.php" class="ui-button ui-mini ui-shadow ui-corner-all">Right <span class="ui-icon ui-icon-arrow-r"></span></a>
			<a href="index.php" class="ui-button ui-mini ui-shadow ui-corner-all">Top<span class="ui-icon ui-icon-arrow-u ui-icon-display-block"></span></a>
			<a href="index.php" class="ui-button ui-mini ui-shadow ui-corner-all">Bottom<span class="ui-icon ui-icon-arrow-d ui-icon-display-block"></span></a>
		</div><!--/demo-html -->
		
		<p>Inline buttons</p>
		
		<div data-demo-html="true">
			<a href="index.php" class="ui-button ui-button-inline ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-l"></span> Left</a>
			<a href="index.php" class="ui-button ui-button-inline ui-shadow ui-corner-all">Right <span class="ui-icon ui-icon-arrow-r"></span></a>
			<a href="index.php" class="ui-button ui-button-inline ui-shadow ui-corner-all">Top<span class="ui-icon ui-icon-arrow-u ui-icon-display-block"></span></a>
			<a href="index.php" class="ui-button ui-button-inline ui-shadow ui-corner-all">Bottom<span class="ui-icon ui-icon-arrow-d ui-icon-display-block"></span></a>
		</div><!--/demo-html -->

		<p>Inline mini buttons</p>
		
		<div data-demo-html="true">
			<a href="index.php" class="ui-button ui-button-inline ui-mini ui-shadow ui-corner-all"><span class="ui-icon ui-icon-arrow-l"></span> Left</a>
			<a href="index.php" class="ui-button ui-button-inline ui-mini ui-shadow ui-corner-all">Right <span class="ui-icon ui-icon-arrow-r"></span></a>
			<a href="index.php" class="ui-button ui-button-inline ui-mini ui-shadow ui-corner-all">Top<span class="ui-icon ui-icon-arrow-u ui-icon-display-block"></span></a>
			<a href="index.php" class="ui-button ui-button-inline ui-mini ui-shadow ui-corner-all">Bottom<span class="ui-icon ui-icon-arrow-d ui-icon-display-block"></span></a>
		</div><!--/demo-html -->

		<h2>Icon-only</h2>

		<p>Use "notext" as value for icon position if you want to create an icon-only button.</p>

        <div data-demo-html="true">
            <a href="index.php" class="ui-button ui-shadow ui-corner-all ui-button-icon-only">Delete<span class="ui-icon ui-icon-delete"></span></a>
        </div><!--/demo-html -->

        <h2>Icon shadow</h2>

        <p>Set <code>data-iconshadow="true"</code> to enable icon shadow for <code>input</code> buttons, or add class <code>ui-shadow-icon</code> to your <a href="../button/">button</a>.</p>

        <p><strong>Note: Icon shadow (option <code>iconShadow</code> in the button widget and class <code>ui-shadow-icon</code>) is deprecated as of jQuery Mobile 1.4.0 and will be removed in 1.5.0.</strong></p>

        <div data-demo-html="true">
			<a href="index.php" class="ui-shadow-icon ui-button ui-shadow ui-corner-all">Icon shadow<span class="ui-icon ui-icon-delete"></span></a>
			<a href="index.php" class="ui-shadow-icon ui-button ui-shadow ui-corner-all ui-button-b">Icon shadow<span class="ui-icon ui-icon-delete"></span></a>
        </div><!--/demo-html -->

        <h2>Removing the disc</h2>

        <p>The semi-transparent dark circle behind the icon ensures good contrast on any background color so it works well with the jQuery Mobile theming system. If you prefer to not have this disc, it can be removed by adding the class <code>ui-nodisc-icon</code> to the element or its container.</p>

        <div data-demo-html="true">
			<a href="index.php" class="ui-nodisc-icon ui-button ui-shadow ui-corner-all">No disc<span class="ui-icon ui-icon-delete"></span></a>
			<a href="index.php" class="ui-nodisc-icon ui-button ui-shadow ui-corner-all ui-button-b">No disc<span class="ui-icon ui-icon-delete"></span></a>
        </div><!--/demo-html -->

		<p>Example of the class being applied to a wrapper.</p>

		<div data-demo-html="true">
			<div class="ui-nodisc-icon"><!-- Class added to the wrapper -->
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-b ui-button-inline">Delete<span class="ui-icon ui-icon-delete"></span></a>
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-b ui-button-inline">Plus<span class="ui-icon ui-icon-plus"></span></a>
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-b ui-button-inline">Minus<span class="ui-icon ui-icon-minus"></span></a>
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-b ui-button-inline">Check<span class="ui-icon ui-icon-check"></span></a>
			</div>
		</div><!--/demo-html -->

        <h2>Black vs. white icon sets</h2>

        <p>Icons are white by default but you can switch to black icons by adding the <code>ui-alt-icon</code> class to the element or its container. This also changes the color that is used for the discs.</p>

        <div data-demo-html="true">
        	<a href="index.php" class="ui-alt-icon ui-button ui-shadow ui-corner-all">Alt icon<span class="ui-icon ui-icon-delete"></span></a>
			<a href="index.php" class="ui-alt-icon ui-button ui-shadow ui-corner-all ui-button-b">Alt icon<span class="ui-icon ui-icon-delete"></span></a>
        </div><!--/demo-html -->

		<p>Example of the class being applied to a wrapper.</p>

		<div data-demo-html="true" class="ui-alt-icon">
		<div class="ui-alt-icon"><!-- Class added to the wrapper -->
			<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Delete<span class="ui-icon ui-icon-delete"></span></a>
			<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Plus<span class="ui-icon ui-icon-plus"></span></a>
			<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Minus<span class="ui-icon ui-icon-minus"></span></a>
			<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Check<span class="ui-icon ui-icon-check"></span></a>
		</div>
		</div><!--/demo-html -->

		<h2>Combining alt and nodisc</h2>

		<p>Example of the classes being applied to a wrapper.</p>

		<div data-demo-html="true">
			<div class="ui-nodisc-icon ui-alt-icon"><!-- Classes added to the wrapper -->
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Delete<span class="ui-icon ui-icon-delete"></span></a>
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Plus<span class="ui-icon ui-icon-plus"></span></a>
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Minus<span class="ui-icon ui-icon-minus"></span></a>
				<a href="#" class="ui-button ui-shadow ui-corner-all ui-button-icon-only ui-button-inline">Check<span class="ui-icon ui-icon-check"></span></a>
			</div>
		</div><!--/demo-html -->

		<p>Example of the classes applied to the <code>UL</code> or <code>OL</code> to change to the black icons for each list item.</p>
		<div data-demo-html="true">
			<ul data-role="listview" data-inset="true" class="ui-nodisc-icon ui-alt-icon">
				<li><a href="#">Acura</a></li>
				<li><a href="#">Audi</a></li>
				<li><a href="#">BMW</a></li>
				<li><a href="#">Cadillac</a></li>
				<li><a href="#">Ferrari</a></li>
			</ul>
		</div><!--/demo-html -->

		<p>Example of the classes being applied to a collapsible.</p>

		<div data-demo-html="true">
            <div data-role="collapsible" class="ui-nodisc-icon ui-alt-icon">
                <h4>Heading</h4>
                <p>I'm the collapsible content. By default I'm closed, but you can click the header to open me.</p>
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
