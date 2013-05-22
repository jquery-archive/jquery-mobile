<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Custom select - jQuery Mobile Demos</title>
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
		<h1>Custom select</h1>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

        	<form>

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-1">Basic:</label>
                        <select name="select-custom-1" id="select-custom-1" data-native-menu="false">
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-20">Long list:</label>
                        <select name="select-custom-20" id="select-custom-20" data-native-menu="false">
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
                    <div data-role="fieldcontain">
                        <label for="select-custom-2">Mini sized:</label>
                        <select name="select-custom-2" id="select-custom-2" data-native-menu="false" data-mini="true">
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-3">Icon left:</label>
                        <select name="select-custom-3" id="select-custom-3" data-native-menu="false" data-iconpos="left">
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-21">Data-placeholder:</label>
                        <select name="select-custom-21" id="select-custom-21" data-native-menu="false">
                            <option value="choose-one" data-placeholder="true">Choose one...</option>
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-22">Option w/o value:</label>
                        <select name="select-custom-22" id="select-custom-22" data-native-menu="false">
                            <option>Choose one...</option>
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-23">Empty option w/o value:</label>
                        <select name="select-custom-23" id="select-custom-23" data-native-menu="false">
                            <option></option>
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-17">1 option selected:</label>
                        <select name="select-custom-17" id="select-custom-17" data-native-menu="false">
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3" selected="selected">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-18">1 option disabled:</label>
                        <select name="select-custom-18" id="select-custom-18" data-native-menu="false">
                            <option value="1">The 1st Option</option>
                            <option value="2">The 2nd Option</option>
                            <option value="3" disabled="disabled">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-19">Multiple:</label>
                        <select name="select-custom-19" id="select-custom-19" multiple="multiple" data-native-menu="false">
                            <option>Choose options</option>
                            <option value="1">The 1st Option</option>
                            <option value="2" selected="selected">The 2nd Option</option>
                            <option value="3" selected="selected">The 3rd Option</option>
                            <option value="4">The 4th Option</option>
                        </select>
                    </div>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-24">Multiple, icon left, long list:</label>
                        <select name="select-custom-24" id="select-custom-24" data-native-menu="false" multiple="multiple" data-iconpos="left">
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

                <div data-demo-html="true">
                    <div data-role="fieldcontain">
                        <label for="select-custom-4">Optgroup:</label>
                        <select name="select-custom-4" id="select-custom-4" data-native-menu="false">
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
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <fieldset data-role="controlgroup">
                        <legend>Vertical controlgroup:</legend>
                        <label for="select-custom-5">Select A</label>
                        <select name="select-custom-5" id="select-custom-5" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-6">Select B</label>
                        <select name="select-custom-6" id="select-custom-6" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-7">Select C</label>
                        <select name="select-custom-7" id="select-custom-7" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <fieldset data-role="controlgroup" data-mini="true">
                        <legend>Vertical controlgroup, icon left, mini sized:</legend>
                        <label for="select-custom-8">Select A</label>
                        <select name="select-custom-8" id="select-custom-8" data-native-menu="false" data-iconpos="left">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-9">Select B</label>
                        <select name="select-custom-9" id="select-custom-9" data-native-menu="false" data-iconpos="left">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-10">Select C</label>
                        <select name="select-custom-10" id="select-custom-10" data-native-menu="false" data-iconpos="left">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <fieldset data-role="controlgroup" data-type="horizontal">
                        <legend>Horizontal controlgroup:</legend>
                        <label for="select-custom-11">Select A</label>
                        <select name="select-custom-11" id="select-custom-11" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-12">Select B</label>
                        <select name="select-custom-12" id="select-custom-12" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-13">Select C</label>
                        <select name="select-custom-13" id="select-custom-13" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div><!--/demo-html -->

                <div data-demo-html="true">
                    <fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">
                        <legend>Horizontal controlgroup, mini sized:</legend>
                        <label for="select-custom-14">Select A</label>
                        <select name="select-custom-14" id="select-custom-14" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-15">Select B</label>
                        <select name="select-custom-15" id="select-custom-15" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                        <label for="select-custom-16">Select C</label>
                        <select name="select-custom-16" id="select-custom-16" data-native-menu="false">
                            <option value="#">One</option>
                            <option value="#">Two</option>
                            <option value="#">Three</option>
                        </select>
                    </fieldset>
                </div><!--/demo-html -->

			</form>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

</div><!-- /page -->
</body>
</html>
