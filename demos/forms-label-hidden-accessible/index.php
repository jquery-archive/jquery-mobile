<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ui-hidden-accessible - jQuery Mobile Demos</title>
    <link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <script src="../../external/jquery/jquery.js"></script>
    <script src="../_assets/js/"></script>
    <script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="toolbar" data-type="header" class="jqm-header">
        <h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>ui-hidden-accessible</h1>

		<p>Hide form <code>label</code> or <code>legend</code> elements, but keep them accessible for screen readers.</p>

        <form action="#" method="get">

            <div data-demo-html="true">
                <label for="textinput-4" class="ui-hidden-accessible">Text Input:</label>
                <input type="text" name="textinput-4" id="textinput-4" placeholder="Text input" value="">
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="search-4" class="ui-hidden-accessible">Search Input:</label>
                <input type="search" name="search-4" id="search-4" value="">
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="textarea-4" class="ui-hidden-accessible">Textarea:</label>
                <textarea cols="40" rows="8" name="textarea-4" id="textarea-4">Textarea</textarea>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="select-native-4" class="ui-hidden-accessible">Native select:</label>
                <select name="select-native-4" id="select-native-4">
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="select-multiple-4" class="ui-hidden-accessible">Custom multiple select:</label>
                <select multiple="multiple" data-native-menu="false" name="select-multiple-4" id="select-multiple-4">
                    <option value="">Choices:</option>
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, buttons:</legend>
                    <button class="ui-shadow ui-button ui-corner-all">One <span class="ui-icon ui-icon-home"></span></button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" class="ui-shadow ui-button ui-corner-all">Three <span class="ui-icon ui-icon-grid"></span></a>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, buttons:</legend>
                    <button class="ui-shadow ui-button ui-corner-all">One <span class="ui-icon ui-icon-home"></span></button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" class="ui-shadow ui-button ui-corner-all">Three <span class="ui-icon ui-icon-grid"></span></a>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, select:</legend>
                    <label for="select-v-4a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-v-4a" id="select-v-4a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-4b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-v-4b" id="select-v-4b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-4c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-v-4c" id="select-v-4c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, select:</legend>
                    <label for="select-h-4a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-h-4a" id="select-h-4a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-4b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-h-4b" id="select-h-4b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-4c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-h-4c" id="select-h-4c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, mixed:</legend>
                    <a href="#" class="ui-shadow ui-button ui-corner-all">Link <span class="ui-icon ui-icon-arrow-r"></span></a>
                    <button class="ui-shadow ui-button ui-corner-all ui-button-icon-only">Button <span class="ui-icon ui-icon-grid"></span></button>
                    <label for="select-v-4e" class="ui-hidden-accessible">Select</label>
                    <select name="select-v-4e" id="select-v-4e">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="slider-4" class="ui-hidden-accessible">Slider:</label>
                <input type="range" name="slider-4" id="slider-4" value="50" min="0" max="100" data-highlight="true" data-mini="true">
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="flip-4" class="ui-hidden-accessible">Flip toggle:</label>
                <select name="flip-4" id="flip-4" data-role="slider" data-mini="true">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                </select>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend class="ui-hidden-accessible">Single checkbox:</legend>
                    <label for="checkbox-4">I agree</label>
                    <input type="checkbox" name="checkbox-4" id="checkbox-4">
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-v-4a" id="checkbox-v-4a">
                    <label for="checkbox-v-4a">One</label>
                    <input type="checkbox" name="checkbox-v-4b" id="checkbox-v-4b">
                    <label for="checkbox-v-4b">Two</label>
                    <input type="checkbox" name="checkbox-v-4c" id="checkbox-v-4c">
                    <label for="checkbox-v-4c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-v-4" id="radio-choice-v-4a" value="on" checked="checked">
                    <label for="radio-choice-v-4a">One</label>
                    <input type="radio" name="radio-choice-v-4" id="radio-choice-v-4b" value="off">
                    <label for="radio-choice-v-4b">Two</label>
                    <input type="radio" name="radio-choice-v-4" id="radio-choice-v-4c" value="other">
                    <label for="radio-choice-v-4c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-h-4a" id="checkbox-h-4a">
                    <label for="checkbox-h-4a">One</label>
                    <input type="checkbox" name="checkbox-h-4b" id="checkbox-h-4b">
                    <label for="checkbox-h-4b">Two</label>
                    <input type="checkbox" name="checkbox-h-4c" id="checkbox-h-4c">
                    <label for="checkbox-h-4c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-h-4" id="radio-choice-h-4a" value="on" checked="checked">
                    <label for="radio-choice-h-4a">One</label>
                    <input type="radio" name="radio-choice-h-4" id="radio-choice-h-4b" value="off">
                    <label for="radio-choice-h-4b">Two</label>
                    <input type="radio" name="radio-choice-h-4" id="radio-choice-h-4c" value="other">
                    <label for="radio-choice-h-4c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="submit-4" class="ui-hidden-accessible">Send:</label>
                <button class="ui-shadow ui-button ui-corner-all" type="submit" id="submit-4">Submit</button>
            </div><!--/demo-html -->

        </form>

        <h2>Mini sized</h2>

        <form action="#" method="get">

            <div data-demo-html="true">
                <label for="textinput-8" class="ui-hidden-accessible">Text Input:</label>
                <input type="text" name="textinput-8" id="textinput-8" placeholder="Text input" value="" data-mini="true">
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="search-8" class="ui-hidden-accessible">Search Input:</label>
                <input type="search" name="search-8" id="search-8" value="" data-mini="true">
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="textarea-8" class="ui-hidden-accessible">Textarea:</label>
                <textarea cols="40" rows="8" name="textarea-8" id="textarea-8" data-mini="true">Textarea</textarea>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="select-native-8" class="ui-hidden-accessible">Native select:</label>
                <select name="select-native-8" id="select-native-8" data-mini="true">
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="select-multiple-8" class="ui-hidden-accessible">Custom multiple select:</label>
                <select multiple="multiple" data-native-menu="false" name="select-multiple-8" id="select-multiple-8" data-mini="true">
                    <option value="">Choices:</option>
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, buttons:</legend>
                    <button class="ui-shadow ui-button ui-corner-all">One <span class="ui-icon ui-icon-home"></span></button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" class="ui-shadow ui-button ui-corner-all">Three <span class="ui-icon ui-icon-grid"></span></a>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, buttons:</legend>
                    <button class="ui-shadow ui-button ui-corner-all">One <span class="ui-icon ui-icon-home"></span></button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" class="ui-shadow ui-button ui-corner-all">Three <span class="ui-icon ui-icon-grid"></span></a>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, select:</legend>
                    <label for="select-v-8a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-v-8a" id="select-v-8a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-8b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-v-8b" id="select-v-8b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-8c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-v-8c" id="select-v-8c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, select:</legend>
                    <label for="select-h-8a" class="ui-hidden-accessible">Select A</label>
                    <select name="select-h-8a" id="select-h-8a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-8b" class="ui-hidden-accessible">Select B</label>
                    <select name="select-h-8b" id="select-h-8b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-8c" class="ui-hidden-accessible">Select C</label>
                    <select name="select-h-8c" id="select-h-8c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, mixed:</legend>
                    <a href="#" class="ui-shadow ui-button ui-corner-all">Link <span class="ui-icon ui-icon-arrow-r"></span></a>
                    <button class="ui-shadow ui-button ui-corner-all ui-button-icon-only">Button <span class="ui-icon ui-icon-grid"></span></button>
                    <label for="select-v-8e" class="ui-hidden-accessible">Select</label>
                    <select name="select-v-8e" id="select-v-8e">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="slider-8" class="ui-hidden-accessible">Slider:</label>
                <input type="range" name="slider-8" id="slider-8" value="50" min="0" max="100" data-highlight="true" data-mini="true">
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="flip-8" class="ui-hidden-accessible">Flip toggle:</label>
                <select name="flip-8" id="flip-8" data-role="slider" data-mini="true">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                </select>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend class="ui-hidden-accessible">Single checkbox:</legend>
                    <label for="checkbox-8">I agree</label>
                    <input type="checkbox" name="checkbox-8" id="checkbox-8">
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-v-8a" id="checkbox-v-8a">
                    <label for="checkbox-v-8a">One</label>
                    <input type="checkbox" name="checkbox-v-8b" id="checkbox-v-8b">
                    <label for="checkbox-v-8b">Two</label>
                    <input type="checkbox" name="checkbox-v-8c" id="checkbox-v-8c">
                    <label for="checkbox-v-8c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend class="ui-hidden-accessible">Vertical controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-v-8" id="radio-choice-v-8a" value="on" checked="checked">
                    <label for="radio-choice-v-8a">One</label>
                    <input type="radio" name="radio-choice-v-8" id="radio-choice-v-8b" value="off">
                    <label for="radio-choice-v-8b">Two</label>
                    <input type="radio" name="radio-choice-v-8" id="radio-choice-v-8c" value="other">
                    <label for="radio-choice-v-8c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-h-8a" id="checkbox-h-8a">
                    <label for="checkbox-h-8a">One</label>
                    <input type="checkbox" name="checkbox-h-8b" id="checkbox-h-8b">
                    <label for="checkbox-h-8b">Two</label>
                    <input type="checkbox" name="checkbox-h-8c" id="checkbox-h-8c">
                    <label for="checkbox-h-8c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true" data-type="horizontal">
                    <legend class="ui-hidden-accessible">Horizontal controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-h-8" id="radio-choice-h-8a" value="on" checked="checked">
                    <label for="radio-choice-h-8a">One</label>
                    <input type="radio" name="radio-choice-h-8" id="radio-choice-h-8b" value="off">
                    <label for="radio-choice-h-8b">Two</label>
                    <input type="radio" name="radio-choice-h-8" id="radio-choice-h-8c" value="other">
                    <label for="radio-choice-h-8c">Three</label>
                </fieldset>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <label for="submit-8" class="ui-hidden-accessible">Send:</label>
                <button type="submit" id="submit-8" class="ui-shadow ui-button ui-corner-all ui-mini">Submit</button>
            </div><!--/demo-html -->

        </form>

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
