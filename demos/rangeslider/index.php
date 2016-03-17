<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Rangeslider - jQuery Mobile Demos</title>
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

		<h1>Range slider</h1>

		<a href="http://api.jquerymobile.com/rangeslider/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>Range slider offer two handles to set a min and max value along a numeric continuum.
			</p>

                <h2>Basic range slider</h2>

                <div data-demo-html="true">
				<form>
                    <div data-role="rangeslider">
                        <label for="range-1a">Rangeslider:</label>
                        <input type="range" name="range-1a" id="range-1a" min="0" max="100" value="40">
                        <label for="range-1b">Rangeslider:</label>
                        <input type="range" name="range-1b" id="range-1b" min="0" max="100" value="80">
                    </div>
				</form>
                </div><!-- /demo-html -->

                <h2>Step attribute</h2>

                <div data-demo-html="true">
				<form>
                    <div data-role="rangeslider">
                        <label for="range-10a">Rangeslider:</label>
                        <input type="range" name="range-10a" id="range-10a" min="0" max="10" step=".1" value="2.6">
                        <label for="range-10b">Rangeslider:</label>
                        <input type="range" name="range-10b" id="range-10b" min="0" max="10" step=".1" value="5.4">
                    </div>
				</form>
                </div><!-- /demo-html -->

                <h2>No highlight</h2>

                <div data-demo-html="true">
				<form>
                    <div data-role="rangeslider" data-highlight="false">
                        <label for="range-2a">Rangeslider (default is "true"):</label>
                        <input type="range" name="range-2a" id="range-2a" min="0" max="100" value="20">
                        <label for="range-2b">Rangeslider:</label>
                        <input type="range" name="range-2b" id="range-2b" min="0" max="100" value="80">
                    </div>
				</form>
                </div><!-- /demo-html -->

                <h2>Theme</h2>

                <div data-demo-html="true">
				<form>
                    <div data-role="rangeslider" data-track-theme="b" data-theme="a">
                        <label for="range-3a">Rangeslider:</label>
                        <input type="range" name="range-3a" id="range-3a" min="0" max="100" value="20">
                        <label for="range-3b">Rangeslider:</label>
                        <input type="range" name="range-3b" id="range-3b" min="0" max="100" value="100">
                    </div>
				</form>
                </div><!-- /demo-html -->

                <h2>Mini</h2>

                <div data-demo-html="true">
				<form>
                    <div data-role="rangeslider" data-mini="true">
                        <label for="range-4a">Rangeslider:</label>
                        <input type="range" name="range-4a" id="range-4a" min="0" max="100" value="0">
                        <label for="range-4b">Rangeslider:</label>
                        <input type="range" name="range-4b" id="range-4b" min="0" max="100" value="100">
                    </div>
				</form>
                </div><!-- /demo-html -->

                <h2>Disabled</h2>

                <div data-demo-html="true">
				<form>
                    <div data-role="rangeslider">
                        <label for="range-5a">Rangeslider:</label>
                        <input type="range" name="range-5a" id="range-5a" disabled="disabled" min="0" max="100" value="0">
                        <label for="range-5b">Rangeslider:</label>
                        <input type="range" name="range-5b" id="range-5b" disabled="disabled" min="0" max="100" value="100">
                    </div>
				</form>
                </div><!-- /demo-html -->

                <h2>Label hidden</h2>

                <div data-demo-html="true">
				<form>
                    <div data-role="rangeslider">
                        <label for="range-6a" class="ui-hidden-accessible">Rangeslider:</label>
                        <input type="range" name="range-6a" id="range-6a" min="0" max="100" value="0">
                        <label for="range-6b">Rangeslider:</label>
                        <input type="range" name="range-6b" id="range-6b" min="0" max="100" value="100">
                    </div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain</h2>

                <div data-demo-html="true">
				<form>
					<div class="ui-field-contain">
                        <div data-role="rangeslider">
                            <label for="range-7a">Rangeslider:</label>
                            <input type="range" name="range-7a" id="range-7a" min="0" max="100" value="0">
                            <label for="range-7b">Rangeslider:</label>
                            <input type="range" name="range-7b" id="range-7b" min="0" max="100" value="100">
                        </div>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, mini</h2>

                <div data-demo-html="true">
				<form>
					<div class="ui-field-contain">
                        <div data-role="rangeslider" data-mini="true">
                            <label for="range-8a">Rangeslider:</label>
                            <input type="range" name="range-8a" id="range-8a" min="0" max="100" value="0">
                            <label for="range-8b">Rangeslider:</label>
                            <input type="range" name="range-8b" id="range-8b" min="0" max="100" value="100">
                        </div>
					</div>
				</form>
                </div><!-- /demo-html -->

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
