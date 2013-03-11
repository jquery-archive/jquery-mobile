<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Rangeslider - jQuery Mobile Demos</title>
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

			<h1>Range slider <a href="http://api.jquerymobile.com/slider/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">Range slider offer two handles to set a min and max value along a numeric continuum.
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
				</form>
                </div><!-- /demo-html -->

                <h2>Step attribute</h2>

                <div data-demo-html="true">
				<form>
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
					<div data-role="fieldcontain">
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
					<div data-role="fieldcontain">
                        <div data-role="rangeslider" data-mini="true">
                            <label for="range-8a">Rangeslider:</label>
                            <input type="range" name="range-8a" id="range-8a" min="0" max="100" value="0">
                            <label for="range-8b">Rangeslider:</label>
                            <input type="range" name="range-8b" id="range-8b" min="0" max="100" value="100">
                        </div>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, hidden label</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain" class="ui-hide-label">
                        <div data-role="rangeslider">
                            <label for="range-9a">Rangeslider:</label>
                            <input type="range" name="range-9a" id="range-9a" min="0" max="100" value="0">
                            <label for="range-9b">Rangeslider:</label>
                            <input type="range" name="range-9b" id="range-9b" min="0" max="100" value="100">
                        </div>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, hidden label, mini</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain" class="ui-hide-label">
                        <div data-role="rangeslider" data-mini="true">
                            <label for="range-11a">Rangeslider:</label>
                            <input type="range" name="range-11a" id="range-11a" min="0" max="100" value="0">
                            <label for="range-11b">Rangeslider:</label>
                            <input type="range" name="range-11b" id="range-11b" min="0" max="100" value="100">
                        </div>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Grid</h2>

                <p>We make the grid blocks 100% width below 28em with custom CSS.</p>

                <div data-demo-html="true" data-demo-css="#grid-style">
                	<div class="ui-grid-a">
                    	<div class="ui-block-a">
                            <div class="ui-bar ui-bar-c">
                                <div data-role="rangeslider">
                                    <label for="range-12a">Rangeslider:</label>
                                    <input type="range" name="range-12a" id="range-12a" min="0" max="100" value="0">
                                    <label for="range-12b">Rangeslider:</label>
                                    <input type="range" name="range-12b" id="range-12b" min="0" max="100" value="100">
                                </div>
                        	</div><!-- /ui-bar -->
        				</div><!-- /ui-block -->
                    	<div class="ui-block-b">
                            <div class="ui-bar ui-bar-c">
                                <label for="slider-12">Slider:</label>
                                <input type="range" name="slider-12" id="slider-12" data-highlight="true" min="0" max="100" value="50">
                        	</div><!-- /ui-bar -->
        				</div><!-- /ui-block -->
                    	<div class="ui-block-a">
                            <div class="ui-bar ui-bar-c">
                                <div data-role="rangeslider" data-mini="true">
                                    <label for="range-13a">Rangeslider:</label>
                                    <input type="range" name="range-13a" id="range-13a" min="0" max="100" value="0">
                                    <label for="range-13b">Rangeslider:</label>
                                    <input type="range" name="range-13b" id="range-13b" min="0" max="100" value="100">
                                </div>
                        	</div><!-- /ui-bar -->
        				</div><!-- /ui-block -->
                    	<div class="ui-block-b">
                            <div class="ui-bar ui-bar-c">
                                <label for="slider-13">Slider:</label>
                                <input type="range" name="slider-13" id="slider-13" data-mini="true" data-highlight="true" min="0" max="100" value="50">
                        	</div><!-- /ui-bar -->
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
