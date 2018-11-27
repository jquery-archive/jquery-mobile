<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Flip Toggle Switch - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="custom-label-flipswitch">
/* Custom indentations are needed because the length of custom labels differs from
   the length of the standard labels */
.custom-label-flipswitch.ui-flipswitch .ui-button.ui-flipswitch-on {
	text-indent: -3.4em;
}
.custom-label-flipswitch.ui-flipswitch .ui-flipswitch-off {
	text-indent: 0.5em;
}
	</style>
	<style id="custom-size-flipswitch">
/* Custom indentations are needed because the length of custom labels differs from
   the length of the standard labels */
.custom-size-flipswitch.ui-flipswitch .ui-button.ui-flipswitch-on {
	text-indent: -5.9em;
}
.custom-size-flipswitch.ui-flipswitch .ui-flipswitch-off {
	text-indent: 0.5em;
}
/* Custom widths are needed because the length of custom labels differs from
   the length of the standard labels */
.custom-size-flipswitch.ui-flipswitch {
	width: 8.875em;
}
.custom-size-flipswitch.ui-flipswitch.ui-flipswitch-active {
	padding-left: 7em;
	width: 1.875em;
}
@media (min-width: 28em) {
	/*Repeated from rule .ui-flipswitch above*/
	.ui-field-contain > label + .custom-size-flipswitch.ui-flipswitch {
		width: 1.875em;
	}
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

		<h1>Flip switch</h1>

		<a href="http://api.jquerymobile.com/flipswitch/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>Flip switches are used for boolean style inputs like true/false or on/off in a compact UI element.
			</p>

			<h2>Basic checkbox switch</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-checkbox-1">Flip toggle switch checkbox:</label>
                    <input type="checkbox" data-role="flipswitch" name="flip-checkbox-1" id="flip-checkbox-1">
				</form>
                </div><!-- /demo-html -->

			<h2>Basic checkbox switch with custom labels</h2>

                <div data-demo-html="true" data-demo-css="#custom-label-flipswitch">
				<form>
                    <label for="flip-checkbox-2">Flip toggle switch checkbox:</label>
                    <input type="checkbox" data-role="flipswitch" name="flip-checkbox-2" id="flip-checkbox-2" data-on-text="Light" data-off-text="Dark" data-wrapper-class="custom-label-flipswitch">
				</form>
                </div><!-- /demo-html -->

			<h2>Basic checkbox switch with custom labels and custom size</h2>

                <div data-demo-html="true" data-demo-css="#custom-size-flipswitch">
				<form>
                    <label for="flip-checkbox-3">Flip toggle switch checkbox:</label>
                    <input type="checkbox" data-role="flipswitch" name="flip-checkbox-3" id="flip-checkbox-3" data-on-text="Assured" data-off-text="Uncertain" data-wrapper-class="custom-size-flipswitch">
				</form>
                </div><!-- /demo-html -->

                <h2>Basic checkbox switch checked</h2>

                <div data-demo-html="true">
                <form>
                    <label for="flip-checkbox-4">Flip toggle switch checkbox:</label>
                    <input type="checkbox" data-role="flipswitch" name="flip-checkbox-4" id="flip-checkbox-4" checked>
                </form>
                </div><!-- /demo-html -->

                <h2>Basic select switch</h2>

                <div data-demo-html="true">
                <form>
                    <label for="flip-select">Flip toggle switch select:</label>
                    <select id="flip-select" name="flip-select" data-role="flipswitch">
                        <option>Off</option>
                        <option>On</option>
                    </select>
                </form>
                </div><!-- /demo-html -->
                <h2>Basic select switch second option selected</h2>

                <div data-demo-html="true">
                <form>
                    <label for="flip-select-second">Flip toggle switch select:</label>
                    <select id="flip-select-second" name="flip-select" data-role="flipswitch">
                        <option>Off</option>
                        <option selected>On</option>
                    </select>
                </form>
                </div><!-- /demo-html -->

			<h2>Theme</h2>
                <div data-demo-html="true">
				<form>
                    <label for="flip-2">Flip toggle switch:</label>
                    <select name="flip-2" id="flip-2" data-role="flipswitch" data-theme="b">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Mini</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-3">Flip toggle switch:</label>
                    <select name="flip-3" id="flip-3" data-role="flipswitch" data-mini="true">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>No corners</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-8">Flip toggle switch:</label>
                    <select name="flip-8" id="flip-8" data-role="flipswitch" data-corners="false">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Disabled</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-4">Flip toggle switch:</label>
                    <select name="flip-4" id="flip-4" data-role="flipswitch" disabled="disabled">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Label hidden</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-5" class="ui-hidden-accessible">Flip toggle switch:</label>
                    <select name="flip-5" id="flip-5" data-role="flipswitch">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain</h2>

                <div data-demo-html="true">
				<form>
					<div class="ui-field-contain">
                        <label for="flip-6">Flip toggle switch:</label>
                        <select name="flip-6" id="flip-6" data-role="flipswitch">
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, mini</h2>

                <div data-demo-html="true">
				<form>
					<div class="ui-field-contain">
                        <label for="flip-7">Flip toggle switch:</label>
                        <select name="flip-7" id="flip-7" data-role="flipswitch" data-mini="true">
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
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
