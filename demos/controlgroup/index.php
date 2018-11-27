<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Controlgroup - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style>
		#demo-borders .ui-collapsible .ui-collapsible-heading .ui-button { border-top-width: 1px !important; }
	</style>
	<style id="textinput-controlgroup">
		.controlgroup-textinput {
			padding-top:.35em;
			padding-bottom:.35em;
			cursor: text;
			padding-left: 0;
			padding-right: 0;
		}
	</style>
	<script id="textinput-controlgroup-script">
		$.widget( "ui.controlgroup", $.ui.controlgroup, {
			_textinputOptions: function( position ) {
				return this._buildSimpleOptions( position, "ui-textinput" );
			}
		} );
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

        <h1>Controlgroup</h1>

		<a href="http://api.jquerymobile.com/controlgroup/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

        <p>Controlgroups are used to visually group a set of buttons to form a single block that looks contained like a navigation component.</p>

		<h2>Controlgroup horizontal</h2>

        <div data-demo-html="true">
            <div data-role="controlgroup" data-type="horizontal">
                <a href="#">No icon</a>
                <a href="#" data-icon="ui-icon-delete">Left</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="end">Right</a>
            </div>
            <div data-role="controlgroup" data-type="horizontal">
                <a href="#" data-icon="ui-icon-delete" data-icon-position="top">Top</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="top">Top</a>
            </div>
            <div data-role="controlgroup" data-type="horizontal">
                <a href="#" data-icon="ui-icon-delete" data-icon-position="bottom">Bottom</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="bottom">Bottom</a>
            </div>
            <div data-role="controlgroup" data-type="horizontal">
                <a href="#" data-icon="ui-icon-delete" data-show-label="false">Icon only</a>
                <a href="#" data-icon="ui-icon-delete" data-show-label="false">Icon only</a>
            </div>

            <form>
                <div data-role="controlgroup" data-type="horizontal">
                    <a href="#" class="ui-button ui-button-icon-only">Home <span class="ui-icon ui-icon-home"></span></a>
                    <button data-icon="ui-icon-search">Search</button>
                    <label for="select-more-1a" class="ui-hidden-accessible">More</label>
                    <select name="select-more-1a" id="select-more-1a">
                        <option value="">Select&hellip;</option>
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </div>
            </form>
        </div><!--/demo-html -->


		<h2>Controlgroup vertical</h2>

		<p>To have a controlgroup with a vertical layout, add <code>data-direction="vertical"</code> to the container.</p>

        <div data-demo-html="true">
            <div data-role="controlgroup" data-direction="vertical">
                <a href="#">No icon</a>
                <a href="#" data-icon="ui-icon-delete">Left</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="end">Right</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="top">Top</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="bottom">Bottom</a>
                <a href="#" data-icon="ui-icon-delete" data-show-label="false">Icon only</a>
            </div>
        </div><!--/demo-html -->

		<h2>Mini sized</h2>

        <div data-demo-html="true">
            <div data-role="controlgroup" data-mini="true" data-type="horizontal">
                <a href="#">No icon</a>
                <a href="#" data-icon="ui-icon-delete">Left</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="end">Right</a>
            </div>
            <div data-role="controlgroup" data-mini="true" data-type="horizontal">
                <a href="#" data-icon="ui-icon-delete" data-icon-position="top">Top</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="top">Top</a>
            </div>
            <div data-role="controlgroup" data-mini="true" data-type="horizontal">
                <a href="#" data-icon="ui-icon-delete" data-icon-position="bottom">Bottom</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="bottom">Bottom</a>
            </div>
            <div data-role="controlgroup" data-mini="true" data-type="horizontal">
                <a href="#" data-icon="ui-icon-delete" data-show-label="false">Icon only</a>
                <a href="#" data-icon="ui-icon-delete" data-show-label="false">Icon only</a>
            </div>

            <form>
                <div data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <a href="#" class="ui-button ui-button-icon-only">Home <span class="ui-icon ui-icon-home"></span></a>
                    <button data-icon="ui-icon-search">Search</button>
                    <label for="select-more-1a" class="ui-hidden-accessible">More</label>
                    <select name="select-more-1a" id="select-more-1a">
                        <option value="">Select&hellip;</option>
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </div>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <div data-role="controlgroup" data-direction="vertical" data-mini="true">
                <a href="#">No icon</a>
                <a href="#" data-icon="ui-icon-delete">Left</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="end">Right</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="top">Top</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="bottom">Bottom</a>
                <a href="#" data-icon="ui-icon-delete" data-show-label="false">Icon only</a>
            </div>
        </div><!--/demo-html -->

        <h2>Radio button</h2>

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal:</legend>
                    <input type="radio" name="radio-choice-h-2" id="radio-choice-h-2a" value="on" checked="checked">
                    <label for="radio-choice-h-2a">One</label>
                    <input type="radio" name="radio-choice-h-2" id="radio-choice-h-2b" value="off">
                    <label for="radio-choice-h-2b">Two</label>
                    <input type="radio" name="radio-choice-h-2" id="radio-choice-h-2c" value="other">
                    <label for="radio-choice-h-2c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend>Horizontal, mini sized:</legend>
                    <input type="radio" name="radio-choice-h-6" id="radio-choice-h-6a" value="on" checked="checked">
                    <label for="radio-choice-h-6a">One</label>
                    <input type="radio" name="radio-choice-h-6" id="radio-choice-h-6b" value="off">
                    <label for="radio-choice-h-6b">Two</label>
                    <input type="radio" name="radio-choice-h-6" id="radio-choice-h-6c" value="other">
                    <label for="radio-choice-h-6c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-direction="vertical">
                    <legend>Vertical:</legend>
                    <input type="radio" name="radio-choice-v-2" id="radio-choice-v-2a" value="on" checked="checked">
                    <label for="radio-choice-v-2a">One</label>
                    <input type="radio" name="radio-choice-v-2" id="radio-choice-v-2b" value="off">
                    <label for="radio-choice-v-2b">Two</label>
                    <input type="radio" name="radio-choice-v-2" id="radio-choice-v-2c" value="other">
                    <label for="radio-choice-v-2c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-direction="vertical" data-mini="true">
                    <legend>Vertical, mini sized:</legend>
                    <input type="radio" name="radio-choice-v-6" id="radio-choice-v-6a" value="on" checked="checked">
                    <label for="radio-choice-v-6a">One</label>
                    <input type="radio" name="radio-choice-v-6" id="radio-choice-v-6b" value="off">
                    <label for="radio-choice-v-6b">Two</label>
                    <input type="radio" name="radio-choice-v-6" id="radio-choice-v-6c" value="other">
                    <label for="radio-choice-v-6c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <h2>Checkbox</h2>

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal:</legend>
                    <input type="checkbox" name="checkbox-h-2a" id="checkbox-h-2a">
                    <label for="checkbox-h-2a">One</label>
                    <input type="checkbox" name="checkbox-h-2b" id="checkbox-h-2b">
                    <label for="checkbox-h-2b">Two</label>
                    <input type="checkbox" name="checkbox-h-2c" id="checkbox-h-2c">
                    <label for="checkbox-h-2c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend>Horizontal, mini sized:</legend>
                    <input type="checkbox" name="checkbox-h-6a" id="checkbox-h-6a">
                    <label for="checkbox-h-6a">One</label>
                    <input type="checkbox" name="checkbox-h-6b" id="checkbox-h-6b">
                    <label for="checkbox-h-6b">Two</label>
                    <input type="checkbox" name="checkbox-h-6c" id="checkbox-h-6c">
                    <label for="checkbox-h-6c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-direction="vertical">
                    <legend>Vertical:</legend>
                    <input type="checkbox" name="checkbox-v-2a" id="checkbox-v-2a">
                    <label for="checkbox-v-2a">One</label>
                    <input type="checkbox" name="checkbox-v-2b" id="checkbox-v-2b">
                    <label for="checkbox-v-2b">Two</label>
                    <input type="checkbox" name="checkbox-v-2c" id="checkbox-v-2c">
                    <label for="checkbox-v-2c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-direction="vertical" data-mini="true">
                    <legend>Vertical, mini sized:</legend>
                    <input type="checkbox" name="checkbox-v-6a" id="checkbox-v-6a">
                    <label for="checkbox-v-6a">One</label>
                    <input type="checkbox" name="checkbox-v-6b" id="checkbox-v-6b">
                    <label for="checkbox-v-6b">Two</label>
                    <input type="checkbox" name="checkbox-v-6c" id="checkbox-v-6c">
                    <label for="checkbox-v-6c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <h2>Selects</h2>

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal:</legend>
                    <label for="select-h-2a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-h-2a" id="select-h-2a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-2b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-h-2b" id="select-h-2b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-2c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-h-2c" id="select-h-2c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend>Horizontal, mini sized:</legend>
                    <label for="select-h-6a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-h-6a" id="select-h-6a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-6b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-h-6b" id="select-h-6b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-6c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-h-6c" id="select-h-6c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-direction="vertical">
                    <legend>Vertical:</legend>
                    <label for="select-v-2a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-v-2a" id="select-v-2a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-2b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-v-2b" id="select-v-2b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-2c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-v-2c" id="select-v-2c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </form>
        </div><!--/demo-html -->

        <div data-demo-html="true">
            <form>
                <fieldset data-role="controlgroup" data-direction="vertical" data-mini="true">
                    <legend>Vertical, mini sized:</legend>
                    <label for="select-v-6a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-v-6a" id="select-v-6a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-6b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-v-6b" id="select-v-6b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-6c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-v-6c" id="select-v-6c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </form>
        </div><!--/demo-html -->

		<h2>Controlgroup theming</h2>

        <div data-demo-html="true">
            <div data-role="controlgroup" data-theme="b">
                <a href="#">One</a>
                <a href="#" data-icon="ui-icon-delete">Two</a>
                <a href="#" data-icon="ui-icon-delete" data-icon-position="end">Three</a>
                <a href="#" data-icon="ui-icon-delete" data-show-label="false">Four</a>
            </div>

            <form>
                <fieldset data-role="controlgroup" data-theme="b">
                    <input type="checkbox" name="checkbox-h-7a" id="checkbox-h-7a">
                    <label for="checkbox-h-7a">One</label>
                    <input type="checkbox" name="checkbox-h-7b" id="checkbox-h-7b">
                    <label for="checkbox-h-7b">Two</label>
                    <input type="checkbox" name="checkbox-h-7c" id="checkbox-h-7c">
                    <label for="checkbox-h-7c">Three</label>
                </fieldset>
            </form>
        </div><!--/demo-html -->


		<h2>Pre-rendered markup</h2>

		<p>You can supply pre-rendered markup for any controlgroup to save startup time. The example below illustrates the markup you have to provide for a pre-rendered controlgroup. Note that the widgets inside the controlgroup need not necessarily be pre-rendered.</p>
		<div data-demo-html="true">
			<div data-role="controlgroup" data-enhanced="true" class="ui-controlgroup ui-controlgroup-vertical ui-group-theme-b">

					<label for="pre-rendered-cb-1" class="ui-first-child">Checkbox 1</label>
					<input type="checkbox" id="pre-rendered-cb-1" name="pre-rendered-cb-1" value="1">

					<label for="pre-rendered-cb-2" class="ui-last-child">Checkbox 2</label>
					<input type="checkbox" id="pre-rendered-cb-2" name="pre-rendered-cb-2" value="2">

			</div>
		</div>

        <!-- TODO: This should be a separate demo -->
        <h2>Textinputs</h2>

        <p>While textinputs are not officially supported by the controlgroup they can be made to work with some simple CSS and script.</p>
        <p>To make this work you will need to add one CSS rule and a simple controlgroup extension which uses textinput's <code>ui-textinput</code> class key to allow the controlgroup widget to set the corner classes on the textinput wrapper.</p>

        <div data-demo-html="true" data-demo-css="#textinput-controlgroup" data-demo-js="#textinput-controlgroup-script">
            <label for="currency-controlgroup">Value</label>
            <div data-role="controlgroup" data-type="horizontal" data-items='{ "textinput" : "#currency-controlgroup" }'>
                <select>
                    <option>$</option>
                    <option>€</option>
                    <option>£</option>
                    <option>¥</option>
                    <option>₩</option>
                    <option>₹</option>
                </select>
                <input id="currency-controlgroup" type="text" data-wrapper-class="controlgroup-textinput ui-button">
                <button>.00</button>
            </div>
            <label for="search-control-group">Search</label>
            <div data-role="controlgroup" data-type="horizontal" data-items='{ "textinput" : "#search-control-group" }'>
                <input type="text" id="search-control-group" data-wrapper-class="controlgroup-textinput ui-button">
                <button>Submit</button>
                <button>Reset</button>
            </div>
        </div>


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
