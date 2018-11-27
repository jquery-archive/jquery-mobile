<!DOCTYPE html>
<html>
	<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Table: Column Toggle - jQuery Mobile Demos</title>
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

		<h1>Table: Column Toggle</h1>

		<a href="http://api.jquerymobile.com/table-columntoggle/" class="jqm-api-docs-link ui-nodisc-icon ui-alt-icon" title="Visit the API Documentation" target="_blank">API Documentation <span class="ui-icon ui-icon-action"></span></a>

		<p>The column toggle table mode selectively hides columns at narrower widths as a sensible default but also offers a menu to let users manually control which columns they want to see.</p>

		<h2>Column toggle basics</h2>
		<p>This table mode automatically hides less important columns at narrower widths and surfaces a button to open a menu that allows the user to choose what columns they want to see. In this mode, the author attempts to define which columns are most important to show across various widths by assigning a priority to each column.</p>

	        <p>A user may choose to check as many columns as they want by tapping the "Columns..." button to open the column
	        chooser popup. The popup contains a dynamically generated list of columns based on the table markup that can be checked and unchecked to adjust the visible columns. </p>

			<div data-demo-html="true">
	         <table data-role="table" id="table-column-toggle" data-mode="columntoggle" class="ui-responsive table-stroke">
	              <thead>
	                <tr>
	                  <th data-priority="2">Rank</th>
	                  <th>Movie Title</th>
	                  <th data-priority="3">Year</th>
	                  <th data-priority="1"><abbr title="Rotten Tomato Rating">Rating</abbr></th>
	                  <th data-priority="5">Reviews</th>
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
	                <tr>
	                  <th>4</th>
	                  <td><a href="https://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>
	                  <td>1939</td>
	                  <td>96%</td>
	                  <td>87</td>
	                </tr>
	                <tr>
	                  <th>5</th>
	                  <td><a href="https://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>
	                  <td>1962</td>
	                  <td>94%</td>
	                  <td>87</td>
	                </tr>
	                <tr>
	                  <th>6</th>
	                  <td><a href="https://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>
	                  <td>1964</td>
	                  <td>92%</td>
	                  <td>74</td>
	                </tr>
	                <tr>
	                  <th>7</th>
	                  <td><a href="https://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>
	                  <td>1967</td>
	                  <td>91%</td>
	                  <td>122</td>
	                </tr>
	                <tr>
	                  <th>8</th>
	                  <td><a href="https://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>
	                  <td>1939</td>
	                  <td>90%</td>
	                  <td>72</td>
	                </tr>
	                <tr>
	                  <th>9</th>
	                  <td><a href="https://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin' in the Rain</a></td>
	                  <td>1952</td>
	                  <td>89%</td>
	                  <td>85</td>
	                </tr>
	                <tr>
	                  <th>10</th>
	                  <td class="title"><a href="https://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>
	                  <td>2010</td>
	                  <td>84%</td>
	                  <td>78</td>
	                </tr>
	              </tbody>
	            </table>
			</div><!--/demo-html -->

	      <h2>Applying column chooser mode to a table</h2>

	      <p>The column chooser mode requires a <code>table</code> element with two attributes: <code>data-role=&quot;table&quot;</code> and <code>data-mode=&quot;columntoggle&quot;</code>. An <code>ID</code> attribute is also required on the table to associate it with the column chooser popup menu.</p>

<pre><code>
&lt;table <strong>data-role=&quot;table&quot; data-mode=&quot;columntoggle&quot; id=&quot;my-table&quot;</strong>&gt;
</code></pre>

	      <h2>Setting column priority</h2>

	      <p>The table works by hiding and showing columns based on two inputs: available screen width or by the user checking and unchecking which columns to display in a column picker popup. Add <code>data-priority</code> attributes to each of the table headers of columns you want to responsively display and assign a priority (1 = highest, 6 = lowest). Any table header given a priority will be available in the column picker menu. </p>
	      <p>To make a column <em>persistent</em> so it's not available for hiding, omit the <code>data-priority</code> attribute. This will make the column visible at all widths and won't be available in the column chooser menu.</p>

