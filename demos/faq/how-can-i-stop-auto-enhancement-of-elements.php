<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Q&A - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-faq">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
		<?php include( '../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
			<h2>Question:</h2>

			<h1>How can I stop JQM from auto-enhancing an element?</h1>

			<h2>Answer:</h2>

			<p class="jqm-intro">To prevent jQuery Mobile form enhancing an element simply add <code>data-role="none"</code> to the element. Here is a select that is the normal, native element instead of the custom jQuery Mobile styled version that normally is seen:</p>

            <div data-demo-html="true">
				<form>
                <div data-role="fieldcontain">
                    <label for="select-native-x">Native select: </label>
                    <select name="select-native-x" id="select-native-x" data-role="none">
                        <option value="1">The 1st Option</option>
                        <option value="2">The 2nd Option</option>
                        <option value="3">The 3rd Option</option>
                        <option value="4">The 4th Option</option>
                    </select>
                </div>
				</form>
            </div><!--/demo-html -->

			<a href="index.php" class="jqm-button" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-l" data-iconpos="left">All Questions &amp; Answers</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
