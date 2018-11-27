<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup alignment - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
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
	position: relative;
	left: 50%;
	width: 6em;
	margin-left: -3em;
	background-color: #ffa0a0;
	border-color: black;
}
	</style>
</head>
<body>
<div data-role="page" id="demo-intro" class="jqm-demos">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">
		<div data-demo-html="true" data-demo-js="#extension" data-demo-css="#alignment-example-style">
			<div data-role="popup" id="alignment-example" class="ui-content">
				<form data-role="fieldset">
					<div class="ui-field-contain">
						<label for="xalign">X Alignment</label>
						<input type="range" id="xalign" name="xalign" value="0.5" min="-1" max="2" step="0.5">
					</div>
					<div class="ui-field-contain">
						<label for="yalign">Y Alignment</label>
						<input type="range" id="yalign" name="yalign" value="0.5" min="-1" max="2" step="0.5">
					</div>
				</form>
			</div>
		</div>
		<a href="#alignment-example" id="open-alignment-example" data-rel="popup" role="button" class="ui-button ui-corner-all ui-shadow ui-button-inline">Open Popup</a>
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
