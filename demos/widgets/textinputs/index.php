<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Textinput - jQuery Mobile Demos</title>
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

        <h1>Text inputs <a href="http://api.jquerymobile.com/textinput/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

        <p class="jqm-intro">Text inputs and textareas are coded with standard HTML elements, then enhanced by jQuery Mobile to make them more attractive and useable on a mobile device.
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
            <textarea cols="40" rows="8" name="textarea-1" id="textarea-1"></textarea>
        </form>
        </div><!-- /demo-html -->

        <h2>Number</h3>

        <div data-demo-html="true">
        <form>
             <label for="number-1">Number: data-clear-btn="false"</label>
             <input type="number" data-clear-btn="false" name="number-1" id="number-1" value="">

             <label for="number-2">Number: data-clear-btn="true"</label>
             <input type="number" data-clear-btn="true" name="number-2" id="number-2" value="">

             <label for="number-3">Number + pattern: data-clear-btn="false"</label>
             <input type="number" data-clear-btn="false" name="number-3" pattern="[0-9]*" id="number-3" value="">

             <label for="number-2">Number + pattern: data-clear-btn="true"</label>
             <input type="number" data-clear-btn="true" name="number-4" pattern="[0-9]*" id="number-4" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Date</h3>

        <div data-demo-html="true">
        <form>
             <label for="date-1">Date: data-clear-btn="false"</label>
             <input type="date" data-clear-btn="false" name="date-1" id="date-1" value="">

             <label for="date-2">Date: data-clear-btn="true"</label>
             <input type="date" data-clear-btn="true" name="date-2" id="date-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Month</h3>

        <div data-demo-html="true">
        <form>
            <label for="month-1">Month: data-clear-btn="false"</label>
            <input type="month" data-clear-btn="false" name="month-1" id="month-1" value="">

            <label for="month-2">Month: data-clear-btn="true"</label>
            <input type="month" data-clear-btn="true" name="month-2" id="month-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Week</h3>

        <div data-demo-html="true">
        <form>
            <label for="week-1">Week: data-clear-btn="false"</label>
            <input type="week" data-clear-btn="false" name="week-1" id="week-1" value="">

            <label for="week-2">Week: data-clear-btn="true"</label>
            <input type="week" data-clear-btn="true" name="week-2" id="week-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Time</h3>

        <div data-demo-html="true">
        <form>
            <label for="time-1">Time: data-clear-btn="false"</label>
            <input type="time" data-clear-btn="false" name="time-1" id="time-1" value="">

            <label for="time-2">Time: data-clear-btn="true"</label>
            <input type="time" data-clear-btn="true" name="time-2" id="time-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Datetime</h3>

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

        <h2>Telephone</h3>

        <div data-demo-html="true">
        <form>
             <label for="tel-1">Tel: data-clear-btn="false"</label>
             <input type="tel" data-clear-btn="false" name="tel-1" id="tel-1" value="">

             <label for="tel-2">Tel: data-clear-btn="true"</label>
             <input type="tel" data-clear-btn="true" name="tel-2" id="tel-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Email</h3>

        <div data-demo-html="true">
        <form>
            <label for="email-1">Email: data-clear-btn="false"</label>
            <input type="email" data-clear-btn="false" name="email-1" id="email-1" value="">

            <label for="email-2">Email: data-clear-btn="true"</label>
            <input type="email" data-clear-btn="true" name="email-2" id="email-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>URL</h3>

        <div data-demo-html="true">
        <form>
            <label for="url-1">Url: data-clear-btn="false"</label>
            <input type="url" data-clear-btn="false" name="url-1" id="url-1" value="">

            <label for="url-2">Url: data-clear-btn="true"</label>
            <input type="url" data-clear-btn="true" name="url-2" id="url-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Password</h3>

        <div data-demo-html="true">
        <form>
             <label for="password-1">Password: data-clear-btn="false"</label>
             <input type="password" data-clear-btn="false" name="password-1" id="password-1" value="" autocomplete="off">

             <label for="password-2">Password: data-clear-btn="true"</label>
             <input type="password" data-clear-btn="true" name="password-2" id="password-2" value="" autocomplete="off">
        </form>
        </div><!-- /demo-html -->

        <h2>Color</h3>

        <div data-demo-html="true">
        <form>
            <label for="color-1">Color: data-clear-btn="false"</label>
            <input type="color" data-clear-btn="false" name="color-1" id="color-1" value="">
        </form>
        </div><!-- /demo-html -->

        <div data-demo-html="true">
        <form>
        <form>
            <label for="color-2">Color: data-clear-btn="true"</label>
            <input type="color" data-clear-btn="true" name="color-2" id="color-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>File</h3>

        <div data-demo-html="true">
        <form>
             <label for="file-1">File: data-clear-btn="false"</label>
             <input type="file" data-clear-btn="false" name="file-1" id="file-1" value="">

             <label for="file-2">File: data-clear-btn="true"</label>
             <input type="file" data-clear-btn="true" name="file-2" id="file-2" value="">
        </form>
        </div><!-- /demo-html -->

        <h2>Mini</h3>

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

        <h2>Placeholder</h3>

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

        <h2>Value/Text</h3>

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

        <h2>Label hidden</h3>

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

        <h2>Disabled</h3>

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

        <h2>Fieldcontain</h3>

        <div data-demo-html="true">
        <form>
            <div data-role="fieldcontain">
                 <label for="text-12">Text input:</label>
                 <input type="text" name="text-12" id="text-12" value="">
            </div>

            <div data-role="fieldcontain">
                 <label for="text-13">Text input: data-clear-btn="true"</label>
                 <input type="text" data-clear-btn="true" name="text-13" id="text-13" value="">
            </div>

            <div data-role="fieldcontain">
                 <label for="search-8">Search:</label>
                 <input type="search" name="search-8" id="search-8" value="">
            </div>

            <div data-role="fieldcontain">
                <label for="textarea-12">Textarea:</label>
                <textarea cols="40" rows="8" name="textarea-12" id="textarea-12"></textarea>
            </div>
        </form>
        </div><!-- /demo-html -->

        <h2>Fieldcontain, mini sized</h3>

        <div data-demo-html="true">
        <form>
            <div data-role="fieldcontain">
                 <label for="text-14">Text input:</label>
                 <input type="text" data-mini="true" name="text-14" id="text-14" value="">
            </div>

            <div data-role="fieldcontain">
                 <label for="text-15">Text input: data-clear-btn="true"</label>
                 <input type="text" data-clear-btn="true" data-mini="true" name="text-15" id="text-15" value="">
            </div>

            <div data-role="fieldcontain">
             <label for="search-9">Search:</label>
             <input type="search" data-mini="true" name="search-9" id="search-9" value="">
            </div>

            <div data-role="fieldcontain">
            <label for="textarea-14">Textarea:</label>
            <textarea data-mini="true" cols="40" rows="8" name="textarea-14" id="textarea-14"></textarea>
            </div>
        </form>
        </div><!-- /demo-html -->

        <h2>Fieldcontain, hidden label</h3>

        <div data-demo-html="true">
        <form>
            <div data-role="fieldcontain" class="ui-hide-label">
                 <label for="text-16">Text input:</label>
                 <input type="text" name="text-16" id="text-16" value="">
            </div>

            <div data-role="fieldcontain" class="ui-hide-label">
                 <label for="text-17">Text input: data-clear-btn="true"</label>
                 <input type="text" data-clear-btn="true" name="text-17" id="text-17" value="">
            </div>

            <div data-role="fieldcontain" class="ui-hide-label">
             <label for="search-10">Search:</label>
             <input type="search" name="search-110" id="search-10" value="">
            </div>

            <div data-role="fieldcontain" class="ui-hide-label">
            <label for="textarea-16">Textarea:</label>
            <textarea cols="40" rows="8" name="textarea-16" id="textarea-16"></textarea>
            </div>
        </form>
        </div><!-- /demo-html -->

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
