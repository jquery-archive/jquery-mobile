<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dynamic popup - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
	<script>
		$( document ).on( "pagecreate", "#demo-page", function() {

			$( ".cars" ).on( "click", function() {
				var target = $( this ),
					brand = target.find( "h2" ).html(),
					model = target.find( "p" ).html(),
					short = target.attr( "id" ),
					closebutton = '<a href="#" data-rel="back" class="ui-button ui-corner-all ui-button-a ui-button-icon-only ui-toolbar-header-button-right">Close <span class="ui-icon ui-icon-delete"></span></a>',
					header = '<div data-role="toolbar" data-type="header"><h2>' + brand + ' ' + model + '</h2></div>',
					img = '<img src="../_assets/img/' + short + '.jpg" alt="' + brand + '" class="photo">',
					popup = '<div data-role="popup" id="popup-' + short + '" data-short="' + short +'" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"></div>';

				// Create the popup.
				$( header )
					.appendTo( $( popup )
						.appendTo( $.mobile.activePage )
						.popup() )
					.toolbar()
					.before( closebutton )
					.after( img );

				// Wait with opening the popup until the popup image has been loaded in the DOM.
				// This ensures the popup gets the correct size and position
				$( ".photo", "#popup-" + short ).load(function() {
					// Open the popup
					$( "#popup-" + short ).popup( "open" );

					// Clear the fallback
					clearTimeout( fallback );
				});

				// Fallback in case the browser doesn't fire a load event
				var fallback = setTimeout(function() {
					$( "#popup-" + short ).popup( "open" );
				}, 2000);
			});

			// Set a max-height to make large images shrink to fit the screen.
			$( document ).on( "popupbeforeposition", ".ui-popup", function() {
				var image = $( this ).children( "img" ),
					height = image.height(),
					width = image.width();

				// Set height and width attribute of the image
				$( this ).attr({ "height": height, "width": width });

				// 68px: 2 * 15px for top/bottom tolerance, 38px for the header.
				var maxHeight = $( window ).height() - 68 + "px";

				$( "img.photo", this ).css( "max-height", maxHeight );
			});

			// Remove the popup after it has been closed to manage DOM size
			$( document ).on( "popupafterclose", ".ui-popup", function() {
				$( this ).remove();
			});
		});
	</script>
    <style>
		/* Reduce the height of the header on smaller screens. */
		@media all and (max-width: 48em){
			.ui-popup .ui-title {
				font-size: .75em;
			}
		}
	</style>
</head>
<body>
<div data-role="page" id="demo-intro" class="jqm-demos">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Dynamic popup</h1>

        <div data-demo-html="#demo-page" data-demo-js="true">
            <p>This demo shows how you can dynamically create a popup. The popup contains images which means we have to set the image width and height to make sure the popup gets the right size and position. At client side we can only get the size when the image has been loaded in the DOM. In this demo we use the <code>load</code> event, but with a fallback because it has some caveats (see <a href="http://api.jquery.com/load-event/" rel="external">.load() - jQuery API</a>).</p>

            <p><a href="#demo-page" data-transition="fade" class="ui-button ui-corner-all ui-shadow ui-button-inline ui-mini">Open dynamic popup demo <span class="ui-icon ui-icon-arrow-r"></a></span></p>
        </div><!--/demo-html -->

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

<div data-role="page" id="demo-page" data-title="Cars">

    <div data-role="toolbar" data-type="header" data-theme="b">
        <a href="#demo-intro" data-rel="back" data-icon="arrow-l" data-iconpos="notext" data-shadow="false" data-icon-shadow="false">Back</a>
        <h1>Cars</h1>
    </div><!-- /header -->

    <div role="main" class="ui-content">

        <ul data-role="listview">
            <li><a href="#" class="cars" id="bmw"><img src="../_assets/img/bmw-thumb.jpg" alt="BMW"><h2>BMW</h2><p>5 series</p></a></li>
            <li><a href="#" class="cars" id="landrover"><img src="../_assets/img/landrover-thumb.jpg" alt="Land Rover"><h2>Land Rover</h2><p>Discovery 4</p></a></li>
            <li><a href="#" class="cars" id="tesla"><img src="../_assets/img/tesla-thumb.jpg" alt="Tesla"><h2>Tesla</h2><p>Model S</p></a></li>
        </ul>

    </div><!-- /content -->

</div><!-- /page -->

</body>
</html>
