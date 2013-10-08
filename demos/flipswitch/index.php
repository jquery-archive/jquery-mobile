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
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p>Demos <span class="jqm-version"></span></p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left" role="button">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right" role="button">Search</a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1>Flip switch</h1>

		<p>Flip switches are used for boolean style inputs like true/false or on/off in a compact UI element.
			</p>

			<h2>Basic checkbox switch</h2>
				
                <div data-demo-html="true">
				<form>
                    <label for="flip-checkbox">Flip toggle switch checkbox:</label>
                    <input type="checkbox" data-role="flipswitch" name="flip-checkbox" id="flip-checkbox">
				</form>
                </div><!-- /demo-html -->

                <h2>Basic checkbox switch checked</h2>
                
                <div data-demo-html="true">
                <form>
                    <label for="flip-checkbox">Flip toggle switch checkbox:</label>
                    <input type="checkbox" data-role="flipswitch" name="flip-checkbox" id="flip-checkbox" checked>
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

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-panels.php' ); ?>

</div><!-- /page -->
</body>
</html>
