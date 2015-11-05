<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Responsive Web Design - jQuery Mobile Demos</title>
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

      	<h1>Responsive Web Design</h1>

      	<p>Responsive web design (RWD) is a design and technical approach that aims to adapt the layout and interaction of a site or app to work optimally across a wide range of device resolutions, screen densities and interaction modes with the same underlying codebase. The framework has a number of responsive widgets: <a href="../grids/">responsive grids</a>, <a href="../table-reflow/">reflow tables</a> and <a href="../table-column-toggle/">column chooser tables</a>, and <a href="../panel/">panels</a>.</p>

		<h2>RWD basics</h2>
      	<p>RWD has three key elements:</p>
      	<ul>
      		<li><strong>CSS media queries</strong>, used to target styles to specific device characteristics such as screen width breakpoint or resolution.</li>
      		<li><strong>A fluid grid</strong>, that specifies elements and widgets in flexible units with the goal of making them flow to fill their containers.</li>
      		<li><strong>Flexible images and media</strong>, are also sized in relative units so they re-size to fit within their containers.</li>
      	</ul>

      	<p>By creating all screen elements to be fluid and flexible, it allows the media queries to focus primarily on controlling layout rules for containers; the modules inside simply re-size to fit their containers.</p>

      	<p>A simple responsive example may be two stacked containers, each with flexible content or widgets inside. At greater widths, media queries are used to float both containers to create a two column layout to take better advantage of the wider screen.</p>

      	<p>Since the content inside each container is designed to re-flow to fit its parent, the media queries can focus just on the rules for making the columns stack or float, and to override or add styles only needed at greater widths.</p>

		<h2>Progressive Enhancement</h2>

      	<p>In addition to these three core RWD principles, we advocate following progressive enhancement (PE) practices. This means always starting with semantic HTML which will work on any device, then unobtrusively layering in advanced CSS and JS only for capable browsers. This provides a solid foundation for the device-level optimizations that RWD provides and is how the jQuery Mobile library is built.</p>

		<h2>Responsive &amp; Responsible</h2>

      	<p>When working with RWD, it's very important to consider performance to ensure that you're not simply taking a heavy desktop site and shrinking it down to mobile screens. We recommend following a "mobile-first" approach  to keep development focused on reducing bandwidth, server requests and optimizing source order.</p>

      	<p>When building a page, start by creating the lightest and most semantic HTML possible. Think about how the source order of the markup would work if you didn't have CSS or JS. Do not include code that is only needed for larger viewports and hide it at smaller widths. Instead, use Ajax to conditionally load these assets when larger screens are detected via JS.</p>

      	<p>When writing CSS for a responsive site or app, it's usually most efficient to write all the core typography and basic style elements outside of a media query to form the styles for the smallest devices, such as phones. This is a good approach because the majority of these core styles are usually also shared at greater widths, albeit in a different layout and it leverages the cascading power of CSS. Build up breakpoints using multiple <code>min-width</code> media queries to layer in additional style rules that should only apply above a certain screen width.</p>

      	<p>For images in your pages, we recommend starting with images sized for mobile screens in the markup. It doesn't make sense to serve a 1,000 pixel wide photo to a smartphone with a 480 pixel max resolution because this is a waste of bandwidth and memory. Instead, include an image targeted for a mobile size. Add a <code>width: 100%;</code> style rule to make images scale to the page or container, but not larger because this would look blurry.</p>

      	<p>For larger or higher resolution screens, there is a wide range of JS-based techniques and services to conditionally load a higher quality image. The forthcoming <code>picture</code>element will address the need to handle multiple image sources natively in HTML and can be used today with a polyfill script.</p>

      	<p>Always look for ways to limit the number of server requests on a page by concatenating files into a single request and always use minification and compression (gzip).</p>

		<h2>Responsive in jQuery Mobile</h2>

		<p>jQuery Mobile has always been designed to work within a responsive context and our docs and forms had a few responsive elements from the very start. All the widgets are built to be 100% flexible in width to fit easily inside any responsive layout system you choose to build.</p>

		<p>Here is a checklist of RWD tips to keep in mind:</p>

		<ul>
			<li><strong>Create a style override stylesheet and include it after the jQuery Mobile framework stylesheet.</strong> This will hold all your custom styles, tweaks to the default widgets and media queries.</li>
			<li><strong>Start by writing the styles you want to see at the narrowest screen width (i.e. "mobile first").</strong> These should be outside a media query. This mobile-first approach is efficient because you can lay down the core typography, colors and styles for mobile knowing that these tend to also be used for wider breakpoints.</li>
			<li><strong>Choose the breakpoints based on your content, not a specific device.</strong> Since there are devices of every imaginable width, it's smarter to choose breakpoints based on how your <em>content</em> looks in your design system. As you re-size the window to greater widths, identify where your content hits a point where it could adapt to take advantage of a wider width.</li>
			<li><strong>Write media queries' widths in ems, not pixels.</strong> This ensures the layout will adapt to font size changes in addition to screen widths. To calculate the width in ems, divide the target breakpoint in pixels (320px) by 16px (the default font size) to get the em-based width (20em). </li>
			<li><strong>Use <code>min-width</code> breakpoints that build on top of the mobile styles.</strong> The first breakpoint applies layout adjustments on top of the standard mobile styles so these can be fairly lightweight. Additional <code>min-width</code> breakpoints can be added for even wider screens that each build on the previous breakpoint styles.</li>
			<li><strong>To override framework styles only for smaller screens, use a <code>max-width</code> breakpoint instead.</strong>  This allows you to constrain your style overrides to only apply below a certain screen width. Above this width, all the normal styles will apply so this is good for certain types of overrides.</li>
		</ul>

		<h2>Putting it together</h2>

		<p>Here is a simple skeleton of a mobile-first stylesheet that starts with mobile-first styles, then builds up a responsive layout by adding two breakpoints:</p>

<pre><code>
<strong>/* Start with core styles outside of a media query that apply to mobile and up */
/* Global typography and design elements, stacked containers */
</strong>body { font-family: Helvetica, san-serif; }
H1 { color: green; }
a:link { color:purple; }

/* Stack the two content containers */
.main,
.sidebar { display:block; width:100%; }

<strong>/* First breakpoint at 576px */
/* Inherits mobile styles, but floats containers to make columns */
</strong>@media all and (min-width: 36em){
	.main { float: left; width:60%; }
	.sidebar { float: left; width:40%; }
}

<strong>/* Second breakpoint at 800px */
/* Adjusts column proportions, tweaks base H1 */
</strong>@media all and (min-width: 50em){
	.main { width:70%; }
	.sidebar { width:30%; }

	/* You can also tweak any other styles in a breakpoint */
	H1 { color: blue; font-size:1.2em }
}
</code></pre>

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
