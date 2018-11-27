<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Remote Autocomplete - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
    <script>
		$( document ).on( "pagecreate", "#myPage", function() {
			$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
				var $ul = $( this ),
					$input = $( data.input ),
					value = $input.val(),
					html = "";
				$ul.html( "" );
				if ( value && value.length > 2 ) {
					$ul.html( "<li><div class='ui-loader'><span class='ui-icon'></span></div><span class=\"ui-icon ui-icon-loading\"></span></li>" );
					$ul.listview( "refresh" );
					$.ajax({
						url: "http://gd.geobytes.com/AutoCompleteCity",
						dataType: "jsonp",
						crossDomain: true,
						data: {
							q: $input.val()
						}
					})
					.then( function ( response ) {
						$.each( response, function ( i, val ) {
							html += "<li>" + val + "</li>";
						});
						$ul.html( html );
						$ul.listview( "refresh" );
						$ul.trigger( "updatelayout");
					});
				}
			});
		});
    </script>
	<style>
		.ui-filter-inset {
			margin-top: 0;
		}
    </style>
</head>
<body>
<div data-role="page" class="jqm-demos" id="myPage">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Remote autocomplete</h1>

		<p>To create an autocomplete that uses a remote data source, you can use the <code>filterablebeforefilter</code> event of the Filterable widget to dynamically populate a listview as a user types a search query.</p>

		<p>This is useful when you have a very large data set like cities, zip codes, or products that can't be loaded up-front locally. Use the view source button to see the JavaScript that powers this demo.</p>
		<p>If you have a small list of items, you can use the filter reveal option to make an <a href="../listview-autocomplete/">autocomplete with local listview data</a>.</p>

			<div data-demo-html="true" data-demo-js="true" data-demo-css="true">
				<h3>Cities worldwide</h3>
            	<p>After you enter <strong>at least three characters</strong> the autocomplete function will show all possible matches.</p>
				<form class="ui-filterable">
					<input id="autocomplete-input" data-type="search" placeholder="Find a city...">
				</form>
				<ul id="autocomplete" data-role="listview" data-inset="true" data-filter="true" data-input="#autocomplete-input"></ul>
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

</body>
</html>
