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
        .ui-icon-myicon:after {
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

        <h1>Icons <a href="http://api.jquerymobile.com/icons/" class="jqm-api-docs-link ui-button ui-icon-end ui-nodisc-icon ui-alt-icon ui-button-inline ui-corner-all ui-mini">API<span class="ui-icon ui-icon-carat-r"></span></a></h1>

        <p>A set of built-in icons in jQuery Mobile can be applied to buttons, collapsibles, listview buttons and more. There is an SVG and PNG image of each icon. By default the SVG icons, that look great on both SD and HD screens, are used. On platforms that don't support SVG the framework falls back to PNG icons.</p>

        <h2>Icon set</h2>

        <p>The text in the buttons below show the name of the icon used in that button.</p>

        <p>In widgets where you set the icon with a <code>data-icon</code> attribute you use the name of the icon as value. For example: <code>data-icon="arrow-r"</code>.</p>

        <p>To add an icon to link buttons and <code>button</code> elements, use the name prefixed with <code>ui-icon-</code> as class. For example: <code>ui-icon-arrow-r</code>. See also <a href="../button/">Button</a>.</p>

        <div data-demo-html="true">
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">action<span class="ui-icon ui-icon-action"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">alert<span class="ui-icon ui-icon-alert"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-d<span class="ui-icon ui-icon-arrow-d"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-d-l<span class="ui-icon ui-icon-arrow-d-l"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-d-r<span class="ui-icon ui-icon-arrow-d-r"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-l<span class="ui-icon ui-icon-arrow-l"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-r<span class="ui-icon ui-icon-arrow-r"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-u<span class="ui-icon ui-icon-arrow-u"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-u-l<span class="ui-icon ui-icon-arrow-u-l"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-u-r<span class="ui-icon ui-icon-arrow-u-r"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">audio<span class="ui-icon ui-icon-audio"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">back<span class="ui-icon ui-icon-back"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">bars<span class="ui-icon ui-icon-bars"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">bullets<span class="ui-icon ui-icon-bullets"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">calendar<span class="ui-icon ui-icon-calendar"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">camera<span class="ui-icon ui-icon-camera"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">carat-d<span class="ui-icon ui-icon-carat-d"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">carat-l<span class="ui-icon ui-icon-carat-l"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">carat-r<span class="ui-icon ui-icon-carat-r"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">carat-u<span class="ui-icon ui-icon-carat-u"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">check<span class="ui-icon ui-icon-check"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">clock<span class="ui-icon ui-icon-clock"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">cloud<span class="ui-icon ui-icon-cloud"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">comment<span class="ui-icon ui-icon-comment"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">delete<span class="ui-icon ui-icon-delete"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">edit<span class="ui-icon ui-icon-edit"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">eye<span class="ui-icon ui-icon-eye"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">forbidden<span class="ui-icon ui-icon-forbidden"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">forward<span class="ui-icon ui-icon-forward"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">gear<span class="ui-icon ui-icon-gear"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">grid<span class="ui-icon ui-icon-grid"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">heart<span class="ui-icon ui-icon-heart"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">home<span class="ui-icon ui-icon-home"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">info<span class="ui-icon ui-icon-info"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">location<span class="ui-icon ui-icon-location"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">lock<span class="ui-icon ui-icon-lock"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">mail<span class="ui-icon ui-icon-mail"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">minus<span class="ui-icon ui-icon-minus"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">navigation<span class="ui-icon ui-icon-navigation"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">phone<span class="ui-icon ui-icon-phone"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">plus<span class="ui-icon ui-icon-plus"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">power<span class="ui-icon ui-icon-power"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">recycle<span class="ui-icon ui-icon-recycle"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">refresh<span class="ui-icon ui-icon-refresh"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">search<span class="ui-icon ui-icon-search"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">shop<span class="ui-icon ui-icon-shop"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">star<span class="ui-icon ui-icon-star"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">tag<span class="ui-icon ui-icon-tag"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">user<span class="ui-icon ui-icon-user"></span></button>
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">video<span class="ui-icon ui-icon-video"></span></button>
        </div><!--/demo-html -->

        <h2>Custom Icons</h2>

		<p>Icons are displayed as background image of <code>:after</code> pseudo elements. Target the pseudo element to set a custom icon.</p>

        <div data-demo-html="true" data-demo-css="#custom-icon">
			<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">myicon<span class="ui-icon ui-icon-myicon"></span></button>
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
			<a href="index.php" class="ui-button ui-shadow ui-corner-all ui-icon-beginning">Left<span class="ui-icon ui-icon-arrow-l"></span></a>
			<a href="index.php" class="ui-button ui-shadow ui-corner-all ui-icon-end">Right<span class="ui-icon ui-icon-arrow-r"></span></a>
			<a href="index.php" class="ui-button ui-shadow ui-corner-all ui-icon-top">Top<span class="ui-icon ui-icon-arrow-u"></span></a>
			<a href="index.php" class="ui-button ui-shadow ui-corner-all ui-icon-bottom">Bottom<span class="ui-icon ui-icon-arrow-d"></span></a>
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
			<a href="index.php" class="ui-shadow-icon ui-button ui-shadow ui-corner-all ui-icon-beginning">Icon shadow<span class="ui-icon ui-icon-delete"></span></a>
			<a href="index.php" class="ui-shadow-icon ui-button ui-shadow ui-corner-all ui-button-b ui-icon-beginning">Icon shadow<span class="ui-icon ui-icon-delete"></span></a>
        </div><!--/demo-html -->

        <h2>Removing the disc</h2>

        <p>The semi-transparent dark circle behind the icon ensures good contrast on any background color so it works well with the jQuery Mobile theming system. If you prefer to not have this disc, it can be removed by adding the class <code>ui-nodisc-icon</code> to the element or its container.</p>

        <div data-demo-html="true">
			<a href="index.php" class="ui-nodisc-icon ui-button ui-shadow ui-corner-all ui-icon-beginning">No disc<span class="ui-icon ui-icon-delete"></span></a>
			<a href="index.php" class="ui-nodisc-icon ui-button ui-shadow ui-corner-all ui-button-b ui-icon-beginning">No disc<span class="ui-icon ui-icon-delete"></span></a>
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
        	<a href="index.php" class="ui-alt-icon ui-button ui-shadow ui-corner-all ui-icon-beginning">Alt icon<span class="ui-icon ui-icon-delete"></span></a>
			<a href="index.php" class="ui-alt-icon ui-button ui-shadow ui-corner-all ui-button-b ui-icon-beginning">Alt icon<span class="ui-icon ui-icon-delete"></span></a>
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
		<p>Copyright The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
