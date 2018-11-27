<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Custom responsive grids - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<!-- We're using a style block to make it easy to view the custom styles -->
	<!-- In production, these should be added to a custom.css file loaded in the head -->
	<style>
		/* Basic styles */
		.rwd-example .ui-body {
			text-align: left;
			border-color: #ddd;
		}
		.rwd-example p {
			color: #777;
			line-height: 140%
		}

		/* Stack all blocks to start */
		.rwd-example .ui-block-a,
		.rwd-example .ui-block-b,
		.rwd-example .ui-block-c {
			width: 100%;
			float: none;
		}

		/* Collapsing borders */
		.rwd-example > div + div .ui-body {
			border-top-width: 0;
		}

		/* 1st breakpoint - Float B and C, leave A full width on top */
		@media all and (min-width: 42em) {
			.rwd-example {
				overflow: hidden; /* Use this or a "clearfix" to give the container height */
			}
			.rwd-example .ui-body {
			   min-height: 14em;
			}
			.rwd-example .ui-block-b,
			.rwd-example .ui-block-c {
			  float: left;
			  width: 49.95%;
			}
			.rwd-example .ui-block-b p,
			.rwd-example .ui-block-c p {
			  font-size: .8em;
			}
			.rwd-example > div + div .ui-body {
				border-top-width: 1px;
			}
			.rwd-example > div:first-child .ui-body {
				border-bottom-width: 0;
			}
			.rwd-example > div:last-child .ui-body {
				border-left-width: 0;
			}
		}

		/* 2nd breakpoint - Float all, 50/25/25 */
		@media all and (min-width: 55em) {
			.rwd-example .ui-body {
			   min-height: 18em;
			}
			.rwd-example .ui-block-a,
			.rwd-example .ui-block-c {
			  float: left;
			  width: 49.95%;
			}
			.rwd-example .ui-block-b,
			.rwd-example .ui-block-c {
			  float: left;
			  width: 24.925%;
			}
			.rwd-example > div:first-child .ui-body {
				border-bottom-width: 1px;
			}
			.rwd-example > div + div .ui-body {
				border-left-width: 0;
			}
		}

		/* 3rd breakpoint - Bump up font size at very wide screens */
		@media all and (min-width: 75em) {
			.rwd-example .ui-body {
			  font-size: 125%;
			}
			.rwd-example .ui-block-a,
			.rwd-example .ui-block-c {
			  float: left;
			  width: 49.95%;
			}
			.rwd-example .ui-block-b,
			.rwd-example .ui-block-c {
			  float: left;
			  width: 24.925%;
			}
		}
	</style>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Custom responsive grid</h1>

		<a href="http://api.jquerymobile.com/responsive-grid/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

        <p>It's easy to extend the basic grid styles into a custom responsive layout by using CSS media queries to adjust the layout and design across various screen width breakpoints.</p>

        <p>This example is a typical news feature block that changes its layout across screen widths and illustrates how to change the grid ratios and overall layout with simple CSS. It starts as a simple set of stacked stories on phones, that goes to a layout with the lead story full width stacked over a 50/50 layout of the secondary stories. At wider widths, these secondary stories float next to the lead story in a 50/25/25 layout. When the screen gets very wide, the font size is bumped up to keep line lengths short.</p>
        <p>Use the view source button below to see how the media queries work for each of these breakpoints.</p>

        <!-- view source utilty wrapper -->
        <div data-demo-html="true" data-demo-css="true">

            <div class="rwd-example">

                <!-- Lead story block -->
                <div class="ui-block-a">
                    <div class="ui-body ui-body-d">
                        <h2>Apple schedules 'iPad Mini' event for October 23</h2>
                        <p>One of the worst-kept secrets in tech has been confirmed: Apple will hold an event October 23 in San Jose, California, at which the company is widely expected to unveil a smaller, cheaper version of its popular iPad called "Mini".</p>
                    </div>
                </div>

                <!-- secondary story block #1 -->
                <div class="ui-block-b">
                    <div class="ui-body ui-body-d">
                        <h4>Microsoft Surface tablet goes on sale for $499</h4>
                        <p>The Microsoft Surface tablet picture has come into focus. The Redmond giant filled in the blanks on the new tablet's availability and specs.</p>
                    </div>
                </div>

                <!-- secondary story block #2 -->
                <div class="ui-block-c">
                    <div class="ui-body ui-body-d">
                        <h4>AOL unveils Alto, an email service that syncs 5 accounts</h4>
                        <p>AOL, struggling to shed its outdated image, is reimagining one of the most visibly aging parts of its platform: Its email service. </p>
                    </div>
                </div>

            </div><!-- /rwd-example -->

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
