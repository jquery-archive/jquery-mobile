<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Grids - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
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

		<h1>Grids</h1>

		<a href="http://api.jquerymobile.com/grid-layout/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>The jQuery Mobile framework provides a simple way to build CSS-based columns that can also be responsive.
			</p>

		<h2>Grid basics</h2>

		<p>Grids are 100% width, completely invisible (no borders or backgrounds) and don't have padding or margins, so they shouldn't interfere with the styles of elements placed inside them. Within the grid container, child elements are assigned <code>ui-block-a/b/c/d/e</code> in a sequential manner which makes each "block" element float side-by-side, forming the grid.</p>

		<h2>Two column grids</h2>

		<p>To build a two-column (50/50%) layout, start with a container with a <code>class</code> of <code>ui-grid-a</code>, and add two child containers inside it classed with <code>ui-block-a</code> for the first column and <code>ui-block-b</code> for the second. On the blocks below, we're adding two classes: <code>ui-bar</code> to add the default bar padding and <code>ui-bar-a</code> to apply the background and font styling for the "a" toolbar theme swatch. For illustration purposes, an inline <code>style="height:60px"</code> attribute is also added to each grid to set each to a standard height.</p>

			<div data-demo-html="true">
				<div class="ui-grid-a">
					<div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">Block A</div></div>
					<div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">Block B</div></div>
				</div><!-- /grid-a -->
			</div><!--/demo-html -->

		<p>Grid classes can be applied to any container. In this next example, we add <code>ui-grid-a</code> to a <code>fieldset</code>, and apply the <code>ui-block</code> classes to the container of each of the two buttons inside to stretch them each to 50% of the screen width:</p>

			<div data-demo-html="true">
				<fieldset class="ui-grid-a">
					<div class="ui-block-a"><input type="submit" value="Submit" data-theme="a"></div>
					<div class="ui-block-b"><input type="reset" value="Reset" data-theme="b"></div>
				</fieldset>
			</div><!--/demo-html -->

		<h2>Three-column grids</h2>

		<p>The other grid layout configuration uses <code>class=ui-grid-b</code> on the parent, and 3 child container elements, each with its respective <code>ui-block-a/b/c</code> class, to create a three-column layout (33/33/33%). </p>

			<div data-demo-html="true">
				<div class="ui-grid-b">
					<div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">Block A</div></div>
					<div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">Block B</div></div>
					<div class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:60px">Block C</div></div>
				</div><!-- /grid-b -->
			</div><!--/demo-html -->

		<p>And an example of a 3 column grid with buttons inside:</p>

			<div data-demo-html="true">
				<fieldset class="ui-grid-b">
					<div class="ui-block-a"><input type="button" value="Hmm"></div>
					<div class="ui-block-b"><input type="reset" value="No"></div>
					<div class="ui-block-c"><input type="submit" value="Yes"></div>
				</fieldset>
			</div><!--/demo-html -->

            <p>View more examples of <a href="../grids-buttons/" data-ajax="false">buttons in grids</a>.</p>

		<h2>Four-column grids</h2>

		<p>A four-column, 25/25/25/25% grid is created by specifying <code>class=ui-grid-c</code> on the parent and adding a fourth block. </p>

			<div data-demo-html="true">
				<div class="ui-grid-c">
					<div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">Block A</div></div>
					<div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">Block B</div></div>
					<div class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:60px">Block C</div></div>
					<div class="ui-block-d"><div class="ui-bar ui-bar-a" style="height:60px">Block D</div></div>
				</div><!-- /grid-c -->
			</div><!--/demo-html -->

		<h2>Five-column grids</h2>

		<p>A five-column, 20/20/20/20/20% grid is created by specifying <code>class=ui-grid-d</code> on the parent and adding a fifth block. </p>

			<div data-demo-html="true">
                <div class="ui-grid-d">
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">Block A</div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">Block B</div></div>
                    <div class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:60px">Block C</div></div>
                    <div class="ui-block-d"><div class="ui-bar ui-bar-a" style="height:60px">Block D</div></div>
                    <div class="ui-block-e"><div class="ui-bar ui-bar-a" style="height:60px">Block E</div></div>
                </div><!-- /grid-c -->
			</div><!--/demo-html -->

		<h2>Multiple row grids</h2>

		<p>Grids are designed to wrap to multiple rows of items. For example, if you specify a 3-column grid (ui-grid-b) on a container that has nine child blocks, it will wrap to 3 rows of 3 items each. There is a CSS rule to clear the floats and start a new line when the <code>class=ui-block-a</code> is seen so make sure to assign block classes in a repeating sequence (a, b, c, a, b, c, etc.) that maps to the grid type:</p>

			<div data-demo-html="true">
                <div class="ui-grid-b">
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">Block A</div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">Block B</div></div>
                    <div class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:60px">Block C</div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">Block A</div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">Block B</div></div>
                    <div class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:60px">Block C</div></div>
                    <div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px">Block A</div></div>
                    <div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px">Block B</div></div>
                    <div class="ui-block-c"><div class="ui-bar ui-bar-a" style="height:60px">Block C</div></div>
                </div><!-- /grid-c -->
			</div><!--/demo-html -->

		<h2>Grid solo class</h2>

		<p>The framework adds left and right margin to buttons in a grid (one exception: 100% width button elements). For a single button you can use a container with class <code>ui-grid-solo</code> and wrap the button in a div with class <code>ui-block-a</code> like the example below. This way the button will get the same margin. View more examples of <a href="../grids-buttons/" data-ajax="false">buttons in grids</a>.</p>

			<div data-demo-html="true">
				<div class="ui-grid-a">
					<div class="ui-block-a"><a class="ui-shadow ui-button ui-corner-all">Previous</a></div>
					<div class="ui-block-b"><a class="ui-shadow ui-button ui-corner-all">Next</a></div>
				</div>

				<div class="ui-grid-solo">
					<div class="ui-block-a"><input type="button" value="More"></div>
				</div>
			</div><!--/demo-html -->

		<h2>Responsive grids</h2>

		<p>It's straightforward to take the standard grids and make them responsive by stacking the grid blocks at narrow widths. Since we just want to override the floats and widths of the standard grid styles <em>below</em> a single breakpoint, use a <code>max-width</code> breakpoint to only apply the stacked styling as an override.</p>

		<p>We recommend adding a class (ex: <code>my-breakpoint</code>) to scope the styles for the media query so it can be applied selectively. From this basic start, you can customize the appearance further or even add additional breakpoints. See an example of a <a href="../grids-custom-responsive/" data-ajax="false">custom responsive grid</a>.</p>

