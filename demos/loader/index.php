<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Loader - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
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

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Loader</h1>

		<a href="http://api.jquerymobile.com/loader/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>A small loading overlay displayed when jQuery Mobile loads in content via Ajax, or for use in custom notifications.
			</p>

		<h2>Standard loader</h2>
		<p>The loader overlay can be icon only, text only or both. These demos rely on a custom JavaScript, view the source to see how it works.</p>
			<div data-demo-html="true" data-demo-js="true">
				<button class="show-page-loading-msg" data-textonly="false" data-textvisible="false" data-msgtext="" data-inline="true">Icon (default)</button>
				<button class="show-page-loading-msg" data-textonly="false" data-textvisible="true" data-msgtext="" data-inline="true">Icon + text</button>
				<button class="show-page-loading-msg" data-textonly="true" data-textvisible="true" data-msgtext="Text only loader" data-inline="true">Text only</button>
				<button class="hide-page-loading-msg" data-inline="true" data-icon="ui-icon-delete">Hide</button>

			</div><!--/demo-html -->

		<h2>Custom HTML</h2>
		<p>Any HTML can be added to the loader overlay</p>
			<div data-demo-html="true" data-demo-js="true">
				<button class="show-page-loading-msg" data-theme="b" data-textonly="true" data-textvisible="true" data-msgtext="Custom Loader" data-inline="true" data-html="&lt;span class=&quot;ui-bar ui-shadow ui-overlay-d ui-corner-all&quot;&gt;&lt;img src=&quot;../_assets/img/jquerymobile-logo.png&quot;&gt;&lt;h2&gt;is loading for you ...&lt;/h2&gt;&lt;/span&gt;">Custom HTML</button>
				<button class="hide-page-loading-msg" data-inline="true" data-icon="ui-icon-delete">Hide</button>

			</div><!--/demo-html -->

		<h2>Theme</h2>

		<p>The theme swatch can be set on the loader overlay. </p>
			<div data-demo-html="true" data-demo-js="true">
				<button class="show-page-loading-msg" data-theme="a" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme a" data-inline="true">A</button>
				<button class="show-page-loading-msg" data-theme="b" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme b" data-inline="true">B</button>
				<button class="hide-page-loading-msg" data-inline="true" data-icon="ui-icon-delete">Hide</button>
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
