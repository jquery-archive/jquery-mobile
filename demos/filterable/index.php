<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Filter - jQuery Mobile Demos</title>
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

		<h1>Filterable</h1>

		<a href="http://api.jquerymobile.com/filterable/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>
			The children of any element can be filtered by setting the attribute <code>data-filter="true"</code> on the element. By default, the text contained in each child is used for filtering, however, you also have the option of setting the attribute <code>data-filtertext</code> to a string value on any child that will be considered for filtering to associate custom filter text instead.</p>

		<h2>Basic filter</h2>
		<p>The filter widget is based on and replaces the listview filter extension. Thus, you can set <code>data-filter="true"</code> on a listview to generate a filter for its list items.</p>
		<p>Nevertheless, the way in which a filterable is constructed differs from the way the listview filter extension worked in one important regard: the text field for entering the search string is not provided. Instead, you can provide the text field in your markup and have the filterable make use of it by providing a selector that will retrieve the text field as the value of the filterable's <code>data-input</code> attribute. Add class <code>ui-filterable</code> to the <code>form</code> in which you wrap the search input or to the listview to have the framework adjust the margin between the text field and listview.</p>
		<p>The deprecated behavior whereby the filterable injects a text field before the element whose children are to be filtered is retained for version 1.4.0 to help with the transition from the listview filter extension, however, it will be removed in 1.5.0.</p>

			<div data-demo-html="true">
				<form class="ui-filterable">
					<input id="filterBasic-input" data-type="search">
				</form>
				<ul data-role="listview" data-filter="true" data-input="#filterBasic-input">
					<li>Acura</li>
					<li>Audi</li>
					<li>BMW</li>
					<li>Cadillac</li>
					<li>Ferrari</li>
				</ul>
			</div><!--/demo-html -->

		<h2>Table filter</h2>
		<p>
			You are not limited to using filters on listviews. To create a filter for a table widget, set
			<code>data-filter="true"</code> on the table element to generate a filter for table rows.
			</p>

			<div data-demo-html="true">
				<form>
					<input id="filterTable-input" data-type="search">
				</form>
				<table data-role="table" id="movie-table" data-filter="true" data-input="#filterTable-input" class="ui-responsive">
					<thead>
						<tr>
							<th data-priority="1">Rank</th>
							<th data-priority="persist">Movie Title</th>
							<th data-priority="2">Year</th>
							<th data-priority="3"><abbr title="Rotten Tomato Rating">Rating</abbr></th>
							<th data-priority="4">Reviews</th>
						</tr>
						</thead>
						<tbody>
							<tr>
								<th>1</th>
								<td><a href="https://en.wikipedia.org/wiki/Citizen_Kane" data-rel="external">Citizen Kane</a></td>
								<td>1941</td>
								<td>100%</td>
								<td>74</td>
							</tr>
							<tr>
								<th>2</th>
								<td><a href="https://en.wikipedia.org/wiki/Casablanca_(film)" data-rel="external">Casablanca</a></td>
								<td>1942</td>
								<td>97%</td>
								<td>64</td>
							</tr>
							<tr>
								<th>3</th>
								<td><a href="https://en.wikipedia.org/wiki/The_Godfather" data-rel="external">The Godfather</a></td>
								<td>1972</td>
								<td>97%</td>
								<td>87</td>
							</tr>
						</tbody>
					</table>
			</div><!--/demo-html -->

		<h2>Controlgroup Filter</h2>
		<p>The filter widget can be used on other widgets, too. To filter a list of controlgroup buttons, declare <code>data-filter="true"</code> on the element that creates the controlgroup (Note that you can also use the <code>data-filtertext</code> attribute to declare the text string used for filtering the respective element.
			</p>

			<div data-demo-html="true">
				<form>
					<input data-type="search" id="filterControlgroup-input">
				</form>
				<div data-role="controlgroup" data-filter="true" data-input="#filterControlgroup-input">
					<a href="#" class="ui-button ui-shadow ui-corner-all">Button 1</a>
					<a href="#" class="ui-button ui-shadow ui-corner-all">Button 2</a>
					<a href="#" class="ui-button ui-shadow ui-corner-all" data-filtertext="some text">Button 3</a>
					<a href="#" class="ui-button ui-shadow ui-corner-all">Button 4</a>
					<a href="#" class="ui-button ui-shadow ui-corner-all">Button 5</a>
				</div>
			</div>

		<h2>Filter Collapsible Set</h2>
		<div data-demo-html="true">
			<form>
				<input data-type="search" id="searchForCollapsibleSet">
			</form>
				<div data-role="collapsibleset" data-filter="true" data-inset="true" id="collapsiblesetForFilter" data-input="#searchForCollapsibleSet">
					<div data-role="collapsible" data-filtertext="Animals">
						<h3>Animals</h3>
						<ul data-role="listview" data-inset="false">
							<li>Cats</li>
							<li>Dogs</li>
							<li>Lizards</li>
							<li>Snakes</li>
						</ul>
					</div>
					<div data-role="collapsible" data-filtertext="Cars">
						<h3>Cars</h3>
						<ul data-role="listview" data-inset="false">
							<li>Acura</li>
							<li>Audi</li>
							<li>BMW</li>
							<li>Cadillac</li>
						</ul>
					</div>
					<div data-role="collapsible" data-filtertext="Planets">
						<h3>Planets</h3>
						<ul data-role="listview" data-inset="false">
							<li>Earth</li>
							<li>Jupiter</li>
							<li>Mars</li>
							<li>Mercury</li>
						</ul>
					</div>
				</div>
			</div><!--/demo-html -->
		<h2>Filter Collapsible Set and collapsible children</h2>
		<div data-demo-html="true">
			<form>
				<input data-type="search" id="searchForCollapsibleSetChildren">
			</form>
				<div data-role="collapsibleset" data-filter="true" data-children="&gt; div, &gt; div div ul li" data-inset="true" id="collapsiblesetForFilterChildren" data-input="#searchForCollapsibleSetChildren">
					<div data-role="collapsible" data-filtertext="Animals Cats Dogs Lizards snakes">
						<h3>Animals</h3>
						<ul data-role="listview" data-inset="false">
							<li data-filtertext="Animals Cats">Cats</li>
							<li data-filtertext="Animals Dogs">Dogs</li>
							<li data-filtertext="Animals Lizards">Lizards</li>
							<li data-filtertext="Animals Snakes">Snakes</li>
						</ul>
					</div>
					<div data-role="collapsible" data-filtertext="Cars Acura Audi BMW Cadillac">
						<h3>Cars</h3>
						<ul data-role="listview" data-inset="false">
							<li data-filtertext="Cars Acura">Acura</li>
							<li data-filtertext="Cars Audi">Audi</li>
							<li data-filtertext="Cars BMW">BMW</li>
							<li data-filtertext="Cars Cadillac">Cadillac</li>
						</ul>
					</div>
					<div data-role="collapsible" data-filtertext="Planets Earth Jupiter Mars Mercury">
						<h3>Planets</h3>
						<ul data-role="listview" data-inset="false">
							<li data-filtertext="Planets Acura">Earth</li>
							<li data-filtertext="Planets Jupiter">Jupiter</li>
							<li data-filtertext="Planets Mars">Mars</li>
							<li data-filtertext="Planets Mercury">Mercury</li>
						</ul>
					</div>
				</div>
			</div><!--/demo-html -->
		<h2>Filter Anything</h2>
		<p>The widget can be used for filtering on any element containing other elements, like a <code>div</code> containing <code>p</code> elements.
			</p>
			<div data-demo-html="true">
				<form>
					<input data-type="search" id="divOfPs-input">
				</form>
				<div class="elements" data-filter="true" data-input="#divOfPs-input">
				<p><strong>These</strong> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
				<p><strong>tags</strong> nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
				<p><strong>Tags</strong> erat, sed diam voluptua. At vero eos et accusam et justo duo dolores </p>
				<p><strong>are</strong> et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est</p>
				<p><strong>Filterable</strong> Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
				</div>
			</div>

		<h2>Filter Styling</h2>
		<p>
			The filter widget supports the same attributes as the previous listview extension. Use <code>data-filter-theme</code> to declare a specific theme for the text field (overriding inheritance). <code>data-filter-placeholder</code> allows you to customize the input's placeholder text. In addition, the filterable widget will synchronize options shared between the textinput widget and the widget whose children it filters to make sure that the value of the textinput widget options is the same as the value of the widget options. So, for example, if you set <code>data-inset="true"</code> on the listview, then the corresponding textinput widget will also be inset.</p>
		<p><strong>NOTE:</strong> This behavior is deprecated and will be removed in 1.5.0. The correct way forward is to provide the text field (or any other widget that emits the "change" signal) as part of the original markup and to pass a selector that will retrieve it to the filterable widget via the <code>data-input</code> attribute.
			</p>

			<div data-demo-html="true">
				<form>
					<input data-type="search" id="searchFilterStyling">
				</form>
				<ul data-role="listview" data-filter="true" data-input="#searchFilterStyling" data-filter-placeholder="Find cars..." data-filter-theme="a" data-inset="true">
					<li>Acura</li>
					<li>Audi</li>
					<li>BMW</li>
					<li>Cadillac</li>
					<li>Ferrari</li>
				</ul>
			</div><!--/demo-html -->

		<h2>Filter Reveal</h2>
		<p>
			The filter reveal feature makes it easy to build a simple autocomplete
			with local data. When a filter has the <code>data-filter-reveal="true"
			</code> attribute, it will auto-hide all the list items when the search
			field is blank. The <code>data-filter-placeholder</code> attribute can be
			added to specify the placeholder text for the filter. If you need to search
			against a long list of values, we provide a way to create a filter with a
			<a href="../listview-autocomplete-remote/" data-ajax="false">remote
			data source</a>.
			</p>

			<div data-demo-html="true">
				<form>
					<input data-type="search" id="searchFilterReveal">
				</form>
				<ul data-role="listview" data-filter="true" data-input="#searchFilterReveal" data-filter-reveal="true" data-filter-placeholder="Search fruits..." data-inset="true">
					<li><a href="#">Apple</a></li>
					<li><a href="#">Banana</a></li>
					<li><a href="#">Cherry</a></li>
					<li><a href="#">Cranberry</a></li>
					<li><a href="#">Grape</a></li>
					<li><a href="#">Orange</a></li>
				</ul>
			</div><!--/demo-html -->

		<h2>Filter Custom Callback</h2>
		<p>As with the listview extension, you can provide custom callback functions to the filter or override the filter altogether on the <code>filterablebeforefilter</code> event. Please note that the filter has a <strong>delay of 250ms</strong> before the filter actually triggers. This prevents running the filtering function multiple times while the user is typing.
			</p>

		<p>To set a custom filtering function that will become the new default for all filterable widgets, override the <code>filterCallback</code> option in the filterable widget prototype in a "mobileinit" signal handler:</p>

<pre><code>$( document ).one( "mobileinit", function() {
	$.mobile.filterable.prototype.options.filterCallback = function( index, searchValue ) {
		// In this function the keyword "this" refers to the element for which the
		// code must decide whether it is to be filtered or not.
		// A return value of true indicates that the element referred to by the
		// keyword "this" is to be filtered.
		// Returning false indicates that the item is to be displayed.
		//
		// your custom filtering logic goes here
	});
});</code></pre>

		<p>
			To set a custom filtering function for a single filterable widget, set the <code>filterCallback</code> option:
			</p>

