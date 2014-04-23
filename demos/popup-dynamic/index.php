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
					closebtn = '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>',
					header = '<div data-role="header"><h2>' + brand + ' ' + model + '</h2></div>',
					img = '<img src="../_assets/img/' + short + '.jpg" alt="' + brand + '" class="photo">',
					popup = '<div data-role="popup" id="popup-' + short + '" data-short="' + short +'" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"></div>';

				// Create the popup.
				$( header )
					.appendTo( $( popup )
						.appendTo( $.mobile.activePage )
						.popup() )
					.toolbar()
					.before( closebtn )
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

	<div data-role="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

        <h1>Dynamic popup</h1>

        <div data-demo-html="#demo-page" data-demo-js="true">
            <p>This demo shows how you can dynamically create a popup. The popup contains images which means we have to set the image width and height to make sure the popup gets the right size and position. At client side we can only get the size when the image has been loaded in the DOM. In this demo we use the <code>load</code> event, but with a fallback because it has some caveats (see <a href="http://api.jquery.com/load-event/" rel="external">.load() - jQuery API</a>).</p>

            <p><a href="#demo-page" data-transition="fade" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-mini ui-icon-arrow-r ui-btn-icon-right">Open dynamic popup demo</a></p>
        </div><!--/demo-html -->

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2014 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

<div data-role="page" id="demo-page" data-title="Cars">

    <div data-role="header" data-theme="b">
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
