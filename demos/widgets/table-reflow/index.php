<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table: Reflow - jQuery Mobile Demos</title>
	<link rel="stylesheet"  href="../../../css/themes/default/jquery.mobile.css">
	<link rel="stylesheet" href="../../_assets/css/jqm-demos.css">
	<link rel="shortcut icon" href="../../favicon.ico">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<script src="../../../js/jquery.js"></script>
	<script src="../../_assets/js/"></script>
	<script src="../../../js/"></script>
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

			<h1>Table: Reflow <a href="http://api.jquerymobile.com/table-reflow/" data-ajax="false" data-role="button" data-inline="true" data-mini="true" data-icon="arrow-r" data-iconpos="right" class="jqm-api-link">API</a></h1>

			<p class="jqm-intro">The reflow table mode works by collapsing the table columns into a stacked presentation that looks like blocks of label/data pairs for each row.
			</p>

			<h2>Reflow basics</h2>
			<p>The reflow responsive table only requires a table with a <code>data-role=&quot;table&quot;</code> on the table element. There is no need to set the <code>data-mode</code> attribute since <code>reflow</code> is the default. Be sure to include <code>thead</code> and <code>tbody</code> elements in your table. This example also uses the preset responsive breakpoint, applied via the <code>ui-responsive</code> class.</p>

		<div data-demo-html="true">
		    <table data-role="table" id="movie-table" data-mode="reflow" class="ui-responsive table-stroke">
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
		        <tr>
		          <th>4</th>
		          <td><a href="http://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>
		          <td>1939</td>
		          <td>96%</td>
		          <td>87</td>
		        </tr>
		        <tr>
		          <th>5</th>
		          <td><a href="http://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>
		          <td>1962</td>
		          <td>94%</td>
		          <td>87</td>
		        </tr>
		        <tr>
		          <th>6</th>
		          <td><a href="http://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>
		          <td>1964</td>
		          <td>92%</td>
		          <td>74</td>
		        </tr>
		        <tr>
		          <th>7</th>
		          <td><a href="http://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>
		          <td>1967</td>
		          <td>91%</td>
		          <td>122</td>
		        </tr>
		        <tr>
		          <th>8</th>
		          <td><a href="http://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>
		          <td>1939</td>
		          <td>90%</td>
		          <td>72</td>
		        </tr>
		        <tr>
		          <th>9</th>
		          <td><a href="http://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin' in the Rain</a></td>
		          <td>1952</td>
		          <td>89%</td>
		          <td>85</td>
		        </tr>
		        <tr>
		          <th>10</th>
		          <td class="title"><a href="http://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>
		          <td>2010</td>
		          <td>84%</td>
		          <td>78</td>
		        </tr>
		      </tbody>
		    </table>
	</div><!--/demo-html -->

		<h2>Making the table responsive</h2>

		<p>By default, a table with reflow mode will display the stacked presentation style on all screen widths. The styles to make the table responsive are added by applying a media query with rules to switch to the tabular style presentation above a specific screen width.</p>
		<p>This is done by wrapping a few simple CSS rules in and a media query that only applies the rules above a certain width breakpoint. The styles make the table header rows visible, display the cells in a tabular format, and hide the generated label elements within each. Here is an example media query that swaps the presentation at 40em (640 pixels):  </p>

<pre><code><strong>@media ( min-width: 40em ) {</strong>
	/* Show the table header rows and set all cells to display: table-cell */
	.my-custom-breakpoint td,
	.my-custom-breakpoint th,
	.my-custom-breakpoint tbody th,
	.my-custom-breakpoint tbody td,
	.my-custom-breakpoint thead td,
	.my-custom-breakpoint thead th {
		display: table-cell;
		margin: 0;
	}
	/* Hide the labels in each cell */
	.my-custom-breakpoint td .ui-table-cell-label,
	.my-custom-breakpoint th .ui-table-cell-label {
		display: none;
	}
<strong>}</strong>
</code></pre>

		<p>It's best to use a <code>class</code> on the table to apply the breakpoint. Add these rules to your custom stylesheet that is included in the <code>head</code> of the page. We recommend creating a set of custom breakpoint classes that can be used to apply standard table breakpoints in your project.</p>

		<h2>Choosing a breakpoint</h2>
		<p>The goal is to determine the minimum width at which the <em>entire table</em> will fit comfortably within the screen. Find this width by populating a table with realistic sample data, then adjust the browser window until the table completely fits and has a bit of extra space to account for rendering differences across devices. This is the natural place to set the breakpoint that switches between the stacked and tabular presentation modes. The breakpoint width is highly dependent on the number of columns in the table and content within each cell.</p>

		<h2>Applying a preset breakpoint</h2>
		<p>Even though we strongly encourage you to write custom breakpoints yourself, the framework includes a single pre-configured breakpoint that targets the stacked style to smaller phones and swaps to a tabular prsentation on larger phones, tablet and desktop devices. To use this preset breakpoint, add the <code>ui-responsive</code> class to the table to convert from the stacked presentation to a tabular presentation at 560px (35em). If this breakpoint doesn't work for your content, we encourage you to write a custom breakpoint as descibed above.</p>

		<pre><code>&lt;table data-role=&quot;table&quot; <strong>class=&quot;ui-responsive&quot;</strong>&gt;</code></pre>

		<p></p>

		<h2>Grouped column headers</h2>
		<p>It's fairly common to need to logically group multiple columns together under a heading group for financial or scientific data. The framework can support the most simple version of this by allowing for two rows of table headers (<code>TH</code>), with the first row containing simple <code>colspan</code> attributes to group the columns below. In this configuration, the framework will add a  class to the label of the first cell in each group to allow you to style these differently and provide additional visual hierarchy. </p>

		</div><!-- /content -->

		<div data-role="footer" class="jqm-footer">
			<p class="jqm-version"></p>
			<p>Copyright 2013 The jQuery Foundation</p>
		</div><!-- /footer -->

	<?php include( '../../global-nav.php' ); ?>

	</div><!-- /page -->
	</body>
	</html>