<pre><code>
&lt;th&gt;I&#x27;m critical and can&#x27;t be removed&lt;/th&gt;
&lt;th <strong>data-priority=&quot;1&quot;</strong>&gt;I&#x27;m very important&lt;/th&gt;
&lt;th <strong>data-priority=&quot;3&quot;</strong>&gt;I&#x27;m somewhat&lt;/th&gt;
&lt;th <strong>data-priority=&quot;5&quot;</strong>&gt;I&#x27;m less important&lt;/th&gt;
</code></pre>

	    <p>You may use any priority naming convention and assign as many (or few) levels of priority for the columns. The plugin  simply generates class names based on the values in the <code>data-priority</code> attribute so even though we default to using a numeric system of 1-6, any naming convention is possible. </p>
	    <p>For example, if a priority of <code>data-priority="critical"</code> is added to the heading, a class of <code>ui-table-priority-critial</code> will be applied to each cell in that column. If a priority is assigned, the column will be made available for toggling in the column menu and the class will be added to each cell. The rest of the styling and media query creation is up to you to write in your custom stylesheet.</p>

		<h2>Theme & customization</h2>
	      <p>The column chooser popup is opened via a button that is generated by the framework. The button's text is "Columns..." by default but can be set by adding the <code>data-column-button-text</code> attribute to the table to the text string you want in the button. The button will inherit the theme from the content area, just like all buttons, but the theme can be set manually by adding the <code>data-column-button-theme</code> attribute to any swatch letter in your theme.</p>
	      <p>The table background is themed by adding <code>class="ui-body-d"</code> to the table element. The table header is given a themed appearance by adding the <code>class="ui-bar-d"</code> to the header row. The striped rows are created by adding the <code>table-stripe</code> class to the table element.</p>

	      <div data-demo-html="true">

	       <table data-role="table" id="table-custom-2" data-mode="columntoggle" class="ui-body-d ui-shadow table-stripe ui-responsive" data-column-button-theme="b" data-column-button-text="Columns to display..." data-column-popup-theme="a">

	                <thead>
	                  <tr class="ui-bar-d">
	                    <th data-priority="2">Rank</th>
	                    <th>Movie Title</th>
	                    <th data-priority="3">Year</th>
	                    <th data-priority="1"><abbr title="Rotten Tomato Rating">Rating</abbr></th>
	                    <th data-priority="5">Reviews</th>
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
	                  <tr>
	                    <th>4</th>
	                    <td><a href="https://en.wikipedia.org/wiki/Gone_with_the_Wind_(film)" data-rel="external">Gone with the Wind</a></td>
	                    <td>1939</td>
	                    <td>96%</td>
	                    <td>87</td>
	                  </tr>
	                  <tr>
	                    <th>5</th>
	                    <td><a href="https://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)" data-rel="external">Lawrence of Arabia</a></td>
	                    <td>1962</td>
	                    <td>94%</td>
	                    <td>87</td>
	                  </tr>
	                  <tr>
	                    <th>6</th>
	                    <td><a href="https://en.wikipedia.org/wiki/Dr._Strangelove" data-rel="external">Dr. Strangelove Or How I Learned to Stop Worrying and Love the Bomb</a></td>
	                    <td>1964</td>
	                    <td>92%</td>
	                    <td>74</td>
	                  </tr>
	                  <tr>
	                    <th>7</th>
	                    <td><a href="https://en.wikipedia.org/wiki/The_Graduate" data-rel="external">The Graduate</a></td>
	                    <td>1967</td>
	                    <td>91%</td>
	                    <td>122</td>
	                  </tr>
	                  <tr>
	                    <th>8</th>
	                    <td><a href="https://en.wikipedia.org/wiki/The_Wizard_of_Oz_(1939_film)" data-rel="external">The Wizard of Oz</a></td>
	                    <td>1939</td>
	                    <td>90%</td>
	                    <td>72</td>
	                  </tr>
	                  <tr>
	                    <th>9</th>
	                    <td><a href="https://en.wikipedia.org/wiki/Singin%27_in_the_Rain" data-rel="external">Singin' in the Rain</a></td>
	                    <td>1952</td>
	                    <td>89%</td>
	                    <td>85</td>
	                  </tr>
	                  <tr>
	                    <th>10</th>
	                    <td class="title"><a href="https://en.wikipedia.org/wiki/Inception" data-rel="external">Inception</a></td>
	                    <td>2010</td>
	                    <td>84%</td>
	                    <td>78</td>
	                  </tr>
	                </tbody>
	              </table>

	            </div><!-- /data-demo -->

	    <h2>Making the table responsive</h2>

	    <p>The styles for all columns that have priorities assigned (1-6) start as <code>display:none</code> in the structure stylesheet since we're taking a mobile-first approach to our styles. This means that only columns that should be persistent are visible in the styles to start.</p>

	    <p>The framework does not automatically include the the media queries to progressively display columns at wider widths. We do this to make it easier for developers to customize the media query widths for each priority level.</p>

	    <p>Media queries add the responsive behavior to show and hide columns by priority. Each media query is written using <code>min-width</code> widths so they build on top of each other. The widths are set in em units so they respond to font size changes. To calculate a pixel withs in em units, divide the target width by 16 (pixels) - it's that easy.</p>

	    <p>Inside each media query, we override the <code>display:none</code> style properties set on all the priority columns in the basic styles to <code>display:table-cell</code> so they become visible again and act as a table.</p>

	    <p>To customize the breakpoints, copy the following style block into your custom style overrides and adjust the <code>min-width</code> media query values for each priority level to specify where various priority columns should appear.</p>

	    <p>In the example styles below for a <code> my-custom-class</code> class on the table, the priority 1 columns are shown first, at widths above <code>20em</code> (320px), then priority 2 kicks in above <code>30em</code> (480px) and so on up to wide desktop widths with priority 6. Feel free to change these breakpoints in your stylesheet and choose how many priority levels you'd like to use.</p>

