<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Popup arrow size - jQuery Mobile Demos</title>
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>

( function( $, undefined ) {

var sqrt2 = Math.sqrt( 2 ),
	timeoutId = 0;

function arrowCSS( size ) {
	return "" +
		".ui-popup-arrow-container {\n" +
		"	width: " + ( 2 * size ) + "px;\n" +
		"	height: " + ( 2 * size ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-l {\n" +
		"	left: -" + size + "px;\n" +
		"	clip: rect(-1000px," + size + "px,2000px,-1000px);\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-t {\n" +
		"	top: -" + size + "px;\n" +
		"	clip: rect(-1000px,2000px," + size + "px,-1000px);\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-r {\n" +
		"	right: -" + size + "px;\n" +
		"	clip: rect(-1000px,2000px,2000px," + size + "px);\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-b {\n" +
		"	bottom: -" + size + "px;\n" +
		"	clip: rect(" + size + "px,2000px,1000px,-1000px);\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container .ui-popup-arrow {\n" +
		"	width: " + ( 2 * size * sqrt2 ) + "px;\n" +
		"	height: " + ( 2 * size * sqrt2 ) + "px;\n" +
		"	border-width: 1px;\n" +
		"	border-style: solid;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-t .ui-popup-arrow {\n" +
		"	left: " + ( ( 1 - sqrt2 ) * size ) + "px;\n" +
		"	top: " + ( ( 2 - sqrt2 ) * size ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-b .ui-popup-arrow {\n" +
		"	left: " + ( ( 1 - sqrt2 ) * size ) + "px;\n" +
		"	top: -" + ( size * sqrt2 ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-l .ui-popup-arrow {\n" +
		"	left: " + ( ( 2 - sqrt2 ) * size ) + "px;\n" +
		"	top: " + ( ( 1 - sqrt2 ) * size ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-r .ui-popup-arrow {\n" +
		"	left: -" + ( size * sqrt2 ) + "px;\n" +
		"	top: " + ( ( 1 - sqrt2 ) * size ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-t.ie .ui-popup-arrow {\n" +
		"	margin-left: -" + ( ( 2 - sqrt2 ) * size ) + "px;\n" +
		"	margin-top: " + ( ( sqrt2 / 2 - sqrt2 ) * size ) + "px;\n" +
		"}\n" +
		".ui-popup-arrow-container.ui-popup-arrow-b.ie .ui-popup-arrow {\n" +
		"	margin-left: -" + ( ( 2 - sqrt2 ) * size ) + "px;\n" +
		"	margin-top: " + ( ( 1 - sqrt2 ) * size ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-l.ie .ui-popup-arrow {\n" +
		"	margin-left: " + ( ( sqrt2 / 2 - sqrt2 ) * size ) + "px;\n" +
		"	margin-top: -" + ( ( 2 - sqrt2 ) * size ) + "px;\n" +
		"}\n" +
		".ui-popup-arrow-container.ui-popup-arrow-r.ie .ui-popup-arrow {\n" +
		"	margin-left: " + ( ( 1 - sqrt2 ) * size ) + "px;\n" +
		"	margin-top: -" + ( ( 2 - sqrt2 ) * size ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-background {\n" +
		"	width: " + ( 2 * size ) + "px;\n" +
		"	height: " + ( 2 * size ) + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-t .ui-popup-arrow-background,\n" +
		".ui-popup-arrow-container.ui-popup-arrow-b .ui-popup-arrow-background {\n" +
		"	background-position: 0 " + size + "px;\n" +
		"}\n" +
		"\n" +
		".ui-popup-arrow-container.ui-popup-arrow-l .ui-popup-arrow-background,\n" +
		".ui-popup-arrow-container.ui-popup-arrow-r .ui-popup-arrow-background {\n" +
		"	background-position: " + size + "px 0;\n" +
		"}";
}

function updateArrowSize() {
	var size = $( "#arrowSize" ).val(),
		css = arrowCSS( size ),
		pre = $( "<pre class='brush: css'>" + css + "</pre>" );

	$( "#arrowCSS" ).empty().append( pre );
	SyntaxHighlighter.highlight( {}, pre[ 0 ] );
	timeoutId = 0;
	if ( $.mobile.browser.oldIE && $.mobile.browser.oldIE <= 8 ) {
		$( "#arrowStyle" )[ 0 ].styleSheet.cssText = css;
	} else {
		$( "#arrowStyle" ).text( css );
	}
	$( "#exampleArrow-l,#exampleArrow-r" ).css( "margin-top", -size );
	$( "#exampleArrow-t,#exampleArrow-b" ).css( "margin-left", -size );
}

$.mobile.document
	.on( "change", "#arrowSize", function( e ) {
		if ( timeoutId ) {
			clearTimeout( timeoutId );
		}
		timeoutId = setTimeout( updateArrowSize, 250 );
	})
	.on( "pagecreate", "#arrow-size-demo", function() {
		updateArrowSize();
		if ( $.mobile.browser.oldIE && $.mobile.browser.oldIE <= 8 ) {
			$( "#exampleArrow-l,#exampleArrow-r,#exampleArrow-t,#exampleArrow-b" ).addClass( "ie" );
		}
	});

})( jQuery );

	</script>
	<style>
	</style>
	<style id="arrowStyle">
	</style>
	<style>
.ui-popup-arrow-container.ui-popup-arrow-l,
.ui-popup-arrow-container.ui-popup-arrow-r {
	top: 50%;
}
.ui-popup-arrow-container.ui-popup-arrow-t,
.ui-popup-arrow-container.ui-popup-arrow-b {
	left: 50%;
}
	</style>
</head>
<body>
<div data-role="page" id="arrow-size-demo" class="jqm-demos">

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">
		<h1>Popup arrow size</h1>
		<p>The size of the popup arrow can be adjusted via custom CSS. Drag the slider below and copy/paste the resulting CSS into your project. Make sure you paste it after the jQuery Mobile structure/theme CSS.</p>
		<div style="padding: 100px;">
			<div style="position: static;" class="ui-popup-container ui-popup-active">
				<div class="ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all">
				<p>This is what a popup would look like.</p>
				<p>It contains multiple paragraphs.</p>
				<p>Note that large arrows may not be displayed at all.</p>
				<p>This is because their sides would "stick out" of the popup.</p>
				<p>The arrow placement code prevents this.</p>
					<div id="exampleArrow-l" class="ui-popup-arrow-container ui-popup-arrow-l">
						<div class="ui-popup-arrow ui-body-inherit ui-overlay-shadow"></div>
					</div>
					<div id="exampleArrow-r" class="ui-popup-arrow-container ui-popup-arrow-r">
						<div class="ui-popup-arrow ui-body-inherit ui-overlay-shadow"></div>
					</div>
					<div id="exampleArrow-t" class="ui-popup-arrow-container ui-popup-arrow-t">
						<div class="ui-popup-arrow ui-body-inherit ui-overlay-shadow"></div>
					</div>
					<div id="exampleArrow-b" class="ui-popup-arrow-container ui-popup-arrow-b">
						<div class="ui-popup-arrow ui-body-inherit ui-overlay-shadow"></div>
					</div>
				</div>
			</div>
		</div>
		<form id="arrowSizeForm">
			<input type="range" id="arrowSize" min="5" value="10" max="90" step="1">
			<div class="ui-body-b ui-corner-all" id="arrowCSS"></div>
		</form>
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
