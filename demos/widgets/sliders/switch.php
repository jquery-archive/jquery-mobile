<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Flip Toggle Switch - jQuery Mobile Demos</title>
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

			<h1>Flip switch <a href="http://api.jquerymobile.com/slider/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">Flip switches are used for boolean style inputs like true/false or on/off in a compact UI element.
			</p>

				<h2>Basic switch</h2>
                <div data-demo-html="true">
				<form>
                    <label for="flip-1">Flip toggle switch:</label>
                    <select name="flip-1" id="flip-1" data-role="slider">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

				<h2>Theme</h2>
                <div data-demo-html="true">
				<form>
                    <label for="flip-2">Flip toggle switch:</label>
                    <select name="flip-2" id="flip-2" data-role="slider" data-track-theme="a" data-theme="a">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Mini</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-3">Flip toggle switch:</label>
                    <select name="flip-3" id="flip-3" data-role="slider" data-mini="true">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Disabled</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-4">Flip toggle switch:</label>
                    <select name="flip-4" id="flip-4" data-role="slider" disabled="disabled">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Label hidden</h2>

                <div data-demo-html="true">
				<form>
                    <label for="flip-5" class="ui-hidden-accessible">Flip toggle switch:</label>
                    <select name="flip-5" id="flip-5" data-role="slider">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain">
                        <label for="flip-6">Flip toggle switch:</label>
                        <select name="flip-6" id="flip-6" data-role="slider">
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, mini</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain">
                        <label for="flip-7">Flip toggle switch:</label>
                        <select name="flip-7" id="flip-7" data-role="slider" data-mini="true">
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, hidden label</h2>

                <div data-demo-html="true">
					<div data-role="fieldcontain" class="ui-hide-label">
                        <label for="flip-8">Flip toggle switch:</label>
                        <select name="flip-8" id="flip-8" data-role="slider">
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
					</div>
				</form>
                </div><!-- /demo-html -->

                <h2>Fieldcontain, hidden label, mini</h2>

                <div data-demo-html="true">
				<form>
					<div data-role="fieldcontain" class="ui-hide-label">
                        <label for="flip-9">Flip toggle switch:</label>
                        <select name="flip-9" id="flip-9" data-role="slider" data-mini="true">
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
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
