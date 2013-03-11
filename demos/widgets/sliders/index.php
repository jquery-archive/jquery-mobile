<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Slider - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<style id="grid-style">
		@media all and (max-width: 28em){
			.ui-grid-a .ui-block-a,
			.ui-grid-a .ui-block-b {
				width: 100%;
				clear: left;
			}
		}
    </style>
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

			<h1>Slider <a href="http://api.jquerymobile.com/slider/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">Sliders are used to enter numeric values along a continuum and can also be dual handle <a href="rangeslider.php">range sliders</a> or <a href="switch.php">flip switches</a>.
			</p>

                <h2>Basic slider</h2>

                <div data-demo-html="true">
				<form>
                    <label for="slider-1">Slider:</label>
                    <input type="range" name="slider-1" id="slider-1" min="0" max="100" value="50">
				</form>
                </div><!-- /demo-html -->

                <h2>Step attribute</h2>

                <div data-demo-html="true">
				<form>
                    <label for="slider-10">Slider:</label>
                    <input type="range" name="slider-10" id="slider-10" min="0" max="10" step=".1" value="5">
				</form>
                </div><!-- /demo-html -->

                <h2>Highlight</h2>

                <div data-demo-html="true">
				<form>
                    <label for="slider-2">Slider (default is "false"):</label>
                    <input type="range" name="slider-2" id="slider-2" data-highlight="true" min="0" max="100" value="50">
				</form>
                </div><!-- /demo-html -->

                <h2>Theme</h2>

                <div data-demo-html="true">
				<form>
                    <label for="slider-3">Slider:</label>
                    <input type="range" name="slider-3" id="slider-3" data-track-theme="d" data-theme="b" min="0" max="100" value="50">
				</form>
                </div><!-- /demo-html -->

                <h2>Mini sized</h2>

                <div data-demo-html="true">
				<form>
                    <label for="slider-4">Slider:</label>
                    <input type="range" name="slider-4" id="slider-4" data-mini="true" min="0" max="100" value="50">
				</form>
                </div><!-- /demo-html -->

                <h2>Disabled</h2>

                <div data-demo-html="true">
				<form>
                    <label for="slider-5">Slider:</label>
                    <input type="range" name="slider-5" id="slider-5" disabled="disabled" min="0" max="100" value="50">
				</form>
                </div><!-- /demo-html -->

                <h2>Label hidden</h2>

                <div data-demo-html="true">
				<form>
                    <label for="slider-6" class="ui-hidden-accessible">Slider:</label>
                    <input type="range" name="slider-6" id="slider-6" min="0" max="100" value="50">
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain">
                        <label for="slider-7">Slider:</label>
                        <input type="range" name="slider-7" id="slider-7" min="0" max="100" value="50">
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, mini sized</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain">
                        <label for="slider-8">Slider:</label>
                        <input type="range" name="slider-8" id="slider-8" data-mini="true" min="0" max="100" value="50">
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, hide label</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain" class="ui-hide-label">
                        <label for="slider-9">Slider:</label>
                        <input type="range" name="slider-9" id="slider-9" min="0" max="100" value="50">
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, hide label, mini sized</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain" class="ui-hide-label">
                        <label for="slider-11">Slider:</label>
                        <input type="range" name="slider-11" id="slider-11" data-mini="true" min="0" max="100" value="50">
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Grid</h2>

                <p>We make the grid blocks 100% width below 28em with custom CSS.</p>

                <div data-demo-html="true" data-demo-css="#grid-style">
				<form>
                	<div class="ui-grid-a">
                    	<div class="ui-block-a">
                            <label for="slider-12">Slider:</label>
                            <input type="range" name="slider-12" id="slider-12" data-highlight="true" min="0" max="100" value="50">
        				</div><!-- /ui-block -->
                    	<div class="ui-block-b">
                            <label for="flip-10">Flip toggle switch:</label>
                            <select name="flip-10" id="flip-10" data-role="slider">
                                <option value="off">Off</option>
                                <option value="on">On</option>
                            </select>
        				</div><!-- /ui-block -->
                    	<div class="ui-block-a">
                            <label for="slider-13">Slider:</label>
                            <input type="range" name="slider-13" id="slider-13" data-mini="true" data-highlight="true" min="0" max="100" value="50">
        				</div><!-- /ui-block -->
                    	<div class="ui-block-b">
                            <label for="flip-11">Flip toggle switch:</label>
                            <select name="flip-11" id="flip-11" data-role="slider" data-mini="true">
                                <option value="off">Off</option>
                                <option value="on">On</option>
                            </select>
        				</div><!-- /ui-block -->
                	</div><!-- /ui-grid -->
				</form>
                </div><!-- /demo-html -->

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
