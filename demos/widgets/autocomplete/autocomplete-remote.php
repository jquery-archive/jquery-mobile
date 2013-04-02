<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Remote Autocomplete - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
    <script>
		$( document ).on( "pageinit", "#myPage", function() {
			$( "#autocomplete" ).on( "listviewbeforefilter", function ( e, data ) {
				var $ul = $( this ),
					$input = $( data.input ),
					value = $input.val(),
					html = "";
				$ul.html( "" );
				if ( value && value.length > 2 ) {
					$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
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
		.ui-listview-filter-inset {
			margin-top: 0;
		}
    </style>
</head>
<body>
<div data-role="page" class="jqm-demos" id="myPage">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

  			<h1>Remote autocomplete</h1>

  			<p class="jqm-intro">To use the listview filter as an autocomplete that taps into remote data sources, you can use the <code>listviewbeforefilter</code> event to dynamically populate a listview as a user types a search query.</p>

			 <p>This is useful when you have a very large data set like cities, zip codes, or products that can't be loaded up-front locally. Use the view source button to see the JavaScript that powers this demo.</p>
			<p>If you have a small list of items, you can use the <a href="../listviews/">listview</a> filter reveal option to make an autocomplete with local listview data.</p>

			<div data-demo-html="true" data-demo-js="true" data-demo-css="true">
				<h3>Cities worldwide</h3>
            	<p>After you enter <strong>at least three characters</strong> the autocomplete function will show all possible matches.</p>
				<ul id="autocomplete" data-role="listview" data-inset="true" data-filter="true" data-filter-placeholder="Find a city..." data-filter-theme="d"></ul>
			</div><!--/demo-html -->

            <a href="index.php" class="jqm-button" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-l" data-iconpos="left">Back to autocomplete</a>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
