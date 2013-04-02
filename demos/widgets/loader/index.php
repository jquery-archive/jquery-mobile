<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Loader - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script>
		$( document ).on( "click", ".show-page-loading-msg", function() {
			var $this = $( this ),
				theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
				msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
				textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
				textonly = !!$this.jqmData( "textonly" );
				html = $this.jqmData( "html" ) || "";
			$.mobile.loading( "show", {
					text: msgText,
					textVisible: textVisible,
					theme: theme,
					textonly: textonly,
					html: html
			});
		})
		.on( "click", ".hide-page-loading-msg", function() {
			$.mobile.loading( "hide" );
		});
	</script>
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

			<h1>Loader <a href="http://api.jquerymobile.com/page-loading/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">A small loading overlay displayed when jQuery Mobile loads in content via AJAX, or for use in custom notifications.
			</p>

			<h2>Standard loader</h2>
			<p>The loader overlay can be icon only, text only or both. These demos rely on a custom JavaScript, view the source to see how it works.</p>
			<div data-demo-html="true" data-demo-js="true">
				<button class="show-page-loading-msg" data-theme="d" data-textonly="false" data-textvisible="false" data-msgtext="" data-inline="true">Icon (default)</button>
				<button class="show-page-loading-msg" data-theme="d" data-textonly="false" data-textvisible="true" data-msgtext="" data-inline="true">Icon + text</button>
				<button class="show-page-loading-msg" data-theme="d" data-textonly="true" data-textvisible="true" data-msgtext="Text only loader" data-inline="true">Text only</button>
				<button class="hide-page-loading-msg" data-inline="true" data-icon="delete">Hide</button>

			</div><!--/demo-html -->

			<h2>Custom HTML</h2>
			<p>Any HTML can be added to the loader overlay</p>
			<div data-demo-html="true" data-demo-js="true">
				<button class="show-page-loading-msg" data-theme="c" data-textonly="true" data-textvisible="true" data-msgtext="Custom Loader" data-inline="true"  data-html="<span class='ui-bar ui-shadow ui-overlay-d ui-corner-all'><img src='../../_assets/img/jquery-logo.png' /><h2>is loading for you ...</h2></span>" data-iconpos="right">Custom HTML</button>
				<button class="hide-page-loading-msg" data-inline="true" data-icon="delete">Hide</button>

			</div><!--/demo-html -->

			<h2>Theme</h2>

			<p>The theme swatch can be set on the loader overlay. </p>
			<div data-demo-html="true" data-demo-js="true">
				<button class="show-page-loading-msg" data-theme="a" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme a" data-inline="true">A</button>
				<button class="show-page-loading-msg" data-theme="b" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme b" data-inline="true">B</button>
				<button class="show-page-loading-msg" data-theme="c" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme c" data-inline="true">C</button>
				<button class="show-page-loading-msg" data-theme="d" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme d" data-inline="true">D</button>
				<button class="show-page-loading-msg" data-theme="e" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme e" data-inline="true">E</button>
				<button class="hide-page-loading-msg" data-inline="true" data-icon="delete">Hide</button>
			</div><!--/demo-html -->

		<div data-demo-html="true">

      	</div><!-- /data-demo -->

		</div><!-- /content -->

		<div data-role="footer" class="jqm-footer">
			<p class="jqm-version"></p>
			<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->
	</body>
	</html>
