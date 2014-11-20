<!doctype HTML>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Grunticon Loader - jQuery Mobile Demos</title>
		<link rel="shortcut icon" href="../favicon.ico">
		<script id="grunticon-loader">
			/* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
			// Selects the correct stylesheet based on feature detects
			window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!(!t.document.createElementNS||!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||window.opera&&-1===navigator.userAgent.indexOf("Chrome")),o=function(o){var r=t.document.createElement("link"),a=t.document.getElementsByTagName("script")[0];r.rel="stylesheet",r.href=e[o&&n?0:o?1:2],a.parentNode.insertBefore(r,a)},r=new t.Image;r.onerror=function(){o(!1)},r.onload=function(){o(1===r.width&&1===r.height)},r.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};

			// Point to style sheet locations
			grunticon( [ "../../css/themes/default/jquery.mobile.inline-svg.css", "../../css/themes/default/jquery.mobile.inline-png.css", "../../css/themes/default/jquery.mobile.external-png.css" ] );
		</script>
		<!-- Fall back style sheet incase javascript is turned off -->
		<noscript id="grunticon-fallback"><link href="../../css/themes/default/jquery.mobile.fallback.css" rel="stylesheet"></noscript>
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
		<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
		<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
		<script src="../../external/jquery/jquery.js"></script>
		<script src="../_assets/js/"></script>
		<script src="../../js/"></script>
		<script>
			$( document ).on( "pagecreate", function() {
				$( "#settings input" ).on( "change", function( event ) {
					if ( event.target.id === "opt-mini" ) {
						if ( $( "#opt-mini" ).prop( "checked" ) ) {
							$( "#test" ).addClass( "ui-mini" );
						} else {
							$( "#test" ).removeClass( "ui-mini" );
						}
					}
					if ( event.target.id === "opt-inline" ) {
						if ( $( "#opt-inline" ).prop( "checked" ) ) {
							$( "#test button" ).addClass( "ui-button-inline" );
						} else {
							$( "#test button" ).removeClass( "ui-button-inline" );
						}
					}
					if ( event.target.id === "opt-notext" ) {
						if ( $( "#opt-notext" ).prop( "checked" ) ) {
							$( "#test button" ).addClass( "ui-button-icon-only" ).removeClass( "ui-icon-beginning" );
						} else {
							$( "#test button" ).removeClass( "ui-button-icon-only" ).addClass( "ui-icon-beginning" );
						}
					}
					if ( event.target.id === "opt-alt" ) {
						if ( $( "#opt-alt" ).prop( "checked" ) ) {
							$( "#test" ).addClass( "ui-alt-icon" );
						} else {
							$( "#test" ).removeClass( "ui-alt-icon" );
						}
					}
					if ( event.target.id === "opt-nodisc" ) {
						if ( $( "#opt-nodisc" ).prop( "checked" ) ) {
							$( "#test" ).addClass( "ui-nodisc-icon" );
						} else {
							$( "#test" ).removeClass( "ui-nodisc-icon" );
						}
					}
					if ( event.target.id === "opt-iconshadow" ) {
						if ( $( "#opt-iconshadow" ).prop( "checked" ) ) {
							$( "#test" ).addClass( "ui-shadow-icon" );
						} else {
							$( "#test" ).removeClass( "ui-shadow-icon" );
						}
					}
					if ( event.target.name === "theme" ) {
						var themeClass = $( "#theme-setting input:checked" ).attr( "id" );

						$( "#test" ).removeClass( "ui-page-theme-a ui-page-theme-b" ).addClass( themeClass );
					}
				});
				var eye,
					stylesheet = $( "head" ).find( "link" ).eq( "1" ).attr( "href" ),
					svg = /svg/.test( "svg" ),
					external = /external/.test( stylesheet ),
					using = ( ( external ? "External " : "Inline " ) + ( svg ? "SVGs " : "PNGs" ) );

				$( "#grunticon-stylesheet" ).text( stylesheet );

				$( "<span>&nbsp;</span>" ).css({
					"width": "200px",
					"height": "200px",
					"display": "block",
					"background-size": "200px 200px",
					"background-image": svg ? "url('data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20%20width%3D%2214px%22%20height%3D%2210px%22%20viewBox%3D%220%200%2014%2010%22%20style%3D%22enable-background%3Anew%200%200%2014%2010%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M7%2C0C3%2C0%2C0%2C5%2C0%2C5s3%2C5%2C7%2C5s7-5%2C7-5S11%2C0%2C7%2C0z%20M7%2C8C5.343%2C8%2C4%2C6.657%2C4%2C5s1.343-3%2C3-3s3%2C1.343%2C3%2C3S8.657%2C8%2C7%2C8z%20M7%2C4%20C6.448%2C4%2C6%2C4.447%2C6%2C5s0.448%2C1%2C1%2C1s1-0.447%2C1-1S7.552%2C4%2C7%2C4z%22%2F%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3Cg%3E%3C%2Fg%3E%3C%2Fsvg%3E')" : "url(../../css/themes/default/images/icons-png/eye-white.png)",
					"background-color":  "rgba(0,0,0,.3)"
				})
				.insertAfter("#grunticon-icon-type");

				if ( !svg ) {
					$( "#grunticon-icon-type" ).after( "<p>Pixels make me sad :(</p>" );
				} else {
					$( "#grunticon-icon-type" ).after( "<p>Woo! Vector graphics!</p>" );
				}

				$( "#grunticon-icon-type" ).text( using );
			});
		</script>
	</head>
	<body>
		<div data-role="page" class="jqm-demos" data-quicklinks="true">
			<div data-role="header" class="jqm-header">
				<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
				<p><span class="jqm-version"></span> Demos</p>
				<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
				<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
			</div><!-- /header -->

			<div role="main" class="ui-content jqm-content">
				<h1>Grunticon</h1>

				<p>Grunticon is a grunt plugin built by the Filament Group which takes SVG files and creates style sheets and PNG icons for use in your webpage. See <a href="https://github.com/filamentgroup/grunticon">https://github.com/filamentgroup/grunticon</a>.</p>
				<h2>Grunticon Loader Script</h2>
				<span data-demo-html="#grunticon-fallback" data-demo-js="#grunticon-loader"></span>

				<p>jQuery Mobile uses grunticon to generate SVG icons with PNG fallbacks and the style sheets for these. By default the library uses inline SVGs but falls back to individual PNGs if inline SVG is not supported.</p>

				<p>However, you can further optimize for a wider variety of devices by using a loader script for selecting the approriate style sheet. This reduces data transfer and the length of the style sheet.</p>

				<p>To use the grunticon loader place the script in the "View Source" button below in the head of your page before all other stylesheets or scripts. In the script you will see a call to the grunticon function at the bottom which is being passed an array of three stylesheet URLs. You will want to change this to match your setup or to point at the corresponding style sheets on the CDN.</p>

				<span data-demo-js="#grunticon-loader"></span>

				<p>After this script you will want to place a fallback style sheet in a noscript tag, in case JavaScript is disabled. Link in the "View Source" button below:</p>

				<span data-demo-html="#grunticon-fallback"></span>

				<h2>So what style sheet was loaded?</h2>
				<p>Based on your browser's abilities the style sheet loaded was:</p>
				<h3 id="grunticon-stylesheet"></h3>
				<p> Which means you are seeing</p>
				<h3 id="grunticon-icon-type"></h3>

				<h2>Grunticon Icons</h2>
				<p> All the icons in the buttons below were loaded using the grunticon loader script. Use the toggle buttons to try all different options for icon style.</p>
				<form id="settings" class="ui-mini">
					<div class="ui-field-contain">
						<fieldset data-role="controlgroup" data-type="horizontal" id="theme-setting">
							<legend>Theme:</legend>
							<label for="ui-page-theme-a">A</label>
							<input type="radio" name="theme" id="ui-page-theme-a" checked>
							<label for="ui-page-theme-b">B</label>
							<input type="radio" name="theme" id="ui-page-theme-b">
						</fieldset>
					</div>
					<div class="ui-field-contain">
						<fieldset data-role="controlgroup" data-type="horizontal">
							<legend>Style:</legend>
							<label for="opt-mini">Mini</label>
							<input type="checkbox" name="opt-mini" id="opt-mini">
							<label for="opt-inline">Inline</label>
							<input type="checkbox" name="opt-inline" id="opt-inline">
							<label for="opt-notext">Icon-only</label>
							<input type="checkbox" name="opt-notext" id="opt-notext">
							<label for="opt-alt">Alt (black)</label>
							<input type="checkbox" name="opt-alt" id="opt-alt">
							<label for="opt-nodisc">No disc</label>
							<input type="checkbox" name="opt-nodisc" id="opt-nodisc">
							<label for="opt-iconshadow">Icon shadow</label>
							<input type="checkbox" name="opt-iconshadow" id="opt-iconshadow">
						</fieldset>
					</div>
				</form>

				<div id="test" class="ui-page-theme-a ui-content">
					<form>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">action<span class="ui-icon ui-icon-action"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">alert<span class="ui-icon ui-icon-alert"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-d<span class="ui-icon ui-icon-arrow-d"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-d-l<span class="ui-icon ui-icon-arrow-d-l"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-d-r<span class="ui-icon ui-icon-arrow-d-r"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-l<span class="ui-icon ui-icon-arrow-l"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-r<span class="ui-icon ui-icon-arrow-r"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-u<span class="ui-icon ui-icon-arrow-u"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-u-l<span class="ui-icon ui-icon-arrow-u-l"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">arrow-u-r<span class="ui-icon ui-icon-arrow-u-r"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">audio<span class="ui-icon ui-icon-audio"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">back<span class="ui-icon ui-icon-back"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">bars<span class="ui-icon ui-icon-bars"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">bullets<span class="ui-icon ui-icon-bullets"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">calendar<span class="ui-icon ui-icon-calendar"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">camera<span class="ui-icon ui-icon-camera"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">caret-d<span class="ui-icon ui-icon-caret-d"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">caret-l<span class="ui-icon ui-icon-caret-l"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">caret-r<span class="ui-icon ui-icon-caret-r"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">caret-u<span class="ui-icon ui-icon-caret-u"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">check<span class="ui-icon ui-icon-check"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">clock<span class="ui-icon ui-icon-clock"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">cloud<span class="ui-icon ui-icon-cloud"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">comment<span class="ui-icon ui-icon-comment"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">delete<span class="ui-icon ui-icon-delete"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">edit<span class="ui-icon ui-icon-edit"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">eye<span class="ui-icon ui-icon-eye"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">forbidden<span class="ui-icon ui-icon-forbidden"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">forward<span class="ui-icon ui-icon-forward"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">gear<span class="ui-icon ui-icon-gear"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">grid<span class="ui-icon ui-icon-grid"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">heart<span class="ui-icon ui-icon-heart"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">home<span class="ui-icon ui-icon-home"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">info<span class="ui-icon ui-icon-info"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">location<span class="ui-icon ui-icon-location"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">lock<span class="ui-icon ui-icon-lock"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">mail<span class="ui-icon ui-icon-mail"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">minus<span class="ui-icon ui-icon-minus"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">navigation<span class="ui-icon ui-icon-navigation"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">phone<span class="ui-icon ui-icon-phone"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">plus<span class="ui-icon ui-icon-plus"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">power<span class="ui-icon ui-icon-power"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">recycle<span class="ui-icon ui-icon-recycle"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">refresh<span class="ui-icon ui-icon-refresh"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">search<span class="ui-icon ui-icon-search"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">shop<span class="ui-icon ui-icon-shop"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">star<span class="ui-icon ui-icon-star"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">tag<span class="ui-icon ui-icon-tag"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">user<span class="ui-icon ui-icon-user"></span></button>
						<button class="ui-button ui-shadow ui-corner-all ui-icon-beginning">video<span class="ui-icon ui-icon-video"></span></button>
					</form>
				</div>

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
