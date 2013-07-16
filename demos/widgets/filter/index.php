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

			<h1>Filter <a href="http://api.jquerymobile.com/filter/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">
			A filter can be set on container elements such as <code>ul, table, select, controlgroup, </code>etc) by
			declaring <code> data-filter="true"</code> attribute on the container.
			</p>

			<h2 id="filter-ul">Basic filter</h2>
			<p>
			The filter widget is based on the listview filter extension. Like with a listview before, you can declare
			<code> data-filter="true"</code> on a listview to generate a filter for the contained list items.
			</p>

			<div data-demo-html="true">
				<ul data-role="listview" data-filter="true">
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
			<code> data-filter="true"</code> on the table element to generate a filter for table rows.
			</p>

			<div data-demo-html="true">
				<table data-role="table" id="movie-table" data-filter="true">
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
			<p>
			The filter widget can be used on other widgets, too. To filter a list of controlgroup buttons,
			declare <code> data-filter="true"</code> on the element that creates the controlgroup (Note that
			you can also use the <code>data-filtertext</code> attribute to declare the text string to filter
			the respective element by.
			</p>

			<div data-demo-html="true">
				<div data-role="controlgroup" data-filter="true">
					<input type="button" value="button 1" id="bt1">
					<input type="button" value="button 2" id="bt2" data-filtertext="foo some words">
					<input type="button" value="button 3" id="bt3">
					<input type="button" value="button 4" id="bt4">
					<input type="button" value="button 5" id="bt5">
				</div>
			</div>

			<h2 id="filter-select">Filter Select</h2>
			<p>
			The widget also works on <code>select</code> widgets by hiding options that do not match the
			filter text. To use a filter for <code>options</code>, declare the <code>
			data-filtertext</code> attribute on the select element. Note that the select element
			is completely hidden, if no option matches the filtertext.
			</p>

			<div data-demo-html="true">
				<select id="anotherSelect" data-filter="true">
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

			<h2 id="filter-random">Random Filter</h2>
			<p>
			The widget can also be called on random element containers, like a <code>
			div</code> tag containing <code>p</code> elements to filter.
			</p>
			<div data-demo-html="true">
				<div data-filter="true" data-inset="true" data-selector="elements"></div>
				<div class="elements">
					<p><strong>These</strong> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
					<p><strong>tags</strong> nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
					<p><strong>Tags</strong> erat, sed diam voluptua. At vero eos et accusam et justo duo dolores </p>
					<p><strong>are</strong> et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est</p>
					<p><strong>Filterable</strong> Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
				</div>
			</div>

			<h2 id="filter-styling">Filter Styling</h2>
			<p>
			The filter widget supports the same attributes as the previous listview
			extension. Use <code>data-theme</code> to declare a specific theme for the 
			filter (overriding inheritance). <code>Data-inset="true"</code> will inset
			the filter element, while <code>data-placeholder</code> allows to customize
			the inputs placeholder text. You can also set custom classes on the 
			generated filter wrapper using the <strong>wrapperClass</strong> attribute
			or specifying the <code>data-wrapper-class</code> when creating a filter.
			Lastly, <code>data-mini="true"</code> will apply the mini styling to the
			filter input. Here is an example using all styling options:
			</p>

			<div data-demo-html="true">
				<ul data-role="listview" 
					data-filter="true" 
					data-filter-placeholder="Find cars..."
					data-theme="a"
					data-wrapper-class="myOwnClass"
					data-inset="true"
					data-mini="true">
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
			<p>
			As with the listview extension, you can provide custom callback functions
			to the filter or override the filter altogether on the <code>filterbarbeforefilter</code>
			event. Please note that the filter has a <strong>delay of 250ms</strong>
			before the filter actually triggers. This prevents running the filtering 
			function multiple times while the user is typing. 
			</p>

			<p>
			To set a custom filtering function, either override the callback property on
			<code>mobileinit</code> and make sure to pass the tree parameters: <strong>
			text</strong> to filter, <strong>searchValue</strong> to filter for and
			<strong>item</strong> to filter.
			</p>
<code><pre>
$.mobile.document.bind("mobileinit", function() {
	$.mobile.filterbar.prototype.filterCallback = function( text, searchValue, item ) {
		// your custom filtering logic goes here
	});
});</code></pre>

			<p>
			Alternatively, you can override the filter on the widget itself by setting the
			appropriate option:
			</p>
