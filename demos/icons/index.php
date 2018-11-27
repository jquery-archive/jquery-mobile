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
			background-size: 18px 18px;
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

        <h1>Icons</h1>

		<a href="http://api.jquerymobile.com/icons/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

        <p>A set of built-in icons in jQuery Mobile can be applied to buttons, collapsibles, listview buttons and more. There is an SVG and PNG image of each icon. By default the SVG icons, that look great on both SD and HD screens, are used. On platforms that don't support SVG the framework falls back to PNG icons.</p>

        <h2>Icon set</h2>

        <p>The text in the buttons below show the name of the icon used in that button.</p>

        <p>You can set the icon with a <code>data-icon</code> attribute, using the name of the icon as value. For example: <code>data-icon="ui-icon-arrow-r"</code>.</p>

        <div data-demo-html="true">
            <button data-icon="ui-icon-action">ui-icon-action</button>
			<button data-icon="ui-icon-alert">ui-icon-alert</button>
			<button data-icon="ui-icon-arrow-d">ui-icon-arrow-d</button>
			<button data-icon="ui-icon-arrow-d-l">ui-icon-arrow-d-l</button>
			<button data-icon="ui-icon-arrow-d-r">ui-icon-arrow-d-r</button>
			<button data-icon="ui-icon-arrow-l">ui-icon-arrow-l</button>
			<button data-icon="ui-icon-arrow-r">ui-icon-arrow-r</button>
			<button data-icon="ui-icon-arrow-u">ui-icon-arrow-u</button>
			<button data-icon="ui-icon-arrow-u-l">ui-icon-arrow-u-l</button>
			<button data-icon="ui-icon-arrow-u-r">ui-icon-arrow-u-r</button>
			<button data-icon="ui-icon-audio">ui-icon-audio</button>
			<button data-icon="ui-icon-back">ui-icon-back</button>
			<button data-icon="ui-icon-bars">ui-icon-bars</button>
			<button data-icon="ui-icon-bullets">ui-icon-bullets</button>
			<button data-icon="ui-icon-calendar">ui-icon-calendar</button>
			<button data-icon="ui-icon-camera">ui-icon-camera</button>
			<button data-icon="ui-icon-caret-d">ui-icon-caret-d</button>
			<button data-icon="ui-icon-caret-l">ui-icon-caret-l</button>
			<button data-icon="ui-icon-caret-r">ui-icon-caret-r</button>
			<button data-icon="ui-icon-caret-u">ui-icon-caret-u</button>
			<button data-icon="ui-icon-check">ui-icon-check</button>
			<button data-icon="ui-icon-clock">ui-icon-clock</button>
			<button data-icon="ui-icon-cloud">ui-icon-cloud</button>
			<button data-icon="ui-icon-comment">ui-icon-comment</button>
			<button data-icon="ui-icon-delete">ui-icon-delete</button>
			<button data-icon="ui-icon-edit">ui-icon-edit</button>
			<button data-icon="ui-icon-eye">ui-icon-eye</button>
			<button data-icon="ui-icon-forbidden">ui-icon-forbidden</button>
			<button data-icon="ui-icon-forward">ui-icon-forward</button>
			<button data-icon="ui-icon-gear">ui-icon-gear</button>
			<button data-icon="ui-icon-grid">ui-icon-grid</button>
			<button data-icon="ui-icon-heart">ui-icon-heart</button>
			<button data-icon="ui-icon-home">ui-icon-home</button>
			<button data-icon="ui-icon-info">ui-icon-info</button>
			<button data-icon="ui-icon-location">ui-icon-location</button>
			<button data-icon="ui-icon-lock">ui-icon-lock</button>
			<button data-icon="ui-icon-mail">ui-icon-mail</button>
			<button data-icon="ui-icon-minus">ui-icon-minus</button>
			<button data-icon="ui-icon-navigation">ui-icon-navigation</button>
			<button data-icon="ui-icon-phone">ui-icon-phone</button>
			<button data-icon="ui-icon-plus">ui-icon-plus</button>
			<button data-icon="ui-icon-power">ui-icon-power</button>
			<button data-icon="ui-icon-recycle">ui-icon-recycle</button>
			<button data-icon="ui-icon-refresh">ui-icon-refresh</button>
			<button data-icon="ui-icon-search">ui-icon-search</button>
			<button data-icon="ui-icon-shop">ui-icon-shop</button>
			<button data-icon="ui-icon-star">ui-icon-star</button>
			<button data-icon="ui-icon-tag">ui-icon-tag</button>
			<button data-icon="ui-icon-user">ui-icon-user</button>
			<button data-icon="ui-icon-video">ui-icon-video</button>
        </div><!--/demo-html -->

        <h2>Custom Icons</h2>

		<p>Icons are displayed as background image of a <code>span</code> element and have a background size of 18x18px. The example below shows the custom CSS that you would need to use to add your own icons.</p>

        <div data-demo-html="true" data-demo-css="#custom-icon">
			<button data-icon="ui-icon-myicon">myicon</button>
		</div>

		<p>You can safely use SVG icons. The framework contains a SVG support test and adds class <code>ui-nosvg</code> to the <code>html</code> element on platforms that don't support SVG. Use this class in your CSS to provide a PNG image as fallback.</p>

