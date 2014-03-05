<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Buttons in grids - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<style id="wrap">
		.button-wrap {
			margin-left: 5px;
			margin-right: 5px;
		}
	</style>
	<style id="center">
		.center {
			text-align: center;
		}
	</style>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

    	<h1>Buttons in grids</h1>

        <p>On this page you see examples of how you can use grids to layout buttons.</p>

        <h2>Basic</h2>

        <p>Buttons in grids get a bit margin left and right. There is one exception; fullwidth <code>button</code> elements (i.e. not inline or icon-only). Because of the 100% width the margin can't be applied to the element directly. You can wrap them in a <code>div</code> and give this the same margin as other buttons as we do in this example:</p>

        <div data-demo-html="true" data-demo-css="#wrap">
            <div class="ui-grid-b">
                <div class="ui-block-a"><a href="#" class="ui-shadow ui-btn ui-corner-all">Anchor</a></div>
                <div class="ui-block-b"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all">Button</button></div></div>
                <div class="ui-block-c"><input type="button" value="Input"></div>
            </div>
			<form class="ui-grid-b">
				<div class="ui-block-a">
					<label for="grid-select-1" class="ui-hidden-accessible">Select</label>
					<select id="grid-select-1" name="grid-select-1" data-shadow="false">
						<option>Select</option>
						<option value="1">The 1st Option</option>
						<option value="2">The 2nt Option</option>
						<option value="3">The 3rd Option</option>
						<option value="4">The 4th Option</option>
					</select>
				</div>
				<div class="ui-block-b">
					<label for="grid-checkbox-1">Checkbox</label>
					<input type="checkbox" id="grid-checkbox-1" name="grid-checkbox-1">
				</div>
				<div class="ui-block-c">
					<label for="grid-radio-1">Radio</label>
					<input type="radio" id="grid-radio-1" name="grid-radio-1">
				</div>
			</form>
        </div><!--/demo-html -->

        <h2>Mini sized</h2>

        <div data-demo-html="true" data-demo-css="#wrap">
            <div class="ui-grid-b">
                <div class="ui-block-a"><a href="#" class="ui-shadow ui-btn ui-corner-all ui-mini">Anchor</a></div>
                <div class="ui-block-b"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all ui-mini">Button</button></div></div>
                <div class="ui-block-c"><input type="button" value="Input" data-mini="true"></div>
            </div>
			<form class="ui-grid-b">
				<div class="ui-block-a">
					<label for="grid-select-2" class="ui-hidden-accessible">Select</label>
					<select id="grid-select-2" name="grid-select-2" data-shadow="false" data-mini="true">
						<option>Select</option>
						<option value="1">The 1st Option</option>
						<option value="2">The 2nt Option</option>
						<option value="3">The 3rd Option</option>
						<option value="4">The 4th Option</option>
					</select>
				</div>
				<div class="ui-block-b">
					<label for="grid-checkbox-2">Checkbox</label>
					<input type="checkbox" id="grid-checkbox-2" name="grid-checkbox-2" data-mini="true">
				</div>
				<div class="ui-block-c">
					<label for="grid-radio-2">Radio</label>
					<input type="radio" id="grid-radio-2" name="grid-radio-2" data-mini="true">
				</div>
			</form>
        </div><!--/demo-html -->

        <h2>Icon only, inline centered</h2>

        <p>Inline buttons can be centered by adding <code>text-align: center;</code> to your custom CSS.</p>

        <div data-demo-html="true" data-demo-css="#center">
            <div class="ui-grid-d center">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
                <div class="ui-block-b"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline">Button</a></div>
                <div class="ui-block-c"><a class="ui-shadow ui-btn ui-corner-all ui-icon-grid ui-btn-icon-notext ui-btn-inline">Button</a></div>
                <div class="ui-block-d"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-r ui-btn-icon-notext ui-btn-inline">Button</a></div>
                <div class="ui-block-e"><a class="ui-shadow ui-btn ui-corner-all ui-icon-gear ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>
        </div><!--/demo-html -->

        <h2>Responsive</h2>

        <p>It's not recommended to have many buttons with text on one row at small screens, because the text might get truncated. You can use <a href="./">responsive grids</a> to stack the buttons at small screens. Here we use the framework preset breakpoint by adding class <code>ui-responsive</code> to the container.</p>

        <div data-demo-html="true">
            <div class="ui-grid-b ui-responsive">
                <div class="ui-block-a"><a href="#" class="ui-shadow ui-btn ui-corner-all ui-btn-icon-left ui-icon-arrow-l">Back to order</a></div>
                <div class="ui-block-b"><input type="button" data-icon="plus" value="Add products"></div>
                <div class="ui-block-c"><input type="button" data-icon="check" data-iconpos="right" value="Confirm order"></div>
            </div>
        </div><!--/demo-html -->

        <h2>Alignment</h2>

        <p>Use grid solo to align a single button with buttons in other grids.</p>

        <div data-demo-html="true">
            <div class="ui-grid-b ui-responsive">
                <div class="ui-block-a"><a href="#" class="ui-btn ui-shadow ui-corner-all">Grid B</a></div>
                <div class="ui-block-b"><a href="#" class="ui-btn ui-shadow ui-corner-all">Grid B</a></div>
                <div class="ui-block-c"><a href="#" class="ui-btn ui-shadow ui-corner-all">Grid B</a></div>
            </div>
            <div class="ui-grid-a ui-responsive">
                <div class="ui-block-a"><a href="#" class="ui-btn ui-shadow ui-corner-all">Grid A</a></div>
                <div class="ui-block-b"><a href="#" class="ui-btn ui-shadow ui-corner-all">Grid A</a></div>
            </div>
            <div class="ui-grid-solo">
                <div class="ui-block-a"><a href="#" class="ui-btn ui-shadow ui-corner-all">Grid Solo</a></div>
            </div>
            <br>
            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-b">Outside the grid</a>
        </div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