<pre><code>
<strong>/* Show priority 1 at 320px (20em x 16px) */</strong>
@media screen and (min-width: 20em) {
   .my-custom-class th.ui-table-priority-1,
   .my-custom-class td.ui-table-priority-1 {
     display: table-cell;
   }
}
<strong>/* Show priority 2 at 480px (30em x 16px) */</strong>
@media screen and (min-width: 30em) {
   .my-custom-class  th.ui-table-priority-2,
   .my-custom-class td.ui-table-priority-2 {
     display: table-cell;
   }
}
...more breakpoints...
</code></pre>

	<p>Due to CSS specificity, you will also need to include the class definitions for the hidden and visible states <em>after</em> the custom breakpoints in your custom stylesheet so be sure to include these as well:</p>

<pre><code>
/* Manually hidden */
.my-custom-class th.ui-table-cell-hidden,
.my-custom-class td.ui-table-cell-hidden {
  display: none;
}

/* Manually shown */
.my-custom-class th.ui-table-cell-visible,
.my-custom-class td.ui-table-cell-visible {
   display: table-cell;
}
</code></pre>

	      <h2>Applying a preset breakpoint</h2>
	      <p>Even though we strongly encourage you to write custom breakpoints yourself, the framework includes a set of pre-configured breakpoints for each of the six priority levels that you can use if they happen work well for your content.</p>
	      <p>These breakpoints can be applied by adding a <code>class="ui-responsive"</code> to the table element. Here is an example of a table with this class added:</p>

<pre><code>
&lt;table data-role=&quot;table&quot; <strong>class=&quot;ui-responsive&quot;</strong> data-mode=&quot;columntoggle&quot; id=&quot;my-table&quot;&gt;
</code></pre>

	      <p>The six preset breakpoint classes included in the column toggle stylesheet use regular increments of 10em (160 pixels). Here is a summary of the breakpoints assigned to each priority in the preset styles: </p>
	      <dl>
	        <dt><code>data-priority="1"</code></dt><dd> Displays the column at 320px (20em) </dd>
	        <dt><code>data-priority="2"</code></dt><dd> Displays the column at 480px (30em) </dd>
	        <dt><code>data-priority="3"</code></dt><dd> Displays the column at 640px (40em) </dd>
	        <dt><code>data-priority="4"</code></dt><dd> Displays the column at 800px (50em) </dd>
	        <dt><code>data-priority="5"</code></dt><dd> Displays the column at 960px (60em) </dd>
	        <dt><code>data-priority="6"</code></dt><dd> Displays the column at 1,120px (70em) </dd>
	      </dl>

	      <p>If these preset breakpoints don't work for your content and layout needs, we recommend that you create custom breakpoints to fine tune the styles. </p>

	      <h2>Grouped column headers</h2>
	      <p>It's fairly common to need to logically group multiple columns under a heading group for financial or scientific data. The framework can support the most simple version of this by allowing for two rows of table headers (<code>TH</code>), with the first row containing simple <code>colspan</code> attributes to group the columns below. In this configuration, the framework will parse the first row only for the priority and expose these heading groups as the options in the column chooser popup. In this configuration, the second heading will not be exposed as columns that can be hidden or shown independently of the groupings in the chooser.</p>

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
