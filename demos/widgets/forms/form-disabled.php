<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Form disabled - jQuery Mobile Demos</title>
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
    
        <h1>Disabled form elements</h1>
    
        <form action="#" method="get">
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="textinput-1">Text Input:</label>
                    <input disabled="disabled" type="text" name="textinput-1" id="textinput-1" placeholder="Text input" value="">
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="search-1">Search Input:</label>
                    <input disabled="disabled" type="search" name="search-1" id="search-1" value="">
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="textarea-1">Textarea:</label>
                    <textarea disabled="disabled" cols="40" rows="8" name="textarea-1" id="textarea-1">Textarea</textarea>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="select-native-1">Native select:</label>
                    <select disabled="disabled" name="select-native-1" id="select-native-1">
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="select-multiple-1">Custom multiple select:</label>
                    <select disabled="disabled" multiple="multiple" data-native-menu="false" name="select-multiple-1" id="select-multiple-1">
                        <option value="">Choices:</option>
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, buttons:</legend>
                        <button disabled="disabled" data-icon="home" data-iconpos="right">One</button>
                        <input disabled="disabled" type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a class="ui-disabled" href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, buttons:</legend>
                        <button disabled="disabled" data-icon="home" data-iconpos="right">One</button>
                        <input disabled="disabled" type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a class="ui-disabled" href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, select:</legend>
                        <label for="select-v-1a">Select A</label>
                        <select disabled="disabled" name="select-v-1a" id="select-v-1a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-1b">Select B</label>
                        <select disabled="disabled" name="select-v-1b" id="select-v-1b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-1c">Select C</label>
                        <select disabled="disabled" name="select-v-1c" id="select-v-1c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, select:</legend>
                        <label for="select-h-1a">Select A</label>
                        <select disabled="disabled" name="select-h-1a" id="select-h-1a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-1b">Select B</label>
                        <select disabled="disabled" name="select-h-1b" id="select-h-1b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-1c">Select C</label>
                        <select disabled="disabled" name="select-h-1c" id="select-h-1c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, mixed:</legend>
                        <a class="ui-disabled" href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Link</a>
                        <button disabled="disabled" data-icon="grid" data-iconpos="notext">Button</button>
                        <label for="select-v-1e">Select</label>
                        <select disabled="disabled" name="select-v-1e" id="select-v-1e">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="slider-1">Slider:</label>
                    <input disabled="disabled" type="range" name="slider-1" id="slider-1" value="50" min="0" max="100" data-highlight="true">
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="flip-1">Flip toggle:</label>
                    <select disabled="disabled" name="flip-1" id="flip-1" data-role="slider">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup">
                        <legend>Single checkbox:</legend>
                        <label for="checkbox-1">I agree</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-1" id="checkbox-1">
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, checkbox:</legend>
                        <input disabled="disabled" type="checkbox" name="checkbox-v-1a" id="checkbox-v-1a">
                        <label for="checkbox-v-1a">One</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-v-1b" id="checkbox-v-1b">
                        <label for="checkbox-v-1b">Two</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-v-1c" id="checkbox-v-1c">
                        <label for="checkbox-v-1c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup, radio:</legend>
                        <input disabled="disabled" type="radio" name="radio-choice-v-1" id="radio-choice-v-1a" value="on" checked="checked">
                        <label for="radio-choice-v-1a">One</label>
                        <input disabled="disabled" type="radio" name="radio-choice-v-1" id="radio-choice-v-1b" value="off">
                        <label for="radio-choice-v-1b">Two</label>
                        <input disabled="disabled" type="radio" name="radio-choice-v-1" id="radio-choice-v-1c" value="other">
                        <label for="radio-choice-v-1c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, checkbox:</legend>
                        <input disabled="disabled" type="checkbox" name="checkbox-h-1a" id="checkbox-h-1a">
                        <label for="checkbox-h-1a">One</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-h-1b" id="checkbox-h-1b">
                        <label for="checkbox-h-1b">Two</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-h-1c" id="checkbox-h-1c">
                        <label for="checkbox-h-1c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup, radio:</legend>
                        <input disabled="disabled" type="radio" name="radio-choice-h-1" id="radio-choice-h-1a" value="on" checked="checked">
                        <label for="radio-choice-h-1a">One</label>
                        <input disabled="disabled" type="radio" name="radio-choice-h-1" id="radio-choice-h-1b" value="off">
                        <label for="radio-choice-h-1b">Two</label>
                        <input disabled="disabled" type="radio" name="radio-choice-h-1" id="radio-choice-h-1c" value="other">
                        <label for="radio-choice-h-1c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="submit-1">Send:</label>
                    <button disabled="disabled" type="submit" id="submit-1">Submit</button>
                </div>
            </div><!--/demo-html -->
    
        </form>
    
        <h2>Mini sized</h2>
    
        <form action="#" method="get">
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="textinput-5">Text Input:</label>
                    <input disabled="disabled" type="text" name="textinput-5" id="textinput-5" placeholder="Text input" value="" data-mini="true">
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="search-5">Search Input:</label>
                    <input disabled="disabled" type="search" name="search-5" id="search-5" value="" data-mini="true">
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="textarea-5">Textarea:</label>
                    <textarea disabled="disabled" cols="40" rows="8" name="textarea-5" id="textarea-5" data-mini="true">Textarea</textarea>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="select-native-5">Native select:</label>
                    <select disabled="disabled" name="select-native-5" id="select-native-5" data-mini="true">
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="select-multiple-5">Custom multiple select:</label>
                    <select disabled="disabled" multiple="multiple" data-native-menu="false" name="select-multiple-5" id="select-multiple-5" data-mini="true">
                        <option value="">Choices:</option>
                        <option value="small">One</option>
                        <option value="medium">Two</option>
                        <option value="large">Three</option>
                    </select>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, buttons:</legend>
                        <button disabled="disabled" data-icon="home" data-iconpos="right">One</button>
                        <input disabled="disabled" type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, buttons:</legend>
                        <button disabled="disabled" data-icon="home" data-iconpos="right">One</button>
                        <input disabled="disabled" type="button" data-icon="back" data-iconpos="right" value="Two">
                        <a class="ui-disabled" href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, select:</legend>
                        <label for="select-v-5a">Select A</label>
                        <select disabled="disabled" name="select-v-5a" id="select-v-5a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-5b">Select B</label>
                        <select disabled="disabled" name="select-v-5b" id="select-v-5b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-v-5c">Select C</label>
                        <select disabled="disabled" name="select-v-5c" id="select-v-5c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, select:</legend>
                        <label for="select-h-5a">Select A</label>
                        <select disabled="disabled" name="select-h-5a" id="select-h-5a">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-5b">Select B</label>
                        <select disabled="disabled" name="select-h-5b" id="select-h-5b">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-h-5c">Select C</label>
                        <select disabled="disabled" name="select-h-5c" id="select-h-5c">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, mixed:</legend>
                        <a class="ui-disabled" href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Link</a>
                        <button disabled="disabled" data-icon="grid" data-iconpos="notext">Button</button>
                        <label for="select-v-5e">Select</label>
                        <select disabled="disabled" name="select-v-5e" id="select-v-5e">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="slider-5">Slider:</label>
                    <input disabled="disabled" type="range" name="slider-5" id="slider-5" value="50" min="0" max="100" data-highlight="true" data-mini="true">
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="flip-5">Flip toggle:</label>
                    <select disabled="disabled" name="flip-5" id="flip-5" data-role="slider" data-mini="true">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Single checkbox:</legend>
                        <label for="checkbox-5">I agree</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-5" id="checkbox-5">
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, checkbox:</legend>
                        <input disabled="disabled" type="checkbox" name="checkbox-v-5a" id="checkbox-v-5a">
                        <label for="checkbox-v-5a">One</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-v-5b" id="checkbox-v-5b">
                        <label for="checkbox-v-5b">Two</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-v-5c" id="checkbox-v-5c">
                        <label for="checkbox-v-5c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, radio:</legend>
                        <input disabled="disabled" type="radio" name="radio-choice-v-5" id="radio-choice-v-5a" value="on" checked="checked">
                        <label for="radio-choice-v-5a">One</label>
                        <input disabled="disabled" type="radio" name="radio-choice-v-5" id="radio-choice-v-5b" value="off">
                        <label for="radio-choice-v-5b">Two</label>
                        <input disabled="disabled" type="radio" name="radio-choice-v-5" id="radio-choice-v-5c" value="other">
                        <label for="radio-choice-v-5c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, checkbox:</legend>
                        <input disabled="disabled" type="checkbox" name="checkbox-h-5a" id="checkbox-h-5a">
                        <label for="checkbox-h-5a">One</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-h-5b" id="checkbox-h-5b">
                        <label for="checkbox-h-5b">Two</label>
                        <input disabled="disabled" type="checkbox" name="checkbox-h-5c" id="checkbox-h-5c">
                        <label for="checkbox-h-5c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, radio:</legend>
                        <input disabled="disabled" type="radio" name="radio-choice-h-5" id="radio-choice-h-5a" value="on" checked="checked">
                        <label for="radio-choice-h-5a">One</label>
                        <input disabled="disabled" type="radio" name="radio-choice-h-5" id="radio-choice-h-5b" value="off">
                        <label for="radio-choice-h-5b">Two</label>
                        <input disabled="disabled" type="radio" name="radio-choice-h-5" id="radio-choice-h-5c" value="other">
                        <label for="radio-choice-h-5c">Three</label>
                    </fieldset>
                </div>
            </div><!--/demo-html -->
    
            <div data-demo-html="true">
                <div data-role="fieldcontain">
                    <label for="submit-5">Send:</label>
                    <button disabled="disabled" type="submit" id="submit-5" data-mini="true">Submit</button>
                </div>
            </div><!--/demo-html -->
    
        </form>
    
        <h2>Class ui-disabled</h2>
    
        <div data-demo-html="true">
            <a href="#" data-role="button" class="ui-disabled" data-icon="arrow-r" data-iconpos="right">Link button</a>
        </div><!--/demo-html -->
    
        <div data-demo-html="true">
            <a href="#" data-role="button" class="ui-disabled" data-icon="arrow-r" data-iconpos="right" data-mini="true">Link button</a>
        </div><!--/demo-html -->
        

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