<pre><code>
/* stack all grids below 40em (640px) */
<strong>@media all and (max-width: 35em) {</strong>
	.my-breakpoint .ui-block-a,
	.my-breakpoint .ui-block-b,
	.my-breakpoint .ui-block-c,
	.my-breakpoint .ui-block-d,
	.my-breakpoint .ui-block-e {
		width: 100%;
		float: none;
	}
<strong>}</strong>
</code></pre>

            <h2>Breakpoint preset</h2>

            <p>To apply a preset breakpoint to stack grids below 35em (560px), add the <code>.ui-responsive</code> class to the grid container.</p>

            <!-- view source utilty wrapper -->
            <div data-demo-html="true" data-demo-css="true">

                <h3>Grid A (50/50)</h3>

                <div class="ui-grid-a ui-responsive">
                    <div class="ui-block-a"><div class="ui-body ui-body-d">Block A</div></div>
                    <div class="ui-block-b"><div class="ui-body ui-body-d">Block B</div></div>
                </div><!-- /grid-a -->

                <h3>Grid B (33/33/33)</h3>

                <div class="ui-grid-b ui-responsive">
                    <div class="ui-block-a"><div class="ui-body ui-body-d">Block A</div></div>
                    <div class="ui-block-b"><div class="ui-body ui-body-d">Block B</div></div>
                    <div class="ui-block-c"><div class="ui-body ui-body-d">Block C</div></div>
                </div><!-- /grid-b -->

                <h3>Grid C (25/25/25/25)</h3>

                <div class="ui-grid-c ui-responsive">
                    <div class="ui-block-a"><div class="ui-body ui-body-d">A</div></div>
                    <div class="ui-block-b"><div class="ui-body ui-body-d">B</div></div>
                    <div class="ui-block-c"><div class="ui-body ui-body-d">C</div></div>
                    <div class="ui-block-d"><div class="ui-body ui-body-d">D</div></div>
                </div><!-- /grid-c -->

                <h3>Grid D (20/20/20/20/20)</h3>

                <div class="ui-grid-d ui-responsive">
                    <div class="ui-block-a"><div class="ui-body ui-body-d">A</div></div>
                    <div class="ui-block-b"><div class="ui-body ui-body-d">B</div></div>
                    <div class="ui-block-c"><div class="ui-body ui-body-d">C</div></div>
                    <div class="ui-block-d"><div class="ui-body ui-body-d">D</div></div>
                    <div class="ui-block-e"><div class="ui-body ui-body-d">E</div></div>
                </div><!-- /grid-d -->

            </div><!-- /data-demo -->

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
