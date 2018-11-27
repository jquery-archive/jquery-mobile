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
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<p><strong>Note: this page has not been updated after 1.3</strong></p>

		<h2>Question:</h2>

		<h1>Content injected into a page is not enhanced.</h1>

		<h2>Answer:</h2>

		<p>jQuery Mobile has no way to know when you have injected content into a page. To let jQuery Mobile know you have injected content that must be enhanced, you need to either make sure the plugins are called to enhance the new elements or <code>trigger("create")</code> on the parent container so you don't have to call each plugin manually.</p>

		<p>The page plugin dispatches a <code>pagecreate</code> event, which most widgets use to auto-initialize themselves. As long as a widget plugin script is referenced, it will automatically enhance any instances of the widgets it finds on the page.</p>
		<p>However, if you generate new markup client-side or load in content via Ajax and inject it into a page, you can trigger the <code>create</code> event to handle the auto-initialization for all the plugins contained within the new markup. This can be triggered on any element (even the page <code>div</code> itself), saving you the task of manually initializing each plugin (listview button, select, etc.).</p>

		<p>For example, if a block of HTML markup (say a login form) was loaded in through Ajax, trigger the <code>create</code> event to automatically transform all the widgets it contains inputs and buttons in this case) into the enhanced versions. The code for this scenario would be:</p>
<pre><code>$( ...new markup that contains widgets... ).appendTo( ".ui-page" ).enhanceWithin();</code></pre>

			<pre><code>
//HTML
&#60;form id="formid"&#62;
	&#60;input type="search" id="searchInput"/&#62;
	&#60;button id="submitButton"&#62;Submit&#60;/button&#62;
&#60;/form&#62;

// JavaScript **CORRECT**
$("#formid").trigger("create");

// JavaScript INCORRECT
$("#serchInput").trigger("create");
$("#submitButton").trigger("create");
			</code></pre>

		<h2>Create vs. refresh: An important distinction</h2>
		<p>Note that there is an important difference between the <code>create</code> event and <code>refresh</code> method that some widgets have. The <code>create</code> event is suited for enhancing <em>raw markup</em> that contains one or more widgets. The <code>refresh</code> method should be used on existing (already enhanced) widgets that have been manipulated programmatically and need the UI be updated to match.</p>

		<p>For example, if you had a page where you dynamically appended a new unordered list with <code>data-role=listview</code> attribute after page creation, triggering <code>create</code> on a parent element of that list would transform it into a listview styled widget. If more list items were then programmatically added, calling the listview&#8217;s <code>refresh</code> method would update just those new list items to the enhanced state and leave the existing list items untouched.</p>

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
