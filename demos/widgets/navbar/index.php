<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Navbar - jQuery Mobile Demos</title>
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

			<h1>Navbar <a href="http://api.jquerymobile.com/navbar/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">jQuery Mobile has a very basic navbar widget that is useful for providing up to 5 buttons with optional icons in a bar.
			</p>

			<h2>Navbar basics</h2>

			<p>A navbar is coded as an unordered list of links wrapped in a container element that has the <code> data-role="navbar"</code> attribute. When a link in the navbar is clicked it gets the active (selected) state. The <code>ui-btn-active</code> class is first removed from all anchors in the navbar before it is added to the activated link. If this is a link to another page, the class will be removed again after the transition has completed.</p>

			<p>To set an item to the active state, add <code>class="ui-btn-active"</code> to an anchor in the markup. Additionally add a class of <code>ui-state-persist</code> to make the framework restore the active state each time the page is shown while it exists in the DOM.</p>

			<p>Navbars with 1 item will render as 100% wide.</p>

			<div data-demo-html="true">
				<div data-role="navbar">
					<ul>
						<li><a href="#" class="ui-btn-active">One</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!--/demo-html -->

			<p>The navbar items are set to divide the space evenly so in this case, each button is 1/2 the width of the browser window:</p>

			<div data-demo-html="true">
				<div data-role="navbar">
					<ul>
						<li><a href="#" class="ui-btn-active">One</a></li>
						<li><a href="#">Two</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!--/demo-html -->

			<p>Adding a third item will automatically make each button 1/3 the width of the browser window:</p>

			<div data-demo-html="true">
				<div data-role="navbar">
					<ul>
						<li><a href="#" class="ui-btn-active">One</a></li>
						<li><a href="#">Two</a></li>
						<li><a href="#">Three</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!--/demo-html -->

			<p>Adding a fourth more item will automatically make each button 1/4 the width of the browser window:</p>

			<div data-demo-html="true">
				<div data-role="navbar" data-grid="c">
					<ul>
						<li><a href="#" class="ui-btn-active">One</a></li>
						<li><a href="#">Two</a></li>
						<li><a href="#">Three</a></li>
						<li><a href="#">Four</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!--/demo-html -->

			<p>The navbar maxes out with 5 items, each 1/5 the width of the browser window:</p>

			<div data-demo-html="true">
				<div data-role="navbar" data-grid="d">
					<ul>
						<li><a href="#" class="ui-btn-active">One</a></li>
						<li><a href="#">Two</a></li>
						<li><a href="#">Three</a></li>
						<li><a href="#">Four</a></li>
						<li><a href="#">Five</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!--/demo-html -->

			<h2>Multi-row</h2>

			<p>If more than 5 items are added, the navbar will simply wrap to multiple lines of two across:</p>

			<div data-demo-html="true">
				<div data-role="navbar">
					<ul>
						<li><a href="#" class="ui-btn-active">One</a></li>
						<li><a href="#">Two</a></li>
						<li><a href="#">Three</a></li>
						<li><a href="#">Four</a></li>
						<li><a href="#">Five</a></li>
						<li><a href="#">Six</a></li>
						<li><a href="#">Seven</a></li>
						<li><a href="#">Eight</a></li>
						<li><a href="#">Nine</a></li>
						<li><a href="#">Ten</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!--/demo-html -->

			<h2>Navbars in headers</h2>

			<p>If you want to add a navbar to the top of the page, you can still have a page title and buttons. Just add the navbar container inside the header block, right after the title and buttons in the source order.</p>

			<div data-demo-html="true">
				<div data-role="header" style="overflow:hidden;">
					<h1>I'm a header</h1>
					<a href="#" data-icon="gear" class="ui-btn-right">Options</a>
					<div data-role="navbar">
						<ul>
							<li><a href="#">One</a></li>
							<li><a href="#">Two</a></li>
							<li><a href="#">Three</a></li>
						</ul>
					</div><!-- /navbar -->
				</div><!-- /header -->
			</div><!--/demo-html -->

			<h2>Navbars in footers</h2>

			<p>If you want to add a navbar to the bottom of the page so it acts more like a tab bar, simply wrap the navbar in a container with a <code>data-role="footer"</code></p>

			<div data-demo-html="true">
				<div data-role="footer" style="overflow:hidden;">
					<h4 style="text-align:center;">I'm the footer</h4>
					<div data-role="navbar">
						<ul>
							<li><a href="#">One</a></li>
							<li><a href="#">Two</a></li>
							<li><a href="#">Three</a></li>
						</ul>
					</div><!-- /navbar -->
				</div><!-- /footer -->
			</div><!--/demo-html -->

			<h2>Persistent</h2>

			<p>The <a href="../fixed-toolbars/footer-persist-a.php">persistent navbar</a> variation is designed to work more like a tab bar that stays fixed as you navigate across pages. To set an item to the active state upon initialization of the navbar, add <code>class="ui-btn-active"</code> to the corresponding anchor in your markup. Additionally add a class of <code>ui-state-persist</code> to make the framework restore the active state each time the page is shown while it exists in the DOM.</p>

			<h2>Icons</h2>

			<p>Icons can be added to navbar items by adding the <code> data-icon</code> attribute specifying a <a href="../icons/">standard mobile icon</a> to each anchor. By default, icons are added above the text (<code>data-iconpos="top"</code>). The following examples add icons to a navbar in a footer.</p>

			<div data-demo-html="true">
				<div data-role="footer">
					<div data-role="navbar">
						<ul>
							<li><a href="#" data-icon="grid">Summary</a></li>
							<li><a href="#" data-icon="star" class="ui-btn-active">Favs</a></li>
							<li><a href="#" data-icon="gear">Setup</a></li>
						</ul>
					</div><!-- /navbar -->
			</div><!-- /footer -->
			</div><!--/demo-html -->

			<h2>Icon position</h2>

			<p>The icon position is set <em>on the navbar container</em> instead of for individual links within for visual consistency. For example, to place the icons below the labels, add the <code> data-iconpos="bottom"</code> attribute to the navbar container.</p>

		<div data-demo-html="true">
			<p>This will result in a bottom icon alignment:</p>
			<div data-role="footer">
				<div data-role="navbar" data-iconpos="bottom">
					<ul>
						<li><a href="#" data-icon="grid">Summary</a></li>
						<li><a href="#" data-icon="star" class="ui-btn-active">Favs</a></li>
						<li><a href="#" data-icon="gear">Setup</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!-- /footer -->
			</div><!--/demo-html -->

			<p>The icon position can be set to <code>data-iconpos="left"</code>:</p>

			<div data-demo-html="true">
			<div data-role="footer">
				<div data-role="navbar" data-iconpos="left">
					<ul>
						<li><a href="#" data-icon="grid">Summary</a></li>
						<li><a href="#" data-icon="star" class="ui-btn-active">Favs</a></li>
						<li><a href="#" data-icon="gear">Setup</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!-- /footer -->
			</div><!--/demo-html -->

			<p>Or the icon position can be set to <code>data-iconpos="right"</code>:</p>

			<div data-demo-html="true">
			<div data-role="footer">
				<div data-role="navbar" data-iconpos="right">
					<ul>
						<li><a href="#" data-icon="grid">Summary</a></li>
						<li><a href="#" data-icon="star" class="ui-btn-active">Favs</a></li>
						<li><a href="#" data-icon="gear">Setup</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!-- /footer -->
			</div><!--/demo-html -->

			<h2>3rd party icon sets</h2>

			<p>You can add any of the popular icon libraries like <a href="http://glyphish.com/">Glyphish</a> to achieve the iOS style tab that has large icons stacked on top of text labels. All that is required is a bit of custom styles to link to the icons and position them in the navbar. Here is an example using Glyphish icons and custom styles (view page source for styles) in our navbar:</p>

			<style>
				.nav-glyphish-example .ui-btn .ui-btn-inner { padding-top: 40px !important; }
				.nav-glyphish-example .ui-btn .ui-icon { width: 30px!important; height: 30px!important; margin-left: -15px !important; box-shadow: none!important; -moz-box-shadow: none!important; -webkit-box-shadow: none!important; -webkit-border-radius: 0 !important; border-radius: 0 !important; }
				#chat .ui-icon { background:  url(../../_assets/img/glyphish-icons/09-chat2.png) 50% 50% no-repeat; background-size: 24px 22px; }
				#email .ui-icon { background:  url(../../_assets/img/glyphish-icons/18-envelope.png) 50% 50% no-repeat; background-size: 24px 16px;  }
				#login .ui-icon { background:  url(../../_assets/img/glyphish-icons/30-key.png) 50% 50% no-repeat;  background-size: 12px 26px; }
				#beer .ui-icon { background:  url(../../_assets/img/glyphish-icons/88-beermug.png) 50% 50% no-repeat;  background-size: 22px 27px; }
				#coffee .ui-icon { background:  url(../../_assets/img/glyphish-icons/100-coffee.png) 50% 50% no-repeat;  background-size: 20px 24px; }
				#skull .ui-icon { background:  url(../../_assets/img/glyphish-icons/21-skull.png) 50% 50% no-repeat;  background-size: 22px 24px; }
			</style>

			<div data-demo-html="true">
			<div data-role="footer" class="nav-glyphish-example">
				<div data-role="navbar" class="nav-glyphish-example" data-grid="d">
				<ul>
					<li><a href="#" id="chat" data-icon="custom">Chat</a></li>
					<li><a href="#" id="email" data-icon="custom">Email</a></li>
					<li><a href="#" id="skull" data-icon="custom">Danger</a></li>
					<li><a href="#" id="beer" data-icon="custom">Beer</a></li>
					<li><a href="#" id="coffee" data-icon="custom">Coffee</a></li>
				</ul>
				</div>
			</div>
			</div><!--/demo-html -->

			<p>Icons by Joseph Wain / <a href="http://glyphish.com/">glyphish.com</a>. Licensed under the <a href="http://creativecommons.org/licenses/by/3.0/us/">Creative Commons Attribution 3.0 United States License</a>.</p>

			<h2>Themes</h2>

			<p>Navbars inherit the theme swatch from their parent container, just like buttons. If a navbar is placed in the header or footer toolbar, it will inherit the default toolbar swatch "a" for bars unless you set this in the markup. </p>
			<p>Here are a few examples of navbars in various container swatches that automatically inherit their parent's swatch letter. Note that in these examples, instead of using a <code>data-theme</code> attribute, we're manually adding the swatch classes to apply the body swatch (<code>ui-body-a</code>) and the class to add the standard body padding (ui-body), but the inheritance works the same way:</p>

			<div data-demo-html="true">
			<div class="ui-body-a ui-body">
				<h3>Swatch "a"</h3>
				<div data-role="navbar">
					<ul>
						<li><a href="#" data-icon="grid">A</a></li>
						<li><a href="#" data-icon="star">B</a></li>
						<li><a href="#" data-icon="gear">C</a></li>
						<li><a href="#" data-icon="arrow-l">D</a></li>
						<li><a href="#" data-icon="arrow-r">E</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!-- /container -->
			</div><!--/demo-html -->

			<div data-demo-html="true">
			<div class="ui-body-d ui-body">
				<h3>Swatch "d"</h3>
				<div data-role="navbar">
					<ul>
						<li><a href="#" data-icon="grid">A</a></li>
						<li><a href="#" data-icon="star">B</a></li>
						<li><a href="#" data-icon="gear">C</a></li>
						<li><a href="#" data-icon="arrow-l">D</a></li>
						<li><a href="#" data-icon="arrow-r">E</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!-- /container -->
			</div><!--/demo-html -->

		<p>To set the theme color for a navbar item, add the <code>data-theme</code> attribute to the individual links and specify a theme swatch. Note that applying a theme swatch to the navbar container is <em>not</em> supported.</p>

			<div data-demo-html="true">
			<div data-role="footer">
				<div data-role="navbar">
					<ul>
						<li><a href="#" data-icon="grid"data-theme="a">A</a></li>
						<li><a href="#" data-icon="star" data-theme="b">B</a></li>
						<li><a href="#" data-icon="gear" data-theme="c">C</a></li>
						<li><a href="#" data-icon="arrow-l" data-theme="d">D</a></li>
						<li><a href="#" data-icon="arrow-r" data-theme="e">E</a></li>
					</ul>
				</div><!-- /navbar -->
			</div><!-- /footer -->
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
