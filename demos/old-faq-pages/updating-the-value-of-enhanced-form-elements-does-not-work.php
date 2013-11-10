<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">
		<h2>Problem:</h2>

		<h1>Updating the value of enhanced form elements does not work</h1>

		<h2>Solution:</h2>

      <p>While some form elements that jQuery Mobile enhances are simply styled, some (like the slider) are custom controls built on top of native inputs.
Changing the value of a normal input such as a text or search box will render the value immediately, but changing the value of a select menu, slider, or any other complex
custom form control will require calling a <code>refresh</code> operation to re-enhance the control to reflect your new value.
      </p>

      <p>Let's use the example of a Select Menu to demonstrate how to update the value on a complex control:</p>
<pre class="brush: html"><code>
    // Some markup for a select menu
    &#60;select&#62;
      &#60;option value="a"&#62;A&#60;/option&#62;
      &#60;option value="b"&#62;B&#60;/option&#62;
      &#60;option value="c"&#62;C&#60;/option&#62;
    &#60;/select&#62;

    // Your Javascript:
    &#60;script&#62;
    $('#page1').on('pagecreate', function() {
      // Update the select menu's value to 'c' and refresh the control
      $('select').val('c').selectmenu('refresh');
    });
    &#60;/script&#62;
</code></pre>

<p>In the snippet above we have a simple select menu, and we are updating the value of the menu after the page has initialized. When jQuery Mobile enhances the page, the select menu
will be modified to make it more mobile friendly and consistent across devices. That means the simple select menu we are used to interacting with needs a little more work to update.
We can simply call <code>$('select').selectmenu('refresh')</code> to have our select menu update to its current value.
</p>
<p>
Other form inputs that require refreshing are the slider, the toggle switch, checkboxes, and radio buttons. To refresh the slider or the toggle switch, call <code>slider('refresh')</code>. To refresh
the checkbox or radio controls, call <code>checkboxradio('refresh')</code>.
</p>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
