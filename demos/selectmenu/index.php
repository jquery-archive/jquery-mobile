<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Selects - jQuery Mobile Demos</title>
    <link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
    <link rel="stylesheet" href="../_assets/css/jqm-demos.css">
    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <script src="../../external/jquery/jquery.js"></script>
    <script src="../_assets/js/"></script>
    <script src="../../js/"></script>
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

        <h1>Select menu</h1>

        <p>The select menu is based on a native select element, which is hidden from view and replaced with a custom-styled select button. Tapping it opens the native menu. There is also a <a href="../selectmenu-custom/">custom select menu</a> widget, which also replaces the native dropdown.
        </p>

        <h2>Basic select</h2>
        <div data-demo-html="true">
            <form>
            <div class="ui-field-contain">
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
            <div class="ui-field-contain">
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
         <div data-demo-html="true">
                    <div class="ui-field-contain">
                        <label for="select-custom-20">Long list:</label>
                        <select name="select-custom-20" id="select-custom-20" data-native-menu="true">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                </div><!--/demo-html -->
        <div data-demo-html="true">
                    <div class="ui-field-contain">
                        <label for="select-custom-24">Multiple, icon left, long list:</label>
                        <select name="select-custom-24" size="5" id="select-custom-24" data-native-menu="true" multiple="multiple" data-iconpos="left">
                            <option>Choose options</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA" selected="selected">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL" selected="selected">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA" selected="selected">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                </div><!--/demo-html -->
        <h2>Icon position</h2>

        <div data-demo-html="true">
            <form>
            <div class="ui-field-contain">
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
            <div class="ui-field-contain">
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
            <div class="ui-field-contain">
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

        <h2>Disabled select</h2>

        <div data-demo-html="true">
            <form>
            <div class="ui-field-contain">
                <label for="select-native-disabled">1 option disabled:</label>
                <select name="select-native-18" id="select-native-disabled" disabled>
                    <option value="1">The 1st Option</option>
                    <option value="2">The 2nd Option</option>
                    <option value="3">The 3rd Option</option>
                    <option value="4">The 4th Option</option>
                </select>
            </div>
            </form>
        </div><!--/demo-html -->

        <h2>Optgroup</h2>

        <div data-demo-html="true">
            <form>
            <div class="ui-field-contain">
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

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
