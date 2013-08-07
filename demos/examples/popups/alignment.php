<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup alignment - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<script id="extension" src="popup.alignment.js"></script>
	<script id="glue">
( function( $, undefined ) {

$.mobile.document.on( "slidestop", function() {

	setTimeout( function() {
		$( "#alignment-example" ).popup( "option", "align",
			$( "#xalign" ).val() + "," + $( "#yalign" ).val() );
	}, 250 );

});

})( jQuery );
	</script>
	<style id="alignment-example-style">
#alignment-example {
	min-width: 200px;
	opacity: 0.8;
}
#open-alignment-example {
	position: absolute;
	width: 3em;
	min-width: 3em;
	max-width: 3em;
	height: 1.2em;
	min-height: 1.2em;
	max-height: 1.2em;
	margin-left: -1.5em;
	margin-top: -0.6em;
	left: 50%;
	top: 50%;
	background-color: #ffa0a0;
	border-color: black;
}
	</style>
</head>
<body>
<div data-role="page" id="demo-intro" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
		<div data-demo-html="true" data-demo-js="#extension" data-demo-css="#alignment-example-style">
			<div data-role="popup" id="alignment-example" class="ui-content">
				<form data-role="fieldset">
					<div data-role="fieldcontain">
						<label for="xalign">X Alignment</label>
						<input type="range" id="xalign" name="xalign" value="0.5" min="-1" max="2" step="0.5"></input>
					</div>
					<div data-role="fieldcontain">
						<label for="yalign">Y Alignment</label>
						<input type="range" id="yalign" name="yalign" value="0.5" min="-1" max="2" step="0.5"></input>
					</div>
				</form>
			</div>
		</div>
	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /jqm-footer -->

<?php include( '../../global-nav.php' ); ?>

	<a href="#alignment-example" id="open-alignment-example" data-rel="popup" data-role="button" data-inline="true">Open</a>
</div><!-- /page -->
</body>
</html>
