<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Selects - jQuery Mobile Demos</title>
    <link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="../../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <script src="../../../js/jquery.js"></script>
    <script src="../../_assets/js/"></script>
    <script src="../../../js/"></script>
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

        <h1>Select menu <a href="http://api.jquerymobile.com/select/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

        <p class="jqm-intro">The select menu is based on a native select element, which is hidden from view and replaced with a custom-styled select button. Tapping it opens the native menu.
        </p>

        <h2>Basic select</h2>
        <div data-demo-html="true">
            <form>
            <div data-role="fieldcontain">
                <label for="select-native-1">Basic:</label>
                <select name="select-native-1" id="select-native-1">
                    <option value="1">The 1st Option</option>
                    <option value="2">The 2nd Option</option>
                    <option value="3">The 3rd Option</option>
                    <option value="4">The 4th Option</option>
                </select>
            </div>
            </form>
        </div><!--/demo-html -->

        <h2>Mini</h2>

        <div data-demo-html="true">
            <form>
            <div data-role="fieldcontain">
                <label for="select-native-2">Mini sized:</label>
                <select name="select-native-2" id="select-native-2" data-mini="true">
                    <option value="1">The 1st Option</option>
                    <option value="2">The 2nd Option</option>
                    <option value="3">The 3rd Option</option>
                    <option value="4">The 4th Option</option>
                </select>
            </div>
            </form>
        </div><!--/demo-html -->

        <h2>Icon position</h2>

        <div data-demo-html="true">
            <form>
            <div data-role="fieldcontain">
                <label for="select-native-3">Icon left:</label>
                <select name="select-native-3" id="select-native-3" data-iconpos="left">
                    <option value="1">The 1st Option</option>
                    <option value="2">The 2nd Option</option>
                    <option value="3">The 3rd Option</option>
                    <option value="4">The 4th Option</option>
                </select>
            </div>
            </form>
        </div><!--/demo-html -->

        <h2>Selected option</h2>

        <div data-demo-html="true">
            <form>
            <div data-role="fieldcontain">
                <label for="select-native-17">1 option selected:</label>
                <select name="select-native-17" id="select-native-17">
                    <option value="1">The 1st Option</option>
                    <option value="2">The 2nd Option</option>
                    <option value="3" selected="selected">The 3rd Option</option>
                    <option value="4">The 4th Option</option>
                </select>
            </div>
            </form>
        </div><!--/demo-html -->

        <h2>Disabled option</h2>

        <div data-demo-html="true">
            <form>
            <div data-role="fieldcontain">
                <label for="select-native-18">1 option disabled:</label>
                <select name="select-native-18" id="select-native-18">
                    <option value="1">The 1st Option</option>
                    <option value="2">The 2nd Option</option>
                    <option value="3" disabled="disabled">The 3rd Option</option>
                    <option value="4">The 4th Option</option>
                </select>
            </div>
            </form>
        </div><!--/demo-html -->

        <h2>Optgroup</h2>

        <div data-demo-html="true">
            <form>
            <div data-role="fieldcontain">
                <label for="select-native-4">Optgroup (if supported):</label>
                <select name="select-native-4" id="select-native-4">
                    <option>Choose...</option>
                    <optgroup label="Group 1">
                        <option value="1">The 1st Option</option>
                        <option value="2">The 2nd Option</option>
                        <option value="3">The 3rd Option</option>
                        <option value="4">The 4th Option</option>
                    </optgroup>
                    <optgroup label="Group 2">
                        <option value="5">The 5th Option</option>
                        <option value="6">The 6th Option</option>
                        <option value="7">The 7th Option</option>
                    </optgroup>
                </select>
            </div>
            </form>
        </div><!--/demo-html -->

        <h2>Vertical group</h2>

        <div data-demo-html="true">
            <form>
            <fieldset data-role="controlgroup">
                <legend>Vertical controlgroup:</legend>
                <label for="select-native-5">Select A</label>
                <select name="select-native-5" id="select-native-5">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-6">Select B</label>
                <select name="select-native-6" id="select-native-6">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-7">Select C</label>
                <select name="select-native-7" id="select-native-7">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
            </fieldset>
            </form>
        </div><!--/demo-html -->

        <h2>Vertical group, mini</h2>

        <div data-demo-html="true">
            <form>
            <fieldset data-role="controlgroup" data-mini="true">
                <legend>Vertical controlgroup, icon left, mini sized:</legend>
                <label for="select-native-8">Select A</label>
                <select name="select-native-8" id="select-native-8" data-iconpos="left">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-9">Select B</label>
                <select name="select-native-9" id="select-native-9" data-iconpos="left">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-10">Select C</label>
                <select name="select-native-10" id="select-native-10" data-iconpos="left">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
            </fieldset>
            </form>
        </div><!--/demo-html -->

        <h2>Horizontal group</h2>

        <div data-demo-html="true">
            <form>
            <fieldset data-role="controlgroup" data-type="horizontal">
                <legend>Horizontal controlgroup:</legend>
                <label for="select-native-11">Select A</label>
                <select name="select-native-11" id="select-native-11">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-12">Select B</label>
                <select name="select-native-12" id="select-native-12">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-13">Select C</label>
                <select name="select-native-13" id="select-native-13">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
            </fieldset>
            </form>
        </div><!--/demo-html -->

        <h2>Horizontal group, mini</h2>

        <div data-demo-html="true">
            <form>
            <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                <legend>Horizontal controlgroup, mini sized:</legend>
                <label for="select-native-14">Select A</label>
                <select name="select-native-14" id="select-native-14">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-15">Select B</label>
                <select name="select-native-15" id="select-native-15">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
                <label for="select-native-16">Select C</label>
                <select name="select-native-16" id="select-native-16">
                    <option value="#">One</option>
                    <option value="#">Two</option>
                    <option value="#">Three</option>
                </select>
            </fieldset>
            </form>
        </div><!--/demo-html -->

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
