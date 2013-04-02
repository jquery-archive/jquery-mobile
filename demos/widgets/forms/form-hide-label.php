<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Form ui-hide-label - jQuery Mobile Demos</title>
    <link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="../../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <script src="../../../js/jquery.js"></script>
    <script src="../../_assets/js/"></script>
    <script src="../../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

    <div data-role="header" class="jqm-header">
        <h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
        <a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
        <a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
    </div><!-- /header -->

	<div data-role="content" class="jqm-content">

        <h1>Field containers, hide label/legend</h1>

        <form action="#" method="get">

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="textinput-3">Text Input:</label>
                    <input type="text" name="textinput-3" id="textinput-3" placeholder="Text input" value="">
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="search-3">Search Input:</label>
                    <input type="search" name="search-3" id="search-3" value="">
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="textarea-3">Textarea:</label>
                    <textarea cols="40" rows="8" name="textarea-3" id="textarea-3">Textarea</textarea>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="select-native-3">Native select:</label>
                    <select name="select-native-3" id="select-native-3">
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="select-multiple-3">Custom multiple select:</label>
                    <select multiple="multiple" data-native-menu="false" name="select-multiple-3" id="select-multiple-3">
                        <option value="">Choices:</option>
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, buttons:</legend>
                        <button data-icon="home" data-iconpos="right">One</button>
                        <input type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, buttons:</legend>
                        <button data-icon="home" data-iconpos="right">One</button>
                        <input type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, select:</legend>
                        <label for="select-v-3a">Select A</label>
                        <select name="select-v-3a" id="select-v-3a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-3b">Select B</label>
                        <select name="select-v-3b" id="select-v-3b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-3c">Select C</label>
                        <select name="select-v-3c" id="select-v-3c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, select:</legend>
                        <label for="select-h-3a">Select A</label>
                        <select name="select-h-3a" id="select-h-3a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-3b">Select B</label>
                        <select name="select-h-3b" id="select-h-3b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-3c">Select C</label>
                        <select name="select-h-3c" id="select-h-3c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, mixed:</legend>
                        <a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Link</a>
                        <button data-icon="grid" data-iconpos="notext">Button</button>
                        <label for="select-v-3e">Select</label>
                        <select name="select-v-3e" id="select-v-3e">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="slider-3">Slider:</label>
                    <input type="range" name="slider-3" id="slider-3" value="50" min="0" max="100" data-highlight="true">
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="flip-3">Flip toggle:</label>
                    <select name="flip-3" id="flip-3" data-role="slider">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup">
                        <legend>Single checkbox:</legend>
                        <label for="checkbox-3">I agree</label>
                        <input type="checkbox" name="checkbox-3" id="checkbox-3">
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, checkbox:</legend>
                        <input type="checkbox" name="checkbox-v-3a" id="checkbox-v-3a">
                        <label for="checkbox-v-3a">One</label>
                        <input type="checkbox" name="checkbox-v-3b" id="checkbox-v-3b">
                        <label for="checkbox-v-3b">Two</label>
                        <input type="checkbox" name="checkbox-v-3c" id="checkbox-v-3c">
                        <label for="checkbox-v-3c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, radio:</legend>
                        <input type="radio" name="radio-choice-v-3" id="radio-choice-v-3a" value="on" checked="checked">
                        <label for="radio-choice-v-3a">One</label>
                        <input type="radio" name="radio-choice-v-3" id="radio-choice-v-3b" value="off">
                        <label for="radio-choice-v-3b">Two</label>
                        <input type="radio" name="radio-choice-v-3" id="radio-choice-v-3c" value="other">
                        <label for="radio-choice-v-3c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, checkbox:</legend>
                        <input type="checkbox" name="checkbox-h-3a" id="checkbox-h-3a">
                        <label for="checkbox-h-3a">One</label>
                        <input type="checkbox" name="checkbox-h-3b" id="checkbox-h-3b">
                        <label for="checkbox-h-3b">Two</label>
                        <input type="checkbox" name="checkbox-h-3c" id="checkbox-h-3c">
                        <label for="checkbox-h-3c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, radio:</legend>
                        <input type="radio" name="radio-choice-h-3" id="radio-choice-h-3a" value="on" checked="checked">
                        <label for="radio-choice-h-3a">One</label>
                        <input type="radio" name="radio-choice-h-3" id="radio-choice-h-3b" value="off">
                        <label for="radio-choice-h-3b">Two</label>
                        <input type="radio" name="radio-choice-h-3" id="radio-choice-h-3c" value="other">
                        <label for="radio-choice-h-3c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="submit-3">Send:</label>
                    <button type="submit" id="submit-3">Submit</button>
                </div>
            </div><!--/demo-html -->

        </form>

        <h2>Mini sized</h2>

        <form action="#" method="get">

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="textinput-7">Text Input:</label>
                    <input type="text" name="textinput-7" id="textinput-7" placeholder="Text input" value="" data-mini="true">
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="search-7">Search Input:</label>
                    <input type="search" name="search-7" id="search-7" value="" data-mini="true">
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="textarea-7">Textarea:</label>
                    <textarea cols="40" rows="8" name="textarea-7" id="textarea-7" data-mini="true">Textarea</textarea>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="select-native-7">Native select:</label>
                    <select name="select-native-7" id="select-native-7" data-mini="true">
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="select-multiple-7">Custom multiple select:</label>
                    <select multiple="multiple" data-native-menu="false" name="select-multiple-7" id="select-multiple-7" data-mini="true">
                        <option value="">Choices:</option>
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, buttons:</legend>
                        <button data-icon="home" data-iconpos="right">One</button>
                        <input type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, buttons:</legend>
                        <button data-icon="home" data-iconpos="right">One</button>
                        <input type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, select:</legend>
                        <label for="select-v-7a">Select A</label>
                        <select name="select-v-7a" id="select-v-7a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-7b">Select B</label>
                        <select name="select-v-7b" id="select-v-7b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-7c">Select C</label>
                        <select name="select-v-7c" id="select-v-7c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, select:</legend>
                        <label for="select-h-7a">Select A</label>
                        <select name="select-h-7a" id="select-h-7a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-7b">Select B</label>
                        <select name="select-h-7b" id="select-h-7b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-7c">Select C</label>
                        <select name="select-h-7c" id="select-h-7c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, mixed:</legend>
                        <a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Link</a>
                        <button data-icon="grid" data-iconpos="notext">Button</button>
                        <label for="select-v-7e">Select</label>
                        <select name="select-v-7e" id="select-v-7e">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="slider-7">Slider:</label>
                    <input type="range" name="slider-7" id="slider-7" value="50" min="0" max="100" data-highlight="true" data-mini="true">
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="flip-7">Flip toggle:</label>
                    <select name="flip-7" id="flip-7" data-role="slider" data-mini="true">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Single checkbox:</legend>
                        <label for="checkbox-7">I agree</label>
                        <input type="checkbox" name="checkbox-7" id="checkbox-7">
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, checkbox:</legend>
                        <input type="checkbox" name="checkbox-v-7a" id="checkbox-v-7a">
                        <label for="checkbox-v-7a">One</label>
                        <input type="checkbox" name="checkbox-v-7b" id="checkbox-v-7b">
                        <label for="checkbox-v-7b">Two</label>
                        <input type="checkbox" name="checkbox-v-7c" id="checkbox-v-7c">
                        <label for="checkbox-v-7c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, radio:</legend>
                        <input type="radio" name="radio-choice-v-7" id="radio-choice-v-7a" value="on" checked="checked">
                        <label for="radio-choice-v-7a">One</label>
                        <input type="radio" name="radio-choice-v-7" id="radio-choice-v-7b" value="off">
                        <label for="radio-choice-v-7b">Two</label>
                        <input type="radio" name="radio-choice-v-7" id="radio-choice-v-7c" value="other">
                        <label for="radio-choice-v-7c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, checkbox:</legend>
                        <input type="checkbox" name="checkbox-h-7a" id="checkbox-h-7a">
                        <label for="checkbox-h-7a">One</label>
                        <input type="checkbox" name="checkbox-h-7b" id="checkbox-h-7b">
                        <label for="checkbox-h-7b">Two</label>
                        <input type="checkbox" name="checkbox-h-7c" id="checkbox-h-7c">
                        <label for="checkbox-h-7c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, radio:</legend>
                        <input type="radio" name="radio-choice-h-7" id="radio-choice-h-7a" value="on" checked="checked">
                        <label for="radio-choice-h-7a">One</label>
                        <input type="radio" name="radio-choice-h-7" id="radio-choice-h-7b" value="off">
                        <label for="radio-choice-h-7b">Two</label>
                        <input type="radio" name="radio-choice-h-7" id="radio-choice-h-7c" value="other">
                        <label for="radio-choice-h-7c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->

            <div data-demo-html="true">
                <div data-role="fieldcontain" class="ui-hide-label">
                    <label for="submit-7">Send:</label>
                    <button type="submit" id="submit-7" data-mini="true">Submit</button>
                </div>
            </div><!--/demo-html -->

        </form>
        
		<a href="./" class="jqm-button" data-ajax="false" data-role="button" data-mini="true" data-inline="true" data-icon="arrow-l" data-iconpos="left">Back to Forms</a>


	</div><!-- /content -->

    <div data-role="footer" class="jqm-footer">
        <p class="jqm-version"></p>
        <p>Copyright 2013 The jQuery Foundation</p>
    </div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
