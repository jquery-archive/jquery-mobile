<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Textinput - jQuery Mobile Demos</title>
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

    <div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
        <a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
        <a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
    </div><!-- /header -->

    <div role="main" class="ui-content jqm-content">

        <h1>Text inputs</h1>

		<a href="http://api.jquerymobile.com/textinput/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

        <p>Text inputs and textareas are coded with standard HTML elements, then enhanced by jQuery Mobile to make them more attractive and useable on a mobile device.
        </p>

        <h2>Text</h2>

        <div data-demo-html="true">
			<form>
				 <label for="text-1">Text input:</label>
				 <input type="text" name="text-1" id="text-1" value="">

				 <label for="text-3">Text input: data-clear-btn="true"</label>
				 <input type="text" data-clear-btn="true" name="text-3" id="text-3" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Search</h2>

        <div data-demo-html="true">
			<form>
				 <label for="search-1">Search:</label>
				 <input type="search" name="search-1" id="search-1" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Textarea</h2>

        <div data-demo-html="true">
			<form>
				<label for="textarea-1">Textarea:</label>
				<textarea name="textarea-1" id="textarea-1"></textarea>
			</form>
        </div><!-- /demo-html -->

        <h2>Number</h2>

        <div data-demo-html="true">
			<form>
				 <label for="number-1">Number: data-clear-btn="false"</label>
				 <input type="number" data-clear-btn="false" name="number-1" id="number-1" value="">

				 <label for="number-2">Number: data-clear-btn="true"</label>
				 <input type="number" data-clear-btn="true" name="number-2" id="number-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Date</h2>

        <div data-demo-html="true">
			<form>
				 <label for="date-1">Date: data-clear-btn="false"</label>
				 <input type="date" data-clear-btn="false" name="date-1" id="date-1" value="">

				 <label for="date-2">Date: data-clear-btn="true"</label>
				 <input type="date" data-clear-btn="true" name="date-2" id="date-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Month</h2>

        <div data-demo-html="true">
			<form>
				<label for="month-1">Month: data-clear-btn="false"</label>
				<input type="month" data-clear-btn="false" name="month-1" id="month-1" value="">

				<label for="month-2">Month: data-clear-btn="true"</label>
				<input type="month" data-clear-btn="true" name="month-2" id="month-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Week</h2>

        <div data-demo-html="true">
			<form>
				<label for="week-1">Week: data-clear-btn="false"</label>
				<input type="week" data-clear-btn="false" name="week-1" id="week-1" value="">

				<label for="week-2">Week: data-clear-btn="true"</label>
				<input type="week" data-clear-btn="true" name="week-2" id="week-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Time</h2>

        <div data-demo-html="true">
			<form>
				<label for="time-1">Time: data-clear-btn="false"</label>
				<input type="time" data-clear-btn="false" name="time-1" id="time-1" value="">

				<label for="time-2">Time: data-clear-btn="true"</label>
				<input type="time" data-clear-btn="true" name="time-2" id="time-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Datetime</h2>

        <div data-demo-html="true">
			<form>
				<label for="datetime-1">Datetime: data-clear-btn="false"</label>
				<input type="datetime" data-clear-btn="false" name="datetime-1" id="datetime-1" value="">

				<label for="datetime-2">Datetime: data-clear-btn="true"</label>
				<input type="datetime" data-clear-btn="true" name="datetime-2" id="datetime-2" value="">

				<label for="datetime-3">Datetime-local: data-clear-btn="false"</label>
				<input type="datetime-local" data-clear-btn="false" name="datetime-3" id="datetime-3" value="">

				<label for="datetime-4">Datetime-local: data-clear-btn="true"</label>
				<input type="datetime-local" data-clear-btn="true" name="datetime-4" id="datetime-4" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Telephone</h2>

        <div data-demo-html="true">
			<form>
				 <label for="tel-1">Tel: data-clear-btn="false"</label>
				 <input type="tel" data-clear-btn="false" name="tel-1" id="tel-1" value="">

				 <label for="tel-2">Tel: data-clear-btn="true"</label>
				 <input type="tel" data-clear-btn="true" name="tel-2" id="tel-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Email</h2>

        <div data-demo-html="true">
			<form>
				<label for="email-1">Email: data-clear-btn="false"</label>
				<input type="email" data-clear-btn="false" name="email-1" id="email-1" value="">

				<label for="email-2">Email: data-clear-btn="true"</label>
				<input type="email" data-clear-btn="true" name="email-2" id="email-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>URL</h2>

        <div data-demo-html="true">
			<form>
				<label for="url-1">Url: data-clear-btn="false"</label>
				<input type="url" data-clear-btn="false" name="url-1" id="url-1" value="">

				<label for="url-2">Url: data-clear-btn="true"</label>
				<input type="url" data-clear-btn="true" name="url-2" id="url-2" value="">
			</form>
        </div><!-- /demo-html -->

        <h2>Password</h2>

        <div data-demo-html="true">
			<form>
				 <label for="password-1">Password: data-clear-btn="false"</label>
				 <input type="password" data-clear-btn="false" name="password-1" id="password-1" value="" autocomplete="off">

				 <label for="password-2">Password: data-clear-btn="true"</label>
				 <input type="password" data-clear-btn="true" name="password-2" id="password-2" value="" autocomplete="off">
			</form>
        </div><!-- /demo-html -->

        <h2>Color</h2>

        <div data-demo-html="true">
			<form>
				<label for="color-1">Color: data-clear-btn="false"</label>
				<input type="color" data-clear-btn="false" name="color-1" id="color-1" value="#000000">
			</form>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
			<form>
				<label for="color-2">Color: data-clear-btn="true"</label>
				<input type="color" data-clear-btn="true" name="color-2" id="color-2" value="#000000">
			</form>
        </div><!-- /demo-html -->

        <h2>File</h2>

        <div data-demo-html="true">
			<form>
				 <label for="file-1">File: data-clear-btn="false"</label>
				 <input type="file" data-clear-btn="false" name="file-1" id="file-1">

				 <label for="file-2">File: data-clear-btn="true"</label>
				 <input type="file" data-clear-btn="true" name="file-2" id="file-2">
			</form>
        </div><!-- /demo-html -->

        <h2>Mini</h2>

        <div data-demo-html="true">
			<form>
				 <label for="text-4">Text input:</label>
				 <input type="text" data-mini="true" name="text-4" id="text-4" value="">

				 <label for="text-5">Text input: data-clear-btn="true"</label>
				 <input type="text" data-clear-btn="true" data-mini="true" name="text-5" id="text-5" value="">

				 <label for="search-4">Search:</label>
				 <input type="search" data-mini="true" name="search-4" id="search-4" value="">

				<label for="textarea-4">Textarea:</label>
				<textarea data-mini="true" cols="40" rows="8" name="textarea-4" id="textarea-4"></textarea>
			</form>
        </div><!-- /demo-html -->

        <h2>Placeholder</h2>

        <div data-demo-html="true">
			<form>
				 <label for="text-6">Text input:</label>
				 <input type="text" name="text-6" id="text-6" value="" placeholder="Placeholder">

				 <label for="text-7">Text input: data-clear-btn="true"</label>
				 <input type="text" data-clear-btn="true" name="text-7" id="text-7" value="" placeholder="Placeholder">

				 <label for="search-5">Search:</label>
				 <input type="search" name="search-5" id="search-5" value="" placeholder="Placeholder">

				<label for="textarea-6">Textarea:</label>
				<textarea cols="40" rows="8" name="textarea-6" id="textarea-6" placeholder="Placeholder"></textarea>
			</form>
        </div><!-- /demo-html -->

        <h2>Value/Text</h2>

        <div data-demo-html="true">
			<form>
				 <label for="text-18">Text input:</label>
				 <input type="text" name="text-18" id="text-18" value="Value">

				 <label for="text-19">Text input: data-clear-btn="true"</label>
				 <input type="text" data-clear-btn="true" name="text-19" id="text-19" value="Value">

				 <label for="search-11">Search:</label>
				 <input type="search" name="search-11" id="search-11" value="Value">

				<label for="textarea-18">Textarea:</label>
				<textarea cols="40" rows="8" name="textarea-18" id="textarea-18">Text</textarea>
			</form>
        </div><!-- /demo-html -->

        <h2>Theming</h2>

        <div data-demo-html="true">
			<form>
				 <label for="search-10">Search:</label>
				 <input type="search" name="search-10" id="search-10" value="" data-theme="b">
			</form>
        </div><!-- /demo-html -->

		<p>To have a light icon, remove the <code>ui-alt-icon</code> class by setting the widget's <code>classes</code> option with the <code>data-classes</code> attribute. By default the classes <code>ui-icon</code>, <code>ui-icon-search</code>, and <code>ui-alt-icon</code> are added to the search icon span. Here we show how you can omit the <code>ui-alt-icon</code> class. Note: You have to use double quotes inside the object!</p>

        <div data-demo-html="true">
			<form>
				 <label for="search-12">Search:</label>
				 <input type="search" name="search-12" id="search-12" value="" data-theme="b" data-classes='{ "ui-textinput-search-icon": "ui-icon ui-icon-search" }'>
			</form>
        </div><!-- /demo-html -->

        <h2>Label hidden</h2>

        <div data-demo-html="true">
			<form>
				 <label for="text-8" class="ui-hidden-accessible">Text input:</label>
				 <input type="text" name="text-8" id="text-8" value="">

				 <label for="text-9" class="ui-hidden-accessible">Text input: data-clear-btn="true"</label>
				 <input type="text" data-clear-btn="true" name="text-9" id="text-9" value="">

				 <label for="search-6" class="ui-hidden-accessible">Search:</label>
				 <input type="search" name="search-6" id="search-6" value="">

				<label for="textarea-8" class="ui-hidden-accessible">Textarea:</label>
				<textarea cols="40" rows="8" name="textarea-8" id="textarea-8"></textarea>
			</form>
        </div><!-- /demo-html -->

        <h2>Disabled</h2>

        <div data-demo-html="true">
			<form>
				 <label for="text-10">Text input:</label>
				 <input type="text" disabled="disabled" name="text-10" id="text-10" value="">

				 <label for="text-11">Text input: data-clear-btn="true"</label>
				 <input type="text" data-clear-btn="true" disabled="disabled" name="text-11" id="text-11" value="">

				 <label for="search-7">Search:</label>
				 <input type="search" disabled="disabled" name="search-7" id="search-7" value="">

				<label for="textarea-10">Textarea:</label>
				<textarea disabled="disabled" cols="40" rows="8" name="textarea-10" id="textarea-10"></textarea>
			</form>
        </div><!-- /demo-html -->

        <h2>Enhanced</h2>

        <div data-demo-html="true">
			<form>
				<label for="text-enhanced">Text input:</label>
				<div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit ui-textinput-has-clear-button">
					<input type="text" data-enhanced="true" data-clear-btn="true" name="text-enhanced" id="text-enhanced" value="" class="ui-textinput-hide-clear">
					<a href="#" tabindex="-1" aria-hidden="true" title="Clear text" class="ui-textinput-clear-button ui-corner-all ui-button ui-button-icon-only ui-toolbar-header-button-right ui-textinput-clear-button-hidden">Clear text<span class="ui-textinput-clear-button-icon ui-icon-delete ui-icon"></span></a>
				</div>

				<label for="search-enhanced">Search:</label>
				<div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-search ui-body-inherit ui-textinput-has-clear-button">
					<span class="ui-textinput-search-icon ui-icon ui-alt-icon ui-icon-search"></span>
					<input type="text" data-enhanced="true" data-type="search" name="search-enhanced" id="search-enhanced" value="" class="ui-textinput-hide-clear">
					<a href="#" tabindex="-1" aria-hidden="true" title="Clear text" class="ui-textinput-clear-button ui-corner-all ui-button ui-button-icon-only ui-toolbar-header-button-right ui-textinput-clear-button-hidden">Clear text<span class="ui-textinput-clear-button-icon ui-icon-delete ui-icon"></span></a>
				</div>

				<label for="textarea-enhanced">Textarea:</label>
				<textarea data-enhanced="true" name="textarea-enhanced" id="textarea-enhanced" class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit ui-textinput-autogrow"></textarea>
			</form>
        </div><!-- /demo-html -->

        <h2>Fieldcontain</h2>

        <div data-demo-html="true">
			<form>
				<div class="ui-field-contain">
					 <label for="text-12">Text input:</label>
					 <input type="text" name="text-12" id="text-12" value="">
				</div>

				<div class="ui-field-contain">
					 <label for="text-13">Text input: data-clear-btn="true"</label>
					 <input type="text" data-clear-btn="true" name="text-13" id="text-13" value="">
				</div>

				<div class="ui-field-contain">
					 <label for="search-8">Search:</label>
					 <input type="search" name="search-8" id="search-8" value="">
				</div>

				<div class="ui-field-contain">
					<label for="textarea-12">Textarea:</label>
					<textarea cols="40" rows="8" name="textarea-12" id="textarea-12"></textarea>
				</div>
			</form>
        </div><!-- /demo-html -->

        <h2>Fieldcontain, mini sized</h2>

        <div data-demo-html="true">
			<form>
				<div class="ui-field-contain">
					 <label for="text-14">Text input:</label>
					 <input type="text" data-mini="true" name="text-14" id="text-14" value="">
				</div>

				<div class="ui-field-contain">
					 <label for="text-15">Text input: data-clear-btn="true"</label>
					 <input type="text" data-clear-btn="true" data-mini="true" name="text-15" id="text-15" value="">
				</div>

				<div class="ui-field-contain">
				 <label for="search-9">Search:</label>
				 <input type="search" data-mini="true" name="search-9" id="search-9" value="">
				</div>

				<div class="ui-field-contain">
				<label for="textarea-14">Textarea:</label>
				<textarea data-mini="true" cols="40" rows="8" name="textarea-14" id="textarea-14"></textarea>
				</div>
			</form>
        </div><!-- /demo-html -->

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