<pre><code>
.ui-icon-myicon {
	background-image: url("iconimg.svg");
}
/* Fallback */
.ui-nosvg .ui-icon-myicon {
	background-image: url("iconimg.png");
}
</code></pre>

		<h2>Icon positioning</h2>

		<p>In case of link buttons and <code>button</code> elements there are four possible icon positions; "beginning" (left), "end" (right), "top", and "bottom". By default the icon is placed at the beginning, but this can be overridden by using the <code>data-iconpos</code> attribute.</p>

		<h3>Block buttons</h3>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-icon="ui-icon-arrow-l">Beginning</a>
			<a href="index.php" data-role="button" data-icon="ui-icon-arrow-r" data-icon-position="end">End</a>
			<a href="index.php" data-role="button" data-icon="ui-icon-arrow-u" data-icon-position="top">Top</a>
			<a href="index.php" data-role="button" data-icon="ui-icon-arrow-d" data-icon-position="bottom">Bottom</a>
		</div><!--/demo-html -->

		<h3>Mini buttons</h3>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-arrow-l">Beginning</a>
			<a href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-arrow-r" data-icon-position="end">End</a>
			<a href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-arrow-u" data-icon-position="top">Top</a>
			<a href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-arrow-d" data-icon-position="bottom">Bottom</a>
		</div><!--/demo-html -->

		<h3>Inline buttons</h3>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-arrow-l">Beginning</a>
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-arrow-r" data-icon-position="end">End</a>
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-arrow-u" data-icon-position="top">Top</a>
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-arrow-d" data-icon-position="bottom">Bottom</a>
		</div><!--/demo-html -->

		<h3>Inline mini buttons</h3>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-inline="true" data-mini="true" data-icon="ui-icon-arrow-l">Beginning</a>
			<a href="index.php" data-role="button" data-inline="true" data-mini="true" data-icon="ui-icon-arrow-r" data-icon-position="end">End</a>
			<a href="index.php" data-role="button" data-inline="true" data-mini="true" data-icon="ui-icon-arrow-u" data-icon-position="top">Top</a>
			<a href="index.php" data-role="button" data-inline="true" data-mini="true" data-icon="ui-icon-arrow-d" data-icon-position="bottom">Bottom</a>
		</div><!--/demo-html -->

		<h2>Float icons</h2>

		<p>The framework offers helper classes, <code>ui-widget-icon-floatbeginning</code> and <code>ui-widget-icon-floatend</code> to make icons inside block buttons float to the beginning or end.</p>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-icon="ui-icon-caret-l" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-l ui-widget-icon-floatbeginning" }'>Beginning</a>
			<button href="index.php" data-role="button" data-icon="ui-icon-caret-l" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-l ui-widget-icon-floatbeginning" }'>Beginning</button>
			<a href="index.php" data-role="button" data-icon="ui-icon-caret-r" data-icon-position="end" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-r ui-widget-icon-floatend" }'>End</a>
			<button href="index.php" data-role="button" data-icon="ui-icon-caret-r" data-icon-position="end" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-r ui-widget-icon-floatend" }'>End</button>
			<a href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-caret-l" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-l ui-widget-icon-floatbeginning" }'>Beginning</a>
			<button href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-caret-l" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-l ui-widget-icon-floatbeginning" }'>Beginning</button>
			<a href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-caret-r" data-icon-position="end" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-r ui-widget-icon-floatend" }'>End</a>
			<button href="index.php" data-role="button" data-mini="true" data-icon="ui-icon-caret-r" data-icon-position="end" data-classes='{ "ui-button-icon": "ui-button-icon ui-icon ui-icon-caret-r ui-widget-icon-floatend" }'>End</button>
		</div><!--/demo-html -->

		<p>Examples of adding the helper class to icons in pre-enhanced buttons.</p>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget"><span class="ui-button-icon ui-icon ui-icon-caret-l ui-widget-icon-floatbeginning"></span><span class="ui-button-icon-space"> </span>Beginning</a>
			<button data-role="button" data-enhanced="true" class="ui-button ui-shadow ui-corner-all ui-widget">End<span class="ui-button-icon-space"> </span><span class="ui-button-icon ui-icon ui-icon-caret-r ui-widget-icon-floatend"></span></button>
        </div><!--/demo-html -->

		<p>Examples of adding the helper class to icons in CSS-only buttons.</p>

		<div data-demo-html="true">
			<a href="index.php" class="ui-button ui-shadow ui-corner-all"><span class="ui-button-icon ui-icon ui-icon-caret-l ui-widget-icon-floatbeginning"></span> Beginning</a>
			<button data-role="none" class="ui-button ui-shadow ui-corner-all">End <span class="ui-button-icon ui-icon ui-icon-caret-r ui-widget-icon-floatend"></span></button>
        </div><!--/demo-html -->

		<h2>Icon-only</h2>

		<p>Add <code>data-show-label="false"</code> if you want to create an icon-only button.</p>

        <div data-demo-html="true">
			<a href="index.php" data-role="button" data-icon="ui-icon-delete" data-show-label="false">Icon only</a>
        </div><!--/demo-html -->

        <h2>Removing the disc</h2>

        <p>The semi-transparent dark circle behind the icon ensures good contrast on any background color so it works well with the jQuery Mobile theming system. If you prefer to not have this disc, it can be removed by adding the class <code>ui-nodisc-icon</code> to the element or its container.</p>

        <div data-demo-html="true">
			<a href="index.php" data-role="button" data-icon="ui-icon-plus" class="ui-nodisc-icon">No disc</a>
			<a href="index.php" data-role="button" data-icon="ui-icon-minus" data-theme="b" class="ui-nodisc-icon">No disc</a>
        </div><!--/demo-html -->

		<p>Example of the class being applied to a wrapper.</p>

		<div data-demo-html="true">
			<div class="ui-nodisc-icon"><!-- Class added to the wrapper -->
				<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-plus">No disc</a>
				<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-minus" data-theme="b">No disc</a>
			</div>
		</div><!--/demo-html -->

        <h2>Black versus white icon sets</h2>

        <p>Icons are white by default but you can switch to black icons by adding the <code>ui-alt-icon</code> class to the element or its container. This also changes the color that is used for the discs.</p>

        <div data-demo-html="true">
			<a href="index.php" data-role="button" data-icon="ui-icon-plus" class="ui-alt-icon">Alt icon</a>
			<a href="index.php" data-role="button" data-icon="ui-icon-minus" data-theme="b" class="ui-alt-icon">Alt icon</a>
        </div><!--/demo-html -->

		<p>Example of the class being applied to a wrapper.</p>

		<div data-demo-html="true" class="ui-alt-icon">
			<div class="ui-alt-icon"><!-- Class added to the wrapper -->
				<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-plus">Alt icon</a>
				<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-minus" data-theme="b">Alt icon</a>
			</div>
		</div><!--/demo-html -->

		<h2>Combining alt and nodisc</h2>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-plus" data-show-label="false" class="ui-nodisc-icon ui-alt-icon">Alt icon without disc</a>
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-minus" data-theme="b" data-show-label="false" class="ui-nodisc-icon ui-alt-icon">Alt icon without disc</a>
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-plus" data-show-label="false" class="ui-nodisc-icon ui-alt-icon">Alt icon without disc</a>
			<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-minus" data-theme="b" data-show-label="false" class="ui-nodisc-icon">No disc</a>
		</div><!--/demo-html -->

		<p>Example of the classes being applied to a wrapper.</p>

		<div data-demo-html="true">
			<div class="ui-nodisc-icon ui-alt-icon"><!-- Classes added to the wrapper -->
				<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-plus" data-show-label="false">Alt icon without disc</a>
				<a href="index.php" data-role="button" data-inline="true" data-icon="ui-icon-minus" data-theme="b" data-show-label="false">Alt icon without disc</a>
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

		<h2>CSS only buttons with icons</h2>

		<p>Examples of buttons with icons that don't use the Button widget.</p>

		<div data-demo-html="true">
			<a href="index.php" class="ui-button ui-button-inline ui-shadow ui-corner-all ui-button-b">Link <span class="ui-button-icon ui-icon ui-icon-delete"></span></a>
			<button data-role="none" class="ui-button ui-button-inline ui-shadow ui-corner-all ui-button-b">Button <span class="ui-button-icon ui-icon ui-icon-delete"></span></button>
        </div><!--/demo-html -->

		<h2>Enhanced buttons with icons</h2>

		<p>Examples of buttons with icons that do use the Button widget, but are pre-enhanced.</p>

		<div data-demo-html="true">
			<a href="index.php" data-role="button" data-enhanced="true" data-inline="true" data-theme="b" class="ui-button ui-button-inline ui-shadow ui-corner-all ui-button-b ui-widget">Link<span class="ui-button-icon-space"> </span><span class="ui-button-icon ui-icon ui-icon-delete"></span></a>
			<button data-role="button" data-enhanced="true" data-inline="true" data-theme="b" class="ui-button ui-button-inline ui-shadow ui-corner-all ui-button-b ui-widget">Button<span class="ui-button-icon-space"> </span><span class="ui-button-icon ui-icon ui-icon-delete"></span></button>
        </div><!--/demo-html -->

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
