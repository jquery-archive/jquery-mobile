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
	<script src="../../js/jquery.js"></script>
	<script src="../_assets/js/"></script>
	<script src="../../js/"></script>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
			<h2><a href="../" title="jQuery Mobile Demos home"><img src="../_assets/img/jquery-logo.png" alt="jQuery Mobile"></a></h2>
		<p><span class="jqm-version"></span> Demos</p>
		<a href="#" class="jqm-navmenu-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-bars ui-nodisc-icon ui-alt-icon ui-btn-left">Menu</a>
		<a href="#" class="jqm-search-link ui-btn ui-btn-icon-notext ui-corner-all ui-icon-search ui-nodisc-icon ui-alt-icon ui-btn-right">Search</a>
	</div><!-- /header -->

	<div role="main" class="ui-content jqm-content">

		<h1>Autocomplete</h1>

		<p>An autocomplete widget backed by either local or remote data can be created by leveraging the filter feature.
			</p>

		<h2>Remote data</h2>

		<p>To use the filter as an autocomplete that taps into remote data sources, you can use the <code>filterablebeforefilter</code> event to dynamically populate a listview as a user types a search query: <a href="../listview-autocomplete-remote/" data-ajax="false">Remote autocomplete demo</a></p>

		<h2>Local data</h2>

		<p>The filter reveal feature makes it easy to build a simple autocomplete with local data. When a filterable list has the <code>data-filter-reveal="true"</code>, it will auto-hide all the list items when the search field is blank. The <code>data-filter-placeholder</code> attribute can be added to specify the placeholder text for the filter.</p>
		<p>Any filter with more than 100-200 items may be slow to perform on a mobile device so we recommend using this feature for  autocomplete situations with a relatively small number of items.</p>

			<h3>Full width listview (non-inset)</h3>

			<div data-demo-html="true">
				<ul data-role="listview" data-filter="true" data-filter-reveal="true" data-filter-placeholder="Search cars...">
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
				<ul data-role="listview" data-inset="true" data-filter="true" data-filter-reveal="true" data-filter-placeholder="Search cars...">
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

			<ul data-role="listview" data-filter="true" data-filter-placeholder="Search ticker or firm name..." data-inset="true">
				<li data-filtertext="NASDAQ:ADBE Adobe Systems Incorporated"><a href="#">Adobe</a></li>
				<li data-filtertext="NASDAQ:AMZNL Amazon.com, Inc."><a href="#">Amazon</a></li>
				<li data-filtertext="NASDAQ:AAPL Apple Inc."><a href="#">Apple</a></li>
				<li data-filtertext="NASDAQ:GOOG Google Inc."><a href="#">Google</a></li>
				<li data-filtertext="NYSE:IBM Intl. International Business Machines Corp."><a href="#">IBM</a></li>
				<li data-filtertext="NASDAQ:MSFT Microsoft Corporation"><a href="#">Microsoft</a></li>
				<li data-filtertext="NASDAQ:YHOO Yahoo! Inc."><a href="#">Yahoo</a></li>
				<li data-filtertext="USA U.S.A. United States of America"><a href="#">United States</a></li>
			</ul>

	</div><!-- /content -->

	<?php include( '../jqm-navmenu.php' ); ?>

	<div data-role="footer" data-position="fixed" data-tap-toggle="false" class="jqm-footer">
		<p>jQuery Mobile Demos version <span class="jqm-version"></span></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../jqm-search.php' ); ?>

</div><!-- /page -->

</body>
</html>