<pre><code>$.mobile.document.one( "filterablecreate", "#myFilterable", function() {
	$( "#myFilterable" ).filterable( "option", "filterCallback", function( index, searchValue ) {
		// The previous example explains the signature of the callback function.
		//
		// your custom filtering logic goes here.
	});
});</code></pre>

		<p>
			To override the filter altogether (for example when loading data server-side
			or from localStorage), bind to the <code>filterablebeforefilter</code> event.
			</p>

<pre><code>$( ".selector" ).on( "filterablebeforefilter", function( e, data ) {
		var value;

		e.preventDefault();
		value = data.input.value;
		// trigger own request to database
	});
});</code></pre>

	<h2>Pre-rendering</h2>
	<p>The filterable widget runs the filter a single time during startup to make sure the list of children reflects the value entered in the search input. You can avoid this step by specifying the <code>data-enhanced="true"</code> attribute. When set to true, the filterable will assume that you have correctly applied the class <code>ui-screen-hidden</code> to those children that should be initially hidden.
	</p>
	<p>The filterable widget is able to use the search input whether or not the search input is itself pre-rendered. In the example below, both the search input and the filterable are pre-rendered.</p>
	<div data-demo-html="true">
		<form>
			<div class="ui-textinput-search ui-body-inherit ui-corner-all ui-shadow-inset ui-textinput-has-clear-button">
				<input data-type="search" data-enhanced="true" data-inset="false" id="pre-rendered-example-input" placeholder="Filter items..." value="au">
			</div>
			<div data-role="controlgroup" data-enhanced="true" data-filter="true" data-filter-reveal="true" data-input="#pre-rendered-example-input" class="ui-controlgroup ui-controlgroup-vertical ui-corner-all">
				<div class="ui-controlgroup-controls">
					<a href="#" class="ui-button ui-corner-all ui-shadow ui-shadow ui-screen-hidden">Acura</a>
					<a href="#" class="ui-button ui-corner-all ui-shadow ui-first-child ui-shadow ui-last-child">Renault</a>
					<a href="#" class="ui-button ui-corner-all ui-shadow ui-shadow ui-screen-hidden">Hyundai</a>
				</div>
			</div>
		</form>
	</div>

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