<code><pre>
$("selector").filterbar("options", "filterCallback", function( text, searchValue, item ) {
		// your custom filtering logic goes here
	});
});</code></pre>


			<p>
			To override the filter altogether (for example when loading data server-side
			or from localstorage), bind to the <code>filterbarbeforefilter</code> event.
			</p>
<code><pre>
$(".selector input").on("filterbarbeforefilter", function( e, data ) {
		var value;
		
		e.preventDefault();
		value = data.input.value;
		// trigger own request to database
	});
});</code></pre>
			<!-- 
			enhance does not work yet, because data-enhanced needs to be supported in button and textinput, too
			
			<h2 id="filter-enhance">Filter Enhance</h2>
			<p>You can reduce rendering time by providing the rendered widget HTML
			and setting <code>data-enhanced="true"</code>. By setting this attribute, 
			you are telling JQM to not modify any DOM elements when setting up the
			widget. Please note when doing so, you also need to provide the <code>
			data-wrapper-class</code> attribute specifying the class under which
			your "self-made" filter can be found by the widget in order to attach
			events to. A self-enhanced filter widget would look like this.
			</p>

			<div data-demo-html="true">
				<div class="biz">
					<div class="ui-filter foo_enhance" role="search">
						<div class="ui-input-search ui-body-a ui-corner-all ui-shadow-inset">
							<input data-enhanced="true" placeholder="Filter items..." data-type="search" data-lastval="">
							<a data-encanced="true" title="clear text" class="ui-input-clear ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all ui-shadow ui-btn-a" href="#">clear text</a>
						</div>
					</div>
				</div>
				<ul data-role="listview" data-filter="true" data-wrapper-class="foo_enhance" data-enhanced="true">
					<li>Acura</a></li>
					<li>Audi</li>
					<li>BMW</li>
					<li>Cadillac</li>
					<li>Chrysler</li>
				</ul>
			</div>
			<p>
			Note how the <code>data-wrapper-class</code> must match the class declared
			on the <strong>ui-filter</strong> wrapper.
			</p>
-->
			<h2 id="filter-target">Filter Target</h2>
			<p>
			By default, the filter widget is inserted just before the element it 
			was called on. To insert the filter in another place, use the <code>
			data-target</code> attribute and specify a class name. The filter will
			be appended to this class.
			</p>
			
		<div data-demo-html="true">
			<ul data-role="listview" data-inset="true" data-filter="true" data-target="foo_target">
				<li>Acura</a></li>
				<li>Audi</li>
				<li>BMW</li>
				<li>Cadillac</li>
				<li>Chrysler</li>
			</ul>
			<p>The filter is appended below using <code>data-target</code></p>
			<div class="foo_target">
			<!-- insert filter here -->
			</div>
		</div>

			<h2 id="filter-selector">Filter Selector</h2>
			<p>
			The filter widget can also be used on multiple datasets (for example
			a listview inside a panel and corresponding images in the main section).
			To set up a widget for multiple datasets, use the <code>data-selector</code> 
			attribute and declare a class, which is set on the wrapping container of
			all datasets you want to have filtered.
			</p>

			<div data-demo-html="true">
				<!-- filter -->
				<div class="filterMyContent"
					data-filter="true"
					data-inset="false"
					data-selector="filter_sets">
				</div>

				<!-- sets to filter -->
				<div class="filter_sets">
					<p>This</p>
					<p>are</p>
					<p>Filterable</p>
					<p>Dataset</p>
				</div>
				<ul data-role="listview" data-inset="true" class="filter_sets">
					<li><a href="#">This</a></li>
					<li><a href="#">is a</a></li>
					<li data-filtertext="foo"><a href="#">filterable</a></li>
					<li>set aswell</li>
				</ul>
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
