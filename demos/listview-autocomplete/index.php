<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Autocomplete - jQuery Mobile Demos</title>
	<link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../_assets/css/jqm-demos.css">
	<script src="../../external/jquery/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="toolbar" data-type="header" class="jqm-header">
		<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquerymobile-logo.png" alt="jQuery Mobile"></a></h2>
		<a href="#" class="jqm-navmenu-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-left">Menu<span class="ui-icon ui-icon-bars"></span></a>
		<a href="#" class="jqm-search-link ui-button ui-button-icon-only ui-corner-all ui-nodisc-icon ui-alt-icon ui-toolbar-header-button-right">Search<span class="ui-icon ui-icon-search"></span></a>
		<div class="jqm-banner"><h3>Version <span class="jqm-version"></span> Demos</h3></div>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Autocomplete</h1>

		<p>An autocomplete widget backed by either local or remote data can be created by using the <a href="../filterable/" data-ajax="false">Filterable widget</a> on a listview.</p>

		<h2>Remote data</h2>

		<p>To use the filter as an autocomplete that taps into remote data sources, you can use the <code>filterablebeforefilter</code> event to dynamically populate a listview as a user types a search query: <a href="../listview-autocomplete-remote/" data-ajax="false">Remote autocomplete demo</a></p>

		<h2>Local data</h2>

		<p>The filter reveal feature of the Filterable widget makes it easy to build a simple autocomplete with local data. When the Filterable widget is used on a list that has the <code>data-filter-reveal="true"</code> attribute, it will auto-hide all the list items when the search field is blank.</p>
		<p>Any filter with more than 100-200 items may be slow to perform on a mobile device so we recommend using this feature for  autocomplete situations with a relatively small number of items.</p>

			<h3>Full width listview (non-inset)</h3>

			<div data-demo-html="true">
				<form class="ui-filterable">
					<input id="autocomplete-input" data-type="search" placeholder="Search cars...">
				</form>
				<ul data-role="listview" data-filter="true" data-filter-reveal="true" data-input="#autocomplete-input">
					<li><a href="#">Acura</a></li>
					<li><a href="#">Audi</a></li>
					<li><a href="#">BMW</a></li>
					<li><a href="#">Cadillac</a></li>
					<li><a href="#">Chrysler</a></li>
					<li><a href="#">Dodge</a></li>
					<li><a href="#">Ferrari</a></li>
					<li><a href="#">Ford</a></li>
					<li><a href="#">GMC</a></li>
					<li><a href="#">Honda</a></li>
					<li><a href="#">Hyundai</a></li>
					<li><a href="#">Infiniti</a></li>
					<li><a href="#">Jeep</a></li>
					<li><a href="#">Kia</a></li>
					<li><a href="#">Lexus</a></li>
					<li><a href="#">Mini</a></li>
					<li><a href="#">Nissan</a></li>
					<li><a href="#">Porsche</a></li>
					<li><a href="#">Subaru</a></li>
					<li><a href="#">Toyota</a></li>
					<li><a href="#">Volkswagen</a></li>
					<li><a href="#">Volvo</a></li>
				</ul>
			</div><!--/demo-html -->

			<h3>Inset listiew</h3>
			<div data-demo-html="true">
				<form class="ui-filterable">
					<input id="inset-autocomplete-input" data-type="search" placeholder="Search cars...">
				</form>
				<ul data-role="listview" data-inset="true" data-filter="true" data-filter-reveal="true" data-input="#inset-autocomplete-input">
					<li><a href="#">Acura</a></li>
					<li><a href="#">Audi</a></li>
					<li><a href="#">BMW</a></li>
					<li><a href="#">Cadillac</a></li>
					<li><a href="#">Chrysler</a></li>
					<li><a href="#">Dodge</a></li>
					<li><a href="#">Ferrari</a></li>
					<li><a href="#">Ford</a></li>
					<li><a href="#">GMC</a></li>
					<li><a href="#">Honda</a></li>
					<li><a href="#">Hyundai</a></li>
					<li><a href="#">Infiniti</a></li>
					<li><a href="#">Jeep</a></li>
					<li><a href="#">Kia</a></li>
					<li><a href="#">Lexus</a></li>
					<li><a href="#">Mini</a></li>
					<li><a href="#">Nissan</a></li>
					<li><a href="#">Porsche</a></li>
					<li><a href="#">Subaru</a></li>
					<li><a href="#">Toyota</a></li>
					<li><a href="#">Volkswagen</a></li>
					<li><a href="#">Volvo</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Providing richer search content</h2>
		<p>By default, the filter simply searches against the contents of each list item. If you want the filter to search against different content, add the <code>data-filtertext</code>	attribute to the item and populate it with one or many keywords and phrases that should be used to match against. Note that if this attribute is added, the contents of the list item are ignored.</p>
		<p>This attribute is useful for dealing with allowing for ticker symbols and full company names to be searched, or for covering common spellings and abbreviations for countries.</p>

<pre><code>
&lt;li <strong>data-filtertext=&quot;NASDAQ:AAPL Apple Inc.</strong>&quot;&gt;&lt;a href=&quot;#&quot;&gt;Apple&lt;/a&gt;&lt;/li&gt;
&lt;li <strong>data-filtertext=&quot;USA U.S.A. United States of America&quot;</strong>&gt;&lt;a href=&quot;#&quot;&gt;United States&lt;/a&gt;&lt;/li&gt;
</code></pre>

			<div data-demo-html="true">
				<form class="ui-filterable">
					<input id="rich-autocomplete-input" data-type="search" placeholder="Search ticker or firm name...">
				</form>
				<ul data-role="listview" data-filter="true" data-inset="true" data-input="#rich-autocomplete-input">
					<li data-filtertext="NASDAQ:ADBE Adobe Systems Incorporated"><a href="#">Adobe</a></li>
					<li data-filtertext="NASDAQ:AMZNL Amazon.com, Inc."><a href="#">Amazon</a></li>
					<li data-filtertext="NASDAQ:AAPL Apple Inc."><a href="#">Apple</a></li>
					<li data-filtertext="NASDAQ:GOOG Google Inc."><a href="#">Google</a></li>
					<li data-filtertext="NYSE:IBM Intl. International Business Machines Corp."><a href="#">IBM</a></li>
					<li data-filtertext="NASDAQ:MSFT Microsoft Corporation"><a href="#">Microsoft</a></li>
					<li data-filtertext="NASDAQ:YHOO Yahoo! Inc."><a href="#">Yahoo</a></li>
					<li data-filtertext="USA U.S.A. United States of America"><a href="#">United States</a></li>
				</ul>
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
