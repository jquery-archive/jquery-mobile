<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Buttons in grids - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<style>
		.my-grid > div {
			text-align: center;
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
    
    	<h1>Buttons in grids</h1>
        
        <p class="jqm-intro">On this page you see examples of how you can use grids to layout buttons.</p>


        <h2>Basic</h2>
        
        <p>Buttons in grids get a bit margin left and right.</p>

        <div data-demo-html="true">
            <div class="ui-grid-a">
                <div class="ui-block-a"><button data-theme="b">Confirm</button></div>
                <div class="ui-block-b"><button data-theme="d">Cancel</button></div>
            </div>
        </div><!--/demo-html -->


        <h2>Icon only, centered</h2>
        
        <p>Inline buttons can be centered by adding <code>text-align: center;</code> to your custom CSS.</p>

        <div data-demo-html="true" data-demo-css="true">
            <div class="ui-grid-d my-grid">
                <div class="ui-block-a"><button data-icon="home" data-iconpos="notext" data-inline="true">Button</button></div>
                <div class="ui-block-b"><button data-icon="arrow-l" data-iconpos="notext" data-inline="true">Button</button></div>
                <div class="ui-block-c"><button data-icon="grid" data-iconpos="notext" data-inline="true">Button</button></div>
                <div class="ui-block-d"><button data-icon="arrow-r" data-iconpos="notext" data-inline="true">Button</button></div>
                <div class="ui-block-e"><button data-icon="gear" data-iconpos="notext" data-inline="true">Button</button></div>
            </div>
        </div><!--/demo-html -->


        <h2>Mini sized</h2>

        <div data-demo-html="true">
            <div class="ui-grid-b">
                <div class="ui-block-a"><a href="#" data-role="button" data-mini="true">Anchor</a></div>
                <div class="ui-block-b"><button data-mini="true">Button</button></div>
                <div class="ui-block-c"><input type="button" data-mini="true" value="Input"></div>
            </div>
        </div><!--/demo-html -->


        <h2>Select &amp; Checkbox</h2>

        <div data-demo-html="true">
			<form>
                <div class="ui-grid-a">
                    <div class="ui-block-a">
                        <label for="grid-select-1" class="ui-hidden-accessible">Select</label>
                        <select id="grid-select-1" name="grid-select-1" data-shadow="false">
                            <option>Select</option>
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                    <div class="ui-block-b">
                        <label for="grid-checkbox-1">Checkbox</label>
                        <input type="checkbox" id="grid-checkbox-1">
                    </div>
                </div>
            </form>
        </div><!--/demo-html -->


        <h2>Responsive</h2>
        
        <p>It's not recommended to have many buttons with text on one row at small screens, because the text might get truncated. You can use <a href="./">responsive grids</a> to stack the buttons at small screens. Here we use the framework preset breakpoint by adding class <code>ui-responsive</code> to the container.</p>

        <div data-demo-html="true">
            <div class="ui-grid-b ui-responsive">
                <div class="ui-block-a"><a href="#" data-role="button" data-icon="arrow-l">Back to order</a></div>
                <div class="ui-block-b"><button data-icon="plus">Add products</button></div>
                <div class="ui-block-c"><input type="button" data-icon="check" data-iconpos="right" value="Confirm order"></div>
            </div>
        </div><!--/demo-html -->


        <h2>Alignment</h2>
        
        <p>Use grid solo to align a single button with buttons in other grids.</p>

        <div data-demo-html="true">
            <div class="ui-grid-b ui-responsive">
                <div class="ui-block-a"><a href="#" data-role="button">Grid B</a></div>
                <div class="ui-block-b"><a href="#" data-role="button">Grid B</a></div>
                <div class="ui-block-c"><a href="#" data-role="button">Grid B</a></div>
            </div>
            <div class="ui-grid-a ui-responsive">
                <div class="ui-block-a"><a href="#" data-role="button">Grid A</a></div>
                <div class="ui-block-b"><a href="#" data-role="button">Grid A</a></div>
            </div>
            <div class="ui-grid-solo">
                <a href="#" data-role="button">Grid Solo</a>
            </div>
            <br>
            <a href="#" data-role="button" data-theme="e">No grid class</a>
        </div><!--/demo-html -->
        
        
		<a href="./" class="jqm-button" data-ajax="false" data-role="button" data-mini="true" data-inline="true" data-icon="arrow-l" data-iconpos="left">Back to Grids</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
