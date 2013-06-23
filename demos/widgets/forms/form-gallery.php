<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Form gallery - jQuery Mobile Demos</title>
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
    
        <h1>Form gallery</h1>
        
        <form action="#" method="get">
        
            <div data-demo-html="true">
                <label for="textinput-2">Text Input:</label>
                <input type="text" name="textinput-2" id="textinput-2" placeholder="Text input" value="">
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="search-2">Search Input:</label>
                <input type="search" name="search-2" id="search-2" value="">
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="textarea-2">Textarea:</label>
                <textarea cols="40" rows="8" name="textarea-2" id="textarea-2">Textarea</textarea>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="select-native-2">Native select:</label>
                <select name="select-native-2" id="select-native-2">
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="select-multiple-2">Custom multiple select:</label>
                <select multiple="multiple" data-native-menu="false" name="select-multiple-2" id="select-multiple-2">
                    <option value="">Choices:</option>
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend>Vertical controlgroup, buttons:</legend>
                    <button data-icon="home" data-iconpos="right">One</button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal controlgroup, buttons:</legend>
                    <button data-icon="home" data-iconpos="right">One</button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend>Vertical controlgroup, select:</legend>
                    <label for="select-v-2a">Select A</label>
                    <select name="select-v-2a" id="select-v-2a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-2b">Select B</label>
                    <select name="select-v-2b" id="select-v-2b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-2c">Select C</label>
                    <select name="select-v-2c" id="select-v-2c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal controlgroup, select:</legend>
                    <label for="select-h-2a">Select A</label>
                    <select name="select-h-2a" id="select-h-2a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-2b">Select B</label>
                    <select name="select-h-2b" id="select-h-2b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-2c">Select C</label>
                    <select name="select-h-2c" id="select-h-2c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal controlgroup, mixed:</legend>
                    <a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Link</a>
                    <button data-icon="grid" data-iconpos="notext">Button</button>
                    <label for="select-v-2e">Select</label>
                    <select name="select-v-2e" id="select-v-2e">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="slider-2">Slider:</label>
                <input type="range" name="slider-2" id="slider-2" value="50" min="0" max="100" data-highlight="true">
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
            <div data-role="rangeslider">
                <label for="range-1a">Rangeslider:</label>
                <input type="range" name="range-1a" id="range-1a" min="0" max="100" value="40">
                <label for="range-1b">Rangeslider:</label>
                <input type="range" name="range-1b" id="range-1b" min="0" max="100" value="80">
            </div>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="flip-2">Flip toggle:</label>
                <select name="flip-2" id="flip-2" data-role="slider">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                </select>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend>Single checkbox:</legend>
                    <label for="checkbox-2">I agree</label>
                    <input type="checkbox" name="checkbox-2" id="checkbox-2">
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend>Vertical controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-v-2a" id="checkbox-v-2a">
                    <label for="checkbox-v-2a">One</label>
                    <input type="checkbox" name="checkbox-v-2b" id="checkbox-v-2b">
                    <label for="checkbox-v-2b">Two</label>
                    <input type="checkbox" name="checkbox-v-2c" id="checkbox-v-2c">
                    <label for="checkbox-v-2c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup">
                    <legend>Vertical controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-v-2" id="radio-choice-v-2a" value="on" checked="checked">
                    <label for="radio-choice-v-2a">One</label>
                    <input type="radio" name="radio-choice-v-2" id="radio-choice-v-2b" value="off">
                    <label for="radio-choice-v-2b">Two</label>
                    <input type="radio" name="radio-choice-v-2" id="radio-choice-v-2c" value="other">
                    <label for="radio-choice-v-2c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-h-2a" id="checkbox-h-2a">
                    <label for="checkbox-h-2a">One</label>
                    <input type="checkbox" name="checkbox-h-2b" id="checkbox-h-2b">
                    <label for="checkbox-h-2b">Two</label>
                    <input type="checkbox" name="checkbox-h-2c" id="checkbox-h-2c">
                    <label for="checkbox-h-2c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal">
                    <legend>Horizontal controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-h-2" id="radio-choice-h-2a" value="on" checked="checked">
                    <label for="radio-choice-h-2a">One</label>
                    <input type="radio" name="radio-choice-h-2" id="radio-choice-h-2b" value="off">
                    <label for="radio-choice-h-2b">Two</label>
                    <input type="radio" name="radio-choice-h-2" id="radio-choice-h-2c" value="other">
                    <label for="radio-choice-h-2c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="submit-2">Send:</label>
                <button type="submit" id="submit-2">Submit</button>
            </div><!--/demo-html -->
        
        </form>
        
        <h2>Mini sized</h2>
        
        <form action="#" method="get">
        
            <div data-demo-html="true">
                <label for="textinput-6">Text Input:</label>
                <input type="text" name="textinput-6" id="textinput-6" placeholder="Text input" value="" data-mini="true">
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="search-6">Search Input:</label>
                <input type="search" name="search-6" id="search-6" value="" data-mini="true">
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="textarea-6">Textarea:</label>
                <textarea cols="40" rows="8" name="textarea-6" id="textarea-6" data-mini="true">Textarea</textarea>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="select-native-6">Native select:</label>
                <select name="select-native-6" id="select-native-6" data-mini="true">
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="select-multiple-6">Custom multiple select:</label>
                <select multiple="multiple" data-native-menu="false" name="select-multiple-6" id="select-multiple-6" data-mini="true">
                    <option value="">Choices:</option>
                    <option value="small">One</option>
                    <option value="medium">Two</option>
                    <option value="large">Three</option>
                </select>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend>Vertical controlgroup, buttons:</legend>
                    <button data-icon="home" data-iconpos="right">One</button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Horizontal controlgroup, buttons:</legend>
                    <button data-icon="home" data-iconpos="right">One</button>
                    <input type="button" data-icon="back" data-iconpos="right" value="Two">
                    <a href="#" data-role="button" data-icon="grid" data-iconpos="right">Three</a>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend>Vertical controlgroup, select:</legend>
                    <label for="select-v-6a">Select A</label>
                    <select name="select-v-6a" id="select-v-6a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-6b">Select B</label>
                    <select name="select-v-6b" id="select-v-6b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-v-6c">Select C</label>
                    <select name="select-v-6c" id="select-v-6c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Horizontal controlgroup, select:</legend>
                    <label for="select-h-6a">Select A</label>
                    <select name="select-h-6a" id="select-h-6a">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-6b">Select B</label>
                    <select name="select-h-6b" id="select-h-6b">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                    <label for="select-h-6c">Select C</label>
                    <select name="select-h-6c" id="select-h-6c">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Horizontal controlgroup, mixed:</legend>
                    <a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right">Link</a>
                    <button data-icon="grid" data-iconpos="notext">Button</button>
                    <label for="select-v-6e">Select</label>
                    <select name="select-v-6e" id="select-v-6e">
                        <option value="#">One</option>
                        <option value="#">Two</option>
                        <option value="#">Three</option>
                    </select>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="slider-6">Slider:</label>
                <input type="range" name="slider-6" id="slider-6" value="50" min="0" max="100" data-highlight="true" data-mini="true">
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="flip-6">Flip toggle:</label>
                <select name="flip-6" id="flip-6" data-role="slider" data-mini="true">
                    <option value="off">Off</option>
                    <option value="on">On</option>
                </select>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend>Single checkbox:</legend>
                    <label for="checkbox-6">I agree</label>
                    <input type="checkbox" name="checkbox-6" id="checkbox-6">
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend>Vertical controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-v-6a" id="checkbox-v-6a">
                    <label for="checkbox-v-6a">One</label>
                    <input type="checkbox" name="checkbox-v-6b" id="checkbox-v-6b">
                    <label for="checkbox-v-6b">Two</label>
                    <input type="checkbox" name="checkbox-v-6c" id="checkbox-v-6c">
                    <label for="checkbox-v-6c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-mini="true">
                    <legend>Vertical controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-v-6" id="radio-choice-v-6a" value="on" checked="checked">
                    <label for="radio-choice-v-6a">One</label>
                    <input type="radio" name="radio-choice-v-6" id="radio-choice-v-6b" value="off">
                    <label for="radio-choice-v-6b">Two</label>
                    <input type="radio" name="radio-choice-v-6" id="radio-choice-v-6c" value="other">
                    <label for="radio-choice-v-6c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Horizontal controlgroup, checkbox:</legend>
                    <input type="checkbox" name="checkbox-h-6a" id="checkbox-h-6a">
                    <label for="checkbox-h-6a">One</label>
                    <input type="checkbox" name="checkbox-h-6b" id="checkbox-h-6b">
                    <label for="checkbox-h-6b">Two</label>
                    <input type="checkbox" name="checkbox-h-6c" id="checkbox-h-6c">
                    <label for="checkbox-h-6c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                    <legend>Horizontal controlgroup, radio:</legend>
                    <input type="radio" name="radio-choice-h-6" id="radio-choice-h-6a" value="on" checked="checked">
                    <label for="radio-choice-h-6a">One</label>
                    <input type="radio" name="radio-choice-h-6" id="radio-choice-h-6b" value="off">
                    <label for="radio-choice-h-6b">Two</label>
                    <input type="radio" name="radio-choice-h-6" id="radio-choice-h-6c" value="other">
                    <label for="radio-choice-h-6c">Three</label>
                </fieldset>
            </div><!--/demo-html -->
        
            <div data-demo-html="true">
                <label for="submit-6">Send:</label>
                <button type="submit" id="submit-6" data-mini="true">Submit</button>
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
