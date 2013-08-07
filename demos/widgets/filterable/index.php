<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Filter - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
	<style id="custom-icon">
		.ui-btn.ui-icon-custom:after {
			background-image: url("../../_assets/img/glyphish-icons/21-skull.png");
			background-position: 3px 3px;
			background-size: 70%;
		}
    </style>
</head>
<body>
<div data-role="page" class="jqm-demos" data-quicklinks="true">

	<div data-role="header" class="jqm-header">
		<h1 class="jqm-logo"><a href="../../"><img src="../../_assets/img/jquery-logo.png" alt="jQuery Mobile Framework"></a></h1>
		<a href="#" class="jqm-navmenu-link" data-icon="bars" data-iconpos="notext">Navigation</a>
		<a href="#" class="jqm-search-link" data-icon="search" data-iconpos="notext">Search</a>
        <?php include( '../../search.php' ); ?>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			<h1>Filter <a href="http://api.jquerymobile.com/filterable/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">
			The children of any element can be filtered by setting the attribute <code>data-filter="true"</code> on the element. By default, the text contained in each child is used for filtering, however, you also have the option of setting the attribute <code>data-filtertext</code> to a string value on any child that will be considered for filtering to associate custom filter text instead.</p>

			<h2 id="filter-ul">Basic filter</h2>
			<p>The filter widget is based on and replaces the listview filter extension. Thus, you can set <code>data-filter="true"</code> on a listview to generate a filter for its list items.</p>
			<p>Nevertheless, the way in which a filterable is constructed differs from the way the listview filter extension worked in one important regard: the text field for entering the search string is not provided. Instead, you can provide the text field in your markup and have the filterable make use of it by providing a selector that will retrieve the text field as the value of the filterable's <code>data-input</code> attribute.</p>
			<p>The deprecated behavior whereby the filterable injects a text field before the element whose children are to be filtered is retained for version 1.4.0 to help with the transition from the listview filter extension, however, it will be removed in 1.5.0.</p>

			<div data-demo-html="true">
				<form>
					<input id="filterBasic-input" data-inset="false" data-type="search"></input>
				</form>
				<ul data-role="listview" data-filter="true" data-input="#filterBasic-input">
					<li>Acura</li>
					<li>Audi</li>
					<li>BMW</li>
					<li>Cadillac</li>
					<li>Ferrari</li>
				</ul>
			</div><!--/demo-html -->

			<h2 id="filter-table">Table filter</h2>
			<p>
			You are not limited to using filters on listviews. To create a filter for a table widget, set
			<code>data-filter="true"</code> on the table element to generate a filter for table rows.
			</p>

			<div data-demo-html="true">
				<form>
					<input id="filterTable-input" data-inset="false" data-type="search"></input>
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
								<td><a href="http://en.wikipedia.org/wiki/Citizen_Kane" data-rel="external">Citizen Kane</a></td>
								<td>1941</td>
								<td>100%</td>
								<td>74</td>
							</tr>
							<tr>
								<th>2</th>
								<td><a href="http://en.wikipedia.org/wiki/Casablanca_(film)" data-rel="external">Casablanca</a></td>
								<td>1942</td>
								<td>97%</td>
								<td>64</td>
							</tr>
							<tr>
								<th>3</th>
								<td><a href="http://en.wikipedia.org/wiki/The_Godfather" data-rel="external">The Godfather</a></td>
								<td>1972</td>
								<td>97%</td>
								<td>87</td>
							</tr>
						</tbody>
					</table>
			</div><!--/demo-html -->

			<h2 id="filter-controlgroup">Controlgroup Filter</h2>
			<p>The filter widget can be used on other widgets, too. To filter a list of controlgroup buttons, declare <code>data-filter="true"</code> on the element that creates the controlgroup (Note that you can also use the <code>data-filtertext</code> attribute to declare the text string used for filtering the respective element.
			</p>

			<div data-demo-html="true">
				<form>
					<input data-type="search" data-inset="false" id="filterControlgroup-input"></input>
				</form>
				<div data-role="controlgroup" data-filter="true" data-input="#filterControlgroup-input">
					<a href="#" data-role="button">Button 1</a>
					<a href="#" data-role="button">Button 2</a>
					<a href="#" data-role="button" data-filtertext="some text">Button 3</a>
					<a href="#" data-role="button">Button 4</a>
					<a href="#" data-role="button">Button 5</a>
				</div>
			</div>

			<h2 id="filter-select">Filter Select</h2>
			<p>The widget also works on <code>select</code> widgets by hiding options that do not match the filter text. To use a filter for <code>options</code>, declare the <code>data-filter</code> attribute on the select element.</p>

			<div data-demo-html="true">
				<form>
					<input data-type="search" id="searchForSelect"></input>
				</form>
				<select id="anotherSelect" data-filter="true" data-input="#searchForSelect">
					<option value="A">Option A</option>
					<option value="B">Option B</option>
					<option value="C">Option C</option>
					<option value="D">Option D</option>
					<option value="E">Option E</option>
					<option value="F">Option F</option>
					<option value="G">Option G</option>
					<option value="H">Option H</option>
					<option value="I">Option I</option>
					<option value="J">Option J</option>
				</select>
			</div>

			<h2 id="filter-random">Filter Anything</h2>
			<p>The widget can be used for filtering on any element containing other elements, like a <code>div</code> containing <code>p</code> elements.
			</p>
			<div data-demo-html="true">
				<form>
					<input data-type="search" id="divOfPs-input" data-inset="false"></input>
				</form>
				<div class="elements" data-filter="true" data-input="#divOfPs-input">
					<p><strong>These</strong> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
					<p><strong>tags</strong> nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
					<p><strong>Tags</strong> erat, sed diam voluptua. At vero eos et accusam et justo duo dolores </p>
					<p><strong>are</strong> et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est</p>
					<p><strong>Filterable</strong> Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
				</div>
			</div>

			<h2 id="filter-styling">Filter Styling</h2>
			<p>
			The filter widget supports the same attributes as the previous listview extension. Use <code>data-filter-theme</code> to declare a specific theme for the text field (overriding inheritance). <code>data-filter-placeholder</code> allows you to customize the input's placeholder text. In addition, the filterable widget will synchronize options shared between the textinput widget and the widget whose children it filters to make sure that the value of the textinput widget options is the same as the value of the widget options. So, for example, if you set <code>data-inset="true"</code> on the listview, then the corresponding textinput widget will also be inset.</p>
			<p><strong>NOTE:</strong> This behavior is deprecated and will be removed in 1.5.0. The correct way forward is to provide the text field (or any other widget that emits the "change" signal) as part of the original markup and to pass a selector that will retrieve it to the filterable widget via the <code>data-input</code> attribute.
			</p>

			<div data-demo-html="true">
				<ul data-role="listview" 
					data-filter="true" 
					data-filter-placeholder="Find cars..."
					data-filter-theme="a"
					data-inset="true">
					<li>Acura</li>
					<li>Audi</li>
					<li>BMW</li>
					<li>Cadillac</li>
					<li>Ferrari</li>
				</ul>
			</div><!--/demo-html -->

			<h2 id="filter-reveal">Filter Reveal</h2>
			<p>
			The filter reveal feature makes it easy to build a simple autocomplete 
			with local data. When a filter has the <code>data-filter-reveal="true"
			</code> attribute, it will auto-hide all the list items when the search 
			field is blank. The <code>data-filter-placeholder</code> attribute can be 
			added to specify the placeholder text for the filter. If you need to search 
			against a long list of values, we provide a way to create a filter with a 
			<a href="../autocomplete/autocomplete-remote.php" data-ajax="false">remote 
			data source</a>.
			</p>

			<div data-demo-html="true">
				<ul data-role="listview" 
					data-filter="true" 
					data-filter-reveal="true" 
					data-filter-placeholder="Search fruits..."
					data-inset="true">
					<li><a href="#">Apple</a></li>
					<li><a href="#">Banana</a></li>
					<li><a href="#">Cherry</a></li>
					<li><a href="#">Cranberry</a></li>
					<li><a href="#">Grape</a></li>
					<li><a href="#">Orange</a></li>
				</ul>
			</div><!--/demo-html -->

			<h2 id="filter-callback">Filter Custom Callback</h2>
			<p>As with the listview extension, you can provide custom callback functions to the filter or override the filter altogether on the <code>filterablebeforefilter</code> event. Please note that the filter has a <strong>delay of 250ms</strong> before the filter actually triggers. This prevents running the filtering function multiple times while the user is typing.
			</p>

			<p>To set a custom filtering function that will become the new default for all filterable widgets, override the <code>filterCallback</code> option in the filterable widget prototype in a "mobileinit" signal handler:</p>

<pre><code>$.mobile.document.one( "mobileinit", function() {
	$.mobile.filterable.prototype.filterCallback = function( index, searchValue ) {
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
			<div class="ui-input-search ui-body-inherit ui-corner-all ui-shadow-inset ui-input-has-clear">
				<input
					data-type="search"
					data-enhanced="true"
					data-inset="false"
					id="pre-rendered-example-input"
					placeholder="Filter items..."
					value="au"></input>
			</div>
			<div
				data-role="controlgroup"
				data-enhanced="true"
				data-filter="true"
				data-filter-reveal="true"
				data-input="#pre-rendered-example-input"
				class="ui-controlgroup ui-controlgroup-vertical ui-corner-all">
				<div class="ui-controlgroup-controls">
					<a href="#" class="ui-btn ui-corner-all ui-shadow ui-screen-hidden" role="button">Acura</a>
					<a href="#" class="ui-btn ui-corner-all ui-shadow ui-first-child ui-last-child" role="button">Renault</a>
					<a href="#" class="ui-btn ui-corner-all ui-shadow ui-screen-hidden" role="button">Hyundai</a>
				</div>
			</div>
		</form>
	</div>

	</div><!-- /content -->

	<div data-role="footer" class="jqm-footer">
		<p class="jqm-version"></p>
		<p>Copyright 2013 The jQuery Foundation</p>
	</div><!-- /footer -->

<?php include( '../../global-nav.php' ); ?>

</div><!-- /page -->
</body>
</html>
